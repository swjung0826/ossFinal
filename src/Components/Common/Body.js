import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Common.css";

const Body = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const API_URL = "http://apis.data.go.kr/6260000/FoodService/getFoodKr";
  const API_KEY =
    "tZ8%2BBiaaU1zFRCLRmv119pWkvT%2FsGdT2PBKdKaz3XVAQaEXlW9OYyvrOjlAojAcPC2N30Z83cW1%2FGg7Y0ox68g%3D%3D";

  // 페이지 데이터를 가져오는 함수
  const fetchPageData = async (pageNo) => {
    try {
      const response = await fetch(
        `${API_URL}?serviceKey=${API_KEY}&numOfRows=10&pageNo=${pageNo}&resultType=json`
      );
      const text = await response.text();

      try {
        const json = JSON.parse(text);
        return json.getFoodKr?.item || [];
      } catch (parseError) {
        console.error(`페이지 ${pageNo} JSON 파싱 실패:`, text);
        return [];
      }
    } catch (err) {
      console.error(`페이지 ${pageNo} 요청 실패:`, err);
      return [];
    }
  };

  // 모든 페이지 데이터를 가져오는 함수
  const fetchRestaurants = async () => {
    setLoading(true);

    try {
      const totalPages = 2;
      let allItems = [];

      for (let pageNo = 1; pageNo <= totalPages; pageNo++) {
        const pageData = await fetchPageData(pageNo);
        allItems = [...allItems, ...pageData];
      }

      if (allItems.length > 0) {
        const enrichedRestaurants = allItems.map((restaurant) => ({
          ...restaurant,
          likes: 0,
          scraps: 0,
          views: 0,
        }));
        setRestaurants(enrichedRestaurants);
      } else {
        console.error("조건에 맞는 데이터를 찾을 수 없습니다.");
        setError("조건에 맞는 데이터를 찾을 수 없습니다.");
      }
    } catch (err) {
      setError("데이터를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  // 좋아요 수 증가 함수
  const increaseLikes = (index) => {
    setRestaurants((prevRestaurants) => {
      const updatedRestaurants = [...prevRestaurants];
      updatedRestaurants[index].likes = (updatedRestaurants[index]?.likes || 0) + 1;
      return updatedRestaurants;
    });
  };

  // 스크랩 수 증가 함수
  const increaseScraps = (index) => {
    setRestaurants((prevRestaurants) => {
      const updatedRestaurants = [...prevRestaurants];
      updatedRestaurants[index].scraps = (updatedRestaurants[index]?.scraps || 0) + 1;
      return updatedRestaurants;
    });
  };

  // 상세 페이지로 이동하며 조회수 증가
  const handleDetailPage = (index, restaurant) => {
    setRestaurants((prevRestaurants) => {
      const updatedRestaurants = [...prevRestaurants];
      updatedRestaurants[index].views = (updatedRestaurants[index]?.views || 0) + 1;
      return updatedRestaurants;
    });

    // 상세 페이지로 이동
    navigate(`/detail/${restaurant.UC_SEQ}`, { state: restaurant });
  };

  return (
    <>
      <div className="recommand">
        <p className="seoul-recommand">서울 추천 맛집</p> <br />
        <a className="region-recommand">지역별</a>
        <a className="theme-recommand">테마별</a>
      </div>

      {loading && <p>데이터를 불러오는 중입니다...</p>}
      {!loading && error && <p>{error}</p>}
      {!loading && !error && (
        <>
          {/* 추천 맛집 */}
          <div className="content">
            <h2>추천 맛집</h2>
            <div className="restaurant-list">
              {restaurants.map((restaurant, index) => (
                <div
                  key={restaurant.UC_SEQ}
                  className="restaurant"
                  onClick={() => handleDetailPage(index, restaurant)}
                >
                  <h3>{restaurant.MAIN_TITLE || "이름 정보 없음"}</h3>
                  <img
                    src={restaurant.MAIN_IMG_NORMAL || ""}
                    alt={restaurant.MAIN_TITLE || "이미지 없음"}
                  />
                  <p>{restaurant.ITEMCNTNTS || "설명 정보 없음"}</p>
                  <div className="actions">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        increaseLikes(index);
                      }}
                    >
                      👍 좋아요 ({restaurant.likes})
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        increaseScraps(index);
                      }}
                    >
                      📌 스크랩 ({restaurant.scraps})
                    </button>
                    <p>👀 조회수: {restaurant.views}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 좋아요 순 맛집 */}
          <div className="content">
            <h2>좋아요 순 맛집</h2>
            <div className="restaurant-list">
              {[...restaurants]
                .sort((a, b) => b.likes - a.likes) // 좋아요 수 기준으로 정렬
                .map((restaurant) => (
                  <div key={restaurant.UC_SEQ} className="restaurant">
                    <h3>{restaurant.MAIN_TITLE || "이름 정보 없음"}</h3>
                    <img
                      src={restaurant.MAIN_IMG_NORMAL || ""}
                      alt={restaurant.MAIN_TITLE || "이미지 없음"}
                    />
                    <p>{restaurant.ITEMCNTNTS || "설명 정보 없음"}</p>
                    <div className="actions">
                      <p>👍 좋아요: {restaurant.likes}</p>
                      <p>📌 스크랩: {restaurant.scraps}</p>
                      <p>👀 조회수: {restaurant.views}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Body;
