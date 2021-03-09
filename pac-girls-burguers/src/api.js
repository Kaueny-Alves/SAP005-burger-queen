import axios from "axios";

let baseUrl = "https://lab-api-bq.herokuapp.com";

export default {
  register: async (body) => {
    try {
      const response = await axios.post(`${baseUrl}/users`, body);
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  login: async (body) => {
    try {
      const response = await axios.post(`${baseUrl}/auth`, body);
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  },

  getProducts: async () => {
    const token = localStorage.getItem("token");
    const axiosConfig = {
      headers: {
        Authorization: token,
      },
    };
    const response = await axios.get(`${baseUrl}/products`, axiosConfig);
    return response.data;
  },

  postOrders: async (body) => {
    try {
      const token = localStorage.getItem("token");
      const axiosConfig = {
        headers: {
          Authorization: token,
        },
      };
      const response = await axios.post(`${baseUrl}/orders`, body, axiosConfig);
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
      const response = await axios.get(`${baseUrl}/orders`, axiosConfig);
      return response.data;
    } catch (error) {
      console.log(error);
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
      const response = await axios.get(
        `${baseUrl}/orders/${orderId}`,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.log(error);
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
      const response = await axios.put(
        `${baseUrl}/orders/${orderId}`,
        body,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.log(error.response.data.message);
      return error.response.data;
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
      const response = await axios.delete(
        `${baseUrl}/orders/${orderId}`,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};
