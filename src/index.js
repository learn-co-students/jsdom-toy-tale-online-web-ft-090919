let addToy = false


function addLike(e){
  let likesNode = e.target.previousElementSibling
  likesNode.textContent = parseInt(likesNode.textContent) + 1
  return likesNode.textContent
}

function createCard(toy){
  let newCard = document.createElement('div')
  let toyCollection = document.querySelector("#toy-collection")

  newCard.setAttribute('class', 'card')

  let h2 = document.createElement('h2')
  h2.innerText = toy.name

  let img = document.createElement('img')
  img.setAttribute('src', toy.image)
  img.setAttribute('width', '100%')

  let p = document.createElement('p')
  p.innerText = toy.likes

  let btn = document.createElement('button')
  btn.setAttribute('class', 'like-btn')
  btn.innerText = "Likes"

  btn.addEventListener('click', function(e){
    e.preventDefault()
    let likes = addLike(e)
    submitRequest('PATCH', `http://localhost:3000/toys/${toy.id}`, {likes: likes}, [console.log])
  })

  newCard.appendChild(h2)
  newCard.appendChild(img)
  newCard.appendChild(p)
  newCard.appendChild(btn)
  toyCollection.appendChild(newCard)
}

function addToyCards(toys){
  for (const toy in toys){
    createCard(toys[toy])
  }
}

function loadToys(){
  fetch("http://localhost:3000/toys")
  .then(function(response){
    return response.json()
  })
  .then(function(toys){
    addToyCards(toys)
  })
}

function submitRequest(reqType, url, data, returnMethod){
  fetch(`${url}`, {
    method: `${reqType}`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(function(resp){ return resp.json()})
  .then(function(json){ returnMethod[0](json)})
}


function clearForm(){
  document.getElementById('name').value = ''
  document.getElementById('image').value = ''
  return true
}


document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')

  addBtn.addEventListener('click', () => {
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }

  })

  toyForm.addEventListener('submit', function(e){
    e.preventDefault()
    let name = document.getElementById('name').value
    let img = document.getElementById('image').value
    clearForm()
    submitRequest('POST', 'http://localhost:3000/toys', {"name": name, "image": img, "likes": 0}, [createCard])

  })

  loadToys()

})
