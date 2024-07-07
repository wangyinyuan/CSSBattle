import glob
import os
import requests
from flask import Flask, request, jsonify
from PIL import Image
from io import BytesIO

EXTS = ('jpg', 'jpeg', 'JPG', 'JPEG', 'gif', 'GIF', 'png', 'PNG')

app = Flask(__name__)

def dhash(image, hash_size=8):
    # Resize and convert image to grayscale
    image = image.resize((hash_size + 1, hash_size), Image.Resampling.LANCZOS)

    pixels = list(image.getdata())
    # Compare adjacent pixels.
    difference = []
    for row in range(hash_size):
        for col in range(hash_size):
            pixel_left = pixels[row * (hash_size + 1) + col]
            pixel_right = pixels[row * (hash_size + 1) + col + 1]
            difference.append(pixel_left > pixel_right)

    # Convert the binary array to a hexadecimal string.
    decimal_value = 0
    hex_string = []
    for index, value in enumerate(difference):
        if value:
            decimal_value += 2 ** (index % 8)
        if (index % 8) == 7:
            hex_string.append(hex(decimal_value)[2:].rjust(2, '0'))
            decimal_value = 0

    return ''.join(hex_string)

def dhash_rgb(image, hash_size=8):
    # Ensure image is RGB
    if image.mode != 'RGB':
        image = image.convert('RGB')
    # Split the image into R, G, B channels
    r, g, b = image.split()
    return dhash(r, hash_size), dhash(g, hash_size), dhash(b, hash_size)

def hamming(h1, h2):
    return sum(c1 != c2 for c1, c2 in zip(h1, h2))

def hamming_to_similarity(hamming_distance, max_distance):
    return 1 - (hamming_distance / max_distance)

@app.route('/similarity', methods=['POST'])
def calculate_similarity():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    url = request.form.get('url')
    if not url:
        return jsonify({'error': 'No URL provided'}), 400

    try:
        # Download the base image from the URL
        response = requests.get(url)
        response.raise_for_status()
        base_image = Image.open(BytesIO(response.content))
    except Exception as e:
        return jsonify({'error': 'Failed to download base image', 'message': str(e)}), 400

    try:
        # Load the candidate image from the uploaded file
        candidate_image = Image.open(file.stream)
    except Exception as e:
        return jsonify({'error': 'Failed to load candidate image', 'message': str(e)}), 400

    # Calculate dHash for both images
    base_hash_r, base_hash_g, base_hash_b = dhash_rgb(base_image)
    hash_r, hash_g, hash_b = dhash_rgb(candidate_image)

    # Calculate Hamming distances
    ham_dist_r = hamming(base_hash_r, hash_r)
    ham_dist_g = hamming(base_hash_g, hash_g)
    ham_dist_b = hamming(base_hash_b, hash_b)

    max_distance = 8 * 8  # Maximum hamming distance for each channel
    similarity_r = hamming_to_similarity(ham_dist_r, max_distance)
    similarity_g = hamming_to_similarity(ham_dist_g, max_distance)
    similarity_b = hamming_to_similarity(ham_dist_b, max_distance)

    # Average similarity over all channels
    similarity = (similarity_r + similarity_g + similarity_b) / 3

    return jsonify({
        'similarity': similarity,
        'details': {
            'ham_dist_r': ham_dist_r,
            'ham_dist_g': ham_dist_g,
            'ham_dist_b': ham_dist_b,
            'similarity_r': similarity_r,
            'similarity_g': similarity_g,
            'similarity_b': similarity_b
        }
    })

if __name__ == '__main__':
    app.run(debug=True)