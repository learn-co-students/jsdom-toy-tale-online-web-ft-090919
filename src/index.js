const toysUrl = "http://localhost:3000/toys";

function getToys(toysUrl) {
  fetch(toysUrl)
    .then(response => response.json())
    .then(toys => toys.forEach(toy => renderToy(toy)));
}

function renderToy(toy) {
  const collectionContainer = document.querySelector('#toy-collection');
  const card = buildToyCard(toy);
  collectionContainer.appendChild(card);
}

function buildToyCard(toy) {
  // [div, header, image, paragraph, button];
  const elements = getElements();
  // [header, paragraph, button]
  const textElements = [...elements.slice(1, 2), ...elements.slice(3)];
  // [headerText, paragraphText, buttonText]
  const textContent = getTextContent(toy);
  // assign attributes to elements
  assignHtmlAttributes(elements[0], elements[2], elements[4], toy);
  // assign text content to textElements
  assignTextContent(textElements, textContent);
  // append elements to div
  const div = appendElements(elements);

  return div;
}

function getElements() {
  const div = document.createElement('div');
  const header = document.createElement('h2');
  const image = document.createElement('img');
  const paragraph = document.createElement('p');
  const button = document.createElement('button');

  return [div, header, image, paragraph, button];
}

function getTextContent(toy) {
  const headerText = document.createTextNode(toy.name);
  const paragraphText = document.createTextNode(`${toy.likes} Likes`);
  const buttonText = document.createTextNode('Like <3');

  return [headerText, paragraphText, buttonText];
}

function assignHtmlAttributes(div, img, button, toy) {
  div.className += "card";
  div.id = toy.id;
  img.className += "toy-avatar";
  img.src = `${toy.image}`;
  button.className += "like-btn";

  button.addEventListener('click', function(e) {
    const card = e.target.parentNode;
    addLike(card);
  });
}

function assignTextContent(elements, text) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].appendChild(text[i]);
  }
}

function appendElements(elements) {
  let div;

  for (let i = 0; i < elements.length; i++) {
    if (i == 0) {
      continue;
    }
    div = elements[i - i];
    div.appendChild(elements[i]);
  }
  return div;
}

function toggleToyForm(formContainer, addToy) {
  addToy = !addToy
  if (addToy) {
    formContainer.style.display = 'block'
  } else {
    formContainer.style.display = 'none'
  }
}

function addNewToy(name, imageUrl) {
  const configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({ name: name, image: imageUrl, likes: 0 })
  };

  fetch(toysUrl, configObj)
    .then(response => response.json())
    .then(toy => renderToy(toy));
}

function addLike(card) {
  let likes = parseInt(card.querySelector('p').textContent);
  likes++;

  let configObj = {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ "likes": likes })
  };

  return fetch(`${toysUrl}/${card.id}`, configObj)
          .then(renderLike(card, likes));
}

function renderLike(card, likes) {
  card.querySelector('p').textContent = `${likes} Likes`;
}

document.addEventListener("DOMContentLoaded", () => {
  let addToy = false;
  const addBtn = document.querySelector('#new-toy-btn');
  const toyFormContainer = document.querySelector('.container');
  const toyForm = document.querySelector('.add-toy-form');
  const nameInput = document.querySelector('#toy-name');
  const urlInput = document.querySelector('#toy-url');
  // const toyCollection = document.querySelector('#toy-collection');
  getToys(toysUrl);

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    toggleToyForm(toyFormContainer, addToy);
  });

  toyForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = nameInput.value;
    const url = urlInput.value;
    addNewToy(name, url);
    toyForm.reset();
  });
});
