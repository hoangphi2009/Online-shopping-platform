import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import HomePage from "./components/home/HomePage.jsx";
import AuthLayout from "./components/auth/layout/AuthLayout.jsx";
import MainLayout from "./components/shared/layout/MainLayout.jsx";
import Login from "./components/auth/login/Login.jsx";
import Register from "./components/auth/register/Register.jsx";
import ProductDetailPage from "./components/ui/productDescriptionDetail/ProductDetailPage.jsx";
import MainCartLayout from "./components/shared/layout/MainCartLayout.jsx";
import CheckoutPage from "./components/ui/checkout/CheckoutPage.jsx";
import OrderSuccessPage from "./components/ui/orderSuccess/OrderSuccessPage.jsx";
import ScrollTop from "./components/control/scroll/ScrollTop.jsx";
import AccountPage from "./components/ui/account/AccountPage.jsx";

function App() {
  return (
    <>
      <Toaster position="top-right" richColors closeButton />
      <BrowserRouter>
        <ScrollTop />
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:productId" element={<ProductDetailPage />} />
            <Route path="/cart" element={<MainCartLayout />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-success" element={<OrderSuccessPage />} />
            <Route path="/account" element={<AccountPage />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
