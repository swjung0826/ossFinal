import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Detail.css";

const Detail = () => {
  const { state: restaurant } = useLocation(); // Body에서 전달한 state
  const navigate = useNavigate();

  if (!restaurant) {
    return (
      <div className="detail-container">
        <p>식당 정보를 불러오는 데 문제가 발생했습니다.</p>
        <button onClick={() => navigate("/")}>메인 페이지로 돌아가기</button>
      </div>
    );
  }

  return (
    <div className="detail-container">
      <header className="detail-header">
        <h1>{restaurant.MAIN_TITLE || "이름 정보 없음"}</h1>
        <button className="back-button" onClick={() => navigate(-1)}>
          뒤로 가기
        </button>
      </header>
      <div className="detail-content">
        <div className="detail-image">
          <img
            src={restaurant.MAIN_IMG_NORMAL || ""}
            alt={restaurant.MAIN_TITLE || "이미지 없음"}
          />
        </div>
        <div className="detail-info">
          <p><strong>주소:</strong> {restaurant.ADDR1 || "정보 없음"}</p>
          <p><strong>전화번호:</strong> {restaurant.CNTCT_TEL || "정보 없음"}</p>
          <p><strong>운영 시간:</strong> {restaurant.USAGE_DAY_WEEK_AND_TIME || "정보 없음"}</p>
          <p><strong>메뉴:</strong> {restaurant.RPRSNTV_MENU || "정보 없음"}</p>
          <p><strong>상세 설명:</strong> {restaurant.ITEMCNTNTS || "상세 설명 없음"}</p>
        </div>
      </div>
    </div>
  );
};

export default Detail;
