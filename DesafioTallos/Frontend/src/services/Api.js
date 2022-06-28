import axios from 'axios';

export default () =>
  axios.create({
    // 'baseURL' do Back-End ->
    baseUrl: 'http://localhost:=8080/api',
  });
