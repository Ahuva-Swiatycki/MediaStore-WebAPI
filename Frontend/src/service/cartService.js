// import { apiClient} from "../api/apiClient";

// const getCart = async (userId) => {
//   try {
//     const res = await apiClient.get(`Carts/${userId}`);
//     return res.data;
//   } catch (error) {
//     console.error('Error fetching cart:', error);
//     throw error;
//   }
// };

// const createCart = async (newCartDetails) => {
//   try {
//     const res = await apiClient.post("Carts", newCartDetails);
//     return res.data;
//   } catch (error) {
//     console.error('Error creating cart:', error);
//     throw error;
//   }
// };

// const updateCart = async (CartDetails) => {
//   try {
//     const res = await apiClient.put("Carts", CartDetails);
//     return res.data;
//   } catch (error) {
//     console.error('Error updating cart:', error);
//     throw error;
//   }
// };

// const deleteProductFromCart = async (cartId) => {
//   try {
//     await apiClient.delete(`Carts/${cartId}`);
//   } catch (error) {
//     console.error('Error deleting product from cart:', error);
//     throw error;
//   }
// };

// export { getCart, deleteProductFromCart, updateCart, createCart };
