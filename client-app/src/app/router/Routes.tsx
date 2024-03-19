import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import NotFound from "../../features/errors/NotFound";
import LoginForm from "../../features/users/LoginForm";
import RegisterForm from "../../features/users/RegisterForm";

export const route = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'activities', element: <ActivityDashboard /> },
      { path: 'activities/:id', element: <ActivityDetails /> },
      { path: 'createActivity', element: <ActivityForm key={'create'} /> },
      { path: 'manage/:id', element: <ActivityForm key={'manage'}/> },
      { path: 'login', element: <LoginForm /> },
      { path: 'register', element: <RegisterForm /> },
      {path: 'not-found', element: <NotFound />},
      {path: '*', element: <Navigate replace to='/not-found' />},
    ]
  }
]);
