import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const createBlog = async (blogObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const res = await axios.post(baseUrl, blogObject, config);
  return res.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const res = await axios.delete(`${baseUrl}/${id}`, config);
  return res.data;
};

const likeBlog = async (blogObject, id) => {
  const config = {
    headers: { Authorization: token },
  };
  const res = await axios.put(`${baseUrl}/${id}`, blogObject, config);
  return res.data;
};

export default {
  getAll,
  createBlog,
  deleteBlog,
  likeBlog,
  setToken,
};
