let commands = [
    {
        name: "GenerateRandomLayout",
        description: "Generate a random layout of cells across the entire grid.",
        parameters: ["chance"],
        parameterDescriptions: ["The chance of a cell being alive, e.g. 3 means a 1 in 3 chance."],
    },

    {
        name: "ChangeWidth",
        description: "Increase/decrease the width of the grid (resets the cells).",
        parameters: ["change"],
        parameterDescriptions: ["The change in width, use a negative value for less width."]
    },

    {
        name: "ChangeHeight",
        description: "Increase/decrease the height of the grid (resets the cells).",
        parameters: ["change"],
        parameterDescriptions: ["The change in height, use a negative value for less height."]
    }
]

function Help() {
    let message = "Commands:";
    
    for (let i = 0; i < commands.length; i++) {
        let command = commands[i];
        
        message += "\n==============================\n" + command.name + "("

        for (let i = 0; i < command.parameters.length; ++i) {
            let name = command.parameters[0];

            message += i == 0 ? name : ", " + name;
        }

        message += ")" + "\n" + command.description + "\n";

        for (let i = 0; i < command.parameterDescriptions.length; ++i) {
            message += "\n" + command.parameters[i] + " - " + command.parameterDescriptions[i];
        }

        if (i == commands.length - 1) message += "\n==============================";
    }

    console.log(message);
}

function GenerateRandomLayout(chance) {
    CellHandler.Clear();

    for (let i = CellHandler.columns; i--;) {
        for (let j = CellHandler.rows; j--;) {
            if (Random.Integer(1, chance) == 1) CellHandler.AddCell(j, i);
        }
    }
}

function ChangeWidth(change) {
    if (CellHandler.rows + change < 0) return console.error("Can not set the width to a value below zero.");

    CellHandler.rows += change;
    CellHandler.Clear();
}

function ChangeHeight(change) {
    if (CellHandler.columns + change < 0) return console.error("Can not set the height to a value below zero.");

    CellHandler.columns += change;
    CellHandler.Clear();
}

console.log("Use \"Help()\" for a list of commands.");