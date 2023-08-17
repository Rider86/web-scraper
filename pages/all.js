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
   const ranges = [
     `afya!A1:A1000`,
     `optima!A1:A1000`,
     `remedium!A1:A1000`,
     `threeSixSix!A1:A1000`
   ]
    // const range = `afya!A1:A1000`;
  
    const response = await sheets.spreadsheets.values.batchGet({
      spreadsheetId: process.env.NEXT_PUBLIC_SHEET_ID,
      ranges,
    });
    const urlData = [];
    response?.data?.valueRanges?.map(el => el.values?.map(res=>urlData.push(res[0]) ));

  
    const fetchData = (URL) => {
      return axios
        .get(URL)
        .then(function (response) {
              const html = response.data;
    
          const $ = cheerio.load(html);
          let newDataAfya = {};
          let newDataOptima = {};
          let newDataRemedium = {};
          let newData366 = {};

          const title = $('h1', html).text();

          if (URL?.includes('afya')) {
            const currentPrice = $('.singleProduct .currPrice', html).text();
           const oldPrice = $('.singleProduct .productPrice .oldPrice', html).text();
           const  promoPrice =  $('.singleProduct .productPrice .currPrice', html).text();
           
          const  price = oldPrice ? oldPrice : currentPrice;
            newDataAfya = { title, price, promoPrice: oldPrice ? promoPrice : '', URL , all: true };
          }
          
          if (URL?.includes('apteka-optima')) {
           const  currentPrice = $('.product-price', html).text();
           const  oldPrice = $('.product-old-price', html).text();
           const promoPrice = currentPrice ? '' : $('.product-promo', html).text();
       
        const price = currentPrice ? currentPrice : oldPrice;
           newDataOptima = { title, price,  promoPrice: oldPrice ? promoPrice : '', URL, all: true }
          }

          if (URL?.includes('remedium')) {
            const currentPrice =  $('.ProductInfo__Container-sc-w0erpt-4 .Price__RegularPrice-sc-14hy5o8-2', html).text();
            const oldPrice = $('.Price__InitialPrice-sc-14hy5o8-3', html).text();
            const promoPrice = currentPrice ? '' : $('.Price__DiscountedPrice-sc-14hy5o8-7', html).text();
          
            const price = currentPrice ? currentPrice : oldPrice;
            newDataRemedium = { title, price, promoPrice, URL, all: true }
          }
          
          if (URL?.includes('366')) {
            const currentPrice =  $('.component-product-view-prices .prices .regular-price', html).text();
            const oldPrice = $('.component-product-view-prices .prices .is-old', html).text();
            const promoPrice =  $('.component-product-view-prices .prices .promo-price', html).text();
       
            const price = oldPrice ? oldPrice : currentPrice;
            newData366 = { title, price, promoPrice: oldPrice ? promoPrice : '', URL, all: true }
           }
          
          return {
            success: true,
            data: {...newDataAfya, ...newDataOptima, ...newDataRemedium, ...newData366}
          };
        })
      
    }
  
 
     const responses = await Promise.allSettled(urlData?.map(fetchData));
      
     return {
       props: {
         data: responses
       },
     }
   } 
  
  
export default function All({ data }) {
      return (
          <div >
              <NextNProgress />
              <Navbar/>
              <Pharmacy data={ data} />
        </div>
      )
}
