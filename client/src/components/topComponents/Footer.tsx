import React, { useEffect } from 'react';
import gsap from 'gsap';

const Footer = () => {

    useEffect(() => {
        const footerEl = document.getElementById("footer");

        if (footerEl) {
            gsap.to(footerEl, { translateY: 0, duration: 0.5, delay: 1 })
        };

    }, []);

    return (
        <footer 
        id="footer"
        className='w-full flex h-20 items-center bg-blue-800 translate-y-20'
        >
            <div className='text-white m-auto'>
                &copy; 2023 All rights reserved. sns-sample
            </div>
        </footer>
    );
};

export default Footer;