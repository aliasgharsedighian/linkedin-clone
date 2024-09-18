import { create } from "zustand";

// type Store = {
//   showMessage: boolean;
//   setShowMessage: (action: boolean) => void;
// };

export const useAppStore = create()((set) => ({
  showMessage: false,
  setShowMessage: (action) => set((state) => ({ showMessage: action })),
  selectedChatType: undefined,
  selectedChatData: undefined,
  selectedChatMessage: [],
  setSelectedChatType: (selectedChatType) => set({ selectedChatType }),
  setSelectedChatData: (selectedChatData) => set({ selectedChatData }),
  setSelectedChatMessage: (selectedChatMessage) => set({ selectedChatMessage }),
  closeChat: () =>
    set({
      selectedChatType: undefined,
      selectedChatData: undefined,
      selectedChatMessage: [],
    }),
  addMessage: (message) => {
    const selectedChatMessage = get().selectedChatMessage;
    const selectedChatType = get().selectedChatType;

    set({
      selectedChatMessage: [
        ...selectedChatMessage,
        {
          ...message,
          recipient:
            selectedChatType === "channel"
              ? message.recipient
              : message.recipient._id,
          sender:
            selectedChatType === "channel"
              ? message.sender
              : message.sender._id,
        },
      ],
    });
  },
}));
