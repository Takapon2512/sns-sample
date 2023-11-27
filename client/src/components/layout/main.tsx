import React, { useEffect } from 'react';
import gsap from 'gsap';

const MainLayout = ({ children }: { children: React.ReactNode }) => {

    useEffect(() => {
        const mainEl = document.getElementById("main");

        if (mainEl) {
            gsap.to(mainEl, { opacity: "1", duration: 0.5, delay: 1.2 });
        };

    }, []);

    return (
        <>
            <main id="main" className='opacity-0 flex w-4/5 max-w-[960px] m-auto mt-20'>
                { children }
            </main>
        </>
    );
};

export default MainLayout;