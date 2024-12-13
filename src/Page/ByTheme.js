import React, { useState, useEffect } from "react";
import "../Components/Common/Common.css";
import "./ByTheme.css"; // 추가된 CSS 파일

const ByTheme = () => {
  const [restaurants, setRestaurants] = useState([]); // 전체 레스토랑 데이터
  const [filteredRestaurants, setFilteredRestaurants] = useState([]); // 필터링된 데이터
  const [selectedTheme, setSelectedTheme] = useState(null); // 선택된 테마
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "http://apis.data.go.kr/6260000/FoodService/getFoodKr";
  const API_KEY = "tZ8%2BBiaaU1zFRCLRmv119pWkvT%2FsGdT2PBKdKaz3XVAQaEXlW9OYyvrOjlAojAcPC2N30Z83cW1%2FGg7Y0ox68g%3D%3D";

  // 테마별 필터 키워드
  const themes = [
    { name: "힐링", keywords: ["삼계탕", "오리 백숙", "추어탕", "약선"] },
    { name: "전통 한식", keywords: ["돼지국밥", "파전", "갈비찜", "한정식"] },
    { name: "여름 시원한 메뉴", keywords: ["냉면", "물회"] },
    { name: "가성비", keywords: ["족발", "보쌈", "국밥"] },
    { name: "모임/단체", keywords: ["고기구이", "전골", "보쌈"] },
    { name: "감성 카페", keywords: ["디저트", "떡볶이"] },
    { name: "특별한 경험", keywords: ["쭈꾸미", "향어회", "낙곱"] },
  ];

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
        const enrichedRestaurants = allItems.map((restaurant) => ({
          ...restaurant,
          likes: Math.floor(Math.random() * 100), // 랜덤 좋아요 수 추가
        }));
        setRestaurants(enrichedRestaurants);
        setFilteredRestaurants(enrichedRestaurants);
      } catch (err) {
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  // 테마 버튼 클릭 시 필터링
  const handleThemeClick = (theme) => {
    setSelectedTheme(theme.name);
    const filtered = restaurants.filter((restaurant) =>
      theme.keywords.some((keyword) =>
        restaurant.RPRSNTV_MENU?.includes(keyword)
      )
    );
    setFilteredRestaurants(
      filtered.sort((a, b) => b.likes - a.likes) // 좋아요 순으로 정렬
    );
  };

  return (
    <div className="bytheme-container">
      {loading && <p>데이터를 불러오는 중입니다...</p>}
      {error && <p>{error}</p>}

      <div className="layout">
        {/* 테마 버튼 영역 */}
        <div className="theme-buttons">
          <h3>테마 선택</h3>
          {themes.map((theme) => (
            <button
              key={theme.name}
              onClick={() => handleThemeClick(theme)}
              className={selectedTheme === theme.name ? "selected" : ""}
            >
              {theme.name}
            </button>
          ))}
        </div>

        {/* 식당 목록 영역 */}
        <div className="restaurant-list">
          {filteredRestaurants.map((restaurant) => (
            <div key={restaurant.UC_SEQ} className="restaurant">
              <h3>{restaurant.MAIN_TITLE || "이름 정보 없음"}</h3>
              <img
                src={restaurant.MAIN_IMG_NORMAL || ""}
                alt={restaurant.MAIN_TITLE || "이미지 없음"}
              />
              <p>{restaurant.ITEMCNTNTS || "설명 정보 없음"}</p>
              <p>대표 메뉴: {restaurant.RPRSNTV_MENU || "정보 없음"}</p>
              <p>좋아요: {restaurant.likes}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ByTheme;