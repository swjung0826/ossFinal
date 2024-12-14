import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Search.css"; // CSS 파일 추가

export default function Search() {
  const { search } = useLocation(); // 현재 URL에서 쿼리 가져오기
  const queryParams = new URLSearchParams(search);
  const query = queryParams.get("query"); // 검색어 추출

  const [restaurants, setRestaurants] = useState([]); // 모든 데이터를 저장
  const [filteredResults, setFilteredResults] = useState([]); // 검색된 결과 저장
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "https://apis.data.go.kr/6260000/FoodService/getFoodKr";
  const API_KEY =
    "tZ8%2BBiaaU1zFRCLRmv119pWkvT%2FsGdT2PBKdKaz3XVAQaEXlW9OYyvrOjlAojAcPC2N30Z83cW1%2FGg7Y0ox68g%3D%3D";

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
        setRestaurants(allItems); // 모든 데이터 저장
      } catch (error) {
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  useEffect(() => {
    if (query && restaurants.length > 0) {
      const filtered = restaurants.filter((restaurant) =>
        restaurant.MAIN_TITLE?.includes(query) ||
        restaurant.ITEMCNTNTS?.includes(query) ||
        restaurant.RPRSNTV_MENU?.includes(query)
      );
      setFilteredResults(filtered);
    }
  }, [query, restaurants]);

  if (loading) {
    return <p>데이터를 불러오는 중입니다...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!filteredResults.length) {
    return <p>검색 결과가 없습니다.</p>;
  }

  return (
    <div className="search-results-container">
      <h1>검색 결과</h1>
      <ul className="search-results-list">
        {filteredResults.map((result) => (
          <li key={result.UC_SEQ} className="search-result-item">
            <img
              src={result.MAIN_IMG_NORMAL || "https://via.placeholder.com/150"}
              alt={result.MAIN_TITLE}
              className="result-image"
            />
            <div className="result-details">
              <h3 className="result-title">{result.MAIN_TITLE}</h3>
              <p className="result-description">{result.ITEMCNTNTS}</p>
              <p className="result-menu">
                <strong>대표 메뉴:</strong> {result.RPRSNTV_MENU || "정보 없음"}
              </p>
              <p className="result-address">
                <strong>주소:</strong> {result.ADDR1 || "정보 없음"}
              </p>
              <p className="result-phone">
                <strong>전화번호:</strong> {result.CNTCT_TEL || "정보 없음"}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}