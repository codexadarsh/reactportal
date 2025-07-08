import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "./components";
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"


const App = () => {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <ToastContainer/>
    <Footer/>
    </>
  );
}

export default App;
