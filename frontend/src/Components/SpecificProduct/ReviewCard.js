/*	
	Date: May 17, 2022
		* Creating Component for Review.
*/

import React from 'react';

// Importing Stars and file CSS.
import ReactStars from 'react-rating-stars-component';
import user from '../../Images/user.png';
import './ReviewCard.css';

const ReviewCard = ({ review }) => {

	// Review Options
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
				{/* User Image */}
				<div className="column column-review">
					<img src={user} alt="" />
				</div>
				{/* User Detail with Comment. */}
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