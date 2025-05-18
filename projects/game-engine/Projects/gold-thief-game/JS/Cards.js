class Card {
    #ID;
    #side;
    #description;
    #imageSrc;
    #timeCost;
    
    constructor(ID, side, description = "", imageSrc = "", timeCost = 24) {
        this.#ID = ID;
        this.#side = side;
        this.#description = description;
        this.#imageSrc = imageSrc;
        this.#timeCost = timeCost;
    }

    get ID() {
        return this.#ID;
    }

    get side() {
        return this.#side;
    }

    get description() {
        return this.#description;
    }

    get imageSrc() {
        return this.#imageSrc;
    }

    get timeCost() {
        return this.#timeCost;
    }
}

// Thief Cards

const PlantFakeGold = new Card(0, 0,
    "Sneak into another character's house and plant a bag of fake gold to throw off the detective.",
    "",
    24
);

const BuryGold = new Card(1, 0,
    "Bury your bag of gold. If your house is searched in the detective's next turn, the gold won't be found.",
    "",
    12
);

const ReportGold = new Card(2, 0,
    "Report a gold bag found in your own house.",
    "",
    12
);

const FalsifyInformation = new Card(3, 0,
    "Change one piece of information of any character, including yourself.",
    "",
    8
);

const RemoveFootprints = new Card(4, 0,
    "Sneak into the castle and clean the footprints off of the floors, so that the detective can not find the shoe size of the thief if it hasn't been found already.",
    "",
    24
);

const ProbeDetective = new Card(5, 0,
    "Gather three pieces of information that the detective has discovered.",
    "",
    24
);

// Detective Cards

const GuessThief = new Card(6, 1,
    "Choose a character to be guessed as the thief. If you are correct, you win the game. Otherwise, the game continues.",
    "",
    24
);

const SearchHouse = new Card(7, 1,
    "Search a character's house to check for gold.",
    "",
    12
);

const CheckGold = new Card(8, 1,
    "Determine whether the gold found in a character's house is real or fake.",
    "",
    12
);

const ThiefInformation = new Card(9, 1,
    "Acquire one piece of information about the thief.",
    "",
    24
);

const CharacterInformation = new Card(10, 1,
    "Get one piece of information about a chosen character.",
    "",
    6
);

const VerifyInformation = new Card(11, 1,
    "Check whether a piece of information about a character is true or false.",
    "",
    12
);

// Full list

const Cards = [
    PlantFakeGold,
    BuryGold,
    ReportGold,
    FalsifyInformation,
    RemoveFootprints,
    ProbeDetective,
    GuessThief,
    SearchHouse,
    CheckGold,
    ThiefInformation,
    CharacterInformation,
    VerifyInformation
]