// this file was intended to handle GUI and stuff, but I havent started with making that yet

let verycoolepickey = [
    [4, 9],
    [3, 7]
]

let veryepiccoolmessage = "Hello, this message includes punctuation! Question mark? Numbers: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10. Some smybols: !@#$%^&*()-=_+[]{}</>.\\\"';~`|";

let veryepiccoolencodedmessage = EncodeMessage2(veryepiccoolmessage, verycoolepickey);
let veryepiccooldecodedmessage = DecodeMessage2(veryepiccoolencodedmessage, verycoolepickey);

console.log(FormatMessage(veryepiccoolencodedmessage));

console.log(veryepiccoolencodedmessage, veryepiccooldecodedmessage);