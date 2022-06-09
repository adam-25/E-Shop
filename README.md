# ECommerce-Full-Stack-Website

I have created a MERN stack ECommerece App which may help small business to go online and provide efficient service to the customers. Small businesses can start this app in an hour and can use to run their own business. This app integrates several API's for payments or to store images online. There is two main parts of this app.

 &emsp; 1). User: Users can create their accounts, place order, can check their order         status. </br >
 &emsp; 2). Admin: Admin can do all the user stuff as well as they can view total orders,     total sales, total users, total products, create, update, delete products, users and reviews of the product.

## Download node and npm

 &emsp; 1).<a href="https://nodejs.org/en/download/" target="_blank"> Download Node</a> <br />
 &emsp; 2). Download Node JS according to your OS. <br />
 &emsp; 3). Follow the instructions and it will download Node and npm to your system. <br />
  
## Clone the repo and Setup Config file

 &emsp; 1). Go to BackEnd folder and Create Folder name Config. <br />
 &emsp; 2). Create config.env file inside this folder. <br />

## Setting up MongoDB database, Cloudinary and Stripe

  &emsp; 1). You need to setup mongodb Atlas account for project to run smoothly. Go through   this video to set MongoDB Atlas at <a href="https://www.youtube.com/watch?v=OuCrHynro0w&list=PLurIMwd6GdCj_VlnKVceR66Sxfcb37VU8&index=5" target="_blank">4:50</a> <br />
  &emsp; 2). Copy the link that you see in the video at 8:15 and store it. <br /> 
  &emsp; 3). Create Account on <a href="https://cloudinary.com/" target="_blank">Cloudinary</a> <br />
 &emsp;  4). Create an Account on <a href="https://stripe.com/en-gb-ca" target="_blank">Stripe</a> <br />
  
## Write config variables

Go to config.env file and write below variables.

  &emsp; PORT=4000 <br />
 &emsp;  MONGO_CONNECT_URL=(write an url that you copy from mongodb website. Add your password of mongo in place of <password>).<br />
  &emsp; SERVICE=gmail<br />
  &emsp; MY_EMAIL=(your email)<br />
  &emsp; MY_PASSWORD=(your gmail password)<br />
  &emsp; SMPT_HOST=stmp.gmail.com<br />
  &emsp; GMAIL_PORT=465<br />
  &emsp; SECRET_KEY=(anything that you want to write, but make sure you keep it secret)<br />
  &emsp; JWT_EXPIRE=2d<br />
  &emsp; COOKIE_EXPIRE=2<br />
  &emsp; CLOUDINARY_NAME=(go to your cloudinary account and write your name from cloudinary)<br />
  &emsp; CLOUDINARY_API_KEY=(go to your clodinary account and write your api key)<br />
  &emsp; CLOUDINARY_SECRET_KEY=(go to your cloudinary account and write your secret key)<br />
  &emsp; STRIPE_KEY=(go to your stripe account and write your stripe key)<br />
  &emsp; STRIPE_SECRET_KEY=(go to your stripe account and write your stripe secret key)<br />

## Instructions to run

  &emsp; 1). Run `npm install` in the root of the project directory which will install all the node modules. <br />
  &emsp; 2). Run `yarn install` in the frontend folder which install all require modules for React. <br />
  &emsp; 3). Run `yarn run build` in the frontend folder which will create a build directory with a production build of the app. <br />
  &emsp; 4). Run `npm start` in the root directory of the project. <br />
  &emsp; 5). Go to <a href="http://localhost:4000/" target="_blank">Link</a> <br />
  &emsp; 6). In order to become an admin, you need to change your role in `userinfos` collection in MongoDB database in `userRole` field from `user` to `admin`.
  
## Note
  
  You can check the website <a href="https://e-commerce-e-shop.herokuapp.com/" target="_blank">here</a>.
