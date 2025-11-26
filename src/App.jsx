import { useMemo, useState } from 'react';
import SchoolEvaluation from './components/SchoolEvaluation';
import CurriculumSurvey from './components/CurriculumSurvey';
import StudentInsights from './components/StudentInsights';
import DepartmentDiscussion from './components/DepartmentDiscussion';
import GradeConsultation from './components/GradeConsultation';
import ComingSoon from './components/ComingSoon';

const SECTIONS = [
  {
    id: 'evaluation',
    label: '학교평가 지표 분석',
    sub: '2025학년도 교원·학생·학부모 만족도',
    component: SchoolEvaluation,
    accent: 'bg-blue-600/10 text-blue-700 border border-blue-200',
  },
  {
    id: 'curriculum',
    label: '교육과정 설문 분석',
    sub: '2026 대비 전 집단 의견 수집',
    component: CurriculumSurvey,
    accent: 'bg-indigo-600/10 text-indigo-700 border border-indigo-200',
  },
  {
    id: 'student',
    label: '학생 기초자료',
    sub: '4·5·6학년 생활·희망 데이터',
    component: StudentInsights,
    accent: 'bg-emerald-600/10 text-emerald-700 border border-emerald-200',
  },
  {
    id: 'department',
    label: '부서별 협의자료',
    sub: '2025 협의안 탑재 완료',
    component: DepartmentDiscussion,
    accent: 'bg-amber-500/10 text-amber-700 border border-amber-200',
  },
  {
    id: 'grade',
    label: '학년별 협의자료',
    sub: '학년군별 실행계획 및 논의 안건',
    component: GradeConsultation,
    accent: 'bg-slate-500/10 text-slate-700 border border-slate-200',
  },
];

function App() {
  const [activeId, setActiveId] = useState(SECTIONS[0].id);
  const activeSection = useMemo(() => SECTIONS.find((section) => section.id === activeId) ?? SECTIONS[0], [activeId]);
  const ActiveComponent = activeSection.component;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-blue-50/30">
      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-10 space-y-10">
        <header className="text-center lg:text-left space-y-2">
          <p className="text-sm md:text-base text-gray-500 font-medium">서울신답초등학교</p>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-brandNavy leading-snug text-center">
            2025학년도 학교 평가 보고 및
            <br />
            2026학년도 교육과정 계획 회의
          </h1>
          <p className="text-sm text-gray-400">2025. 12. 1(월)</p>
        </header>

        <nav className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {SECTIONS.map((section, idx) => {
            const isActive = section.id === activeId;
            return (
              <button
                key={section.id}
                className={`text-left rounded-2xl p-4 shadow-sm transition-all duration-200 border bg-white ${
                  isActive ? 'ring-2 ring-brandBlue shadow-elevation' : 'hover:-translate-y-0.5 hover:shadow'
                }`}
                onClick={() => setActiveId(section.id)}
              >
                <div className="flex items-center justify-between mb-3 text-xs text-gray-400 font-semibold tracking-widest">
                  <span>SECTION {idx + 1}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${section.accent}`}>LIVE</span>
                </div>
                <div className="space-y-1">
                  <p className={`text-base font-bold ${isActive ? 'text-brandBlue' : 'text-brandNavy'}`}>{section.label}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{section.sub}</p>
                </div>
              </button>
            );
          })}
        </nav>

        <section className="rounded-3xl border border-white/80 bg-white/90 shadow-[0_40px_80px_rgba(79,114,205,0.15)] overflow-hidden">
          <ActiveComponent key={activeId} />
        </section>
      </div>
    </div>
  );
}

export default App;
