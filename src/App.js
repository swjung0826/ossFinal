import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Common/Header";
import Footer from "./Components/Common/Footer";
import Body from "./Components/Common/Body";
import Detail from "./Page/Detail";
import Home from "./Components/Layout/Home";
import Login from "./Components/User/Login";
import Notice from "./Page/Notice";
import ByTheme from "./Page/ByTheme";
import ByRegion from "./Page/ByRegion";
import UserGet from "./Components/User/UserGet"; 
import UserUpdate from "./Components/User/UserUpdate"; 

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/body" element={<Body />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/bytheme" element={<ByTheme />} />
        <Route path="/page/byregion" element={<ByRegion />} />
        <Route path="/user" element={<UserGet />} /> 
        <Route path="/user/update/:id" element={<UserUpdate />} /> {/* ID 기반 라우팅 */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
