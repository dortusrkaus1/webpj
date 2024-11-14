import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Layout from '../../layout/MainLayout';
import './AreaAdd.css'; // CSS 파일 import

const AreaAdd = () => {
    const [areaName, setAreaName] = useState("");
    const [user_no, setUserNo] = useState(null);
    const [error, setError] = useState(null);
    const [spaces, setSpaces] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const storedUserNo = localStorage.getItem('user_no');
        if (storedUserNo) {
            setUserNo(Number(storedUserNo)); // 문자열을 숫자로 변환
        }
    }, []);

    const fetchSpaces = useCallback(async () => {
        if (user_no === null) {
            return;
        }

        setLoading(true);
        try {
            const accessToken = localStorage.getItem('access_token');
            const response = await axios.get(
                `https://port-0-teamproject-2024-2-am952nlt496sho.sel5.cloudtype.app/storages/${user_no}/spaces`,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                }
            );
            console.log('공간 목록 응답 데이터:', response.data);
            setSpaces(response.data);
        } catch (error) {
            console.error("공간 조회 중 오류 발생:", error);
            setError("공간 목록을 불러오는 데 실패했습니다. 다시 시도해주세요.");
        } finally {
            setLoading(false);
        }
    }, [user_no]);

    useEffect(() => {
        if (user_no !== null) {
            fetchSpaces();
        }
    }, [user_no, fetchSpaces]);

    const handleAreaNameChange = (e) => {
        setAreaName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        if (user_no === null) {
            setError("유효한 사용자 번호가 없습니다.");
            return;
        }
        if (!areaName) {
            setError("공간 이름을 입력해주세요.");
            return;
        }
    
        const accessToken = localStorage.getItem('access_token');
    
        try {
            const response = await axios.post(
                `https://port-0-teamproject-2024-2-am952nlt496sho.sel5.cloudtype.app/storages/${user_no}/spaces`,
                {
                    area_name: areaName,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                }
            );
    
            console.log('응답 데이터:', response.data);
    
            if (response.status === 200) {
                alert("공간이 성공적으로 추가되었습니다!");
                setAreaName("");
                setError(null);
                await fetchSpaces(); // 공간 추가 후 목록 갱신
            } else {
                throw new Error('공간 추가에 실패했습니다.');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                console.error("공간 추가 중 오류 발생:", JSON.stringify(error.response.data, null, 2));
                setError(`공간 추가에 실패했습니다: ${error.response.data.message || "알 수 없는 오류"}`);
            } else {
                console.error("공간 추가 중 오류 발생:", error.message);
                setError("서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
            }
        }
    };

    const handleEditSpace = async (area_no) => {
        const updatedName = prompt("새로운 공간 이름을 입력하세요:");
        if (updatedName) {
            try {
                const accessToken = localStorage.getItem('access_token');
                await axios.put(
                    `https://port-0-teamproject-2024-2-am952nlt496sho.sel5.cloudtype.app/storages/${user_no}/spaces/${area_no}`,
                    { area_name: updatedName },
                    {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`
                        }
                    }
                );
                setSpaces(spaces.map(space => space.area_no === area_no ? { ...space, area_name: updatedName } : space));
            } catch (error) {
                console.error("공간 수정 중 오류 발생:", error);
                setError("공간 수정에 실패했습니다. 다시 시도해주세요.");
            }
        }
    };

    const handleDeleteSpace = async (area_no) => {
        if (window.confirm("정말로 이 공간을 삭제하시겠습니까?")) {
            try {
                const accessToken = localStorage.getItem('access_token');
                await axios.delete(
                    `https://port-0-teamproject-2024-2-am952nlt496sho.sel5.cloudtype.app/storages/${user_no}/spaces/${area_no}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`
                        }
                    }
                );
                setSpaces(spaces.filter(space => space.area_no !== area_no));
            } catch (error) {
                console.error("공간 삭제 중 오류 발생:", error);
                setError("공간 삭제에 실패했습니다. 다시 시도해주세요.");
            }
        }
    };

    return (
        <Layout>
            <div className="area_input__container-wrapper">
                <div className="area_input__container" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div className="area_shadow__input"></div>
                    <input
                        type="text"
                        name="areaname"
                        className="area_input__search"
                        placeholder="ex) 우리집"
                        value={areaName}
                        onChange={handleAreaNameChange}
                        required
                        style={{ flex: 1 }}
                    />
                    <button className="area_input__button__shadow" onClick={handleSubmit} type="button" disabled={user_no === null}>
                        저장
                    </button>
                </div>
                {error && <p className="area_error-text">{error}</p>}
            </div>
            <div className="area_spaces-list">
                <h2>공간 목록</h2>
                {loading ? (
                    <p>로딩 중...</p>
                ) : Array.isArray(spaces) && spaces.length > 0 ? (
                    <ul>
                        {spaces.map((space, index) => (
                            <li key={space.area_no ? space.area_no : index} className="area_space-item">
                                <span className="area_space-name">{space.area_name}</span>
                                <div className="area_buttons-container">
                                    <button className="area_editBtn" onClick={() => handleEditSpace(space.area_no)}>
                                        <svg height="1em" viewBox="0 0 512 512">
                                            <path
                                              d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
                                            ></path>
                                        </svg>
                                    </button>
                                    <button className="area_button deleteBtn" onClick={() => handleDeleteSpace(space.area_no)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 69 14" className="svgIcon bin-top">
                                            <g clipPath="url(#clip0_35_24)">
                                                <path
                                                    fill="black"
                                                    d="M20.8232 2.62734L19.9948 4.21304C19.8224 4.54309 19.4808 4.75 19.1085 4.75H4.92857C2.20246 4.75 0 6.87266 0 9.5C0 12.1273 2.20246 14.25 4.92857 14.25H64.0714C66.7975 14.25 69 12.1273 69 9.5C69 6.87266 66.7975 4.75 64.0714 4.75H49.8915C49.5192 4.75 49.1776 4.54309 49.0052 4.21305L48.1768 2.62734C47.3451 1.00938 45.6355 0 43.7719 0H25.2281C23.3645 0 21.6549 1.00938 20.8232 2.62734Z"
                                                ></path>
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_35_24">
                                                    <rect fill="white" height="14" width="69"></rect>
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 69 57" className="svgIcon bin-bottom">
                                            <g clipPath="url(#clip0_35_22)">
                                                <path
                                                    fill="black"
                                                    d="M20.8232 -16.3727L19.9948 -14.787C19.8224 -14.4569 19.4808 -14.25 19.1085 -14.25H4.92857C2.20246 -14.25 0 -12.1273 0 -9.5C0 -6.8727 2.20246 -4.75 4.92857 -4.75H64.0714C66.7975 -4.75 69 -6.8727 69 -9.5C69 -12.1273 66.7975 -14.25 64.0714 -14.25H49.8915C49.5192 -14.25 49.1776 -14.4569 49.0052 -14.787L48.1768 -16.3727C47.3451 -17.9906 45.6355 -19 43.7719 -19H25.2281C23.3645 -19 21.6549 -17.9906 20.8232 -16.3727ZM64.0023 1.0648C64.0397 0.4882 63.5822 0 63.0044 0H5.99556C5.4178 0 4.96025 0.4882 4.99766 1.0648L8.19375 50.3203C8.44018 54.0758 11.6746 57 15.5712 57H53.4288C57.3254 57 60.5598 54.0758 60.8062 50.3203L64.0023 1.0648Z"
                                                ></path>
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_35_22">
                                                    <rect fill="white" height="57" width="69"></rect>
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>등록된 공간이 없습니다.</p>
                )}
            </div>
        </Layout>
    );
};

export default AreaAdd;
