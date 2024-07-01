import React, { useEffect } from 'react';
import styles from './splash.module.css';
import { preLoaderAnim } from '../animation';
import { useNavigate } from 'react-router-dom';

const Splash: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    preLoaderAnim(navigate)
  }, [navigate]);

return (
    <div className={`preloader ${styles.preload}`}>
      <div className={`texts-container ${styles.textContainer}`}>
        <span>Conectividad,</span>
        <span>Colaboración,</span>
        <span>Accesibilidad</span>
      </div>
    </div>
  );
};

export default Splash;
