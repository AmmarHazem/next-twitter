import { create } from "zustand";

interface EditModalStore {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useEditModal = create<EditModalStore>((set) => ({
  open: false,
  onClose: () => set({ open: false }),
  onOpen: () => set({ open: true }),
}));

export default useEditModal;
