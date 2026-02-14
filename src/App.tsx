import { useState } from "react";
import "./App.css";

function App() {
  const [current, setCurrent] = useState<string>("home");

  const renderSection = () => {
    switch (current) {
      case "home":
        return (
          <div className="card">
            <h2>📘 강의 소개</h2>
            <p>
              Oracle / MySQL / MariaDB / MSSQL / PostgreSQL 성능 비교 및 튜닝 실습
            </p>
          </div>
        );

      case "basic":
        return (
          <div className="card">
            <h2>📘 DB 기본 개념</h2>
            <ul>
              <li>트랜잭션</li>
              <li>인덱스 구조 (B-Tree)</li>
              <li>락 & MVCC</li>
              <li>실행계획</li>
            </ul>
          </div>
        );

      case "compare":
        return (
          <div className="card">
            <h2>⚙ DB별 특징 비교</h2>
            <table border={1} cellPadding={10}>
              <thead>
                <tr>
                  <th>항목</th>
                  <th>Oracle</th>
                  <th>MySQL</th>
                  <th>MSSQL</th>
                  <th>PostgreSQL</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>기본 엔진</td>
                  <td>독자 엔진</td>
                  <td>InnoDB</td>
                  <td>통합 엔진</td>
                  <td>MVCC</td>
                </tr>
                <tr>
                  <td>윈도우 함수</td>
                  <td>강력</td>
                  <td>8.0 이상 지원</td>
                  <td>강력</td>
                  <td>강력</td>
                </tr>
              </tbody>
            </table>
          </div>
        );

      case "tuning":
        return (
          <div className="card">
            <h2>🚀 성능 튜닝</h2>
            <ul>
              <li>인덱스 설계</li>
              <li>조인 방식 (NL / HASH / MERGE)</li>
              <li>통계정보 갱신</li>
              <li>파티션 활용</li>
            </ul>
          </div>
        );

      case "plan":
        return (
          <div className="card">
            <h2>📊 실행계획 분석</h2>
            <p>Execution Plan, IO 통계, 시간 확인</p>
          </div>
        );

      case "practice":
        return (
          <div className="card">
            <h2>💻 실습 SQL</h2>
            <pre>{`
SELECT *
FROM orders o
JOIN customers c
  ON o.customer_id = c.customer_id
WHERE o.order_date >= '2026-01-01';
            `}</pre>
          </div>
        );

      case "docker":
        return (
          <div className="card">
            <h2>📂 Docker 실습 환경</h2>
            <pre>{`
docker run -d -p 3306:3306 
-e MYSQL_ROOT_PASSWORD=1234 
mysql:8.0
            `}</pre>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <header>
        <h1>💻 DB 성능 튜닝 & 비교 강의 데모</h1>
      </header>

      <nav>
        <button onClick={() => setCurrent("home")}>Home</button>
        <button onClick={() => setCurrent("basic")}>DB 기본 개념</button>
        <button onClick={() => setCurrent("compare")}>DB별 비교</button>
        <button onClick={() => setCurrent("tuning")}>성능 튜닝</button>
        <button onClick={() => setCurrent("plan")}>실행계획</button>
        <button onClick={() => setCurrent("practice")}>실습 SQL</button>
        <button onClick={() => setCurrent("docker")}>Docker 환경</button>
      </nav>

      <section>{renderSection()}</section>
    </>
  );
}

export default App;
