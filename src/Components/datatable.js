import 'C:/Users/atama/Desktop/online-store-project/node_modules/datatables.net-dt/css/jquery.dataTables.css'
import React, { Component } from 'react'
import pmanagerService from '../services/pmanager.service'
const $ = require('jquery')
$.DataTable = require('datatables.net')

export class Dtable extends Component {
    componentDidMount() {

        console.log("ITEM", this.props.data)
        this.$el = $(this.el)
        var x = this.$el.DataTable({


            columns: [{ title: "Name", }, { title: "Description" }, { title: "Category" }, { title: "Distribution Info" }, { title: "Warrant Status" }, { title: "Stock" }, { title: "Price" }, { title: " " }],

            data: this.props.data.map((item, index) => (
                
                ([item.name, item.description, item.modelNumber, item.distributorInfo, item.warrantyStatus, item.quantityStocks, item.price, '<button class="btn btn-mini pull-right" id=' + item.id + '>Delete</button>'])


            ))

        }
        )

        this.$el.on('click', 'button', function () {
            var data = x.row($(this).parents('tr')).data();
            pmanagerService.DeleteItem(x.$(this).attr('id'));
        });


    }
    handleDeleteButton = (ProductId) => {
        pmanagerService.DeleteItem(ProductId);
    }

    render() {

        return <div style={{ marginLeft: "10px" }}>
            <table className="display" width="100%" ref={el => this.el = el}></table>


        </div>
    }

}
