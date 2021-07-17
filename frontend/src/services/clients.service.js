import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/api/v1/clients';

class ClientsService {
  getClients(query) {
    delete query.save;
    delete query.deleted;
    return axios.get(API_URL, { headers: authHeader(), params: query });
  }

  getClientById(id) {
    return axios.get(`${API_URL}/${id}`, { headers: authHeader() });
  }

  updateClients(id, body) {
    return axios.put(`${API_URL}/${id}`, body, { headers: authHeader() });
  }

  deleteClients(id) {
    return axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
  }

  createClients(body) {
    return axios.post(`${API_URL}`, body, { headers: authHeader() });
  }
}

export default new ClientsService();