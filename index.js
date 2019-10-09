const ig = require ('./instagram.js');

async function bot() {
   await ig.initialize();
   await ig.login();
   await ig.like();
}

bot();