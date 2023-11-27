import React, { useState } from 'react';
import { useRouter } from 'next/router';

//firebase
import { app } from '@/lib/firebase';
import { getAuth, signOut } from 'firebase/auth';

//選択欄
import { killifishColors, killifishCharacters } from '@/lib/characters';
import { killifishColorType, killifishCharacterType } from '@/types/sidebarTypes';

const Sidebar = () => {
    const router = useRouter();

    //選択欄の状態を管理
    const [colors, setColors] = useState<killifishColorType[]>(killifishColors);
    const [characters, setCharacters] = useState<killifishCharacterType[]>(killifishCharacters);

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

    return (
        <>
        <ul className='w-[300px] text-gray-900 px-2 py-4 bg-gray-100 rounded-md'>
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
                    <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
                </div>
            </form>
            </li>
            <li className='mb-4 px-2'>
                <span className='w-full block mb-2 font-bold text-sm text-gray-500'>色を選択</span>
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
            </li>
            <li className='mb-4 px-2'>
                <span className='w-full block mb-2 font-bold text-sm text-gray-500'>特徴を選択</span>
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
            </li>
            { 
                //仮のボタン 
            }
            <li className='px-8'>
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