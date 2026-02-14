import React, { useState } from "react";
import "../App.css";

interface CompareRow {
  no: number;
  feature: string;
  oracle: string;
  mysql: string;
  note?: string;
  example: string;
}

const data: CompareRow[] = [
  { no: 1, feature: "문자열 연결", oracle: "||", mysql: "CONCAT(a,b)", note: "Oracle: ||, MSSQL: +",
    example: `
              -- Oracle
              SELECT first_name || ' ' || last_name FROM users;

              -- MySQL
              SELECT CONCAT(first_name,' ',last_name) FROM users;`      
   },
  { no: 2, feature: "문자열 길이", oracle: "LENGTH(str)", mysql: "CHAR_LENGTH(str)", 
    example: `
              -- Oracle
              SELECT * FROM emp WHERE ROWNUM <= 10;

              -- MySQL
              SELECT * FROM emp LIMIT 10;`
   },
  { no: 3, feature: "NULL 처리", oracle: "NVL(expr,def)", mysql: "IFNULL(expr,def)",example: `` },
  { no: 4, feature: "NULLIF", oracle: "NULLIF(a,b)", mysql: "NULLIF(a,b)",example: `` },
  { no: 5, feature: "조건문", oracle: "CASE WHEN ... END", mysql: "CASE WHEN ... END",example: `` },
  { no: 6, feature: "현재 날짜", oracle: "SYSDATE", mysql: "NOW()",example: `` },
  { no: 7, feature: "날짜 더하기", oracle: "DATE + 1", mysql: "DATE_ADD(date, INTERVAL 1 DAY)",example: `` },
  { no: 8, feature: "날짜 차이(일)", oracle: "TRUNC(d1 - d2)", mysql: "DATEDIFF(d1,d2)",example: `` },
  { no: 9, feature: "ROW 제한", oracle: "ROWNUM <= n", mysql: "LIMIT n",example: `` },
  { no: 10, feature: "문자열 집계", oracle: "LISTAGG(col, ',')", mysql: "GROUP_CONCAT(col)",example: `` },
  { no: 11, feature: "UPSERT", oracle: "MERGE INTO", mysql: "INSERT ... ON DUPLICATE KEY UPDATE",example: `` },
  { no: 12, feature: "페이징", oracle: "ROWNUM / OFFSET FETCH", mysql: "LIMIT offset,size",example: `` },
  { no: 13, feature: "LEFT JOIN", oracle: "(+)", mysql: "LEFT JOIN",example: `` },
  { no: 14, feature: "RANK()", oracle: "RANK() OVER()", mysql: "RANK() OVER()",example: `` }
];
const Compare: React.FC = () => {
  const [openRow, setOpenRow] = useState<number | null>(null);

  const toggleRow = (no: number) => {
    setOpenRow(openRow === no ? null : no);
  };

  return (
    <div className="card">
      <h2>⚙ Oracle ↔ MySQL SQL 비교 (클릭하면 예제 보기)</h2>

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
                      <pre>{row.example}</pre>
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