import { lazy } from "react";

const Login = lazy(() => import("../components/auth/Login.jsx"));
const Register = lazy(() => import("../components/auth/Register.jsx"));
const MainLayout = lazy(() => import("../components/layouts/Main.jsx"));
const ProductPage = lazy(() => import("../components/products/ProductPage.jsx"));
const ProductDetail = lazy(() => import("../components/products/ProductDetail.jsx"));
const ShoppingCart = lazy(() => import("../components/pages/ShoppingCart.jsx"));
const Home = lazy(() => import("../components/pages/Home.jsx"));
const AdminChat = lazy(() => import("../components/chat/AdminChat.jsx"));
const Introduction = lazy(() => import("../components/pages/Introduction.jsx"));
const Account = lazy(() => import("../components/pages/Account.jsx"));
const MoMoPayment = lazy(() => import("../components/pages/MoMOoPayment.jsx"));

const routers = [
  // Auth routes
  { path: "login", component: Login },
  { path: "register", component: Register },
  
  // Standalone routes
  { path: "cart", component: ShoppingCart },
  { path: "account", component: Account },
  { path: "momo-payment", component: MoMoPayment },
  
  // Admin routes
  { path: "admin-chat", component: AdminChat },
  
  // Main layout routes
  {
    path: "",
    component: MainLayout,
    children: [
      { index: true, component: Home },
      { path: "introduction", component: Introduction },

      // Product routes
      {
        path: ":categoryId",
        component: ProductPage,
      },
      {
        path: ":categoryId/:productId",
        component: ProductDetail,
      },
    ],
  },
];

export { routers };

// Note: CustomerChat giờ được tích hợp vào MainLayout
// Không cần route /support nữa