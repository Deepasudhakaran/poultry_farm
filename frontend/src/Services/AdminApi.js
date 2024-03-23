import { adminInstances } from "../Axios/AdminInstance";

export const getUserList = async () => {
  try {
    const response = await adminInstances.get('/admin/userlist');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const adminLogin = async (values) => {
  try {
    const response = await adminInstances.post("/adminlogin", { ...values })
    return response.data
  } catch (error) {
    console.log('Error', error.message);
  }
};

export const getAdminFeedReport = async () => {
  try {
    const response = await adminInstances.get('/adminfeedlist');
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
export const getAdminEggReport = async () => {
  try {
    const response = await adminInstances.get('/adminegglist');
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

export const getAdminMedicineReport = async () => {
  try {
    const response = await adminInstances.get('/adminmedicinelist');
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

export const getAdminMortalityReport = async () => {
  try {
    const response = await adminInstances.get('/adminmortalitylist');
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

export const getAdminProfile = async () => {
  try {
    const response = await adminInstances.get('/adminprofile');
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

