import { Outlet } from "react-router-dom";
import Header from "../common/Header";
import Footer from "../common/Footer";


const Main = () => {
  return (
    <div className="w-full">
      {/* Header cố định */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>

      {/* Nội dung chính */}
      <div className="pt-35 px-5 min-h-screen"> {/* tăng padding-top lên */}
        <Outlet />
      </div>
      <Footer/>
    </div>
  );
};

export default Main;
