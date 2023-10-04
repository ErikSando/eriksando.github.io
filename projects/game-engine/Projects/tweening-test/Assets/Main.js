let uiObject = new UIObject(new Vector(200, 300), new Vector(500, 200));
uiObject.bgColour = "white";
uiObject.outlineColour = "black";
uiObject.outlineThickness = 3;

Game.scene = new Scene([], [uiObject]);
Game.Settings.BackgroundColour = "rgb(110, 120, 130)";

let time = 9;
let type = TweenType.Linear;
let direction = TweenDirection.In;
let propertyTable = {
    position: new Vector(1200, 600),
    bgOpacity: 0.1,
    outlineOpacity: 0.1
}

Game.Loaded.AddListener(() => {
    Game.CreateCanvas();
    Game.Start();

    let tweenInfo = new TweenInfo(time, type, direction, propertyTable);
    let tween = new Tween(uiObject, tweenInfo);

    let start = performance.now();

    tween.Play();

    setTimeout(tween.Pause, (time / 3) * 1000);
    setTimeout(tween.Play, (time / 1.5) * 1000);

    console.log("Target time:", time, "seconds");

    tween.Ended.AddListener(() => {
        let duration = (performance.now() - start) / 1000;

        console.log("Completed in:", duration, "seconds");

        let achievedResults = {}
        let correct = true;
        for (let property in propertyTable) {
            achievedResults[property] = uiObject[property];
            if (achievedResults[property] != propertyTable[property]) correct = false;
        }

        console.log("Correct properties:", correct);
    });
});