import './mockApi';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import '@fontsource/plus-jakarta-sans';
import '@fontsource/plus-jakarta-sans/600.css';
import '@fontsource/plus-jakarta-sans/700.css';
import '@fontsource/plus-jakarta-sans/800.css';
import '../../src/index.css';
import App from '../../src/App';

createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
