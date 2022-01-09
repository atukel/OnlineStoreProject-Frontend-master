import React, { Component } from 'react';
import mrcoffee from '../assets/coffeemachinesforsale/mrcoffee.jpg'
import nespresso from '../assets/coffeemachinesforsale/nespresso.jpg'
import bialetti from '../assets/coffeemachinesforsale/bialetti.jpg'
import cuisinart from '../assets/coffeemachinesforsale/cuisinart.jpg'
import CartService from '../services/cart.service'
import AuthService from '../services/auth.service'

class CartItems extends Component {

    componentDidMount() {
        var currentUser = AuthService.getCurrentUser();
        CartService.getCheckedOutItems(currentUser.id).then(
            response => {
                this.setState({
                    cartitems: response.data
                });
            },
            error => {
                this.setState({
                    cartitems:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        ).then(
            () => {
                console.log("cartitems", this.state.cartitems);
            }
        ).then(
            () => {
                this.state.cartitems.forEach(cartitem => {
                    this.getQuantityOfProduct(cartitem.id)
                });
            }
        );
    }

    constructor(props) {
        super(props);

        this.state =
        {
            cartitems: [],
            quantity: [],
            quantityCollector: []
        };

        this.getProductPicture = this.getProductPicture.bind(this);
        this.getQuantityOfProduct = this.getQuantityOfProduct.bind(this);
    }

    getProductPicture = (pictureId) => {

        if (pictureId === 1) {
            return mrcoffee;
        }
        else if (pictureId === 2) {
            return cuisinart;
        }
        else if (pictureId === 3) {
            return nespresso;
        }
        else if (pictureId === 4) {
            return bialetti;
        }
    }

    getQuantityOfProduct = (productId) => {
        var currentUser = AuthService.getCurrentUser();
        CartService.getUserQuantityOfProduct(currentUser.id, productId).then(
            response => {
                this.setState({
                    quantity: response.data
                });
            },
            error => {
                this.setState({
                    quantity:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        ).then(
            () => {
                console.log(this.state.quantity);
            }
        ).then(
            () => {
                let beforeQuantities = [...this.state.quantityCollector]
                beforeQuantities.push(this.state.quantity[0].quantity);
                this.setState({quantityCollector: beforeQuantities});
            }
        );
    }

    render() {
        return (
            <div>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Description</th>
                        <th>Distributor</th>
                        <th>Warranty Status</th>
                        <th>Unit price</th>
                        <th>Qty </th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.cartitems.map((item, index) => (
                        <tr>
                            <div><td><img width="100" src={this.getProductPicture(item.id)} alt=""></img></td></div>
                            <td>{item.description}</td>
                            <td> {item.distributorInfo} </td>
                            <td><span class="shopBtn"><span>{item.warrantyStatus}</span></span> </td>
                            <td>{item.price}$</td>
                            <td>
                                <input class="span1" style={{ width: 34 }} placeholder="1" size="16" type="text" value={this.state.quantityCollector[index]} readOnly></input>
                                <div class="input-append">
                                    <button class="btn btn-mini" type="button">-</button><button class="btn btn-mini" type="button"> + </button><button class="btn btn-mini btn-danger" type="button" ><span class="icon-remove"></span></button>
                                </div>
                            </td>
                            <td>{parseInt(this.state.quantityCollector[index]) * parseInt(item.price)}$</td>
                        </tr>
                    ))}
                </tbody>
            </div>
        )
    }
}

export default CartItems;