import React, { Component } from 'react'
import DeliveriesService from '../services/deliveries.service'

class SetDeliveries extends Component
{
    componentDidMount() {
        DeliveriesService.getAllPendingDeliveries().then(
            response => {
                this.setState({
                    pendingDeliveriesList: response.data
                });
            },
            error => {
                this.setState({
                    pendingDeliveriesList:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        ).then(
            () => {
                console.log(this.state.pendingDeliveriesList);
            }
        );
    }

    constructor(props)
    {
        super(props);

        this.state = {
            pendingDeliveriesList: [],
            deliveryStatusResponse: []
        };

        this.formatPaymentDate = this.formatPaymentDate.bind(this);
        this.handleDeliverProductButtonClick = this.handleDeliverProductButtonClick.bind(this);
    }

    formatPaymentDate = (paymentDateString) => {
        let formattedDate = paymentDateString.split('.');
        return formattedDate[0];
    }

    handleDeliverProductButtonClick = (checkoutId, deliveryStatus) => {
        DeliveriesService.setDeliveryStatus(checkoutId, deliveryStatus).then(
            response => {
                this.setState({
                    deliveryStatusResponse: response.data
                });
            },
            error => {
                this.setState({
                    deliveryStatusResponse:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        ).then(
            () => {
                console.log(this.state.deliveryStatusResponse);
                sessionStorage.setItem("salesmanagernumber", 3);
                window.location.reload();
            }
        );
    }

    render() {
        return(
            <div>
                {this.state.pendingDeliveriesList.map((item, index) => (
                    <div>
                        <p>{item.user.username}</p>
                        <p>{item.product.name}</p>
                        <p>{this.formatPaymentDate(item.paymentDate)}</p>
                        <button class="shopBtn" onClick={() => this.handleDeliverProductButtonClick(item.checkOutId, true)} >Deliver Product</button>
                    </div>
                ))}
            </div>
        );
    }
}

export default SetDeliveries