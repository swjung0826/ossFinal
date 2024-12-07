import React from "react";
import "./Page.css";

export default function Notice() {
  const notices = [
    {
      id: 1,
      title: "다먹자 개인정보처리방침 변경안내",
      content:
        "안녕하세요. 다먹자입니다. 개인정보 보호를 위해 아래와 같이 개인정보 처리방침이 2024년 7월 26일부로 일부 개정되었습니다. 이에 개정된 주요 내용을 안내드립니다.",
      date: "5월 8일",
    },
    {
      id: 2,
      title: "다먹자 위치기반서비스 이용약관 및 개인정보처리방침 변경안내",
      content:
        "안녕하세요. 저희 다먹자 서비스를 이용해주시는 회원분들께 깊은 감사의 말씀을 드립니다. 당사는 위치정보서비스 사업자로서 정보의 유출 · 오용 및 남용을 방지하고 안전한 위치정보 이용환경을 조성하기 위한 방침을 준용하고 있습니다.",
      date: "7월 26일",
    },
    {
      id: 3,
      title: "다먹자 개인정보 처리방침 변경안내",
      content:
        "안녕하세요. 다먹자입니다. 개인정보 보호를 위해 아래와 같이 개인정보 처리방침이 2024년 11월 6일부로 일부 개정되었습니다. 이에 개정된 주요 내용을 안내드립니다.",
      date: "11월 6일",
    },
  ];

  return (
    <>
    
    <div className="notice-page">    
    <div className="notice-head">공지사항</div>
      <div className="notice-list">
        {notices.map((notice) => (
          <div key={notice.id} className="notice-item">
            <h2 className="notice-title">{notice.title}</h2>
            <p className="notice-content">{notice.content}</p>
            <p className="notice-date">{notice.date}</p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
