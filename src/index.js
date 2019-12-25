// get Andy's toys

function getToys(){
    fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(toys => {
      toys.forEach(toy => displayToy(toy))
    })
    // .then(data => console.log(data)) exactly the same as above
  }
  
  // actual toy card HTML
  function toyCard(toy){
    return `
    <div class="card">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar">
      <p>${toy.likes} Likes <p>
      <button class="like-btn">Like <3</button>
    </div>
    `
  }
  
  // append toy card to the HTML
  
  const displayToy = (toy) => {
    const toyCollection = document.getElementById("toy-collection")
    toyCollection.innerHTML += toyCard(toy)
  }
  
  
  document.addEventListener("DOMContentLoaded", ()=>{
    let addToy = false
    const addBtn = document.querySelector('#new-toy-btn')
    const toyForm = document.querySelector('.container')
    addBtn.addEventListener('click', () => {
      // hide & seek with the form
      addToy = !addToy
      if (addToy) {
        toyForm.style.display = 'block'
      } else {
        toyForm.style.display = 'none'
      }
    })
  
    
  })
  
  
  function addToyForm(){
    const newToyForm = document.querySelector('.add-toy-form');
    newToyForm.addEventListener("submit", function(event){
    event.preventDefault()
    let nameInput = this.querySelector("#toy-name").value
    let imageInput = this.querySelector("#toy-image").value
    fetch("http://localhost:3000/toys/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: `${nameInput}`,
        image: `${imageInput}`,
        likes: 0
      })
    }).then(resp => resp.json())
    .then(displayToy)
  })
  }
  
  getToys()
  addToyForm()
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // console.log("1")
  // const thisReturnsAPromise = function(){
  //   return new Promise(
  //     function(resolve, reject){
  //       resolve("asyc JS is...")
  //     }
  //   )
  // }
  
  // const secondFunction = function(dataFromFirst){
  //   return new Promise(
  //     function(resolve, reject){
  //       resolve(dataFromFirst + "interesting")
  //     }
  //   )
  // }
  
  // thisReturnsAPromise().then(data => secondFunction(data)).then(fullString => console.log(fullString))
  
  
  // console.log("2")