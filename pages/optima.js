
import Navbar from '../components/Navbar';
import Pharmacy from '../components/Pharmacy';
import NextNProgress from 'nextjs-progressbar';
import { google } from 'googleapis';

const axios = require('axios');
const cheerio = require('cheerio');

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
 
  const range = `optima!A1:A1000`;

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.NEXT_PUBLIC_SHEET_ID,
    range,
  });

  const urlData = response?.data?.values;

  function fetchData(URL) {
    return axios
      .get(URL)
      .then(function (response) {
            const html = response.data;
  
        const $ = cheerio.load(html);
          
        const title = $('h1', html).text();
        const currentPrice = $('.product-price', html).text();
        const oldPrice = $('.product-old-price', html).text();
        const promoPrice = currentPrice ? '' : $('.product-promo', html).text().trim();
       
        const price = currentPrice ? currentPrice.trim() : oldPrice.trim();
    
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

export default function Optima({ data }) {

return (
  <div>
     <NextNProgress />
     <Navbar/>
     <Pharmacy data={ data} />
  </div>
)
}
