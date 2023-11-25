import React from 'react';
import Head from 'next/head';

//components
import Header from '@/components/shareComponents/Header';
import MainLayout from '@/components/layout/main';
import Main from '@/components/shareComponents/Main';

const Share = () => {
  return (
    <>
    <Head>
        <title>メダカSNS</title>
    </Head>
    <Header />
    <MainLayout>
      <Main />
    </MainLayout>
    </>
  );
};

export default Share;