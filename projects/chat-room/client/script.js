import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

socket.on('connect', () => {
    console.log('connect');
});

const messageInput = document.getElementById('message');
const sendButton = document.getElementById('send');

sendButton.onclick = () => {
    let message = messageInput.value;
    messageInput.value = '';

    if (message == '') return;
}