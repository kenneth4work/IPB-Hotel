import {StrictMode, type ComponentType} from 'react';
import {createRoot} from 'react-dom/client';
import {createInertiaApp} from '@inertiajs/react';
import '@fontsource/plus-jakarta-sans';
import '@fontsource/plus-jakarta-sans/600.css';
import '@fontsource/plus-jakarta-sans/700.css';
import '@fontsource/plus-jakarta-sans/800.css';
import './index.css';

const pages = import.meta.glob<{default: ComponentType}>('./pages/**/*.tsx');

createInertiaApp({
  resolve: async (name) => {
    const page = pages[`./pages/${name}.tsx`];
    if (!page) throw new Error(`Unknown Inertia page: ${name}`);
    return (await page()).default;
  },
  setup({el, App, props}) {
    createRoot(el).render(
      <StrictMode>
        <App {...props} />
      </StrictMode>,
    );
  },
});
