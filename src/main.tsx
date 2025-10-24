import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// import ContextProvider from './Features/ContextProvider.tsx'
import { store } from './Store/Store.ts'
import { Provider } from 'react-redux'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'react-toastify/dist/ReactToastify.css';



const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <ContextProvider> */}
    <Provider store={store} >
      <QueryClientProvider client={queryClient}>
          <App />
          <ReactQueryDevtools initialIsOpen={true} position="bottom" />
      </QueryClientProvider>
    </Provider>
      
    {/* </ContextProvider> */}
  </StrictMode>,
)
