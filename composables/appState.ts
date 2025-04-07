const isSlideoverOpen = ref(false);
const isGraphOpen = ref(false);

export const useAppState = () => {
  const closeSlideover = () => {
    isSlideoverOpen.value = false;
  };
  const openSlideover = () => {
    isSlideoverOpen.value = true;
  };
  const closeGraph = () => {
    isGraphOpen.value = false;
  };
  const openGraph = () => {
    isGraphOpen.value = true;
  };
  return {
    isSlideoverOpen,
    closeSlideover,
    openSlideover,
    isGraphOpen,
    closeGraph,
    openGraph,
  };
};
