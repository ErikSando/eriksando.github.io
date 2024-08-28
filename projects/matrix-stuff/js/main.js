// this file was intended to handle GUI and stuff, but I havent started with making that yet

let verycoolepickey = [
    [4, 9],
    [3, 7]
]

let verycoolepicmessage = "ThisIsAnAwesomeAndEpicMessageThatWillNeverBeDecoded";

let verycoolepicencodedmessage = EncodeMessage(verycoolepicmessage, verycoolepickey);
let verycoolepicdecodedmessage = DecodeMessage(verycoolepicencodedmessage, verycoolepickey);

console.log(FormatMessage(verycoolepicencodedmessage));

console.log(verycoolepicencodedmessage, verycoolepicdecodedmessage);

window.addEventListener("load", () => {
    let messageInput = document.getElementById("message");
    let fullCharacterList = document.getElementById("full-character-list");
    let output = document.getElementById("output");
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

        console.log(fullCharacterList.value);
    
        output.textContent = FormatMessage(func(message, key));
    });
    
    document.getElementById("decode").addEventListener("mousedown", () => {
        let message = messageInput.value;

        console.log(message, message.length);
    
        let currentNum = "";
        let formatted = [];
    
        for (let i = 0; i < message.length; i++) {
            let char = message[i];
            if (char == " ") continue;
    
            if (char == "," || char == ";") {
                let num = Number(currentNum);
                formatted.push(num);
                currentNum = "";
                continue;
            }
    
            currentNum += char;
        }
    
        let key = [
            [matrixElems["1-1"].value || 0, matrixElems["1-2"].value || 0],
            [matrixElems["2-1"].value || 0, matrixElems["2-2"].value || 0]
        ]
    
        let func = DecodeMessage;
        if (fullCharacterList.checked) func = DecodeMessage2;
    
        output.textContent = func(formatted, key);
    });
});