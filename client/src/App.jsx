import { Route, Routes } from "react-router-dom";
import { lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExpanseData } from "./features/ExpanseSlice/ExpanseSlice";

import Header from "./components/Header";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import Footer from "./components/Footer";
const Login = lazy(() => import("./components/Auth/Login"));
const SignUp = lazy(() => import("./components/Auth/SignUp"));
const DashBoard = lazy(() => import("./components/Auth/DashBoard"));

function App() {
  const dispatch = useDispatch();

  const { userId } = useSelector((state) => state.Auth);
  useEffect(() => {
    if (userId) {
      dispatch(getExpanseData(userId));
    }
  }, [dispatch, userId]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route
          path="/dashBoard"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
