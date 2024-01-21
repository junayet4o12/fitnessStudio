import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import MyRouts from './MyRouts/MyRouts.jsx';
import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import AuthProviders from './Authentication/AuthProvider/AuthProviders.jsx';
import { Provider } from 'react-redux';
import store from './Redux/Store/store.jsx';
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <HelmetProvider>
        <AuthProviders>
          <RouterProvider router={MyRouts} />
        </AuthProviders>
      </HelmetProvider>
    </Provider>
  </QueryClientProvider>,
)
