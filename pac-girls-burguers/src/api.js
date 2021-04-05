import axios from "axios";
const apiUrl = axios.create({ baseURL: "https://lab-api-bq.herokuapp.com"});


export const api = {
  register: async (body) => {
    try {
      const response = await apiUrl.post(`/users`, body);

      return response;
    } catch (error) {
      window.alert(error.response.data.message)
      return error.response.data;
    }
  },

  login: async (body) => {
    try {
      const response = await apiUrl.post(`/auth`, body);
      return response.data;
    } catch (error) {
      window.alert(error.response.data.message);
      return error.response;
    }
  },

  getProducts: async () => {
    try {
      const token = localStorage.getItem("token");
    const axiosConfig = {
      headers: {
        Authorization: token,
      },
    };
    const response = await apiUrl.get(`/products`, axiosConfig);
    return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
    
  },

  postOrders: async (body) => {
    try {
      const token = localStorage.getItem("token");
      const axiosConfig = {
        headers: {
          Authorization: token,
        },
      };
      const response = await apiUrl.post(`/orders`, body, axiosConfig);
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  getOrders: async () => {
    try {
      const token = localStorage.getItem("token");
      const axiosConfig = {
        headers: {
          Authorization: token,
        },
      };
      const response = await apiUrl.get(`/orders`, axiosConfig);
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  },

  getOrdersId: async (orderId) => {
    try {
      const token = localStorage.getItem("token");
      const axiosConfig = {
        headers: {
          Authorization: token,
        },
      };
      const response = await apiUrl.get(
        `/orders/${orderId}`,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  },

  putOrdersId: async (orderId, body) => {
    const token = localStorage.getItem("token");
    const axiosConfig = {
      headers: {
        Authorization: token,
      },
    };

    try {
      const response = await apiUrl.put(
        `/orders/${orderId}`,
        body,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.log(error.response.data.message);
      return error.response;
    }
  },

  deleteOrdersId: async (orderId) => {
    try {
      const token = localStorage.getItem("token");
      const axiosConfig = {
        headers: {
          Authorization: token,
        },
      };
      const response = await apiUrl.delete(
        `/orders/${orderId}`,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  },
};
