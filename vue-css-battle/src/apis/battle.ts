import type { BattleUploadFormData, BattleUploadResponse, TargetResponse } from '@/types/target';
import { request } from '@/utils/http';
export const allBattlesPath = '/battle/';
export const uploadBattlePath = '/battle/upload';

export function getAllBattlesReq() {
  return request<TargetResponse>({
    url: allBattlesPath,
    method: 'GET'
  });
}

export function uploadBattleReq(data: BattleUploadFormData) {
  return request<BattleUploadResponse>({
    url: uploadBattlePath,
    method: 'POST',
    data
  });
}
