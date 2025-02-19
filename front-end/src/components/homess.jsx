import React from 'react';


function Dashboard() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to Our Website</h1>
        <p>Your journey to explore starts here.</p>
        <button className="explore-button">Explore Now</button>
      </header>

      <section className="features-section">
        <h2>Our Features</h2>
        <div className="features-grid">
          <div className="feature-item">
            <h3>Fast Performance</h3>
            <p>Our platform is optimized for speed and reliability.</p>
          </div>
          <div className="feature-item">
            <h3>Secure and Private</h3>
            <p>We value your privacy and security above all else.</p>
          </div>
          <div className="feature-item">
            <h3>Easy to Use</h3>
            <p>Our intuitive interface makes navigation a breeze.</p>
          </div>
        </div>
      </section>

      <footer className="home-footer">
        <p>&copy; 2025 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Dashboard;