import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle2, ListTodo, Megaphone, AlertCircle, Scale } from 'lucide-react';

const DEPARTMENTS = [
  {
    id: 'deptAdmin',
    name: '행정실',
    roles: [
      '학교회계 예산편성 및 결산, 계약 및 집행',
      '교내 시설물 관리·점검',
      '물품관리(수급계획, 재물조사, 결산, 불용·폐기 등)'
    ],
    agendas: [
      {
        title: '2026학년도 학교회계 본예산 편성 추진',
        description: '12월 중 협의 실시 예정'
      },
      {
        title: '어린이 활동공간 및 교직원 회의실 환경개선 공사',
        description: '돌봄교실 및 도서관 이동 수업'
      },
      {
        title: '겨울방학 본관동 드라이비트 해소 공사 및 급식실 환기 공사',
        description: '12월 중 시공사 및 교육청 담당자와 주차 문제 등 협의 예정'
      }
    ]
  },
  {
    id: 'dept1',
    name: '교무기획부',
    roles: [
      '학사일정에 따른 입학식, 시업식, 종업식, 졸업식 등의 기본 행사 안정적 운영',
      '동대문구 교육경비보조금 및 서울시 교육청 자율사업 등의 예산 업무 총괄 및 운영',
      '학부모회 및 신답교육공동체 조직 및 운영, 학교생활기록부 및 학적 관련 업무 추진',
      '토론이 있는 교직원회의, 부장회의 민주적 운영 및 청렴 교육 추진'
    ],
    agendas: [
      {
        title: '나이스 학부모서비스 활용 논의',
        description: '교외체험학습 신청서 및 보고서를 나이스 학부모서비스로 받는 것에 대한 논의'
      },
      {
        title: '방송 소리 송출 방식 협의',
        description: '현재 방식(방송실 일괄 송출) vs 변경안(교실 개별 조절) 장단점 비교 필요',
        options: [
          { label: '1안: 방송실 일괄 송출 (현행)', pros: '교실 조작 불필요', cons: '영상보다 소리 1-2초 지연' },
          { label: '2안: 교실 개별 조절', pros: '영상-소리 싱크 일치', cons: '교실에서 리모컨 2개 조작 번거로움' }
        ]
      }
    ]
  },
  {
    id: 'dept2',
    name: '교육과정부',
    roles: [
      '2026학년도 봉사활동 시수 0시간 운영 여부 검토',
      '학부모 학교평가 설문 시 ‘성실참여자를 추첨하여 기념품 증정’하는 방안 제안'
    ],
    agendas: [
      {
        title: '제헌절(7.17.) 자율휴업일 지정 논의',
        description: '공휴일 지정 움직임 고려하여 논의 필요'
      },
      {
        title: '2월 학사 운영 관련 협의',
        description: ''
      }
    ]
  },
  {
    id: 'dept3',
    name: '수업연수부',
    roles: [
      '3~6학년 교과서 선정 업무 완료 (교사 협조로 순조롭게 진행)',
      '임상장학 컨설팅을 통한 수업 개선 방안 논의 및 동료장학 활성화',
      '각종 독서 행사 및 학년별 온책읽기 도서 선정 및 내실 있는 독서 활동 진행',
      '[애로사항] 도서관 운영 예산 부족으로 증액 필요'
    ],
    agendas: []
  },
  {
    id: 'dept4',
    name: '인성생활부',
    roles: [
      '3~6학년: 학교전담경찰관과 함께하는 학교폭력 예방교육 실시',
      '1~2학년: 공연형 학교폭력 예방교육 실시',
      'Wee클래스 상담실 운영 및 학기별 인성생활교육주간 실시',
      '1학년 복도 생활지도 보조 인력 채용 및 운영'
    ],
    agendas: []
  },
  {
    id: 'dept5',
    name: '과학정보부',
    roles: [],
    agendas: [
      {
        title: '스마트튜터 활용 방안 논의',
        description: '초기 디벗 보급엔 도움 되었으나 교실 활용도 낮음. 내년 배치 및 활용 방안 재검토 필요'
      }
    ]
  },
  {
    id: 'dept6',
    name: '체육부',
    roles: [],
    agendas: [
      {
        title: '2026학년도 신체발달측정 운영 방식',
        description: '시력검사 포함하여 운영 방식 협의 필요'
      }
    ]
  },
  {
    id: 'dept7',
    name: '안전부',
    roles: [
      '찾아가는 안전교육(소방, 자전거, PM 등) 계획대로 차질 없이 운영됨',
      '[아쉬운 점] 소방서 합동 훈련 시 도착 지연 및 옥내소화전 노후화로 진행 차질'
    ],
    agendas: [
      {
        title: '교내 안전시설 업무 이관 제안',
        description: '비상 대피 경로, 옥내소화전, 화장실 불법 촬영 점검 등 전문적 지식 필요하여 행정실 소관으로 이관 제안'
      }
    ]
  },
  {
    id: 'dept8',
    name: '진로교육부',
    roles: [
      '지역연계중점학교 운영 (4학년 자율시간, 진로주간, 지역기관 탐방 등)',
      '지역연계의 날 활동(음악회 봉사, 케이크 전달 등) 지속 필요',
      '1일형 현장체험학습 진행 상황 파악',
      '진로교육: 진로검사 상담 및 진로탐색주간 운영',
      '신답 체험의 날 운영 및 강사/부스 운영 평가',
      '금융교육: 격년 실시 가능성 검토 (2026년 4,5학년 신청 예정)'
    ],
    agendas: [
      {
        title: '2026학년도 지역연계 중점 학년 선정',
        description: '4학년 추천하나 전체 의견 수렴 필요'
      },
      {
        title: '마을강사 활용 예산',
        description: '지역연계 예산 확보 시 마을강사 적극 활용 예정'
      }
    ]
  },
  {
    id: 'dept9',
    name: '창의예술부',
    roles: [
      '교육경비보조금 및 초등예술하나 예산 기반 협력강사 수업 운영',
      '협력강사 만족도 조사 및 차년도 강사 채용 진행'
    ],
    agendas: [
      {
        title: '학년별 협력강사 수업 분야 및 악기 교체',
        description: '분야 변경 및 악기 선정 협의'
      },
      {
        title: '강사 만족도 조사 결과 반영',
        description: '반영 범위 및 재계약 기준 선정'
      },
      {
        title: '학교예술강사 지원사업 관련 시수 협의',
        description: '2025년 1, 2학년 연극 수업 22차시 미지원에 따른 대책 논의'
      }
    ]
  },
  {
    id: 'dept10',
    name: '기초학력',
    roles: [
      '진단검사 실시 및 난독/경계선 지능 학생 지원 연계',
      '문해력·수리력 평가 진행',
      '키다리샘, 도약캠프, 학습지원튜터, 방과후 기초학력 수업 운영'
    ],
    agendas: []
  },
  {
    id: 'dept11',
    name: '학생자치',
    roles: [
      '학급 및 전교 임원 선거, 교육, 간담회 실시',
      '자치회 주도 학교 행사 운영'
    ],
    agendas: [
      {
        title: '전교임원 선거운동 범위 확대 논의',
        description: '포스터 게시 외 아침·점심시간 선거운동원 활동 허용 여부'
      }
    ]
  },
  {
    id: 'dept12',
    name: '특수',
    roles: [
      '학년별 통합학급 대상 장애이해교육 및 통합교육 프로그램 운영',
      '장애공감활동의 지속적 운영과 다양화 필요'
    ],
    agendas: [
      {
        title: '학습도움실 선택형 프로그램 장소 변경',
        description: '매주 수요일 생활체육 수업 시 좁은 교실 및 소음 문제로 장소 변경 필요'
      }
    ]
  }
];

