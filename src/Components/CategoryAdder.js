import React, { Component } from 'react';

import pmanagerService from '../services/pmanager.service'

class CatAdder extends Component {

    constructor(props) {
        super(props);

        this.state = {
            category: ""
        };

        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleCategoryChange = (event) => {
        this.setState({
            category: event.target.value
        })
    }

    handleFormSubmit = () => {
        if (this.state.category != "") {
            console.log("here");
            pmanagerService.AddCategory(this.state.category).then(
                () => {
                    alert("Category successfully added");

                });
        }
    }

    render() {
        return (
            <div>
                <h3>Add Category</h3>
                <label for="Category">Category:</label>
                <input id="categories" required="required" type="text" name="Category" onChange={this.handleCategoryChange}></input><br></br>
                <br></br>
                <button onClick={() => this.handleFormSubmit()} class="shopBtn">Confirm</button>
            </div>
        )
    }
}
export default CatAdder