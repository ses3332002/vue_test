import axios from 'axios';

const API_BASE_URL = 'https://randomuser.me/api';
const requestOptions = {
  nat: 'us',
  results: 10,
  inc: 'gender,name,email,picture,dob,id'
};

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getUsers = async () => {
  try {
    const { data } = await api.get('/', { params: requestOptions });
    return data.results;
  } catch (err) {
    console.error(err);
  }
};
