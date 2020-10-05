import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import CategoryList from './CategoryList'
import SearchFilter from '../../common/SearchFilter'
import Pagination from '../../common/Pagination'
import ContactForm from './contactForm'
import DisplayProducts from './DisplayProducts'
import { connect } from 'react-redux'
import { getProducts } from '../../../actions/product'

const Products = ({ product: { products, loading }, getProducts }) => {

    const [categoryId, setCategoryId] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(8);

    const productsByCategory = (ctrId, name) => {
        setCategoryId(ctrId);
        setCategoryName(name);
    };

    const handleSearchFilter = searchingTerm => {
        setSearchTerm(searchingTerm);
    }

    useEffect(() => {
        const variables = {
            categoryId: categoryId,
            searchTerm: searchTerm
        }
        getProducts(variables);
    }, [categoryId, searchTerm])

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products && products.slice(indexOfFirstProduct, indexOfLastProduct);

    const handlePagination = pageNumber => setCurrentPage(pageNumber);

    return (
        <Fragment>
            <div className="container">
                <div className="row">
                    {/* Specify Category which is clicked*/}
                    <div className="col-md-6 ">
                        <div className="row selected-category">
                            <p>Shopping Home  <i className="fa fa-angle-right"></i></p>
                            <p className="ml-4">Categories  <i className="fa fa-angle-right "></i></p>
                            {
                                categoryName && <p className="ml-4 text-orange">{categoryName} <i className="fa fa-angle-right"></i></p>
                            }
                        </div>
                    </div>
                    {/* Search Component */}

                    <SearchFilter handleSearch={searchingTerm => handleSearchFilter(searchingTerm)} />

                </div>
            </div>
            {/* Pagination */}

            <Pagination totalItems={products.length} itemsPerPage={productsPerPage} paginate={handlePagination} />
            <div className="container my-3">
                <div className="row">
                    {/* Category List */}
                    <CategoryList handleCategory={(categoryId, name) => productsByCategory(categoryId, name)} />

                    {/* List Of Products */}
                    <DisplayProducts products={currentProducts} loading={loading} />
                </div>
            </div>
            <ContactForm />
        </Fragment>
    )
}

Products.propTypes = {
    getProducts: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    product: state.product
})

export default connect(mapStateToProps, { getProducts })(Products)
