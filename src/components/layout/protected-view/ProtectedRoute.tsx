import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/shared/store';
import toast from 'react-hot-toast';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const { token, user, logout } = useAuthStore();

  useEffect(() => {
    if (!token || !user) {
      if (token || user) {
        // If one is missing but the other exists, clear the invalid state
        logout();
      }
      
      navigate('/login', { replace: true });
      toast.error('Sesi telah berakhir atau Anda belum login.');
    } else if (user.wajibGantiPassword && window.location.pathname !== '/force-change-password') {
      navigate('/force-change-password', { replace: true });
    }
  }, [token, user, navigate, logout]);

  // If valid, render children
  return token && user ? <>{children}</> : null;
};

export default ProtectedRoute;
