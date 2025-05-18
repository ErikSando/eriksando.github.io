const NW = Game.Settings.NativeWidth;
const NH = Game.Settings.NativeHeight;

Game.Settings.BackgroundColour = "rgb(16, 32, 64)";

const Title = new TextLabel(new Vector(0, 25), new Vector(NW, 40), "Gold Thief Game");
Title.textSize = 40;

const Bar = new UIObject(new Vector(NW/4, 90), new Vector(NW/2, 1));
Bar.outlineThickness = 2;
Bar.outlineColour = "white";

const ChooseSide = new TextLabel(new Vector(0, 115), new Vector(NW, 30), "Choose a side");
ChooseSide.textSize = 30;

const side = -1;

const Thief = new TextButton(new Vector(NW/2 - 150/2, 180), new Vector(150, 40), "Thief");
Thief.textSize = 25;
Thief.bgColour = "rgb(15, 30, 60)";
Thief.outlineColour = "white";
Thief.outlineThickness = 3;
Thief.MouseEnter.AddListener(() => { Thief.bgColour = "rgb(10, 20, 40)" });
Thief.MouseExit.AddListener(() => { Thief.bgColour = "rgb(15, 30, 60)" });
Thief.Mouse1Down.AddListener(() => { Thief.bgColour = "rgb(20, 40, 80)" });
Thief.Mouse1Up.AddListener(() => { Thief.bgColour = "rgb(10, 20, 40)" });

const ThiefDescription = new TextLabel(new Vector(0, 240), new Vector(NW, 25), "Steal gold from the king's castle, and mislead the detective to prevent him from identifying you.");
ThiefDescription.textSize = 25;

const Detective = new TextButton(new Vector(NW/2 - 150/2, 300), new Vector(150, 40), "Detective");
Detective.textSize = 25;
Detective.bgColour = "rgb(15, 30, 60)";
Detective.outlineColour = "white";
Detective.outlineThickness = 3;
Detective.MouseEnter.AddListener(() => { Detective.bgColour = "rgb(10, 20, 40)" });
Detective.MouseExit.AddListener(() => { Detective.bgColour = "rgb(15, 30, 60)" });
Detective.Mouse1Down.AddListener(() => { Detective.bgColour = "rgb(20, 40, 80)" });
Detective.Mouse1Up.AddListener(() => { Detective.bgColour = "rgb(10, 20, 40)" });

const DetectiveDescription = new TextLabel(new Vector(0, 360), new Vector(NW, 25), "You have been hired by the king to find the gold thief. Gather and verify information to find the thief.");
DetectiveDescription.textSize = 25;

const RandomSide = new TextButton(new Vector(NW/2 - 150/2, 420), new Vector(150, 40), "Random");
RandomSide.textSize = 25;
RandomSide.bgColour = "rgb(15, 30, 60)";
RandomSide.outlineColour = "white";
RandomSide.outlineThickness = 3;
RandomSide.MouseEnter.AddListener(() => { RandomSide.bgColour = "rgb(10, 20, 40)" });
RandomSide.MouseExit.AddListener(() => { RandomSide.bgColour = "rgb(15, 30, 60)" });
RandomSide.Mouse1Down.AddListener(() => { RandomSide.bgColour = "rgb(20, 40, 80)" });
RandomSide.Mouse1Up.AddListener(() => { RandomSide.bgColour = "rgb(10, 20, 40)" });

const RandomDescription = new TextLabel(new Vector(0, 480), new Vector(NW, 25), "Play a random side.");
RandomDescription.textSize = 25;

const StartMenuUI = [ Title, Bar, ChooseSide, Thief, ThiefDescription, Detective, DetectiveDescription, RandomSide, RandomDescription ]

// GENERAL GAMEPLAY UI FOR BOTH PLAYERS

const CardsBackground = new UIObject(new Vector(20, 660), new Vector(1160, 400));
CardsBackground.bgColour = "rgb(20, 40, 80)";
CardsBackground.outlineColour = "white";
CardsBackground.outlineThickness = 3;

const TimeBalance = new TextLabel(new Vector(20, 625), new Vector(120, 25), "Time: 24");
TimeBalance.textAlignX = TextAlignX.Left;
//TimeBalance.textSize = 25;

