import React, { useState, useEffect } from "react";
import "./ByRegion.css";

export default function ByRegion() {
  const [restaurants, setRestaurants] = useState([]); // 전체 맛집 데이터
  const [filteredRestaurants, setFilteredRestaurants] = useState([]); // 필터링된 맛집 데이터
  const [selectedRegion, setSelectedRegion] = useState("전체"); // 선택된 지역
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "http://apis.data.go.kr/6260000/FoodService/getFoodKr";
  const API_KEY = "tZ8%2BBiaaU1zFRCLRmv119pWkvT%2FsGdT2PBKdKaz3XVAQaEXlW9OYyvrOjlAojAcPC2N30Z83cW1%2FGg7Y0ox68g%3D%3D";

  // API에서 데이터 가져오기
  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      try {
        let allItems = [];
        for (let pageNo = 1; pageNo <= 10; pageNo++) {
          const response = await fetch(
            `${API_URL}?serviceKey=${API_KEY}&numOfRows=10&pageNo=${pageNo}&resultType=json`
          );
          const data = await response.json();
          const items = data.getFoodKr?.item || [];
          allItems = [...allItems, ...items];
        }
        const enrichedItems = allItems.map((item) => ({
          id: item.UC_SEQ,
          title: item.MAIN_TITLE || "제목 없음",
          description: item.ITEMCNTNTS || "설명 없음",
          menu: item.RPRSNTV_MENU || "메뉴 정보 없음",
          address: item.ADDR1 || "주소 정보 없음",
          region: item.GUGUN_NM || "지역 정보 없음",
          image: item.MAIN_IMG_NORMAL || "https://via.placeholder.com/150",
          likes: Math.floor(Math.random() * 100), // 랜덤 좋아요 수 추가
        }));
        setRestaurants(enrichedItems);
        setFilteredRestaurants(enrichedItems); // 기본값: 전체 데이터
      } catch (err) {
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  // 지역 선택 이벤트 핸들러
  const handleRegionChange = (e) => {
    const region = e.target.value;
    setSelectedRegion(region);
    if (region === "전체") {
      setFilteredRestaurants(restaurants);
    } else {
      const filtered = restaurants.filter(
        (restaurant) => restaurant.region === region
      );
      setFilteredRestaurants(filtered);
    }
  };

  return (
    <div className="byregion-container">
      {loading && <p>데이터를 불러오는 중입니다...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && (
        <div className="layout">
          {/* 왼쪽: 지도와 지역 선택 */}
          <div className="map-container">
            <h1 className="info-title">지역별 부산 맛집 찾기!</h1>
            <img
              src="https://cdn.crowdpic.net/detail-thumb/thumb_d_CE7E965BB28BDDD979E8DC240C47AC24.png"
              alt="부산 지도"
              className="map-image"
            />
            {/* 지역 선택 드롭다운 */}
            <div className="region-select-container">
              <select
                className="region-select"
                value={selectedRegion}
                onChange={handleRegionChange}
              >
                <option value="전체">전체</option>
                <option value="강서구">강서구</option>
                <option value="금정구">금정구</option>
                <option value="남구">남구</option>
                <option value="동래구">동래구</option>
                <option value="부산진구">부산진구</option>
                <option value="북구">북구</option>
                <option value="사상구">사상구</option>
                <option value="사하구">사하구</option>
                <option value="서구">서구</option>
                <option value="수영구">수영구</option>
                <option value="연제구">연제구</option>
                <option value="영도구">영도구</option>
                <option value="중구">중구</option>
                <option value="해운대구">해운대구</option>
              </select>
            </div>
          </div>

          {/* 오른쪽: 맛집 리스트 */}
          <div className="restaurant-list-container">
            <ul className="restaurant-list">
              {filteredRestaurants.map((restaurant) => (
                <li key={restaurant.id} className="restaurant-item">
                  <h3>{restaurant.title}</h3>
                  <img src={restaurant.image} alt={restaurant.title} />
                  <p>{restaurant.description}</p>
                  <p>대표 메뉴: {restaurant.menu}</p>
                  <p>좋아요: {restaurant.likes}</p>
                  <p>주소: {restaurant.address}</p>
                  <p>지역: {restaurant.region}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
