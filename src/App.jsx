import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./store/AuthCtx";
import Wrapper from "./components/Ul/Wrapper";
import ProtectedAdminRoutes from "./pages/ProtectedAdminRoutes";
import toast, { Toaster } from "react-hot-toast";
import Users from "./pages/Users";
import Categories from "./pages/Categories";
import Add from "./pages/Add";

function App() {
  const { isUserLoggedIn, role } = useAuthContext();

  return (
    <Wrapper>
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} children={<Route path="/page/:pageId" element={<HomePage />} />} />
        <Route path="/login" element={isUserLoggedIn ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/register" element={isUserLoggedIn ? <Navigate to="/" replace /> : <Register />} />
        <Route path="/add" element={isUserLoggedIn ? <Add /> : <Navigate to="/" replace />} />
        <Route path="/edit" element={isUserLoggedIn ? <Add /> : <Navigate to="/" replace />} />

        <Route element={<ProtectedAdminRoutes role={role} />}>
          <Route path="/users" element={<Users />} />
          <Route path="/categories" element={<Categories />} />
        </Route>
      </Routes>
    </Wrapper>
  );
}

export default App;
