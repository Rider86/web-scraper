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
            data: { title, price, promoPrice: oldPrice ? promoPrice : '', URL, all: false }
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
