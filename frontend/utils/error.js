export const displayErrorMessage = (error) => {
  const errorMessage =
    error.message !== "Failed to fetch"
      ? error.message
      : "Sorry, Server not responding right now. Please try again later.";
  return alert(errorMessage);
};
