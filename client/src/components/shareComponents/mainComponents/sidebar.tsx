import React, { useState } from 'react';
import { useRouter } from 'next/router';

//firebase
import { app } from '@/lib/firebase';
import { getAuth, signOut } from 'firebase/auth';

//useAuth
import { useAuth } from '@/context/auth';

//選択欄
import { killifishColors, killifishCharacters } from '@/lib/characters';
import { killifishColorType, killifishCharacterType } from '@/types/sidebarTypes';
import { apiClient, apiClientMulti } from '@/lib/axios';

const Sidebar = () => {
    const router = useRouter();
    const { user } = useAuth();

    const [isPost, setIsPost] = useState(false);
    const [selectImage, setSelectImage] = useState<File | null>(null);

    //選択欄の状態を管理
    const [colors, setColors] = useState<killifishColorType[]>(killifishColors);
    const [characters, setCharacters] = useState<killifishCharacterType[]>(killifishCharacters);
    const [drawerColors, setDrawerColors] = useState<boolean>(false);
    const [drawerCharacters, setDrawerCharacters] = useState<boolean>(false);

    //投稿画面の状態管理
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
    const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value);
    
    const handleColorsCheck = (colorData: killifishColorType) => {
        const indexValue = colors.indexOf(colorData);
        const currentColors = [...colors];

        currentColors[indexValue] = {
            color: colorData.color,
            isActive: !colorData.isActive
        };

        const newColors = [...currentColors];
        setColors(newColors);
    };

    const handleCharactersCheck = (characterData: killifishCharacterType) => {
        const indexValue = characters.indexOf(characterData);
        const currentCharacters = [...characters];

        currentCharacters[indexValue] = {
            character: characterData.character,
            isActive: !characterData.isActive
        };

        const newCharacters = [...currentCharacters];
        setCharacters(newCharacters);
    };

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

    const handlePost = async () => {
        if (title !== "" && description !== "" && selectImage !== null) {
            try {
                const formData = new FormData();

                formData.append('image', selectImage);
                formData.append('title', title);
                formData.append('description', description);
                formData.append('email', user?.email ? user.email : "");
                formData.append('uid', user ? user.uid : "");

                //タイトルや内容などをサーバーへ
                await apiClientMulti.post("/post/post", formData);

                router.reload();
            } catch (err) {
                console.error(err);
            };
        };
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;
        if (fileList !== null) {
            const file = fileList[0];
            setSelectImage(file);
        };
    };

    return (
        <>
        <ul className='w-[300px] text-gray-900 px-2 py-4 mr-4 bg-gray-100 rounded-md fixed'>
            <li className='mb-4 px-2'>
                <span className='w-full block mb-2 font-bold text-sm text-gray-500'>検索</span>
            <form>   
                <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input 
                    type="search" 
                    id="default-search" 
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="Search" 
                    required 
                    />
                </div>
            </form>
            </li>
            <li className='mb-4 px-2'>
                <div 
                className='flex items-center cursor-pointer'
                onClick={() => setDrawerColors(!drawerColors)}
                >
                    <span className='w-full block font-bold text-sm text-gray-500'>色を選択</span>
                    <span>
                        <svg 
                        className="w-3 h-3 text-gray-500 dark:text-white transition-all" 
                        style={drawerColors ? {} : { transform: "rotate(-90deg)" }}
                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" 
                        fill="none" viewBox="0 0 14 8"
                        >
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"/>
                        </svg>
                    </span>
                </div>
                {
                    drawerColors ? (
                        <ul>
                            {
                                colors.map((colorsData) => (
                                    <li 
                                    key={colorsData.color}
                                    className='h-10 flex items-center justify-between cursor-pointer rounded-lg px-2 hover:bg-blue-200 transition-all'
                                    onClick={() => handleColorsCheck(colorsData)}
                                    >
                                        <p>
                                            {colorsData.color}
                                        </p>
                                        <span>
                                            {
                                                colorsData.isActive ? (
                                                    <svg className="w-4 h-4 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                                    </svg>
                                                ) : (<></>)
                                            }
                                        </span>
                                    </li>
                                ))
                            }
                        </ul>
                    ) : (<></>)
                }
            </li>
            <li className='mb-4 px-2'>
                <div 
                className='flex items-center cursor-pointer'
                onClick={() => setDrawerCharacters(!drawerCharacters)}
                >
                    <span className='w-full block font-bold text-sm text-gray-500'>特徴を選択</span>
                    <span>
                        <svg 
                        className="w-3 h-3 text-gray-500 dark:text-white transition-all" 
                        style={drawerCharacters ? {} : { transform: "rotate(-90deg)" }}
                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" 
                        fill="none" viewBox="0 0 14 8"
                        >
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"/>
                        </svg>
                    </span>
                </div>

                {
                    drawerCharacters ? (
                        <ul>
                            {
                                characters.map((charactersData) => (
                                    <li
                                    key={charactersData.character}
                                    className='h-10 flex items-center justify-between cursor-pointer rounded-lg px-2 hover:bg-blue-200 transition-all'
                                    onClick={() => handleCharactersCheck(charactersData)}
                                    >
                                        <p>
                                            { charactersData.character }
                                        </p>
                                        <span>
                                            {
                                                charactersData.isActive ? (
                                                    <svg className="w-4 h-4 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                                    </svg>
                                                ) : (<></>)
                                            }
                                        </span>
                                    </li>
                                ))
                            }
                        </ul>
                    ) : (<></>)
                }
            </li>
            <li className='px-8 mb-2'>
                <button
                className='bg-blue-500 text-white w-full py-2 rounded-full hover:bg-blue-600 transition-all'
                onClick={() => setIsPost(!isPost)}
                >
                    投稿
                </button>
            </li>
            <li className='px-8'>
                <button
                className='bg-red-200 w-full py-2 rounded-full hover:bg-red-300 transition-all'
                onClick={handleSignOut}
                >
                    サインアウト
                </button>
            </li>
        </ul>
        {
            isPost ? (
                <>
                <div 
                className='bg-stone-900 opacity-70 w-full h-screen fixed left-0 top-0'
                onClick={() => setIsPost(!isPost)}
                >
                </div>
                <div
                className='fixed max-w-[960px] w-4/5'
                >
                    <div
                    className='bg-gray-200 text-gray-900 z-20 px-8 py-12 rounded-md'
                    >
                        <h2
                        className='text-xl font-bold mb-8'
                        >
                            投稿画面
                        </h2>
                        <div
                        className='mb-4'
                        >
                            <span 
                            className='block mb-2 text-sm text-gray-500'
                            >
                                タイトル
                            </span>
                            <input 
                            type="text" 
                            className='w-full rounded-full border-none'
                            value={title}
                            onChange={(e) => handleTitle(e)}
                            />
                        </div>
                        <div
                        className='mb-4'
                        >
                            <span
                            className='block mb-2 text-sm text-gray-500'
                            >
                                内容
                            </span>
                            <textarea 
                            className='w-full border-none rounded-lg'
                            onChange={(e) => handleDescription(e)}
                            value={description}
                            name="post" 
                            id="post" 
                            cols={30} 
                            rows={10} 
                            />
                        </div>
                        <div
                        className='mb-8'
                        >
                            {
                                selectImage ? (
                                    <>
                                    <div className='flex items-center justify-between'>
                                        <p>
                                            {selectImage.name}
                                        </p>
                                        <button 
                                        className='cursor-pointer bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all'
                                        onClick={() => setSelectImage(null)}
                                        >
                                            <svg className="w-5 h-5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
                                            </svg>
                                        </button>
                                    </div>
                                    </>
                                ) : (
                                    <>
                                    <span
                                    className='block mb-2 text-sm text-gray-500'
                                    >
                                        画像
                                    </span>
                                    <label className="cursor-pointer bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-all">
                                        <span>ファイルを選択</span>
                                        <input 
                                        id="inputImage" 
                                        type="file" 
                                        className="hidden" 
                                        accept="image/*" 
                                        onChange={handleImageUpload}
                                        />
                                    </label>
                                    </>
                                )
                            }
                        </div>
                        <div 
                        className='flex justify-end'
                        >
                            <button
                            className='bg-blue-500 text-white w-[120px] py-2 rounded-full hover:bg-blue-600 disabled:bg-gray-400 transition-all'
                            onClick={handlePost}
                            disabled={ title !== "" && description !== "" && selectImage !== null ? false : true }
                            >
                                投稿する
                            </button>
                        </div>
                    </div>
                </div>
                </>
            ) : (
                <></>
            )
        }
        </>
    );
};

export default Sidebar;