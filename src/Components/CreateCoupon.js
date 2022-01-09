import React, { Component } from 'react'
import ProductService from '../services/products.service'
import SalesManagerService from '../services/salesmanager.service'

class CreateCoupon extends Component {
    componentDidMount() {
        ProductService.getAllCoffeeMachines().then(
            response => {
                this.setState({
                    coffeeMachineResults: response.data
                });
            },
            error => {
                this.setState({
                    coffeeMachineResults:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        ).then(
            () => {
                console.log(this.state.coffeeMachineResults);
            }
        );
    }

    constructor(props) {
        super(props);

        this.state = {
            coffeeMachineResults: [],
            chosenProductId: 0,
            createCouponResponse: []
        };

        this.handleDropdownProductSelection = this.handleDropdownProductSelection.bind(this);
        this.handleCreateCouponButton = this.handleCreateCouponButton.bind(this);
    }

    handleDropdownProductSelection = (value) => {
        console.log(value);
        this.setState({
            chosenProductId: value
        });
    }

    handleCreateCouponButton = () =>
    {
        console.log(document.getElementById("couponStringInput").value,document.getElementById("percentageInput").value,this.state.chosenProductId);
        SalesManagerService.createCoupon(document.getElementById("couponStringInput").value, 
                                        document.getElementById("percentageInput").value,
                                        this.state.chosenProductId).then(
            response => {
                this.setState({
                    createCouponResponse: response.data
                });
            },
            error => {
                this.setState({
                    createCouponResponse:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        ).then(
            () => {
                console.log(this.state.createCouponResponse);
            }
        );
    }

    render() {
        return (
            <div>
                <form class="form-inline">
                    <select onChange={e => this.handleDropdownProductSelection(e.target.value)}>
                        <option>Please select a product</option>
                        {this.state.coffeeMachineResults.map((product) => <option key={product.id} value={product.id}>{product.name}</option>)}
                    </select>
                    <br></br>
                    <label style={{ width: 159 }}> Discount %: </label>
                    <input id="percentageInput" type="number" class="input-medium" placeholder="%" min={1} max={100}></input><br></br>
                    <label style={{ width: 159 }}> Coupon String: </label>
                    <input id="couponStringInput" type="text" class="input-medium" placeholder="Coupon String..."></input><br></br>
                    <button type="submit" class="shopBtn" onClick={() => this.handleCreateCouponButton()}>Create Coupon</button>
                </form>
            </div>
        )
    }
}

export default CreateCoupon;