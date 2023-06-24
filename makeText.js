/** Command-line tool to generate Markov text. */

const fs = require('fs');
const axios = require('axios');
const MarkovMachine = require('./markov');


async function cat(path, checkWrite){

  fs.readFile(path, 'utf8', function(err, data) {
    if (err) {
        // handle possible error
        console.error(err);
        // kill the process and tell the shell it errored
        process.exit(1);
    }

    let genText = new MarkovMachine(data);
    console.log(genText.makeText());

  });

}

async function webCat(url){

  axios.get(url).then(function(resp) {
    let genText = new MarkovMachine(resp.data);
    console.log(genText.makeText());
  }).catch((e) =>{
    console.error(e);
    process.exit(1);
  });

}


let dataType = process.argv[2];

if(dataType.toLowerCase() == "url"){
    webCat(process.argv[3]);
}
else{
    cat(process.argv[3]);
}



