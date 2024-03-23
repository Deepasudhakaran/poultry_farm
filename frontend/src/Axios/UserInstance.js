import axios from 'axios';
const UserInstances = axios.create({
    baseURL: 'http://localhost:8080',
    headers:{
        Authorization:`Bearer ${localStorage.getItem('userToken')}`,
    },
})

export { UserInstances };