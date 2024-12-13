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
import UserGet from "./Components/User/UserGet"; // 사용자 확인 컴포넌트 추가

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Notice" element={<Notice />} />
        <Route path="/body" element={<Body />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/bytheme" element={<ByTheme />} />
        <Route path="/Page/ByRegion" element={<ByRegion />} />
        <Route path="/user" element={<UserGet />} /> {/* 사용자 확인 경로 추가 */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