const DepartmentDiscussion = () => {
  const [expandedId, setExpandedId] = useState(DEPARTMENTS[0].id);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 lg:p-10 shadow-sm border border-amber-100">
        <div className="mb-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold mb-3">
            <Megaphone size={14} />
            <span>2025학년도 준비</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-black text-brandNavy mb-2">부서별 협의 및 개선 사항</h2>
          <p className="text-gray-500 leading-relaxed">
            각 부서에서 검토한 2024학년도 운영 성과와 2025학년도 개선 안건입니다.<br className="hidden lg:block" />
            전체 협의가 필요한 사항은 붉은색 아이콘으로 표시되었습니다.
          </p>
        </div>

        <div className="space-y-3">
          {DEPARTMENTS.map((dept) => {
            const isExpanded = expandedId === dept.id;
            const hasAgendas = dept.agendas.length > 0;
            
            return (
              <div 
                key={dept.id} 
                className={`rounded-2xl transition-all duration-300 overflow-hidden border ${
                  isExpanded 
                    ? 'border-amber-200 bg-amber-50/30 shadow-md' 
                    : 'border-gray-100 bg-white hover:border-amber-100 hover:shadow-sm'
                }`}
              >
                <button 
                  onClick={() => setExpandedId(isExpanded ? null : dept.id)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold shrink-0 transition-colors ${
                      isExpanded ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {dept.name.substring(0, 1)}
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                      <span className={`text-lg font-bold ${isExpanded ? 'text-brandNavy' : 'text-gray-700'}`}>
                        {dept.name}
                      </span>
                      {hasAgendas && (
                        <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 bg-red-50 text-red-600 border border-red-100 rounded-full font-medium w-fit">
                          <AlertCircle size={10} />
                          협의필요
                        </span>
                      )}
                    </div>
                  </div>
                  {isExpanded ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
                </button>

                {isExpanded && (
                  <div className="px-5 pb-8 animate-fadeIn">
                    <div className="pl-0 md:pl-14 space-y-6">
                      
                      {/* 담당 업무 영역 */}
                      {dept.roles.length > 0 && (
                        <div>
                          <h4 className="flex items-center gap-2 text-sm font-bold text-gray-500 mb-3 uppercase tracking-wider">
                            <ListTodo size={16} />
                            주요 업무 및 성과
                          </h4>
                          <ul className="space-y-2 bg-white rounded-xl p-4 border border-gray-100">
                            {dept.roles.map((role, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 leading-relaxed">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />
                                {role}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* 협의 사항 */}
                      {hasAgendas ? (
                        <div>
                          <h4 className="flex items-center gap-2 text-sm font-bold text-red-500 mb-3 uppercase tracking-wider">
                            <Scale size={16} />
                            전체 협의 안건
                          </h4>
                          <div className="grid gap-3">
                            {dept.agendas.map((agenda, idx) => (
                              <div key={idx} className="bg-white border border-red-100 rounded-xl p-5 shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-red-400" />
                                <h5 className="font-bold text-gray-900 mb-1 flex items-start gap-2">
                                  <CheckCircle2 size={18} className="text-red-500 shrink-0 mt-0.5" />
                                  {agenda.title}
                                </h5>
                                {agenda.description && (
                                  <p className="text-sm text-gray-600 pl-6 mb-2">{agenda.description}</p>
                                )}
                                
                                {/* 옵션이 있는 경우 (방송 송출 방식 등) */}
                                {agenda.options && (
                                  <div className="mt-3 pl-6 grid gap-2 sm:grid-cols-2">
                                    {agenda.options.map((opt, optIdx) => (
                                      <div key={optIdx} className="bg-gray-50 p-3 rounded-lg text-sm border border-gray-200">
                                        <span className="block font-bold text-gray-800 mb-1">{opt.label}</span>
                                        <div className="space-y-0.5 text-xs">
                                          <p className="text-blue-600">👍 {opt.pros}</p>
                                          <p className="text-red-500">👎 {opt.cons}</p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="py-4 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
                          <p className="text-sm text-gray-400">전체 협의가 필요한 안건이 없습니다.</p>
                        </div>
                      )}

                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400">
            위 내용은 각 부서의 1차 협의 내용을 바탕으로 작성되었습니다. <br />
            추가 수정이 필요한 경우 교무실로 연락 바랍니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DepartmentDiscussion;

