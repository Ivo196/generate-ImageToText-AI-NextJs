import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

import { useState } from 'react';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title> Image to Text Generator</title>
        <meta name="description" content="Image to Text Generator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className={styles.h1}> Image to Text Generator</h1>
      <p>
        Send a request to `/api/generate` with `imageUrl` as a query parameter:
      </p>
      <Link
        className={styles.highlight}
        href="/api/generate?imageUrl= ${}"
      >
        http://localhost:3000/api/generate?imageUrl="your image URL"
      </Link>
    </div>
  );
};

export default Home;
