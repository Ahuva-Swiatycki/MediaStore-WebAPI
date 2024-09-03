import { apiClient } from "../api/apiClient";


const getOrderByUserId = async (userId) => {
  try {
    const response = await apiClient.get(`Orders/user/${userId}`); 
    return response.data;
  } catch (error) {
    throw error;
  }
};




const createOrder = async (orderData) => {
  try {
    const response = await apiClient.post('Orders', orderData); 
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error; 
  }
};


const updateOrder = async (OrderDetails) => {
  try {
    const res = await apiClient.put("Orders", OrderDetails);
    return res.data;
  } catch (error) {
    console.error('Error updating Order:', error);
    throw error;
  }
};

export { getOrderByUserId, updateOrder, createOrder };
