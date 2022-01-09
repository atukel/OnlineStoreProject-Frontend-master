import React, { Component } from 'react';

import pmanagerService from '../services/pmanager.service'

class itemAdder extends Component {
    componentDidMount() {
        pmanagerService.getAllCategories().then(
            response => {
                this.setState({
                    Categories: response.data
                });
            },
            error => {
                this.setState({
                    Categories: error
                });
            }
        ).then(
            () => {
                console.log("Categories", this.state.Categories);
                this.state.Categories.forEach(Category => {
                    this.selectfill(Category.categoryName)
                });
            }
        );
    }

    constructor(props) {
        super(props);



        this.state = {

            description: "",
            modal: "",
            name: "",
            price: 0,
            stock: -1,
            Warrant_status: "",
            distribution_info: "",
            category: "",
            Categories: []


        };
    }
    selectfill = (category) => {

        var select = document.getElementById("categories");
        var el = document.createElement("option");
        el.textContent = category;
        el.value = category;
        select.appendChild(el);


    }

    handleDescriptionChange = (event) => {
        this.setState({
            description: event.target.value
        })
    }
    handleModalChange = (event) => {
        this.setState({
            modal: event.target.value
        })
    }
    handlePriceChange = (event) => {
        this.setState({
            price: event.target.value
        })
    }
    handleStockChange = (event) => {
        this.setState({
            stock: event.target.value
        })
    }
    handleWarrantChange = (event) => {
        this.setState({
            Warrant_status: event.target.value
        })
    }
    handleDistributionChange = (event) => {
        this.setState({
            distribution_info: event.target.value
        })
    }
    handleNameChange = (event) => {
        this.setState({
            name: event.target.value
        })
    }
    handleCategoryChange = (event) => {
        this.setState({
            category: event.target.value
        })
    }
    handleFormSubmit = (event) => {
        if (this.state.price != -1 && this.state.stock != 0 && this.state.Warrant_status != "" && this.state.description != "" && this.state.distribution_info != "" && this.state.modal != "" && this.state.name != "") {
            console.log("here");
            pmanagerService.AddItem(this.state.description, this.state.distribution_info, this.state.modal, this.state.Warrant_status, this.state.name, this.state.stock, this.state.price, this.state.category).then(
                () => {
                    alert("Item successfully added");
                    sessionStorage.setItem("componentnumber", 1);
                    window.location.reload(false);
                });
        }
    }
    fakefunction = (event) => {


        event.preventDefault();
        return false;
    }

    render() {
        return (
            <div>
                <form onSubmit={this.fakefunction}>
                    <h3>Item Addition Form</h3>
                    <label for="name">Name:</label>
                    <input required="required" type="text" name="name" onChange={this.handleNameChange}></input><br></br>
                    <label for="Category">Category:</label>
                    <select id="categories" required="required" name="Category" onChange={this.handleCategoryChange}>
                        <option selected="true" >Select Category</option>

                    </select><br></br>
                    <label for="description">Description:</label>
                    <input required="required" type="text" name="description" onChange={this.handleDescriptionChange}></input><br></br>
                    <label for="distribution">Distribution Info:</label>
                    <input required="required" type="text" name="distribution" onChange={this.handleDistributionChange}></input><br></br>
                    <label for="modal">Modal Number:</label>
                    <input required="required" type="number" name="modal" onChange={this.handleModalChange}></input><br></br>

                    <label for="price">Price:</label>
                    <input required="required" type="number" name="price" onChange={this.handlePriceChange}></input><br></br>
                    <label for="stock">Quantity Stock:</label>
                    <input required="required" type="number" name="stock" onChange={this.handleStockChange}></input> <br></br>
                    <label for="warrant">Warrant Status:</label>
                    <input required="required" type="text" name="warrant" onChange={this.handleWarrantChange}></input><br></br>
                    <br></br>
                    <button onClick={this.handleFormSubmit} class="shopBtn">Add Item</button>

                </form>
            </div>)
    }
}
export default itemAdder