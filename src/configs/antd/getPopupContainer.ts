export const getPopupContainer = (node: HTMLElement | undefined) => {
  if (node) {
    return node.parentNode as HTMLElement;
  }

  return document.body;
};
