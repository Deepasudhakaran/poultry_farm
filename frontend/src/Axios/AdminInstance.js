import axios from 'axios';

const adminInstances = axios.create({
    baseURL: 'http://localhost:8080/admin',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
    },
})

export { adminInstances };