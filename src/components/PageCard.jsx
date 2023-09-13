import '../assets/styles/pageCar.css';
const PageCard = ({ quantyty, firstItem, setFirstItem,  qtyResidts }) => {
    
    let pageNumbers = [];
    let limit = Math.ceil(qtyResidts / quantyty)

    for (let i=1; i <= limit; i++) {
        pageNumbers.push(i);
    }


    const sum = () => {
    setFirstItem(firstItem + 1 )
    }
    const rest = () => {
    setFirstItem(firstItem - 1 )
    } 

  return (
    <div className='container-pagination'>
          <button onClick={rest} disabled={firstItem === 1} className='pagination__btn previous'>Previous</button>

          <div className='page-actual'>
          {
            pageNumbers.map((page, i) => {
                return <button key={i} onClick={ () => setFirstItem(page)} 
                className={`pagination__btn actual ${page === firstItem ? 'is-current' :" " }`}> {page} </button>
            })
          }
          </div>

          <button onClick={sum} disabled={firstItem >= limit} className='pagination__btn next'>Next</button>
        </div>
  )
}

export default PageCard