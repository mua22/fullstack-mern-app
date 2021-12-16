# A Full Stack App developed using MERN

This repo hosts a Express App in main folder and a React App in admin folder

## Run Locally

### Server

from main folder run

> npm install

> npm run dev

Application will start at localhost:/4000
you should have installed nodmeon once using below commad

> npm i nodemon -g

### Client

admin folder resides inside same root folder go to admin folder and execute following commands

> npm i

> npm start

react app will start at localhost:3000/admin

## Deploy

This application is heroku ready you must declare three environment variables namely

jwtPrivateKey

db

sessionSecret

db will contain the connection string of your mongo db
ideally you should create a project at http://mongodb.com and get a connection string from there.

just copy the code in your own repo and link your heroku with this code.

## Data integrity

A Cron job runs at the server to refresh the data every 30 minutes.
comment out

> const { startCronJobs } = require("./croneJobs/index");

to avoid data refresh

## default user

name:"usman",
email:"admin@admin.com"
password:"admin"
roles:["admin","customer"]

every user who has admin in its roles array will be able to modify the data.

## caution

locally react app will not be served from express. In order to do that you need to run following command from admin folder

> npm run build
