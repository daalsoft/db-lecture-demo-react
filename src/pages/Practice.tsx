export default function Practice() {
  return (
    <div className="card">
      <h2>💻 실습 SQL</h2>
      <pre>
{`SELECT *
FROM orders o
JOIN customers c
  ON o.customer_id = c.customer_id
WHERE o.order_date >= '2026-01-01';`}
      </pre>
    </div>
  );
}
