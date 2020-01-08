// boolean value to set if toyForm is visible
// set here so it can be toggled by function
let addToy = false

// div to add cards to
let divCollect = document.getElementById('toy-collection')


const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')

// add listener for form submit
toyForm.addEventListener('submit', event => {
  event.preventDefault()
  postToy(event.target)
})

// toggle visibility of form when clicking on "New Toy"
addBtn.addEventListener('click', () => {
  addToy = !addToy // this toggles visibility
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})


// function to POST data to server from form input
function postToy(toy_data) {
  // get resource
  fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": toy_data.name.value,
        "image": toy_data.image.value,
        "likes": 0
      })
    })
    // return json 
    .then(res => res.json())
    // pass json data into functions to render
    .then((obj_toy) => {
      let new_toy = renderToys(obj_toy)
      divCollect.append(new_toy)
    })
}

// fetch resource from /toys
function getToys() {
  return fetch('http://localhost:3000/toys')
    .then(res => res.json())
}

// function to render toys
function renderToys(toy) {
  // create card
  let card = document.createElement('div')
  card.setAttribute('class', 'card')

  // create some elements
  let h2 = document.createElement('h2')
  let p = document.createElement('p')
  let img = document.createElement('img')

  // create like button
  let btn = document.createElement('button')
  btn.setAttribute('class', 'like-btn')
  btn.setAttribute('id', toy.id)
  btn.innerText = "like"
  // work to be done when button is clicked
  btn.addEventListener('click', (e) => {
    console.log(e.target.dataset);
    likes(e)
  })

  // set attributes and values of elements
  h2.innerText = toy.name
  p.innerText = `${toy.likes} likes`
  img.setAttribute('src', toy.image)
  img.setAttribute('class', 'toy-avatar')
  divCard.setAttribute('class', 'card')

  // attach everything to the card
  card.append(h2, img, p, btn)
  
  // add cards to div
  divCollect.append(card)
}

// call on functions to render resource
getToys().then(toys => {
  toys.forEach(toy => {
    renderToys(toy)
  })
})