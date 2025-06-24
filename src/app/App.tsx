import '../App.css'
import { RouterProvider } from 'react-router-dom'
import router from '../routes/router'
import { Provider } from 'react-redux'
import store from '../shared/store'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <Provider store={store}>
      <Toaster position="top-right" />
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  )
}

export default App
