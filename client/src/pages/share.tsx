import React from 'react';
import Head from 'next/head';

//components
import Header from '@/components/shareComponents/Header';
import MainLayout from '@/components/layout/main';

const Share = () => {
  return (
    <>
    <Head>
        <title>メダカSNS</title>
    </Head>
    <Header />
    <MainLayout>
      
    </MainLayout>
    </>
  );
};

export default Share;