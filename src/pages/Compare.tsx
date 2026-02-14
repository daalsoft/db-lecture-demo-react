function Compare() {
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
}
export default Compare;
