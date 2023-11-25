import React from 'react';
import Router, { useRouter } from 'next/router';

//firebase
import { app } from '@/lib/firebase';
import { getAuth, signOut } from 'firebase/auth';


const Sidebar = () => {
    const router = useRouter();
    const colors = ["青", "緑", "赤", "黄", "白", "黒", "銀", "橙", "紫"];

    const handleSignOut = () => {
        const auth = getAuth(app);

        signOut(auth)
        .then(() => {
            console.log("ログアウト成功");
            router.push("/");
        })
        .catch((err) => {
            console.error(err);
        });
    };

    return (
        <>
        <ul className='w-[300px] text-gray-900'>
            <li className='mb-4 px-2'>
                <span className='w-full block mb-2'>検索</span>
                <input type="text" />
            </li>
            <li className='px-2'>
                <span className='w-full block mb-2'>色を選択</span>
                <ul>
                    {
                        colors.map((color) => (
                            <li 
                            key={color}
                            className='mb-1'
                            >
                                <p>
                                    {color}
                                </p>
                            </li>
                        ))
                    }
                </ul>
            </li>
            <li className='px-2'>
                <span className='w-full block mb-2'>特徴</span>
                <div>
                    <input type="text" />
                    <ul>
                        <li>体型</li>
                        <li>鱗</li>
                        <li>ヒレ</li>
                    </ul>
                </div>
            </li>
            { 
                //仮のボタン 
            }
            <li className='px-2'>
                <button
                className='bg-red-200 w-full py-2 rounded-full hover:bg-red-300 transition-all'
                onClick={handleSignOut}
                >
                    サインアウト
                </button>
            </li>
        </ul>
        </>
    );
};

export default Sidebar;