export const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

export const isAdmin = () => getUser()?.role === "admin";
export const isMember = () => getUser()?.role === "member";