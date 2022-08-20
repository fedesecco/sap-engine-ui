/* async function getdata() {
    const config = await fetch("config.json");
    const configData = await config.json();

    const response = await fetch(configData.apiURL);
    const data = await response.json().then(generateAs)
}
 */



let configData = null;
let data = null;
let actionToPost = "buy";
let elementsSelected = 0;
let selectedAsset1 = "";
let selectedAsset2 = "";

function generateAssets() {
    //CLEAR ANY PAST VALUE
    document.getElementById("coins").innerHTML="";
    document.getElementById("health").innerHTML="";
    document.getElementById("trophies").innerHTML="";
    document.getElementById("round").innerHTML="";
    document.getElementById("pets").innerHTML="";
    document.getElementById("shop-pets").innerHTML="";
    document.getElementById("shop-food").innerHTML="";


    /* SET COINS, HEALTH, TROPHIES, ROUND */
    document.getElementById("coins").innerHTML=data.coins;
    document.getElementById("health").innerHTML=data.health;
    document.getElementById("trophies").innerHTML=data.trophies;
    document.getElementById("round").innerHTML=data.round;

    /* GENERATE ANIMALS:
    <div class="asset" id="pet-x" onClick="action(pet-0)">
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
            playedAnimal.setAttribute("id", `pets[${index}]`);
            playedAnimal.setAttribute("onClick", `action("pets[${index}]")`);

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
    //let suggestedActionTargetName = eval("data."+data.target).type.replace('pet-','').replace('food-','');
    let suggestedActionTargetName = eval("data."+refactorInput(data.target)).type.replace('pet-','').replace('food-','');

    switch (data.suggestedAction) {
        case "buy":
            document.getElementById("action-to-do").setAttribute("style", "color: gold");
            document.getElementById("action-to-do").innerHTML="Buy "+suggestedActionTargetName;
            document.getElementById("action-filler-text").classList.remove("hidden");

            document.getElementById(refactorInput(data.target)).classList.add("buy");
            document.getElementById(refactorInput(data.destination)).classList.add("destination");
            break;

        case "sell":
            document.getElementById("action-to-do").setAttribute("style", "color: red");
            document.getElementById("action-to-do").innerHTML="Sell "+suggestedActionTargetName;

            document.getElementById(refactorInput(data.target)).classList.add("sell");
            break;

        case "freeze":
            document.getElementById("action-to-do").setAttribute("style", "color: lightblue");
            document.getElementById("action-to-do").innerHTML="Freeze "+suggestedActionTargetName;

            document.getElementById(refactorInput(data.target)).classList.add("freeze");
            break;

        case "unfreeze":
            document.getElementById("action-to-do").setAttribute("style", "color: rgb(255, 79, 47)");
            document.getElementById("action-to-do").innerHTML="Unfreeze "+suggestedActionTargetName;

            document.getElementById(refactorInput(data.target)).classList.add("unfreeze");
            break;

        case "move":
            document.getElementById("action-to-do").setAttribute("style", "color: rgb(221, 116, 253)");
            document.getElementById("action-to-do").innerHTML="Move "+suggestedActionTargetName;
            document.getElementById("action-filler-text").classList.remove("hidden");

            document.getElementById(refactorInput(data.target)).classList.add("move");
            document.getElementById(refactorInput(data.destination)).classList.add("destination");
            break;

        case "roll":
            document.getElementById("action-to-do").innerHTML="ROLL";
            break;

        case "end-turn":
            document.getElementById("action-to-do").innerHTML="END TURN";
            break;
    }
}

function refactorInput(input){
    if(input[0] === 0){
        let newInput = `pets[${input[1]}]`;
        return newInput;
    }
    else if(input[0] === 1){
        let newInput = `shop[${input[1]}]`;
        return newInput;
    }
    else if(input[0] === 2){
        let newInput = `shopFood[${input[1]}]`;
        return newInput;
    }
}

function refactorOutput(output){
    if(output.startsWith("pets")){
        let newOutput = [0,Number(output.replace('pets[', '').replace(']',''))];
        return newOutput;
    }
    else if(output.startsWith("shop[")){
        let newOutput = [1,Number(output.replace('shop[', '').replace(']',''))];
        return newOutput;
    }
    else if(output.startsWith("shopFood")){
        let newOutput = [2,Number(output.replace('shopFood[', '').replace(']',''))];
        return newOutput;
    }
}

function action(asset){
    if(!actionToPost == "" && elementsSelected===0){
        elementsSelected = 1;
        selectedAsset1 = asset;
        document.getElementById(asset).classList.add("selected");
        attemptToPOST();
    }
    else if (!actionToPost == "" && elementsSelected===1){
        if(asset==selectedAsset1){
            elementsSelected = 0;
            selectedAsset1 = "";
            document.getElementById(asset).classList.remove("selected");
        }
        else {
            elementsSelected = 0;
            selectedAsset2 = asset;
            document.getElementById(asset).classList.remove("selected");
            attemptToPOST();
        }
    }
}

function attemptToPOST() {
    if((actionToPost == "buy"||actionToPost=="move")&&selectedAsset1!=""&&selectedAsset2!=""){
        window.post = function(url, data) {
            return fetch(url, {method: "POST", headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)});
        }
        post(configData.apiURL, {moveCode : data.moveCode,action: actionToPost,target: refactorOutput(selectedAsset1), destination: refactorOutput(selectedAsset2)});
        actionToPost = "";
        selectedAsset1 = "";
        selectedAsset2 = "";
    }
    else if (actionToPost=="sell"||actionToPost=="freeze"||actionToPost=="unfreeze"&&!selectedAsset1==""){
        window.post = function(url, data) {
            return fetch(url, {method: "POST", headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)});
        }
        post(configData.apiURL, {moveCode : data.moveCode,action: actionToPost,target: refactorOutput(selectedAsset1)});
        actionToPost = "";
        selectedAsset1 = "";
    }
    else if (actionToPost=="roll"||actionToPost=="end-turn"){
        window.post = function(url, data) {
            return fetch(url, {method: "POST", headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)});
        }
        post(configData.apiURL, {moveCode : data.moveCode,action: actionToPost});
        actionToPost = "";
    }
}

function selectAction(action){
    actionToPost = action;
    attemptToPOST();
}
function boh2(dataTemp){
    data = dataTemp;
    generateAssets();
}
function parseData(datas){
    let dataTemp = datas.json();
    dataTemp.then(boh2)
}
function boh(config) {
    configData = config;
        fetch(config.apiURL+"/gamestate")
        .then(parseData)
}
function jsonify(content){
    let config = content.json();
    config.then(boh)
}
fetch("./config.json")
    .then(jsonify)