let healthbarBackground = new Frame(5, 5, 200, 40);
healthbarBackground.outlineColour = 'rgb(60, 60, 60)';
healthbarBackground.outlineSize = 2;
healthbarBackground.bgColour = 'rgb(100, 100, 100)';

let healthbar = new Frame(5, 5, 200, 40);
healthbar.bgColour = 'green';

let healthbarText = new TextLabel('Health: 100%', 5, 5, 200, 40, 'Arial', '30px');
healthbarText.bgTransparency = 1;
healthbarText.textAllignX = Enum.TextAllignX.Left;
healthbarText.textAllignY = Enum.TextAllignY.Centre;

window.addEventListener('load', () => {
    let fpsDisplay = new TextLabel('FPS: 0', window.innerWidth - (TextWidth('FPS: XX') + 5), 40, 'Arial', '30px');
    fpsDisplay.bgTransparency = 1;
    fpsDisplay.textAllignX = Enum.TextAllignX.Right;
    fpsDisplay.textAllignY = Enum.TextAllignY.Centre;
    fpsDisplay.visible = false;

    player.HealthChanged = () => {
        healthbar.scale.x = 200 / (player.maxDefence / player.defence);
    }

    Input.AddKeyEvent('F9', () => {
        fpsDisplay.visible = true;
    }, () => {
        return;
    });
})