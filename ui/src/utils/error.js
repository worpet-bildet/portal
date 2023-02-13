// TODO: Create error state, handler, toast
export const handleError = path => {
  console.error("Error ", path);
  throw new Error("Error");
};
