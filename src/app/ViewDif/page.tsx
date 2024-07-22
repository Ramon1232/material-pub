// pages/index.tsx
import React from 'react';
import CustomTable from './components/CustomTable';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';


const Home: React.FC = () => {
  return (
    <div >
        <Navbar/>
      <CustomTable />
      <Footer/>
    </div>
  );
};

export default Home;
