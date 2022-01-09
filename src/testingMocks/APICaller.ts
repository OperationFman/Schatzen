export const fetchObject = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  console.log("Fetched real data");

  return {
    breakfast: "Banana",
    lunch: "Sandwhich",
  };
};
