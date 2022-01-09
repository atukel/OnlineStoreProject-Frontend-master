import React, { Component } from 'react'
import '../StyleSheets/main.css'
import '../StyleSheets/util.css'
import AuthService from '../services/auth.service';

class Login extends Component {
    constructor(props) {
        super(props);

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);

        this.state = {
            username: '',
            password: ''
        };
    }

    /*
    // Convert to 32bit integer 
    stringToHash = (password) => { 
                  
        var hash = 0; 
          
        if (password.length === 0) return hash; 
          
        for (var i = 0; i < password.length; i++) { 
            var char = password.charCodeAt(i); 
            hash = ((hash << 5) - hash) + char; 
            hash = hash & hash; 
        } 
          
        return hash; 
    } 
    */

    validateEmail = (email) => {
        var validateRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return validateRegex.test(String(email).toLowerCase());
    }

    handleUsernameChange = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleFormSubmit = (event) => {
        event.preventDefault();

        AuthService.login(this.state.username, this.state.password).then(
            () => {
                alert("User login is successful.");
                this.props.history.push("/home");
                window.location.reload();
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                alert(resMessage)
            }
        );
    }

    redirectToSignup = () => {
        this.props.history.push("/signup");
         window.location.reload();
    }

    render() {
        return (
            <div class="limiter">
                <div class="container-login100">
                    <div class="wrap-login100">
                        <div class="login100-pic js-tilt" data-tilt>
                            <img src={require("../images/img-01.png")} alt="IMG"></img>
                        </div>

                        <form class="login100-form validate-form" onSubmit={this.handleFormSubmit}>
                            <span class="login100-form-title">
                                Member Login
					        </span>

                            <div class="wrap-input100 validate-input" >
                                <input class="input100" type="text" name="email" placeholder="Username" onChange={this.handleUsernameChange}></input>
                                <span class="focus-input100"></span>
                                <span class="symbol-input100">
                                    <i class="fa fa-envelope" aria-hidden="true"></i>
                                </span>
                            </div>

                            <div class="wrap-input100 validate-input" >
                                <input class="input100" type="password" name="pass" placeholder="Password" onChange={this.handlePasswordChange}></input>
                                <span class="focus-input100"></span>
                                <span class="symbol-input100">
                                    <i class="fa fa-lock" aria-hidden="true"></i>
                                </span>
                            </div>

                            <div class="container-login100-form-btn">
                                <button type="submit" class="login100-form-btn">
                                    Login
						        </button>
                            </div>

                            <div class="text-center p-t-136">
                                <a class="txt2" onClick={() => this.redirectToSignup()}>
                                    Create your Account
							        <i class="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login