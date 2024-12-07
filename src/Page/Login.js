import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Page.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // 간단한 로그인 로직
    if (email === "test@example.com" && password === "1234" && name === "test") {
      navigate("/"); // 로그인 성공 시 메인 페이지로 이동
    } else {
      setError("이메일, 비밀번호 또는 닉네임이 올바르지 않습니다.");
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
                      placeholder="test@example.com을 입력하세요(임시 이메일)"
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
                      placeholder="1234를 입력하세요(임시 비밀번호)"
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
                      placeholder="test 입력하세요(임시 닉네임)"
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
