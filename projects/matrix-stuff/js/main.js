// this file was intended to handle GUI and stuff, but I havent started with making that yet

let key = [
    [4, 9],
    [3, 7]
]

let veryepiccoolmessage = "Hello, this message includes punctuation! Question mark? Numbers: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10. Some smybols: !@#$%^&*()-=_+[]{}</>.\\\"';~`|";

let veryepiccoolencodedmessage = EncodeMessage2(veryepiccoolmessage, key);
let veryepiccooldecodedmessage = DecodeMessage2(veryepiccoolencodedmessage, key);

console.log(FormatMessage(veryepiccoolencodedmessage));

console.log(veryepiccoolencodedmessage, veryepiccooldecodedmessage);