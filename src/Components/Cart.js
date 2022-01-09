import React, { Component } from 'react'
import '../style.css'
import '../assets/font-awesome/css/font-awesome.css'
import '../assets/css/bootstrap.css'
import CartItems from './CartItems'
import AuthService from '../services/auth.service'
import CartService from '../services/cart.service'
import history from '../history'

class Cart extends Component {
    constructor(props) {
        super(props);

        this.state =
        {
            checkoutResponse: "",
            applyCouponResponse: []
        };

        this.finalizeCheckout = this.finalizeCheckout.bind(this);
        this.handleContinueShoppingButton = this.handleContinueShoppingButton.bind(this);
        this.handleApplyCouponButton = this.handleApplyCouponButton.bind(this);
    }

    finalizeCheckout = () => {
        var currentUser = AuthService.getCurrentUser();
        CartService.finalizeCheckout(currentUser.id).then(
            response => {
                this.setState({
                    checkoutResponse: response.data
                });
            },
            error => {
                this.setState({
                    checkoutResponse:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        ).then(
            () => {
                console.log(this.state.checkoutResponse);
            }
        ).then(
            () => {
                if(this.state.checkoutResponse == 180)
                {
                    alert("Checkout is successful. Please check your email for incoming invoices.");
                }
                
                this.props.history.push("/home");
                window.location.reload(false);
            }
        );
    }

    handleContinueShoppingButton = () => {
        history.push("/home");
        window.location.reload();
    }

    handleApplyCouponButton = (couponString) => {
        CartService.applyCouponIfAvailable(couponString).then(
            response => {
                this.setState({
                    applyCouponResponse: response.data
                });
            },
            error => {
                this.setState({
                    applyCouponResponse:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        ).then(
            () => {
                console.log("COUPON", this.state.applyCouponResponse);
            }
        );
    }

    render() {
        return (
            <div>
                <div class="navbar">
                    <div class="navbar-inner">
                        <div class="container">
                            <a data-target=".nav-collapse" data-toggle="collapse" class="btn btn-navbar">
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                            </a>
                            <div class="nav-collapse">
                                <ul class="nav">
                                    <li onClick={() => this.handleContinueShoppingButton()}><a>Home	</a></li>

                                </ul>

                            </div>
                        </div>
                    </div>
                </div>

                <div class="row" style={{ marginLeft: 20, marginRight: 20 }}>
                    <div>
                        <ul class="breadcrumb">
                            <li onClick={() => this.handleContinueShoppingButton()}><a>Home</a> <span class="divider">/</span></li>
                            <li class="active">Check Out</li>
                        </ul>
                        <div class="well well-small">
                            <h1>Check Out</h1>
                            <hr class="soften" />
                            <CartItems></CartItems>
                            <table class="table table-bordered">
                                <tbody>
                                    <tr>
                                        <td>
                                            <form class="form-inline">
                                                <label style={{marginRight: 10}}> Coupon Code: </label>
                                                <input id="couponstringinput" style={{marginRight: 10}} type="text" class="input-medium" placeholder="CODE"></input>
                                                <button type="submit" class="shopBtn" onClick={() => this.handleApplyCouponButton(document.getElementById("couponstringinput").value)}> Apply Coupon</button>
                                            </form>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                            <a class="shopBtn btn-large" onClick={() => this.handleContinueShoppingButton()}><span class="icon-arrow-left"></span> Continue Shopping </a>
                            <a class="shopBtn btn-large pull-right" onClick={() => this.finalizeCheckout()}>Checkout <span class="icon-arrow-right"></span></a>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}





export default Cart