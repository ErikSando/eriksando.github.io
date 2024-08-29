let alphabet = ["Z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y"]

let ascii = [];

for (let i = 32; i < 128; i++) {
    ascii.push(String.fromCharCode(i));
}

console.log(ascii);

function Format(n) {
    while (n < 0) n += alphabet.length;
    return n % alphabet.length;
}

function Format2(n) {
    while (n < 0) n += ascii.length;
    return n % ascii.length;
}

function EncodeMessage(message, key) {
    if (!(key instanceof Matrix)) key = new Matrix(2, 2, key);

    let encodedMessage = [];
    
    for (let i = 0; i < Math.ceil(message.length / 4) * 4; i += 4) {
        let _a = message[i],
        _b = message[i + 1] || _a,
        _c = message[i + 2] || _b,
        _d = message[i + 3] || _c;

        let a = alphabet.indexOf(_a.toUpperCase()),
        b = alphabet.indexOf(_b.toUpperCase()),
        c = alphabet.indexOf(_c.toUpperCase()),
        d = alphabet.indexOf(_d.toUpperCase());

        let matrix = new Matrix(2, 2, [[a, b], [c, d]]);
        let encoded = Matrix.Multiply(matrix, key);
        
        encodedMessage.push(Format(encoded.Get(1, 1)), Format(encoded.Get(1, 2)), Format(encoded.Get(2, 1)), Format(encoded.Get(2, 2)));
    }

    return encodedMessage;
}

function EncodeMessageIntoLetters(message, key) {
    if (!(key instanceof Matrix)) key = new Matrix(2, 2, key);

    let encodedMessage = "";
    
    for (let i = 0; i < message.length + message.length % 4; i += 4) {
        let _a = message[i],
        _b = message[i + 1] || _a,
        _c = message[i + 2] || _b,
        _d = message[i + 3] || _c;

        let a = alphabet.indexOf(_a.toUpperCase()),
        b = alphabet.indexOf(_b.toUpperCase()),
        c = alphabet.indexOf(_c.toUpperCase()),
        d = alphabet.indexOf(_d.toUpperCase());

        let matrix = new Matrix(2, 2, [[a, b], [c, d]]);
        let encoded = Matrix.Multiply(matrix, key);
        
        encodedMessage += alphabet[Format(encoded.Get(1, 1))] + alphabet[Format(encoded.Get(1, 2))] + alphabet[Format(encoded.Get(2, 1))] + alphabet[Format(encoded.Get(2, 2))]
    }

    return encodedMessage;
}

function EncodeMessageOfNumbers(message, key) {
    if (!(key instanceof Matrix)) key = new Matrix(2, 2, key);

    let encodedMessage = "";
    
    for (let i = 0; i < message.length + message.length % 4; i += 4) {
        let a = message[i],
        b = message[i + 1],
        c = message[i + 2],
        d = message[i + 3];

        if (typeof b == "undefined") b = a;
        if (typeof c == "undefined") c = b;
        if (typeof d == "undefined") d = c;

        let matrix = new Matrix(2, 2, [[a, b], [c, d]]);
        let encoded = Matrix.Multiply(matrix, key);
        
        encodedMessage += alphabet[Format(encoded.Get(1, 1))] + alphabet[Format(encoded.Get(1, 2))] + alphabet[Format(encoded.Get(2, 1))] + alphabet[Format(encoded.Get(2, 2))]
    }

    return encodedMessage;
}

function EncodeMessage2(message, key) {
    if (!(key instanceof Matrix)) key = new Matrix(2, 2, key);

    let encodedMessage = [];
    
    for (let i = 0; i < message.length + message.length % 4; i += 4) {
        let _a = message[i],
        _b = message[i + 1],
        _c = message[i + 2],
        _d = message[i + 3];

        if (typeof _b == "undefined") _b = _a;
        if (typeof _c == "undefined") _c = _b;
        if (typeof _d == "undefined") _d = _c;

        let a = ascii.indexOf(_a),
        b = ascii.indexOf(_b),
        c = ascii.indexOf(_c),
        d = ascii.indexOf(_d);

        let matrix = new Matrix(2, 2, [[a, b], [c, d]]);
        let encoded = Matrix.Multiply(matrix, key);
        
        encodedMessage.push(Format2(encoded.Get(1, 1)), Format2(encoded.Get(1, 2)), Format2(encoded.Get(2, 1)), Format2(encoded.Get(2, 2)));
    }

    console.log(encodedMessage);

    return encodedMessage;
}

function EncodeMessageIntoLetters2(message, key) {
    if (!(key instanceof Matrix)) key = new Matrix(2, 2, key);

    let encodedMessage = "";
    
    for (let i = 0; i < message.length + message.length % 4; i += 4) {
        let _a = message[i],
        _b = message[i + 1] || _a,
        _c = message[i + 2] || _b,
        _d = message[i + 3] || _c;

        let a = ascii.indexOf(_a.toUpperCase()),
        b = ascii.indexOf(_b.toUpperCase()),
        c = ascii.indexOf(_c.toUpperCase()),
        d = ascii.indexOf(_d.toUpperCase());

        let matrix = new Matrix(2, 2, [[a, b], [c, d]]);
        let encoded = Matrix.Multiply(matrix, key);
        
        encodedMessage += ascii[Format2(encoded.Get(1, 1))] + ascii[Format2(encoded.Get(1, 2))] + ascii[Format2(encoded.Get(2, 1))] + ascii[Format2(encoded.Get(2, 2))]
    }

    return encodedMessage;
}

