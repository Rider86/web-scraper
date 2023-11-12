const axios = require('axios');
const cheerio = require('cheerio');
// import { RateLimit } from "async-sema";
const { RateLimit } = require('async-sema');
import { google } from 'googleapis';
import NextNProgress from 'nextjs-progressbar';

import AllPharmacy from '../components/AllPharmacy';
import Navbar from '../components/Navbar';


export const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

async function getURLData () {
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
    `all!B1:B1000`
  ]

  
  const response = await sheets.spreadsheets.values.batchGet({
    spreadsheetId: process.env.NEXT_PUBLIC_SHEET_ID,
    ranges,
  });

  const range = `all!A1:A1000`;
  
  const productNames = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.NEXT_PUBLIC_SHEET_ID,
    range,
  });
   

  const urlData = [];
  response?.data?.valueRanges?.map(el => el.values?.map(res => urlData.push([res[0]])));
  
  return [{urlData},{productNames:productNames?.data?.values} ];
}

async function getDetails (urlData) {

  const fetchData =async (URL) => {
      const row = URL?.split(',');

const result = row?.map((url)=>    axios
  .get(url, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "User-Agent": "Mozilla/5.0 Chrome/51.0.2704.103",
    },
  })
  .then(async (response) => {
  
        const html = await response?.data;

    const $ = cheerio.load(html);

    let newDataAfya = {};
    let newDataOptima = {};
    let newDataRemedium = {};
    let newData366 = {};
    let newDataGalen = {};
    let newDataEpharm = {};
    let newDataFactors = {};
    let newDataRedApple = {};
    let newDataMyPharmacy = {};
    let newDataMedea = {};

    const title = $('h1', html).text();

    if (url?.includes('afya')) {
      const currentPrice = $('.singleProduct .currPrice', html).text();
     const oldPrice = $('.singleProduct .productPrice .oldPrice', html).text();
     const  promoPrice =  $('.singleProduct .productPrice .currPrice', html).text();
     
    const  price = oldPrice ? oldPrice : currentPrice;
      newDataAfya = { title, price, promoPrice: oldPrice ? promoPrice : '', URL , all: true };
    }
    
    if (url?.includes('apteka-optima')) {
     const  currentPrice = $('.product-price', html).text();
     const  oldPrice = $('.product-old-price', html).text();
     const promoPrice = currentPrice ? '' : $('.product-promo', html).text();
 
    const price = currentPrice ? currentPrice : oldPrice;
     newDataOptima = { title, price,  promoPrice: oldPrice ? promoPrice : '', URL, all: true }
    }

    if (url?.includes('remedium')) {
      const currentPrice =  $('.ProductInfo__Container-sc-w0erpt-4 .Price__RegularPrice-sc-14hy5o8-2', html).text();
      const oldPrice = $('.Price__InitialPrice-sc-14hy5o8-3', html).text();
      const promoPrice = currentPrice ? '' : $('.Price__DiscountedPrice-sc-14hy5o8-7', html).text();
    
      const price = currentPrice ? currentPrice : oldPrice;
      newDataRemedium = { title, price, promoPrice, URL, all: true }
    }
    
    if (url?.includes('366')) {
      const currentPrice =  $('.component-product-view-prices .prices .regular-price', html).text();
      const oldPrice = $('.component-product-view-prices .prices .is-old', html).text();
      const promoPrice =  $('.component-product-view-prices .prices .promo-price', html).text();
      const price = oldPrice ? oldPrice : currentPrice;
      newData366 = { title, price, promoPrice: oldPrice ? promoPrice : '', URL, all: true }
   
    };

    if (url?.includes('galen')) {
        const currentPrice =  $('.price-container .final-price', html).text();
        const oldPrice = $('.price-container .old-price', html).text();
        const promoPrice = oldPrice ?  $('.price-container .final-price', html).text().trim() : '';
        const price = oldPrice ? oldPrice.trim() : currentPrice.trim();
      newDataGalen = { title, price, promoPrice: oldPrice ? promoPrice : '', URL, all: true }
   
    };

    if (url?.includes('epharm')) {
      
      const currentPrice = $('.product-info-price .price', html).text();
      const oldPrice = $('.product-info-price .old-price', html).text();
      const promoPrice = $('.product-info-price .special-price .price-wrapper .price', html).text();;
     
      const price = oldPrice ? oldPrice : currentPrice.trim();

      newDataEpharm = {  title, price, promoPrice, URL, all: true}
 
    };
    
    if (url?.includes('factors')) {
      const factorsTitle = $('.product-details-clear h1', html).text();
      const currentPrice = $('.ty-product-prices .ty-price-num', html).text();
      const oldPrice = $('.ty-product-prices .ty-strike', html).text();
      const promoPrice = currentPrice ? '' : $('.ty-product-prices .ty-price-num', html).text().trim() ;
     
      const price = currentPrice ? currentPrice : oldPrice;
      newDataFactors = { title: factorsTitle, price, promoPrice, URL, all: true }
 
    };
    
    if (url?.includes('redapple')) {
      
      const redAppleTitle = $('.product-details-clear h1', html).text();
      const currentPrice = $('.ty-product-prices .ty-price-num', html).text();
      const oldPrice = $('.ty-product-prices .ty-strike', html).text();
      const promoPrice = oldPrice ? currentPrice : oldPrice;
     
      const price = oldPrice ? oldPrice : currentPrice.trim();
   
      newDataRedApple = { title: redAppleTitle, price, promoPrice, URL, all: true }
 
    };
    
   if (url?.includes('mypharmacy')) {
      
          
            const currentPrice = $('.ty-product-prices .ty-price-num', html).text();
            const oldPrice = $('.ty-product-prices .ty-strike', html).text();
            const promoPrice = oldPrice ?  $('.ty-product-prices .ty-price-num', html).text().trim() : '';
           
            const price = oldPrice ? oldPrice.trim() : currentPrice.trim();
 
    newDataMyPharmacy = { title, price, promoPrice: oldPrice ? promoPrice : '', URL, all: true }

    };

    if (url?.includes('aptekamedea')) {
      
            const currentPrice = $('.price-box .price', html).text();
            const oldPrice = $('.price-box .old-price .price', html).text();
            const promoPrice =  $('.price-box .special-price .price', html).text();
           
            const price = oldPrice ? oldPrice : currentPrice;
   
      newDataMedea = { title, price, promoPrice, URL, all: true }
 
    };

    let final = {};

    if (newData366.hasOwnProperty('price')) {
      final = {...final, treeSixSix: newData366}
    } else if (newDataAfya.hasOwnProperty('price')) {
      final = {...final,afya:newDataAfya}
    }else if (newDataRemedium.hasOwnProperty('price')) {
      final = {...final, remedium: newDataRemedium}
    }else if (newDataOptima.hasOwnProperty('price')) {
      final = {...final, optima: newDataOptima}
    }else if (newDataGalen.hasOwnProperty('price')) {
      final = {...final, galen: newDataGalen}
    }else if (newDataEpharm.hasOwnProperty('price')) {
      final = {...final, epharm: newDataEpharm}
    }else if (newDataFactors.hasOwnProperty('price')) {
      final = {...final, factors: newDataFactors}
    }else if (newDataRedApple.hasOwnProperty('price')) {
      final = {...final, redApple: newDataRedApple}
    }else if (newDataMyPharmacy.hasOwnProperty('price')) {
      final = {...final, mypharmacy: newDataMyPharmacy}
    }else if (newDataMedea.hasOwnProperty('price')) {
      final = {...final, medea: newDataMedea}
    }


 
    return {
      success: true,
      data:  final   
    };
  }) 
);

    const all = await Promise.allSettled(result?.map(el=>el));
     return  all
      }

      const responses = await Promise.allSettled(urlData?.map(fetchData));
  

  return responses ;
}


 export const getServerSideProps = async () => {

  const clients = await getURLData();
   const details = await Promise.allSettled(clients?.[0]?.urlData?.map(getDetails)).then(res => {
  
     return {
        props: {
          data: [{ details: res?.length > 0 ? JSON.parse(JSON.stringify(res)) : []}, {productNames:clients?.[1]?.productNames?.length > 0 ? clients?.[1]?.productNames : []}]
          },
        }   
   })

  
   return details;
  
    
  
  
    
   
   } 
  
  
export default  function All({ data }) {
      return (
          <div >
              <NextNProgress />
              <Navbar/>
              <AllPharmacy data={data}  />
        </div>
      )
}
