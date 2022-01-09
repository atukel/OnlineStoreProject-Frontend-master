import React, { Component } from 'react';
import pmanagerService from '../services/pmanager.service'
import userService from '../services/user.service';
import AuthService from '../services/auth.service';
import UserService from '../services/user.service'

class UserDetailsE extends Component {
    componentDidMount() {
        var currentUser = AuthService.getCurrentUser();
        UserService.getUserInformationForProfile(currentUser.id).then(
            response => {
                this.setState({
                    userinfo: response.data
                });
            },
            error => {
                this.setState({
                    userinfo:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        ).then(
            () => {
                console.log("UserInfo", this.state.userinfo);
            }
        );
    }

    constructor(props) {
        super(props);

        

        this.state = {
            userinfo: {},
            name: "",
            username: "",
            email: "",
            address: ""
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleAdressChange = this.handleAdressChange.bind(this);
    }


    handleNameChange = (event) => {
        this.setState({
            name: event.target.value
        })
    }
    handleUsernameChange = (event) => {
        this.setState({
            username: event.target.value
        })
    }
    handleEmailChange = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    handleAdressChange = (event) => {
        this.setState({
            address: event.target.value
        })
    }
 

    handleFormSubmit = (event) => {

        console.log("here", this.state.name);
        if(this.state.name == "")
        {
            this.setState({
                name: this.state.userinfo.fullname
            })
        }

        if(this.state.email == "")
        {
            this.setState({
                email: this.state.userinfo.email
            })
        }

        if(this.state.address == "")
        {
            this.setState({
                address: this.state.userinfo.address
            })
        }

        userService.Update( AuthService.getCurrentUser().id, this.state.name,this.state.email,this.state.address).then(
            () => {
                alert("Changes Applied Successfully.");

            });
    }

    render() {
        return(
            <div>

                    <h3>Edit Your Details</h3>
                    <label for="name">Full Name:</label>
                    <input type="text" defaultValue={this.state.userinfo.fullname} name="fullname" onChange={this.handleNameChange}></input><br></br>
                    <label for="username ">username:</label>
                    <input type="text" readOnly={true} value={this.state.userinfo.username} name="username" onChange={this.handleUsernameChange}></input><br></br>
                    <label for="email">email:</label>
                    <input  type="text" defaultValue={this.state.userinfo.email} name="email" onChange={this.handleEmailChange}></input><br></br>
                    <label for="adress">address:</label>
                    <input  type="text" defaultValue={this.state.userinfo.address} name="address" onChange={this.handleAdressChange}></input><br></br>

                    <label for="price">roles:</label>
                    <input  type="text" readOnly={true} value={AuthService.getCurrentUser().roles[0]} name="roles" ></input><br></br>
                    <br></br>
                        <button onClick={this.handleFormSubmit} class="shopBtn">Update</button>


            </div>)
        }
    }
export default UserDetailsE