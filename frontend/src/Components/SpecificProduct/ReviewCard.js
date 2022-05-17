import React from 'react';
import ReactStars from 'react-rating-stars-component';
import user from '../../Images/user.png';

const ReviewCard = ({ review }) => {

	const optionsReview = {
		edit: false,
		color: "#0F1111",
		activeColor: "#FDCC0D",
		size: window.innerWidth < 992 ? 17 : 20,
		value: review.ratingOfTheProduct,
		isHalf: true
	}

	return (
		<div className="review-card">
			<div className="row row-review">
				<div className="column column-review">
					<img src={user} alt="" />
				</div>
				<div className="column column-review">
					<p>{review.reviewerName}</p>
					<ReactStars {...optionsReview} />
					<span>{review.commentOnProduct}</span>
				</div>
			</div>
		</div>
	)
}

export default ReviewCard