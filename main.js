async function generateAssets() {
    /* GET DATA FROM JSON FILE */
    const response = await fetch('test-api.json');
    const data = await response.json();
    console.log(data);

    /* SET COINS, HEALTH, TROPHIES, ROUND */
    document.getElementById("coins").innerHTML=data.coins;
    document.getElementById("health").innerHTML=data.health;
    document.getElementById("trophies").innerHTML=data.trophies;
    document.getElementById("round").innerHTML=data.round;

    /* GENERATE ANIMALS:
    <div class="asset" id="pet-x">
        <img class="flex-item bordered-asset" src="assets/pet-bat.svg" alt="" id="pet-img-x">
        <span class="pet-attack-value" id="attack-pet-X">X</span>
        <span class="pet-health-value" id="health-pet-X">X</span>
        <span class="held-food" id="held-food-pet-X">X</span>
    </div>
    */
    data.pets.map((pet, index) => {
        if(pet != null){
            let playedAnimal = document.createElement("div");
            playedAnimal.setAttribute("class", "asset");
            playedAnimal.setAttribute("id", "pet-"+index);

            let animalImg = document.createElement("img");
            animalImg.setAttribute("class", "flex-item bordered-asset");
            animalImg.setAttribute("src", "assets/"+pet.type+".svg");
            animalImg.setAttribute("alt", pet.type);
            animalImg.setAttribute("id", "pet-img-"+index);

            let animalAttack = document.createElement("span");
            animalAttack.setAttribute("class", "pet-attack-value");
            animalAttack.setAttribute("id", "attack-pet-"+index);
            animalAttack.innerHTML=pet.attack+pet.temporaryAttack;

            let animalHealth = document.createElement("span");
            animalHealth.setAttribute("class", "pet-health-value");
            animalHealth.setAttribute("id", "health-pet-"+index);
            animalHealth.innerHTML=pet.health+pet.temporaryHealth;

            let animalHeldFood = document.createElement("img");
            animalHeldFood.setAttribute("src", "assets/"+pet.food+".svg");
            animalHeldFood.setAttribute("alt", pet.food);
            animalHeldFood.setAttribute("class", "held-food");
            animalHeldFood.setAttribute("id", "held-food-pet-"+index);

            playedAnimal.appendChild(animalImg);
            playedAnimal.appendChild(animalAttack);
            playedAnimal.appendChild(animalHealth);
            playedAnimal.appendChild(animalHeldFood);

            document.getElementById("pets").appendChild(playedAnimal);
        }
        else{
            let playedAnimal = document.createElement("div");
            playedAnimal.setAttribute("class", "asset");
            playedAnimal.setAttribute("id", "pet-"+index);

            let animalImg = document.createElement("img");
            animalImg.setAttribute("class", "flex-item bordered-asset no-shadow");
            animalImg.setAttribute("src", "assets/empty-asset.png");
            animalImg.setAttribute("alt", "empty space");

            playedAnimal.appendChild(animalImg);
            document.getElementById("pets").appendChild(playedAnimal);
        }
    });

    /* GENERATE SHOP ANIMALS */
    data.shop.map((pet, index) => {
        if(pet != null){
            let playedAnimal = document.createElement("div");
            playedAnimal.setAttribute("class", "asset");
            playedAnimal.setAttribute("id", "pet-"+index);

            let animalImg = document.createElement("img");
            animalImg.setAttribute("class", "flex-item bordered-asset");
            animalImg.setAttribute("src", "assets/"+pet.type+".svg");
            animalImg.setAttribute("alt", pet.type);
            animalImg.setAttribute("id", "pet-img-"+index);

            let animalAttack = document.createElement("span");
            animalAttack.setAttribute("class", "pet-attack-value");
            animalAttack.setAttribute("id", "attack-pet-"+index);
            animalAttack.innerHTML=pet.attack+pet.temporaryAttack;

            let animalHealth = document.createElement("span");
            animalHealth.setAttribute("class", "pet-health-value");
            animalHealth.setAttribute("id", "health-pet-"+index);
            animalHealth.innerHTML=pet.health+pet.temporaryHealth;

            playedAnimal.appendChild(animalImg);
            playedAnimal.appendChild(animalAttack);
            playedAnimal.appendChild(animalHealth);

            document.getElementById("shop-pets").appendChild(playedAnimal);
        }
        else{
            let playedAnimal = document.createElement("div");
            playedAnimal.setAttribute("class", "asset");
            playedAnimal.setAttribute("id", "pet-"+index);

            let animalImg = document.createElement("img");
            animalImg.setAttribute("class", "flex-item bordered-asset no-shadow");
            animalImg.setAttribute("src", "assets/empty-asset.png");
            animalImg.setAttribute("alt", "empty space");

            playedAnimal.appendChild(animalImg);
            document.getElementById("shop-pets").appendChild(playedAnimal);
        }

    });

    /* GENERATE FOOD */
    data.shopFood.map((food, index) => {
        if(food != null){
            let playedAnimal = document.createElement("div");
            playedAnimal.setAttribute("class", "asset");
            playedAnimal.setAttribute("id", "food-"+index);

            let animalImg = document.createElement("img");
            animalImg.setAttribute("class", "flex-item bordered-asset");
            animalImg.setAttribute("src", "assets/"+food.type+".svg");
            animalImg.setAttribute("alt", food.type);
            animalImg.setAttribute("id", "food-img-"+index);

            playedAnimal.appendChild(animalImg);
            document.getElementById("shop-food").appendChild(playedAnimal);
        }
        else{
            let playedAnimal = document.createElement("div");
            playedAnimal.setAttribute("class", "asset");
            playedAnimal.setAttribute("id", "food-"+index);

            let animalImg = document.createElement("img");
            animalImg.setAttribute("class", "flex-item bordered-asset no-shadow");
            animalImg.setAttribute("src", "assets/empty-asset.png");
            animalImg.setAttribute("alt", "empty space");

            playedAnimal.appendChild(animalImg);
            document.getElementById("shop-food").appendChild(playedAnimal);
        }
    });
}
generateAssets();