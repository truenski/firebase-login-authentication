import './global.css';
import { AppRoutes } from './routes/AppRoutes';
import { AuthGoogleProvider } from './contexts/authGoogle';
import { AuthEmailPasswdProvider } from './contexts/authEmailPassword';

export function App() {
  return (
    <AuthGoogleProvider>
      <AuthEmailPasswdProvider>
        <AppRoutes />
      </AuthEmailPasswdProvider>
    </AuthGoogleProvider>
  );
}