const PlayCard = new TextButton(new Vector(840, 990), new Vector(150, 50), "Play Card");
PlayCard.bgColour = "rgb(15, 30, 60)";
PlayCard.outlineColour = "white";
PlayCard.outlineThickness = 3;
PlayCard.MouseEnter.AddListener(() => { PlayCard.bgColour = "rgb(10, 20, 40)" });
PlayCard.MouseExit.AddListener(() => { PlayCard.bgColour = "rgb(15, 30, 60)" });
PlayCard.Mouse1Down.AddListener(() => { PlayCard.bgColour = "rgb(20, 40, 80)" });
PlayCard.Mouse1Up.AddListener(() => { PlayCard.bgColour = "rgb(10, 20, 40)" });

const EndTurn = new TextButton(new Vector(1010, 990), new Vector(150, 50), "End Turn");
EndTurn.bgColour = "rgb(15, 30, 60)";
EndTurn.outlineColour = "white";
EndTurn.outlineThickness = 3;
EndTurn.MouseEnter.AddListener(() => { EndTurn.bgColour = "rgb(10, 20, 40)" });
EndTurn.MouseExit.AddListener(() => { EndTurn.bgColour = "rgb(15, 30, 60)" });
EndTurn.Mouse1Down.AddListener(() => { EndTurn.bgColour = "rgb(20, 40, 80)" });
EndTurn.Mouse1Up.AddListener(() => { EndTurn.bgColour = "rgb(10, 20, 40)" });

const InformationBackground = new UIObject(new Vector(1000, 20), new Vector(900, 620));
InformationBackground.bgColour = "rgb(20, 40, 80)";
InformationBackground.outlineColour = "white";
InformationBackground.outlineThickness = 3;

const VillageGround = new ImageLabel(new Vector(20, 100), new Vector(960, 505));
VillageGround.outlineColour = "white";
VillageGround.outlineThickness = 3;

const CardAbilityBackground = new UIObject(new Vector(1200, 660), new Vector(700, 400));
CardAbilityBackground.bgColour = "rgb(20, 40, 80)";
CardAbilityBackground.outlineColour = "white";
CardAbilityBackground.outlineThickness = 3;

const tl = InformationBackground.position;

// const CharacterOneName = new TextLabel(new Vector(tl.x + 20, tl.y + 20), new Vector(200, 25), "Name (house 1):");
// CharacterOneName.textAlignX = TextAlignX.Left;
// CharacterOneName.textSize = 20;

// const CharacterOneShoeSize = new TextButton(new Vector(tl.x + 20, tl.y + 50), new Vector(200, 25), "Shoe size: ???");
// CharacterOneShoeSize.textAlignX = TextAlignX.Left;
// CharacterOneShoeSize.textSize = 20;
// CharacterOneShoeSize.bgOpacity = 0;
// CharacterOneShoeSize.outlineThickness = 0;

// const CharacterOneHairColour = new TextButton(new Vector(tl.x + 20, tl.y + 80), new Vector(200, 25), "Hair Colour: ???");
// CharacterOneHairColour.textAlignX = TextAlignX.Left;
// CharacterOneHairColour.textSize = 20;
// CharacterOneHairColour.bgOpacity = 0;
// CharacterOneHairColour.outlineThickness = 0;

// const CharacterOneGender = new TextButton(new Vector(tl.x + 20, tl.y + 110), new Vector(200, 25), "Gender: ???");
// CharacterOneGender.textAlignX = TextAlignX.Left;
// CharacterOneGender.textSize = 20;
// CharacterOneGender.bgOpacity = 0;
// CharacterOneGender.outlineThickness = 0;

// const CharacterTwoName = new TextLabel(new Vector(tl.x + 240, tl.y + 20), new Vector(200, 25), "Name (house 2):");
// CharacterTwoName.textAlignX = TextAlignX.Left;
// CharacterTwoName.textSize = 20;

// const CharacterTwoShoeSize = new TextButton(new Vector(tl.x + 240, tl.y + 50), new Vector(200, 25), "Shoe size: ???");
// CharacterTwoShoeSize.textAlignX = TextAlignX.Left;
// CharacterTwoShoeSize.textSize = 20;
// CharacterTwoShoeSize.bgOpacity = 0;
// CharacterTwoShoeSize.outlineThickness = 0;

