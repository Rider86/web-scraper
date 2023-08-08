const axios = require('axios');
const cheerio = require('cheerio');
import { google } from 'googleapis';
import NextNProgress from 'nextjs-progressbar';

import Pharmacy from '../components/Pharmacy';
import Navbar from '../components/Navbar';


 
 export const getServerSideProps = async () => {
    const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] });
  
    const sheets = google.sheets({ version: 'v4', auth });
   
    const range = `afya!A1:A1000`;
  
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
           
            
            const currentPrice = $('.singleProduct .currPrice', html).text();
            const oldPrice = $('.singleProduct .productPrice .oldPrice', html).text();
            const promoPrice =  $('.singleProduct .productPrice .currPrice', html).text();
           
            const price = oldPrice ? oldPrice : currentPrice;
           
          return {
            success: true,
            data: { title, price, promoPrice: oldPrice ? promoPrice : '', URL }
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
export default function AfyaPharmacy({ data }) {

    
      return (
          <div >
              <NextNProgress />
              <Navbar/>
              <Pharmacy data={ data} />
        </div>
      )
}
