// 🏗️ Import list of dependencies

fetch(``)
.then(response => response.json())
.then(park => {
  console.log(park.data[0].fullName)
  const h1 = document.querySelector('h1')
  h1.textContent = park.data[0].fullName
})
//JS code below
