import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import "bootstrap-icons/font/bootstrap-icons.css";
import { AppRouter } from './router/AppRouter';

/*
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)*/

ReactDOM.createRoot(document.getElementById('root')).render(
  <AppRouter />
);
