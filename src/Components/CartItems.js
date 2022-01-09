import React, { Component } from 'react';
import mrcoffee from '../assets/coffeemachinesforsale/mrcoffee.jpg'
import nespresso from '../assets/coffeemachinesforsale/nespresso.jpg'
import bialetti from '../assets/coffeemachinesforsale/bialetti.jpg'
import cuisinart from '../assets/coffeemachinesforsale/cuisinart.jpg'
import okka2 from '../assets/coffeemachinesforsale/okka2.jpg';
import okka3 from '../assets/coffeemachinesforsale/okka3.jpg';
import philips from '../assets/coffeemachinesforsale/philips.jpg';
import philips2 from '../assets/coffeemachinesforsale/philips2.jpg';
import okka from '../assets/coffeemachinesforsale/okka.jpg'
import CartService from '../services/cart.service'
import AuthService from '../services/auth.service'

class CartItems extends Component {

    componentDidMount() {
        var currentUser = AuthService.getCurrentUser();
        CartService.getCheckedOutItems(currentUser.id).then(
            response => {
                this.setState({
                    cartitems: this.state.cartitems.concat(response.data)
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
        );
    }

    constructor(props) {
        super(props);

        this.state =
        {
            cartitems: [],
            decrementResponse: "",
            removeResponse: "",
            incrementResponse: ""
        };

        this.getProductPicture = this.getProductPicture.bind(this);
        this.decrementQuantityofProduct = this.decrementQuantityofProduct.bind(this);
        this.removeProductFromUsersCart = this.removeProductFromUsersCart.bind(this);
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
        else if(pictureId === 5) {
            return okka;
        }
        else if(pictureId === 6) {
            return okka2;
        }
        else if(pictureId === 7) {
            return okka3;
        }
        else if(pictureId === 8) {
            return philips;
        }
        else if(pictureId === 9) {
            return philips;
        }
    }


    removeProductFromUsersCart = (productId) => {
        var currentUser = AuthService.getCurrentUser();
        CartService.removeFromCart(currentUser.id, productId).then(
            response => {
                this.setState({
                    removeResponse: response.data
                });
            },
            error => {
                this.setState({
                    removeResponse:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        ).then(
            () => {
                console.log(this.state.removeResponse);
            }
        ).then(
            () => {
                window.location.reload(false);
            }
        );
    }

    incrementQuantityofProduct = (productId) => {
        var currentUser = AuthService.getCurrentUser();
        CartService.incrementUserQuantityOfProduct(currentUser.id, productId).then(
            response => {
                this.setState({
                    incrementResponse: response.data
                });
            },
            error => {
                this.setState({
                    incrementResponse:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        ).then(
            () => {
                console.log(this.state.incrementResponse);
            }
        ).then(
            () => {
                window.location.reload(false);
            }
        );
    }

    decrementQuantityofProduct = (productId) => {
        var currentUser = AuthService.getCurrentUser();
        CartService.decrementUserQuantityOfProduct(currentUser.id, productId).then(
            response => {
                this.setState({
                    decrementResponse: response.data
                });
            },
            error => {
                this.setState({
                    decrementResponse:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        ).then(
            () => {
                console.log(this.state.decrementResponse);
            }
        ).then(
            () => {
                window.location.reload(false);
            }
        );
    }

    render() {
        return (
            <div>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Product Name</th>
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
                                <div><td><img width="100" src={this.getProductPicture(item.product.id)} alt=""></img></td></div>
                                <td>{item.product.name}</td>
                                <td>{item.product.description}</td>
                                <td> {item.product.distributorInfo} </td>
                                <td><span class="shopBtn"><span>{item.product.warrantyStatus}</span></span> </td>
                                <td>{item.selectProductPrice}$</td>
                                <td>
                                    <input class="span1" style={{ width: 34 }} placeholder="1" size="16" type="text" value={item.quantity} readOnly></input>
                                    <div class="input-append">
                                        <button class="btn btn-mini" type="button" onClick={() => this.decrementQuantityofProduct(item.product.id)}>-</button><button class="btn btn-mini" type="button" onClick={() => this.incrementQuantityofProduct(item.product.id)}> + </button><button class="btn btn-mini btn-danger" type="button" onClick={() => this.removeProductFromUsersCart(item.product.id)}><span class="icon-remove"></span></button>
                                    </div>
                                </td>
                                <td>{parseInt(item.quantity) * parseInt(item.selectProductPrice)}$</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default CartItems;