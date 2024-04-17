import { adminInstances } from "../Axios/AdminInstance";

export const getUserList = async () => {
  try {
    const response = await adminInstances.get('/admin/userlist');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteuser = async (id) => {
  try {
    const response = await adminInstances.delete(`/deleteuser/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};





export const blockUser = async (userId) => {
  console.log(userId, 'userid');
  return adminInstances.put(`/admin/block/${userId}`)

};

export const unblockUser = async (userId) => {
  console.log(userId, 'userid');
  return adminInstances.put(`/admin/unblock/${userId}`)
};
 


export const adminLogin = async (values) => {
  try {
    const response = await adminInstances.post("/adminlogin", { ...values })
    return response.data
  } catch (error) {
    console.log('Error', error.message);
  }
};

export const getAdminFeedReport = async (id) => {
  try {
    const response = await adminInstances.get(`/adminfeedlist/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};



export const deleteAdminFeed = async (id) => {
  try {
    const response = await adminInstances.delete(`/deleteadminfeed/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
export const getAdminEggReport = async (id) => {
  try {
    const response = await adminInstances.get(`/adminegglist/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const deleteAdminEgg = async (id) => {
  try {
    const response = await adminInstances.delete(`/deleteadminegg/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAdminMedicineReport = async (id) => {
  try {
    const response = await adminInstances.get(`/adminmedicinelist/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteAdminMedicine = async (id) => {
  try {
    const response = await adminInstances.delete(`/deleteadminmedicine/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAdminMortalityReport = async (id) => {
  try {
    const response = await adminInstances.get(`/adminmortalitylist/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteAdminMortality = async (id) => {
  try {
    const response = await adminInstances.delete(`/deleteadminmortality/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getAdminProfile = async (id) => {
  try {
    const response = await adminInstances.get(`/adminprofile/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAdminNotificationList = async () => {
  try {
    const response = await adminInstances.get('/admincreatemessage');
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const deleteMessage = async (id) => {
  try {
    const response = await adminInstances.delete(`/admin/admincreatemessage/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

