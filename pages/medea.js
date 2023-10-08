const axios = require('axios');
const cheerio = require('cheerio');
import { google } from 'googleapis';
import NextNProgress from 'nextjs-progressbar';

import Pharmacy from '../components/Pharmacy';
import Navbar from '../components/Navbar';


export const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

 export const getServerSideProps = async () => {
  const { privateKey } = JSON.parse(process.env.GOOGLE_PRIVATE_KEY || { privateKey: null })
  const auth = new google.auth.GoogleAuth({
    scopes: SCOPES,
    projectId: process.env.GOOGLE_PROJECTID,
    credentials: {
      private_key: privateKey,
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
    },
   
  }
 
  )  
    const sheets = google.sheets({ version: 'v4', auth });
   
    const range = `medea!A1:A1000`;
  
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.NEXT_PUBLIC_SHEET_ID,
      range,
    });
  
    const urlData = response?.data?.values;

   function fetchData(URL) {
      return axios
        .get(URL, {
          headers: {
              "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
              "User-Agent": "Mozilla/5.0 Chrome/51.0.2704.103",
          },
      })
        .then((response) => {
          const html = response.data;
          const $ = cheerio.load(html);
            
          const title = $('h1', html).text();
           
            
            const currentPrice = $('.price-box .price', html).text();
            const oldPrice = $('.price-box .old-price .price', html).text();
            const promoPrice =  $('.price-box .special-price .price', html).text();
           
            const price = oldPrice ? oldPrice : currentPrice;
        
          return {
            success: true,
            data: { title, price, promoPrice, URL, all: false }
          };
        })
      
    }
  
      const responses = await Promise.allSettled(urlData?.map(fetchData));
  
      return {
      props: {
        data: JSON.parse(JSON.stringify(responses))
      },
    
    };
  
  }
export default function Medea({ data }) {

    
      return (
          <div >
              <NextNProgress />
              <Navbar/>
              <Pharmacy data={ data} />
        </div>
      )
}
