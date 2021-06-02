import axios from 'axios';

const baseURL = 'https://rent-challenge-api.herokuapp.com';
export default axios.create({});

export const getAllRents = async () => {
  const response = await axios.get(baseURL + '/rents');
  return response.data;
};

export const getRentById = async id => {
  const response = await axios.get(baseURL + `/rents/${id}`);
  return response.data;
};

export const getHostProfile = async id => {
  const response = await axios.get(baseURL + `/host/${id}`);
  return response.data;
};

const headers = {
  'Content-Type': 'application/json',
  userToken: 'token123',
};

export const getRenterProfile = async () => {
  return await axios.post(baseURL + `/user`, {}, {headers: headers});
};
