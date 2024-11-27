import React, { useState } from "react";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // API 호출 함수
  const fetchData = async () => {
    setLoading(true); // 로딩 시작
    setError(null); // 에러 초기화
    try {
      const response = await fetch("http://localhost:80/"); // API 엔드포인트
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const textData = await response.text(); // 응답을 텍스트로 읽어오기
      setData(textData); // 텍스트 데이터를 상태에 저장
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  return (
    <div>
      <h1>Data from API</h1>
      <button onClick={fetchData}>Fetch Data</button>{" "}
      {/* 버튼 클릭 시 fetchData 호출 */}
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      <div>
        {/* HTML 안전하게 출력 */}
        <div dangerouslySetInnerHTML={{ __html: data }} />
      </div>
    </div>
  );
}

export default App;
