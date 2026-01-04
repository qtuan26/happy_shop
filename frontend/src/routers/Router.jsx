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
const Account = lazy(() => import("../components/pages/Account.jsx"));
const MoMoPayment = lazy(() => import("../components/pages/MoMOoPayment.jsx"));




const routers = [
  
  
  {path: "login", component:Login},
  {path: "register", component:Register},
  {path: "cart", component:ShoppingCart},
  {path: "support", component:EmployeeChat},
  {path: "account", component:Account},
  {path: "momo-payment", component:MoMoPayment},
  // <Route path="/momo-payment" element={<MoMoPayment />} />
  

  // ===== MAIN LAYOUT =====
  {
    path: "",
    component: MainLayout,
    children: [
      { index: true, component: Home },
      { path: "introduction", component: Introduction },

      // ===== PRODUCT =====
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



  // {
  //   path: "",
  //   component: MainLayout, // Header, banner, footer nếu có
  //   children: [
  //     { index: true, component: Home }, // Trang chủ
  //     {path: "introduction", component:Introduction},

  //     {
  //       path: "category",
  //       component: ProductLayout,
  //       children: [
  //         { path: ":categoryId", component: ProductPage },
  //         // { path: ":categoryId/:productId", component: ProductDetail },
  //       ],
  //     },
  //     {
  //       path: "category/:categoryId/:productId",
  //       component: ProductDetail,
  //     },
  //   ],
  // },
  
];

export { routers };
