import React, { Component } from 'react';
import '../assets/css/bootstrap.css';

import pmanagerService from '../services/pmanager.service'

class UserManaging extends Component {
    constructor(props) {
        super(props);

        

        this.state = {



        };
    }



    render() {
        return(<div>
            <table class="table table-bordered">
                <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>status</th>
                <th>-</th>
                <th>-</th>                                    
            </tr></thead>
            <tbody>
                <tr>
                    
                    <td>{"item.username"}</td>
                    <td>{"item.email"}</td>
                    <td><select>
                        <option value="User">User</option>
                        <option value="ProductManager">ProductManager</option>
                        <option value="SalesManager">SalesManager</option>
                        <option value= "item.status" selected>item.status</option>                       
                        
                        </select></td>
                    <td><button class="shopBtn" type="submit">Update</button></td>
                    
                    
                    <td><button class="btn btn-mini btn-danger" type="submit">Remove</button></td>
                    
                </tr></tbody>




            






            </table>





        </div>)
            
        }
    }
export default UserManaging