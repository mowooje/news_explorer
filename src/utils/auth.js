export const authorize = (email, password) => {
  return new Promise((resolve) => {
    resolve({ token: "fake-jwt-token" });
  });
};

export const register = (name, email, password) => {
  return new Promise((resolve) => {
    resolve({ message: "Registration successful" });
  });
};

export const checkToken = (token) => {
  return new Promise((resolve) => {
    resolve({
      data: {
        name: "Fake User",
        email: "fake@example.com",
        _id: "fake-id",
      },
    });
  });
};
