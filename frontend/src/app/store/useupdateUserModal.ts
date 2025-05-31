import { GetUserItemOutputDto } from '@application/models/GetUserOutputDto';
import { DataStoreModalType } from '@root/types/store';
import { create } from 'zustand';



export const useUpdateUserNoodal = create<DataStoreModalType<GetUserItemOutputDto>>(
  (set) => ({
    data: undefined,
    isModalOpen: false,
    openModal: (data) => set({ isModalOpen: true, data }),
    closeModal: () => set(() => ({ isModalOpen: false, data: undefined })),
  }),
);
