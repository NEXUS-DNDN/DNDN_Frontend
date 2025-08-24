import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/FAQ.css';
import Backicon from '../assets/back.svg'; // ✅ back.svg import

const faqs = [
  {
    id: 1,
    category: '필터 설정',
    question: '맞춤형 복지는 어떻게 설정하나요?',
    answer: '내 상황에 맞는 복지 서비스를 쉽게 찾을 수 있도록 돕는 기능입니다. 맞춤형 복지 서비스는 연령, 소득, 가족 구성 등 사용자가 입력한 정보를 기반으로 가장 적합한 복지 서비스를 추천해주는 기능입니다. [내 정보 관리] 메뉴에서 기본 정보를 입력하거나 수정하면 자동 반영되며, 이후 조건에 맞는 복지 서비스가 필터링되어 보여집니다.',
  },
  {
    id: 2,
    category: '서류함 기능',
    question: '서류함은 어떤 기능인가요?',
    answer: '신청에 필요한 서류를 안전하게 보관하고, 기한 알림까지 제공하는 기능입니다. 서류함은 복지 서비스 신청 시 필요한 증명서, 확인서 등을 안전하게 보관할 수 있는 개인 전용 저장 공간입니다. 여러 복지 서비스를 탐색하면서 필요한 서류를 확인할 때, 바로 서류함에서 꺼내 사용할 수 있습니다. 서류는 암호화되어 저장되며, 본인 인증을 거쳐야만 열람이 가능합니다.',
  },
  {
    id: 3,
    category: '신청',
    question: '복지 서비스 신청은 앱에서 바로 가능한가요?',
    answer: '일부는 앱에서 신청 가능하고, 일부는 기관 사이트로 연결됩니다. 든든 앱에서는 복지 서비스를 직접 신청할 수는 없습니다. 대신 사용자가 신청을 준비할 수 있도록, 해당 서비스의 신청 자격 요건, 필요한 서류, 신청 방법, 접수 기간 등을 한눈에 정리해 제공합니다. 이를 통해 사용자는 기관 방문이나 온라인 신청 전에 필요한 준비를 미리 할 수 있으며, 신청 기관 및 공식 사이트로 바로 이동할 수 있는 링크도 함께 제공됩니다.',
  },
  {
    id: 4,
    category: '검색',
    question: '원하는 복지 서비스를 직접 검색할 수 있나요?',
    answer: '키워드 검색과 필터 기능으로 원하는 서비스를 쉽게 찾을 수 있습니다. 든든 앱에서는 맞춤형 추천 외에도 사용자가 직접 복지 서비스를 검색할 수 있는 기능을 제공합니다. 검색창에 키워드를 입력하면 관련된 서비스 목록이 즉시 나타나며, 생애 주기, 가구 유형, 관심 주제와 같은 필터를 활용해 더 구체적으로 좁혀볼 수 있습니다. 이 기능을 통해 사용자는 본인 상황과 관계없이, 관심 있는 복지 서비스 전반을 손쉽게 찾아볼 수 있습니다.',
  },
];

const FAQDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const faq = faqs.find((item) => item.id === parseInt(id));

  if (!faq) {
    return (
      <div className="faq-detail-page">
        <header className="faq-header">
          <button onClick={() => navigate(-1)} className="back-button">
            <img src={Backicon} alt="뒤로가기" className="back-icon" /> {/* ✅ 이미지로 변경 */}
          </button>
          <h1>질문</h1>
        </header>
        <div className="faq-content">
          <p>질문을 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="faq-detail-page">
      <header className="faq-header">
        <button onClick={() => navigate(-1)} className="back-button">
          <img src={Backicon} alt="뒤로가기" className="back-icon" /> {/* ✅ 이미지로 변경 */}
        </button>
        <h1>{faq.question}</h1>
      </header>
      <div className="faq-content">
        <p className="faq-answer">{faq.answer}</p>
      </div>
    </div>
  );
};

export default FAQDetailPage;