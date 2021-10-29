import { useState } from "react"
import axios from "axios";
import { useHistory } from "react-router-dom";
import './login.css';
import {DEFAULT_EMAIL_ID, DEFAULT_PASS} from '../config';

export const LoginComponent = () =>  {
    const [email, setEmail] = useState(DEFAULT_EMAIL_ID);
    const [password, setPassword] = useState(DEFAULT_PASS);
    const [error, setError] = useState('');
    const history = useHistory();

    function handleSubmit(event) {
        event.preventDefault();
        login(email, password);
    }

    async function login(email, password) {
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
                sessionStorage.setItem('auth-token', token);
                history.push('/dashboard');
            } else if (res.status === 401) {
                setError('Invalid Credentail(s). Please enter valid email and password.')
            } else if (res.status === 503) {
                setError('Server is taking too long. Please wait for sometime.')
            } else {
                setError('Something went wrong. Please try again later.')
            }}).catch(err =>{
                setError('Invalid credentials');
            })
    }

     return (<div className="login-form">
  <form onSubmit={handleSubmit}>
    <div><h1>Login</h1></div>
    {error !== '' && (<div className="error">{error}</div>)}
    <div className="content">
      <div className="input-field">
        <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="nope" />
      </div>
      <div className="input-field">
        <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)}  autoComplete="new-password"  />
      </div>
     
    </div>
    <div className="action">
      <button>Sign in</button>
    </div>
  </form>
</div>)

}

