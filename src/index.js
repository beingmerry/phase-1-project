// 🏗️ Import list of dependencies
import * as dotenv from 'dotenv'; 
import express from 'express';
dotenv.config();


fetch(`https://developer.nps.gov/api/v1/parks?parkCode=yell&api_key=sp0dnsxYnjFUifpp4qWTzlyai6F4p6q547rYujf7`)
.then(response => response.json)
.then(parks => {
  console.log(parks)
})
//JS code below
