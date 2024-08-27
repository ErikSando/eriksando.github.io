// this file was intended to handle GUI and stuff, but I havent started with making that yet

let key = [
    [4, 9],
    [3, 7]
]

let message = "THISISAVERYCOOLMESSAGETHATWILLNEVEREVERBEDECODED";

console.log(message.length);

let encoded = EncodeMessage(message, key);
let decoded = DecodeMessage(encoded, key);

console.log(FormatMessage(encoded));

console.log(encoded, decoded);