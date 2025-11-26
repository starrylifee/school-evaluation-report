import React, { useState } from 'react';
import {
  Activity,
  Users,
  BookOpen,
  Smile,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  Info,
} from 'lucide-react';

// --- Data Definition ---

const RESPONDENTS = {
  teacher: 34,
  staff: 10,
  student: 236,
  parent: 177,
};

// Google Forms Default Colors
const COLORS = [
  '#4285F4', // 매우 그렇다 (Blue)
  '#DB4437', // 그렇다 (Red)
  '#F4B400', // 보통이다 (Yellow/Orange)
  '#0F9D58', // 그렇지 않다 (Green)
  '#AB47BC', // 전혀 그렇지 않다 (Purple)
];

const LABELS = ['매우 그렇다', '그렇다', '보통이다', '그렇지 않다', '전혀 그렇지 않다'];

// Fixed Column Order
const ROLE_ORDER = ['teacher', 'staff', 'student', 'parent'];

const DATASET = [
  {
    area: 'Ⅰ. 협력적 학교자치문화',
    icon: <Users className="w-5 h-5" />,
    subAreas: [
      {
        title: 'Ⅰ-1. 소통과 협력의 학교자치 기반 조성',
        indicators: [
          {
            id: 1,
            title: '학교 비전 공유 및 실현',
            analysis: '교직원 모두 학교 비전 공유에 대해 절대적인 긍정 평가를 보입니다.',
            stats: {
              teacher: [100, 0, 0, 0, 0],
              staff: [90, 10, 0, 0, 0],
            },
          },
          {
            id: 101,
            title: '학교 자율운영체제 내실화',
            analysis: '교원들은 학교 자율운영체제에 대해 매우 높은 만족도(97.1%)를 보이고 있습니다.',
            stats: {
              teacher: [97.1, 2.9, 0, 0, 0],
            },
          },
          {
            id: 2,
            title: '학교 회의 문화 활성화',
            analysis: '민주적인 회의 문화가 정착되어 있음을 보여줍니다.',
            stats: {
              teacher: [100, 0, 0, 0, 0],
              staff: [100, 0, 0, 0, 0],
            },
          },
        ],
      },
      {
        title: 'Ⅰ-2. 학부모 및 지역사회 연계',
        indicators: [
          {
            id: 6,
            title: '학부모의 학교교육 참여 활성화',
            analysis:
              "학부모들의 참여 기회 제공에 대해 긍정적이나, 학부모 중 약 13.6%는 '보통'이라고 응답했습니다.",
            stats: {
              teacher: [100, 0, 0, 0, 0],
              staff: [90, 10, 0, 0, 0],
              parent: [48.6, 36.2, 13.6, 1.7, 0],
            },
          },
          {
            id: 5,
            title: '학교와 지역사회 연계·협력 강화',
            analysis: "모든 집단이 긍정적으로 평가하나, 학생과 학부모는 '보통' 응답이 일부 존재합니다.",
            stats: {
              teacher: [100, 0, 0, 0, 0],
              staff: [90, 10, 0, 0, 0],
              student: [67.0, 20.3, 9.3, 0.9, 2.6],
              parent: [46.9, 37.9, 13.0, 2.3, 0],
            },
          },
        ],
      },
      {
        title: 'Ⅰ-3. 행정·예산',
        indicators: [
          {
            id: 3,
            title: '행정업무 경감 및 효율성 제고',
            analysis: '업무 경감 노력과 시스템 효율성에 대해 내부 만족도가 매우 높습니다.',
            stats: {
              teacher: [100, 0, 0, 0, 0],
              staff: [90, 10, 0, 0, 0],
            },
          },
          {
            id: 4,
            title: '예산 편성·운영의 적정성 및 투명성 제고',
            analysis: '예산 운영의 투명성에 대해 신뢰도가 확보되었습니다.',
            stats: {
              teacher: [100, 0, 0, 0, 0],
              staff: [90, 10, 0, 0, 0],
            },
          },
        ],
      },
    ],
  },
  {
    area: 'Ⅱ. 교육과정 운영 및 교수·학습 방법',
    icon: <BookOpen className="w-5 h-5" />,
    subAreas: [
      {
        title: 'Ⅱ-1. 교육과정 편성·운영',
        indicators: [
          {
            id: 7,
            title: '함께 만들어 가는 학생 맞춤형 교육과정',
            analysis:
              '교원과 직원은 운영 측면에서 매우 만족하나, 학부모는 교육과정 편성에 대한 체감이 상대적으로 낮습니다.',
            stats: {
              teacher: [100, 0, 0, 0, 0],
              parent: [45.8, 37.9, 14.7, 1.1, 0.6],
            },
          },
          {
            id: 701,
            title: '학사 운영 및 교육과정 내실화',
            analysis: '학사 운영 및 교육과정 내실화에 대해 교직원 모두 높은 만족도를 보이고 있습니다.',
            stats: {
              teacher: [100, 0, 0, 0, 0],
              staff: [80, 20, 0, 0, 0],
            },
          },
          {
            id: 8,
            title: '학생 맞춤형 진로교육과정 활성화',
            analysis: '학생과 학부모 모두 약 84~85%의 만족도를 보이며, 비슷한 인식 수준을 나타냅니다.',
            stats: {
              teacher: [100, 0, 0, 0, 0],
              student: [61.9, 23.7, 11.0, 1.7, 1.7],
              parent: [46.3, 37.9, 14.1, 1.7, 0],
            },
          },
        ],
      },
      {
        title: 'Ⅱ-2. 수업·평가 혁신',
        indicators: [
          {
            id: 9,
            title: '수업혁신 및 수업나눔 문화 확산',
            analysis:
              "교원은 수업 나눔 문화에 100% 만족하나, 학부모는 수업 혁신에 대해 '보통' 응답이 14.7%로 나타났습니다.",
            stats: {
              teacher: [100, 0, 0, 0, 0],
              parent: [43.5, 40.1, 14.7, 1.1, 0.6],
            },
          },
          {
            id: 10,
            title: '과정중심 평가 내실화',
            analysis: '학부모 만족도가 79.1%로 전 지표 중 가장 낮은 수준입니다. 평가 결과에 대한 소통 강화가 필요합니다.',
            stats: {
              teacher: [100, 0, 0, 0, 0],
              parent: [37.3, 42.4, 18.1, 2.3, 0],
            },
          },
        ],
      },
      {
        title: 'Ⅱ-3. 교원 전문성 신장',
        indicators: [
          {
            id: 99,
            title: '자발적 연구문화 조성',
            analysis:
              '교원 모두가 참여하여 교원학습공동체의 주제 선정, 활동 과정 및 결과 공유 등 교원학습공동체 연수 계획을 수립하고 교육과정을 편성하는 등 적극적·자발적·지속적으로 참여하고 있습니다.\n\n(2025학년도 활동: 학년별 교과별 교원학습공동체 운영, 디지털 기반 학생맞춤 선도학교 교원학습공동체 운영, AI 디지털 직무연수 상시과정 교원학습공동체 운영, SEN에듀 선도학교 교원학습공동체 운영)',
            stats: {
              teacher: [100, 0, 0, 0, 0],
            },
          },
          {
            id: 100,
            title: '교원의 역량 강화 지원',
            analysis:
              '우리 학교는 인공지능(AI)·디지털 활용 연수 참여, 교원학습공동체 운영, 동료장학, 임상장학, 수석교사 컨설팅 등 학교 내의 다양한 자원을 활용하여 자발성을 바탕으로 교원의 역량을 강화하고 있습니다.\n\n(2025학년도 활동: 디지털선도학교 교원연수 및 교원학습공동체 운영)',
            stats: {
              teacher: [100, 0, 0, 0, 0],
            },
          },
        ],
      },
    ],
  },
  {
    area: 'Ⅲ. 교육 활동 및 교육 성과',
    icon: <Smile className="w-5 h-5" />,
    subAreas: [
      {
        title: 'Ⅲ-1. 맞춤형 책임교육',
        indicators: [
          {
            id: 202,
            title: '기초학력 책임지도 강화',
            analysis: "학부모는 '기초학력'에 대해 83.0%의 만족도를 보이고 있습니다.",
            stats: {
              teacher: [100, 0, 0, 0, 0],
              parent: [39.5, 43.5, 15.3, 1.1, 0.6],
            },
          },
          {
            id: 20,
            title: '협력적 통합교육 내실화',
            analysis: "학부모는 '통합교육'에 대해 88.1%로 매우 높게 만족하고 있습니다.",
            stats: {
              teacher: [97.1, 2.9, 0, 0, 0],
              parent: [41.8, 46.3, 10.7, 0.6, 0.6],
            },
          },
          {
            id: 201,
            title: '안정적인 교육복지 지원',
            analysis: "학부모는 '교육복지'에 대해 84.8%의 만족도를 보이고 있습니다.",
            stats: {
              teacher: [100, 0, 0, 0, 0],
              parent: [39.0, 45.8, 13.6, 1.1, 0.6],
            },
          },
          {
            id: 19,
            title: '학생상담 및 치유 회복 지원',
            analysis:
              "학생(85.1%)과 학부모(83.6%) 모두 상담 시스템에 대해 긍정적이나, 학생 중 '보통' 응답이 11.4%입니다.",
            stats: {
              teacher: [100, 0, 0, 0, 0],
              student: [59.7, 25.4, 11.4, 1.7, 1.7],
              parent: [41.2, 42.4, 14.7, 1.7, 0],
            },
          },
          {
            id: 21,
            title: '늘봄학교 안정적 운영',
            analysis: '교원과 직원은 운영 안정성을 100% 확신하며, 학부모 만족도(87.0%)도 매우 높습니다.',
            stats: {
              teacher: [100, 0, 0, 0, 0],
              staff: [80, 20, 0, 0, 0],
              student: [56.8, 26.3, 11.4, 2.6, 3.0],
              parent: [44.1, 42.9, 11.9, 0, 1.1],
            },
          },
        ],
      },
      {
        title: 'Ⅲ-2. 인문·과학·예체능교육',
        indicators: [
          {
            id: 11,
            title: '독서·토론·쓰기교육 활성화',
            analysis: '학생과 학부모 모두 84~85% 수준의 만족도를 보이며, 긍정적입니다.',
            stats: {
              teacher: [100, 0, 0, 0, 0],
              student: [61.0, 24.6, 10.6, 1.7, 2.1],
              parent: [45.2, 39.0, 11.9, 2.3, 1.7],
            },
          },
          {
            id: 12,
            title: '수학·과학·융합교육 내실화',
            analysis:
              '학생(80.5%)과 학부모(79.7%) 모두 만족도가 상대적으로 가장 낮은 지표입니다. 흥미 유발과 성과 공유가 필요합니다.',
            stats: {
              teacher: [100, 0, 0, 0, 0],
              student: [55.5, 25.0, 12.7, 3.4, 3.4],
              parent: [41.2, 38.4, 18.6, 1.1, 0.6],
            },
          },
          {
            id: 13,
            title: '인공지능(AI)·디지털교육 활성화',
            analysis:
              "학생들의 '매우 그렇다' 비율(63.1%)이 높아 디지털 활용 수업에 대한 선호도가 높음을 알 수 있습니다.",
            stats: {
              teacher: [100, 0, 0, 0, 0],
              student: [63.1, 23.3, 9.7, 2.1, 1.7],
              parent: [44.1, 41.2, 13.0, 0, 1.7],
            },
          },
          {
            id: 14,
            title: '학교예술 및 학교체육교육 활성화',
            analysis: '예체능 교육에 대해 학생과 학부모 모두 84% 수준으로 고르게 만족하고 있습니다.',
            stats: {
              teacher: [100, 0, 0, 0, 0],
              student: [65.3, 19.1, 11.0, 1.7, 3.0],
              parent: [42.9, 41.2, 13.6, 1.7, 0.6],
            },
          },
        ],
      },
      {
        title: 'Ⅲ-3. 민주시민교육',
        indicators: [
          {
            id: 15,
            title: '학생자치를 통한 민주시민교육 활성화',
            analysis:
              '학생들의 만족도(87.7%)가 학부모(81.9%)보다 높습니다. 학생들이 주도성을 체감하고 있음을 보여줍니다.',
            stats: {
              teacher: [100, 0, 0, 0, 0],
              student: [62.7, 25.0, 9.7, 0.9, 1.7],
              parent: [44.6, 37.3, 16.4, 1.1, 0.6],
            },
          },
          {
            id: 16,
            title: '공동체형 인성교육 내실화',
            analysis:
              "교원과 학생은 긍정적이나 학부모는 '보통' 응답이 16.4%로 나타나, 가정 연계 인성교육 강화가 필요할 수 있습니다.",
            stats: {
              teacher: [100, 0, 0, 0, 0],
              student: [60.6, 24.6, 11.4, 1.3, 2.1],
              parent: [40.1, 41.2, 16.4, 1.7, 0.6],
            },
          },
          {
            id: 17,
            title: '역사·통일·다문화·세계시민교육 활성화',
            analysis: '학생들의 긍정 응답률(85.6%)이 학부모(82.4%)보다 다소 높습니다.',
            stats: {
              teacher: [97.1, 2.9, 0, 0, 0],
              student: [60.6, 25.0, 11.9, 0.9, 1.7],
              parent: [41.2, 41.2, 16.9, 0, 0.6],
            },
          },
          {
            id: 22,
            title: '지속가능한 생태전환교육 강화',
            analysis: '학생(82.6%)과 학부모(79.7%) 모두 만족도가 낮은 편입니다. 실천 중심 프로그램 강화가 요구됩니다.',
            stats: {
              teacher: [100, 0, 0, 0, 0],
              student: [59.3, 23.3, 14.0, 1.7, 1.7],
              parent: [39.5, 40.1, 19.2, 0, 1.1],
            },
          },
          {
            id: 18,
            title: '생명존중·인권존중·성평등 학교문화 조성',
            analysis: '학생 만족도가 88.1%로 매우 높으며, 학교 내 상호 존중 문화가 잘 형성되어 있다고 인식합니다.',
            stats: {
              teacher: [100, 0, 0, 0, 0],
              staff: [100, 0, 0, 0, 0],
              student: [59.7, 28.4, 8.5, 1.3, 2.1],
              parent: [39.5, 41.8, 16.4, 1.7, 0.6],
            },
          },
          {
            id: 23,
            title: '학교폭력 및 성폭력 예방 및 대응 강화',
            analysis: '학생들은 예방 활동에 대해 86.5%가 긍정적이며, 안전한 학교로 인식하고 있습니다.',
            stats: {
              teacher: [100, 0, 0, 0, 0],
              student: [62.3, 24.2, 10.2, 2.1, 1.3],
              parent: [41.2, 40.7, 15.8, 2.3, 0],
            },
          },
        ],
      },
      {
        title: 'Ⅲ-4. 안전하고 쾌적한 교육 환경',
        indicators: [
          {
            id: 24,
            title: '체험 중심 안전교육 강화',
            analysis: '전 지표 중 가장 만족도가 높은 항목입니다. 학생(89.4%)과 학부모(87.6%) 모두 매우 신뢰합니다.',
            stats: {
              teacher: [100, 0, 0, 0, 0],
              staff: [90, 10, 0, 0, 0],
              student: [69.1, 20.3, 7.2, 0.8, 2.5],
              parent: [41.8, 45.8, 12.4, 0, 0],
            },
          },
          {
            id: 25,
            title: '학교 보건 관리 및 건강한 급식 제공',
            analysis:
              "학생들의 '매우 그렇다' 응답이 64.0%로 높고, 학부모 만족도(87.0%)도 최상위권입니다.",
            stats: {
              teacher: [100, 0, 0, 0, 0],
              staff: [100, 0, 0, 0, 0],
              student: [64.0, 24.2, 8.5, 1.7, 1.7],
              parent: [49.7, 37.3, 11.3, 1.7, 0],
            },
          },
          {
            id: 26,
            title: '교육시설 안전 강화',
            analysis: '시설 관리에 대해 직원과 교원은 100% 긍정, 학부모도 84.8%가 만족하고 있습니다.',
            stats: {
              teacher: [100, 0, 0, 0, 0],
              staff: [90, 10, 0, 0, 0],
              parent: [44.1, 40.7, 14.1, 0, 1.1],
            },
          },
        ],
      },
    ],
  },
];

