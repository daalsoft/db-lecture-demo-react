import React, { useState } from "react";

interface Topic {
  id: number;
  title: string;
  content: string;
}

const topics: Topic[] = [
  {
    id: 1,
    title: "옵티마이저 & 실행 구조",
    content: `
• RBO vs CBO
• Selectivity / Cardinality / Cost
• Full Table Scan / Index Scan
• Nested Loop / Hash Join / Merge Join
• Driving Table
• Predicate Pushdown

👉 옵티마이저는 통계 기반으로 가장 비용이 적은 실행계획을 선택합니다.
`
  },
  {
    id: 2,
    title: "인덱스 심화",
    content: `
• Clustered / Non-Clustered
• Covering Index
• Composite Index
• Function-Based Index
• Index Skip Scan
• 선두 컬럼 원칙

👉 인덱스는 선택도가 높을수록 효과적입니다.
`
  },
  {
    id: 3,
    title: "통계 & 히스토그램",
    content: `
• Histogram 종류
• Bind Peeking
• Hard Parse / Soft Parse
• Dynamic Sampling
• 통계 stale 문제

👉 통계가 잘못되면 실행계획이 왜곡됩니다.
`
  },
  {
    id: 4,
    title: "조인 전략",
    content: `
• JOIN 순서
• EXISTS vs IN
• Anti Join / Semi Join
• Cartesian Join
• ON vs WHERE 조건 차이

👉 조인 전략은 데이터량에 따라 달라집니다.
`
  },
  {
    id: 5,
    title: "병목 & 대기 이벤트",
    content: `
• Wait Event
• Lock / Deadlock
• TX Lock
• Buffer Busy Wait
• IO Bound vs CPU Bound

👉 병목은 대부분 Lock 또는 IO 대기에서 발생합니다.
`
  },
  {
    id: 6,
    title: "트랜잭션 & 동시성",
    content: `
• Isolation Level
• MVCC
• Undo / Redo
• Phantom Read
• Gap Lock

👉 동시성 구조 이해가 성능에 큰 영향을 줍니다.
`
  },
  {
    id: 7,
    title: "실전 튜닝 시나리오",
    content: `
• 서브쿼리 → 조인 변경
• LIKE '%값' 인덱스 미사용
• DISTINCT vs GROUP BY
• OFFSET vs Keyset Pagination

👉 실전 사례 비교가 가장 중요합니다.
`
  },
  {
    id: 8,
    title: "DB별 차이 비교",
    content: `
• Oracle / MySQL / PostgreSQL / MSSQL
• 실행계획 조회 방식
• 통계 갱신 명령어 차이
• Lock 구조 차이
• 파티셔닝 지원 방식

👉 DBMS마다 옵티마이저 철학이 다릅니다.
`
  }
];

const TuningLecture: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggle = (id: number) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="lecture-container">
      <h2>📘 DB 성능 튜닝 강의 정리</h2>

      {topics.map(topic => (
        <div key={topic.id} className="accordion-item">
          <div
            className="accordion-header"
            onClick={() => toggle(topic.id)}
          >
            {openItems.includes(topic.id) ? "▼" : "▶"} {topic.title}
          </div>

          {openItems.includes(topic.id) && (
            <pre className="accordion-content">
              {topic.content}
            </pre>
          )}
        </div>
      ))}
    </div>
  );
};

export default TuningLecture;
