import React, { useState, useEffect } from "react";
import Head from "next/head";
import gsap from "gsap";

//topComponents
import Layout from "@/components/layout";
import Main from "@/components/topComponents/Main";

export default function Home() {

  const initTime = 3;
  const [remainTime, setRemainTime] = useState<number>(initTime);

  useEffect(() => {
    if (remainTime >= 1) {
      const timer = setInterval(() => {
        setRemainTime(prev => prev >= 1 ? prev - 1 : 0);
      }, 1000);
      console.log(remainTime);

      return () => {
        clearInterval(timer);
      };
    }
  }, [remainTime]);

  useEffect(() => {
    const aquaEl = document.getElementById("aqua");

    if (aquaEl) {
      gsap.to(aquaEl, { opacity: "0", duration: 2, delay: 1 });
    };

  }, []);

  return (
    <>
    <Head>
      <title>sns-sample</title>
    </Head>
    {
      remainTime < 1 ? (
    <Layout>
      <Main />
    </Layout>
      ) : (
        <div className="w-screen h-screen">
          <img 
          id="aqua"
          className="w-full h-full object-cover"
          src="/images/aqua.jpeg" 
          alt="水面" 
          />
        </div>
      )
    }
    </>
  );
};