// const CharacterTwoHairColour = new TextButton(new Vector(tl.x + 240, tl.y + 80), new Vector(200, 25), "Hair Colour: ???");
// CharacterTwoHairColour.textAlignX = TextAlignX.Left;
// CharacterTwoHairColour.textSize = 20;
// CharacterTwoHairColour.bgOpacity = 0;
// CharacterTwoHairColour.outlineThickness = 0;

// const CharacterTwoGender = new TextButton(new Vector(tl.x + 240, tl.y + 110), new Vector(200, 25), "Gender: ???");
// CharacterTwoGender.textAlignX = TextAlignX.Left;
// CharacterTwoGender.textSize = 20;
// CharacterTwoGender.bgOpacity = 0;
// CharacterTwoGender.outlineThickness = 0;

// const CharacterThreeName = new TextLabel(new Vector(tl.x + 460, tl.y + 20), new Vector(200, 25), "Name (house 2):");
// CharacterThreeName.textAlignX = TextAlignX.Left;
// CharacterThreeName.textSize = 20;

// const CharacterThreeShoeSize = new TextButton(new Vector(tl.x + 460, tl.y + 50), new Vector(200, 25), "Shoe size: ???");
// CharacterThreeShoeSize.textAlignX = TextAlignX.Left;
// CharacterThreeShoeSize.textSize = 20;
// CharacterThreeShoeSize.bgOpacity = 0;
// CharacterThreeShoeSize.outlineThickness = 0;

// const CharacterThreeHairColour = new TextButton(new Vector(tl.x + 460, tl.y + 80), new Vector(200, 25), "Hair Colour: ???");
// CharacterThreeHairColour.textAlignX = TextAlignX.Left;
// CharacterThreeHairColour.textSize = 20;
// CharacterThreeHairColour.bgOpacity = 0;
// CharacterThreeHairColour.outlineThickness = 0;

// const CharacterThreeGender = new TextButton(new Vector(tl.x + 460, tl.y + 110), new Vector(200, 25), "Gender: ???");
// CharacterThreeGender.textAlignX = TextAlignX.Left;
// CharacterThreeGender.textSize = 20;
// CharacterThreeGender.bgOpacity = 0;
// CharacterThreeGender.outlineThickness = 0;

const CharacterInformationUI = new UIGroup();

for (i = 0; i < Settings.NumberOfCharacters; i++) {
    let row = Math.floor(i / 4);
    let column = i % 4;

    let topLeft = InformationBackground.position.plus(new Vector(20 + 220 * column, 20 + 110 * row));

    let name = new TextLabel(topLeft, new Vector(200, 25));
    name.textAlignX = TextAlignX.Left;
    name.textSize = 20;
    name.infoKey = [ i, "Name" ]

    let shoeSize = new TextButton(topLeft.plus(new Vector(0, 25)), new Vector(200, 25));
    shoeSize.textAlignX = TextAlignX.Left;
    shoeSize.textSize = 20;
    shoeSize.bgOpacity = 0;
    shoeSize.outlineThickness = 0;
    shoeSize.infoKey = [ i, "ShoeSize" ]

    let hairColour = new TextButton(topLeft.plus(new Vector(0, 50)), new Vector(200, 25));
    hairColour.textAlignX = TextAlignX.Left;
    hairColour.textSize = 20;
    hairColour.bgOpacity = 0;
    hairColour.outlineThickness = 0;
    hairColour.infoKey = [ i, "HairColour" ]

    let gender = new TextButton(topLeft.plus(new Vector(0, 75)), new Vector(200, 25));
    gender.textAlignX = TextAlignX.Left;
    gender.textSize = 20;
    gender.bgOpacity = 0;
    gender.outlineThickness = 0;
    gender.infoKey = [ i, "Gender" ]

    shoeSize.Mouse1Down.AddListener(() => {
        
    });

    CharacterInformationUI.members.push(name, shoeSize, hairColour, gender);
}

const GameplayUI = new UIGroup([ CardsBackground, TimeBalance, PlayCard, EndTurn, InformationBackground, VillageGround, CardAbilityBackground, CharacterInformationUI ]);

// PLAYER ONE SPECIFIC UI



const PlayerOneUI = [ GameplayUI,  ]

// PLAYER TWO SPECIFIC UI



const PlayerTwoUI = [ GameplayUI,  ]

const StartMenu = new Scene([], StartMenuUI);
const PlayerOne = new Scene([], PlayerOneUI);
const PlayerTwo = new Scene([], PlayerTwoUI);