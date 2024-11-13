import React from 'react';
import './App.css';
import NewsSection from './components/NewsSection';

function App() {
  return (
    <div className="App">
      <h1 className="text-4xl font-bold text-center mt-6 text-pink-700">HEADLINES OF AMRITSAR</h1>
      <NewsSection />
    </div>
  );
}

export default App;