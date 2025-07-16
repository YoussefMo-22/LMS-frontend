import '../App.css'
import { RouterProvider } from 'react-router-dom'
import router from '../routes/router'
import { Provider } from 'react-redux'
import store from '../shared/store'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Toaster position="top-right" />
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </QueryClientProvider>
  )
}

export default App
