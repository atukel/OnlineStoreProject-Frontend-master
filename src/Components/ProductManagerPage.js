import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import '../style.css';
import '../assets/font-awesome/css/font-awesome.css';
import '../assets/css/bootstrap.css';
import "../services/products.service";
import ItemAdder from '../Components/itemadder';
import CatAdder from '../Components/CategoryAdder';
import ProductManaging from '../Components/ProductManaging';
import ProductManagingE from '../Components/ProductManagingE';
import pmanagerService from '../services/pmanager.service'
import productsService from '../services/products.service';
import {Dtable} from './datatable.js';
import EvaluateReviews from '../Components/EvaluateReviews'
import AuthService from '../services/auth.service'

class ProductManagerPage extends Component {

    componentDidMount()
    {
        console.log(AuthService.getCurrentUser().roles[0]);
        if(AuthService.getCurrentUser().roles[0] != "ROLE_MODERATOR")
        {
            alert("Sorry, looks like you are not allowed to see this page.");
            this.props.history.push("/home");
            window.location.reload();
        }
        let compNum = sessionStorage.getItem("componentnumber");
        if(compNum == 5)
        {
            this.handleMenu5();
        }
        else if(compNum == 4)
        {
            this.handleMenu4();
        }
        else if(compNum == 3)
        {
            this.handleMenu3();
        }
        else if(compNum == 2)
        {
            this.handleMenu2();
        }
        else if(compNum == 1)
        {
            this.handleMenu1();
        }
    }
   
    constructor(props) {
        
        super(props);
        

        this.state = {
            searchString: "",
            Products:[]
        };

        this.handleDeleteButton=this.handleDeleteButton.bind(this);
        this.handleLogoutButton = this.handleLogoutButton.bind(this);
    }
    handleDeleteButton = (ProductId) => {
        pmanagerService.DeleteItem(ProductId);
    }

    handleSearchBarChange = (event) => {
        this.setState({
            searchString: event.target.value
        });
    }
    handleMenu1= (event) =>{
        var element=<ItemAdder></ItemAdder>;
        ReactDOM.render(element, document.getElementById('forms'));
        document.getElementById('sidebar').style.height="700px";
    }
    handleMenu2= (event) =>{
        var element=<ProductManaging ></ProductManaging>;
        
        ReactDOM.render(element, document.getElementById('forms'));
        document.getElementById('sidebar').style.height="250px";
    }    
    handleMenu3= (event) =>{
        var element=<ProductManagingE ></ProductManagingE>;
        
        ReactDOM.render(element, document.getElementById('forms'));
        document.getElementById('sidebar').style.height="250px";
    }
    handleMenu4= (event) =>{
        var element=<CatAdder ></CatAdder>;
        
        ReactDOM.render(element, document.getElementById('forms'));
        document.getElementById('sidebar').style.height="250px";
    }
    handleMenu5= (event) =>{
        var element=<EvaluateReviews ></EvaluateReviews>;
        
        ReactDOM.render(element, document.getElementById('forms'));
        document.getElementById('sidebar').style.height="700px";
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

                                    <li style={{ marginRight: 1020 }} class="active"><a href="/ProductManager">Management</a></li>
                                    
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
                    <div id="sidebar" class="span3" style={{ height: 700, width: 200, marginRight: 50 }}>
                        <div class="well well-small">
                            <div align="left" ><b>Manager Menu</b></div>
                            <hr class="soften" />
                            <ul class="nav nav-list" id="insertCategories">
                                <li style={{borderStyle: "double"}} onClick={this.handleMenu1}>
                                <a style={{marginLeft: 5}}>Add New Product</a>
                                </li>
                                <li style={{borderStyle: "double"}} onClick={this.handleMenu4}>
                                <a style={{marginLeft: 5}}>Add New Category</a>
                                </li>                                
                                <li style={{borderStyle: "double"}}onClick={this.handleMenu2}>
                                <a style={{marginLeft: 5}}>Display Products </a>
                                </li>
                                <li style={{borderStyle: "double"}}onClick={this.handleMenu3}>
                                <a style={{marginLeft: 5}}>Edit Products </a>
                                </li>
                                <li style={{borderStyle: "double"}}onClick={this.handleMenu5}>
                                <a style={{marginLeft: 5}}>Review Management </a>
                                </li>                                                                 
                                <li>
                                </li><br></br>
                            </ul>
                        </div>
                    </div>
                    <div class="well well-small">
                        <h3> Product Management </h3><div id="buttonholder"style={{float:"right"}}></div>
                        <hr class="soften" />
                        <div  id="forms">Welcome Managet to your manage page.<br></br>In here you can:<br></br> add new products increase the quantity of existing item, Manage users setting</div>

                    
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductManagerPage