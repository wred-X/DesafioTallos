import Api from './Api';

export default {
  /**
   * Método responsável por criar um novo(a) 'user'
   * (POST): localhost:=3000/api/tasks
   */
  async createNewUser(user) {
    try {
      const response = await Api().post('/tasks', user);
      return console.log(response.data);
    } catch (error) {
      return console.log(error.response);
    }
  },

  /**
   * Método responsável por logar um(a) 'user'
   * (POST): localhost:=3000/api/login
   */
  async login() {
    try {
      const response = await Api().post('/login', user);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  },

  /**
   * Método responsável por listar todos os 'users'
   * (GET): localhost:=3000/api/tasks
   */
  async getUsers() {
    try {
      const response = await Api().get('/tasks');
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  },

  /**
   * Método responsável por Listar por Id um determinado 'user'
   * (GET): localhost:=3000/api/tasks/:id
   */
  async getUsersId(id) {
    try {
      const response = await Api().get(`/tasks/${id}`);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  },

  /**
   * Método responsável por atualizar um determinado 'user' por Id
   * (PUT): localhost:=3000/api/tasks/:id
   */
  async updateEmployee(user) {
    try {
      const id = user.user_id;
      const response = await Api().put(`/tasks/${id}`, user);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  },

  /**
   * Método responsável por excluir um determinado 'user' por Id
   * (DELETE): localhost:=3000/api/tasks/:id
   */
  async deleteEmployee(id) {
    try {
      const response = await Api().delete(`/tasks/${id}`);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  },
};
