import axiosClient from './axiosClient';

const postApi = {
  getAll(params) {
    return axiosClient.get('/posts', { params });
  },

  getById(id) {
    return axiosClient.get(`/posts/${id}`);
  },

  add(data) {
    return axiosClient.post('/posts', data);
  },

  update(data) {
    return axiosClient.patch(`/posts/${data.id}`, data);
  },

  addFormData(data) {
    return axiosClient.post('/with-thumbnail/posts', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  updateFormData(data) {
    return axiosClient.patch(`/with-thumbnail/posts/${data.get('id')}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  remove(id) {
    return axiosClient.delete(`/posts/${id}`);
  },
};

export default postApi;
