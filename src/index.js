let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })
  // get toys
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(object => 
    object.forEach(object => displayToy(object))
    )


  addToyForm()

})

// toy card
function toyCard(toy){
  return `
  <div class="card">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button class="like-btn">Like <3</button>
  </div>
  `
}

// append to html
function displayToy(toy) {
  const toyCollection = document.getElementById('toy-collection')
  toyCollection.innerHTML += toyCard(toy)
}

// Post from form
function addToyForm(){
  const newToyForm = document.querySelector(".add-toy-form")
  newToyForm.addEventListener("submit", function(event){
    event.preventDefault()
    let nameInput = this.querySelectorAll('.input-text')[0].value
    let imgInput = this.querySelectorAll('.input-text')[1].value

    // Post data
    fetch("http://localhost:3000/toys/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"    
      },
      body: JSON.stringify({
        name: `${nameInput}`,
        image: `${imgInput}`,
        likes: 0
      })
    }).then(function(response) {
      return response.json()
    })
    .then(displayToy(object))
  })
}

// Update likes

function likes(){
  const toyCards = document.querySelectorAll('.card')
  toyCards.forEach(activateLike)
}

function activateLike(toy){
  const button = toy.querySelector(".like-btn")
  button.addEventListener('submit', function(event){
    event.preventDefault()
    fetch(`http://localhost:3000/toys/${toy}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"    
      },
      
  })
}