import React, { Component } from 'react'
import ReviewsService from '../services/reviews.service'

class EvaluateReviews extends Component 
{
    componentDidMount() {
        ReviewsService.getPendingReviews().then(
            response => {
                this.setState({
                    pendingReviewsList: response.data
                });
            },
            error => {
                this.setState({
                    pendingReviewsList:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        ).then(
            () => {
                console.log(this.state.pendingReviewsList);
            }
        );
    }

    constructor(props)
    {
        super(props);

        this.state = {
            pendingReviewsList: [],
            reviewStatusResponse: []
        };

        this.handleReviewEvaluationButtons = this.handleReviewEvaluationButtons.bind(this);
    }

    handleReviewEvaluationButtons = (reviewId, reviewStatus) => {
        ReviewsService.setReviewStatus(reviewId, reviewStatus).then(
            response => {
                this.setState({
                    reviewStatusResponse: response.data
                });
            },
            error => {
                this.setState({
                    reviewStatusResponse:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        ).then(
            () => {
                console.log(this.state.reviewStatusResponse);
                sessionStorage.setItem("componentnumber", 5);
                window.location.reload(false);
            }
        );
    }

    render() {
        return(
            <div>
                {this.state.pendingReviewsList.length > 0 ? this.state.pendingReviewsList.map((item, index) => (
                    <div>
                        <p>{item.product.name}</p>
                        <p>{item.reviewDate}</p>
                        <p>{item.reviewText}</p>
                        <button class="shopBtn" onClick={() => this.handleReviewEvaluationButtons(item.reviewId, true)} style={{marginRight: 10}}>Accept Review</button>
                        <button class="shopBtn" onClick={() => this.handleReviewEvaluationButtons(item.reviewId, false)}>Reject Review</button>
                    </div>
                )) : <p>There are no reviews to evaluate.</p>}
            </div>
        )
    }
}

export default EvaluateReviews