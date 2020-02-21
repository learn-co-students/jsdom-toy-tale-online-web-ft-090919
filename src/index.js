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
    toyForm.addEventListener('submit', submitToyForm);
});

function submitToyForm(e) {
    e.preventDefault()
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({
            name: e.target.name.value,
            image: e.target.image.value,
            likes: 0
        })
    }
    fetch('http://localhost:3000/toys', options)
        .then(
            resp => resp.json()
        )
        .then(
            json => addToyCard(json)
        );
}

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
    img.class = 'toy-avatar';
    div.appendChild(img);

    let p = document.createElement('p');
    p.textContent = `${toy.likes} Likes`;
    div.appendChild(p);

    let button = document.createElement('button');
    button.class = 'like-btn';
    button.textContent = 'like';
    button['data-id'] = toy.id;
    div.appendChild(button);
    button.onclick = like;

    document.getElementById('toy-collection').appendChild(div);
}

function like(e) {
    let p = e.target.previousSibling;
    likes = parseInt(p.textContent) + 1;
    let options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({
            likes: likes
        })
    };
    fetch(`http://localhost:3000/toys/${e.target['data-id']}`, options)
        .then(
            resp => resp.json()
        )
        .then(
            json => p.textContent = `${json.likes} Likes`
        )
}
