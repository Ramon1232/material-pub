import React from 'react';
import LoginForm from './components/login';
import Header from './components/Header';
import Footer from './components/Footer';





const page = () => {
    return (
        <div>
            <Header />
            <LoginForm />
            <Footer/>
        </div>
    )
}

export default page