import "./VerifyCode.css";
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [email, setEmail] = useState("");
  const [verification_code, setVerification_code] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const verifyData = {
    email,
    verification_code,
  };

  async function checkVerify() {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(
        "https://port-0-teamproject-2024-2-am952nlt496sho.sel5.cloudtype.app/users/verify-code",
        verifyData, // URLSearchParams로 변환하여 전송
        {
          headers: {
            "Content-Type": "application/json", // 요청 헤더 설정
          },
        }
      );

      if (response.status === 200) {
        alert("인증 성공!");
        setIsDisabled(false);
        console.log(verification_code);
      } else {
        alert("인증 실패");
      }
    } catch (error) {
      console.error("코드 인증 중 오류 발생:", error);
      alert("에러가 발생하여 인증에 실패했습니다.");
    }
  }

  return (
    <div className="App">
      <div className="certification">
        <div className="cert">
          <h1 style={{ paddingTop: "50px" }}>이메일 인증</h1>
          <div className="emailInput">
            <label>
              <p>이메일</p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // 이메일 입력 추가
                style={{ borderRadius: "5px", border: "1px solid " }}
              />
            </label>
            {/* <button
              style={{ padding: "5px 10px", marginTop: "52px" }}
              onClick={() => console.log("인증번호 전송")}
              disabled
            >
              인증번호 전송
            </button> */}
          </div>
          <div className="input-group">
            <label>
              <p
                style={{
                  marginBottom: "8px",
                }}
              >
                인증번호 입력
              </p>
              <input
                type="text"
                value={verification_code}
                onChange={(e) => setVerification_code(e.target.value)}
                style={{ borderRadius: "5px", border: "1px solid black" }}
              />
            </label>
            <button
              style={{ padding: "5px 10px", marginTop: "52px" }}
              onClick={checkVerify}
            >
              인증번호 확인
            </button>
          </div>
        </div>
        <button
          style={{ padding: "5px 10px", marginTop: "30px" }}
          disabled={isDisabled}
          onClick={() => {
            console.log("인증완료 버튼 클릭됨");
          }}
        >
          인증 완료
        </button>
      </div>
    </div>
  );
}

export default App;
