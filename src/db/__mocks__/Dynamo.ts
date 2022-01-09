export const fetchAllTableData = async () => {
  return Promise.resolve({
    Items: [
      {
        "TONY STARK": 3,
        THOR: 5,
        "STEVE ROGERS": 8,
        Users: "Point",
      },
    ],
  });
};

export const updateAllDynamoTableData = async () => {
  return Promise.resolve({
    Items: [
      {
        BOB: 1,
        DOM: 2,
        JOE: 3,
        Users: "Point",
      },
    ],
  });
};
