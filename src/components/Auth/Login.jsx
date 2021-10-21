import axios from 'axios';
import React from 'react';
import { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    let conf = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      responseType: "json",
      withCredentials: true,
    }
    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        
        const apiUrl = 'http://localhost:8000/api/login';
        axios.post(apiUrl, {email,password}, conf).then((resp) => {
          console.log(resp.data);
        }).catch((err) => console.log(err));

    }
    const btnuser = () => {
      const apiUrl = 'http://localhost:8000/api/user';
        axios.get(apiUrl, conf).then((resp) => {
          console.log(resp.data);
        }).catch((err) => console.log(err));
    }

  return (
    <div className="FormLogin">
      <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please register</h1>

            <input type="email" className="form-control" placeholder="Email address" required
                   onChange={e => setEmail(e.target.value)}
            />

            <input type="password" className="form-control" placeholder="Password" required
                   onChange={e => setPassword(e.target.value)}
            />

            <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
        </form>
        <button onClick={btnuser}>getUser</button>
    </div> 
  );
}

export default Login;
