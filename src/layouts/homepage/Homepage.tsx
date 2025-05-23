// File: HomePage.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Homepage.css';

const API_BASE = 'http://localhost:8080';

const HomePage = () => {
  const [classCount, setClassCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [cansuCount, setCansuCount] = useState(0);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      axios.get(`${API_BASE}/lop/count`),
      axios.get(`${API_BASE}/sinhvien/count`),
      axios.get(`${API_BASE}/cansu/count`),
      axios.get(`${API_BASE}/thongbao/latest?limit=3`)
    ])
      .then(([lopRes, svRes, csRes, tbRes]) => {
        setClassCount(lopRes.data.count || 0);
        setStudentCount(svRes.data.count || 0);
        setCansuCount(csRes.data.count || 0);
        setNotifications(Array.isArray(tbRes.data) ? tbRes.data.map(tb => tb.TieuDe) : []);
      })
      .catch(() => {
        setClassCount(0);
        setStudentCount(0);
        setCansuCount(0);
        setNotifications([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="homepage">
      <div className="homepage-carousel-container">
        {/* Bootstrap Carousel */}
        <div id="demo" className="carousel slide" data-bs-ride="carousel">
          {/* Indicators/dots */}
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#demo" data-bs-slide-to="0" className="active"></button>
            <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
            <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
          </div>
          {/* The slideshow/carousel */}
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="https://file1.hutech.edu.vn/file/slider/9694691736999828.jpg" alt="Los Angeles" className="d-block w-100" />
            </div>
            <div className="carousel-item">
              <img src="https://file1.hutech.edu.vn/file/slider/7968111696498843.jpg" alt="Chicago" className="d-block w-100" />
            </div>
            <div className="carousel-item">
              <img src="https://file1.hutech.edu.vn/file/slider/8742621741055887.jpg" alt="New York" className="d-block w-100" />
            </div>
          </div>
          {/* Left and right controls/icons */}
          <button className="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
            <span className="carousel-control-prev-icon"></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>
      </div>
      <div className="homepage-content">
        <h1>Chào mừng bạn đến với hệ thống quản lý cán sự lớp HUTECH</h1>
        <p>
          Quản lý cán sự, lớp học, sinh viên, thông báo và nhiều chức năng khác một cách dễ dàng, hiện đại và trực quan.
        </p>
        {/* Thêm các nội dung, shortcut, widget khác nếu muốn */}
      </div>
      <div className="homepage-container">
        <div className="welcome-text">
          Chào mừng bạn đến với hệ thống quản lý lớp học BCS!
        </div>
        <div className="grid-layout">
          <div className="card">
            <h4>Tổng số lớp</h4>
            <div className="count">{loading ? '...' : classCount}</div>
            <a href="/classes">Xem chi tiết</a>
          </div>
          <div className="card">
            <h4>Tổng số sinh viên</h4>
            <div className="count">{loading ? '...' : studentCount}</div>
            <a href="/students">Xem chi tiết</a>
          </div>
          <div className="card">
            <h4>Cán sự</h4>
            <div className="count">{loading ? '...' : cansuCount}</div>
            <a href="/cansu">Xem chi tiết</a>
          </div>
          <div className="card notify">
            <h4>Thông báo mới</h4>
            <ul>
              {loading
                ? <li>Đang tải...</li>
                : notifications.length === 0
                  ? <li>Không có thông báo mới</li>
                  : notifications.map((item, idx) => <li key={idx}>{item}</li>)
              }
            </ul>
            <a href="/notifications">Xem tất cả</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
