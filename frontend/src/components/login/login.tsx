import React, { useState } from 'react';
import styles from './login.module.css';
import { UserService } from '../../services/user.services';
import { useNavigate } from 'react-router-dom';


const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const data = await UserService.login(email, password);
      // if (data.userId) {
      //   navigate(`/${data.userId}`);
      // }
      console.log(data);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
return (
    <div className={styles.login}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email or Username:</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login with keycloak</button>
      </form>
    </div>
  );
};

export default Login;
