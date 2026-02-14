export default function Docker() {
  return (
    <div className="card">
      <h2>📂 Docker 실습 환경</h2>
      <pre>
{`docker run -d -p 3306:3306 \\
-e MYSQL_ROOT_PASSWORD=1234 \\
mysql:8.0`}
      </pre>
    </div>
  );
}
