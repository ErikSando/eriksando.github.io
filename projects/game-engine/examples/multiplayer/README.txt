This project requires Node JS and port forwarding to work

Download here: https://nodejs.org/en/download

To enable port forwarding, type ipconfig in command prompt and copy the default gateway into your browser.
You should see a site where you can play with your routers settings.
Find the port forwarding section (you may need to search how to do it for your specific router) and create a server.
The IP of your server should be your public IP by default.
Your public IP can be found by typing "whats my ip" in a web browser.

In "client/JS/Main.js", edit the value of ServerIP (found at line 1) to the ip address of your server.