import { create } from "zustand";

interface RegisterModalStore {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useRegisterModal = create<RegisterModalStore>((set) => ({
  open: false,
  onClose: () => set({ open: false }),
  onOpen: () => set({ open: true }),
}));

export default useRegisterModal;
