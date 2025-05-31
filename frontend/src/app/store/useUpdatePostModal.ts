import { GetPostoutputDto } from '@application/models/GetPostOutputDto';
import { DataStoreModalType } from '@root/types/store';
import { create } from 'zustand';



export const useUpdatePostNoodal = create<DataStoreModalType<GetPostoutputDto>>(
  (set) => ({
    data: undefined,
    isModalOpen: false,
    openModal: (data) => set({ isModalOpen: true, data }),
    closeModal: () => set(() => ({ isModalOpen: false, data: undefined })),
  }),
);
