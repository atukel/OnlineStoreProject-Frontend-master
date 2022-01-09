import React, { Component } from 'react';
import {Dtable} from './datatable.js'
import {DtableE} from './datatableE.js'
import pmanagerService from '../services/pmanager.service'
import ReactDOM from 'react-dom'


class ProductManagingE extends Component {
    
    
    componentDidMount() {
        pmanagerService.getProducts().then(
            response => {
                this.setState({
                    Products: response.data
                });
            },
            error => {
                this.setState({
                    Products: error
                });
            }
        ).then(
            () => {
                console.log("Products:", this.state.Products);
            }
        )
    }
    constructor(props) {
        super(props);
        this.handleDeleteButton=this.handleDeleteButton.bind(this);
        

        this.state = {
            Products:[],
            tablemode:0


        };
    }
    editmode=(data)=>{
        if(this.state.tablemode==0)
        {
            this.state.tablemode=1;
            var element=<DtableE data={data}></DtableE>;
        
            ReactDOM.render(element, document.getElementById('here'));                        


        }
        else if(this.state.tablemode==1)
        {

            this.state.tablemode=0;
            var element=<Dtable data={data}></Dtable>;
        
            ReactDOM.render(element, document.getElementById('here'));            

        }

    }
    handleDeleteButton = (ProductId) => {
        pmanagerService.DeleteItem(ProductId);
    }



    render() {
        return(<div id="here" style={{textAlign: 'left'}}>
            <button id="buttonholder"style={{float:"left"}}></button>
            {this.state.Products != "" ? <DtableE data={this.state.Products}></DtableE> : null}
            


        </div>)
            
        }
    }
export default ProductManagingE