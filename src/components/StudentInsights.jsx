import React, { useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import {
  Users,
  BookOpen,
  Smile,
  Frown,
  Smartphone,
  Clock,
  Heart,
  Monitor,
  ThumbsUp,
  AlertTriangle,
  HelpCircle,
} from 'lucide-react';

// --- Data Definitions ---

// 1. 학년 분포
const GRADE_DATA = [
  { name: '4학년', value: 98, percent: 41.5, fill: '#8884d8' },
  { name: '5학년', value: 59, percent: 25.0, fill: '#82ca9d' },
  { name: '6학년', value: 79, percent: 33.5, fill: '#ffc658' },
];

// 2. 학년별 선호 과목 상세 데이터
// (사용자 제공 데이터 기반)
const SUBJECT_DETAILS = {
  '4학년': [
    { name: '체육', rank1: 48, rank2: 22, rank3: 10 },
    { name: '창체', rank1: 19, rank2: 21, rank3: 13 },
    { name: '미술', rank1: 18, rank2: 21, rank3: 17 },
    { name: '수학', rank1: 5, rank2: 4, rank3: 12 },
    { name: '영어', rank1: 4, rank2: 9, rank3: 13 },
    { name: '과학', rank1: 2, rank2: 5, rank3: 8 },
    { name: '음악', rank1: 1, rank2: 7, rank3: 14 },
    { name: '국어', rank1: 1, rank2: 2, rank3: 0 },
    { name: '사회', rank1: 0, rank2: 3, rank3: 2 },
    { name: '도덕', rank1: 0, rank2: 1, rank3: 5 },
    { name: '실과', rank1: 0, rank2: 0, rank3: 0 },
  ],
  '5학년': [
    { name: '체육', rank1: 29, rank2: 12, rank3: 3 },
    { name: '창체', rank1: 8, rank2: 16, rank3: 7 },
    { name: '미술', rank1: 7, rank2: 9, rank3: 13 },
    { name: '수학', rank1: 5, rank2: 2, rank3: 6 },
    { name: '과학', rank1: 4, rank2: 0, rank3: 2 },
    { name: '국어', rank1: 4, rank2: 3, rank3: 3 },
    { name: '사회', rank1: 3, rank2: 6, rank3: 3 },
    { name: '음악', rank1: 1, rank2: 4, rank3: 3 },
    { name: '영어', rank1: 0, rank2: 4, rank3: 8 },
    { name: '실과', rank1: 0, rank2: 1, rank3: 6 },
    { name: '도덕', rank1: 0, rank2: 0, rank3: 1 },
  ],
  '6학년': [
    { name: '체육', rank1: 43, rank2: 20, rank3: 5 },
    { name: '창체', rank1: 15, rank2: 22, rank3: 11 },
    { name: '미술', rank1: 11, rank2: 8, rank3: 14 },
    { name: '수학', rank1: 3, rank2: 6, rank3: 8 },
    { name: '과학', rank1: 3, rank2: 5, rank3: 13 },
    { name: '사회', rank1: 2, rank2: 6, rank3: 6 },
    { name: '영어', rank1: 1, rank2: 5, rank3: 9 },
    { name: '음악', rank1: 1, rank2: 3, rank3: 4 },
    { name: '국어', rank1: 0, rank2: 1, rank3: 5 },
    { name: '실과', rank1: 0, rank2: 2, rank3: 4 },
    { name: '도덕', rank1: 0, rank2: 1, rank3: 0 },
  ],
};

// 3. 학습 조력 (가정 연계) - 상세 데이터
const HELP_DETAILS = {
  '4학년': [
    { name: '매일 도움', value: 42, fill: '#0088FE' },
    { name: '가끔 도움', value: 41, fill: '#00C49F' },
    { name: '거의 안함', value: 15, fill: '#FF8042' },
  ],
  '5학년': [
    { name: '매일 도움', value: 20, fill: '#0088FE' },
    { name: '가끔 도움', value: 32, fill: '#00C49F' },
    { name: '거의 안함', value: 7, fill: '#FF8042' },
  ],
  '6학년': [
    { name: '매일 도움', value: 16, fill: '#0088FE' },
    { name: '가끔 도움', value: 47, fill: '#00C49F' },
    { name: '거의 안함', value: 16, fill: '#FF8042' },
  ],
};

// 전체 데이터 (All 선택 시 사용 - HELP_DETAILS 합산)
const HELP_DATA = [
  { name: '매일 도움', value: 78, fill: '#0088FE' },
  { name: '가끔 도움', value: 120, fill: '#00C49F' },
  { name: '거의 안함', value: 38, fill: '#FF8042' },
];

// 4. 독서량 (상세 데이터)
const READING_VOLUME_DETAILS = {
  '4학년': [
    { name: '0권', value: 6, fill: '#FF8042' },
    { name: '1~2권', value: 34, fill: '#FFBB28' },
    { name: '3~4권', value: 30, fill: '#00C49F' },
    { name: '5권 이상', value: 28, fill: '#0088FE' },
  ],
  '5학년': [
    { name: '0권', value: 3, fill: '#FF8042' },
    { name: '1~2권', value: 33, fill: '#FFBB28' },
    { name: '3~4권', value: 11, fill: '#00C49F' },
    { name: '5권 이상', value: 12, fill: '#0088FE' },
  ],
  '6학년': [
    { name: '0권', value: 3, fill: '#FF8042' },
    { name: '1~2권', value: 55, fill: '#FFBB28' },
    { name: '3~4권', value: 15, fill: '#00C49F' },
    { name: '5권 이상', value: 6, fill: '#0088FE' },
  ],
};

// 전체 데이터 (All 선택 시 사용)
const READING_VOLUME_DATA = [
  { name: '0권', value: 12, fill: '#FF8042' },
  { name: '1~2권', value: 122, fill: '#FFBB28' },
  { name: '3~4권', value: 56, fill: '#00C49F' },
  { name: '5권 이상', value: 46, fill: '#0088FE' },
];

// 5. 선호 도서 (상세 데이터)
const READING_GENRE_DETAILS = {
  '4학년': [
    { name: '소설/문학', value: 35, fill: '#8884d8' },
    { name: '만화책', value: 25, fill: '#82ca9d' },
    { name: '동화책', value: 14, fill: '#ff8042' },
    { name: '위인전', value: 14, fill: '#ffc658' },
    { name: '과학책', value: 10, fill: '#0088fe' },
  ],
  '5학년': [
    { name: '소설/문학', value: 41, fill: '#8884d8' },
    { name: '만화책', value: 10, fill: '#82ca9d' },
    { name: '위인전', value: 5, fill: '#ffc658' },
    { name: '과학책', value: 2, fill: '#0088fe' },
    { name: '동화책', value: 1, fill: '#ff8042' },
  ],
  '6학년': [
    { name: '소설/문학', value: 53, fill: '#8884d8' },
    { name: '만화책', value: 17, fill: '#82ca9d' },
    { name: '위인전', value: 7, fill: '#ffc658' },
    { name: '과학책', value: 1, fill: '#0088fe' },
    { name: '동화책', value: 1, fill: '#ff8042' },
  ],
};

// 전체 데이터 (All 선택 시 사용)
const READING_GENRE_DATA = [
  { name: '소설/문학', value: 129, fill: '#8884d8' },
  { name: '만화책', value: 52, fill: '#82ca9d' },
  { name: '위인전', value: 26, fill: '#ffc658' },
  { name: '동화책', value: 16, fill: '#ff8042' },
  { name: '과학책', value: 13, fill: '#0088fe' },
];

// 6. 고민 상담 대상 (상세 데이터)
const COUNSEL_DETAILS = {
  '4학년': [
    { name: '부모님', value: 76, fill: '#FF6F61' },
    { name: '친구', value: 13, fill: '#6B5B95' },
    { name: '선생님', value: 7, fill: '#88B04B' },
    { name: '형제', value: 2, fill: '#F7CAC9' },
  ],
  '5학년': [
    { name: '부모님', value: 44, fill: '#FF6F61' },
    { name: '친구', value: 11, fill: '#6B5B95' },
    { name: '형제', value: 4, fill: '#F7CAC9' },
    { name: '선생님', value: 0, fill: '#88B04B' },
  ],
  '6학년': [
    { name: '부모님', value: 45, fill: '#FF6F61' },
    { name: '친구', value: 31, fill: '#6B5B95' },
    { name: '형제', value: 2, fill: '#F7CAC9' },
    { name: '선생님', value: 1, fill: '#88B04B' },
  ],
};

// 전체 데이터 (All 선택 시 사용)
const COUNSEL_DATA = [
  { name: '부모님', value: 165, fill: '#FF6F61' },
  { name: '친구', value: 55, fill: '#6B5B95' },
  { name: '선생님', value: 8, fill: '#88B04B' },
  { name: '형제', value: 8, fill: '#F7CAC9' },
];

// 7. 스크린 타임 (상세 데이터)
const SCREEN_TIME_DETAILS = {
  '4학년': [
    { name: '1시간 이하', value: 37, fill: '#4ecdc4' },
    { name: '2~3시간', value: 35, fill: '#ff6b6b' },
    { name: '5시간 이상', value: 13, fill: '#ff8a5c' },
    { name: '3~4시간', value: 9, fill: '#ffe66d' },
    { name: '안한다', value: 4, fill: '#45b7d1' },
  ],
  '5학년': [
    { name: '2~3시간', value: 28, fill: '#ff6b6b' },
    { name: '5시간 이상', value: 13, fill: '#ff8a5c' },
    { name: '1시간 이하', value: 9, fill: '#4ecdc4' },
    { name: '3~4시간', value: 8, fill: '#ffe66d' },
    { name: '안한다', value: 1, fill: '#45b7d1' },
  ],
  '6학년': [
    { name: '2~3시간', value: 30, fill: '#ff6b6b' },
    { name: '3~4시간', value: 17, fill: '#ffe66d' },
    { name: '5시간 이상', value: 17, fill: '#ff8a5c' },
    { name: '1시간 이하', value: 14, fill: '#4ecdc4' },
    { name: '안한다', value: 1, fill: '#45b7d1' },
  ],
};

// 전체 데이터 (All 선택 시 사용)
const SCREEN_TIME_DATA = [
  { name: '안한다', value: 6, fill: '#45b7d1' },
  { name: '1시간 이하', value: 60, fill: '#4ecdc4' },
  { name: '2~3시간', value: 93, fill: '#ff6b6b' },
  { name: '3~4시간', value: 34, fill: '#ffe66d' },
  { name: '5시간 이상', value: 43, fill: '#ff8a5c' },
];

// 8. 가장 큰 걱정 (상세 데이터)
const WORRY_DETAILS = {
  '4학년': [
    { name: '공부', value: 27 },
    { name: '건강', value: 16 },
    { name: '성적', value: 13 },
    { name: '친구문제', value: 13 },
    { name: '버릇', value: 11 },
    { name: '외모', value: 8 },
    { name: '성격', value: 7 },
    { name: '가족문제', value: 3 },
  ],
  '5학년': [
    { name: '건강', value: 13 },
    { name: '외모', value: 13 },
    { name: '공부', value: 12 },
    { name: '성적', value: 11 },
    { name: '친구문제', value: 4 },
    { name: '성격', value: 3 },
    { name: '버릇', value: 2 },
    { name: '가족문제', value: 1 },
  ],
  '6학년': [
    { name: '공부', value: 29 },
    { name: '성적', value: 12 },
    { name: '친구문제', value: 11 },
    { name: '건강', value: 9 },
    { name: '외모', value: 7 },
    { name: '버릇', value: 5 },
    { name: '성격', value: 4 },
    { name: '가족문제', value: 2 },
  ],
};

// 전체 데이터 (All 선택 시 사용)
const WORRY_DATA = [
  { name: '공부', value: 68 },
  { name: '건강', value: 38 },
  { name: '성적', value: 36 },
  { name: '외모', value: 28 },
  { name: '친구문제', value: 28 },
  { name: '버릇', value: 18 },
  { name: '성격', value: 14 },
  { name: '가족문제', value: 6 },
];

// 9. 여가 활용 (상세 데이터)
const LEISURE_DETAILS = {
  '4학년': [
    { name: '핸드폰', value: 46, fill: '#8884d8' },
    { name: '운동', value: 27, fill: '#82ca9d' },
    { name: 'TV 시청', value: 18, fill: '#ff7c43' },
    { name: '독서', value: 17, fill: '#ffc658' },
    { name: '컴퓨터', value: 10, fill: '#665191' },
  ],
  '5학년': [
    { name: '핸드폰', value: 38, fill: '#8884d8' },
    { name: '운동', value: 10, fill: '#82ca9d' },
    { name: 'TV 시청', value: 10, fill: '#ff7c43' },
    { name: '독서', value: 9, fill: '#ffc658' },
    { name: '컴퓨터', value: 2, fill: '#665191' },
  ],
  '6학년': [
    { name: '핸드폰', value: 28, fill: '#8884d8' },
    { name: '독서', value: 10, fill: '#ffc658' },
    { name: '운동', value: 6, fill: '#82ca9d' },
    { name: 'TV 시청', value: 4, fill: '#ff7c43' },
    { name: '컴퓨터', value: 1, fill: '#665191' },
  ],
};

// 전체 데이터 (All 선택 시 사용)
const LEISURE_DATA = [
  { name: '핸드폰', value: 112, fill: '#8884d8' },
  { name: '운동', value: 43, fill: '#82ca9d' },
  { name: '독서', value: 36, fill: '#ffc658' },
  { name: 'TV 시청', value: 32, fill: '#ff7c43' },
  { name: '컴퓨터', value: 13, fill: '#665191' },
];

// 10. 학교 장점 (상세 데이터)
const PROS_DETAILS = {
  '4학년': [
    { name: '친구 사이 좋음', value: 67, percent: 68.4, fill: '#00C49F' },
    { name: '규칙 준수', value: 12, percent: 12.2, fill: '#0088FE' },
    { name: '시설 아낌', value: 10, percent: 10.2, fill: '#FFBB28' },
    { name: '질서 유지', value: 9, percent: 9.2, fill: '#FF8042' },
  ],
  '5학년': [
    { name: '친구 사이 좋음', value: 36, percent: 61.0, fill: '#00C49F' },
    { name: '시설 아낌', value: 10, percent: 16.9, fill: '#FFBB28' },
    { name: '규칙 준수', value: 9, percent: 15.3, fill: '#0088FE' },
    { name: '질서 유지', value: 4, percent: 6.8, fill: '#FF8042' },
  ],
  '6학년': [
    { name: '친구 사이 좋음', value: 54, percent: 68.4, fill: '#00C49F' },
    { name: '규칙 준수', value: 14, percent: 17.7, fill: '#0088FE' },
    { name: '시설 아낌', value: 7, percent: 8.9, fill: '#FFBB28' },
    { name: '질서 유지', value: 4, percent: 5.1, fill: '#FF8042' },
  ],
};

// 전체 데이터 (All 선택 시 사용)
const PROS_DATA = [
  { name: '친구 사이 좋음', value: 157, percent: 66.5, fill: '#00C49F' },
  { name: '규칙 준수', value: 35, percent: 14.8, fill: '#0088FE' },
  { name: '시설 아낌', value: 27, percent: 11.4, fill: '#FFBB28' },
  { name: '질서 유지', value: 17, percent: 7.2, fill: '#FF8042' },
];

// 11. 학교 문제점 (상세 데이터)
const CONS_DETAILS = {
  '4학년': [
    { name: '친구 사이 안좋음', value: 46, fill: '#FF8042' },
    { name: '규칙 미준수', value: 28, fill: '#FF6F61' },
    { name: '시설 훼손', value: 13, fill: '#FFBB28' },
    { name: '실내 질서 부족', value: 11, fill: '#8884d8' },
  ],
  '5학년': [
    { name: '친구 사이 안좋음', value: 27, fill: '#FF8042' },
    { name: '규칙 미준수', value: 17, fill: '#FF6F61' },
    { name: '시설 훼손', value: 9, fill: '#FFBB28' },
    { name: '실내 질서 부족', value: 6, fill: '#8884d8' },
  ],
  '6학년': [
    { name: '친구 사이 안좋음', value: 35, fill: '#FF8042' },
    { name: '규칙 미준수', value: 23, fill: '#FF6F61' },
    { name: '시설 훼손', value: 13, fill: '#FFBB28' },
    { name: '실내 질서 부족', value: 8, fill: '#8884d8' },
  ],
};

// 전체 데이터 (All 선택 시 사용)
const CONS_DATA = [
  { name: '친구 사이 안좋음', value: 108, fill: '#FF8042' },
  { name: '규칙 미준수', value: 68, fill: '#FF6F61' },
  { name: '시설 훼손', value: 35, fill: '#FFBB28' },
  { name: '실내 질서 부족', value: 25, fill: '#8884d8' },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

// --- Components ---

const InsightCard = ({ title, icon: Icon, children, className = '' }) => (
  <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col ${className}`}>
    <div className="flex items-center gap-2 mb-6 border-b border-gray-50 pb-3">
      {Icon && (
        <div className="p-2 bg-blue-50 rounded-lg">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
      )}
      <h3 className="text-lg font-bold text-gray-800">{title}</h3>
    </div>
    <div className="flex-1 w-full min-h-[200px]">{children}</div>
  </div>
);

const StudentInsights = () => {
  const [selectedGrade, setSelectedGrade] = useState('All');

  // 과목 데이터 필터링 로직
  const filteredSubjectData = useMemo(() => {
    if (selectedGrade !== 'All') {
      // 특정 학년 선택 시 해당 학년 데이터 반환 (정렬: 1순위 기준 내림차순)
      return [...SUBJECT_DETAILS[selectedGrade]].sort((a, b) => b.rank1 - a.rank1);
    }

    // 'All' 선택 시 모든 학년 데이터 합산
    const aggregated = {};
    Object.values(SUBJECT_DETAILS).forEach((gradeData) => {
      gradeData.forEach((item) => {
        if (!aggregated[item.name]) {
          aggregated[item.name] = { name: item.name, rank1: 0, rank2: 0, rank3: 0 };
        }
        aggregated[item.name].rank1 += item.rank1;
        aggregated[item.name].rank2 += item.rank2;
        aggregated[item.name].rank3 += item.rank3;
      });
    });
    return Object.values(aggregated).sort((a, b) => b.rank1 - a.rank1);
  }, [selectedGrade]);

  // 학습 조력 데이터 필터링 로직
  const filteredHelpData = useMemo(() => {
    if (selectedGrade !== 'All') {
      return HELP_DETAILS[selectedGrade];
    }
    return HELP_DATA;
  }, [selectedGrade]);

  // 독서량 데이터 필터링 로직
  const filteredReadingVolumeData = useMemo(() => {
    if (selectedGrade !== 'All') {
      return READING_VOLUME_DETAILS[selectedGrade];
    }
    return READING_VOLUME_DATA;
  }, [selectedGrade]);

  // 선호 도서 데이터 필터링 로직
  const filteredReadingGenreData = useMemo(() => {
    if (selectedGrade !== 'All') {
      return [...READING_GENRE_DETAILS[selectedGrade]].sort((a, b) => b.value - a.value);
    }
    return READING_GENRE_DATA;
  }, [selectedGrade]);

  // 고민 상담 데이터 필터링 로직
  const filteredCounselData = useMemo(() => {
    if (selectedGrade !== 'All') {
      return COUNSEL_DETAILS[selectedGrade];
    }
    return COUNSEL_DATA;
  }, [selectedGrade]);

  // 스크린 타임 데이터 필터링 로직 (시간 순서로 정렬)
  const filteredScreenTimeData = useMemo(() => {
    const orderMap = {
      '안한다': 0,
      '1시간 이하': 1,
      '2~3시간': 2,
      '3~4시간': 3,
      '5시간 이상': 4,
    };
    
    let data;
    if (selectedGrade !== 'All') {
      data = SCREEN_TIME_DETAILS[selectedGrade];
    } else {
      data = SCREEN_TIME_DATA;
    }
    
    return [...data].sort((a, b) => {
      const orderA = orderMap[a.name] ?? 999;
      const orderB = orderMap[b.name] ?? 999;
      return orderA - orderB;
    });
  }, [selectedGrade]);

  // 걱정 데이터 필터링 로직
  const filteredWorryData = useMemo(() => {
    if (selectedGrade !== 'All') {
      return [...WORRY_DETAILS[selectedGrade]].sort((a, b) => b.value - a.value);
    }
    return WORRY_DATA;
  }, [selectedGrade]);

  // 여가 데이터 필터링 로직
  const filteredLeisureData = useMemo(() => {
    if (selectedGrade !== 'All') {
      return [...LEISURE_DETAILS[selectedGrade]].sort((a, b) => b.value - a.value);
    }
    return LEISURE_DATA;
  }, [selectedGrade]);

  // 학교 장점 데이터 필터링 로직
  const filteredProsData = useMemo(() => {
    if (selectedGrade !== 'All') {
      return PROS_DETAILS[selectedGrade];
    }
    return PROS_DATA;
  }, [selectedGrade]);

  // 학교 문제점 데이터 필터링 로직
  const filteredConsData = useMemo(() => {
    if (selectedGrade !== 'All') {
      return [...CONS_DETAILS[selectedGrade]].sort((a, b) => b.value - a.value);
    }
    return CONS_DATA;
  }, [selectedGrade]);

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8 lg:p-12 font-sans">
      <header className="mb-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <Users className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">학생 생활 실태 분석</h1>
        </div>
        <p className="text-gray-600 ml-11 text-lg mb-6">
          설문에 참여한 <span className="font-bold text-blue-600">236명</span>의 학생들의 생활 습관과 학교 생활 인식을
          분석했습니다.
        </p>

        {/* 학년 필터 버튼 */}
        <div className="flex flex-wrap gap-2 ml-11">
        {['All', '4학년', '5학년', '6학년'].map((grade) => (
          <button
            key={grade}
            onClick={() => setSelectedGrade(grade)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                selectedGrade === grade
                  ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-300'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {grade === 'All' ? '전체 학년' : grade}
          </button>
        ))}
      </div>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* 1. 학년 분포 (필터링 시 강조 표시) */}
        <InsightCard title="응답자 학년 분포" icon={Users}>
            <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={GRADE_DATA}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
              >
                {GRADE_DATA.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.fill}
                    opacity={selectedGrade === 'All' || selectedGrade === entry.name ? 1 : 0.3}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value, name, props) => [`${value}명 (${props.payload.percent.toFixed(1)}%)`, name]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          <div className="text-center text-xs text-gray-400 mt-2">총 236명</div>
        </InsightCard>

        {/* 2. 가장 좋아하는 과목 (필터 적용됨) */}
        <InsightCard
          title={`${selectedGrade === 'All' ? '전체' : selectedGrade} 선호 과목 (순위별 누적)`}
          icon={ThumbsUp}
          className="lg:col-span-2"
        >
          <div className="text-xs text-gray-500 mb-2 text-right">* 1순위(진함) ~ 3순위(연함) 누적 그래프</div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={filteredSubjectData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip 
                formatter={(value, name, props) => {
                  const total = (props.payload.rank1 || 0) + (props.payload.rank2 || 0) + (props.payload.rank3 || 0);
                  const selectedTotal = selectedGrade === 'All' ? 236 : (selectedGrade === '4학년' ? 98 : selectedGrade === '5학년' ? 59 : 79);
                  const percent = total > 0 ? ((value / selectedTotal) * 100).toFixed(1) : '0.0';
                  return [`${value}명 (${percent}%)`, name];
                }}
              />
              <Legend />
              <Bar dataKey="rank1" name="1순위" stackId="a" fill="#0056b3" barSize={40} />
              <Bar dataKey="rank2" name="2순위" stackId="a" fill="#4da6ff" barSize={40} />
              <Bar dataKey="rank3" name="3순위" stackId="a" fill="#b3d9ff" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </InsightCard>

        {/* 3. 가정 학습 조력 */}
        <InsightCard title="가정 학습 조력 정도" icon={Heart}>
          <div className="relative h-full flex flex-col">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={filteredHelpData}
                  cx="50%"
                  cy="50%"
                  outerRadius={75}
                  dataKey="value"
                >
                  {filteredHelpData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => {
                    const total = filteredHelpData.reduce((sum, item) => sum + item.value, 0);
                    const percent = total > 0 ? ((value / total) * 100).toFixed(1) : '0.0';
                    return [`${value}명 (${percent}%)`, name];
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* 커스텀 범례 */}
            <div className="flex flex-wrap justify-center gap-3 mt-2 px-2">
              {filteredHelpData.map((entry, index) => {
                const total = filteredHelpData.reduce((sum, item) => sum + item.value, 0);
                const percent = total > 0 ? ((entry.value / total) * 100).toFixed(1) : '0.0';
                return (
                  <div key={index} className="flex items-center gap-1.5">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: entry.fill }}
                    />
                    <span className="text-xs text-gray-800 font-medium">
                      {entry.name} ({percent}%)
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </InsightCard>

        {/* 4. 독서량 */}
        <InsightCard title="주간 독서량" icon={BookOpen}>
          <div className="relative h-full">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={filteredReadingVolumeData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis hide />
                <Tooltip 
                  formatter={(value, name, props) => {
                    const total = filteredReadingVolumeData.reduce((sum, item) => sum + item.value, 0);
                    const percent = total > 0 ? ((value / total) * 100).toFixed(1) : '0.0';
                    return [`${value}명 (${percent}%)`, name];
                  }}
                  cursor={{ fill: 'transparent' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40}>
                  {filteredReadingVolumeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </InsightCard>

        {/* 5. 선호 도서 장르 */}
        <InsightCard title="즐겨 읽는 책 종류" icon={BookOpen}>
          <div className="relative h-full">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                layout="vertical"
                data={filteredReadingGenreData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={70} tick={{ fontSize: 11 }} />
                <Tooltip 
                  formatter={(value, name, props) => {
                    const total = filteredReadingGenreData.reduce((sum, item) => sum + item.value, 0);
                    const percent = total > 0 ? ((value / total) * 100).toFixed(1) : '0.0';
                    return [`${value}명 (${percent}%)`, name];
                  }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                  {filteredReadingGenreData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </InsightCard>

        {/* 6. 고민 상담 & 8. 가장 큰 걱정 */}
        <InsightCard title="고민과 상담" icon={HelpCircle} className="lg:col-span-2">
          <div className="relative h-full flex flex-col md:flex-row gap-8">
            <div className="flex-1 flex flex-col">
              <h4 className="text-sm font-bold text-gray-500 mb-4 text-center">누구와 상담하나요?</h4>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={filteredCounselData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      dataKey="value"
                      label={({ name }) => name}
                    >
                      {filteredCounselData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value, name) => {
                        const total = filteredCounselData.reduce((sum, item) => sum + item.value, 0);
                        const percent = total > 0 ? ((value / total) * 100).toFixed(1) : '0.0';
                        return [`${value}명 (${percent}%)`, name];
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              {/* 커스텀 범례 */}
              <div className="flex flex-wrap justify-center gap-3 mt-3 px-2">
                {filteredCounselData.map((entry, index) => {
                  const total = filteredCounselData.reduce((sum, item) => sum + item.value, 0);
                  const percent = total > 0 ? ((entry.value / total) * 100).toFixed(1) : '0.0';
                  return (
                    <div key={index} className="flex items-center gap-1.5">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: entry.fill }}
                      />
                      <span className="text-xs text-gray-800 font-medium">
                        {entry.name} ({percent}%)
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex-1 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-8">
              <h4 className="text-sm font-bold text-gray-500 mb-4 text-center">요즘 가장 큰 걱정거리는?</h4>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={filteredWorryData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" width={60} tick={{ fontSize: 11 }} />
                    <Tooltip 
                      formatter={(value, name, props) => {
                        const total = filteredWorryData.reduce((sum, item) => sum + item.value, 0);
                        const percent = total > 0 ? ((value / total) * 100).toFixed(1) : '0.0';
                        return [`${value}명 (${percent}%)`, name];
                      }}
                      cursor={{ fill: 'transparent' }}
                    />
                    <Bar dataKey="value" fill="#8884d8" radius={[0, 4, 4, 0]} barSize={15} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </InsightCard>

        {/* 7. 스크린 타임 */}
        <InsightCard title="하루 스크린 타임" icon={Monitor}>
          <div className="relative h-full flex flex-col">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={filteredScreenTimeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={75}
                  dataKey="value"
                >
                  {filteredScreenTimeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => {
                    const total = filteredScreenTimeData.reduce((sum, item) => sum + item.value, 0);
                    const percent = total > 0 ? ((value / total) * 100).toFixed(1) : '0.0';
                    return [`${value}명 (${percent}%)`, name];
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* 커스텀 범례 */}
            <div className="flex flex-wrap justify-center gap-3 mt-2 px-2">
              {filteredScreenTimeData.map((entry, index) => {
                const total = filteredScreenTimeData.reduce((sum, item) => sum + item.value, 0);
                const percent = total > 0 ? ((entry.value / total) * 100).toFixed(1) : '0.0';
                return (
                  <div key={index} className="flex items-center gap-1.5">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: entry.fill }}
                    />
                    <span className="text-xs text-gray-800 font-medium">
                      {entry.name} ({percent}%)
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </InsightCard>

        {/* 9. 여가 활용 */}
        <InsightCard title="여가 시간 활동" icon={Clock}>
          <div className="relative h-full">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={filteredLeisureData} margin={{ top: 5, right: 30, left: 20, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 11, angle: -45, textAnchor: 'end', height: 60 }}
                  interval={0}
                  height={60}
                />
                <YAxis />
                <Tooltip 
                  formatter={(value, name, props) => {
                    const total = filteredLeisureData.reduce((sum, item) => sum + item.value, 0);
                    const percent = total > 0 ? ((value / total) * 100).toFixed(1) : '0.0';
                    return [`${value}명 (${percent}%)`, name];
                  }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40}>
                  {filteredLeisureData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </InsightCard>

        {/* 10 & 11. 학교 인식 (장점 vs 단점) */}
        <InsightCard title="학교 생활 인식 조사" icon={Smile} className="lg:col-span-2">
          <div className="relative h-full grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 장점 */}
            <div className="bg-green-50/50 rounded-xl p-4">
              <h4 className="text-sm font-bold text-green-700 mb-3 flex items-center">
                <ThumbsUp className="w-4 h-4 mr-1" /> 우리 학교 좋은 점
              </h4>
              <div className="space-y-3">
                {filteredProsData.map((item, idx) => (
                  <div key={idx} className="relative">
                    <div className="flex justify-between text-xs mb-1 font-medium text-gray-700">
                      <span>{item.name}</span>
                      <span>
                        {item.value}명 ({item.percent}%)
                      </span>
                    </div>
                    <div className="w-full bg-green-100 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-green-500 h-2.5 rounded-full"
                        style={{ width: `${item.percent}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 단점 */}
            <div className="bg-red-50/50 rounded-xl p-4">
              <h4 className="text-sm font-bold text-red-700 mb-3 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-1" /> 개선이 필요한 점
              </h4>
              <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={filteredConsData} layout="vertical">
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" width={70} tick={{ fontSize: 11 }} />
                    <Tooltip 
                      formatter={(value, name, props) => {
                        const total = filteredConsData.reduce((sum, item) => sum + item.value, 0);
                        const percent = total > 0 ? ((value / total) * 100).toFixed(1) : '0.0';
                        return [`${value}명 (${percent}%)`, name];
                      }}
                      cursor={{ fill: 'transparent' }}
                    />
                    <Bar dataKey="value" fill="#FF8042" radius={[0, 4, 4, 0]} barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </InsightCard>
      </div>

      {/* 서술형 응답 심층 분석 */}
      <div className="max-w-7xl mx-auto mt-12 mb-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-blue-600" />
            서술형 응답 심층 분석
          </h2>

          {/* 문항 1: 대운동회 */}
          <div className="mb-12">
            <div className="bg-blue-50 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-bold text-blue-900 mb-2">
                Ⅰ. 문항 1 분석
              </h3>
              <p className="text-sm text-gray-700 italic">
                「우리학교는 학교체육 활성화를 위해 매년 대운동회를 실시할 예정입니다. 이에 대한 의견을 자유롭게 적어주시기 바랍니다.」
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-base font-bold text-gray-800 mb-3">1. 전체 응답 경향 요약</h4>
                <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 leading-relaxed">
                  <p className="mb-2">
                    전체 학생들은 대운동회 개최에 대체로 긍정적인 반응을 보였으며, 학생들은 '재미있을 것 같다', '기대된다'와 같은 표현을 다수 사용하였다. 특히 축구대회에 대한 희망, 체육시간 확대 요구, 게임·경기 종목 다양화 요청이 반복적으로 나타났다.
                  </p>
                  <p>
                    부정적 의견은 매우 적었으며, 일부 학생은 힘들다, 귀찮다, 날씨 걱정, 안전 문제 우려 등을 언급하였다. 또한 <em className="font-semibold">'없다', '모르겠다'</em>와 같은 비응답형 답변도 일정 비율 존재하였다.
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-base font-bold text-gray-800 mb-3">2. 학년별 분석</h4>
                <div className="space-y-4">
                  {/* 4학년 */}
                  <div className="border-l-4 border-blue-400 pl-4">
                    <h5 className="font-bold text-gray-800 mb-2">🔹 4학년</h5>
                    <p className="text-sm text-gray-600 mb-2"><strong>특징:</strong> 응답이 가장 짧고 간단한 형태로 구성됨.</p>
                    <p className="text-sm text-gray-700 mb-2"><strong>내용 경향:</strong></p>
                    <ul className="text-sm text-gray-700 list-disc list-inside mb-2 space-y-1">
                      <li>축구대회 희망</li>
                      <li>체육을 더 하고 싶다는 의견 다수</li>
                      <li>"좋다", "기대된다" 등 단순 긍정이 가장 많음</li>
                      <li>무응답('없다') 비율도 높음</li>
                    </ul>
                    <p className="text-sm text-gray-700"><strong>대표 응답:</strong></p>
                    <div className="bg-blue-50 rounded p-2 mt-1 text-sm text-gray-700 italic">
                      "축구 하고 싶어요." / "좋습니다." / "체육을 많이 하면 좋겠어요." / "없습니다."
                    </div>
                  </div>

                  {/* 5학년 */}
                  <div className="border-l-4 border-green-400 pl-4">
                    <h5 className="font-bold text-gray-800 mb-2">🔹 5학년</h5>
                    <p className="text-sm text-gray-600 mb-2"><strong>특징:</strong> 4학년보다 의견이 구체적이며, 바라는 활동이 분명히 드러남.</p>
                    <p className="text-sm text-gray-700 mb-2"><strong>내용 경향:</strong></p>
                    <ul className="text-sm text-gray-700 list-disc list-inside mb-2 space-y-1">
                      <li>경기 종목 다양화(축구·릴레이·피구 등)</li>
                      <li>재미 요소 강조</li>
                      <li>"매년 하는 것은 좋다"는 의견</li>
                      <li>소수지만 부담된다는 응답 존재</li>
                    </ul>
                    <p className="text-sm text-gray-700"><strong>대표 응답:</strong></p>
                    <div className="bg-green-50 rounded p-2 mt-1 text-sm text-gray-700 italic">
                      "축구대회가 꼭 있었으면 좋겠다." / "다양한 종목을 만들어 주세요." / "좋지만 너무 더우면 힘들 것 같다."
                    </div>
                  </div>

                  {/* 6학년 */}
                  <div className="border-l-4 border-orange-400 pl-4">
                    <h5 className="font-bold text-gray-800 mb-2">🔹 6학년</h5>
                    <p className="text-sm text-gray-600 mb-2"><strong>특징:</strong> 가장 길고 분석적이며, 행사 운영에 대한 평가적 시각도 포함.</p>
                    <p className="text-sm text-gray-700 mb-2"><strong>내용 경향:</strong></p>
                    <ul className="text-sm text-gray-700 list-disc list-inside mb-2 space-y-1">
                      <li>행사 준비 과정, 안전, 날씨까지 고려한 의견 등장</li>
                      <li>긍정이 다수이지만 4·5학년보다 부정·중립 의견 증가</li>
                      <li>"너무 힘들다", "덥다" 등의 의견 다수</li>
                    </ul>
                    <p className="text-sm text-gray-700"><strong>대표 응답:</strong></p>
                    <div className="bg-orange-50 rounded p-2 mt-1 text-sm text-gray-700 italic">
                      "좋지만 준비가 힘들 것 같다." / "안전하게 진행되면 좋겠다." / "덥지 않은 계절에 하면 좋겠다."
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-lg p-4">
                <h4 className="text-base font-bold text-gray-800 mb-2">3. 핵심 인사이트</h4>
                <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
                  <li>전 학년 공통: 축구 선호도 매우 높음 → 축구 종목 확대 시 만족도 상승</li>
                  <li>4·5학년: 체육 활동 증가 자체에 매우 호의적</li>
                  <li>6학년: 체력·날씨·안전 문제 인식이 증가함</li>
                  <li>대회 운영 방식에 대한 의견: 상위 학년일수록 '행사·운영' 관점에서 응답하는 경향</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 문항 2: 학교 좋은 점/바라는 점 */}
          <div className="border-t border-gray-200 pt-12">
            <div className="bg-green-50 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-bold text-green-900 mb-2">
                Ⅱ. 문항 2 분석
              </h3>
              <p className="text-sm text-gray-700 italic">
                「우리 학교의 좋은 점 또는 바라는 점이 있으면 자유롭게 써주세요.」
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-base font-bold text-gray-800 mb-3">1. 전체 응답 경향 요약</h4>
                <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 leading-relaxed">
                  <p>
                    가장 많이 나온 의견은 급식 칭찬이었다. 다음으로 체육 시간 증가 희망, 학교가 깨끗하다, 학교 시설 개선(화장실·운동장), 선생님 칭찬, 친구와의 관계 만족, 별다른 의견 없음 순으로 나타났다.
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-base font-bold text-gray-800 mb-3">2. 학년별 분석</h4>
                <div className="space-y-4">
                  {/* 4학년 */}
                  <div className="border-l-4 border-blue-400 pl-4">
                    <h5 className="font-bold text-gray-800 mb-2">🔹 4학년</h5>
                    <p className="text-sm text-gray-600 mb-2"><strong>특징:</strong> 응답이 짧고 단순, 감정 표현 중심</p>
                    <p className="text-sm text-gray-700 mb-2"><strong>주요 의견:</strong></p>
                    <ul className="text-sm text-gray-700 list-disc list-inside mb-2 space-y-1">
                      <li>"급식 맛있다" 압도적 1위</li>
                      <li>"체육 시간이 많았으면 좋겠다"</li>
                      <li>"없다" 응답 다수</li>
                    </ul>
                    <p className="text-sm text-gray-700"><strong>대표 응답:</strong></p>
                    <div className="bg-blue-50 rounded p-2 mt-1 text-sm text-gray-700 italic">
                      "급식이 맛있어요." / "체육 많이 했으면 좋겠다." / "없습니다."
                    </div>
                  </div>

                  {/* 5학년 */}
                  <div className="border-l-4 border-green-400 pl-4">
                    <h5 className="font-bold text-gray-800 mb-2">🔹 5학년</h5>
                    <p className="text-sm text-gray-600 mb-2"><strong>특징:</strong> 긍정 의견과 바라는 점이 균형 있게 나옴</p>
                    <p className="text-sm text-gray-700 mb-2"><strong>주요 의견:</strong></p>
                    <ul className="text-sm text-gray-700 list-disc list-inside mb-2 space-y-1">
                      <li>급식 칭찬</li>
                      <li>선생님 칭찬 · 친구 관계 언급 증가</li>
                      <li>학교 시설 혹은 청결 관련 언급</li>
                    </ul>
                    <p className="text-sm text-gray-700"><strong>대표 응답:</strong></p>
                    <div className="bg-green-50 rounded p-2 mt-1 text-sm text-gray-700 italic">
                      "선생님이 친절해서 좋다." / "학교가 깨끗해서 좋다." / "화장실이 더 깨끗해졌으면 좋겠다."
                    </div>
                  </div>

                  {/* 6학년 */}
                  <div className="border-l-4 border-orange-400 pl-4">
                    <h5 className="font-bold text-gray-800 mb-2">🔹 6학년</h5>
                    <p className="text-sm text-gray-600 mb-2"><strong>특징:</strong> 문제점 인식능력이 높아져 개선 의견 증가</p>
                    <p className="text-sm text-gray-700 mb-2"><strong>주요 의견:</strong></p>
                    <ul className="text-sm text-gray-700 list-disc list-inside mb-2 space-y-1">
                      <li>화장실, 급식실, 운동장 등 시설 개선 요구</li>
                      <li>교실 환경 개선</li>
                      <li>학교 행사의 다양성 요구</li>
                      <li>담임 선생님 및 수업 방식 칭찬도 존재</li>
                    </ul>
                    <p className="text-sm text-gray-700"><strong>대표 응답:</strong></p>
                    <div className="bg-orange-50 rounded p-2 mt-1 text-sm text-gray-700 italic">
                      "운동장이 넓었으면 좋겠다." / "화장실 냄새가 줄었으면 좋겠다." / "학교에 더 많은 행사가 있었으면 좋겠다."
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-lg p-4">
                <h4 className="text-base font-bold text-gray-800 mb-2">3. 핵심 인사이트</h4>
                <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
                  <li>전 학년 공통: '급식 만족도'가 매우 높음</li>
                  <li>학년이 올라갈수록: 바라는 점이 구체화되고 개선의 방향이 명확해짐</li>
                  <li className="ml-4">단순 감정 표현(4학년) → 구체적 요구(5학년) → 문제 해결 관점(6학년)</li>
                  <li><strong>학교 개선 시 우선순위(학생 관점):</strong></li>
                  <li className="ml-4">화장실 / 운동장 및 체육 공간 / 체육 시간 확대 / 학교 행사 다양화</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-400 text-xs pb-8">
        2025학년도 서울신답초등학교 학생 생활 설문조사 분석 결과
      </div>

      {/* Floating Filter Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-2 z-50 bg-white/90 backdrop-blur p-2 rounded-2xl shadow-2xl border border-blue-100">
        <div className="text-xs font-bold text-center text-blue-800 mb-1">학년 필터</div>
        {['All', '4학년', '5학년', '6학년'].map((grade) => (
          <button
            key={grade}
            onClick={() => setSelectedGrade(grade)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm ${
              selectedGrade === grade
                ? 'bg-blue-600 text-white ring-2 ring-blue-400 scale-105'
                : 'bg-white text-gray-600 hover:bg-blue-50 border border-gray-100'
            }`}
          >
            {grade === 'All' ? '전체' : grade}
          </button>
                      ))}
                    </div>
    </div>
  );
};

export default StudentInsights;
