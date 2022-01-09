import React, { Component } from 'react'
import SalesManagerServices from '../services/salesmanager.service'

class RemoveDiscount extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            removeDiscountResponse: ""
        };

        this.handleRemoveDiscountButtonClick = this.handleRemoveDiscountButtonClick.bind(this);
    }

    handleRemoveDiscountButtonClick = (productId) => {
        SalesManagerServices.removeDiscountFromProduct(productId).then(
            response => {
                this.setState({
                    removeDiscountResponse: response.data
                });
            },
            error => {
                this.setState({
                    removeDiscountResponse:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        ).then(
            () => {
                alert(this.state.removeDiscountResponse);
                window.location.reload(false);
            }
        );
    }

    render()
    {
        return(
            <div>
                <p> The product you selected is already in discount by {100 - (100 * this.props.selectedProduct.discountedPrice / this.props.selectedProduct.price)}%. Please remove the discount first. </p>
                <button class="shopBtn" onClick={() => this.handleRemoveDiscountButtonClick(this.props.selectedProduct.id)}>Remove Discount</button>
            </div>
        )
    }
}

export default RemoveDiscount