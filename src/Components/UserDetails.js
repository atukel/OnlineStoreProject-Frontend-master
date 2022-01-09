import React, { Component } from 'react';
import pmanagerService from '../services/pmanager.service'
import AuthService from '../services/auth.service';
import UserService from '../services/user.service';

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
            userinfo: {}
        };
    }




    render() {
        return (
            <div>

                <h3>Your Details</h3>
                <label for="name">Full Name:</label>
                <input type="text" readOnly={true} value={this.state.userinfo.fullname} name="fullname" ></input><br></br>
                <label for="username ">username:</label>
                <input type="text" readOnly={true} value={this.state.userinfo.username} name="username" ></input><br></br>
                <label for="email">email:</label>
                <input type="text" readOnly={true} value={this.state.userinfo.email} name="email" ></input><br></br>
                <label for="adress">address:</label>
                <input type="text" readOnly={true} value={this.state.userinfo.address} name="address"></input><br></br>

                <label for="price">roles:</label>
                <input type="text" readOnly={true} value={AuthService.getCurrentUser().roles[0]} name="roles" ></input><br></br>
                <br></br>



            </div>)
    }
}
export default UserDetailsE