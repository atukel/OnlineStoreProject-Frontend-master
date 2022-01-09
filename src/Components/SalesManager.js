import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import SetProductDiscount from '../Components/SetProductDiscount'
import ViewInvoices from '../Components/ViewInvoices'
import EvaluateReviews from '../Components/EvaluateReviews'
import SetDeliveries from '../Components/SetDeliveries'
import CreateCoupon from '../Components/CreateCoupon'
import AuthService from '../services/auth.service'

class SalesManager extends Component {

    componentDidMount() 
    {
        console.log(AuthService.getCurrentUser().roles[0]);
        if(AuthService.getCurrentUser().roles[0] != "ROLE_ADMIN")
        {
            alert("Sorry, looks like you are not allowed to see this page.");
            this.props.history.push("/home");
            window.location.reload();
        }

        let compNum = sessionStorage.getItem("salesmanagernumber");
        if(compNum == 3)
        {
            this.renderCorrespondingMenu(3);
        }
        sessionStorage.setItem("salesmanagernumber", 0);
    }

    constructor(props) {
        super(props);

        this.state = {
            showSetDiscountMenu: true,
            showInvoicesMenu: false,
            showDeliveriesPage: false,
            createCoupon: false
        }

        this.renderCorrespondingMenu = this.renderCorrespondingMenu.bind(this);
        this.handleLogoutButton = this.handleLogoutButton.bind(this);
    }

    renderCorrespondingMenu = (menuId) => {
        if(menuId == 0)
        {
            this.setState({
                showSetDiscountMenu: true,
                showInvoicesMenu: false,
                showDeliveriesPage: false,
                createCoupon: false
            });
        }
        else if(menuId == 1)
        {
            this.setState({
                showSetDiscountMenu: false,
                showInvoicesMenu: true,
                showDeliveriesPage: false,
                createCoupon: false
            });
            document.getElementById('sidebar').style.height="250px";
        }
        else if(menuId == 3)
        {
            this.setState({
                showSetDiscountMenu: false,
                showInvoicesMenu: false,
                showDeliveriesPage: true,
                createCoupon: false
            });
            document.getElementById('sidebar').style.height="1200px";
        }
        else if(menuId == 4)
        {
            this.setState({
                showSetDiscountMenu: false,
                showInvoicesMenu: false,
                showDeliveriesPage: false,
                createCoupon: true
            });
        }
    }

    handleLogoutButton = () => {
        AuthService.logout();
        this.props.history.push("/");
        window.location.reload();
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
                                    <li ><a href="/Home">Home	</a></li>
                                    <li class="active" style={{ marginRight: 1020 }}><a   >Management</a></li>
                                    <ul class="nav pull-right">
                                        <li><a>{AuthService.getCurrentUser().username}</a></li>
                                        <li onClick={() => this.handleLogoutButton()}><a>Logout	</a></li>
                                    </ul>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div id="sidebar" class="span3" style={{ marginRight: 50 }}>
                        <div class="well well-small">
                            <div align="left" ><b>Manager Menu</b></div><br></br>
                            <ul class="nav nav-list" id="insertCategories">
                                <li style={{borderStyle: "double"}}>
                                    <a style={{marginLeft: 5}} onClick={() => this.renderCorrespondingMenu(0)}> Set Product Discount</a>
                                </li>
                                <li style={{borderStyle: "double"}}>
                                    <a style={{marginLeft: 5}} onClick={() => this.renderCorrespondingMenu(1)}> View All Purchases</a>
                                </li>
                                <li style={{borderStyle: "double"}}>
                                    <a style={{marginLeft: 5}} onClick={() => this.renderCorrespondingMenu(3)}> Set Deliveries of Customers</a>
                                </li>
                                <li style={{borderStyle: "double"}}>
                                    <a style={{marginLeft: 5}} onClick={() => this.renderCorrespondingMenu(4)}> Create Coupon</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="well well-small">
                        <h3> Sales Management </h3>
                        <hr class="soften" />
                        <div>Welcome to your sales management page.<br></br>In here you can:<br></br> set discounts to products, view invoices, view revenues, set deliveries of customers.</div>
                        <div>
                           {
                               this.state.showSetDiscountMenu ? <SetProductDiscount /> : null
                           }
                           {
                               this.state.showInvoicesMenu ? <ViewInvoices /> : null
                           }
                           {
                               this.state.showEvaluateReviews ? <EvaluateReviews /> : null
                           }
                           {
                               this.state.showDeliveriesPage ? <SetDeliveries /> : null
                           }
                           {
                               this.state.createCoupon ? <CreateCoupon /> : null
                           }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SalesManager