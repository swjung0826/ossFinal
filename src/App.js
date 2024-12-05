import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Common/Header';
import Footer from './Components/Common/Footer';
import Body from './Components/Common/Body';
import Detail from './Page/Detail';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
