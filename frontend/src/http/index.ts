import axios from 'axios';


const host = axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
  baseURL: 'http://localhost:5000/',
});

export { host };
