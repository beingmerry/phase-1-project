// 🎯🟢 Fetch the breweries near you! Boulder by default

const cityFetch = (city="Boulder") =>{
    fetch(`https://api.openbrewerydb.org/breweries?by_city=${city}`)
    .then(response => response.json())
    .then(breweries => {
       if(breweries.length === 0){ 
        listBreweries.textContent = "No Breweries Found"
       } else {
        loadSearchResults(breweries)
       }
    })
    .catch((error)=> {
        console.error(error)
        listBreweries.textContent = "API SERVER ERROR"
    })   
}

// 🎯 Go to local db and grab favorites list, render at page load
const favoritesFetch = () =>{
    myBreweriesList.innerHTML = ""
    fetch(`http://localhost:3000/myBreweryList`)
    .then(response => response.json())
    .then(myBreweries => myBreweries.forEach(brewery => renderFavorite(brewery.name)))
    .catch((error)=> console.error(error))   
}

const loadSearchResults = (breweries) => {
    listBreweries.innerHTML = ""
    allBreweries = [...breweries]
    breweries.forEach(brewery => {  
      const newBreweryListElement = document.createElement('li')
      newBreweryListElement.textContent = brewery.name
      newBreweryListElement.id          = `${brewery.id}`
      newBreweryListElement.classList.add('brewery-list-element')
      newBreweryListElement.addEventListener('click', ()=>renderBrewery(brewery))
      listBreweries.appendChild(newBreweryListElement)
    });
    renderBrewery(breweries[0])
  }


  const renderBrewery = (brewery)=>{
    currentBrewery.breweryApiId       = brewery.id
    currentBrewery.name               = brewery.name
    currentBrewery.breweryType        = brewery.brewery_type.toUpperCase()
    currentBrewery.breweryFullAddress = `${brewery.street}, ${brewery.city}, ${brewery.state} ${brewery.postal_code}`
    currentBrewery.url                = brewery.website_url

    breweryName.dataset.id     = currentBrewery.breweryApiId      
    breweryName.textContent    = currentBrewery.name              
    breweryType.textContent    = currentBrewery.breweryType       
    breweryAddress.textContent = currentBrewery.breweryFullAddress
    brewerySite.textContent    = currentBrewery.url               
    brewerySite.href           = currentBrewery.url
}

const renderFavorite = (breweryName) =>{
    const newBrewery = document.createElement('li')
    //
    const idValue    = myBreweriesList.children.length + 1
    newBrewery.classList.add('my-brewery-list-element')
    newBrewery.id = `my-brewery-${idValue}`
    //brewery name is calling a global level variable and needs to call an argument
    newBrewery.textContent = breweryName
    favorites = [...favorites, breweryName]
    myBreweriesList.appendChild(newBrewery)
}

const postNewBrewery = ()=>{
    // 🎯🚩 Check current favorites before posting duplicate to db.json
    if (0 === favorites.filter(favorite => favorite===currentBrewery.name).length) {
        fetch(`http://localhost:3000/myBreweryList`,{
            method:`POST`,
            headers: {
                'Content-Type': 'application/json',
                Accept : 'application/json'
            },
            body: JSON.stringify(currentBrewery) 
        })
        .then(response=> response.json())
        .then(breweryAdded => renderFavorite(breweryName.textContent))
        .catch(err => console.error(err))
    }
}