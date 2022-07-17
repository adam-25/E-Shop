# ECommerce-Full-Stack-Website

I have created a MERN stack ECommerece App which may help small business to go online and provide efficient service to their customers. Small businesses can start this app in an hour and can use to run their own business. This app integrates several API's for payments or to store images online. There is two main parts of this app.
```
 1). User: Users can create their accounts, place order, can check their order status.
 2). Admin: Admin can do all the user stuff as well as they can view total orders, total sales, total users, total products, create, update, delete products, users and reviews of the product.
```
## Download node and npm

<ol>
 <li> <a href="https://nodejs.org/en/download/" target="_blank"> Download Node</a> </li>
 <li> Download Node JS according to your OS. </li>
 <li> Follow the instructions and it will download Node and npm to your system. </li>
</ol>

## Clone the repo and Setup Config file

<ol>
 <li> Go to BackEnd folder and Create Folder name Config. </li>
 <li> Create config.env file inside this folder. </li>
</ol>

## Setup MongoDB database, Cloudinary and Stripe

<ol>
 <li> You need to setup mongodb Atlas account for project to run smoothly. Go through this video to set MongoDB Atlas at <a href="https://www.youtube.com/watch?v=OuCrHynro0w&list=PLurIMwd6GdCj_VlnKVceR66Sxfcb37VU8&index=5" target="_blank">4:50</a> </li>
 <li> Copy the link that you see in the video at 8:15 and store it. </li>
 <li> Create Account on <a href="https://cloudinary.com/" target="_blank">Cloudinary</a> </li>
 <li> Create an Account on <a href="https://stripe.com/en-gb-ca" target="_blank">Stripe</a> </li>
 </ol>
  
## Write config variables

Go to config.env file and write below variables.
| Name | Value |
| --- | --- |
| PORT | 4000 |
| MONGO_CONNECT_URL | (write an url that you copy from mongodb website. Add your password of mongo in place of <password>) |
| SERVICE | gmail |
| MY_EMAIL | (your email) |
| MY_PASSWORD | (your gmail password) |
| SMPT_HOST | stmp.gmail.com |
| GMAIL_PORT | 465 |
| SECRET_KEY | (anything that you want to write, but make sure you keep it secret) |
| JWT_EXPIRE | 2d |
| COOKIE_EXPIRE | 2 |
| CLOUDINARY_NAME | (go to your cloudinary account and write your name from cloudinary) |
| CLOUDINARY_API_KEY | (go to your clodinary account and write your api key) |
| CLOUDINARY_SECRET_KEY | (go to your cloudinary account and write your secret key) |
| STRIPE_KEY | (go to your stripe account and write your stripe key) |
| STRIPE_SECRET_KEY | (go to your stripe account and write your stripe secret key) |
 
## Instructions to run
```
  1). Run "npm install" in the root of the project directory which will install all the node modules.
  2). Run "yarn install" in the frontend folder which install all require modules for React.
  3). Run "yarn run build" in the frontend folder which will create a build directory with a production build of the app.
  4). Run "npm start" in the root directory of the project.
  5). Go to "http://localhost:4000/" to run website locally.
  6). In order to become an "admin", you need to change your role in "userinfos" collection in MongoDB database in userRole field from user to "admin".
```
## Note
  
  You can check the website <a href="https://e-commerce-e-shop.herokuapp.com/" target="_blank">here</a>.
