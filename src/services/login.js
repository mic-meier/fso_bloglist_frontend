import axios from "axios";
const baseurl = "/api/login";

const login = async (credentials) => {
  const res = await axios.post(baseurl, credentials);
  return res.data;
};

export default { login };
