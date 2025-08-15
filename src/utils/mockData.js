export const services = [
  {
    id: 1,
    title: '청년 월세 지원',
    category: '주거지원',
    description: '경제적으로 어려움을 겪고 있는 무주택 청년 주거비 부담 완화를 위한 사업',
    target: '만 19세 ~ 34세 이하 무주택 청년 (소득 및 재산 기준 충족 시)',
    content: '월 최대 20만 원 × 12개월간 월세 지원 (지자체마다 상이)',
    documents: ['주민등록등본', '소득 및 재산 확인서류', '임대차계약서 사본', '통장사본', '가족관계증명서(필요 시)'],
    lifeArray: '004', // 청년
    trgterIndvdArray: '050', // 저소득
    intrsThemaArray: '040', // 주거
    imageUrl: 'https://images.unsplash.com/photo-1626244510006-8c4d4f8b9d4f?q=80&w=2670&auto=format&fit=crop',
    endDate: '2025-08-21', // 오늘 날짜 기준으로 D-7
  },
  {
    id: 2,
    title: '청년 구직 활동 지원',
    category: '일자리',
    description: '미취업 청년의 구직활동을 지원하여 취업 기회를 확대하는 제도',
    target: '졸업 또는 중퇴 후 2년 이내의 미취업 청년',
    content: '월 최대 50만 원 × 6개월 지원',
    documents: ['졸업증명서 또는 중퇴증명서', '구직활동 계획서', '통장사본'],
    lifeArray: '004', // 청년
    trgterIndvdArray: '050', // 저소득
    intrsThemaArray: '050', // 일자리
    imageUrl: 'https://images.unsplash.com/photo-1542744095-291d1f67b57f?q=80&w=2670&auto=format&fit=crop',
    endDate: '2025-08-14', // 오늘 날짜 기준으로 D-0
  },
  {
    id: 3,
    title: '청소년 문화 활동비 지원',
    category: '문화',
    description: '저소득 청소년의 문화 체험 기회 확대를 위한 활동비 지원',
    target: '만 9세 ~ 18세 청소년 중 기초생활수급자, 차상위계층',
    content: '연 최대 10만 원 이내 문화활동비 지원',
    documents: ['주민등록등본', '기초생활수급자 증명서 또는 차상위계층 확인서'],
    lifeArray: '003', // 청소년
    trgterIndvdArray: '050', // 저소득
    intrsThemaArray: '060', // 문화·여가
    imageUrl: 'https://images.unsplash.com/photo-1517404215738-15112e7d704e?q=80&w=2670&auto=format&fit=crop',
    endDate: '2025-09-13', // 오늘 날짜 기준으로 D-30
  },
  {
    id: 4,
    title: '노인 기초연금 지원',
    category: '복지',
    description: '소득 하위 70% 노인에게 기초연금을 지급하여 안정적인 노후 생활을 지원',
    target: '만 65세 이상 소득 하위 70% 노인',
    content: '월 최대 32만 원 지급',
    documents: ['주민등록등본', '소득 확인서류', '통장사본'],
    lifeArray: '006', // 노년
    trgterIndvdArray: '050', // 저소득
    intrsThemaArray: '030', // 생활지원
    imageUrl: 'https://images.unsplash.com/photo-1618037340578-83863a3d548b?q=80&w=2670&auto=format&fit=crop',
    endDate: '2025-08-29', // 오늘 날짜 기준으로 D-15
  },
  {
    id: 5,
    title: '장애인 보조기기 지원',
    category: '복지',
    description: '장애인의 자립 생활을 돕기 위해 보조기기를 지원하는 사업',
    target: '등록 장애인',
    content: '전동휠체어, 보청기 등 보조기기 무상 또는 일부 지원',
    documents: ['장애인 등록증', '주민등록등본', '통장사본'],
    lifeArray: '005', // 중장년
    trgterIndvdArray: '040', // 장애인
    intrsThemaArray: '030', // 생활지원
    imageUrl: 'https://images.unsplash.com/photo-1601614771746-b6f7c9e0a0d4?q=80&w=2670&auto=format&fit=crop',
    endDate: '2025-09-03', // 오늘 날짜 기준으로 D-20
  },
  {
    id: 6,
    title: '다문화가정 한국어 교육',
    category: '교육',
    description: '다문화 가정 구성원의 한국어 능력 향상을 위한 무료 교육 프로그램',
    target: '다문화·탈북민 가정 구성원',
    content: '주 2회, 6개월간 한국어 교육',
    documents: ['주민등록등본', '가족관계증명서'],
    lifeArray: '002', // 아동 (자녀 포함 가능)
    trgterIndvdArray: '010', // 다문화·탈북민
    intrsThemaArray: '100', // 교육
    imageUrl: 'https://images.unsplash.com/photo-1628155928731-bdc11b0e3e5c?q=80&w=2670&auto=format&fit=crop',
    endDate: '2025-08-24', // 오늘 날짜 기준으로 D-10
  },
  {
    id: 7,
    title: '임산부 건강 검진 지원',
    category: '보건',
    description: '임산부의 건강한 출산을 위해 필수 검진 비용을 지원',
    target: '임신 확인서 발급받은 임산부',
    content: '검진권 총 60만 원 상당 지원',
    documents: ['임신확인서', '주민등록등본'],
    lifeArray: '007', // 임신·출산
    trgterIndvdArray: '', // 해당 없음
    intrsThemaArray: '080', // 임신·출산
    imageUrl: 'https://images.unsplash.com/photo-1606553835695-8e7c1f8a8b1c?q=80&w=2670&auto=format&fit=crop',
    endDate: '2025-08-19', // 오늘 날짜 기준으로 D-5
  },
];