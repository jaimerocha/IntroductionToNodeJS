const csv=require('csvtojson');
const fs = require('fs');
const path = require('path');

const csvFilePath='./customer-data.xls';

function processings(JSONdata) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            fs.writeFile(path.join(__dirname, 'customer-data.json'), JSONdata, function (error) {
                if (error) 
                    reject(error);
                else
                    resolve('The json file has been created successfully!');
            });
        }, 0);

    });
}

async function asyncCall() {
    const jsonArray = await csv().fromFile(csvFilePath);
    const jsonText = JSON.stringify(jsonArray, null, 2);
    const message = await processings(jsonText);
    console.log(message);
}

asyncCall();