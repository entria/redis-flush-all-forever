var redis = require("redis");

//Get server name from command args
const HOST = process.argv[2] | 'redis://localhost';
const INTERVAL = process.argv[3] | 500; //500 milliseconds

client = redis.createClient(HOST);

client.on("error", (err) => console.log("Error " + err));
client.on("connect", () => console.log("Connected") );

client.on("ready", () => { 
    console.log("ready");
    flushLoop();
});


timer = (ms) => {
    return new Promise(r=>setTimeout(r,ms));
}
       
async function flushLoop () {
    while(true){
     console.log('flushing...');
     await client.flushall();
     await timer(INTERVAL);
    }
}
   