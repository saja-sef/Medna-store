import React from 'react';
import Navbar from '../components/common/Navbar';
import HeroSection from '../components/home/HeroSection';
import FeaturesBar from '../components/home/FeaturesBar';

const HomePage = () => {
  return (
    <div className="w-full min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <FeaturesBar />
    </div>
  );
};

export default HomePage;