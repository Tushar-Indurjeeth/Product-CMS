import { Provider } from 'react-redux';
import { store } from '../redux-app/store';
import '../styles/globals.css';
import { useEffect, useState } from 'react';

const MyApp = ({ Component, pageProps }) => {
  // Fixes Hydration Error
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);

  useEffect(() => {
    setInitialRenderComplete(true);
  }, []);

  if (!initialRenderComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    );
  }
};

export default MyApp;
