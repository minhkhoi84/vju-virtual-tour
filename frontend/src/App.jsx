import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TourPage from './pages/TourPage'; // Đảm bảo bạn đã tạo file này ở folder pages

function App() {
  return (
    <Router>
      <Routes>
        {/* Mặc định vào trang web là hiện Tour luôn */}
        <Route path="/" element={<TourPage />} />
        
        {/* Sau này bạn có thể thêm các trang khác ở đây */}
        {/* <Route path="/login" element={<LoginPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;