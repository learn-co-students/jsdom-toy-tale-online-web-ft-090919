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

})

function getToys(){
  return fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(toys => {
    toys.forEach(toy => {
    addToys(toy))
    })
  })
}

function addToys(toy) {
  const container = document.getElementById('toy-collection')
  const div = document.createElement('div')
  div.className = 'card'

  const h2 = document.createElement('h2')
  h2.innerText = toy.name

  const img = document.createElement('img')
  img.setAttribute('src', toy.image)
  img.className = 'toy-avatar')

  const p = document.createElement('p')
  p.innerText = `${toy.likes} likes`

  let btn = document.createElement('button')
  btn.className = 'like-btn'
  btn.innerText = "Like <3"

  div.appendChild(h2, img, p, btn)
  container.appendChild(div)
}