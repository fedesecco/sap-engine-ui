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
            /* ANIMAL GENERAL DIV */
            let playedAnimal = document.createElement("div");
            playedAnimal.setAttribute("class", "asset");
            playedAnimal.setAttribute("id", "pets["+index+"]");

            /*OWNED PET IMG */
            let animalImg = document.createElement("img");
            animalImg.setAttribute("class", "flex-item bordered-asset");
            animalImg.setAttribute("src", "assets/"+pet.type+".svg");
            animalImg.setAttribute("alt", pet.type);
            animalImg.setAttribute("id", "pet-img-"+index);

            /*OWNED PET ATK */
            let animalAttack = document.createElement("span");
            animalAttack.setAttribute("class", "pet-attack-value bordered-asset");
            animalAttack.setAttribute("id", "attack-pet-"+index);
            animalAttack.innerHTML=pet.attack+pet.temporaryAttack;

            /*OWNED PET HEALTH */
            let animalHealth = document.createElement("span");
            animalHealth.setAttribute("class", "pet-health-value bordered-asset");
            animalHealth.setAttribute("id", "health-pet-"+index);
            animalHealth.innerHTML=pet.health+pet.temporaryHealth;

            /*OWNED PET HELD FOOD */
            let animalHeldFood = document.createElement("img");
            animalHeldFood.setAttribute("src", "assets/"+pet.food+".svg");
            animalHeldFood.setAttribute("alt", pet.food);
            animalHeldFood.setAttribute("class", "held-food bordered-asset");
            animalHeldFood.setAttribute("id", "held-food-pet-"+index);

            /*OWNED PET XP */
            const spanXpEmpty = "<span class=\"iconify\" data-icon=\"fluent:oval-16-filled\" data-inline=\"true\" style=\"color: black\"></span>"
            const spanXpFull = "<span class=\"iconify\" data-icon=\"fluent:oval-16-filled\" data-inline=\"true\" style=\"color: gold\"></span>"
            let animalXp = document.createElement("span");
            animalXp.setAttribute("class", "pet-xp-value");
            animalXp.setAttribute("id", "xp-pet-"+index);
            if (pet.xp == 0){
                animalXp.innerHTML=spanXpEmpty+spanXpEmpty;
            }
            else if (pet.xp ==1){
                animalXp.innerHTML=spanXpFull+spanXpEmpty;
            }
            else if (pet.xp ==2){
                animalXp.innerHTML=spanXpEmpty+spanXpEmpty+spanXpEmpty;
            }
            else if (pet.xp ==3){
                animalXp.innerHTML=spanXpFull+spanXpEmpty+spanXpEmpty;
            }
            else if (pet.xp ==4){
                animalXp.innerHTML=spanXpFull+spanXpFull+spanXpEmpty;
            }
            else if (pet.xp ==5){
                animalXp.innerHTML=spanXpFull+spanXpFull+spanXpFull;
            }

            playedAnimal.appendChild(animalImg);
            playedAnimal.appendChild(animalXp);
            playedAnimal.appendChild(animalAttack);
            playedAnimal.appendChild(animalHealth);
            playedAnimal.appendChild(animalHeldFood);
            

            document.getElementById("pets").appendChild(playedAnimal);
        }
        else{
            /*EMPTY OWNED PET */
            let playedAnimal = document.createElement("div");
            playedAnimal.setAttribute("class", "asset");
            playedAnimal.setAttribute("id", "pets["+index+"]");

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
            playedAnimal.setAttribute("id", "shop["+index+"]");

            /* SHOP PET IMG */
            let animalImg = document.createElement("img");
            animalImg.setAttribute("class", "flex-item bordered-asset");
            animalImg.setAttribute("src", "assets/"+pet.type+".svg");
            animalImg.setAttribute("alt", pet.type);
            animalImg.setAttribute("id", "pet-img-"+index);

            /* SHOP PET ATTACK */
            let animalAttack = document.createElement("span");
            animalAttack.setAttribute("class", "pet-attack-value bordered-asset");
            animalAttack.setAttribute("id", "attack-pet-"+index);
            animalAttack.innerHTML=pet.attack+pet.temporaryAttack;

            /* SHOP PET HEALTH */
            let animalHealth = document.createElement("span");
            animalHealth.setAttribute("class", "pet-health-value bordered-asset");
            animalHealth.setAttribute("id", "health-pet-"+index);
            animalHealth.innerHTML=pet.health+pet.temporaryHealth;

            /* SHOP PET PRICE */
            let animalPrice = document.createElement("span");
            animalPrice.setAttribute("class", "price");
            animalPrice.setAttribute("id", "price-pet-"+index);
            animalPrice.innerHTML=pet.price;

            playedAnimal.appendChild(animalImg);
            playedAnimal.appendChild(animalAttack);
            playedAnimal.appendChild(animalHealth);
            playedAnimal.appendChild(animalPrice);

            document.getElementById("shop-pets").appendChild(playedAnimal);
        }
        else{
            /* EMPTY SHOP PET */
            let playedAnimal = document.createElement("div");
            playedAnimal.setAttribute("class", "asset");
            playedAnimal.setAttribute("id", "shop["+index+"]");

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
            playedAnimal.setAttribute("id", "shopFood["+index+"]");

            /* SHOP FOOD IMG */
            let animalImg = document.createElement("img");
            animalImg.setAttribute("class", "flex-item bordered-asset shop-food");
            animalImg.setAttribute("src", "assets/"+food.type+".svg");
            animalImg.setAttribute("alt", food.type);
            animalImg.setAttribute("id", "food-img-"+index);


            /* SHOP FOOD PRICE */
            let animalPrice = document.createElement("span");
            animalPrice.setAttribute("class", "price");
            animalPrice.setAttribute("id", "price-pet-"+index);
            animalPrice.innerHTML=food.price;

            playedAnimal.appendChild(animalImg);
            playedAnimal.appendChild(animalPrice);
            document.getElementById("shop-food").appendChild(playedAnimal);
        }
        else{
            let playedAnimal = document.createElement("div");
            playedAnimal.setAttribute("class", "asset");
            playedAnimal.setAttribute("id", "shopFood["+index+"]");

            let animalImg = document.createElement("img");
            animalImg.setAttribute("class", "flex-item bordered-asset no-shadow");
            animalImg.setAttribute("src", "assets/empty-asset.png");
            animalImg.setAttribute("alt", "empty space");

            playedAnimal.appendChild(animalImg);
            document.getElementById("shop-food").appendChild(playedAnimal);
        }
    });

    /* HIGHLIGHT MOVE  buy; sell; freeze; unfreeze; move; roll; end-turn*/
    let suggestedActionTarget = eval("data."+data.target);

    switch (data.suggestedAction) {
        case "buy":
            document.getElementById("action-to-do").setAttribute("style", "color: gold");
            document.getElementById("action-to-do").innerHTML="Buy "+suggestedActionTarget.type;
            document.getElementById("action-filler-text").classList.remove("hidden");

            document.getElementById(data.target).classList.add("buy");
            document.getElementById(data.destination).classList.add("destination");
            break;

        case "sell":
            document.getElementById("action-to-do").setAttribute("style", "color: red");
            document.getElementById("action-to-do").innerHTML="Sell "+suggestedActionTarget.type;

            document.getElementById(data.target).classList.add("sell");
            break;

        case "freeze":
            document.getElementById("action-to-do").setAttribute("style", "color: lightblue");
            document.getElementById("action-to-do").innerHTML="Freeze "+suggestedActionTarget.type;

            document.getElementById(data.target).classList.add("freeze");
            break;

        case "unfreeze":
            document.getElementById("action-to-do").setAttribute("style", "color: rgb(255, 79, 47)");
            document.getElementById("action-to-do").innerHTML="Unfreeze "+suggestedActionTarget.type;

            document.getElementById(data.target).classList.add("unfreeze");
            break;

        case "move":
            document.getElementById("action-to-do").setAttribute("style", "color: rgb(221, 116, 253)");
            document.getElementById("action-to-do").innerHTML="Move "+suggestedActionTarget.type;
            document.getElementById("action-filler-text").classList.remove("hidden");

            document.getElementById(data.target).classList.add("move");
            document.getElementById(data.destination).classList.add("destination");
            break;

        case "roll":
            document.getElementById("action-to-do").innerHTML="ROLL";
            break;

        case "end-turn":
            document.getElementById("action-to-do").innerHTML="END TURN";
            break;
    }
}

generateAssets();