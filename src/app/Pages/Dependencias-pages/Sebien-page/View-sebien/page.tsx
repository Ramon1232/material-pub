'use client'
import React from 'react'
import Navbar from '../Components/Navbar';
import Footer from '../../../Components/Footer';
import SessionAuthProvider from '../../../../context/SessionAuthProvider';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const page = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    React.useEffect(() => {
        if (!session) {
            router.push('/Pages/Login');
        }
    }, [session, router]);

    if (status === 'loading') {
        return <p>Cargando...</p>;
    }

    return (
        <SessionAuthProvider>
            <div>
                <Navbar />
                <h1>sadkjasdjkhasdfjk</h1>
                <Footer />
            </div>
        </SessionAuthProvider>
    )
}

export default page;