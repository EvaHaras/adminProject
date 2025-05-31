export interface DefaultStoreModalType {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export interface DataStoreModalType<T> {
  data?: T;
  isModalOpen: boolean;
  openModal: (data: T) => void;
  closeModal: () => void;
}

