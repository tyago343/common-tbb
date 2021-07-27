import axios from "axios";

export const fetchEntries = async () => {
  const result = await axios.get("http://localhost:3000/entries");
  if (!result.data) {
    return false;
  }
  return result.data;
};
export const loginUser = async ({ email, password }) => {
  const result = await axios.post("http://localhost:3000/authenticate", {
    email,
    password,
  });
  if (!result.data) {
    return false;
  }
  return result.data;
};
