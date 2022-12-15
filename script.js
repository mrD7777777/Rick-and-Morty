getData();
async function getData() {
  let response = await fetch("https://rickandmortyapi.com/api/character");
  let data = await response.json();
  // for (let el in data)
  // console.log(el);
  return data.results;
}

let newData = await getData();

const cards = document.querySelector(".info__cards");
const input = document.querySelector("#Name");
const select = document.querySelector("#species");

function createCard(obj) {
  const card = document.createElement("div");
  const foto = document.createElement("img");
  const infoCard = document.createElement("div");
  const name = document.createElement("p");
  const gender = document.createElement("p");
  const species = document.createElement("p");
  const status = document.createElement("p");

  card.className = "info__card";
  foto.className = "info__foto";
  infoCard.className = "info__card__main";
  name.className = "info__card__title";
  gender.className = "info__card__text";
  species.className = "info__card__text";
  status.className = "info__card__text";

  foto.setAttribute("src", `${obj.image}`);
  foto.style.backgroundColor = "red";

  name.textContent = ` Name: ${obj.name}`;
  species.textContent = ` Species: ${obj.species}`;
  gender.textContent = `Gender: ${obj.gender}`;
 status.textContent = `Status: ${obj.status} `;

  card.append(foto);
  card.append(infoCard);
  infoCard.append(name);
  infoCard.append(gender);
  infoCard.append(species);
  infoCard.append(status);

  return card;
}

function showCard(arr) {
  arr.forEach((el) => {
    let person = {
      name: el.name,
      gender: el.gender,
      image: el.image,
      species: el.species,
      status: el.status,
    };
    cards.append(createCard(el));
  });
}
showCard(newData);

function searchCard(arr) {
  let search = newData
    .filter((el) =>
      el.name.toLowerCase().includes(input.value.trim().toLowerCase())
    )
    .filter((el) => el.species.includes(select.value));
  cards.innerHTML = "";
  showCard(search)
}

function createOption(el) {
  const option = document.createElement("option");
  option.className = "about__item";
  option.textContent = el;
  option.value = el;
  select.append(option);
}

function allSpeciess(arr) {
  let species = arr.map((el) => el.species).filter((el) => el !== "");
  console.log(species);
  return species;
}
const allSpecies = allSpeciess(newData);
const someSpecies = [...new Set(allSpecies)];

function showSpecies(arr) {
  arr.forEach((el) => createOption(el));
}
showSpecies(someSpecies);

input.addEventListener("input", searchCard);
select.addEventListener("change", searchCard);
