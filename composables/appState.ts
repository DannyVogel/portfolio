const isOpen = ref(false);
export const useAppState = () => {
  const close = () => {
    isOpen.value = false;
  };
  const open = () => {
    isOpen.value = true;
  };
  return { isOpen, close, open };
};
