/*	
	Date: June 3, 2022
		* Loading Component.
*/
import React from 'react'
import MetaData from '../Layout/MetaData'
import './loading.css'

const Loading = () => {
	return (
		<div className="loading">
			<MetaData title="Loading..." />
			<div class="drawing" id="loading">
				<div class="loading-dot"></div>
			</div>
		</div>
	)
}

export default Loading