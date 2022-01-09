import React, { Component } from 'react';
import '../style.css';
import '../assets/font-awesome/css/font-awesome.css';
import '../assets/css/bootstrap.css';
import "../services/products.service";
import ProductsService from '../services/products.service';
import Category from './Category'
import AuthService from '../services/auth.service'
import CartService from '../services/cart.service'
import ReviewsService from '../services/reviews.service'
import RatingService from '../services/rating.service'
import CoffeeMachineObjects from './CoffeeMachineObjects'
import mrcoffee from '../assets/coffeemachinesforsale/mrcoffee.jpg'
import nespresso from '../assets/coffeemachinesforsale/nespresso.jpg'
import bialetti from '../assets/coffeemachinesforsale/bialetti.jpg'
import cuisinart from '../assets/coffeemachinesforsale/cuisinart.jpg'
import okka from '../assets/coffeemachinesforsale/okka.jpg'
import okka2 from '../assets/coffeemachinesforsale/okka2.jpg';
import okka3 from '../assets/coffeemachinesforsale/okka3.jpg';
import philips from '../assets/coffeemachinesforsale/philips.jpg';
import philips2 from '../assets/coffeemachinesforsale/philips2.jpg';

class Product_Details extends Component {
    componentDidMount() {
        var productInfo = JSON.parse(localStorage.getItem('productinfo'));
        console.log(productInfo);
        this.setState({
            productInfo: productInfo
        });

        ReviewsService.getReviewsOfProduct(productInfo.id).then(
            response => {
                this.setState({
                    productReviews: response.data
                });
            },
            error => {
                this.setState({
                    productReviews:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        ).then(
            () => {
                console.log("product reviews", this.state.productReviews);
            }
        );

        RatingService.fetchRatingsOfProduct(productInfo.id).then(
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

        RatingService.checkIfUserSubmittedProduct(AuthService.getCurrentUser().id, productInfo.id).then(
            response => {
                this.setState({
                    isUserSubmittedRating: response.data
                });
            },
            error => {
                this.setState({
                    isUserSubmittedRating:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        ).then(
            () => {
                console.log("isSubmitted", this.state.isUserSubmittedRating);
            }
        );
    }

    constructor(props) {
        super(props);

        this.state = {
            searchString: "",
            coffeeMachineResults: "",
            productInfo: [],
            addToCartResult: [],
            productReviews: [],
            submitReviewResults: [],
            fetchRatingsResult: [],
            ratingSubmitResults: [],
            isUserSubmittedRating: []
        };

        this.handleAddToCartButton = this.handleAddToCartButton.bind(this);
        this.getProductPicture = this.getProductPicture.bind(this);
        this.handleReviewSubmitButton = this.handleReviewSubmitButton.bind(this);
        this.handleHeaderHomeButton = this.handleHeaderHomeButton.bind(this);
        this.handleUsernameButtonClick = this.handleUsernameButtonClick.bind(this);
        this.handleLogoutButton = this.handleLogoutButton.bind(this);
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

    handleSearchBarChange = (event) => {
        this.setState({
            searchString: event.target.value
        });
    }

    handleLogoutButton = () => {
        AuthService.logout();
        this.props.history.push("/");
        window.location.reload();
    }

    handleQuantityPlusButton = () => {

    }

    handleAddToCartButton = (productid, quantity) => {
        var currentUser = AuthService.getCurrentUser();
        //console.log(currentUser.id);
        //console.log(this.props.coffeemachineobjects[index].id);
        CartService.addToCart(currentUser.id, productid, quantity).then(
            response => {
                this.setState({
                    addToCartResult: response.data
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

    handleReviewSubmitButton = (productId, reviewText) => {
        if (!reviewText) {
            alert("Please write a review to submit.");
        }
        else {
            var currentUser = AuthService.getCurrentUser();
            ReviewsService.submitReview(productId, currentUser.id, reviewText).then(
                response => {
                    this.setState({
                        submitReviewResults: response.data
                    });
                },
                error => {
                    this.setState({
                        submitReviewResults:
                            (error.response && error.response.data) ||
                            error.message ||
                            error.toString()
                    });
                }
            ).then(
                () => {
                    console.log(this.state.submitReviewResults);
                    alert("Your review submitted successfully.");
                    window.location.reload(false);
                }
            );
        }
    }

    handleHeaderHomeButton = () => {
        this.props.history.push("/home");
        window.location.reload();
    }

    handleUsernameButtonClick = () => {
        this.props.history.push("/profile");
        window.location.reload();
    }

    handleHeaderManagementButton = () => {
        if (AuthService.getCurrentUser().roles[0] == "ROLE_ADMIN") {
            this.props.history.push("/salesmanager");
            window.location.reload();
        }
        else if (AuthService.getCurrentUser().roles[0] == "ROLE_MODERATOR") {
            this.props.history.push("/productmanager");
            window.location.reload();
        }
        else if (AuthService.getCurrentUser().roles[0] == "ROLE_USER") {
            this.props.history.push("/profile");
            window.location.reload();
        }
    }

    handleSubmitRatingButton = () => {
        if (!document.getElementById("ratingInput").value) {
            alert("Please select a rating number to submit.");
        }
        else {
            RatingService.insertRatingToProduct(this.state.productInfo.id,
                AuthService.getCurrentUser().id,
                document.getElementById("ratingInput").value).then(
                    response => {
                        this.setState({
                            ratingSubmitResults: response.data
                        });
                    },
                    error => {
                        this.setState({
                            ratingSubmitResults:
                                (error.response && error.response.data) ||
                                error.message ||
                                error.toString()
                        });
                    }
                ).then(
                    () => {
                        console.log(this.state.ratingSubmitResults);
                        if (this.state.ratingSubmitResults == "This account has already submitted a rating on this product.") {
                            alert(this.state.ratingSubmitResults)
                        }
                        else{
                            window.location.reload(false);
                        }
                    }
                );
        }
    }

    render() {
        return (
            <div >
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
                                    <li><a onClick={() => this.handleHeaderHomeButton()}>Home	</a></li>
                                    <li><a style={{ marginRight: 1020 }} onClick={() => this.handleHeaderManagementButton()}>Management	</a></li>
                                    <ul class="nav pull-right">
                                        <li onClick={() => this.handleUsernameButtonClick()}><a>{AuthService.getCurrentUser().username}</a></li>
                                        <li onClick={() => this.handleLogoutButton()}><a>Logout	</a></li>
                                    </ul>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div style={{ marginLeft: 40, marginRight: 40 }} class="well well-small">
                        <h3><a class="btn btn-mini pull-right" href="/cart" title="View more">Go To Cart<span class="icon-plus"></span></a> Product Details  </h3>
                        <hr class="soften" />
                        <div class="row-fluid">
                            <img class="span2" src={this.getProductPicture(this.state.productInfo.id)}></img>
                            <div class="span7">
                                <h3>Name of the Item: {this.state.productInfo.name}</h3>
                                <hr class="soft" />

                                <form class="form-vertical qtyFrm">
                                    <div class="control-group">
                                        {this.state.productInfo.discounted ? <label class="control-label"><span><b style={{ fontSize: 20 }}>Discounted! ${this.state.productInfo.discountedPrice}</b></span></label> : <label class="control-label"><span style={{ fontSize: 18 }}>${this.state.productInfo.price}</span></label>}
                                        <div class="controls">
                                            <label class="control-label"><span style={{ fontSize: 18 }}>Quantity:</span></label>
                                            <input id="quantityInput" class="span1" style={{ width: 60 }} placeholder="1" size="16" type="number"></input>
                                        </div>
                                    </div>

                                    <div class="control-group">
                                        <label class="control-label"><span style={{ fontSize: 18 }}>Description</span></label>
                                        <div class="controls">
                                            <label class="control-label"><span style={{ fontSize: 18 }}>{this.state.productInfo.description}</span></label>
                                        </div>
                                    </div>
                                    <h4>{this.state.productInfo.quantityStocks} items in stock</h4>
                                    <p></p>
                                    <button class="shopBtn" onClick={() => this.handleAddToCartButton(this.state.productInfo.id, document.getElementById("quantityInput").value)}><span class=" icon-shopping-cart"></span> Add to cart</button>
                                </form>
                                <p>Rating: {Number(this.state.fetchRatingsResult.averageRating).toFixed(2)} out of 5</p>
                                {this.state.isUserSubmittedRating.length > 0 ? <p>You have already submitted a rating of {this.state.isUserSubmittedRating[0].rating}</p> : <div>
                                    <input id="ratingInput" class="span1" style={{ width: 60 }} placeholder="1" size="1" type="number" min="1" max="5"></input>
                                    <br></br>
                                    <button class="shopBtn" onClick={() => this.handleSubmitRatingButton()}>Submit Rating</button>
                                </div>}
                                <p>Reviews:</p>
                                {this.state.productReviews.map((item, index) => (
                                    <div style={{ border: "ridge" }}>
                                        <p>{item.reviewDate}</p>
                                        <p>{item.user.username}:</p>
                                        <p>{item.reviewText}</p>
                                    </div>
                                ))}
                                <input id="reviewInput" style={{ width: 800, height: 50 }} size="1000" type="textarea" rows="10" cols="50"></input>
                                <button class="shopBtn" onClick={() => this.handleReviewSubmitButton(this.state.productInfo.id, document.getElementById("reviewInput").value)}>Submit Review</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Product_Details