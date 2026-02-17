export const validateTask = (title) => {
  if (!title || title.trim().length === 0) {
    return "Title is required";
  }
  if (title.length > 100) {
    return "Title must be less than 100 characters";
  }
  return null;
};
