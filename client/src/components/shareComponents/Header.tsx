import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth';

//lib
import { apiClient } from '@/lib/axios';

//type
import { userDBType } from '@/types/userTypes';

const Header = () => {
    const { user } = useAuth();
    const [iconUrl, setIconUrl] = useState<string>("");

    const fetchUser = async () => {
        try {
            const response = await apiClient.post("/user/fetch_user", { email: user?.email });
            const userData: userDBType = response.data;
            
            setIconUrl(userData.iconUrl);
        } catch (err) {
            console.error(err);
        };
    };

    useEffect(() => {
        if (user) fetchUser();
    }, [user]);

    return (
        <header className='h-14 px-4 border-b fixed w-full top-0 z-10 bg-white'>
            <div className='h-full flex justify-between items-center w-full mx-auto'>
                <div className='font-bold tracking-wide'>
                    M-S
                </div>
                <div className='text-sm font-bold flex items-center'>
                    <div className='flex items-center mr-4'>
                        <button className='mr-4'>
                            <svg className="w-6 h-6 text-gray-400 hover:text-gray-500 dark:text-white transition-all" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </button>
                        <button>
                            <svg className="w-6 h-6 text-gray-400 hover:text-gray-500 dark:text-white transition-all" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 20">
                                <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z"/>
                            </svg>
                        </button>
                    </div>
                    <div className='text-sm font-bold flex items-center'>
                        <span className='tracking-wide mr-4'>{ user ? user.email : "" }</span>
                        <img 
                        className='rounded-full w-12 h-12'
                        src={iconUrl} 
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;