const customParseFormat = require('dayjs/plugin/customParseFormat');
const dayjs = require('dayjs');

dayjs.extend(customParseFormat);

function test() {
  const dayFormat = 'D/M/YYYY';
  const dateA = dayjs('3/4/2024', dayFormat);
  const dateB = dayjs('12/9/2023', dayFormat);
  console.log('dateA :', dateA.toDate());
  console.log('dateB :',dateB.toDate());
}

test();