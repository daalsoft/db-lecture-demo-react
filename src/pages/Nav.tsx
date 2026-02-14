type Props = {
  setCurrent: (value: string) => void;
};

function Nav({ setCurrent }: Props) {
  return (
    <nav>
      <button onClick={() => setCurrent("home")}>Home</button>
      <button onClick={() => setCurrent("basic")}>DB 기본 개념</button>
      <button onClick={() => setCurrent("compare")}>DB별 비교</button>
      <button onClick={() => setCurrent("tuning")}>성능 튜닝</button>
      <button onClick={() => setCurrent("plan")}>실행계획</button>
      <button onClick={() => setCurrent("practice")}>실습 SQL</button>
      <button onClick={() => setCurrent("docker")}>Docker 환경</button>
    </nav>
  );
}

export default Nav;
