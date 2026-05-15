export const ContentVariants = {
  initial: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 10 : -10,
  }),
  show: {
    opacity: 1,
    x: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -10 : 10,
  }),
};
