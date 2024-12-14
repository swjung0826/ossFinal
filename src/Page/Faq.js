import React from "react";
import "./Page.css";

export default function Faq() {
  const notices = [
    {
      id: 1,
      title: "Q. 식당등록은 어떻게 하나요?",
      content:
        "A. 안녕하세요. 다먹자입니다. 신규 업체등록은 앱을 통해 요청이 가능합니다. -앱을 이용하여 등록하는 경우: 다먹자 앱에서 [내 정보] > [더보기] > [식당 등록 요청하기]",
      date: "2024. 10. 7",
    },
    {
      id: 2,
      title: "Q. 평가 승인은 언제 되나요?",
      content:
        "A. 평가검수는 영업일 기준 1~3일 이내에 처리되고 있습니다. 다만, 평가량이 급증한 경우(월 초, 공휴일 등)에는 검수가 다소 지연될 수 있습니다.",
      date: "2024. 8. 12",
    },
    {
      id: 3,
      title: "Q. 부분 승인이 무엇인가요?",
      content:
        "A. 부분 승인은 평가 심사때 사진의 삭제, 이동 여부에 따라 이뤄질 수 있으며, 승인 결과에 따라 적립 포인트가 달라질 수 있습니다. 자세한 기준은 '사진 처리기준'에서 확인할 수 있습니다.",
      date: "2024. 7. 3",
    },
    {
        id: 4,
        title: "Q. 부정한 평가는 어떻게 처리되나요?",
        content:
          "A. 공정한 평가 정보를 제공하기 위해 모니터링 중 부정한 평가로 의심 또는 판단되는 계정, 식당, 평가는 별도 통보 없이 제재가 있을 수 있습니다.",
        date: "2023. 11. 16",
      },
  ];

  return (
    <>
    
    <div className="notice-page">    
    <div className="notice-head">FAQ</div>
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
