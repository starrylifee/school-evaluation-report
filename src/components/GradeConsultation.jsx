import React, { useState } from 'react';
import { Users, BookOpen, MessageCircle, FileText, ChevronRight, Info, CheckCircle2, AlertCircle } from 'lucide-react';

// 데이터 정의
const GRADE_CLUSTERS = [
  {
    id: 'low',
    label: '1~2학년군',
    desc: '기초학력 정착과 학교생활 적응',
    color: 'blue',
    grades: [
      {
        grade: '1학년',
        sections: [
          {
            title: '교육과정 (교과)',
            items: [
              '입학 초기 적응 활동에서 국어와 통합교과 ‘학교’를 연계하여 운영, 학생들의 자연스러운 학교생활 적응 지원',
              '교과와 생활 지도를 자연스럽게 연결(등교 준비, 정리정돈, 규칙 지키기 등)하여 생활 습관을 안정적으로 지도',
              '1학년 발달단계에 맞는 놀이도구(블록, 실뜨기, 카드놀이 등)를 비치하여 관계 형성 및 소통 활동 지원',
              '학기 초 개인 용도로 수 모형을 1세트씩 배부하고 놀이를 통해 수 개념 형성 지원',
            ]
          },
          {
            title: '창의적 체험활동',
            items: [
              '발달 특성에 맞는 경험 중심 교육 제공(종이접기, 놀이체육, 1인 1악기 핸드벨 등)',
              '강사들과 사전 협의를 통해 학년 교육과정에 부합하는 주제와 계획을 수립할 시간 필요',
              '예산상 빠진 연극 수업이 통합교과 및 국어과 교육과정에 포함되어 있으므로 내년에는 꼭 포함되길 희망',
            ]
          },
          {
            title: '생활 지도',
            items: [
              '불안감, 주의산만, 난독, 경계선 지능 의심 학생들은 부모 상담 후 위클래스 상담 및 병원 연계를 통해 지원',
              '배변 실수 및 구토 등 오염 상황 처리로 업무 부담 증가. 학부모 즉각 소통 및 학생 분리 방법 등 구체적인 대응 매뉴얼 마련 필요(입학식 학부모 교육 시 제시 요망)',
            ]
          },
          {
            title: '기타 및 논의 사항',
            type: 'discussion',
            items: [
              '수업 중 학부모의 개인적 메시지가 수업 흐름을 방해하는 경우 발생, 사전 학부모 교육 강화 필요',
              '화장실 생활코디 배치 후 생활지도에 큰 도움이 되었으므로 내년에도 지원 희망',
              '급식: 생선 가시 제거의 어려움 고려, 만둣국/순대국 등 개수 배식 시 학생들에게 수량 안내 요망',
              '화장실 환경 개선(아이들이 무서워함)',
              '학사력 양면 인쇄 개선 및 급식 제공 여부 표기 요망',
              '독서여행기에 책 목록 작성 칸 및 쪽 번호 추가 필요',
              '학습자료지원센터에 입체도형 모형(공, 상자, 둥근기둥) 및 시계 모형 확충 필요(기존 모형 노후화)',
              '이알리미 소통 일원화 요청: 출결 안내, 교외체험학습 신청/보고서, 학년 티셔츠 사이즈 선택(키 기준 학부모 직접 선택)',
            ]
          }
        ]
      },
      {
        grade: '2학년',
        sections: [
          {
            title: '교육과정 (교과)',
            items: [
              '국어: 받아쓰기와 바른 글씨 쓰기 지속 지도로 맞춤법 및 기초 쓰기 능력 다짐. 매일 독서 활동 생활화',
              '수학: 개별 학습 수준을 고려한 기초 연산 지도로 정확성 및 개념 정착',
              '통합교과: 교원학습공동체 기반 수업 사례 및 자료 공유로 전문적 성장 도모',
            ]
          },
          {
            title: '창의적 체험활동',
            items: [
              '체험 중심 안전교육으로 실제 안전태도 함양',
              '종이접기 활동을 통해 소근육 발달, 절차적 사고, 창의성 강화',
              '1인 1악기 교육으로 예술적 감수성 향상',
              '찾아가는 체험학습 및 진로 체험 프로그램의 만족도와 몰입도가 높았음',
            ]
          },
          {
            title: '생활 지도',
            items: [
              '학기 초부터 지속적 생활지도로 안정적 학급 분위기 형성',
              '수시 상담을 통해 생활 태도 개선 및 학습 습관 형성 지원',
            ]
          },
          {
            title: '기타 및 논의 사항',
            type: 'discussion',
            items: [
              '1학기 소체육대회 2시간 편성 운영이 효율적이었음',
              '서관 건물 화장실 악취 문제 지속, 개선 필요',
              '1인 1악기 품목 변경 필요',
              '체육 협력 강사 중 한 분의 학생 지도 및 수업 관리에 어려움이 있어 보완 필요',
              '학교 스포츠클럽은 의무가 아니라면 하지 않았으면 함',
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'middle',
    label: '3~4학년군',
    desc: '교과 학습 능력 신장과 또래 관계 형성',
    color: 'emerald',
    grades: [
      {
        grade: '3학년',
        sections: [
          {
            title: '교육과정 (교과)',
            items: [
              '천재교과서(사회)의 차시별 학습 내용 중복 및 티셀파(과학) 학습 콘텐츠 부실로 수업 운영에 어려움',
              '처음 도입된 크롬북 사용법을 차근차근 지도하며 다양한 콘텐츠 활용 수업이 잘 운영됨',
            ]
          },
          {
            title: '창의적 체험활동',
            items: [
              '동아리 독서부의 온책읽기 활동이 독서에 흥미를 붙이는 계기가 됨',
              '리코더, 캘리그라피, 연극 수업 등에서 아이들의 적극적 참여가 이루어짐',
            ]
          },
          {
            title: '생활 지도',
            items: [
              '화장실 휴지 던지지 않기, 물 내리기 등 지속적인 생활지도 필요',
            ]
          },
          {
            title: '기타 및 논의 사항',
            type: 'discussion',
            items: [
              '점심 급식량이 너무 적어 넉넉히 배식해주기를 희망',
            ]
          }
        ]
      },
      {
        grade: '4학년',
        sections: [
          {
            title: '교육과정 (교과)',
            items: [
              '크롬북과 1학기 수학 AIDT 디지털교과 수업이 학교 실정에 맞게 활용됨',
              '다양한 코스웨어를 활용하고 동학년 자료 공유를 통해 수업 질 향상',
            ]
          },
          {
            title: '창의적 체험활동',
            items: [
              '서예, 우쿨렐레, 연극 등 협력강사 활용 수업이 지속적으로 운영되어 특기 적성 계발에 도움',
              '흡연예방, 장애인식개선, 성폭력예방 교육 등을 통해 올바른 인성 함양',
              '발달단계에 맞는 온책 도서 선정 및 독서 활동으로 사고력 향상',
            ]
          },
          {
            title: '생활 지도',
            items: [
              'ADHD, 감정조절 등 위기 학생을 위해 위클래스, 튜터 등 지원 인력을 활용했으나 지속적인 어려움 존재',
              '수업 방해 학생에 대한 체계적인 교칙 적용 필요',
            ]
          },
          {
            title: '기타 및 논의 사항',
            type: 'discussion',
            items: [
              '크롬북 활용 시 코스웨어 종류에 따라 마우스가 필요하므로 별도 구매 필요',
              '학교자율시간 운영 시 외부 현장체험학습 대신 교내 프로그램으로 대체 희망(업무 및 안전 문제)',
              '수영 시설 노후로 안전 우려 있음',
              '서예 수업은 예산이 들지만 만족도가 높음',
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'high',
    label: '5~6학년군',
    desc: '진로 탐색과 자기주도적 학습 능력 배양',
    color: 'indigo',
    grades: [
      {
        grade: '5학년',
        sections: [
          {
            title: '교육과정 (교과)',
            items: [
              '코딩 수업(햄스터 실습)이 학생들의 흥미와 관심을 높임',
              '국어 연극 단원 재구성을 통한 협력강사 수업 및 공연이 내실 있게 운영됨',
              '배정된 스마트패드 1세트를 활용하여 정보통신활용 능력 발달',
            ]
          },
          {
            title: '창의적 체험활동',
            items: [
              '음악과 연계한 단소 교육 및 국악 노래 부르기를 통해 우리 장단에 친숙해짐',
            ]
          },
          {
            title: '생활 지도',
            items: [
              '학년 초부터 출결 원칙을 학부모에게 전달하고 철저히 관리하여 상습 지각생 감소',
            ]
          },
          {
            title: '기타 및 논의 사항',
            type: 'discussion',
            items: [
              '찾아오는 진로체험학습이 안전하고 내실 있게 진행되어 내년에도 유지 희망',
              '5학년 교실(본관 2층)이 1, 2학년의 방과 후 이동 소음으로 5~6교시 수업 지장. 5학년 교실을 3층으로 배치하는 고려 필요',
            ]
          }
        ]
      },
      {
        grade: '6학년',
        sections: [
          {
            title: '교육과정 (교과)',
            items: [
              '교과 전담 시간 증가로 학급 운영 부담 경감',
              '다양한 교과 활동을 통한 학생 만족도 높음',
            ]
          },
          {
            title: '창의적 체험활동',
            items: [
              '수준과 필요에 맞는 안전 및 체험 교육 실시',
              '학생 수요 조사를 반영한 동아리 활동 운영',
            ]
          },
          {
            title: '생활 지도',
            items: [
              '쉬는 시간 및 점심시간 복도/화장실 모임 행동 제약 필요',
              '학교 공공기물 파손에 대한 보상 및 강한 처벌 필요',
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'subject',
    label: '교과전담',
    desc: '전문적인 교과 지도를 통한 학습 효과 증대',
    color: 'violet',
    grades: [
      {
        grade: '교과전담',
        sections: [
          {
            title: '교육과정 (교과)',
            items: [
              '(영어) 게임, 역할놀이, 실생활 연계로 4기능 균형 학습. 순환 복습으로 누적 학습 효과 증대',
              '(과학) 과학실 디벗(Di-vot) 설치로 프로젝트 학습 및 피드백 용이. 공용 기기 사용 시 개인정보 보호 안내 필요',
              '(도덕) 가치 탐구 및 토의 수업으로 성찰 기회 제공. 실천은 가정/지역사회와 연계된 지속적 환경 필요',
              '(음악) 참여 중심 표현 활동 강화 및 개별 피드백. 실기 활동 공간 및 악기 확보 시 참여도 향상 기대',
              '(평가) 과정 중심 평가 및 개별 피드백 확대. 평가 기준 사전 안내로 신뢰도 확보',
            ]
          },
          {
            title: '생활 지도',
            items: [
              '담임-교과교사 협력으로 학생 수업 태도 및 과제 이행률 향상, 맞춤형 지원 가능',
            ]
          },
          {
            title: '기타 및 논의 사항',
            type: 'discussion',
            items: [
              '공용 기기(디벗) 개인정보 보호 수칙 안내 강화',
              '도덕과 실천 중심 활동 환경 조성',
              '음악 실기 공간/악기 확보 논의',
              '학생 참여형 수업 사례 공유 및 교원 협의 강화',
              '교과 간 연계 수업 확대 필요',
              '과정중심평가 내실화 방안 공유',
              '기기 활용 수업 시 보안 및 계정 관리 지침 마련',
            ]
          }
        ]
      }
    ]
  }
];

const GradeConsultation = () => {
  const [activeTab, setActiveTab] = useState(GRADE_CLUSTERS[0].id);
  const activeData = GRADE_CLUSTERS.find(c => c.id === activeTab);

  return (
    <div className="p-6 lg:p-10 space-y-8 bg-white min-h-[60vh]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-brandNavy flex items-center gap-3">
            <BookOpen className="text-brandBlue" strokeWidth={2.5} />
            학년별 협의자료
          </h2>
          <p className="text-gray-500 mt-2">2025학년도 학년 운영 중점 사항 및 전체 논의 안건입니다.</p>
        </div>
      </div>

      {/* 탭 메뉴 */}
      <div className="flex p-1.5 bg-gray-100 rounded-2xl overflow-x-auto no-scrollbar gap-1">
        {GRADE_CLUSTERS.map((cluster) => (
          <button
            key={cluster.id}
            onClick={() => setActiveTab(cluster.id)}
            className={`flex-1 py-3 px-6 rounded-xl text-sm font-bold transition-all whitespace-nowrap
              ${activeTab === cluster.id 
                ? 'bg-white text-brandBlue shadow-sm ring-1 ring-black/5' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'}`}
          >
            {cluster.label}
          </button>
        ))}
      </div>

      {/* 콘텐츠 영역 */}
      <div className="space-y-8 animate-fade-in">
        {/* 클러스터 설명 */}
        <div className={`p-6 rounded-2xl bg-${activeData.color}-50 border border-${activeData.color}-100 flex items-start gap-4`}>
          <div className={`p-2.5 rounded-xl bg-white text-${activeData.color}-600 shadow-sm`}>
            <Users size={24} />
          </div>
          <div>
            <h3 className={`text-lg font-bold text-${activeData.color}-900 mb-1`}>{activeData.label} 목표</h3>
            <p className={`text-${activeData.color}-700 font-medium`}>{activeData.desc}</p>
          </div>
        </div>

        {/* 학년별 데이터 */}
        <div className="grid grid-cols-1 gap-8">
          {activeData.grades.map((gradeData, idx) => (
            <div key={idx} className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
              {/* 학년 헤더 */}
              <div className={`bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between`}>
                <h3 className="text-lg font-black text-brandNavy flex items-center gap-2">
                  <span className={`w-2 h-6 rounded-full bg-${activeData.color}-500`}></span>
                  {gradeData.grade}
                </h3>
              </div>
              
              {/* 섹션 목록 */}
              <div className="divide-y divide-gray-100">
                {gradeData.sections.map((section, sIdx) => (
                  <div key={sIdx} className="p-6 hover:bg-gray-50/50 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className={`mt-1 flex-shrink-0 w-24 font-bold text-sm ${section.type === 'discussion' ? 'text-amber-600' : 'text-gray-500'}`}>
                        {section.type === 'discussion' ? (
                          <span className="flex items-center gap-1.5 bg-amber-50 px-2 py-1 rounded text-amber-700 w-fit">
                            <AlertCircle size={14} />
                            논의사항
                          </span>
                        ) : (
                          section.title
                        )}
                      </div>
                      <div className="flex-1 space-y-3">
                        {section.type !== 'discussion' && (
                          <h4 className="text-sm font-bold text-gray-800 mb-2">{section.title}</h4>
                        )}
                        <ul className="space-y-2">
                          {section.items.map((item, iIdx) => (
                            <li key={iIdx} className="flex items-start gap-2.5 text-[15px] text-gray-600 leading-relaxed group">
                              <span className={`mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0 group-hover:scale-125 transition-transform ${section.type === 'discussion' ? 'bg-amber-400' : 'bg-gray-300'}`} />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GradeConsultation;

