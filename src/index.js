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
    addToys();
});

function addToys(){
    fetch('http://localhost:3000/toys')
        .then(
            resp => resp.json()
        )
        .then(
            json => json.forEach(addToyCard)
        );
}

function addToyCard(toy){
    let div = document.createElement('div');

    let h2 = document.createElement('h2');
    h2.textContent = toy.name;
    div.appendChild(h2);

    let img = document.createElement('img');
    img.src = toy.image;
    div.appendChild(img);

    let p = document.createElement('p');
    p.textConent = toy.likes;
    div.appendChild(p);

    let button = document.createElement('button');
    button.class = 'like-btn';
    div.appendChild(button);

    document.getElementById('toy-collection').appendChild(div);
}
