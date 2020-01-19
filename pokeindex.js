const handleError = err => {
  alert(`Hubo un error. ${err}`);
};

let imagen;

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
  imgTag.style.width = "100%";
  imgTag.style.height = "100%";
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
  const spanName = document.createElement("span");
  spanName.className = "spanId";
  spanId.textContent = id;
  spanName.textContent = name;
  infoDiv.appendChild(spanId);
  infoDiv.appendChild(spanName);
  pokeInfo.appendChild(infoDiv);
};

const insertPokeAbility = arrAbilities => {
  // itera y agrega al dom
  const pokeInfo = document.querySelector("#info-container");

  const ul = document.createElement("ul");
  ul.className = "abilitiList";
  ul.innerHTML = "";

  const span = document.createElement("span");
  span.className = "abilitySpan";
  span.textContent = "ability:";

  for (let ability of arrAbilities) {
    const li = document.createElement("li");
    li.className = "pokeElements";
    li.innerHTML = ability.ability.name;
    ul.appendChild(li);
    pokeInfo.appendChild(span);
    pokeInfo.appendChild(ul);
  }
};

const pokeButton = document.querySelector("#go-button");
const pokeInput = document.querySelector("#input-search");
const randomPokemon = document.querySelector("#random-poke");

const getPokemon = () => {
  const idPokemon = document.querySelector("#input-search").value;
  if (idPokemon != "" && idPokemon > 0 && idPokemon <= 802) {
    fetchPokemon(idPokemon);
  }
};
pokeButton.addEventListener("click", getPokemon);

pokeInput.addEventListener("keydown", event => {
  if (event.keyCode === 13) {
    getPokemon();
  }
});
randomPokemon.addEventListener("click", () => {
  const randomId = Math.floor(Math.random() * 802) + 1;
  fetchPokemon(randomId);
  pokeInput.value = randomId;
});



const insertPokeTypes = types => {
  const divPokeInfo= document.querySelector("#info-container");
  const typeDiv = document.createElement("div");
  typeDiv.setAttribute("id", "poke-types");
  typeDiv.innerHTML="";
  for(let type of types){
    let span = document.createElement("span");
    span.innerHTML=type.type.name;
    span.classList.add(`type-${type.type.name}`);
    typeDiv.appendChild(span);
    divPokeInfo.appendChild(typeDiv);

  }

};
