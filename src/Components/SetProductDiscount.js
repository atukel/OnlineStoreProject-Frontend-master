import React, { Component } from 'react'
import ProductService from '../services/products.service'
import SetDiscount from '../Components/SetDiscount'
import RemoveDiscount from '../Components/RemoveDiscount'

class SetProductDiscount extends Component {
    componentDidMount() {
        ProductService.getAllCoffeeMachines().then(
            response => {
                this.setState({
                    allProducts: response.data
                });
            },
            error => {
                this.setState({
                    allProducts:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        ).then(
            () => {
                console.log(this.state.allProducts);
            }
        );
    }

    constructor(props) {
        super(props);

        this.state = {
            allProducts: [],
            alreadyDiscounted: false,
            selectedProduct: {},
            selectedProductTest: ""
        }

        this.handleDropdownProductSelection = this.handleDropdownProductSelection.bind(this);
    }

    handleDropdownProductSelection(value) {
        for(var i = 0; i < this.state.allProducts.length; i++)
        {
            if(this.state.allProducts[i].name == value)
            {
                console.log(this.state.allProducts[i]);
                this.setState({
                    alreadyDiscounted: this.state.allProducts[i].discounted,
                    selectedProduct: this.state.allProducts[i]
                });
            }
        }
    }

    render() {
        return (
            <div>
                <select onChange={e => this.handleDropdownProductSelection(e.target.value)}> 
                    <option>Please select a product</option>
                    {this.state.allProducts.map((product) => <option key={product.id} value={product.name}>{product.name}</option>)}
                </select>
                {this.state.alreadyDiscounted ? <RemoveDiscount selectedProduct={this.state.selectedProduct}></RemoveDiscount> : <SetDiscount selectedProduct={this.state.selectedProduct}></SetDiscount>}
            </div>
        )
    }
}

export default SetProductDiscount