import React, { useState, useEffect } from 'react';
import './Home.css';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import SidebarComponent from '../../components/SidebarComponent/SidebarComponent';
import axios from 'axios';

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [spaces, setSpaces] = useState([]);
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [storages, setStorages] = useState([]); // 수납장 목록 추가
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null); // 선택된 수납장 상태 추가
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [roomDropdownOpen, setRoomDropdownOpen] = useState(false);
  const [storageDropdownOpen, setStorageDropdownOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleDropdownClick = () => {
    setDropdownOpen(!dropdownOpen);
    setRoomDropdownOpen(false);
    setStorageDropdownOpen(false);
  };

  const handleRoomDropdownClick = () => {
    setRoomDropdownOpen(!roomDropdownOpen);
    setDropdownOpen(false);
    setStorageDropdownOpen(false);
  };

  const handleStorageDropdownClick = () => {
    setStorageDropdownOpen(!storageDropdownOpen);
    setDropdownOpen(false);
    setRoomDropdownOpen(false);
  };

  const handleSpaceSelect = async (space) => {
    setSelectedSpace(space);
    setDropdownOpen(false);
    localStorage.setItem('selected_area_no', space.area_no);

    // 공간 변경 시 방과 수납장 상태 초기화
    setSelectedRoom(null);
    setSelectedStorage(null);
    setRooms([]);
    setStorages([]);

    // 선택한 공간에 대한 area_no를 콘솔에 출력
    console.log(`Selected area_no: ${space.area_no}`);

    // 선택한 공간에 대한 방 목록 조회
    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await axios.get(
        `https://port-0-teamproject-2024-2-am952nlt496sho.sel5.cloudtype.app/storages/room/${space.area_no}/rooms`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );
      setRooms(response.data);
    } catch (error) {
      console.error("방 조회 실패: ", error);
      setRooms([]);
    }
  };

  const handleRoomSelect = async (room) => {
    setSelectedRoom(room);
    setRoomDropdownOpen(false);
    localStorage.setItem('selected_room_no', room.room_no);

    // 방 변경 시 수납장 상태 초기화
    setSelectedStorage(null);
    setStorages([]);

    // 선택한 방에 대한 room_no를 콘솔에 출력
    console.log(`Selected room_no: ${room.room_no}`);

    // 선택한 방에 대한 수납장 목록 조회
    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await axios.get(
        `https://port-0-teamproject-2024-2-am952nlt496sho.sel5.cloudtype.app/storages/storage/${room.room_no}/storages`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );
      setStorages(response.data);
    } catch (error) {
      console.error("수납장 조회 실패: ", error);
      setStorages([]);
    }
  };

  const handleStorageSelect = (storage) => {
    setSelectedStorage(storage);
    setStorageDropdownOpen(false);
    localStorage.setItem('selected_storage_no', storage.storage_no);

    // 선택한 수납장에 대한 storage_no를 콘솔에 출력
    console.log(`Selected storage_no: ${storage.storage_no}`);
  };

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const user_no = localStorage.getItem('user_no');
        if (!user_no) {
          console.error("사용자 ID가 설정되지 않았습니다.");
          return;
        }

        const accessToken = localStorage.getItem('access_token');
        const response = await axios.get(
          `https://port-0-teamproject-2024-2-am952nlt496sho.sel5.cloudtype.app/storages/${user_no}/spaces`,
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          }
        );
        setSpaces(response.data);
      } catch (error) {
        console.error("공간 조회 실패: ", error);
      }
    };

    fetchSpaces();
  }, []);

  return (
    <div className={`home-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <SidebarComponent isOpen={isSidebarOpen} onToggle={toggleSidebar} />
      <div className="home-content">
        <HeaderComponent isOpen={isSidebarOpen} />
        <div className="dropdown-buttons">
          <div className="dropdown">
            <button className="dropdown-button" onClick={handleDropdownClick}>
              {selectedSpace ? selectedSpace.area_name : '공간 선택'}
            </button>
            {dropdownOpen && (
              <ul className="dropdown-list">
                {spaces.length > 0 ? (
                  spaces.map((space, index) => (
                    <li key={index} className="dropdown-item" onClick={() => handleSpaceSelect(space)}>
                      {space.area_name}
                    </li>
                  ))
                ) : (
                  <li className="dropdown-item">공간이 없습니다</li>
                )}
              </ul>
            )}
          </div>

          <div className="dropdown">
            <button className="dropdown-button" onClick={handleRoomDropdownClick}>
              {selectedRoom ? selectedRoom.room_name : '방 선택'}
            </button>
            {roomDropdownOpen && (
              <ul className="dropdown-list">
                {rooms.length > 0 ? (
                  rooms.map((room, index) => (
                    <li key={index} className="dropdown-item" onClick={() => handleRoomSelect(room)}>
                      {room.room_name}
                    </li>
                  ))
                ) : (
                  <li className="dropdown-item">방이 없습니다</li>
                )}
              </ul>
            )}
          </div>

          <div className="dropdown">
            <button className="dropdown-button" onClick={handleStorageDropdownClick}>
              {selectedStorage ? selectedStorage.storage_name : '수납장 선택'}
            </button>
            {storageDropdownOpen && (
              <ul className="dropdown-list">
                {storages.length > 0 ? (
                  storages.map((storage, index) => (
                    <li key={index} className="dropdown-item" onClick={() => handleStorageSelect(storage)}>
                      {storage.storage_name}
                    </li>
                  ))
                ) : (
                  <li className="dropdown-item">수납장이 없습니다</li>
                )}
              </ul>
            )}
          </div>
        </div>

        <div className="home-main">
          <div className="container"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
