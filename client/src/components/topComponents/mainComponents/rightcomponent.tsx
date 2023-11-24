import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

//firebase
import { app } from '@/lib/firebase';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

const RightComponent = () => {
  const [isCreateAccount, setIsCreateAccount] = useState<boolean>(false);
  const [allowCreate, setAllowCreate] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const router = useRouter();

  //パスワードの文字数判定
  const passwordLength = (password: string) => {
    const minPasswordLegth = 8;
    if (password.length >= minPasswordLegth) return true;
    return false;
  };

  //文字の種類を判定
  const passwordReg = (password: string) => {
    if (password.match(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@?&%$#]).+$/)) return true;
    return false;
  };

  //メールアドレスが適正かを判定
  const emailReg = (email: string) => {
    const emailReg: RegExp = /^[a-zA-Z0-9_+-]+(\.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
    if (email.match(emailReg)) return true;
    return false;
  };

  //サインアップ処理(メールアドレス)
  const emailSignUp = (email: string, password: string) => {
    const auth = getAuth(app);

  };

  useEffect(() => {
    if (passwordLength(password) && passwordReg(password) && emailReg(email)) {
      setAllowCreate(true);
    } else {
      setAllowCreate(false);
    };
  }, [password]);

  return (
    <>
    <div className='w-2/5 bg-blue-400 flex items-center'>
      <div className="w-full">
        <h1
        className='text-5xl text-white font-bold text-center mb-16 leading-tight tracking-wider'
        >
          あなたのメダカを<br />みんなと共有。
        </h1>
        <div className='w-4/5 m-auto max-w-xl'>
          <div className='w-full flex items-center flex-wrap flex-col'>
            <button 
            className='w-2/5 text-white bg-blue-700 h-12 rounded-full mb-4 min-w-240 hover:bg-blue-600 transition-all'
            onClick={() => setIsCreateAccount(true)}
            >
                アカウントを作成
            </button>
            <button 
            className='w-2/5 min-w-240'
            >
              <img src="/images/google_SI.png" alt="Googleログイン" />
            </button>
          </div>
        </div>
      </div>
    </div>
    {
      isCreateAccount ? (
      <div>
        <div 
        className='absolute bg-stone-900 w-full h-full opacity-70 top-0 left-0 z-10'
        onClick={() => setIsCreateAccount(false)}
        >
        </div>
        <div className='absolute bg-gray-50 top-[38%] left-[40%] left-3/10 z-20 px-8 py-12 rounded-md text-gray-900 w-2/5'>
          <h2 className='text-2xl font-bold mb-4'>
            アカウントを作成
          </h2>
          <div className='flex flex-wrap justify-end'>
            <input 
            type="email" 
            placeholder='sample@gmail.com' 
            className='w-full mb-4'
            onChange={(e) => handleEmail(e)}
            />
            <input 
            type="password" 
            placeholder='パスワードを入力' 
            className='w-full mb-1'
            onChange={(e) => handlePassword(e)}
            />
            <span 
            className='w-full mb-4 text-sm text-gray-500'
            >
              パスワードは8文字以上で英数字と記号を使用してください。
            </span>
            <button 
            className='w-40 bg-blue-600 text-white h-12 rounded-full hover:bg-blue-500 transition-all disabled:bg-gray-300'
            disabled={allowCreate ? false : true}
            onClick={() => emailSignUp(email, password)}
            >
              作成
            </button>
          </div>
        </div>
      </div>
      ) : (
        <></>
      )
    }
    </>
  );
};

export default RightComponent;