let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const submitBtn = document.querySelector(".submit")

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(object => {
    for (const element of object){
      addCard(element)
    }
  })



  submitBtn.addEventListener('click', event => {
    event.preventDefault()

    let firstInput = document.querySelector(".input-text:nth-last-child(5)")
    let secondInput = document.querySelector(".input-text:nth-last-child(3)")

    const configObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"},
      body: JSON.stringify({
        name: firstInput.value,
        image: secondInput.value,
        likes: 0
      }) 
    }
    fetch("http://localhost:3000/toys", configObject)
    .then(response => response.json())
    .then(object => addCard(object))

  })


  function addCard(element){
    let divElement = document.createElement("div")
    divElement.className = "card"
    divElement.id = element.id

    let h2Element = document.createElement('h2')
    h2Element.innerHTML = element.name
    divElement.appendChild(h2Element)
    
    let imgElement = document.createElement("img")
    imgElement.src = element.image
    imgElement.className = "toy-avatar"
    divElement.appendChild(imgElement)

    let pElement = document.createElement("p")
    pElement.innerHTML = element.likes
    divElement.appendChild(pElement)

    let buttonElement = document.createElement("button")
    
    buttonElement.className = "like-btn"
    buttonElement.innerText = "Like <3"
    buttonElement.addEventListener("click", event => {
      let configObject = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"},
        body: JSON.stringify({
          likes: parseInt(event.target.parentElement.querySelector("p").innerHTML, 10) + 1
        }) 
      }

      let more = parseInt(event.target.previousElementSibling.innerText) + 1

      fetch(`http://localhost:3000/toys/${event.target.parentElement.id}`, configObject)
    .then(res => res.json())
    .then((like_obj => {
      event.target.previousElementSibling.innerText = `${more} likes`;
    }))
    })

    divElement.appendChild(buttonElement)

    document.querySelector("#toy-collection").appendChild(divElement)
    
    return element
  }

})
