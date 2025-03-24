import React, { useState } from 'react';
import './App.css';
import { Camera } from '@capacitor/camera';
import Camera_Function from './Camera_Function';

function App() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState('');
  const [notification, setNotification] = useState(null);
  const [activeTab, setActiveTab] = useState('bmi'); // 'bmi' or 'camera'

  const calculateBMI = () => {
    const heightInMeters = parseInt(height) / 100;
    const weightInKg = parseInt(weight);
    
    // Kiểm tra giới hạn hợp lý cho chiều cao (50cm - 250cm)
    if (isNaN(heightInMeters) || heightInMeters < 0.2 || heightInMeters > 2.6) {
      setNotification('Vui lòng nhập chiều cao hợp lệ (20cm - 260cm)!');
      return;
    }
    
    // Kiểm tra giới hạn hợp lý cho cân nặng (10kg - 300kg)
    if (isNaN(weightInKg) || weightInKg < 1 || weightInKg > 700) {
      setNotification('Vui lòng nhập cân nặng hợp lệ (1kg - 700kg)!');
      return;
    }
    
    const bmiValue = weightInKg / (heightInMeters * heightInMeters);
    setBmi(bmiValue.toFixed(2));
    
    // Xác định danh mục BMI
    let category = '';
    if (bmiValue < 18.5) {
      category = 'Gầy';
    } else if (bmiValue < 25) {
      category = 'Bình thường';
    } else if (bmiValue < 30) {
      category = 'Thừa cân';
    } else {
      category = 'Béo phì';
    }
    
    setBmiCategory(category);
    
    // Hiển thị thông báo
    setNotification(`Chỉ số BMI của bạn: ${bmiValue.toFixed(2)} - ${category}`);
    setTimeout(() => {
      setNotification(null);
    }, 5000); // Ẩn thông báo sau 5 giây
  };

  const shareResult = async () => {
    if (bmi === null) {
      alert('Vui lòng tính BMI trước khi chia sẻ!');
      return;
    }

    const shareData = {
      title: 'Kết quả tính BMI',
      text: `Chỉ số BMI của tôi là ${bmi} - ${bmiCategory}`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        alert('Trình duyệt của bạn không hỗ trợ tính năng chia sẻ.');
      }
    } catch (error) {
      console.error('Lỗi khi chia sẻ:', error);
    }
  };

  return (
    <div className="app-container">
      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}
      
      <header className="app-header">
        <h1>Tính BMI</h1>
        <div className="tab-navigation">
          <button 
            className={`tab-button ${activeTab === 'bmi' ? 'active' : ''}`}
            onClick={() => setActiveTab('bmi')}
          >
            <i className="fas fa-calculator"></i> Tính BMI
          </button>
          <button 
            className={`tab-button ${activeTab === 'camera' ? 'active' : ''}`}
            onClick={() => setActiveTab('camera')}
          >
            <i className="fas fa-camera"></i> Camera
          </button>
        </div>
      </header>
      
      <main className="app-content">
        {activeTab === 'bmi' ? (
          <div className="bmi-calculator-container">
            <h2>Tính chỉ số BMI</h2>
            <div className="input-group">
              <label htmlFor="height">Chiều cao (cm):</label>
              <input 
                id="height"
                type="number" 
                placeholder="Nhập chiều cao của bạn"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
            
            <div className="input-group" style={{ marginTop: '20px' }}>
              <label htmlFor="weight">Cân nặng (kg):</label>
              <input 
                id="weight"
                type="number" 
                placeholder="Nhập cân nặng của bạn"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            
            <button className="calculate-button" onClick={calculateBMI}>
              Tính BMI
            </button>
            
            {bmi !== null && (
              <div className="result-card">
                <div className="result-header">Kết quả</div>
                <div className="result-content">
                  <p>Chỉ số BMI của bạn: <span className="bmi-value">{bmi}</span></p>
                  <p>Đánh giá: <span className={`bmi-category ${bmiCategory.toLowerCase()}`}>{bmiCategory}</span></p>
                </div>
                <button className="share-button" onClick={shareResult}>
                  <i className="fas fa-share-alt"></i> Chia sẻ kết quả
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="camera-container">
            <h2>Chức năng Camera</h2>
            <Camera_Function />
          </div>
        )}
      </main>
      
      <footer className="app-footer">
        <p>© 2025 Ganadr</p>
      </footer>
    </div>
  );
}

export default App;