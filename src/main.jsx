
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import SpeedInsights from './SpeedInsights.jsx';
import BetterOnDesktopPopup from './components/BetterOnDesktopPopup.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
      <App />
      <BetterOnDesktopPopup />
      <SpeedInsights />
    </>
  </StrictMode>,
);
