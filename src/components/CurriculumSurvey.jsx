import React, { useState } from 'react';
import {
  Users,
  GraduationCap,
  User,
  School,
  ChevronRight,
  BarChart2,
  Menu,
  X,
  CheckSquare,
  MessageSquare,
  Quote,
  ArrowUpDown,
} from 'lucide-react';

// --- 데이터 구조 정의 ---

const rawSurveyData = [
  {
    id: 1,
    question: '2026학년도 학교업무 정상화팀 운영 방안',
    description:
      '(2025 현재) 부장교사 10명 + 교육지원팀부장 3명 / 교과전담교사 중 교육지원팀: 주당 수업 시수 16시간 내외',
    targets: ['교사'],
    totalVotes: 34,
    options: [
      { label: '현행대로 운영', count: 30 },
      { label: '교육지원팀 증원 (담임 학교업무 없음, 교과시간 줄어듦)', count: 2 },
      { label: '교육지원팀 폐지 (1인 1업무, 교과시간 현행보다 늘어남)', count: 2 },
    ],
  },
  {
    id: 2,
    question: '보직교사 및 학교 업무분장 개편 의견 (주관식)',
    description: '통합, 폐지, 분리, 신설이 필요한 업무에 대한 자유 서술형 응답 분석 결과',
    targets: ['교사'],
    totalVotes: 17,
    options: [
      { label: '현행 유지 / 특별한 의견 없음', count: 13 },
      { label: '잘 모르겠음 / 판단 유보', count: 2 },
      { label: '안전교육부 업무 분리 제안', count: 1 },
      { label: '기타 (인성생활부 언급 등)', count: 1 },
    ],
    keyComments: [
      {
        tag: '업무 분리 제안',
        content:
          "안전교육부 업무 중 '학교 안전 시설'에 관한 업무는 별도로 분리하여 운영할 필요가 있습니다. 안전교육부는 학생 교육에 집중하고, 시설 관리(소방서 협의, 소화전 점검 등)는 전문성이 요구되는 부서나 담당 인력이 주관하는 것이 바람직합니다.",
      },
    ],
  },
  {
    id: 3,
    question: '2026학년도 교원학습공동체 운영 방식',
    description: '올해는 교원학습공동체를 학년별로 운영하였습니다. 차기 학년도 운영 방향에 대한 의견 조사',
    targets: ['교사'],
    totalVotes: 34,
    options: [
      { label: '올해처럼 학년별로 주제를 정하여 운영', count: 34 },
      { label: '학년에 상관없이 희망하는 주제별로 운영', count: 0 },
    ],
  },
  {
    id: 4,
    question: '2026학년도 연수 및 학교컨설팅장학 희망 영역',
    description: '내년도 교사 역량 강화를 위해 가장 필요하다고 생각하는 연수 분야 선택 (복수 응답 포함)',
    targets: ['교사'],
    totalVotes: 34,
    options: [
      { label: '디지털역량강화교육', count: 15 },
      { label: '생활교육', count: 6 },
      { label: '학급경영', count: 5 },
      { label: '교과교육', count: 4 },
      { label: '문·예·체 교육', count: 3 },
      { label: '생태전환교육', count: 1 },
    ],
  },
  {
    id: 5,
    question: '2026학년도 학년별 문예체 프로그램 운영 의견',
    description: '각 학년별 프로그램(종이접기, 칼림바, 코딩 등)의 유지/변경에 대한 의견 수렴 결과',
    targets: ['교사'],
    totalVotes: 34,
    options: [
      { label: '현행 프로그램 유지 (대부분의 프로그램)', count: 29 },
      { label: '2학년 칼림바 (변경 희망)', count: 3 },
      { label: '5~6학년 코딩 (변경 희망)', count: 2 },
    ],
    keyComments: [
      {
        tag: '악기 변경',
        content: "2학년 칼림바를 '아살라토' 등 다른 악기로 변경하거나 강사를 변경했으면 좋겠습니다.",
      },
      {
        tag: '프로그램 변경',
        content: '5~6학년 코딩 강사 교체 또는 다른 특색 있는 프로그램으로 운영을 희망합니다.',
      },
      {
        tag: '신설 제안',
        content: '1학년 교육과정에 연극 수업을 추가하여 운영하면 좋겠습니다.',
      },
    ],
  },
  {
    id: 6,
    question: '2026학년도 동아리 활동 운영 방식 (3~6학년)',
    description: '2025학년도에는 학급별 주제로 운영함. 차기 학년도 운영 형태에 대한 의견',
    targets: ['교사'],
    totalVotes: 34,
    options: [
      { label: '학생 희망 주제를 고려하여 학급별로 실시한다.', count: 29 },
      { label: '학생 희망 주제를 고려하여 학년 내에서 실시한다.', count: 5 },
    ],
  },
  {
    id: 7,
    question: '2026학년도 동아리 활동 운영 시수 및 시기',
    description: '올해는 10차시 운영. 차기 학년도 적정 시수 및 운영 시기에 대한 의견',
    targets: ['교사'],
    totalVotes: 34,
    options: [
      { label: '1학기 10차시 운영', count: 18 },
      { label: '1학기 5차시, 2학기 5차시 분산 운영', count: 12 },
      { label: '2학기 10차시 운영', count: 2 },
      { label: '올해보다 증배하여 운영', count: 1 },
      { label: '학년별 자율 운영', count: 1 },
    ],
  },
  {
    id: 8,
    question: '본교 특색교육활동 추진 방향',
    description:
      "현재 '꿈키움 문화예술진로' 및 '생각키움 독서활동' 운영 중. 향후 지속 추진이 필요한 분야 선택",
    targets: ['교사'],
    totalVotes: 34,
    options: [
      { label: '꿈키움 문화예술진로 교육 (2025 운영)', count: 17 },
      { label: '생각키움 독서활동 프로젝트 (2025 운영)', count: 13 },
      { label: '인성교육 (기본생활습관지도)', count: 2 },
      { label: '생태전환교육', count: 1 },
      { label: '디지털역량강화교육', count: 1 },
      { label: '건강체력 교육', count: 0 },
      { label: '창의력 신장 교육', count: 0 },
      { label: '세계시민교육', count: 0 },
    ],
  },
  {
    id: 9,
    question: '본교 중점 추진 교육활동 분야 (학부모)',
    description: '학부모 대상 설문: 학교에서 중점적으로 추진했으면 하는 교육 분야 선택',
    targets: ['학부모'],
    totalVotes: 177,
    options: [
      { label: '인성교육', count: 54 },
      { label: '독서교육', count: 46 },
      { label: '학력신장', count: 31 },
      { label: '영어교육', count: 14 },
      { label: '진로교육', count: 9 },
      { label: '예술교육', count: 8 },
      { label: '체육교육', count: 8 },
      { label: '과학교육', count: 6 },
      { label: '환경교육', count: 1 },
    ],
  },
  {
    id: 10,
    question: '내년에 더 공부해보고 싶은 교육주제 (학생)',
    description: '학생 대상 설문: 내년도 희망 교육 주제 조사',
    targets: ['학생'],
    totalVotes: 236,
    options: [
      { label: '진로교육', count: 97 },
      { label: '예술문화교육', count: 41 },
      { label: '독서/토론교육', count: 36 },
      { label: '디지털소양교육', count: 24 },
      { label: '생태환경교육', count: 24 },
      { label: '세계시민교육', count: 14 },
    ],
  },
  {
    id: 11,
    question: '학교-가정 소통 방법(알림장 등) 일원화 의견',
    description: '가정통신문 수신율 저하 해결 및 창구 단일화(e알리미 등)에 대한 의견',
    targets: ['교사'],
    totalVotes: 34,
    options: [
      { label: '일원화 하자 (찬성)', count: 23 },
      { label: '일원화 할 필요 없다 (반대)', count: 11 },
    ],
  },
  {
    id: 12,
    question: '2026학년도 신입생 적응기간 설정',
    description: '2025학년도: 2주(8일) 실시. 늘봄교육 및 시수 확보 등을 고려한 적정 기간',
    targets: ['교사'],
    totalVotes: 34,
    options: [
      { label: '현행 유지 (2주 / 8~9일)', count: 28 },
      { label: '기간 축소 (1주 / 4일)', count: 5 },
      { label: '적응기간 폐지', count: 1 },
    ],
  },
  {
    id: 13,
    question: '4학년 학교자율시간(지역사회 탐방) 운영 의견',
    description: '(4학년 교사 응답) 현장체험학습 형식의 운영에 대한 담당 교사들의 서술형 피드백 분석',
    targets: ['교사'],
    totalVotes: 5,
    options: [
      { label: '교내 체험(찾아오는 프로그램) 전환 제안', count: 3 },
      { label: '현행 프로그램 만족/긍정적', count: 2 },
    ],
    keyComments: [
      {
        tag: '운영 개선 제안',
        content:
          '외부기관 현장체험학습은 공문, 차량, 안전 관리 등 교사의 부담이 큽니다. 학교로 찾아오는 프로그램으로 실시하여 부담을 줄이고 안전을 확보했으면 합니다.',
      },
      {
        tag: '긍정적 평가',
        content: '교육과정과 연결된 주제라 괜찮았고, 다양한 활동들이 좋았습니다.',
      },
    ],
  },
  {
    id: 14,
    question: '4학년 학교자율시간 운영 만족도',
    description: '(4학년 학부모 응답) 지역사회 탐방 및 진로 직업 체험 프로그램에 대한 전반적 만족도',
    targets: ['학부모'],
    totalVotes: 74,
    options: [
      { label: '매우 잘 운영되었다', count: 31 },
      { label: '잘 운영되었다', count: 31 },
      { label: '보통이다', count: 12 },
      { label: '잘 운영되지 않았다', count: 0 },
      { label: '매우 잘 운영되지 않았다', count: 0 },
    ],
  },
  {
    id: 15,
    question: '2026학년도 학교자율시간 희망 주제 (학년군별)',
    description:
      "4, 6학년 대상 학교자율시간 주제 조사. 상단의 '교원', '학부모', '학생' 버튼을 클릭하면 해당 그룹의 선호순으로 정렬됩니다.",
    targets: ['교사', '학부모', '학생'],
    isMultiSeries: true,
    subGroups: ['교원', '학부모', '학생'],
    totalVotesByGroup: { 교원: 64, 학부모: 162, 학생: 365 },
    options: [
      { label: '문화예술', counts: { 교원: 13, 학부모: 20, 학생: 62 } },
      { label: '독서인문', counts: { 교원: 16, 학부모: 32, 학생: 33 } },
      { label: '진로', counts: { 교원: 4, 학부모: 21, 학생: 87 } },
      { label: '기초소양', counts: { 교원: 3, 학부모: 10, 학생: 5 } },
      { label: '인성', counts: { 교원: 7, 학부모: 20, 학생: 52 } },
      { label: '민주시민', counts: { 교원: 2, 학부모: 2, 학생: 6 } },
      { label: '디지털 AI', counts: { 교원: 15, 학부모: 37, 학생: 68 } },
      { label: '세계 시민', counts: { 교원: 2, 학부모: 2, 학생: 15 } },
      { label: '생태전환', counts: { 교원: 0, 학부모: 4, 학생: 8 } },
      { label: '토의 토론', counts: { 교원: 2, 학부모: 14, 학생: 29 } },
    ],
  },
  {
    id: 16,
    question: '2026학년도 우유 급식 희망 조사',
    description: '현재 1인 530원 지원. 미희망 시 일반 급식 식품비로 전환 사용 가능.',
    targets: ['학부모'],
    totalVotes: 177,
    options: [
      { label: '우유급식을 희망한다', count: 123 },
      { label: '우유급식을 희망하지 않는다', count: 54 },
    ],
  },
  {
    id: 17,
    question: '2026학년도 자율휴업일 선호도 조사',
    description: '5월 1일(근로자의 날) 외 추가 2일 선택. 상단의 그룹 버튼을 클릭하여 정렬할 수 있습니다.',
    targets: ['교사', '직원', '학부모'],
    isMultiSeries: true,
    subGroups: ['교원', '직원', '학부모'],
    totalVotesByGroup: { 교원: 66, 직원: 18, 학부모: 305 },
    options: [
      { label: '(1학기) 4. 17.(금) - 3일 연휴', counts: { 교원: 2, 직원: 3, 학부모: 43 } },
      { label: '(1학기) 5. 4.(월) - 5일 연휴', counts: { 교원: 30, 직원: 6, 학부모: 97 } },
      { label: '(1학기) 6. 4.(목) - 징검다리', counts: { 교원: 0, 직원: 0, 학부모: 17 } },
      { label: '(2학기) 9. 28.(월) - 추석 연계', counts: { 교원: 13, 직원: 4, 학부모: 70 } },
      { label: '(2학기) 10. 8.(목) - 한글날 연계', counts: { 교원: 12, 직원: 2, 학부모: 28 } },
      { label: '(2학기) 11. 20.(금) - 수능 다음날', counts: { 교원: 9, 직원: 3, 학부모: 50 } },
    ],
  },
  {
    id: 18,
    question: '대운동회 매년 실시 및 운영 관련 의견',
    description: '학교체육 활성화를 위한 대운동회 매년 개최에 대한 서술형 응답 분석',
    targets: ['교사', '학부모', '학생'],
    isMultiSeries: true,
    subGroups: ['교원', '학부모', '학생'],
    totalVotesByGroup: { 교원: 25, 학부모: 68, 학생: 95 },
    options: [
      { label: '적극 찬성 (매년 실시)', counts: { 교원: 15, 학부모: 45, 학생: 75 } },
      { label: '운영 개선 요구 (대기석, 급식 등)', counts: { 교원: 6, 학부모: 18, 학생: 15 } },
      { label: '현행 격년제 유지 / 기타', counts: { 교원: 4, 학부모: 5, 학생: 5 } },
    ],
    keyComments: [
      {
        tag: '교사: 운영 효율화',
        content: '오전 중에 모든 활동을 종료하고 급식 후 하교 희망. 외부 업체의 내실 있는 프로그램 준비 필요.',
      },
      {
        tag: '학부모: 시설/일정 개선',
        content:
          '학부모 대기석 및 그늘막 확충 시급. 맞벌이 부모를 위해 일정 한 달 전 공지 요망. 학년별 분산 개최로 혼잡도 완화 필요.',
      },
      {
        tag: '학생: 종목/진행',
        content:
          '피구, 축구 등 인기 구기종목 추가 희망. MC 교체 및 공정한 점수 집계 요구. 졸업 전 매년 실시 강력 희망.',
      },
    ],
  },
  {
    id: 19,
    question: '2026학년도 더 행복한 신답교육활동을 위한 제안',
    description: '학부모 및 학생 대상 자유 서술형 의견 수렴 (보완점/바라는 점)',
    targets: ['학부모', '학생'],
    isMultiSeries: true,
    subGroups: ['학부모', '학생'],
    totalVotesByGroup: { 학부모: 100, 학생: 150 },
    options: [
      { label: '시설/안전 (화장실, 공사, 체육관)', counts: { 학부모: 30, 학생: 20 } },
      { label: '교육/체험 (현장학습, 체육, 진로)', counts: { 학부모: 25, 학생: 35 } },
      { label: '급식 및 생활복지 (메뉴, 위생)', counts: { 학부모: 10, 학생: 45 } },
      { label: '소통 및 운영 (알림, 상담, 규칙)', counts: { 학부모: 15, 학생: 5 } },
      { label: '현행 만족 / 의견 없음', counts: { 학부모: 20, 학생: 45 } },
    ],
    keyComments: [
      {
        tag: '학부모: 시설/안전',
        content:
          '화장실 리모델링이 시급합니다(재래식 변기 교체). 극동아파트 공사로 인한 통학로 안전 및 분진 대책이 필요합니다.',
      },
      {
        tag: '학부모: 교육/체험',
        content:
          '학년별 체험학습과 외부 활동이 더 많아졌으면 합니다. 맞벌이를 위한 돌봄/늘봄 강화와 학기초 명확한 공지가 필요합니다.',
      },
      {
        tag: '학생: 급식/생활',
        content: '급식에 마라탕 등 맛있는 메뉴가 더 자주 나왔으면 좋겠습니다. 운동장에 쓰레기통 설치 및 미끄러움 방지가 필요합니다.',
      },
      {
        tag: '학생: 활동',
        content: '체육 시간이 더 많아졌으면 좋겠고, 졸업 전에 더 많은 추억을 쌓을 수 있는 행사(소풍, 수학여행)를 원합니다.',
      },
    ],
  },
  {
    id: 20,
    question: '교원 사기진작 및 복지 희망 사항',
    description: '교사 및 직원을 위한 사기진작 및 복지 관련 자유 서술형 응답 분석',
    targets: ['교사', '직원'],
    totalVotes: 28, // 추정 응답 수
    options: [
      { label: '현행 만족 / 의견 없음', count: 15 },
      { label: '휴게실 및 간식 지원 (커피, 차 등)', count: 8 },
      { label: '업무 환경/물품 개선 (준비물실, 복사기)', count: 4 },
      { label: '동아리 활동 지원', count: 1 },
    ],
    keyComments: [
      {
        tag: '간식/휴게',
        content:
          '교무실 커피 기계를 교체하고(베트남 커피가 써요), 다양한 차 종류를 구비했으면 합니다. 안마의자가 있는 휴게실 완공을 기다립니다.',
      },
      {
        tag: '업무 환경',
        content:
          '학습준비물실 운영 시간 및 물품 관리 개선이 필요합니다. 준비물실에 칼라 인쇄기를 두어 수업 중에도 활용할 수 있기를 바랍니다.',
      },
    ],
  },
  {
    id: 21,
    question: '2026학년도 예산 편성 및 시설개선 희망',
    description: '학교 예산으로 추진했으면 하는 사업 및 시설 개선에 대한 교사들의 서술형 응답 분석',
    targets: ['교사'],
    totalVotes: 25, // 추정 응답 수
    options: [
      { label: '현행 만족 / 의견 없음', count: 10 },
      { label: '화장실 환경 개선 (악취, 난방, 노후화)', count: 6 },
      { label: '교실 및 복도 환경 (방충망, 청소기)', count: 4 },
      { label: '안전 시설 확충 (반사경 등)', count: 2 },
      { label: '주차장 및 외부 환경 개선', count: 2 },
      { label: '학습 지원 (도서 확충 등)', count: 1 },
    ],
    keyComments: [
      {
        tag: '최우선 과제: 화장실',
        content:
          '서관 화장실의 심한 악취 해결이 시급하며, 겨울철 추위를 막을 라디에이터 설치 및 학생용 자동 물내림 변기 교체를 희망합니다.',
      },
      {
        tag: '안전 및 환경',
        content:
          '본관-서관 통로 및 주차장 입구 사각지대에 안전 거울 설치가 필요합니다. 복도 방충망 보수와 교실 청소기 보급도 제안합니다.',
      },
      {
        tag: '공간 방음/프라이버시',
        content:
          '교사휴게실과 상담실 사이의 벽이 얇아 교사의 대화내용이 학생에게 본의 아니게 전달될 수도 있고, 상담활동의 내용이 교사 휴게실에 있는 사람들에게 전달 될 수도 있어서 곤란합니다.',
      },
    ],
  },
];

