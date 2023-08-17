import DataTable from 'react-data-table-component';
import styles from '../styles/Home.module.css';
import Export from './Export';


const Pharmacy = ({data}) => {
    const columns = [
        {
            name: 'Name',
            selector: (row, index) => {
                return <a className={styles.title} href={ row?.value?.data?.all ? row?.value?.data?.URL :row?.value?.data?.URL[0] || row?.value?.data?.URL} target='blank'>{`${index + 1}.`} {row?.value?.data?.title || `...`}</a>
            },
            width: '65vw',
        },
        {
            name: '',
            selector: () => {
            },
        },
        {
            name: 'Price',
            selector: (row) => {
                return <p className={styles.p}>{row?.value?.data?.price || row?.value?.data?.oldPrice || `...`}</p>
            },
        },
        {
            name: 'Promo Price',
            selector: (row) => {
                return <p className={styles.promoPrice}>{row?.value?.data?.promoPrice || `...`}</p>
            },
        },
   
    ];
    
    const tableCustomStyles = {
        headCells: {
          style: {
            fontSize: '20px',
            fontWeight: 'bold',
            paddingLeft: '0 8px',
            justifyContent: 'center',
            backgroundColor: '#FFA500'
          },
        },
        cells: {
            style: {
              paddingLeft: '8px', // override the cell padding for data cells
              paddingRight: '8px',
            },
          },
      }


  
    return (
        <div className={styles.container}>
            <main>
                <DataTable
                    customStyles={tableCustomStyles}
                    columns={columns}
                    data={data}
                    highlightOnHover
                /> 
            </main>
            <Export pricesData={data} />
        </div>
    )
}
export default Pharmacy;