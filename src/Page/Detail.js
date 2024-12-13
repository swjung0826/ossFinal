import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Detail.css';

const Detail = () => {
  const { id } = useParams(); // URL의 :id 값 가져오기
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "https://apis.data.go.kr/6260000/FoodService/getFoodKr";
  const API_KEY = "tZ8%2BBiaaU1zFRCLRmv119pWkvT2PBKdKaz3XVAQaEXlW9OYyvrOjlAojAcPC2N30Z83cW1%2FGg7Y0ox68g%3D%3D";

  useEffect(() => {
    const fetchRestaurant = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}?serviceKey=${API_KEY}&numOfRows=1&pageNo=1&UC_SEQ=${id}&resultType=json`);
        if (!response.ok) {
          throw new Error(`HTTP 오류 발생: ${response.status}`);
        }
        const data = await response.json();
        if (data.getFoodKr && data.getFoodKr.item) {
          setRestaurant(data.getFoodKr.item[0]);
        } else {
          setError("식당 정보를 찾을 수 없습니다.");
        }
      } catch (err) {
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [id]);

  return (
    <div className="detail-content">
      {loading && <p>데이터를 불러오는 중입니다...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && restaurant && (
        <>
          <h1>{restaurant.MAIN_TITLE}</h1>
          <img src={restaurant.MAIN_IMG_NORMAL} alt={restaurant.MAIN_TITLE} />
          <p>{restaurant.ITEMCNTNTS}</p>
          <p>주소: {restaurant.ADDR1 || "정보 없음"}</p>
          <p>전화번호: {restaurant.CNTCT_TEL || "정보 없음"}</p>
        </>
      )}
    </div>
  );
};

export default Detail;