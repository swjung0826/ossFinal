import React from "react";
import { Link } from "react-router-dom";
import "./Common.css";

export default function Header() {
  return (
    <>
      <header className="header-container">
        <Link to="/" className="title">
          다먹자
        </Link>
        <div className="search-container">
          <input type="text" placeholder="지역명 또는 음식명을 입력하세요..." />
          <button type="submit">검색</button>
        </div>
        <div className="login">
          <Link to="/login">
            <button type="button" className="btn btn-primary">로그인</button>
          </Link>
        </div>
      </header>
      <nav className="nav">
        <Link to="/Page/PageIntro" className="nav-link">
          페이지 소개
        </Link>
        <Link to="/Notice" className="nav-link">
          공지사항
        </Link>
        <Link to="/Page/ByRegion" className="nav-link">
          부산 맛집 찾기
        </Link>
        <Link to="/Page/Faq" className="nav-link">
          FAQ
        </Link>
      </nav>
    </>
  );
}
