// 🏗️ Import list of dependencies
import dotenv from 'dotenv';

fetch(`https://developer.nps.gov/api/v1/parks?parkCode=yell&api_key=${API_KEY}`)
.then(response => response.json())
.then(park => {
  console.log(park.data[0].fullName)
  const h1 = document.querySelector('h1')
  h1.textContent = park.data[0].fullName
})
//JS code below
