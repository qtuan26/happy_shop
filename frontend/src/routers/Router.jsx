import { lazy } from "react";

const Login = lazy(() => import("../components/auth/Login.jsx"));
const Register = lazy(() => import("../components/auth/Register.jsx"));
const MainLayout = lazy(() => import("../components/layouts/Main.jsx"));
const ProductLayout = lazy(() => import("../components/layouts/Product.jsx"));
const ProductPage = lazy(() => import("../components/products/ProductPage.jsx"));
const ProductDetail = lazy(() => import("../components/products/ProductDetail.jsx"));
const ShoppingCart = lazy(() => import("../components//pages/ShoppingCart.jsx"));
const Home = lazy(() => import("../components/pages/Home.jsx"));
const EmployeeChat = lazy(() => import("../components/chat/EmployeeChat.jsx"));
const CustomerChat = lazy(() => import("../components/chat/CustomerChat.jsx"));
const Introduction = lazy(() => import("../components/pages/Introduction.jsx"));



const routers = [
  
  
  {path: "login", component:Login},
  {path: "register", component:Register},
  {path: "cart", component:ShoppingCart},
  {path: "support", component:EmployeeChat},
  



  {
    path: "",
    component: MainLayout, // Header, banner, footer nếu có
    children: [
      { index: true, component: Home }, // Trang chủ
      {path: "introduction", component:Introduction},
      {
        
        path: "",
        component: ProductLayout, // Layout có Filter
        children: [
          {path: ":brand", component: ProductPage},
        ],
      },
      {path: "/:brand/:id", component: ProductDetail}

    ],
  },
  
];

export { routers };
