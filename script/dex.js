const poke_img = document.querySelector("#pokemon_image");
const poke_num = document.querySelector("#pokemon_number");
const poke_name = document.querySelector("#pokemon_name");
const poke_search = document.querySelector("#pokemon-search");
const prev_btn = document.querySelector("#prev");
const pos_btn = document.querySelector("#pos");
const form_input = document.querySelector("#form")

let incialNumber = 1;

const fetchAPI = async (pokemon) => {
    const APIrequest= await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(APIrequest.status === 200){
        const poke_data = await APIrequest.json();
        return poke_data
    }
};
const pokemonScreen = async (pokemon) => {
    const data = await fetchAPI(pokemon);
    if(data){
        poke_num.innerHTML = data.id;
        poke_name.innerHTML = data.name;
        poke_img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${data.id}.gif` 
    }else{
        poke_num.innerHTML = "???";
        poke_name.innerHTML = "???";
        poke_img.style.display = "none";
    }
};

form_input.addEventListener("submit", (event) => {
    event.preventDefault();
    poke_name.innerHTML = "Waiting..."
    poke_num.innerHTML = "?";
    pokemonScreen(poke_search.value.toLowerCase());
    poke_search.value = "";
})

prev_btn.addEventListener("click", () => {
    if(incialNumber <= 1){
        incialNumber = 1
        pokemonScreen(incialNumber);
    }else{
        incialNumber--
        pokemonScreen(incialNumber);
    }
})
pos_btn.addEventListener("click", () => {
    incialNumber++
    pokemonScreen(incialNumber);
})

pokemonScreen(incialNumber);
