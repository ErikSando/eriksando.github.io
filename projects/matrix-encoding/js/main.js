window.addEventListener("load", () => {
    let messageInput = document.getElementById("message");
    let fullCharacterList = document.getElementById("full-character-list");
    let output = document.getElementById("output");
    let separator = document.getElementById("separator");
    let matrixElems = {
        "1-1": document.getElementById("1-1"),
        "1-2": document.getElementById("1-2"),
        "2-1": document.getElementById("2-1"),
        "2-2": document.getElementById("2-2")
    }

    matrixElems["1-1"].value = 4;
    matrixElems["1-2"].value = 9;
    matrixElems["2-1"].value = 3;
    matrixElems["2-2"].value = 7;

    document.getElementById("encode").addEventListener("mousedown", () => {
        let message = messageInput.value;
    
        let key = [
            [matrixElems["1-1"].value || 0, matrixElems["1-2"].value || 0],
            [matrixElems["2-1"].value || 0, matrixElems["2-2"].value || 0]
        ]
    
        let func = EncodeMessage;
        if (fullCharacterList.checked) func = EncodeMessage2;

        let separatorCharacter = ";"

        switch (separator.value) {
            // case "Semi colons":
            //     separatorCharacter = ";";
            // break;

            case "Commas":
                separatorCharacter = ",";
            break;

            default:
                separatorCharacter = ";";
            break;
        }
    
        output.textContent = FormatMessage(func(message, key), separatorCharacter);
    });
    
    document.getElementById("decode").addEventListener("mousedown", () => {
        let message = UnFormatMessage(messageInput.value);
    
        let key = [
            [matrixElems["1-1"].value || 0, matrixElems["1-2"].value || 0],
            [matrixElems["2-1"].value || 0, matrixElems["2-2"].value || 0]
        ]
    
        let func = DecodeMessage;
        if (fullCharacterList.checked) func = DecodeMessage2;
    
        output.textContent = func(message, key);
    });
});