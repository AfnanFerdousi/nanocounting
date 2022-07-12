import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./pages/shared/Navbar";
import Home from './pages/Home/Home';
import Footer from './pages/shared/Footer'
import AllProducts from "./pages/Products/AllProducts";
import Login from "./pages/Login/Login";
import SignUp from "./pages/Login/SignUp";
import Purchase from "./pages/Purchase/Purchase";
import Dashboard from "./pages/Dashboard/Dashboard";
import MyOrders from "./pages/Dashboard/MyOrders";
import RequireAuth from './pages/Login/RequireAuth'
import Payment from "./pages/Purchase/Payment";
import Reciept from "./pages/Dashboard/Reciept";
import ManageOrder from "./pages/Dashboard/ManageOrder";
import AddProduct from "./pages/Dashboard/AddProduct";
import ManageProducts from "./pages/Dashboard/ManageProducts";
import MyProfile from "./pages/Dashboard/MyProfile";
import MakeAdmin from "./pages/Dashboard/MakeAdmin";
import MakeAccountant from "./pages/Dashboard/MakeAccountant";
import SOP from "./pages/Dashboard/SOP";
import SOFP from "./pages/Dashboard/SOFP";


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/products" element={<AllProducts/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/purchase/:id" element={<Purchase/>}/>
        <Route path='/dashboard' element={
            <RequireAuth><Dashboard></Dashboard></RequireAuth>}>
              <Route index element={<MyProfile />}></Route>
            <Route path="orders" element={<MyOrders />}></Route>    
            <Route path="manageOrder" element={<ManageOrder />}></Route>    
            <Route path="makeAdmin" element={<MakeAdmin />}></Route>    
            <Route path="makeAccountant" element={<MakeAccountant />}></Route>    
            <Route path="addProduct" element={<AddProduct />}></Route>    
            <Route path="sop" element={<SOP />}></Route>    
            <Route path="sofp" element={<SOFP />}></Route>    
            <Route path="manageProducts" element={<ManageProducts />}></Route>    
            <Route path="payment/:id" element={<RequireAuth><Payment></Payment></RequireAuth>}></Route> 
          </Route>
          <Route path="reciept/:id" element={<RequireAuth><Reciept></Reciept></RequireAuth>}></Route> 
      </Routes>
      <Footer/>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
