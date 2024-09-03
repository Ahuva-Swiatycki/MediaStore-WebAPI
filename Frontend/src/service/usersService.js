import { apiClient } from "../api/apiClient";

export const signIn = async (credentials) => {
  try {
    const response = await apiClient.post('Users/login', credentials);
    const { token } = response.data;
    if (token) {
      localStorage.setItem('token', token);
    }
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw new Error('Failed to sign in. Please check your credentials and try again.');
  }
};

export const createUser = async (newUserDetails) => {
  try {
    const response = await apiClient.post("Users/register", newUserDetails);
    const { token } = response.data;
    if (token) {
      localStorage.setItem('token', token);
    }
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error);
    throw new Error('Failed to register. Please check your details and try again.');
  }
};

export const updateUser = async (userId, userDetails, useFetch = false) => {
  try {
    let response;
    const url = useFetch ? `/api/userDetails/${userId}` : `Users/${userId}`;
    const options = {
      method: useFetch ? 'PUT' : 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    };

    response = useFetch
      ? await fetch(url, options)
      : await apiClient.put(url, userDetails, { headers: options.headers });

    if (!response.ok) {
      throw new Error('Failed to update user details');
    }

    return useFetch ? await response.json() : response.data;
  } catch (error) {
    console.error('Update failed:', error);
    throw new Error('Failed to update user details. Please try again.');
  }
};

export const deleteUser = async (userId) => {
  try {
    await apiClient.delete(`Users/${userId}`);
  } catch (error) {
    console.error('Delete failed:', error);
    throw new Error('Failed to delete user. Please try again.');
  }
};

export const getUserDetails = async (userId) => {
  try {
    const response = await apiClient.get(`Users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user details:', error);
    throw new Error('Failed to fetch user details. Please try again.');
  }
};

export const changePassword = async ({ userId, currentPassword, newPassword }) => {
  try {
    const response = await apiClient.put(`Users/${userId}/change-password`, {
      currentPassword,
      newPassword,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to change password:', error);
    throw new Error('Failed to change password. Please try again.');
  }
};
