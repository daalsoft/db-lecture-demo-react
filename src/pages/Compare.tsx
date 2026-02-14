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
    feature: "문자열 연결 (NULL포함)",
    oracle: "col1 || col2",
    mysql: "CONCAT_WS('',col1,col2)",
    example: `-- Oracle
SELECT NULL || ' World' FROM dual;

-- MySQL
SELECT CONCAT_WS('',NULL,' World');`,
    result: ` World`
  },
  {
    no: 3,
    feature: "문자열 길이",
    oracle: "LENGTH('ABC')",
    mysql: "CHAR_LENGTH('ABC')",
    example: `SELECT LENGTH('ABC') FROM dual;
SELECT CHAR_LENGTH('ABC');`,
    result: `3`
  },
  {
    no: 4,
    feature: "NULL 처리",
    oracle: "NVL(NULL,0)",
    mysql: "IFNULL(NULL,0)",
    example: `SELECT NVL(NULL,0) FROM dual;
SELECT IFNULL(NULL,0);`,
    result: `0`
  },
  {
    no: 5,
    feature: "NULL 비교",
    oracle: "NULLIF(a,b)",
    mysql: "NULLIF(a,b)",
    example: `SELECT NULLIF('','');`,
    result: `[NULL]`
  },
  {
    no: 6,
    feature: "조건문",
    oracle: "CASE WHEN ... END",
    mysql: "CASE WHEN ... END",
    example: `SELECT CASE WHEN 10 > 5 THEN 'Y' ELSE 'N' END;`,
    result: `Y`
  },
  {
    no: 7,
    feature: "조건문 (DECODE vs CASE)",
    oracle: "DECODE(expr, val1, result1, ..., default)",
    mysql: "CASE WHEN ... THEN ... END",
    example: `-- Oracle (DECODE)
SELECT ENAME,
       DECODE(DEPTNO,
              10, 'ACCOUNTING',
              20, 'RESEARCH',
              30, 'SALES',
              'ETC') AS DEPT_NAME
FROM EMP;

-- Oracle/MySQL 공통 (CASE)
SELECT ENAME,
       CASE DEPTNO
            WHEN 10 THEN 'ACCOUNTING'
            WHEN 20 THEN 'RESEARCH'
            WHEN 30 THEN 'SALES'
            ELSE 'ETC'
       END AS DEPT_NAME
FROM EMP;`,
  result: `DECODE → Oracle 전용
CASE → 모든 DB 공통
실무에서는 CASE 사용 권장`
  },
  {
    no: 8,
    feature: "현재 날짜",
    oracle: "SYSDATE",
    mysql: "NOW()",
    example: `SELECT SYSDATE FROM dual;
SELECT NOW();`,
    result: `2026-02-14 15:30:00 (예시)`
  },
  {
    no: 9,
    feature: "날짜 더하기",
    oracle: "date + 1",
    mysql: "DATE_ADD(date, INTERVAL 1 DAY)",
    example: `SELECT SYSDATE + 1 FROM dual;
SELECT DATE_ADD(NOW(), INTERVAL 1 DAY);`,
    result: `현재 날짜 + 1일`
  },
  {
    no: 10,
    feature: "날짜 차이",
    oracle: "date1 - date2",
    mysql: "DATEDIFF(d1,d2)",
    example: `-- Oracle
SELECT TO_DATE('2026-12-31', 'YYYY-MM-DD') - TO_DATE('2026-01-01', 'YYYY-MM-DD') FROM dual;
SELECT CAST('2026-12-31' AS DATE) - CAST('2026-01-01' AS DATE) FROM dual;

-- MySQL
SELECT DATEDIFF('2026-12-31','2026-01-01');`,
    result: `364`
  },
  {
    no: 11,
    feature: "문자열 치환",
    oracle: "REPLACE(str,'A','B')",
    mysql: "REPLACE(str,'A','B')",
    example: `SELECT REPLACE('HELLO','L','X');`,
    result: `HEXXO`
  },
  {
    no: 12,
    feature: "대소문자 변환",
    oracle: "UPPER(), LOWER()",
    mysql: "UPPER(), LOWER()",
    example: `SELECT UPPER('abc'), LOWER('ABC');`,
    result: `ABC , abc`
  },
  {
    no: 13,
    feature: "문자열 위치",
    oracle: "INSTR(str,'L')",
    mysql: "LOCATE('L',str)",
    example: `SELECT INSTR('HELLO','L');
SELECT LOCATE('L','HELLO');`,
    result: `3`
  },
  {
    no: 14,
    feature: "ROW 제한",
    oracle: "ROWNUM <= n",
    mysql: "LIMIT n",
    example: `SELECT * FROM emp WHERE ROWNUM <= 2;
SELECT * FROM emp LIMIT 2;`,
    result: `상위 2행 반환`
  },
  {
    no: 15,
    feature: "ROW_NUMBER (순번 부여)",
    oracle: "ROW_NUMBER() OVER(ORDER BY col)",
    mysql: "ROW_NUMBER() OVER(ORDER BY col)",
    example: `SELECT ENAME, SAL,
       ROW_NUMBER() OVER (ORDER BY SAL DESC) RN
FROM EMP;`,
    result: `급여 높은 순으로 1부터 순번 부여
동점이어도 고유 번호 생성`
  },
  {
    no: 16,
    feature: "페이징",
    oracle: "OFFSET offset ROWS FETCH NEXT size ROWS ONLY",
    mysql: "LIMIT offset, size 또는 LIMIT size OFFSET offset",
    example: `-- Oracle
SELECT * FROM emp
OFFSET 10 ROWS           -- 10개 행을 건너뛰고 (1~10등 제외)
FETCH NEXT 5 ROWS ONLY;  -- 다음 5개 행을 가져옴 (11~15등)

-- MySQL
SELECT * FROM emp LIMIT 10,5;
SELECT * FROM emp LIMIT 5 OFFSET 10;`,
    result: `11~15번째 행`
  },
  {
    no: 17,
    feature: "문자열 집계",
    oracle: "LISTAGG(name, ',')",
    mysql: "GROUP_CONCAT(name)",
    example: `-- Oracle
SELECT LISTAGG(name, ',') FROM customers;

-- MySQL
SELECT GROUP_CONCAT(name) FROM customers;`,
    result: `김철수,이영희,박민수,정수진,최지훈,한지민,오세훈,윤아름`
  },
  {
    no: 18,
    feature: "UPSERT (UPDATE / INSERT)",
    oracle: "MERGE INTO",
    mysql: "INSERT ... ON DUPLICATE KEY UPDATE",
    example: `-- ORACLE
MERGE INTO users u
USING (SELECT 1 AS id, 'kim' AS name FROM dual) src
ON (u.id = src.id)
WHEN MATCHED THEN
    UPDATE SET u.name = 'kim2'
WHEN NOT MATCHED THEN
    INSERT (id, name)
    VALUES (src.id, src.name);

-- MYSQL
INSERT INTO user(id,name)
VALUES(1,'kim')
ON DUPLICATE KEY UPDATE name='kim2';`,
    result: `중복시 UPDATE`
  },
  
  {
    no: 19,
    feature: "RANK 함수",
    oracle: "RANK() OVER()",
    mysql: "RANK() OVER() (8.0+)",
    example: `SELECT name,
RANK() OVER (ORDER BY salary DESC)
FROM emp;`,
    result: `급여 순위 계산`
  },
  {
    no: 20,
    feature: "RANK vs DENSE_RANK",
    oracle: "RANK(), DENSE_RANK()",
    mysql: "RANK(), DENSE_RANK() (8.0+)",
    example: `SELECT ENAME, SAL,
RANK() OVER (ORDER BY SAL DESC) RANKING,
DENSE_RANK() OVER (ORDER BY SAL DESC) DRANK
FROM EMP;`,
  result: `RANK   → 동점이면 다음 번호 건너뜀
DENSE_RANK → 동점이어도 번호 건너뛰지 않음`
  },
  {
    no: 21,
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
