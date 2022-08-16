import axiosClient from './axiosClient';

const postApi = {
  getAll(params) {
    return axiosClient.get('/posts', { params });
  },

  getById(id) {
    return axiosClient.get(`/posts/${id}`);
  },

  add(data) {
    return axiosClient.post('/post', data);
  },

  update(data) {
    return axiosClient.patch(`/posts/${data.id}`, data);
  },

  remove(id) {
    return axiosClient.delete(`/posts/${id}`);
  },
};

export default postApi;
