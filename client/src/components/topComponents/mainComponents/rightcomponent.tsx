import React from 'react';

const RightComponent = () => {
  return (
    <div className='w-2/5 bg-blue-400 flex items-center'>
      <div className="w-full">
        <h1
        className='text-5xl text-white font-bold text-center mb-16 leading-tight tracking-wider'
        >
          あなたのメダカを<br />みんなと共有。
        </h1>
        <div className='w-4/5 m-auto flex justify-center flex-wrap max-w-xl'>
          <div className='w-full flex relative mb-4 justify-center'>
            <input 
            className='px-4 py-5 rounded-full w-1/2 border-none mr-4' 
            type="email" 
            name="メールアドレス入力欄" 
            placeholder='sample@gmail.com'
            id="" 
            />
            <button 
            className='bg-blue-600 rounded-full w-16 h-16 flex justify-center items-center hover:scale-110 transition-all'
            >
            { 
              //https://flowbite.com/docs/customize/icons/ 
            } 
            <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"/>
            </svg>
            </button>
          </div>
          <div className='w-full flex justify-center'>
            <button className='w-1/2 mr-20'>
              <img src="/images/google_SI.png" alt="Googleログイン" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightComponent;