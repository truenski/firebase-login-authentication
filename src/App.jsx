import './global.css';
import { AppRoutes } from './routes/AppRoutes';
import { AuthProvider } from './contexts/authContext';

export function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
