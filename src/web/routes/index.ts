import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from 'react-router-dom'
import router from './router'

const routes = createBrowserRouter(router)

export default routes
