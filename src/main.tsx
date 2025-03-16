import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Імпорт стилів нормалізації
import 'modern-normalize';
import './index.css';
import App from './components/App';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
    <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
  </React.StrictMode>
);
