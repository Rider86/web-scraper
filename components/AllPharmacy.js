import DataTable from 'react-data-table-component';
import styles from '../styles/Home.module.css';
import Export from './Export';


const AllPharmacy = ({ data }) => {
console.log(data);
    const columns = [
        {
            name: 'Name',
        selector: (row, index) => {
              return  <p className={styles.title} >{data?.[1]?.productNames?.map(el=>el[0])[index] ?? '...'}</p>
            },
        width: '15vw',
        
        },
   
        {
            name: 'Afya',
          selector: (row) => {
            const product = row?.value?.[0]?.value?.find(el => el?.value?.data.hasOwnProperty('afya'));
            return <p className={styles.all}><span className={styles.priceAll}>{product ? product?.value?.data?.afya?.price : '...'}</span>
              <span className={styles.promoPriceAll}>{product ? product?.value?.data?.afya?.promoPrice : '...'}</span></p>
          },
          width: '9vw',
          padding: '0px'
      },
      {
        name: '366',
      selector: (row ) => {
        const product = row?.value?.[0]?.value?.find(el => el?.value?.data.hasOwnProperty('treeSixSix'));
        return <p className={styles.all}>
          <span className={styles.priceAll}>{product?.value?.data?.treeSixSix?.price ?? '...'}</span>
          <span className={styles.promoPriceAll}>{product?.value?.data?.treeSixSix?.promoPrice ?? '...'}</span>
        </p>
        },
        width: '9vw',
        padding: '0px'
      },
      {
        name: 'Remedium',
      selector: (row ) => {
        const product = row?.value?.[0]?.value?.find(el => el?.value?.data.hasOwnProperty('remedium'));
        return <p className={styles.all}>
          <span className={styles.priceAll}>{product?.value?.data?.remedium?.price ?? '...'}</span>
          <span className={styles.promoPriceAll}>{product?.value?.data?.remedium?.promoPrice ?? '...'}</span>
        </p>
        },
        width: '9vw',
        padding: '0px'
      },
      {
        name: 'Optima',
      selector: (row ) => {
        const product = row?.value?.[0]?.value?.find(el => el?.value?.data.hasOwnProperty('optima'));
        return <p className={styles.all}>
          <span className={styles.priceAll}>{product?.value?.data?.optima?.price ?? '...'}</span>
          <span className={styles.promoPriceAll}>{product?.value?.data?.optima?.promoPrice ?? '...'}</span>
        </p>
        },
        width: '9vw',
        padding: '0px'
      },
      {
        name: 'Galen',
      selector: (row ) => {
        const product = row?.value?.[0]?.value?.find(el => el?.value?.data.hasOwnProperty('galen'));
        return <p className={styles.all}>
          <span className={styles.priceAll}>{product?.value?.data?.galen?.price ?? '...'}</span>
          <span className={styles.promoPriceAll}>{product?.value?.data?.galen?.promoPrice ?? '...'}</span>
        </p>
        },
        width: '9vw',
        padding: '0px'
      },
      {
        name: 'Epharm',
      selector: (row ) => {
        const product = row?.value?.[0]?.value?.find(el => el?.value?.data.hasOwnProperty('epharm'));
        return <p className={styles.all}>
          <span className={styles.priceAll}>{product?.value?.data?.epharm?.price ?? '...'}</span>
          <span className={styles.promoPriceAll}>{product?.value?.data?.epharm?.promoPrice ?? '...'}</span>
        </p>
        },
        width: '9vw',
        padding: '0px'
  },
  {
    name: 'Factors',
  selector: (row ) => {
    const product = row?.value?.[0]?.value?.find(el => el?.value?.data.hasOwnProperty('factors'));
    return <p className={styles.all}>
      <span className={styles.priceAll}>{product?.value?.data?.factors?.price ?? '...'}</span>
      <span className={styles.promoPriceAll}>{product?.value?.data?.factors?.promoPrice ?? '...'}</span>
    </p>
    },
    width: '9vw',
    padding: '0px'
},
{
  name: 'RedApple',
selector: (row ) => {
  const product = row?.value?.[0]?.value?.find(el => el?.value?.data.hasOwnProperty('redApple'));
  return <p className={styles.all}>
    <span className={styles.priceAll}>{product?.value?.data?.redApple?.price ?? '...'}</span>
    <span className={styles.promoPriceAll}>{product?.value?.data?.redApple?.promoPrice ?? '...'}</span>
  </p>
  },
  width: '9vw',
  padding: '0px'
},
{
  name: 'MyPharmacy',
selector: (row ) => {
  const product = row?.value?.[0]?.value?.find(el => el?.value?.data.hasOwnProperty('mypharmacy'));
  return <p className={styles.all}>
    <span className={styles.priceAll}>{product?.value?.data?.mypharmacy?.price ?? '...'}</span>
    <span className={styles.promoPriceAll}>{product?.value?.data?.mypharmacy?.promoPrice ?? '...'}</span>
  </p>
  },
  width: '9vw',
  padding: '0px'
      },
      {
        name: 'Medea',
      selector: (row ) => {
        const product = row?.value?.[0]?.value?.find(el => el?.value?.data.hasOwnProperty('medea'));
        return <p className={styles.all}>
          <span className={styles.priceAll}>{product?.value?.data?.medea?.price ?? '...'}</span>
          <span className={styles.promoPriceAll}>{product?.value?.data?.medea?.promoPrice ?? '...'}</span>
        </p>
        },
        width: '9vw',
        padding: '0px'
      },
    ];
    
    const tableCustomStyles = {
        headCells: {
          style: {
            fontSize: '16px',
            fontWeight: 'bold',
            justifyContent: 'center',
            backgroundColor: '#FFA500',
            margin: '0px'
          },
      },
      rows: {
        style: {
            height: '20px', // override the row height
        },
    },
     
      }


  
    return (
        <div className={styles.container}>
            <main>
                <DataTable
                    customStyles={tableCustomStyles}
                    columns={columns}
                    data={data?.[0]?.details}
                    highlightOnHover
                /> 
            </main>
            {/* <Export pricesData={data} /> */}
        </div>
    )
}
export default AllPharmacy;