import React, { Component } from 'react'
import CategoryServices from '../services/categories.service'

class Category extends Component {
    componentDidMount()
    { 
        CategoryServices.fetchAllCategories().then(
            response => {
                this.setState({
                    categories: response.data
                });
            },
            error => {
                this.setState({
                    categories:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        );
        
    }

    constructor(props) {
        super(props);

        this.state = {
            categories: []
        };

        this.handleCategoryClick = this.handleCategoryClick.bind(this);
    }

    handleCategoryClick = item => 
    {
        CategoryServices.getProductsOfCategory(item.id).then(
            response => {
                console.log(response.data);
                let productsOfCategory = [];
                for(var i = 0; i < response.data.length; i++)
                {
                    productsOfCategory.push(response.data[i].product);
                }
                this.props.categoryClickHandler(productsOfCategory);
            },
            error => {
                this.props.categoryClickHandler(error);
            }
        );
    }

    render() {
        return (
            <div>
                {this.state.categories.map((item, index) => (
                    <li><a align="left" onClick={() => this.handleCategoryClick(item)} ><span class="icon-chevron-right"></span>{item.categoryName}</a></li>
                ))}
            </div>
        )
    }
}

export default Category