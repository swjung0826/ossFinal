import React, { useEffect, useState } from 'react';
import './Common.css';

const Body = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);

  const API_URL = "http://apis.data.go.kr/6260000/FoodService/getFoodKr";
  const API_KEY = "tZ8%2BBiaaU1zFRCLRmv119pWkvT%2FsGdT2PBKdKaz3XVAQaEXlW9OYyvrOjlAojAcPC2N30Z83cW1%2FGg7Y0ox68g%3D%3D";

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(`${API_URL}?serviceKey=${API_KEY}&numOfRows=10&pageNo=1&resultType=json`);
        if (!response.ok) {
          throw new Error(`HTTP 오류 발생: ${response.status}`);
        }
        const data = await response.json();
        if (data.getFoodKr && data.getFoodKr.item) {
          setRestaurants(data.getFoodKr.item);
        } else {
          setError("조건에 맞는 데이터가 없습니다.");
        }
      } catch (err) {
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <>
        <div className="recommand">
        <p className="seoul-recommand">서울 추천 맛집</p> <br/>
        <a className="region-recommand">지역별</a>
        <a className="theme-recommand">테마별</a>
        </div>

        <div className="content">
        <h2>추천 맛집</h2>
            <div className="restaurant-list">
                {error ? (
                <p>{error}</p>
                ) : (
                restaurants.map((restaurant, index) => (
                    <div key={index} className="restaurant">
                    <h3>{restaurant.MAIN_TITLE || "이름 정보 없음"}</h3>
                    <img src={restaurant.MAIN_IMG_NORMAL || ""} alt={restaurant.MAIN_TITLE || "이미지 없음"} />
                    <p>{restaurant.ITEMCNTNTS || "설명 정보 없음"}</p>
                    </div>
                ))
                )}
            </div>
        </div>

        <div className="content">
        <h2>좋아요 수 맛집</h2>
            <div className="restaurant-list">
                {error ? (
                <p>{error}</p>
                ) : (
                restaurants.map((restaurant, index) => (
                    <div key={index} className="restaurant">
                    <h3>{restaurant.MAIN_TITLE || "이름 정보 없음"}</h3>
                    <img src={restaurant.MAIN_IMG_NORMAL || ""} alt={restaurant.MAIN_TITLE || "이미지 없음"} />
                    <p>{restaurant.ITEMCNTNTS || "설명 정보 없음"}</p>
                    </div>
                ))
                )}
            </div>
        </div>
    </>
  );
};

export default Body;
