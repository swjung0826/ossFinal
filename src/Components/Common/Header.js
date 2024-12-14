import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Common.css";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태 관리
  const navigate = useNavigate(); // 검색 결과 페이지로 이동하기 위한 useNavigate 훅

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // 검색어가 입력된 경우 검색 결과 페이지로 이동
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    } else {
      alert("검색어를 입력하세요.");
    }
  };

  return (
    <>
      <header className="header-container">
        <Link to="/home" className="title">
          다먹자
        </Link>
        <div className="search-container">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="지역명 및 음식명을 입력하세요..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // 검색어 상태 업데이트
            />
            <button type="submit">검색</button>
          </form>
        </div>
        <div className="user-login-container">
          <div className="user">
            <Link to="/user">
              <button type="button" className="btn btn-primary">사용자 확인</button>
            </Link>
          </div>
          <div className="login">
            <Link to="/login">
              <button type="button" className="btn btn-primary">로그인</button>
            </Link>
          </div>
        </div>
      </header>
      <nav className="nav">
      <Link to="/pageIntro" className="nav-link">
          홈페이지 소개
        </Link>
        <Link to="/Page/ByRegion" className="nav-link">
          부산 지역별 맛집
        </Link>
        <Link to="/ByTheme" className="nav-link">
          부산 테마별 맛집
        </Link>
        <Link to="/Notice" className="nav-link">
          공지사항
        </Link>
        <Link to="/faq" className="nav-link">
          FAQ
        </Link>
      </nav>
    </>
  );
}