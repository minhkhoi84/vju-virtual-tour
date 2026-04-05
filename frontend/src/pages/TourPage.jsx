import React, { useState } from 'react';

const TourPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const locations = [
    { id: 1, name: 'Tổng quan', icon: '📍' },
    { id: 2, name: 'Công trường', icon: '🏢' },
    { id: 3, name: 'Con đường Trạng Nguyên', icon: '🛣️' },
    { id: 4, name: 'Quảng trường', icon: '⛪' },
    { id: 5, name: 'Vườn trường', icon: '🌳' },
    { id: 6, name: 'Khu phức hợp thể thao', icon: '⚽' },
    { id: 7, name: 'Trung tâm Thông tin – Thư viện', icon: '📚' },
    { id: 8, name: 'Khu Căng tin và Cà phê', icon: '☕' },
    { id: 9, name: 'Căng tin D6', icon: '🍽️' },
  ];

  return (
    <div style={styles.container}>
      {/* Iframe này sẽ gọi đến file index.html 
          mà bạn đã đặt trong public/tour360/ 
      */}
      <iframe
        title="VJU Virtual Tour"
        src="/tour360/index.html" 
        style={styles.iframe}
        allowFullScreen
        // Cho phép sử dụng cảm biến trên điện thoại để xoay tour
        allow="gyroscope; accelerometer; magnetometer; execution-while-out-of-viewport"
      ></iframe>

      {/* Toggle Button: show floating button only when sidebar is closed */}
      {!sidebarOpen && (
        <button
          style={styles.toggleButton}
          onClick={() => setSidebarOpen(true)}
          title="Mở menu"
        >
          <span style={styles.hamburger}>☰</span>
        </button>
      )}

      {/* Sidebar */}
      <div style={{...styles.sidebar, transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)'}}>
        <div style={styles.sidebarHeader}>
          <h2 style={styles.sidebarTitle}>VIỆT NHẬT UNIVERSITY</h2>
          {sidebarOpen && (
            <button
              style={styles.headerToggle}
              onClick={() => setSidebarOpen(false)}
              aria-label="Đóng menu"
            >
              ‹
            </button>
          )}
        </div>

        <div style={styles.menuSection}>
          <div style={styles.sectionTitle}>GIỚI THIỆU VỀ ĐẠI HỌC VIỆT NHẬT</div>
          <div style={styles.menuItem}>Tổng quan</div>
        </div>

        <div style={styles.menuSection}>
          <div style={styles.sectionTitle}>VIDEO 360 CHUYÊN THAM QUAN THỰC TẾ AO</div>
          <div style={styles.submenu}>
            {locations.map(location => (
              <div
                key={location.id}
                style={styles.menuItem}
                onClick={() => {
                  console.log('Chọn:', location.name);
                  // Bạn có thể thêm logic để đổi video ở đây
                  setSidebarOpen(false);
                }}
              >
                <span style={styles.menuIcon}>{location.icon}</span>
                <span>{location.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay khi sidebar mở */}
      {sidebarOpen && (
        <div
          style={styles.overlay}
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

// CSS inline để bạn không cần tạo thêm file .css vướng víu
const styles = {
  container: {
    width: '100vw',
    height: '100vh',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#000', // Nền đen để chờ tour load
  },
  iframe: {
    width: '100%',
    height: '100%',
    border: 'none',
  },
  
  // Toggle Button
  toggleButton: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    zIndex: 100,
    width: '50px',
    height: '50px',
    backgroundColor: '#FF6633',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
  },
  hamburger: {
    fontSize: '24px',
    color: 'white',
    fontWeight: 'bold',
  },

  // Sidebar
  sidebar: {
    position: 'fixed',
    left: 0,
    top: 0,
    height: '100vh',
    width: '368px',
    backgroundColor: '#2A3A6B',
    zIndex: 99,
    overflow: 'auto',
    transition: 'transform 0.3s ease',
    boxShadow: '2px 0 8px rgba(0,0,0,0.3)',
    color: 'white',
  },
  sidebarHeader: {
    padding: '20px',
    borderBottom: '2px solid #FF6633',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sidebarTitle: {
    margin: 0,
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#FF6633',
  },


  // Menu Sections
  menuSection: {
    padding: '0',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
  },
  sectionTitle: {
    padding: '16px 20px',
    backgroundColor: '#FF6633',
    fontSize: '12px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: 'white',
    letterSpacing: '0.5px',
  },
  submenu: {
    display: 'flex',
    flexDirection: 'column',
  },
  menuItem: {
    padding: '12px 24px',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '14px',
    transition: 'background-color 0.2s ease',
    color: '#E8E8E8',
  },
  menuItemHover: {
    backgroundColor: 'rgba(255, 102, 51, 0.2)',
  },
  menuIcon: {
    fontSize: '16px',
    minWidth: '20px',
  },

  // Overlay
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 98,
  },
  // Small toggle shown inside the sidebar header (when open)
  headerToggle: {
    backgroundColor: '#FF6633',
    border: 'none',
    color: 'white',
    width: '36px',
    height: '36px',
    borderRadius: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '18px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
  },
};

export default TourPage;