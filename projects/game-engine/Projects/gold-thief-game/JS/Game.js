const game = new class {
    #characters = [];
    #thiefID;
    #footprintsRemoved = false;
    #thiefShoeSizeRevealed = false;
    #thiefHairColourRevealed = false;
    #thiefGenderRevealed = false;

    #playerSide;
    #computerSide;

    //#playerOneDeck = [];
    //#playerTwoDeck = [];

    //#playerOneHand = [];
    //#playerTwoHand = [];

    #decks = [
        [],
        []
    ]

    #hands = [
        [],
        []
    ]

    #time = [ 24, 24 ]

    #turn = 0;

    get turn() {
        return this.#turn;
    }

    NewGame(playerSide = 0, numberOfCharacters = Settings.NumberOfCharacters) {
        this.#playerSide = playerSide;
        this.#computerSide = (playerSide + 1) % 2;

        this.#footprintsRemoved = false;
        this.#thiefShoeSizeRevealed = false;
        this.#thiefHairColourRevealed = false;
        this.#thiefGenderRevealed = false;

        this.#hands = [
            Settings.PlayerOneStartingHand,
            Settings.PlayerTwoStartingHand
        ]

        let startingDecks = [
            Settings.PlayerOneTotalCards,
            Settings.PlayerTwoTotalCards
        ]

        for (let i = 0; i < this.#hands[0].length; i++) {
            let deckIndex = startingDecks[0].indexOf(this.#hands[0][i]);
            if (deckIndex < 0) continue;
            startingDecks[0].splice(deckIndex, 1);
        }

        for (let i = 0; i < this.#hands[1].length; i++) {
            let deckIndex = startingDecks[1].indexOf(this.#hands[1][i]);
            if (deckIndex < 0) continue;
            startingDecks[1].splice(deckIndex, 1);
        }
        
        this.#decks = startingDecks;

        for (let i = 0; i < Settings.PlayerOneStartingRandomCards; i++) {
            this.#PickUpCard(0);
        }

        for (let i = 0; i < Settings.PlayerTwoStartingRandomCards; i++) {
            this.#PickUpCard(1);
        }

        console.log(this.#hands[0], this.#hands[1], this.#decks[0], this.#decks[1]);

        this.#GenerateRandomCharacters(numberOfCharacters);
        this.#EnterCharacterInformation();
    }

    GetCharacterInformation(ID, info) {
        return this.#characters[ID][info];
    }

    #GenerateRandomCharacters = (n) => {
        this.#thiefID = Random.Integer(0, n - 1);

        for (let i = 0; i < n; i++) {
            let gender = Random.Choice(["Male", "Female"]);

            this.#characters[i] = {
                Name: RandomName(gender),
                ShoeSize: Random.Integer(8, 11),
                HairColour: Random.Choice(["Brown", "Blonde", "Black", "Ginger"]),
                Gender: gender,
            }
        }

        console.log(this.#characters);
        console.log(this.#thiefID);
    }

    GetThiefInformation() {
        let choices = ["ShoeSize", "HairColour", "Gender"];

        if (this.#thiefShoeSizeRevealed || this.#footprintsRemoved) choices.splice(choices.indexOf("ShoeSize"), 1);
        if (this.#thiefHairColourRevealed) choices.splice(choices.indexOf("HairColour"), 1);
        if (this.#thiefGenderRevealed) choices.splice(choices.indexOf("Gender"), 1);

        let choice = Random.Choice(choices);

        switch (choice) {
            case "ShoeSize":
                this.#thiefShoeSizeRevealed = true;
            break;

            case "HairColour":
                this.#thiefHairColourRevealed = true;
            break;

            case "Gender":
                this.#thiefGenderRevealed = true;
            break;
        }

        if (choices.length) return { value: this.GetCharacterInformation(this.#thiefID, choice), type: choice }
    }

    PlayCard(cardID, side) {
        if (side != this.#turn) return;
        
        let cardIndex = this.#hands[side].indexOf(cardID);
        if (cardIndex < 0) return;

        let timeCost = Cards[cardID].timeCost;
        if (timeCost > this.#time[this.#turn]) return;

        this.#hands[side].splice(cardIndex, 1);
        this.#time[this.#turn] -= timeCost;

        // play card

        this.#PickUpCard(side); // DECIDE: should the next card be picked up right after playing or after the turn is over?
    
        if (this.#time[this.#turn] == 0) this.EndTurn();
    }

    EndTurn() {
        this.#turn = (this.#turn + 1) % 2;
        this.#time[this.#turn] = 24;
    }

    #PickUpCard = (side) => {
        if (!this.#decks[side].length) return;

        let nextCardIndex = Random.Integer(0, this.#decks[side].length - 1);
        let nextCard = this.#decks[side][nextCardIndex];

        this.#decks[side].splice(nextCardIndex, 1);
        this.#hands[side].push(nextCard);

        return nextCard;

        // if (side) { // detective
        //     if (!this.#playerTwoDeck.length) return;

        //     let nextCardIndex = Random.Integer(0, this.#playerTwoDeck.length - 1)
        //     let nextCard = this.#playerTwoDeck[nextCardIndex];
        //     this.#playerTwoDeck.splice(nextCardIndex, 1);
        //     this.#playerTwoHand.push(nextCard);
        // }
        // else { // thief
        //     if (!this.#playerOneDeck.length) return;

        //     let nextCardIndex = Random.Integer(0, this.#playerOneDeck.length - 1)
        //     let nextCard = this.#playerOneDeck[nextCardIndex];
        //     this.#playerOneDeck.splice(nextCardIndex, 1);
        //     this.#playerOneHand.push(nextCard);
        // }
    }

    #EnterCharacterInformation = () => {
        let expandedName = {
            "Name": "Name",
            "ShoeSize": "Shoe Size",
            "HairColour": "Hair Colour",
            "Gender": "Gender"
        }

        for (let member of CharacterInformationUI.members) {
            let infoKey = member.infoKey;
            let character = infoKey[0];
            let type = infoKey[1];

            if (this.#playerSide && type != "Name") {
                member.text = expandedName[type] + ": ???";
                continue;
            }

            let value = this.#characters[character][type];
            member.text = expandedName[type] + ": " + value;
        }
    }
}