import Link from 'next/link';
import React, { useState } from 'react';

const Posts = () => {
    const [isLike, setIsLike] = useState<boolean>(false); 

    return (
        <ul className='w-full rounded-md pl-[316px]'>
            <li className='p-6 mb-4 bg-blue-50 rounded-md text-gray-900'>
                <div className='flex items-center justify-between mb-6'>
                    <div className='flex items-center'>
                        <div className="relative w-10 h-10 overflow-hidden bg-gray-200 rounded-full mr-2 dark:bg-gray-600">
                            <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                        </div>
                        <p className='font-bold'>たかぽん</p>
                    </div>
                    <p className='text-sm'>2023/11/04 23:12</p>
                </div>
                <h2 className='text-xl font-bold mb-2'>我が家の楊貴妃</h2>
                <p className='mb-4'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, architecto. Fugit earum magni nam unde ea voluptate doloremque magnam cum quae harum. Obcaecati minus reprehenderit optio deserunt veniam nisi facilis.
                </p>
                <div className='mb-2'>
                    <Link rel="stylesheet" href="/">
                        <img
                        className='p-2 rounded-3xl' 
                        src="/images/aqua.jpeg" 
                        alt="メダカの画像" 
                        />
                    </Link>
                </div>
                <div 
                className='flex items-center justify-between px-2'
                >
                    {
                        isLike ? (
                            <span 
                            className='mr-4 cursor-pointer h-10 w-10 flex justify-center items-center rounded-full hover:bg-red-200 transition-all'
                            onClick={() => setIsLike(!isLike)}
                            >
                                <svg className="w-5 h-5 text-rose-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z"/>
                                </svg>
                            </span>
                        ) : (
                            <span 
                            className='mr-4 cursor-pointer h-10 w-10 flex justify-center items-center rounded-full hover:bg-red-200 transition-all'
                            onClick={() => setIsLike(!isLike)}
                            >
                                <svg className="w-5 h-5 text-rose-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 19">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4C5.5-1.5-1.5 5.5 4 11l7 7 7-7c5.458-5.458-1.542-12.458-7-7Z"/>
                                </svg>
                            </span>
                        )
                    }
                    <button
                    className='py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-all'
                    >
                        返信する
                    </button>
                </div>
            </li>
            <li className='p-6 mb-4 bg-blue-50 rounded-md text-gray-900'>
                <div className='flex items-center justify-between mb-6'>
                    <div className='flex items-center'>
                        <div className="relative w-10 h-10 overflow-hidden bg-gray-200 rounded-full mr-2 dark:bg-gray-600">
                            <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                        </div>
                        <p className='font-bold'>たかぽん</p>
                    </div>
                    <p className='text-sm'>2023/11/04 23:12</p>
                </div>
                <h2 className='text-xl font-bold mb-2'>我が家の楊貴妃</h2>
                <p className='mb-4'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, architecto. Fugit earum magni nam unde ea voluptate doloremque magnam cum quae harum. Obcaecati minus reprehenderit optio deserunt veniam nisi facilis.
                </p>
                <div className='mb-2'>
                    <Link rel="stylesheet" href="/">
                        <img
                        className='p-2 rounded-3xl' 
                        src="/images/aqua.jpeg" 
                        alt="メダカの画像" 
                        />
                    </Link>
                </div>
                <div 
                className='flex items-center justify-between px-2'
                >
                    {
                        isLike ? (
                            <span 
                            className='mr-4 cursor-pointer h-10 w-10 flex justify-center items-center rounded-full hover:bg-red-200 transition-all'
                            onClick={() => setIsLike(!isLike)}
                            >
                                <svg className="w-5 h-5 text-rose-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z"/>
                                </svg>
                            </span>
                        ) : (
                            <span 
                            className='mr-4 cursor-pointer h-10 w-10 flex justify-center items-center rounded-full hover:bg-red-200 transition-all'
                            onClick={() => setIsLike(!isLike)}
                            >
                                <svg className="w-5 h-5 text-rose-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 19">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4C5.5-1.5-1.5 5.5 4 11l7 7 7-7c5.458-5.458-1.542-12.458-7-7Z"/>
                                </svg>
                            </span>
                        )
                    }
                    <button
                    className='py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-all'
                    >
                        返信する
                    </button>
                </div>
            </li>
        </ul>
    );
};

export default Posts;