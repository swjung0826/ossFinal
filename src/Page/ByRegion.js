import React from "react";
import "./ByRegion.css";

export default function ByRegion() {
  return (
    <div className="byregion-container">
      {/* 왼쪽: 부산 지도 */}
      <div className="map-container">
        <h2>부산 지도</h2>
        <img
          img="https://cdn.crowdpic.net/detail-thumb/thumb_d_CE7E965BB28BDDD979E8DC240C47AC24.png"
          alt="부산 지도"
          className="map-image"
        />
      </div>
      {/* 가운데: 부산 정보 */}
      <div className="info-container">
        <h1>부산에 오신 것을 환영합니다!</h1>
        <p>
          부산은 한국에서 두 번째로 큰 도시이며, 아름다운 해변, 맛있는 음식, 그리고 활기찬
          분위기로 유명합니다. 맛집을 탐방하며 부산의 매력을 느껴보세요!
        </p>
      </div>
      {/* 오른쪽: 맛집 리스트 */}
      <div className="restaurant-list-container">
        <h2>맛집 리스트</h2>
        <ul className="restaurant-list">
          <li>해운대 맛집 - 바다뷰 레스토랑</li>
          <li>서면 맛집 - 로컬 음식점</li>
          <li>남포동 맛집 - 전통 시장 맛집</li>
          <li>광안리 맛집 - 분위기 있는 카페</li>
        </ul>
      </div>
    </div>
  );
}
