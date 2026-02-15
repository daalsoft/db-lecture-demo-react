import React, { useState } from "react";
import "../App.css";

interface TuningRow {
  no: number;
  feature: string;
  oracle: string;
  mysql: string;
  example: string;
  result: string;
}

const data: TuningRow[] = [
{
  no: 1,
  feature: "실행계획",
  oracle: `EXPLAIN PLAN
DBMS_XPLAN.DISPLAY_CURSOR`,
  mysql: `EXPLAIN
EXPLAIN ANALYZE`,
  example: `-- Oracle
EXPLAIN PLAN FOR
SELECT * FROM emp WHERE emp_id = 1;

SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);

-- MySQL
EXPLAIN ANALYZE
SELECT * FROM emp WHERE emp_id = 1;
`,
  result: `-- Oracle 실행계획 결과
Plan hash value: 3956160932
 
--------------------------------------------------------------------------
| Id  | Operation         | Name | Rows  | Bytes | Cost (%CPU)| Time     |
--------------------------------------------------------------------------
|   0 | SELECT STATEMENT  |      |     1 |   105 |     3   (0)| 00:00:01 |
|*  1 |  TABLE ACCESS FULL| EMP  |     1 |   105 |     3   (0)| 00:00:01 |
--------------------------------------------------------------------------
 
Predicate Information (identified by operation id):
---------------------------------------------------
 
   1 - filter("EMP_ID"=1)
 
Note
-----
   - dynamic statistics used: dynamic sampling (level=2)


-- MySQL 실행계획 결과
-> Rows fetched before execution  (cost=0..0 rows=1) (actual time=300e-6..300e-6 rows=1 loops=1)


`
},
{
  no: 2,
  feature: "IO 확인",
  oracle: `AUTOTRACE
V$SQLSTAT`,
  mysql: `EXPLAIN ANALYZE`,
  example: `-- Oracle
SET AUTOTRACE ON STATISTICS
SELECT * FROM emp WHERE deptno = 10;

-- 또는
SELECT sql_id, buffer_gets, disk_reads
FROM v$sqlstat
WHERE sql_text LIKE '%emp%';

-- MySQL
EXPLAIN ANALYZE
SELECT * FROM emp WHERE deptno = 10;
`,
  result: `-- Oracle 결과 예시
consistent gets : 125
physical reads  : 3

-- v$sqlstat
BUFFER_GETS : 125
DISK_READS  : 3

-- MySQL 결과 예시
-> Filter: (deptno = 10)
   rows=3 loops=1
   actual time=0.30ms
`
},
{
  no: 3,
  feature: "시간 확인",
  oracle: `AUTOTRACE
V$SQL`,
  mysql: `EXPLAIN ANALYZE`,
  example: `-- Oracle
SET TIMING ON
SELECT * FROM emp;

-- 또는
SELECT elapsed_time/1000000 sec
FROM v$sql
WHERE sql_text LIKE '%emp%';

-- MySQL
EXPLAIN ANALYZE
SELECT * FROM emp;
`,
  result: `-- Oracle
Elapsed: 00:00:00.02
ELAPSED_TIME: 0.021 sec

-- MySQL
actual time=0.015..0.020 ms
`
},
{
  no: 4,
  feature: "쿼리 이력",
  oracle: `AWR
ASH`,
  mysql: `Slow Query Log
Performance Schema`,
  example: `-- Oracle AWR
SELECT * FROM dba_hist_sqlstat
WHERE sql_id = 'abcd1234';

-- Oracle ASH
SELECT * FROM v$active_session_history;

-- MySQL Slow Query 활성화
SET GLOBAL slow_query_log = 'ON';

-- MySQL 조회
SELECT * 
FROM performance_schema.events_statements_history;
`,
  result: `-- Oracle
과거 특정 시점 SQL 실행 이력 조회 가능

-- MySQL
실행시간 초과 쿼리 slow.log 기록
`
},
{
  no: 5,
  feature: "병목",
  oracle: `V$SESSION_WAIT
ASH`,
  mysql: `waits / locks / IO`,
  example: `-- Oracle
SELECT event, wait_time
FROM v$session_wait
WHERE wait_class <> 'Idle';

-- MySQL
SHOW ENGINE INNODB STATUS;
`,
  result: `-- Oracle
db file sequential read
enq: TX - row lock contention

-- MySQL
LATEST DETECTED DEADLOCK
lock wait timeout
`
},
{
  no: 6,
  feature: "인덱스 정보",
  oracle: `USER_INDEXES
USER_IND_COLUMNS`,
  mysql: `SHOW INDEX`,
  example: `-- Oracle
SELECT index_name, table_name
FROM user_indexes
WHERE table_name = 'EMP';

-- MySQL
SHOW INDEX FROM emp;
`,
  result: `-- Oracle
PK_EMP  EMP  UNIQUE

-- MySQL
PRIMARY  BTREE  UNIQUE
`
},
{
  no: 7,
  feature: "인덱스 특징",
  oracle: `히스토그램`,
  mysql: `복합 인덱스 순서`,
  example: `-- Oracle 히스토그램 확인
SELECT column_name, histogram
FROM user_tab_col_statistics
WHERE table_name='EMP';

-- MySQL 복합 인덱스
CREATE INDEX idx_emp_dept_job
ON emp(deptno, job);
`,
  result: `-- Oracle
HEIGHT BALANCED / FREQUENCY

-- MySQL
왼쪽 컬럼(deptno) 기준으로만 단독 사용 가능
`
},
{
  no: 8,
  feature: "통계 갱신 명령",
  oracle: `DBMS_STATS.GATHER_TABLE_STATS`,
  mysql: `ANALYZE TABLE`,
  example: `-- Oracle
BEGIN
  DBMS_STATS.GATHER_TABLE_STATS('SCOTT','EMP');
END;
/

-- MySQL
ANALYZE TABLE emp;
`,
  result: `-- Oracle
통계 갱신 완료
옵티마이저 재계산

-- MySQL
Table analyzed
`
}
];

const Tuning: React.FC = () => {
  const [openRow, setOpenRow] = useState<number | null>(null);

  const toggleRow = (no: number) => {
    setOpenRow(openRow === no ? null : no);
  };

  return (
    <div className="card">
      <h2>⚙ 성능 튜닝 방법 (예제 + 결과)</h2>

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
                  <td>
                    <pre style={{ margin: 0 }}>
                      {row.oracle}
                    </pre>
                  </td>                  
                  <td>
                    <pre style={{ margin: 0 }}>
                      {row.mysql}
                    </pre>
                  </td>                  
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

export default Tuning;
