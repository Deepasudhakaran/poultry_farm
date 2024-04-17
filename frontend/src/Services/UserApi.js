import { UserInstances } from "../Axios/UserInstance"


export const userSignup =  async (values) =>{
    try{
        const response = await UserInstances.post('/signup', { ...values });
        console.log('Respons:', response.data);
        return response.data;
    } catch (error) {
        console.error('error:', error);
        console.log('Error message :', error.message);
        throw error;
    }
};

export const userLogin = async (userData) =>{
    try{
        const response = await UserInstances.post('/login', userData);
        return response.data;
    } catch (error) {
        console.log('Error logging in :', error.message);
        throw error;
    }
};

export const userHeader = () => {
    return UserInstances.get('/userheader')
  };
  

  export const feedReport =  async (userId,farmId, values) =>{
    try{
        const response = await UserInstances.post('/feed', { ...values ,userId,farmId});
        console.log('Respons:', response.data);
        return response.data;
    } catch (error) {
        console.error('error:', error);
        console.log('Error message :', error.message);
        throw error;
    }
};

export const getFeedReport = async (userId, farmId) => {
    try {
      const response = await UserInstances.get(`/feedlist/${userId}`, farmId);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  

  export const deleteFeed = async (id) => {
    try {
      const response = await UserInstances.delete(`/deletefeed/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const eggReport =  async (userId,values) =>{
    try{
        const response = await UserInstances.post('/egg', { ...values,userId });
        console.log('Respons:', response.data);
        return response.data;
    } catch (error) {
        console.error('error:', error);
        console.log('Error message :', error.message);
        throw error;
    }
};

export const getEggReport = async (userId) => {
    try {
      const response = await UserInstances.get(`/egglist/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const deleteEgg = async (id) => {
    try {
      const response = await UserInstances.delete(`/deleteegg/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    } 
  };

  
  export const medicineReport =  async (userId,values) =>{
    try{
        const response = await UserInstances.post('/medicine', { ...values,userId});
        console.log('Respons:', response.data);
        return response.data;
    } catch (error) {
        console.error('error:', error);
        console.log('Error message :', error.message);
        throw error;
    }
};

export const getMedicineReport = async (userId) => {
    try {
      const response = await UserInstances.get('/medicinelist', userId);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const deleteMedicine = async (id) => {
    try {
      const response = await UserInstances.delete(`/deletemedicine/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const mortalityReport =  async (userId,values) =>{
    try{
        const response = await UserInstances.post('/mortality', { ...values,userId });
        console.log('Respons:', response.data);
        return response.data;
    } catch (error) {
        console.error('error:', error);
        console.log('Error message :', error.message);
        throw error;
    }
};

export const getMortalityReport = async (userId) => {
    try {
      const response = await UserInstances.get(`/mortalitylist/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const deleteMortality = async (id) => {
    try {
      const response = await UserInstances.delete(`/deletemortality/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }




  
  export const userProfile =  async (userId,values) =>{
    try{
        const response = await UserInstances.post('/editprofile', { ...values,userId });
        console.log('Respons:', response.data);
        return response.data;
    } catch (error) {
        console.error('error:', error);
        console.log('Error message :', error.message);
        throw error;
    }
};



export const getProfile = async (userId) => {
  try {
    const response = await UserInstances.get(`/profile/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};



export const Createusermessage = async (postData) => {
  try {
    console.log('postData:', postData);
    const response = await UserInstances.post('/createmessage', postData);
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating message:', error);
    throw error;
  }
};

export const updateMedicine = async (id, values) => {
  try {
    const response = await UserInstances.put(`/updatemedicine/${id}`, { ...values });
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating medicine:', error);
    throw error;
  }
};


export const updateFeed = async (id, values) => {
  try {
    const response = await UserInstances.put(`/updatefeed/${id}`, { ...values });
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating medicine:', error);
    throw error;
  }
};


export const updateEgg = async (id, values) => {
  try {
    const response = await UserInstances.put(`/updateegg/${id}`, { ...values });
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating medicine:', error);
    throw error;
  }
};


export const updateMortality = async (id, values) => {
  try {
    const response = await UserInstances.put(`/updatemortality/${id}`, { ...values });
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating medicine:', error);
    throw error;
  }
};







