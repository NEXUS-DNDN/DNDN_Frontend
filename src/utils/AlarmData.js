// utils/AlarmData.js
const alarms = [
  {
    id: 1,
    type: 'custom', // 맞춤형 혜택
    title: '새로 등록된 ‘청년/1인가구’ 복지 혜택이 있어요!',
    message: '해당 서비스를 확인해보세요',
    time: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5분 전
    isNew: true,
    link: '/service/1',
  },
  {
    id: 2,
    type: 'bookmark', // 찜한 서비스 마감 알림
    title: '찜한 서비스의 마감일이 임박했어요!',
    message: '해당 서비스를 확인해보세요',
    time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2시간 전
    isNew: true,
    link: '/service/2',
  },
  {
    id: 3,
    type: 'favorite', // 즐겨찾기한
    title: '즐겨찾기한 ‘에너지 바우처’의 신청 기간이 열렸어요!',
    message: '해당 서비스를 확인해보세요',
    time: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(), // 26시간 전
    isNew: false,
    link: '/service/3',
  },
  {
    id: 4,
    type: 'bookmark',
    title: '찜한 서비스의 마감일이 임박했어요!',
    message: '해당 서비스를 확인해보세요',
    time: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3일 전
    isNew: false,
    link: '/service/2',
  },
];

export default alarms;
