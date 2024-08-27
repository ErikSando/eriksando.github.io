// this file was intended to handle GUI and stuff, but I havent started with making that yet

let verycoolepickey = [
    [4, 9],
    [3, 7]
]

let verycoolepicmessage = "Hello, this message includes punctuation! Question mark? Numbers: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10. Some smybols: !@#$%^&*()-=_+[]{}</>.\\\"';~`|";

let verycoolepicencodedmessage = EncodeMessage2(verycoolepicmessage, verycoolepickey);
let verycoolepicdecodedmessage = DecodeMessage2(verycoolepicencodedmessage, verycoolepickey);

console.log(FormatMessage(verycoolepicencodedmessage));

console.log(verycoolepicencodedmessage, verycoolepicdecodedmessage);