import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import LoginForm from '../Components/Login';

const page = () => {
    return (
        <div>
            <Navbar />
            <LoginForm />
            <Footer />
        </div>
    )
}

export default page