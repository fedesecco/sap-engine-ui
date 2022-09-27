# sap-engine-ui

**You must be familiar with the game "[super auto pets](https://teamwoodgames.com/ "super auto pets")" to understand this project.**

This project does the following things:
- Read a **gamestate** file, that contains the state of a current Super Auto Pets round. An example of the file will be provided below.
- Visually represent the gamestate, with an UI very similar to the original SAP client.
- Register a move made by the user by clicking the pets/foods, and send it to a server so a new gamestate can be generated. (example: move pet, sell pet, buy food etc).

##How to use sap-engine-ui
This is an example of the gamestate file read by this project (so the file that your program should generate):
```json
	{
        "coins" : 10, //The gold, health, trophies and round of the game in this moment
        "health" : 10,
        "trophies" : 0,
        "round" : 1,
        "moveCode" : 1291095594, //A value provided by the SAP server, unique for each move. Will be sent back in the response file.
        "pets":[ //The purchased pets. Each pet has type, xp, held food, health, atk.
            {"type": "pet-bat", "xp" : 1, "food": "food-melon", "health": 40, "temporaryHealth": 0, "attack": 20, "temporaryAttack" : 0},
            {"type": "pet-fish", "xp" : 2, "food": "", "health": 4, "temporaryHealth": 0, "attack": 2, "temporaryAttack" : 0},
            {"type": "pet-fish", "xp" : 3, "food": "food-garlic", "health": 4, "temporaryHealth": 0, "attack": 2, "temporaryAttack" : 0},
            null,
            {"type": "pet-fish", "xp" : 5, "food": "food-chili", "health": 4, "temporaryHealth": 0, "attack": 2, "temporaryAttack" : 0}
        ],
        "shop":[ //the pets in the shop.
            {"type": "pet-bat", "isFrozen": false, "health": 4, "temporaryHealth": 0, "attack": 2, "temporaryAttack" : 0, "price" : 3},
            {"type": "pet-fish", "isFrozen": true, "health": 4, "temporaryHealth": 0, "attack": 2, "temporaryAttack" : 0, "price" : 3},
            {"type": "pet-fish", "isFrozen": false, "health": 4, "temporaryHealth": 0, "attack": 2, "temporaryAttack" : 0, "price" : 3},
            null,
            {"type": "pet-fish", "isFrozen": false, "health": 4, "temporaryHealth": 0, "attack": 2, "temporaryAttack" : 0, "price" : 3}
        ],
        "shopFood": [ //The food in the shop.
            {"type": "food-apple", "isFrozen": true, "price" : 3},
            null,
            {"type": "food-apple", "isFrozen": false, "price" : 3}
        ], //The action suggested by your SAP move predictor program.
        "suggestedAction" : "move",
        "target" : [0,2], // 0=the first row (pet row, others are shop-pets and shopFood.); 2=the 3rd pet of the row.
        "destination" : [0,4]
    }// In this example, the suggestion is: "move the 3rd purchased pet to the 5th slot of the pets row".
```
1. In the config.json file, enter the URL of your server. The sap-engine-ui will attempt a **FETCH** the /gamestate at that URL every few seconds (example: http://11.11.11/gamestate).
2. Once the gamestate is obtained, the app will wait for the user to input a move.
3. Once a move has been chosen, a json file will be sent with **POST** method at the server URL. example of the file:
```json
{moveCode : data.moveCode,action: "buy",target: [1,3],destination:[0,0]}
```
**moveCode**: The same code received at the beginning. Necessary to validate the move to the SAP real server.
**action**: The action that the user wants to make. Possible actions: buy, sell, freeze, unfreeze, move, roll, end-turn.
**target**: The target of the action. In this case, the user wants to buy the 4th pet of the shop-pets row.
**destination**: The destination of the action. In this example, the user wants to buy a pet and put it in the first slot of the purchased pets row.
4. The app will then wait for a new gamestate, so it can update the game status with the new infos.

## Assets:

- Background and empty pet obtained with a screenshot of a real game.
- All pets and foods are taken from https://github.com/bencoveney/super-auto-pets-db