// --- 컴포넌트: 대상 뱃지 ---

const TargetBadge = ({ target }) => {
  const colors = {
    교사: 'bg-blue-50 text-blue-700 border-blue-100',
    교원: 'bg-blue-50 text-blue-700 border-blue-100',
    학생: 'bg-green-50 text-green-700 border-green-100',
    학부모: 'bg-orange-50 text-orange-700 border-orange-100',
    직원: 'bg-purple-50 text-purple-700 border-purple-100',
  };
  const icon = {
    교사: <School size={12} className="mr-1" />,
    교원: <School size={12} className="mr-1" />,
    학생: <GraduationCap size={12} className="mr-1" />,
    학부모: <User size={12} className="mr-1" />,
    직원: <Users size={12} className="mr-1" />,
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${
        colors[target] || 'bg-gray-100 text-gray-800'
      }`}
    >
      {icon[target]}
      {target}
    </span>
  );
};

// --- 컴포넌트: 메인 앱 ---

const CurriculumSurvey = () => {
  const [selectedId, setSelectedId] = useState(21); // 새로 추가된 21번 문항
  const [sortKey, setSortKey] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const currentItem = rawSurveyData.find((item) => item.id === selectedId) || rawSurveyData[0];
  // 투표율 계산 함수
  const getPercentage = (count, total) => {
    return total === 0 ? 0 : ((count / total) * 100).toFixed(1);
  };
  // 최대 득표수 찾기 (단일 시리즈용)
  const maxCount = !currentItem.isMultiSeries ? Math.max(...currentItem.options.map((o) => o.count)) : 0;
  // 정렬 핸들러
  const handleSort = (group) => {
    if (sortKey === group) {
      setSortKey(null);
    } else {
      setSortKey(group);
    }
  };
  // 정렬된 옵션 가져오기 (멀티 시리즈인 경우)
  const getSortedOptions = () => {
    if (!currentItem.isMultiSeries) return currentItem.options;

    const options = [...currentItem.options];
    if (sortKey) {
      options.sort((a, b) => b.counts[sortKey] - a.counts[sortKey]);
    }
    return options;
  };

  const displayedOptions = getSortedOptions();

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden">
      {/* --- 사이드바 (데스크탑) --- */}
      <div className="hidden md:flex md:w-80 flex-col bg-white border-r border-slate-200 shadow-sm z-10">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center space-x-2 mb-1">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <BarChart2 className="text-white" size={20} />
            </div>
            <h1 className="text-lg font-bold text-slate-900 tracking-tight">설문 결과 분석</h1>
          </div>
          <p className="text-xs text-slate-500 mt-2">총 {rawSurveyData.length}개 문항</p>
        </div>
        {/* 문항 리스트 */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {rawSurveyData.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setSelectedId(item.id);
                setSortKey(null);
              }}
              className={`w-full text-left p-3 rounded-xl transition-all duration-200 border group relative ${
                selectedId === item.id
                  ? 'bg-white border-indigo-500 shadow-md ring-1 ring-indigo-500 z-10'
                  : 'bg-white border-slate-100 hover:border-indigo-300 hover:shadow-sm'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-md transition-colors ${
                    selectedId === item.id
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'bg-slate-100 text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600'
                  }`}
                >
                  Q{item.id}
                </span>

                <div className="flex space-x-1">
                  {item.targets.map((t) => (
                    <div
                      key={t}
                      className={`w-2 h-2 rounded-full border border-white ${
                        t === '교사' || t === '교원'
                          ? 'bg-blue-400'
                          : t === '학생'
                          ? 'bg-green-400'
                          : t === '직원'
                          ? 'bg-purple-400'
                          : 'bg-orange-400'
                      }`}
                      title={t}
                    />
                  ))}
                </div>
              </div>
              <h3
                className={`text-sm font-medium line-clamp-2 leading-snug ${
                  selectedId === item.id ? 'text-slate-900' : 'text-slate-600'
                }`}
              >
                {item.question}
              </h3>
            </button>
          ))}
        </div>
      </div>
      {/* --- 메인 컨텐츠 영역 --- */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* 모바일 헤더 */}
        <div className="md:hidden flex items-center justify-between bg-white p-4 border-b border-slate-200 shadow-sm z-20">
          <span className="font-bold text-lg flex items-center text-slate-800">
            <BarChart2 className="text-indigo-600 mr-2" size={20} /> 설문 결과 (Q{selectedId})
          </span>
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-slate-600">
            <Menu size={24} />
          </button>
        </div>
        {/* 모바일 메뉴 오버레이 */}
        {isMobileMenuOpen && (
          <div className="absolute inset-0 bg-white z-50 flex flex-col md:hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="font-bold text-lg">전체 문항 목록</h2>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                <X />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {rawSurveyData.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedId(item.id);
                    setSortKey(null);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left p-4 border-b flex items-start ${
                    selectedId === item.id ? 'bg-indigo-50' : ''
                  }`}
                >
                  <span
                    className={`mr-3 mt-0.5 text-xs font-bold px-2 py-0.5 rounded ${
                      selectedId === item.id ? 'bg-indigo-200 text-indigo-800' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    Q{item.id}
                  </span>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-800 mb-1">{item.question}</div>
                    <div className="flex gap-1">
                      {item.targets.map((t) => (
                        <span key={t} className="text-xs text-slate-500 bg-slate-100 px-1 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
        {/* 메인 대시보드 내용 */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 bg-slate-50/50">
          <div className="max-w-5xl mx-auto space-y-6">
            {/* 질문 카드 */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10">
              {/* 상단 정보 */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 font-bold text-lg">
                    {currentItem.id}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                      Question {currentItem.id}
                    </span>
                    <div className="flex gap-2 mt-0.5">
                      {currentItem.targets.map((target) => (
                        <TargetBadge key={target} target={target} />
                      ))}
                    </div>
                  </div>
                </div>

                {!currentItem.isMultiSeries && (
                  <div className="text-slate-500 text-sm flex items-center bg-slate-50 px-3 py-1.5 rounded-full">
                    <CheckSquare size={14} className="mr-1.5" />
                    총 응답자: <strong className="ml-1 text-slate-700">{currentItem.totalVotes}명</strong>
                  </div>
                )}
                {currentItem.isMultiSeries && (
                  <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 text-xs text-slate-500 bg-slate-50 px-4 py-2 rounded-lg">
                    {Object.entries(currentItem.totalVotesByGroup).map(([group, count]) => (
                      <span key={group} className="flex items-center">
                        <span
                          className={`w-2 h-2 rounded-full mr-1.5 ${
                            group === '교원' || group === '교사'
                              ? 'bg-blue-400'
                              : group === '학생'
                              ? 'bg-green-400'
                              : group === '직원'
                              ? 'bg-purple-400'
                              : 'bg-orange-400'
                          }`}
                        ></span>
                        {group}: <strong>{count}명</strong>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* 질문 제목 및 설명 */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4 leading-tight">
                  {currentItem.question}
                </h2>
                {currentItem.description && (
                  <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 text-slate-600 text-sm md:text-base leading-relaxed">
                    <span className="font-bold text-indigo-500 mr-2">Info.</span>
                    {currentItem.description}
                  </div>
                )}
              </div>
              {/* 차트 영역 */}
              {currentItem.isMultiSeries ? (
                // --- 멀티 시리즈 차트 렌더링 (정렬 기능 추가) ---
                <div className="space-y-8">
                  <div className="flex flex-wrap justify-end items-center gap-2 mb-4">
                    <span className="text-xs font-medium text-slate-400 mr-1">정렬 기준:</span>
                    {currentItem.subGroups.map((group) => {
                      const colorClass =
                        group === '교원' || group === '교사'
                          ? 'bg-blue-500 text-white'
                          : group === '학생'
                          ? 'bg-green-500 text-white'
                          : group === '직원'
                          ? 'bg-purple-400 text-white'
                          : 'bg-orange-400 text-white';
                      const activeClass =
                        sortKey === group ? `ring-2 ring-offset-2 ring-indigo-400 ${colorClass}` : 'bg-slate-100 text-slate-500 hover:bg-slate-200';
                      const iconColor =
                        sortKey === group
                          ? 'text-white'
                          : group === '교원' || group === '교사'
                          ? 'bg-blue-500'
                          : group === '학생'
                          ? 'bg-green-500'
                          : group === '직원'
                          ? 'bg-purple-400'
                          : 'bg-orange-400';

                      return (
                        <button
                          key={group}
                          onClick={() => handleSort(group)}
                          className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center transition-all ${activeClass}`}
                        >
                          {sortKey !== group && <span className={`w-2.5 h-2.5 rounded-full mr-1.5 ${iconColor}`}></span>}
                          {sortKey === group && <ArrowUpDown size={12} className="mr-1.5" />}
                          {group}
                        </button>
                      );
                    })}
                  </div>
                  {displayedOptions.map((option, index) => {
                    return (
                      <div key={index} className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 transition-all">
                        <div className="mb-3 font-bold text-slate-800 text-lg flex items-center">{option.label}</div>
                        <div className="space-y-2">
                          {currentItem.subGroups.map((group) => {
                            const count = option.counts[group];
                            const total = currentItem.totalVotesByGroup[group];
                            const percent = getPercentage(count, total);
                            const barColor =
                              group === '교원' || group === '교사'
                                ? 'bg-blue-500'
                                : group === '학생'
                                ? 'bg-green-500'
                                : group === '직원'
                                ? 'bg-purple-400'
                                : 'bg-orange-400';
                            const textColor =
                              group === '교원' || group === '교사'
                                ? 'text-blue-600'
                                : group === '학생'
                                ? 'text-green-600'
                                : group === '직원'
                                ? 'text-purple-600'
                                : 'text-orange-600';

                            return (
                              <div key={group} className="flex items-center text-sm">
                                <div className="w-16 font-medium text-slate-500 shrink-0">{group}</div>
                                <div className="flex-1 h-6 bg-slate-200 rounded-md overflow-hidden relative mx-2">
                                  <div className={`h-full rounded-md ${barColor} transition-all duration-1000`} style={{ width: `${percent}%` }} />
                                </div>
                                <div className={`w-12 text-right font-bold ${textColor}`}>{percent}%</div>
                                <div className="w-12 text-right text-slate-400 text-xs">({count})</div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                // --- 기존 단일 시리즈 차트 렌더링 ---
                <div className="space-y-6">
                  {currentItem.options.map((option, index) => {
                    const percent = getPercentage(option.count, currentItem.totalVotes);
                    const isHighest = option.count === maxCount;

                    return (
                      <div key={index} className="group relative">
                        <div className="flex justify-between items-end mb-2 relative z-10">
                          <span
                            className={`font-medium text-base md:text-lg transition-colors ${
                              isHighest ? 'text-indigo-900 font-bold' : 'text-slate-700 group-hover:text-indigo-700'
                            }`}
                          >
                            {option.label}
                          </span>
                          <div className="text-right pl-4 min-w-[80px]">
                            <span className={`text-xl font-bold ${isHighest ? 'text-indigo-600' : 'text-slate-600'}`}>
                              {option.count}
                            </span>
                            <span className="text-slate-400 text-sm ml-1">표</span>
                          </div>
                        </div>

                        <div className="h-12 md:h-14 bg-slate-100 rounded-xl overflow-hidden relative flex items-center shadow-inner">
                          <div
                            className={`h-full rounded-xl transition-all duration-1000 ease-out flex items-center px-4 ${
                              isHighest ? 'bg-indigo-500 shadow-lg shadow-indigo-200' : 'bg-slate-300 group-hover:bg-slate-400'
                            }`}
                            style={{ width: `${Math.max(percent, 0)}%` }}
                          >
                            {parseFloat(percent) > 15 && (
                              <span className="text-white font-bold text-sm md:text-base opacity-90">{percent}%</span>
                            )}
                          </div>
                          {parseFloat(percent) <= 15 && (
                            <span className="absolute left-3 text-slate-500 font-bold text-sm md:text-base ml-2">{percent}%</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* 주관식 주요 의견 섹션 */}
              {currentItem.keyComments && (
                <div className="mt-12 pt-8 border-t border-slate-100">
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                    <MessageSquare className="mr-2 text-indigo-500" size={20} />
                    주요 서술형 의견
                  </h3>
                  <div className="space-y-4">
                    {currentItem.keyComments.map((comment, idx) => (
                      <div key={idx} className="bg-indigo-50/50 p-6 rounded-xl border border-indigo-100 relative">
                        <Quote className="absolute top-4 left-4 text-indigo-200 opacity-50" size={40} />
                        <div className="relative z-10 pl-8">
                          <span className="inline-block px-2 py-1 rounded text-xs font-bold bg-indigo-100 text-indigo-700 mb-2">
                            {comment.tag}
                          </span>
                          <p className="text-slate-700 leading-relaxed font-medium">"{comment.content}"</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 하단 요약 카드 */}
            {!currentItem.isMultiSeries && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start space-x-4">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                    <Users size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-500 uppercase mb-1">최다 선택 항목</h4>
                    <p className="text-lg font-bold text-slate-800 leading-tight">
                      {currentItem.options.reduce((prev, current) => (prev.count > current.count ? prev : current)).label}
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-xl shadow-md text-white flex justify-between items-center cursor-pointer hover:shadow-lg transition-all">
                  <div>
                    <span className="text-indigo-100 text-sm font-medium">관리자 옵션</span>
                    <p className="font-bold text-lg mt-0.5">결과 리포트 다운로드</p>
                  </div>
                  <div className="bg-white/20 p-2 rounded-full">
                    <ChevronRight size={20} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CurriculumSurvey;

