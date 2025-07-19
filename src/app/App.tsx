import '../App.css'
import { RouterProvider } from 'react-router-dom'
import router from '../routes/router'
import { Provider } from 'react-redux'
import store from '../shared/store'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '../features/auth/context/AuthContext';
import { HelmetProvider } from 'react-helmet-async';

const queryClient = new QueryClient();

function App() {

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <AuthProvider>
            <Toaster position="top-right" />
            <RouterProvider router={router}></RouterProvider>
          </AuthProvider>
        </Provider>
      </QueryClientProvider>
    </HelmetProvider>
  )
}

export default App
