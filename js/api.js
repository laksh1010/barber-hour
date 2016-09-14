import axios from 'axios';

import { apiHost } from './env';

const instance = axios.create({
  baseURL: apiHost,
  headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
});

export default instance;
