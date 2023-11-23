import React, { useEffect } from 'react';
import gsap from 'gsap';

//components
import Header from '../topComponents/Header';
import Footer from '../topComponents/Footer';

const Layout = ({ children }: { children: React.ReactNode }) => {

    useEffect(() => {
        const mainEl = document.getElementById("main");

        if (mainEl) {
            gsap.to(mainEl, { opacity: "1", duration: 0.5, delay: 1.2 });
        };

    }, []);

    return (
        <>
            <main id="main" className='min-h-screen opacity-0 flex'>
                { children }
            </main>
        </>
    );
};

export default Layout;