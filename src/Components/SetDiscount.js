import React, { Component } from 'react'
import SalesManagerServices from '../services/salesmanager.service'

class SetDiscount extends Component {
    constructor(props) {
        super(props);

        this.state = {
            setDiscountResponse: ""
        };

        this.handleSetDiscountButtonClick = this.handleSetDiscountButtonClick.bind(this);
    }

    handleSetDiscountButtonClick = (productId, discountPercentage) => {
        if (!productId) {
            alert("Please select a product first.");
        }
        else {
            console.log("handle button", productId, discountPercentage);
            SalesManagerServices.setDiscountToProduct(productId, discountPercentage).then(
                response => {
                    this.setState({
                        setDiscountResponse: response.data
                    });
                },
                error => {
                    this.setState({
                        setDiscountResponse:
                            (error.response && error.response.data) ||
                            error.message ||
                            error.toString()
                    });
                }
            ).then(
                () => {
                    alert(this.state.setDiscountResponse);
                }
            );
        }
    }

    render() {
        return (
            <div>
                <form class="form-inline">
                    <label style={{ width: 159 }}> Discount %: </label>
                    <input id="percentageInput" type="number" class="input-medium" placeholder="%"></input><br></br>
                    <button type="submit" class="shopBtn" onClick={() => this.handleSetDiscountButtonClick(this.props.selectedProduct.id, document.getElementById("percentageInput").value)}> Submit Discount</button>
                </form>
            </div>
        )
    }
}

export default SetDiscount