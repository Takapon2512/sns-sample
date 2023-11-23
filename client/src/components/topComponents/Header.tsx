import React, { useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

const Header = () => {

    useEffect(() => {
        const headerEl = document.getElementById("header");

        if (headerEl) {
            gsap.to(headerEl, { translateY: 0, duration: 0.5, delay: 1 });
        };

    }, []);

    return (
        <header
        id="header" 
        className='w-full flex h-16 items-center bg-blue-400 fixed top-0 -translate-y-16'
        >
            <div className='w-4/5 m-auto flex justify-between items-center'>
                <Link 
                className='text-white text-2xl font-semibold' 
                href='/'
                >
                    SNS-Sample
                </Link>
                <button 
                className='text-white border-white border-2 rounded px-2 py-1'
                >
                    ログアウト
                </button>
            </div>
        </header>
    );
};

export default Header;