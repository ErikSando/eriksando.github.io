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
    },
    {
        name: "SetWidth",
        description: "Set the width to a desired amount (resets the cells).",
        parameters: ["width"],
        parameterDescriptions: ["The value to set the width to."]
    },
    {
        name: "SetHeight",
        description: "Set the height to a desired amount (resets the cells).",
        parameters: ["height"],
        parameterDescriptions: ["The value to set the height to."]
    },
    {
        name: "SetDimensions",
        description: "Set the width and height to the desired amounts (resets the cells).",
        parameters: ["width", "height"],
        parameterDescriptions: ["The value to set the width to.", "The value to set the height to."]
    }
]

function Help() {
    let message = "====== Commands ======\n";
    
    for (let i = 0; i < commands.length; ++i) {
        let command = commands[i];
        
        message += command.name + "("

        for (let i = 0; i < command.parameters.length; ++i) {
            let name = command.parameters[0];

            message += i == 0 ? name : ", " + name;
        }

        message += ")" + "\n" + command.description + "\n";

        for (let i = 0; i < command.parameterDescriptions.length; ++i) {
            message += "\n" + command.parameters[i] + " - " + command.parameterDescriptions[i];
        }

        if (i == commands.length - 1) message += "\n======================\n";
        else message += "\n===\n";
    }

    message += "\n\n====== Keyboard shortcuts ======\n\n";
    message += "P: play/pause.\n";
    message += "===\n";
    message += "I: zoom in.\n";
    message += "- Hold shift for a smaller increment.\n";
    message += "===\n";
    message += "O: zoom out.\n";
    message += "- Hold shift for a smaller increment.\n";
    message += "===\n";
    message += "L: enable/disable outlines.\n";
    message += "===\n";
    message += "T: set generation interval (time between cell updates).\n";
    message += "- Hold down a digit on your keyboard to set the interval time to that number in fifty-ths of a second e.g. 4 = 4/50 = 0.08 seconds.\n";
    message += "===\n";
    message += "Shift + R: reset cells.\n";
    message += "===\n"
    message += "G: generate random layout.\n";
    message += "- Hold down a digit on your keyboard to use that as the parameter for the generate random layout command.\n";
    message += "\n================================";
    
    console.log(message);
}

function GenerateRandomLayout(chance) {
    CellHandler.Reset();

    for (let i = 0; i < CellHandler.columns; ++i) {
        for (let j = 0; j < CellHandler.rows; ++j) {
            if (Random.Integer(1, chance) == 1) CellHandler.AddCell(i, j);
        }
    }
}

function ChangeWidth(change) {
    if (!change || isNaN(change)) return console.error("Invalid argument entered.");
    if (CellHandler.columns + change < 0) return console.error("Can not set the height to a value below zero.");

    CellHandler.columns += change;
    CellHandler.Reset();

    SetData("columns", CellHandler.columns);
}

function ChangeHeight(change) {
    if (!change || isNaN(change)) return console.error("Invalid argument entered.");
    if (CellHandler.rows + change < 0) return console.error("Can not set the width to a value below zero.");

    CellHandler.rows += change;
    CellHandler.Reset();

    SetData("rows", CellHandler.rows);
}

function SetWidth(width) {
    if (!width || isNaN(width)) return console.error("Invalid argument entered.");
    if (width < 0) return console.error("Cannot set the width below zero.");

    CellHandler.columns = width;
    CellHandler.Reset();

    SetData("columns", CellHandler.columns);
}

function SetHeight(height) {
    if (!height || isNaN(height)) return console.error("Invalid argument entered.");
    if (height < 0) return cheightonsole.error("Cannot set the heights below zero.");

    CellHandler.rows = height;
    CellHandler.Reset();

    SetData("rows", CellHandler.rows);
}

function SetDimensions(width, height) {
    SetWidth(width);
    SetHeight(height);
}

console.log("Use \"Help()\" for a list of commands and keyboard shortcuts.");