// --- Sub Components ---

const CustomPieChart = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  if (!data || data.length === 0) return <div>데이터 없음</div>;
  let cumulativePercent = 0;

  // Calculate paths
  const slices = data.map((percent, index) => {
    const startPercent = cumulativePercent;
    const endPercent = cumulativePercent + percent;
    cumulativePercent += percent;
    const startAngle = (startPercent / 100) * 360;
    const endAngle = (endPercent / 100) * 360;
    const x1 = 50 + 50 * Math.cos((Math.PI * (startAngle - 90)) / 180);
    const y1 = 50 + 50 * Math.sin((Math.PI * (startAngle - 90)) / 180);
    const x2 = 50 + 50 * Math.cos((Math.PI * (endAngle - 90)) / 180);
    const y2 = 50 + 50 * Math.sin((Math.PI * (endAngle - 90)) / 180);
    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
    if (percent >= 99.9) {
      return (
        <circle
          key={index}
          cx="50"
          cy="50"
          r="50"
          fill={COLORS[index]}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="transition-opacity duration-200 hover:opacity-80 cursor-pointer"
        />
      );
    }

    if (percent === 0) return null;
    const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
    return (
      <path
        key={index}
        d={pathData}
        fill={COLORS[index]}
        stroke="white"
        strokeWidth="0.5"
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
        className="transition-opacity duration-200 hover:opacity-80 cursor-pointer"
      />
    );
  });
  const innerCircle = <circle cx="50" cy="50" r="30" fill="white" />;
  const satisfactionSum = (data[0] + data[1]).toFixed(1);
  return (
    <div className="relative w-full aspect-square max-w-[180px] mx-auto">
      <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-0">
        {slices}
        {innerCircle}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          {hoveredIndex !== null ? (
            <>
              <div className="text-xs font-bold text-gray-500">{LABELS[hoveredIndex]}</div>
              <div className="text-lg font-bold" style={{ color: COLORS[hoveredIndex] }}>
                {data[hoveredIndex]}%
              </div>
            </>
          ) : (
            <>
              <div className="text-xs text-gray-400">만족도</div>
              <div className="text-lg font-bold text-blue-600">{satisfactionSum}%</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const RespondentCard = ({ role, data, titleOverride }) => {
  const roleMap = {
    teacher: '교원',
    staff: '직원',
    student: '학생',
    parent: '학부모',
  };
  const title = titleOverride || roleMap[role] || role;
  // Render placeholder if no data
  if (!data) {
    return (
      <div className="bg-gray-50 rounded-xl p-4 border border-dashed border-gray-200 flex flex-col items-center justify-center h-full min-h-[250px]">
        <span className="text-gray-300 font-semibold">{roleMap[role]}</span>
        <span className="text-xs text-gray-300 mt-2">응답 없음</span>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col items-center h-full min-h-[320px] justify-between">
      <h4 className="font-semibold text-gray-700 mb-4">{title}</h4>
      <div className="flex-1 flex items-center justify-center w-full">
        <CustomPieChart data={data} />
      </div>
      <div className="w-full mt-4 text-center text-xs text-gray-400"> 긍정 평가 합계</div>
    </div>
  );
};

const Legend = () => (
  <div className="flex flex-wrap justify-center gap-4 mt-6 p-4 bg-gray-50 rounded-lg">
    {LABELS.map((label, idx) => (
      <div key={idx} className="flex items-center text-xs md:text-sm">
        <div className="w-3 h-3 rounded-full mr-2 shadow-sm" style={{ backgroundColor: COLORS[idx] }}></div>
        <span className="text-gray-600">{label}</span>
      </div>
    ))}
  </div>
);

// --- Main App Component ---

const SchoolEvaluation = () => {
  const [activeArea, setActiveArea] = useState(null);
  const [activeIndicator, setActiveIndicator] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleArea = (idx) => {
    if (activeArea === idx) {
      setActiveArea(null);
    } else {
      setActiveArea(idx);
    }
  };
  // Helper to render the content
  const renderContent = () => {
    if (!activeIndicator) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center p-8 animate-fade-in">
          <div className="bg-blue-50 p-6 rounded-full mb-6">
            <Activity className="w-16 h-16 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            2025학년도 서울신답초등학교
            <br />
            학교평가 지표별 분석
          </h1>
          <p className="text-gray-600 max-w-lg mb-8 text-lg">
            좌측 메뉴에서 영역과 지표를 선택하여
            <br />
            대상별 만족도 상세 분석 데이터를 확인하세요.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-100">
              <div className="text-2xl font-bold text-blue-600">{RESPONDENTS.teacher}명</div>
              <div className="text-sm text-gray-500">교원</div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-100">
              <div className="text-2xl font-bold text-blue-600">{RESPONDENTS.staff}명</div>
              <div className="text-sm text-gray-500">직원</div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-100">
              <div className="text-2xl font-bold text-blue-600">{RESPONDENTS.student}명</div>
              <div className="text-sm text-gray-500">학생</div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-100">
              <div className="text-2xl font-bold text-blue-600">{RESPONDENTS.parent}명</div>
              <div className="text-sm text-gray-500">학부모</div>
            </div>
          </div>
        </div>
      );
    }
    const { title, analysis, stats } = activeIndicator;
    return (
      <div className="max-w-[1600px] mx-auto animate-fade-in p-4 pb-20">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 flex items-start leading-snug">
          <span className="bg-blue-600 text-white text-sm py-1 px-3 rounded-full mr-3 mt-1 flex-shrink-0">지표</span>
          {title}
        </h2>
        {/* Analysis Box */}
        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-8 rounded-r-lg shadow-sm">
          <div className="flex items-start">
            <div className="bg-amber-100 p-2 rounded-full mr-3">
              <Info className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-bold text-amber-800 mb-1">분석 결과</h3>
              <p className="text-amber-900 leading-relaxed text-sm md:text-base whitespace-pre-line">{analysis}</p>
            </div>
          </div>
        </div>
        {/* Charts Grid - Fixed 4 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ROLE_ORDER.map((role) => {
            // Special Handling for Parent with multiple sub-datasets (Indicator 20)
            if (role === 'parent' && stats['parent_multi']) {
              return (
                <div key={role} className="flex flex-col gap-4 h-full">
                  {stats['parent_multi'].map((pItem, pIdx) => (
                    <RespondentCard key={`${role}-${pIdx}`} role={role} data={pItem.data} titleOverride={pItem.label} />
                  ))}
                </div>
              );
            }

            // Standard Rendering
            return (
              <div key={role} className="h-full">
                <RespondentCard role={role} data={stats[role]} />
              </div>
            );
          })}
        </div>
        {/* Legend */}
        <Legend />

        <div className="mt-8 text-center text-xs text-gray-400">
          * 차트 위에 마우스를 올리면 상세 비율을 확인할 수 있습니다.
        </div>
      </div>
    );
  };
  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-800 overflow-hidden">
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden absolute top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
      {/* Sidebar */}
      <aside
        className={` ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static fixed inset-y-0 left-0 z-40 w-80 bg-white shadow-xl flex flex-col transition-transform duration-300 ease-in-out`}
      >
        <div className="p-6 border-b border-gray-100">
          <h1
            className="text-lg font-extrabold text-blue-700 tracking-tight cursor-pointer leading-tight"
            onClick={() => setActiveIndicator(null)}
          >
            2025학년도 서울신답초
            <br />
            학교평가 분석
          </h1>
          <p className="text-xs text-gray-500 mt-2">지표별 통합 분석 보고서</p>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {DATASET.map((area, areaIdx) => (
            <div key={areaIdx} className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
              <button
                onClick={() => toggleArea(areaIdx)}
                className={`w-full flex items-center justify-between p-3 text-left transition-colors font-bold ${
                  activeArea === areaIdx ? 'bg-blue-50 text-blue-800' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`p-1.5 rounded-md ${
                      activeArea === areaIdx ? 'bg-blue-200 text-blue-700' : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {area.icon}
                  </span>
                  <span className="text-sm leading-tight">{area.area}</span>
                </div>
                {activeArea === areaIdx ? (
                  <ChevronDown className="w-4 h-4 flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-4 h-4 flex-shrink-0" />
                )}
              </button>
              {/* Sub Areas List */}
              {activeArea === areaIdx && (
                <div className="bg-white divide-y divide-gray-100">
                  {area.subAreas.map((sub, subIdx) => (
                    <div key={subIdx} className="p-3">
                      <h5 className="text-xs font-bold text-gray-500 mb-2 pl-1">{sub.title}</h5>
                      <div className="space-y-1">
                        {sub.indicators.length > 0 ? (
                          sub.indicators.map((indicator, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                setActiveIndicator(indicator);
                                if (window.innerWidth < 1024) setIsSidebarOpen(false);
                              }}
                              className={` w-full text-left text-xs p-2 rounded transition-all ${
                                activeIndicator?.id === indicator.id
                                  ? 'bg-blue-600 text-white font-medium shadow-md'
                                  : 'text-gray-600 hover:bg-blue-50 hover:text-blue-700'
                              }`}
                            >
                              <div className="leading-relaxed">{indicator.title}</div>
                            </button>
                          ))
                        ) : (
                          <div className="text-xs text-gray-300 pl-2 py-1">해당 지표 데이터 없음</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="p-4 border-t text-xs text-center text-gray-400">2025 Seoul Sindap Elementary School</div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto w-full relative">
        <div className="min-h-full p-4 lg:p-8 pt-16 lg:pt-8">{renderContent()}</div>
      </main>
    </div>
  );
};

export default SchoolEvaluation;

