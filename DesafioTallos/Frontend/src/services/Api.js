import axios from 'axios';

export default () =>
  axios.create({
    // 'baseURL' do Back-End ->
    baseURL: 'http://localhost:=8080/api',
  });
