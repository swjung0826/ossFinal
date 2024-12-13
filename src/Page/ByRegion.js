import React, { useState, useEffect } from "react";
import "./ByRegion.css";

export default function ByRegion() {
  const [restaurants, setRestaurants] = useState([]); // 전체 레스토랑 데이터
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
          image: item.MAIN_IMG_NORMAL || "https://via.placeholder.com/150",
          likes: Math.floor(Math.random() * 100), // 랜덤 좋아요 수 추가
        }));
        setRestaurants(enrichedItems);
      } catch (err) {
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div className="byregion-container">
      {loading && <p>데이터를 불러오는 중입니다...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && (
        <>
          {/* 왼쪽: 부산 */}
          <div className="map-container">
            <h1 className="info-title">부산에 오신 것을 환영합니다!</h1>
            <img
              src="https://cdn.crowdpic.net/detail-thumb/thumb_d_CE7E965BB28BDDD979E8DC240C47AC24.png"
              alt="부산 지도"
              className="map-image"
            />
          </div>
          {/* 오른쪽: 맛집 리스트 */}
          <div className="restaurant-list-container">
            <ul className="restaurant-list">
              {restaurants.map((restaurant) => (
                <li key={restaurant.id} className="restaurant-item">
                  <h3>{restaurant.title}</h3>
                  <img src={restaurant.image} alt={restaurant.title} className="restaurant-image" />
                  <p>{restaurant.description}</p>
                  <p>대표 메뉴: {restaurant.menu}</p>
                  <p>좋아요: {restaurant.likes}</p>
                  <p>주소: {restaurant.address}</p>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
