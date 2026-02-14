import React, { useState } from "react";
import "../App.css";

interface CompareRow {
  no: number;
  feature: string;
  oracle: string;
  mysql: string;
  example: string;
  result: string;
}

const data: CompareRow[] = [
  {
    no: 1,
    feature: "문자열 연결",
    oracle: "col1 || col2",
    mysql: "CONCAT(col1,col2)",
    example: `-- Oracle
SELECT 'Hello' || ' World' FROM dual;

-- MySQL
SELECT CONCAT('Hello',' World');`,
    result: `Hello World`
  },
  {
    no: 2,
    feature: "문자열 길이",
    oracle: "LENGTH('ABC')",
    mysql: "CHAR_LENGTH('ABC')",
    example: `SELECT LENGTH('ABC') FROM dual;
SELECT CHAR_LENGTH('ABC');`,
    result: `3`
  },
  {
    no: 3,
    feature: "NULL 처리",
    oracle: "NVL(NULL,0)",
    mysql: "IFNULL(NULL,0)",
    example: `SELECT NVL(NULL,0) FROM dual;
SELECT IFNULL(NULL,0);`,
    result: `0`
  },
  {
    no: 4,
    feature: "NULL 비교",
    oracle: "NULLIF(a,b)",
    mysql: "NULLIF(a,b)",
    example: `SELECT NULLIF(100,100);`,
    result: `NULL`
  },
  {
    no: 5,
    feature: "조건문",
    oracle: "CASE WHEN ... END",
    mysql: "CASE WHEN ... END",
    example: `SELECT CASE WHEN 10 > 5 THEN 'OK' ELSE 'NO' END;`,
    result: `OK`
  },
  {
    no: 6,
    feature: "현재 날짜",
    oracle: "SYSDATE",
    mysql: "NOW()",
    example: `SELECT SYSDATE FROM dual;
SELECT NOW();`,
    result: `2026-02-14 15:30:00 (예시)`
  },
  {
    no: 7,
    feature: "날짜 더하기",
    oracle: "date + 1",
    mysql: "DATE_ADD(date, INTERVAL 1 DAY)",
    example: `SELECT SYSDATE + 1 FROM dual;
SELECT DATE_ADD(NOW(), INTERVAL 1 DAY);`,
    result: `현재 날짜 + 1일`
  },
  {
    no: 8,
    feature: "날짜 차이",
    oracle: "date1 - date2",
    mysql: "DATEDIFF(d1,d2)",
    example: `SELECT DATEDIFF('2026-12-31','2026-01-01');`,
    result: `364`
  },
  {
    no: 9,
    feature: "문자열 치환",
    oracle: "REPLACE(str,'A','B')",
    mysql: "REPLACE(str,'A','B')",
    example: `SELECT REPLACE('HELLO','L','X');`,
    result: `HEXXO`
  },
  {
    no: 10,
    feature: "대소문자 변환",
    oracle: "UPPER(), LOWER()",
    mysql: "UPPER(), LOWER()",
    example: `SELECT UPPER('abc'), LOWER('ABC');`,
    result: `ABC , abc`
  },
  {
    no: 11,
    feature: "문자열 위치",
    oracle: "INSTR(str,'L')",
    mysql: "LOCATE('L',str)",
    example: `SELECT INSTR('HELLO','L');
SELECT LOCATE('L','HELLO');`,
    result: `3`
  },
  {
    no: 12,
    feature: "ROW 제한",
    oracle: "ROWNUM <= n",
    mysql: "LIMIT n",
    example: `SELECT * FROM emp WHERE ROWNUM <= 2;
SELECT * FROM emp LIMIT 2;`,
    result: `상위 2행 반환`
  },
  {
    no: 13,
    feature: "페이징",
    oracle: "OFFSET ... FETCH",
    mysql: "LIMIT offset, size",
    example: `SELECT * FROM emp LIMIT 10,5;`,
    result: `11~15번째 행`
  },
  {
    no: 14,
    feature: "문자열 집계",
    oracle: "LISTAGG(name, ',')",
    mysql: "GROUP_CONCAT(name)",
    example: `SELECT GROUP_CONCAT(name) FROM users;`,
    result: `kim,lee,park`
  },
  {
    no: 15,
    feature: "UPSERT",
    oracle: "MERGE INTO",
    mysql: "INSERT ... ON DUPLICATE KEY UPDATE",
    example: `INSERT INTO user(id,name)
VALUES(1,'kim')
ON DUPLICATE KEY UPDATE name='kim2';`,
    result: `중복시 UPDATE`
  },
  {
    no: 16,
    feature: "RANK 함수",
    oracle: "RANK() OVER()",
    mysql: "RANK() OVER() (8.0+)",
    example: `SELECT name,
RANK() OVER (ORDER BY salary DESC)
FROM emp;`,
    result: `급여 순위 계산`
  },
  {
    no: 17,
    feature: "EXISTS",
    oracle: "EXISTS (subquery)",
    mysql: "EXISTS (subquery)",
    example: `SELECT * FROM emp e
WHERE EXISTS (
  SELECT 1 FROM dept d
  WHERE e.deptno = d.deptno
);`,
    result: `조건 만족 시 TRUE`
  }
];

const Compare: React.FC = () => {
  const [openRow, setOpenRow] = useState<number | null>(null);

  const toggleRow = (no: number) => {
    setOpenRow(openRow === no ? null : no);
  };

  return (
    <div className="card">
      <h2>⚙ Oracle ↔ MySQL 함수/SQL 전체 비교 (예제 + 결과)</h2>

      <div style={{ overflowX: "auto", marginTop: "20px" }}>
        <table className="compare-table">
          <thead>
            <tr>
              <th>No</th>
              <th>기능</th>
              <th>Oracle</th>
              <th>MySQL</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <React.Fragment key={row.no}>
                <tr
                  className={`clickable-row ${openRow === row.no ? "active" : ""}`}
                  onClick={() => toggleRow(row.no)}
                >
                  <td>{row.no}</td>
                  <td>{row.feature}</td>
                  <td><code>{row.oracle}</code></td>
                  <td><code>{row.mysql}</code></td>
                </tr>

                {openRow === row.no && (
                  <tr className="accordion-row">
                    <td colSpan={4}>
                      <div className="example-box">
                        <h4>🧾 SQL 예제</h4>
                        <pre>{row.example}</pre>

                        <h4 style={{ marginTop: "20px" }}>📊 실행 결과</h4>
                        <pre className="result-box">{row.result}</pre>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Compare;
