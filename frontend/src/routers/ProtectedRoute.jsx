import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = sessionStorage.getItem('token');
  const userStr = sessionStorage.getItem('user');
  
  // Nếu không có token, redirect về login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Nếu cần kiểm tra role
  if (requiredRole) {
    try {
      const user = JSON.parse(userStr);
      
      // Nếu role không khớp, redirect về trang chủ
      if (user.role !== requiredRole) {
        return <Navigate to="/" replace />;
      }
    } catch (error) {
      // Nếu parse user thất bại, redirect về login
      return <Navigate to="/login" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;