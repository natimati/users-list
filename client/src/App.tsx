import { Route, Routes } from 'react-router-dom';
import Login from "./components/Login"
import Register from './components/Register';
import UserPage from './components/UserPage';

const App = () => {
   return (
    <Routes>
      <Route path="login"
      element={
        <Login />
      } />
      <Route path="register"
        element={
          <Register />
        } />
      <Route path=""
        element={
        <UserPage />
      } />
    </Routes>
  )
}

export default App;
