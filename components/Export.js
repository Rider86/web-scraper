import React, { useCallback } from "react";
import { utils, writeFileXLSX } from 'xlsx';

import styles from '../styles/Home.module.css';


export default function Export({pricesData}) {
  /* the component state is an array of presidents */
    const convertDataToArrayOfObjects = pricesData?.reduce((acc, curr) => {
        const modifiedCurr = {
            ...curr?.value?.data,
            URL: curr?.value?.data?.all ? curr?.value?.data?.URL : curr?.value?.data?.URL[0]
        }
        
        delete modifiedCurr?.all;

        acc.push(modifiedCurr);

        return acc
    }, []);

  /* get state data and export to XLSX */
  const exportFile = useCallback(() => {
    const wb = utils.book_new();
    const ws = utils.json_to_sheet(convertDataToArrayOfObjects);
    utils.book_append_sheet(wb, ws, "Data");
    writeFileXLSX(wb, "Prices.xlsx");
  }, [pricesData]);

  return (
    <button className={styles.exportBtn}  onClick={exportFile}>Export XLSX</button>
 );
}