import React, { useEffect, Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCategories } from '../../../actions/category'

const CategoryList = ({ category: { categories, loading }, getCategories, handleCategory }) => {

    const handleClick = (categoryId, name) => {
        handleCategory(categoryId, name);
    }


    useEffect(() => {
        getCategories();
    }, []);

    return (loading || !categories ? "" : <Fragment>
        <div className="col-md-3">
            <ul className="list-group category-list">
                {
                    categories.map(ctr => (
                        <li className="list-group-item py-3 text-orange" key={ctr._id} onClick={() => handleClick(ctr._id, ctr.name)}>
                            {ctr.name}
                        </li>
                    ))
                }
            </ul>
        </div>
    </Fragment>

    )
}

CategoryList.propTypes = {
    getCategories: PropTypes.func.isRequired,
    category: PropTypes.object.isRequired,
    handleCategory: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    category: state.category
})

export default connect(mapStateToProps, { getCategories })(CategoryList)
