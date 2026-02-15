import React, { useState } from "react";
import "../App.css";

interface WordRow {
  no: number;
  name: string;
  location : string;
  resultCount: string;
  description : string;
  example: string;
  result: string;
}

const data: WordRow[] = [
{
  no: 1,
  name: "서브쿼리",
  location: `WHERE / HAVING`,
  resultCount: `1행 or 다중행`,
  description: `조건 필터`,
  example: `-- Oracle
SELECT ename, sal
FROM emp
WHERE deptno = (
  SELECT deptno
  FROM dept
  WHERE dname = 'SALES'
);
`,
  result: `-- 결과
ENAME   SAL
----------------
ALLEN   1600
WARD    1250
MARTIN  1250
`
},
{
  no: 2,
  name: "인라인 뷰",
  location: `FROM`,
  resultCount: `다중행`,
  description: `임시 테이블`,
  example: `-- Oracle
SELECT e.ename, v.avg_sal
FROM emp e
JOIN (
  SELECT deptno, AVG(sal) avg_sal
  FROM emp
  GROUP BY deptno
) v
ON e.deptno = v.deptno;
`,
  result: `-- 결과
ENAME    AVG_SAL
----------------------
SMITH    2916.66
ALLEN    1566.66
WARD     1566.66
`
},
{
  no: 3,
  name: "스칼라 서브쿼리",
  location: `SELECT`,
  resultCount: `1행 1컬럼만 가능`,
  description: `컬럼처럼`,
  example: `-- Oracle
SELECT ename,
       sal,
       (SELECT AVG(sal) FROM emp) AS avg_sal
FROM emp
WHERE deptno = 10;
`,
  result: `-- 결과
ENAME   SAL   AVG_SAL
----------------------------
CLARK   2450  2073
KING    5000  2073
MILLER  1300  2073
`
}
];


const Word: React.FC = () => {
  const [openRow, setOpenRow] = useState<number | null>(null);

  const toggleRow = (no: number) => {
    setOpenRow(openRow === no ? null : no);
  };

  return (
    <div className="card">
      <h2>⚙ 용어 (예제 + 결과)</h2>

      <div style={{ overflowX: "auto", marginTop: "20px" }}>
        <table className="word-table">
          <thead>
            <tr>
              <th>No</th>
              <th>이름</th>
              <th>위치</th>
              <th>결과 건수</th>
              <th>특징</th>
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
                  <td>{row.name}</td>
                  <td>{row.location}</td>
                  <td>
                    <pre style={{ margin: 0 }}>
                      {row.resultCount}
                    </pre>
                  </td>                  
                  <td>
                    <pre style={{ margin: 0 }}>
                      {row.description}
                    </pre>
                  </td>                  
                </tr>
                {openRow === row.no && (
                  <tr className="accordion-row">
                    <td colSpan={5}>
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

export default Word;
