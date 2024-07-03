import type { TargetResponse } from '@/types/target';
import { request } from '@/utils/http';
export const allBattlesPath = '/battle/';

export function getAllBattlesReq() {
  return request<TargetResponse>({
    url: allBattlesPath,
    method: 'GET'
  });
}
