import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Navbar from '../components/Navbar';
import NextNProgress from 'nextjs-progressbar';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Web Scraper</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NextNProgress />
      <Navbar />
   </div>
  )
}
