
 import axios from "axios";
 import {setToken} from '../utils';

 export async function login(email, password) {
    const res = await axios({
        method: 'post',
        url: '/auth',
        data: JSON.stringify({
            email,
            password
        }),
        headers: { 'Content-Type': 'application/json' }
    }).then(res =>{
        if (res.status === 200) {
            const { token } = res.data;
        } else if (res.status === 401) {
            alert('Invalid credentials');
        } else if (res.status === 503) {
            alert('Wait and try again');
        } else {
            alert('Something went wrong');
        }}).catch(err =>{
            alert('Invalid credentials');
        })
}