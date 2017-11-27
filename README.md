## Welcome to the WHatsApp AuTomator!
The WHatsApp AuTomator, or whaat for short, was created in order to assure you would never lose touch with you precious friends.
Ever forgot to message a friend for a week or two?
- Of-course! we all do..
But why should we remember whe can let a bot send the 'Hello' messages for us?

WHAAT is a chrome extension, built using react+redux
It allows you to maintain a list of contacts that will automaticly be pinged if last conversation exceeded pre-configured time.
WHAAT relay on [Web.Whatsapp](https://web.whatsapp.com/), and will work as long as a tab with web.whatsapp is open.

I am NOT affiliated with WhatsApp nor Facebook
I am not to be blamed if anything bad happens to your WhatsApp conversations.
Use this extension at your own risk, and enjoy :)

### USAGE:
0. Clone or download repo
1. Installation -
```sh
npm install
```
2. Build -
```sh
npm start build
```
3. Add to chrome
    a. Open [Chrome Extensions page](chrome://extensions/)
    b. check 'developer mode' checkbox
    c. click 'Load unpacked extension' and chose the build folder inside your local repo
    d. restart web.whatsapp (if it was previously opened)

4. to develop use:
```sh
npm start
```

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).