// Standalone demo: the file is opened from disk (file://), where browser-history
// routing cannot work, so BrowserRouter is swapped for HashRouter.
export * from 'react-router';
export {HashRouter as BrowserRouter} from 'react-router';
