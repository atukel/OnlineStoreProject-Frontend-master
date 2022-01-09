import 'C:/Users/atama/Desktop/online-store-project/node_modules/datatables.net-dt/css/jquery.dataTables.css'
import React, { Component } from 'react'
import pmanagerService from '../services/pmanager.service'
const $=require('jquery')
$.DataTable = require('datatables.net')

export class Utable extends Component
{
    componentDidMount(){
        console.log(this.props.data);
        this.$el=$(this.el)
        var x=this.$el.DataTable({
            columns: [{ title: "Full name", }, { title: "E-mail" }, { title: "Address" }, { title: "Product Name" },
            { title: "Price" }, { title: "Warranty Status" }, { title: "Payment Date" }, { title: "Quantity" }],

            data: this.props.data.map((item, index) => (

                ([item.user.fullname, item.user.email, item.user.address, item.product.name,
                item.product.discountedPrice, item.product.warrantyStatus, item.paymentDate,
                item.quantity])))

        });

 
    }


    render(){

        return <div style={{marginLeft : "10px"}}>
            <table className="display" width="100%" ref={el => this.el=el}></table>


        </div>
    }

}
