import React, { Component } from 'react';
import '../style.css';
import ReactDOM from 'react-dom'
import '../assets/font-awesome/css/font-awesome.css';
import '../assets/css/bootstrap.css';
import "../services/products.service";
import ProductsService from '../services/products.service';
import Category from './Category';
import CoffeeMachineObjects from './CoffeeMachineObjects';
import ProductService from '../services/products.service';
import AuthService from '../services/auth.service';
import FilterService from '../services/filter.service';

class Home_Page extends Component {
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

        this.searchCoffeeMachines = this.searchCoffeeMachines.bind(this);

        this.state = {
            searchString: "",
            coffeeMachineResults: [],
            currentUser: AuthService.getCurrentUser(),
            fetchRatingsResult: []
        };

        this.handleHeaderHomeButton = this.handleHeaderHomeButton.bind(this);
        this.handleHeaderManagementButton = this.handleHeaderManagementButton.bind(this);
        this.categoryClickStateHandler = this.categoryClickStateHandler.bind(this);
        this.handleAllCategorySelection = this.handleAllCategorySelection.bind(this);
        this.handleLogoutButton = this.handleLogoutButton.bind(this);
        this.handleUsernameButtonClick = this.handleUsernameButtonClick.bind(this);
        this.handleFilters = this.handleFilters.bind(this);
    }

    handleSearchBarChange = (event) => {
        this.setState({
            searchString: event.target.value
        });
    }

    searchCoffeeMachines = (event) => {
        event.preventDefault();

        if (!this.state.searchString) {
            window.location.reload();
        }
        else {
            ProductsService.getRelatedCoffeeMachines(this.state.searchString).then(
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
        var element = <button class="btn btn-mini pull-right" >A</button>;

        ReactDOM.render(element, document.getElementById('buttonholder'));
    }

    redirectToCart = () => {
        this.props.history.push("/cart");
        window.location.reload();
    }

    handleHeaderHomeButton = () => {
        this.props.history.push("/home");
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

    categoryClickStateHandler = (categoryProducts) => {
        console.log(categoryProducts);
        this.setState({
            coffeeMachineResults: categoryProducts
        });
    }

    handleAllCategorySelection = () => {
        window.location.reload(false);
    }

    handleUsernameButtonClick = () => {
        this.props.history.push("/profile");
        window.location.reload();
    }

    handleLogoutButton = () => {
        AuthService.logout();
        this.props.history.push("/");
        window.location.reload();
    }

    handleFilters(sortOperation) {
        switch (sortOperation) {
            case 1:
                FilterService.SortProductsByPriceAsc().then(
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
                break;
            case 2:
                FilterService.SortProductsByPriceDesc().then(
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
            break;
            case 3:
                FilterService.SortProductsByRating().then(
                    response => {
                        console.log("ASDADS", response.data);
                        let productsArray = [];
                        response.data.forEach(element => {
                          productsArray.push(element.product);  
                        })
                        console.log("ARRAY HERE", productsArray);
                        this.setState({
                            coffeeMachineResults: productsArray
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
            break;
            case 4:
                FilterService.SortProductsByAlphabetical().then(
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
            break;
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
                                    <li class="active" onClick={() => this.handleHeaderHomeButton()}><a>Home	</a></li>
                                    <li onClick={() => this.handleHeaderManagementButton()}><a>Management	</a></li>

                                    <form onSubmit={this.searchCoffeeMachines} class="navbar-search pull-left">
                                        <input type="text" placeholder="Search" style={{ marginTop: 5, marginRight: 820 }} class="search-query span2" onChange={this.handleSearchBarChange}></input>
                                    </form>
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
                    <div id="sidebar" class="span3" style={{ height: 800, marginRight: 50 }}>
                        <div class="well well-small">
                            <div align="left" ><b>Categories:</b></div>
                            <ul class="nav nav-list" id="insertCategories">
                                <li><a align="left" onClick={() => this.handleAllCategorySelection()}><span class="icon-chevron-right"></span>All</a></li>
                                <Category categoryClickHandler={this.categoryClickStateHandler}></Category>
                            </ul>
                            <hr class="soften" />
                            <div align="left" ><b>Filters:</b></div>
                            <ul class="nav nav-list">
                                <li><a align="left" onClick={() => this.handleFilters(1)}><span class="icon-chevron-right"></span>Cheapest first</a></li>
                                <li><a align="left" onClick={() => this.handleFilters(2)}><span class="icon-chevron-right"></span>Most expensive first</a></li>
                                <li><a align="left" onClick={() => this.handleFilters(3)}><span class="icon-chevron-right"></span>Best Ratings</a></li>
                                <li><a align="left" onClick={() => this.handleFilters(4)}><span class="icon-chevron-right"></span>Alphabetical</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="well well-small">
                        <h3><a class="btn btn-mini pull-right" title="View more" onClick={() => { this.redirectToCart() }}>Go To Cart<span class="icon-plus"></span></a> Featured Products  </h3>
                        <div id="buttonholder"> </div>
                        <hr class="soften" />
                        <div class="row-fluid">
                            <ul class="thumbnails">
                                <CoffeeMachineObjects coffeemachineobjects={this.state.coffeeMachineResults}></CoffeeMachineObjects>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home_Page