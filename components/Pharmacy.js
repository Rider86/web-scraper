import DataTable from 'react-data-table-component';
import styles from '../styles/Home.module.css';


const Pharmacy = ({data}) => {

    const columns = [
        {
            name: 'Name',
            selector: (row, index) => {
                return <a className={styles.title} href={row?.value?.data?.URL[0]} target='blank'>{`${index + 1}.`} {row?.value?.data?.title || `No data`}</a>
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
                return <p className={styles.p}>{row?.value?.data?.price || row?.value?.data?.oldPrice || `No data`}</p>
            },
        },
        {
            name: 'Promo Price',
            selector: (row) => {
                return <p className={styles.p}>{row?.value?.data?.promoPrice || `No data`}</p>
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
           
        </div>
    )
}
export default Pharmacy;