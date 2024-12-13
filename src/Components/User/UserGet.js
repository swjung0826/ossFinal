import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./User.css";

export default function UserGet() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = "https://67281923270bd0b9755456e8.mockapi.io/api/v1/user";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("사용자 데이터를 가져오는 데 실패했습니다.");
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (id) => {
    navigate(`/user/update/${id}`);
  };

  return (
    <div className="user-get-page">
      <h1>사용자 정보</h1>
      {loading && <p>데이터를 불러오는 중입니다...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>닉네임</th>
              <th>이메일</th>
              <th>수정 및 삭제</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(user.id)}>
                    ✏️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
