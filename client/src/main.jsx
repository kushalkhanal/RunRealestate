import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          fontFamily: 'Poppins, sans-serif',
          fontSize: '0.88rem',
          borderRadius: '10px',
          background: '#1a1a2e',
          color: '#fff',
        },
        success: {
          iconTheme: { primary: '#c9a84c', secondary: '#fff' },
        },
        error: {
          iconTheme: { primary: '#ef4444', secondary: '#fff' },
        },
      }}
    />
  </BrowserRouter>
)
