import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const req = axios.get(baseUrl);
  return req.then((res) => res.data);
};

const createBlog = async (blogObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const res = await axios.post(baseUrl, blogObject, config);
  return res.data;
};

export default {
  getAll,
  createBlog,
  setToken,
};
