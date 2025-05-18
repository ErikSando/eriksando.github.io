function ExportData(grid) {
    let output = "";

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            output += Math.round(grid[row][col]);
            if (col < 8) output += " ";
        }

        output += "\n";
    }

    let element = document.createElement("a");
    element.href = "data:attachment/text," + encodeURI(output);
    element.target = "_blank";
    element.download = "sudoku-data";
    element.click();
    element.remove();
}

function ImportData() {
    
}