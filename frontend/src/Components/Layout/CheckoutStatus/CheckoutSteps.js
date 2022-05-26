/*	
	Date: May 26, 2022
		* Shows at which step the process of payment is right now.
*/

import React, { Fragment } from 'react';

// Importing Icons and Labels of Stepper npm module.
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PaymentsIcon from '@mui/icons-material/Payments';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import './CheckoutSteps.css';

// Checkout steps Component.
const CheckoutSteps = ({ step }) => {

	// Shows how many steps are there in process and it's icons.
	const status = [
		{
			// First Step
			label: "Shipping Details",
			icon: <LocalShippingIcon />
		},
		{
			// Second Step
			label: "Review and Confirm Order",
			icon: <CheckCircleIcon />
		},
		{
			// Third Step
			label: "Payment",
			icon: <PaymentsIcon />
		}
	]

	return (
		<Fragment>
			<Stepper>
				{/* Giving top margin. */}
				<div style={{marginTop: "200px"}}></div>
				<Box sx={{ width: '100%' }}>
					{/* Active Step will provide by the component from where this will be called. */}
					<Stepper activeStep={step} alternativeLabel>
						{status.map((item, index) => (
							// Setting up when step is activated.
							// When index and component passed input is same then is active and greater than means it's completed.
							<Step key={index} active={step === index ? true : false}
							completed={step >= index ? true : false}
							>
								{/* Set up the color of active and Completed Steps. */}
								<StepLabel style={{color: step >= index ? "rgb(208, 81, 12)" : "rgba(0, 0, 0, 0.5)"}} icon={item.icon}>{item.label}</StepLabel>
							</Step>
						))}
					</Stepper>
				</Box>
			</Stepper>
		</Fragment>
	)
}

export default CheckoutSteps;
