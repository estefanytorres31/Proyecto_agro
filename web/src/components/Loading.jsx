import React, { useEffect } from 'react';

const LoaderCircle = () => {
  const styles = {
    centerBody: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100vw',
      height: '100vh',
    },
    loaderCircle: {
      position: 'relative',
      width: '100px',
      height: '100px',
      border: '6px solid #dbf1b5',
      borderTop: '6px solid #4caf50',
      borderRadius: '100%',
      animation: 'spin 5.5s linear infinite',
    },
    text: {
      position: 'absolute',
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
      color: '#1c1c1c',
      letterSpacing: '2px',
      textTransform: 'uppercase',
      animation: 'fadeText 2.5s ease-in-out infinite',
    },
  };

  const keyframes = `
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    @keyframes fadeText {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }
  `;

  useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = keyframes;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div style={styles.centerBody}>
      <div style={styles.loaderCircle}></div>
      <span style={styles.text}>Loading</span>
    </div>
  );
};

export default LoaderCircle;
