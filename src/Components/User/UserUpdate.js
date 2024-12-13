import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./User.css";

export default function UserUpdate() {
  const { id: userId } = useParams(); // useParams로 동적 ID 가져오기
  const [editingUser, setEditingUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const API_URL = "https://67281923270bd0b9755456e8.mockapi.io/api/v1/user";

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/${userId}`);
        if (!response.ok) {
          throw new Error("사용자 데이터를 가져오는 데 실패했습니다.");
        }
        const data = await response.json();
        setEditingUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingUser({ ...editingUser, [name]: value });
  };

  const handleUpdate = async () => {
    if (!editingUser) return;

    try {
      const response = await fetch(`${API_URL}/${editingUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingUser),
      });

      if (!response.ok) {
        throw new Error("사용자 데이터를 업데이트하는 데 실패했습니다.");
      }

      await response.json();
      navigate("/user");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="user-update-page d-flex flex-column">
      <h1 className="text-center">✍ 사용자 정보 수정</h1>
      {loading && <p className="text-center">⏳ 데이터를 불러오는 중입니다...</p>}
      {error && <p className="text-danger text-center">❌ {error}</p>}
      {!loading && editingUser && (
        <div className="edit-form w-200 mt-4"> {/* 가로 길이를 더 넓게 설정 */}
          <div className="mb-4">
            <label htmlFor="name" className="form-label">📝 이름</label>
            <input
              type="text"
              id="name"
              name="name"
              value={editingUser.name || ""}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="form-label">📧 이메일</label>
            <input
              type="email"
              id="email"
              name="email"
              value={editingUser.email || ""}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="d-flex justify-content-center mt-5 gap-2"> {/* 버튼을 나란히 배치하고 간격 최소화 */}
            <button onClick={handleUpdate} className="btn btn-warning">💾 저장</button>
            <button onClick={() => navigate("/user")} className="btn btn-secondary">❌ 취소</button>
          </div>
        </div>
      )}
    </div>
  );
}
