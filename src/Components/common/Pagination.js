import React from 'react'

const Pagination = ({ totalItems, itemsPerPage, paginate }) => {
    const pageNubers = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNubers.push(i);
    }

    return (
        <div className="container">
            <div className="d-flex mx-auto">
                {
                    pageNubers.map(number => (
                        <ul className="pagination" key={number}>
                            <li className={`page-item previous-item`}>
                                <button  onClick={()=>paginate(number)} className="page-link text-orange">{number}</button>
                            </li>
                        </ul>
                    ))
                }
            </div>
            <hr />
        </div>
    )
}

export default Pagination
