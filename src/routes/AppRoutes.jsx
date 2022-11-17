import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import { PrivateRoutes } from '.';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
