import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css';
import Lottie from 'lottie-web';
import animationData from '../animation/animation.json';
import { showLogin } from '../animation';
import keycloakImage from '../../image/keycloak.png';
import { IoIosArrowDropright } from "react-icons/io";
import { login, loginWithKeycloak } from '../../services/user.services';

const Login: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      localStorage.setItem('token', response.token); 
      navigate('/dashboard', {state: {userInfo: response.userInfo}});
      setError(null); 
    } catch (err: any) {
      console.error('Login failed:', err);
      if (Array.isArray(err.message)) {
        setError(err.message[0]); 
      } else {
        setError(err.message || 'An error occurred');
      }
    }
  };

  const handleLoginWithKeycloak = async () => {
    try {
      const response = await loginWithKeycloak(email, password);
      console.log(response);
      localStorage.setItem('token', response.authorization.access_token);
      navigate('/dashboard', {state: {userInfo: response.infoUser}});
      setError(null);
    } catch (err: any) {
      console.error('Login with Keycloak failed:', err);
      if (Array.isArray(err.message)) {
        setError(err.message[0]); 
      } else {
        setError(err.message || 'An error occurred');
      }
    }
  };

  useEffect(() => {
    showLogin();

    if (containerRef.current) {
      const anim = Lottie.loadAnimation({
        container: containerRef.current,
        animationData: animationData,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        rendererSettings: {
          progressiveLoad: true,
        },
      });

      return () => {
        anim.destroy();
      };
    }
  }, []);

  return (
    <section id="app-login" className={styles.loginApp}>
      <div className="grid grid-cols-12 gap-4">
        <div className={`col-span-7 p-4 ${styles.bgBlue}`}>
          <div ref={containerRef} style={{ width: '100%', height: '100%' }}></div>
        </div>
        <div className="col-span-5 py-8 px-6 bg-blue-200 p-4">
          <div className="content-form">
            <h1 className={`poppins-bold ${styles.title}`}>Espadin</h1>
            <p className={`poppins-light ${styles.subtitle}`}>Conecta con diversos participantes y descubre una amplia gama de servicios disponibles para impulsar tu negocio.</p>
          </div>
          <div className={styles.divider}></div>
          <div className="py-8 px-0">
            <form className="mb-0 space-y-6" onSubmit={handleLogin}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-100 poppins-light">Email address or Username</label>
                <div className="mt-1">
                  <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" required placeholder='Type your email or username' />
                </div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-100 poppins-light">Password</label>
                <div className="mt-1">
                  <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" required placeholder='Password' />
                </div>
                {error && <div className="text-red-500 text-sm mt-0">{error}</div>}
                <button type="submit" className="rounded btn btn-primary mt-5">
                  <span className="btnText">Iniciar sesión</span>
                </button>
                <div className="option">
                  <span>O</span>
                </div>
                <button type="button" className="rounded btn btn-outline" onClick={handleLoginWithKeycloak}>
                  <span className="btnImg"><img src={keycloakImage} alt="KeyCloak" /></span>
                  <span className="btnText">Login with KeyCloak</span>
                  <span className="btnIcon"><IoIosArrowDropright size={20} /></span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
