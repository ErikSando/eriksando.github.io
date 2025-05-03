function ExportData(data) {
    let output = "";

    for (let row of data) {
        for (let pixel of row) {
            output += pixel + " ";
        }

        output += "\n";
    }

    let image_data = output;
    let element = document.createElement("a");
    element.href = "data:attachment/text," + encodeURI(image_data);
    element.target = "_blank";
    element.download = "image-data.txt";
    element.click();
    element.remove();
}

function ImportData() {

}