function EncodeMessageOfNumbers2(message, key) {
    if (!(key instanceof Matrix)) key = new Matrix(2, 2, key);

    let encodedMessage = "";
    
    for (let i = 0; i < message.length + message.length % 4; i += 4) {
        let a = message[i],
        b = message[i + 1] || a,
        c = message[i + 2] || b,
        d = message[i + 3] || c;

        let matrix = new Matrix(2, 2, [[a, b], [c, d]]);
        let encoded = Matrix.Multiply(matrix, key);
        
        encodedMessage += ascii[Format2(encoded.Get(1, 1))] + ascii[Format2(encoded.Get(1, 2))] + ascii[Format2(encoded.Get(2, 1))] + ascii[Format2(encoded.Get(2, 2))]
    }

    return encodedMessage;
}

function DecodeMessage(message, key) {
    if (key instanceof Matrix)  key = key.Inverse();
    else key = new Matrix(2, 2, key).Inverse();

    let decodedMessage = "";

    for (let i = 0; i < message.length; i += 4) {
        let a = message[i],
        b = message[i + 1],
        c = message[i + 2],
        d = message[i + 3];

        if (typeof b == "undefined") b = a;
        if (typeof c == "undefined") c = b;
        if (typeof d == "undefined") d = c;

        let matrix = new Matrix(2, 2, [[a, b], [c, d]]);
        let decoded = Matrix.Multiply(matrix, key);

        decodedMessage += alphabet[Format(decoded.Get(1, 1))] + alphabet[Format(decoded.Get(1, 2))] + alphabet[Format(decoded.Get(2, 1))] + alphabet[Format(decoded.Get(2, 2))]
    }

    return decodedMessage;
}

function DecodeMessageOfLetters(message, key) {
    if (key instanceof Matrix)  key = key.Inverse();
    else key = new Matrix(2, 2, key).Inverse();

    let decodedMessage = "";

    for (let i = 0; i < message.length + message.length % 4; i += 4) {
        let _a = message[i],
        _b = message[i + 1] || _a,
        _c = message[i + 2] || _b,
        _d = message[i + 3] || _c;

        let a = alphabet.indexOf(_a.toUpperCase()),
        b = alphabet.indexOf(_b.toUpperCase()),
        c = alphabet.indexOf(_c.toUpperCase()),
        d = alphabet.indexOf(_d.toUpperCase());

        let matrix = new Matrix(2, 2, [[a, b], [c, d]]);
        let decoded = Matrix.Multiply(matrix, key);

        decodedMessage += alphabet[Format(decoded.Get(1, 1))] + alphabet[Format(decoded.Get(1, 2))] + alphabet[Format(decoded.Get(2, 1))] + alphabet[Format(decoded.Get(2, 2))]
    }

    return decodedMessage;
}

function DecodeMessage2(message, key) {
    if (key instanceof Matrix)  key = key.Inverse();
    else key = new Matrix(2, 2, key).Inverse();

    let decodedMessage = "";

    for (let i = 0; i < message.length; i += 4) {
        let a = message[i],
        b = message[i + 1],
        c = message[i + 2],
        d = message[i + 3];

        if (typeof b == "undefined") b = a;
        if (typeof c == "undefined") c = b;
        if (typeof d == "undefined") d = c;

        let matrix = new Matrix(2, 2, [[a, b], [c, d]]);
        let decoded = Matrix.Multiply(matrix, key);

        decodedMessage += ascii[Format2(decoded.Get(1, 1))] + ascii[Format2(decoded.Get(1, 2))] + ascii[Format2(decoded.Get(2, 1))] + ascii[Format2(decoded.Get(2, 2))]
    }

    return decodedMessage;
}

function DecodeMessageOfNumbers2(message, key) {
    if (key instanceof Matrix)  key = key.Inverse();
    else key = new Matrix(2, 2, key).Inverse();

    let decodedMessage = "";

    for (let i = 0; i < message.length + message.length % 4; i += 4) {
        let _a = message[i],
        _b = message[i + 1] || _a,
        _c = message[i + 2] || _b,
        _d = message[i + 3] || _c;

        let a = ascii.indexOf(_a.toUpperCase()),
        b = ascii.indexOf(_b.toUpperCase()),
        c = ascii.indexOf(_c.toUpperCase()),
        d = ascii.indexOf(_d.toUpperCase());

        let matrix = new Matrix(2, 2, [[a, b], [c, d]]);
        let decoded = Matrix.Multiply(matrix, key);

        decodedMessage += ascii[Format2(decoded.Get(1, 1))] + ascii[Format2(decoded.Get(1, 2))] + ascii[Format2(decoded.Get(2, 1))] + ascii[Format2(decoded.Get(2, 2))]
    }

    return decodedMessage;
}

function FormatMessage(message, seperator = ";") {
    let formatted = "";
    
    for (let i = 0; i < message.length - 1; i++) {
        formatted += message[i] + seperator + " ";
    }

    formatted += message[message.length - 1];

    return formatted;
}

function UnFormatMessage(message) {
    let currentNum = "";
    let unformatted = [];

    for (let i = 0; i < message.length; i++) {
        let char = message[i];
        if (char == " ") continue;

        if (char == "," || char == ";") {
            let num = Number(currentNum);
            unformatted.push(num);
            currentNum = "";
            continue;
        }

        currentNum += char;
    }

    let num = Number(currentNum);
    unformatted.push(num);

    return unformatted;
}