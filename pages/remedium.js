
import Navbar from '../components/Navbar';
import Pharmacy from '../components/Pharmacy';
import NextNProgress from 'nextjs-progressbar';
import { google } from 'googleapis';

const axios = require('axios');
const cheerio = require('cheerio');


export const getServerSideProps = async () => {
  const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] });

  const sheets = google.sheets({ version: 'v4', auth });
 
  const range = `remedium!A1:A1000`;

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
       
         
        const currentPrice =  $('.ProductInfo__Container-sc-w0erpt-4 .Price__RegularPrice-sc-14hy5o8-2', html).text();
        const oldPrice = $('.Price__InitialPrice-sc-14hy5o8-3', html).text();
        const promoPrice = currentPrice ? '' : $('.Price__DiscountedPrice-sc-14hy5o8-7', html).text();
       
        const price = currentPrice ? currentPrice : oldPrice;
        return {
          success: true,
          data: { title, price, promoPrice, URL }
        };
      })
    
  }

    const responses = await Promise.allSettled(urlData?.map(fetchData));
    
    return {
    props: {
     data: responses
    },
  
  };

}

export default function Remedium({ data }) {

return (
  <div>
     <NextNProgress />
     <Navbar/>
      <Pharmacy data={ data} />
  </div>
)
}
