import { apiClient } from './api';
import { ScriBandGuidance } from '@/types';

export const scriBandGuidanceService = {
  // GET /api/v1/scri-band-guidance — static reference data, one row per SCRI band.
  list: async (): Promise<ScriBandGuidance[]> => {
    const { data } = await apiClient.get<{ data: ScriBandGuidance[] }>('/scri-band-guidance');
    return data.data;
  },
};
