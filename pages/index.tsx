import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

import { SetStateAction, useState } from "react";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const [url, setUrl] = useState("");
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setUrl(e.target.value);
    setOutput(null)
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const fullUrl = `http://localhost:3000/api/generate?imageUrl=${encodeURIComponent(
      url
    )}`;
    setIsLoading(true);
    try {
      // Asumiendo que tienes un endpoint en tu API de Next.js que se encarga de la solicitud a Replicate
      const response = await fetch(fullUrl)
      
      const data = await response.json();
      setOutput(data);
    } catch (error) {
      console.error("Error fetching data from Replicate", error);
      setOutput(null);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={styles.container}>
      <Head>
        <title> AI Image to Text Generator</title>
        <meta name="description" content="AI Image to Text Generator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className={styles.h1}>AI Image to Text Generator</h1>
      <p>
        Send a request to `/api/generate` with `imageUrl` as a query parameter:
      </p>
      <Link className={styles.highlight} href="/api/generate?imageUrl= ${}">
        http://localhost:3000/api/generate?imageUrl=YOUR-IMAGE-URL
      </Link>
      <p>Or just paste your url image below:</p>
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
  <div className="w-full max-w-md px-4 py-8 bg-white shadow-lg rounded-lg">
    <form onSubmit={handleSubmit} className="space-y-6">
      <input
        type="text"
        value={url}
        onChange={handleChange}
        placeholder="Fill here your image URL"
        className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-md shadow-sm"
      />
      <button
        type="submit"
        className="relative w-full flex justify-center py-3 px-4 border border-transparent text-md font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 shadow-md"
      >
        Generate
      </button>
    </form>
    {isLoading && <p className="text-center mt-4">Loading...</p>}
    {output && (
      <div className="mt-4 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-900">Result:</h2>
        <pre className="whitespace-pre-wrap text-sm text-gray-700">{JSON.stringify(output, null, 2)}</pre>
      </div>
    )}
  </div>
</div>
    </div>
  );
};

export default Home;
