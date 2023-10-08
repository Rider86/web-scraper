
import Navbar from '../components/Navbar';
import Pharmacy from '../components/Pharmacy';
import NextNProgress from 'nextjs-progressbar';
import { google } from 'googleapis';
import Export from '../components/Export';

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
 
  const range = `galen!A1:A1000`;

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
       
         
        const currentPrice =  $('.price-container .final-price', html).text();
        const oldPrice = $('.price-container .old-price', html).text();
        const promoPrice = oldPrice ?  $('.price-container .final-price', html).text().trim() : '';
     
        const price = oldPrice ? oldPrice.trim() : currentPrice.trim();
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

export default function Galen({ data }) {

return (
  <div>
     <NextNProgress />
     <Navbar/>
     <Pharmacy data={data} />
  </div>
)
}
