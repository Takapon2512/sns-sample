import Link from 'next/link';
import React, { useEffect, useState } from 'react';

//lib
import { apiClient } from '@/lib/axios';

//auth
import { useAuth } from '@/context/auth';
import { postType } from '@/types/postType';

const Posts = () => {
    const [isLike, setIsLike] = useState<boolean>(false);
    const [posts, setPosts] = useState<postType[]>([]);
    const [refetch, setRefetch] = useState<boolean>(false);

    const { user } = useAuth();

    const fetchPosts = async () => {
        try {
            const response = await apiClient.get("/post/fetch_post");
            const postsData: postType[] = response.data;

            if (postsData.length === 0) setRefetch(true);
            setPosts(postsData);
        } catch (err) {
            console.error(err);
            setRefetch(true);
        };
    };

    const refetchPosts = () => fetchPosts();

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <>
        {
            refetch ? (
                <div className='w-full pl-[316px] pt-14'>
                    <p className='text-center mb-4'>
                        投稿データを取得できませんでした。<br />
                        再検索または再取得を試してください。
                    </p>
                    <div className='flex justify-center'>
                        <button
                        className={`py-2 px-8 
                        text-sky-500 border-sky-500 
                        border-2 rounded-full
                        hover:bg-sky-500 hover:text-white
                        transition
                        `}
                        onClick={refetchPosts}
                        >
                            <span>
                                再取得
                            </span>
                        </button>
                    </div>
                </div>
            ) : (
                <ul className='w-full rounded-md pl-[316px]'>
                    {
                        posts.map((post, index) => (
                            <li 
                            key={`${user?.uid}_${index}`}
                            className='p-6 mb-4 bg-blue-50 rounded-md text-gray-900'
                            >
                                <div className='flex items-center justify-between mb-6'>
                                    <div className='flex items-center'>
                                        <img 
                                        className='w-14 h-14 mr-2'
                                        src={post.usericon} 
                                        alt="ユーザーアイコン" 
                                        />
                                        <p className='font-bold'>{ post.username }</p>
                                    </div>
                                    <p className='text-sm'>{ post.created_at }</p>
                                </div>
                                <h2 className='text-xl font-bold mb-2'>{ post.title }</h2>
                                <p className='mb-4'>
                                    { post.description }
                                </p>
                                <div className='mb-2 w-full'>
                                    <Link 
                                    rel="stylesheet" 
                                    href={post.imageUrl} 
                                    target='_blank'
                                    className='block w-full'
                                    >
                                        <img
                                        className='p-2 rounded-3xl w-full object-cover aspect-video' 
                                        src={ post.imageUrl } 
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
                                </div>
                            </li>
                        ))
                    }
                </ul>
            )
        }
        </>
    );
};

export default Posts;