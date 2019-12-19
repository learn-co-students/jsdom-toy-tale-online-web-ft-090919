let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });

  renderToys();
  addToyForm();
});

function toyCard(toy) {
  return ` 
  <div class= 'card'>
  <h2>${toy.name}</h2>
  <img src= '${toy.image}' class= 'toy-avatar'>
  <p>${toy.likes} Likes </p>
  <button class= 'like-btn'>Like</button>
  </div>
  `;
}

function listToys(dataArray) {
  const toyCollection = document.querySelector("#toy-collection");

  dataArray.forEach(function(element) {
    toyCollection.innerHTML += toyCard(element);
  });
}

function renderToys() {
  return fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(json => listToys(json));
}

function addToyForm() {
  const newToyForm = document.querySelector(".add-toy-form");
  newToyForm.addEventListener("submit", function(event) {
    event.preventDefault();
    let nameInput = this.querySelector("#toy-name").value;
    let imageInput = this.querySelector("#toy-image").value;
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: `${nameInput}`,
        image: `${imageInput}`,
        likes: 0
      })
    })
      .then(response => response.json())
      .then(console.log);
  });
}
