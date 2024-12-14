import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PageIntro.css';

const pages = [
    { image: "/images/1.jpg" },
    { image: "/images/2.jpg" },
    { image: "/images/3.jpg" },
    { image: "/images/4.jpg" }
];

const PageIntro = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const container = document.querySelector('.container_pageIntro');
        const buttons = document.querySelectorAll('.dot-btn');

        // Button click navigation
        buttons.forEach((button, index) => {
            button.addEventListener('click', () => {
                document.querySelector('.dot-btn.active')?.classList.remove('active');
                button.classList.add('active');
                container.scrollTo({ left: index * window.innerWidth, behavior: 'smooth' });
            });
        });

        // Scroll navigation
        container.addEventListener('scroll', () => {
            const currentIndex = Math.round(container.scrollLeft / window.innerWidth);
            document.querySelector('.dot-btn.active')?.classList.remove('active');
            buttons[currentIndex].classList.add('active');
        });
    }, []);

    const handleImageClick = (index) => {
        // 페이지에 따라 다른 동작 가능 (현재는 모두 메인 페이지로 이동)
        if (index === 3) navigate('/'); // 예: 첫 번째 사진 클릭 시 메인 페이지 이동
        // 필요 시 다른 index에 따른 동작 추가 가능
    };

    return (
        <>
            <main className="container_pageIntro">
                {pages.map((page, index) => (
                    <div
                        key={index}
                        className="content_pageIntro"
                        style={{
                            backgroundImage: `url(${page.image})`,
                            backgroundSize: 'contain', // 이미지 비율 유지
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}
                        onClick={() => handleImageClick(index)} // 클릭 이벤트
                    ></div>
                ))}
            </main>
            <nav className="pagination">
                {pages.map((_, index) => (
                    <button
                        key={index}
                        className={`dot-btn ${index === 0 ? 'active' : ''}`}
                        aria-label={`페이지 ${index + 1}`}
                    ></button>
                ))}
            </nav>
        </>
    );
};

export default PageIntro;
