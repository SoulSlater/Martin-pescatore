import { Navigate } from 'react-router-dom';
import { useMenu } from '../context/MenuContext';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useMenu();
  if (!isAuthenticated) return <Navigate to="/admin" replace />;
  return children;
}
