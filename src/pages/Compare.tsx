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
    feature: "문자열 자르기",
    oracle: "SUBSTR(str,pos,len)",
    mysql: "SUBSTRING(str,pos,len)",
    example: `-- Oracle
SELECT SUBSTR('ABCDE', 1, 3) FROM dual;
SELECT SUBSTR('ABCDE', 0, 3) FROM dual;  -- ORACLE은 pos 값이 0 일때 1로 처리

-- MySQL
SELECT SUBSTRING('ABCDE', 1, 3);
SELECT SUBSTRING('ABCDE', 0, 3);  -- MySQL은 pos 값이 0 일때 오류 발생`,
    result: `ABC`
  },
  {
    no: 5,
    feature: "문자열 위치",
    oracle: "INSTR(str,'L')",
    mysql: "LOCATE('L',str)",
    example: `SELECT INSTR('HELLO','L');
SELECT LOCATE('L','HELLO');`,
    result: `3`
  },
  {
    no: 6,
    feature: "문자열 치환",
    oracle: "REPLACE(str,'A','B')",
    mysql: "REPLACE(str,'A','B')",
    example: `SELECT REPLACE('HELLO','L','X');`,
    result: `HEXXO`
  },
  {
    no: 7,
    feature: "대소문자 변환",
    oracle: "UPPER(), LOWER()",
    mysql: "UPPER(), LOWER()",
    example: `SELECT UPPER('abc'), LOWER('ABC');`,
    result: `ABC , abc`
  },
  {
    no: 8,
    feature: "NULL 처리",
    oracle: "NVL(NULL,0)",
    mysql: "IFNULL(NULL,0)",
    example: `SELECT NVL(NULL,0) FROM dual;
SELECT IFNULL(NULL,0);`,
    result: `0`
  },
  {
    no: 9,
    feature: "NULL 비교",
    oracle: "NULLIF(a,b)",
    mysql: "NULLIF(a,b)",
    example: `SELECT NULLIF('','');`,
    result: `[NULL]`
  },
  {
    no: 10,
    feature: "조건문",
    oracle: "CASE WHEN ... END",
    mysql: "CASE WHEN ... END",
    example: `SELECT CASE WHEN 10 > 5 THEN 'Y' ELSE 'N' END;`,
    result: `Y`
  },
  {
    no: 11,
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
    no: 12,
    feature: "현재 날짜",
    oracle: "SYSDATE",
    mysql: "NOW()",
    example: `SELECT SYSDATE FROM dual;
SELECT NOW();`,
    result: `2026-02-14 15:30:00 (예시)`
  },
  {
    no: 13,
    feature: "날짜 더하기",
    oracle: "date + 1",
    mysql: "DATE_ADD(date, INTERVAL 1 DAY)",
    example: `SELECT SYSDATE + 1 FROM dual;
SELECT DATE_ADD(NOW(), INTERVAL 1 DAY);`,
    result: `현재 날짜 + 1일`
  },
  {
    no: 14,
    feature: "날짜 차이",
    oracle: "date1 - date2",
    mysql: "DATEDIFF(d1,d2)",
    example: `-- Oracle
SELECT TO_DATE('2026-12-31', 'YYYY-MM-DD') - TO_DATE('2026-01-01', 'YYYY-MM-DD') FROM dual;

-- MySQL
SELECT DATEDIFF('2026-12-31','2026-01-01');`,
    result: `364`
  },
  {
    no: 15,
    feature: "시간 더하기(1초)",
    oracle: "date + 1/(24*60*60)",
    mysql: "DATE_ADD(date, INTERVAL 1 SECOND)",
    example: `SELECT SYSDATE + 1/(24*60*60) FROM dual;
SELECT DATE_ADD(NOW(), INTERVAL 1 SECOND);`,
    result: `현재 시간 + 1초`
  },
  {
    no: 16,
    feature: "시간 차이",
    oracle: "(date1 - date2)*24*60*60",
    mysql: "TIMESTAMPDIFF(SECOND, date2, date1)",
    example: `-- Oracle
SELECT (TO_DATE('2026-01-02 00:00:00', 'YYYY-MM-DD HH24:MI:SS') - TO_DATE('2026-01-01 00:00:00', 'YYYY-MM-DD HH24:MI:SS')) * (24*60*60) FROM dual;

-- MySQL
SELECT TIMESTAMPDIFF(SECOND, '2026-01-01 00:00:00', '2026-01-02 00:00:00');`,
    result: `86400`
  },
  {
    no: 17,
    feature: "그 달의 마지막일자",
    oracle: "LAST_DAY(date)",
    mysql: "LAST_DAY(date)",
    example: `-- Oracle
SELECT LAST_DAY(SYSDATE) FROM dual;

-- MySQL
SELECT LAST_DAY(NOW());`,
    result: `ORACLE → 그 달의 마지막일자 + 현재시간, 
MySQL → 그 달의 마지막일자`
  },  
  {
    no: 18,
    feature: "날짜/시간 포맷",
    oracle: "YYYYMMDDHH24MISS",
    mysql: "%Y%m%d%H%i%s",
    example: `-- Oracle
SELECT TO_CHAR(SYSDATE,'YYYYMMDDHH24MISS') FROM DUAL;

-- MySQL
SELECT DATE_FORMAT(NOW(),'%Y%m%d%H%i%s');`,
    result: `Oracle은 날짜포맷 모델 사용, MySQL은 %기반 포맷 사용

의미      Oracle   MySQL
------------------------
연도      YYYY     %Y
월        MM       %m
일        DD       %d
시간(24)  HH24     %H
분        MI       %i
초        SS       %s
------------------------
  `
  },
  {
    no: 19,
    feature: "날짜 → 문자",
    oracle: "TO_CHAR(date,'YYYYMMDD')",
    mysql: "DATE_FORMAT(date,'%Y%m%d')",
    example: `-- Oracle
SELECT TO_CHAR(SYSDATE,'YYYYMMDD') AS STR_DATE
FROM DUAL;

-- MySQL
SELECT DATE_FORMAT(NOW(),'%Y%m%d') AS STR_DATE;`,
  result: "Oracle은 TO_CHAR, MySQL은 DATE_FORMAT 사용"
  },
  {
    no: 20,
    feature: "문자 → 날짜",
    oracle: "TO_DATE(str,'YYYYMMDD')",
    mysql: "STR_TO_DATE(str,'%Y%m%d')",
    example: `-- Oracle
SELECT TO_DATE('20260214','YYYYMMDD') AS DATE_VAL
FROM DUAL;

-- MySQL
SELECT STR_TO_DATE('20260214','%Y%m%d') AS DATE_VAL;`,
    result: "Oracle은 TO_DATE, MySQL은 STR_TO_DATE 사용"
  },
  {
    no: 21,
    feature: "숫자 → 문자",
    oracle: "TO_CHAR(number)",
    mysql: "CAST(number AS CHAR) / CONVERT(number, CHAR)",
    example: `-- Oracle
SELECT TO_CHAR(1234) AS STR_NUM
FROM DUAL;

-- MySQL
SELECT CAST(1234 AS CHAR) AS STR_NUM;

-- 또는
SELECT CONVERT(1234, CHAR) AS STR_NUM;`,
  result: "Oracle은 TO_CHAR, MySQL은 CAST 또는 CONVERT 사용"
  },
  {
    no: 22,
    feature: "ADD_MONTHS",
    oracle: "ADD_MONTHS(date,n)",
    mysql: "DATE_ADD(date, INTERVAL n MONTH)",
    example: `-- Oracle
SELECT ADD_MONTHS(SYSDATE, 3) AS NEXT_MONTH
FROM DUAL;

-- MySQL
SELECT DATE_ADD(NOW(), INTERVAL 3 MONTH) AS NEXT_MONTH;`,
  result: "Oracle은 ADD_MONTHS, MySQL은 DATE_ADD + INTERVAL 사용"
  },
  {
    no: 23,
    feature: "ROW 제한",
    oracle: "ROWNUM <= n",
    mysql: "LIMIT n",
    example: `SELECT * FROM emp WHERE ROWNUM <= 2;
SELECT * FROM emp LIMIT 2;`,
    result: `상위 2행 반환`
  },
  {
    no: 24,
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
    no: 25,
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
    no: 26,
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
    no: 27,
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
    no: 28,
    feature: "RANK 함수",
    oracle: "RANK() OVER()",
    mysql: "RANK() OVER() (8.0+)",
    example: `SELECT name,
RANK() OVER (ORDER BY salary DESC)
FROM emp;`,
    result: `급여 순위 계산`
  },
  {
    no: 29,
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
    no: 30,
    feature: "EXISTS",
    oracle: "EXISTS (subquery)",
    mysql: "EXISTS (subquery)",
    example: `SELECT * FROM emp e
WHERE EXISTS (
  SELECT 1 FROM dept d
  WHERE e.deptno = d.deptno
);`,
    result: `조건 만족 시 TRUE`
  },
  {
    no: 31,
    feature: "시퀀스 / 자동증가",
    oracle: "seq.NEXTVAL",
    mysql: "AUTO_INCREMENT",
    example: `-- ORACLE
CREATE SEQUENCE order_seq START WITH 1 INCREMENT BY 1;

INSERT INTO orders (order_id, order_date)
VALUES (order_seq.NEXTVAL, SYSDATE);

-- MYSQL
CREATE TABLE orders (
  order_id INT AUTO_INCREMENT PRIMARY KEY,
  order_date DATETIME
);

INSERT INTO orders (order_date)
VALUES (NOW());`,
    result: `Oracle은 시퀀스 객체 사용, MySQL은 AUTO_INCREMENT 컬럼 속성`
  },
  {
    no: 32,
    feature: "계층형 쿼리",
    oracle: "CONNECT BY PRIOR",
    mysql: "WITH RECURSIVE",
    example: `-- ORACLE
SELECT emp_id, mgr_id
FROM emp
START WITH mgr_id IS NULL
CONNECT BY PRIOR emp_id = mgr_id;

-- MYSQL
WITH RECURSIVE emp_tree AS (
  SELECT emp_id, mgr_id
  FROM emp
  WHERE mgr_id IS NULL
  UNION ALL
  SELECT e.emp_id, e.mgr_id
  FROM emp e
  JOIN emp_tree t
    ON t.emp_id = e.mgr_id
)
SELECT * FROM emp_tree;`,
    result: `Oracle 전용 계층 문법, MySQL은 재귀 CTE 사용`
  },
  {
    no: 33,
    feature: "NULL / ''(Empty String)",
    oracle: "'' = NULL",
    mysql: "'' ≠ NULL",
    example: `-- ORACLE
INSERT INTO test(col) VALUES('');
SELECT col, col IS NULL FROM test;

-- MYSQL
INSERT INTO test(col) VALUES('');
SELECT col, col IS NULL FROM test;`,
    result: `Oracle은 빈문자열이 NULL 처리, MySQL은 다름 (대형 이슈)`
  },
  {
    no: 34,
    feature: "DELETE alias",
    oracle: "DELETE FROM orders a",
    mysql: "DELETE FROM orders",
    example: `-- ORACLE
DELETE FROM orders a
WHERE a.status = 'REFUND';

-- MYSQL
DELETE FROM orders
WHERE status = 'REFUND';`,
    result: `단일 테이블 DELETE는 유사, alias 사용 차이`
  },
  {
    no: 35,
    feature: "JOIN DELETE",
    oracle: "DELETE + SUBQUERY",
    mysql: "DELETE JOIN",
    example: `-- ORACLE
DELETE FROM orders
WHERE order_id IN (
  SELECT o.order_id
  FROM orders o
  JOIN customers c
    ON o.customer_id = c.customer_id
  WHERE c.grade = 'VIP'
);

-- MYSQL
DELETE o
FROM orders o
JOIN customers c
  ON o.customer_id = c.customer_id
WHERE c.grade = 'VIP';`,
    result: `MySQL은 JOIN 직접 삭제 가능`
  },
  {
    no: 36,
    feature: "UPDATE JOIN",
    oracle: "UPDATE (SELECT ...)",
    mysql: "UPDATE JOIN",
    example: `-- ORACLE
UPDATE (
  SELECT A.customer_phone, B.phone
  FROM orders A
  JOIN customers B
    ON A.customer_id = B.customer_id
)
SET customer_phone = phone
WHERE status = 'REFUND';

-- MYSQL
UPDATE orders A
JOIN customers B
  ON A.customer_id = B.customer_id
SET A.customer_phone = B.phone
WHERE A.status = 'REFUND';`,
    result: `Oracle은 Inline View UPDATE, MySQL은 JOIN UPDATE 직접 지원`
  },
  {
    no: 37,
    feature: "이전 값 (LAG)",
    oracle: "LAG() OVER()",
    mysql: "LAG() OVER()",
    example: `SELECT
  order_id,
  order_date,
  order_amount,
  LAG(order_amount)
      OVER (ORDER BY order_date) AS prev_amount
FROM orders;`,
    result: `Oracle / MySQL 8.0 이상 동일 지원`
  },
  {
    no: 38,
    feature: "다음 값 (LEAD)",
    oracle: "LEAD() OVER()",
    mysql: "LEAD() OVER()",
    example: `SELECT
  order_id,
  order_date,
  order_amount,
  LEAD(order_amount)
      OVER (ORDER BY order_date) AS next_amount
FROM orders;`,
    result: `동일 (MySQL 8.0 이상)`
  },
  {
    no: 39,
    feature: "PARTITION 기준 LAG/LEAD",
    oracle: "PARTITION BY",
    mysql: "PARTITION BY",
    example: `SELECT
  customer_id,
  order_date,
  order_amount,
  LAG(order_amount)
      OVER (
        PARTITION BY customer_id
        ORDER BY order_date
      ) AS prev_amount
FROM orders;`,
    result: `그룹별 이전/다음 값 동일 지원`
  },
  {
    no: 40,
    feature: "NULL 정렬 차이",
    oracle: "NULLS FIRST",
    mysql: "ORDER BY col IS NULL",
    example: `-- ORACLE
SELECT *
FROM orders
ORDER BY order_amount;

-- MYSQL
SELECT *
FROM orders
ORDER BY order_amount IS NULL,
         order_amount DESC;`,
    result: `Oracle은 NULLS FIRST/LAST 지원, MySQL은 조건식으로 우회`
  },
  {
    no: 41,
    feature: "(+) LEFT OUTER JOIN",
    oracle: "WHERE col = col(+)",
    mysql: "LEFT JOIN ... ON",
    example: `-- ORACLE (구문 방식: (+))
SELECT c.customer_id, c.customer_name, o.order_id, o.order_amount
FROM customers c, orders o
WHERE c.customer_id = o.customer_id(+)
ORDER BY c.customer_id;

-- MYSQL
SELECT c.customer_id, c.customer_name, o.order_id, o.order_amount
FROM customers c
LEFT JOIN orders o
  ON c.customer_id = o.customer_id
ORDER BY c.customer_id;`,
    result: `Oracle은 (+) 연산자가 없는 쪽이 기준, MySQL은 ANSI LEFT JOIN 사용`
  },
  {
    no: 42,
    feature: "(+) RIGHT OUTER JOIN",
    oracle: "WHERE col(+) = col",
    mysql: "RIGHT JOIN ... ON",
    example: `-- ORACLE (구문 방식: (+))
SELECT c.customer_id, c.customer_name, o.order_id, o.order_amount
FROM orders o, customers c
WHERE o.customer_id(+) = c.customer_id
ORDER BY c.customer_id;

-- MYSQL
SELECT c.customer_id, c.customer_name, o.order_id, o.order_amount
FROM orders o
RIGHT JOIN customers c
  ON o.customer_id = c.customer_id
ORDER BY c.customer_id;`,
    result: `Oracle은 (+) 연산자가 없는 쪽이 기준, MySQL은 RIGHT JOIN 명시 사용`
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
