import React, { Component } from 'react';
import mrcoffee from '../assets/coffeemachinesforsale/mrcoffee.jpg';
import nespresso from '../assets/coffeemachinesforsale/nespresso.jpg';
import bialetti from '../assets/coffeemachinesforsale/bialetti.jpg';
import cuisinart from '../assets/coffeemachinesforsale/cuisinart.jpg';
import okka from '../assets/coffeemachinesforsale/okka.jpg';
import okka2 from '../assets/coffeemachinesforsale/okka2.jpg';
import okka3 from '../assets/coffeemachinesforsale/okka3.jpg';
import philips from '../assets/coffeemachinesforsale/philips.jpg';
import philips2 from '../assets/coffeemachinesforsale/philips2.jpg';
import history from '../history';
import cartService from '../services/cart.service';
import authService from '../services/auth.service';
import RatingService from '../services/rating.service';

class CoffeeMachineObjects extends Component {
    componentDidMount()
    {
        RatingService.fetchAllRatings().then(
            response => {
                this.setState({
                    fetchRatingsResult: response.data
                });
            },
            error => {
                this.setState({
                    fetchRatingsResult:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        ).then(
            () => {
                console.log("Rating results", this.state.fetchRatingsResult);
            }
        );
    }

    constructor(props) {
        super(props);

        this.getProductPicture = this.getProductPicture.bind(this);
        this.showProductDetails = this.showProductDetails.bind(this);
        this.addSelectedProductToCart = this.addSelectedProductToCart.bind(this);

        this.state = {
            addToCartResult: [],
            fetchRatingsResult: []
        }
    }

    getProductPicture = (pictureId) => {
        console.log(pictureId);
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

    showProductDetails = (index) => {

        localStorage.setItem('productinfo', JSON.stringify(this.props.coffeemachineobjects[index]));
        console.log(JSON.stringify(this.props.coffeemachineobjects[index]));
        history.push("/productdetails");
        window.location.reload();
    }

    addSelectedProductToCart = (index) => {
        var currentUser = authService.getCurrentUser();
        //console.log(currentUser.id);
        //console.log(this.props.coffeemachineobjects[index].id);
        cartService.addToCart(currentUser.id, this.props.coffeemachineobjects[index].id, "1").then(
            response => {
                this.setState({
                    addToCartResult: response.data,
                });
            },
            error => {
                this.setState({
                    addToCartResult:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        ).then(
            () => {
                console.log(this.state.addToCartResult);
                alert("Product added to cart successfully.");
            }
        );
    }

    render() {
        return (
            <div>
                {console.log("Coffee Machine Objects: ", this.props.coffeemachineobjects)}
                {this.props.coffeemachineobjects.map((item, index) => (
                    <li class="span4" style={{ marginLeft: 0, marginRight: 20, marginBottom: 20 }}>
                        <div class="thumbnail">
                            <a class="zoomTool" title="add to cart"><span class="icon-search"></span> QUICK VIEW</a>
                            <a href="product_details.html"><img src={this.getProductPicture(item.id)} alt=""></img></a>
                            <div class="caption">
                                <h5>{item.name}</h5>
                                <h4>
                                    <a class="defaultBtn" title="Click to see product details" onClick={() => this.showProductDetails(index)}><span class="icon-zoom-in"></span></a>
                                    <a class="shopBtn" title="add to cart"><span class="icon-plus" onClick={() => this.addSelectedProductToCart(index)}></span></a>
                                    {item.discounted ? <><span class="pull-right" style={{ borderColor: "" }}> {item.discountedPrice}$ <s>{item.price}$</s></span><span id="notification" type="hidden" style={{ backgroundColor: "red", float: "right" }} class="badge bg-green">-%{(item.price - item.discountedPrice) / item.price * 100}</span></> : <span class="pull-right">{item.price}$</span>}
                                </h4>
                            </div>
                        </div>
                    </li>
                ))}
            </div>
        )
    }
}

export default CoffeeMachineObjects