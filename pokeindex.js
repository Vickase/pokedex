const handleError = err => {
  alert(`Hubo un error. ${err}`);
};

const urlBase = "https://pokeapi.co/api/v2/pokemon";

const fetchPokemon = async id => {
  try {
    const res = await axios.get(`${urlBase}/${id}`);
    const pokeData = res.data;
    insertPokeImg(pokeData.sprites.front_default);
    insertPokeName(pokeData.id, pokeData.name);
    insertPokeAbility(pokeData.abilities);
    insertPokeTypes(pokeData.types);
  } catch (err) {
    handleError(err);
  }
};

const insertPokeImg = link => {
  const divImg = document.querySelector("#img-container");
  divImg.innerHTML = "";
  const imgTag = document.createElement("img");
  imgTag.style.width = "200px";
  imgTag.style.height = "200px";
  imgTag.src = link;
  divImg.appendChild(imgTag);
};

const insertPokeName = (id, name) => {
  const pokeInfo = document.querySelector("#info-container");
  pokeInfo.innerHTML = "";
  const infoDiv = document.createElement("div");
  infoDiv.className = "infoDiv";
  const spanId = document.createElement("span");
  spanId.className = "spanId";
  spanId.textContent = `${id} - ${name}`;
  infoDiv.appendChild(spanId);
  pokeInfo.appendChild(infoDiv);
};

const insertPokeAbility = arrAbilities => {
  // itera y agrega al dom
  const pokeInfo = document.querySelector("#info-container");

  const ul = document.createElement("ul");
  ul.className = "abilitiList";
  ul.innerHTML = "";
  for (let ability of arrAbilities) {
    const li = document.createElement("li");
    li.className = "pokeElements";
    li.innerHTML = ability.ability.name;
    ul.appendChild(li);
    pokeInfo.appendChild(ul);
  }
};

const pokeButton = document.querySelector("#go-button");
const pokeInput = document.querySelector("#input-search");
const randomPokemon = document.querySelector("#random-poke");

const isValidPokemon = idPokemon => idPokemon != "" && idPokemon > 0 && idPokemon <= 802;

const getPokemon = () => {
  const idPokemon = document.querySelector("#input-search").value;
  if (isValidPokemon(idPokemon)) {
    fetchPokemon(idPokemon);
  }
};

const getRandomPokemon = () => {
  const randomId = Math.floor(Math.random() * 802) + 1;
  fetchPokemon(randomId);
  pokeInput.value = randomId;
};


pokeButton.addEventListener("click", getPokemon);
randomPokemon.addEventListener("click", getRandomPokemon);

pokeInput.addEventListener("keydown", event => {
  if (event.keyCode === 13) {
    getPokemon();
  }
});




const insertPokeTypes = types => {
  const divPokeInfo = document.querySelector("#info-container");
  const typeDiv = document.createElement("div");
  typeDiv.setAttribute("id", "poke-types");
  typeDiv.innerHTML = "";
  for (let type of types) {
    let span = document.createElement("span");
    span.innerHTML = type.type.name;
    span.classList.add(`type-${type.type.name}`);
    typeDiv.appendChild(span);
    divPokeInfo.appendChild(typeDiv);
  }
};

const previous = document.querySelector("#previous");
const next = document.querySelector("#next");

const nextPkm = async () => {
  const input = document.querySelector("#input-search");
  const pokeId=parseInt(input.value)+ 1;
  if (isValidPokemon(pokeId)) {
    fetchPokemon(pokeId);
    input.value = pokeId;
  }
};

const previousPkm = async () => {
  const input = document.querySelector("#input-search");
  const pokeId=parseInt(input.value)- 1;
  if (isValidPokemon(pokeId)) {
    fetchPokemon(pokeId);
    input.value = pokeId;
  }
};

next.addEventListener("click", nextPkm);
previous.addEventListener("click", previousPkm);

window.addEventListener("load",getRandomPokemon);



