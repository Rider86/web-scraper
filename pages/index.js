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
      <div className={styles.manageLinks}>
        <div><h1>Manage links: </h1>
          <a href={'https://docs.google.com/spreadsheets/d/1Tn5-6f6aZlGAn1uZbPmCeA3vRpT-WG1qp2MfRRjob4I/edit?usp=drive_web&ouid=116090750770521771462'} target='_blank'>https://docs.google.com/spreadsheets</a>
        </div>
      </div>
   </div>
  )
}
