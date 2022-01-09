import 'C:/Users/atama/Desktop/online-store-project/node_modules/datatables.net-dt/css/jquery.dataTables.css'
import React, { Component } from 'react'
import pmanagerService from '../services/pmanager.service'
const $=require('jquery')
$.DataTable = require('datatables.net')

export class DtableE extends Component
{
    componentDidMount(){
        
        this.$el=$(this.el)
        var x=this.$el.DataTable({

            
            columns:[{title:"Name",},{title:"Description"},{title:"Modal Number"},{title:"Distribution Info"},{title:"Warrant Status"},{title:"Stock"},{title:"Price"},{title:" "}],

        data:this.props.data.map((item, index) => (
        
        ([item.name,'<input type="text" style="border: ridge" value='+item.description+'>'+item.description+'</input>','<input type="text" style="border: ridge" value='+item.modelNumber+'>'+item.modelNumber+'</input>','<input type="text" style="border: ridge" value='+item.distributorInfo+'>'+item.distributorInfo+'</input>','<input type="text" style="border: ridge" value='+item.warrantyStatus+'>'+item.warrantyStatus+'</input>','<input type="number" style="border: ridge" value='+item.quantityStocks+'>'+item.quantityStocks+'</input>','<input type="number" style="border: ridge" value='+item.price+'>'+item.price+'</input>','<button class="btn btn-mini pull-right" value='+index+' id='+item.id+'>Update</button>'])
        
        
        ))

        }
        )

 

        this.$el.on( 'click', 'button', function () {
            var data = x.row( $(this).parents('tr') ).data();
            var index=x.$(this).attr('value');
           
            console.log("burdayım", x.cell(index,1).nodes().to$().find('input'));
            console.log(x.$(this).attr('id'),x.cell(index,1).nodes().to$().find('input').val(),x.cell(index,3).nodes().to$().find('input').val(),x.cell(index,2).nodes().to$().find('input').val(),x.cell(index,4).nodes().to$().find('input').val(),data[0],x.cell(index,5).nodes().to$().find('input').val(),x.cell(index,6).nodes().to$().find('input').val());
            pmanagerService.UpdateItem(x.$(this).attr('id'),x.cell(index,1).nodes().to$().find('input').val(),x.cell(index,3).nodes().to$().find('input').val(),x.cell(index,2).nodes().to$().find('input').val(),x.cell(index,4).nodes().to$().find('input').val(),data[0],x.cell(index,5).nodes().to$().find('input').val(),x.cell(index,6).nodes().to$().find('input').val()).then(
                () => {
                    sessionStorage.setItem("componentnumber", 3);
                    window.location.reload();
                }
            );
        } );        
    }


    render(){

        return <div style={{marginLeft : "10px"}}>
            <table className="display" width="100%" ref={el => this.el=el}></table>


        </div>
    }

}
