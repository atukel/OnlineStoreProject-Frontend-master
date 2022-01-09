import React, { Component } from 'react'
import SalesManagerServices from '../services/salesmanager.service'
import {DTable} from './datatableSalesManager'

class ViewInvoices extends Component 
{
    componentDidMount()
    {
        SalesManagerServices.getAllInvoices().then(
            response => {
                this.setState({
                    getAllInvoicesResponse: response.data
                });
            },
            error => {
                this.setState({
                    getAllInvoicesResponse:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        ).then(
            () => {
                console.log(this.state.getAllInvoicesResponse);
            }
        );
    }

    constructor(props)
    {
        super(props);

        this.state = {
            getAllInvoicesResponse: ""
        };
    }

    render() {
        return(
            <div>
                {this.state.getAllInvoicesResponse != "" ? <DTable data={this.state.getAllInvoicesResponse}></DTable> : null}
            </div>
        )
    }
}

export default ViewInvoices