import React from "react";
import "./Common.css";

export default function Header() {
  return (
    <>
      <header className="header-container">
        <a className="title" href="#home">다먹자</a>
        <div className="search-container">
          <input type="text" placeholder="지역명 또는 음식명을 입력하세요..." />
          <button type="submit">검색</button>
        </div>
        <div className="login">
          <button type="submit">로그인</button>
        </div>
      </header>
      <nav className="nav">
        <a href="#home">홈</a>
        <a href="#about">소개</a>
        <a href="#contact">문의</a>
      </nav>
    </>
  );
}
