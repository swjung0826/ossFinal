import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./User.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const API_URL = "https://67281923270bd0b9755456e8.mockapi.io/api/v1/user";

  const handleLogin = async (e) => {
    e.preventDefault();

    // 입력값 유효성 검사
    if (!email || !password || !name) {
      setError("모든 필드를 입력해주세요.");
      return;
    }

    try {
      // MockAPI에 사용자 정보 추가
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          name,
        }),
      });

      if (!response.ok) {
        throw new Error("사용자 정보를 추가하는 중 오류가 발생했습니다.");
      }

      // 성공적으로 추가된 경우 메인 페이지로 이동
      navigate("/");
    } catch (err) {
      setError("사용자 정보를 추가하지 못했습니다. 다시 시도해주세요.");
      console.error(err);
    }
  };

  return (
    <div className="login-page">
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header text-center">
                <h4>로그인</h4>
              </div>
              <div className="card-body">
                {error && <p className="text-danger text-center">{error}</p>}
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      이메일
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="이메일을 입력하세요"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      비밀번호
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="비밀번호를 입력하세요"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      닉네임
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="닉네임을 입력하세요"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    로그인
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
