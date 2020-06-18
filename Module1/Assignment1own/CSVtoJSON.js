const fs = require('fs');
const path = require('path');


const CSVtoJSON = (fileCSV = 'customer-data.xls') => {

    function processing(data){
        //console.log(data.toString());
        //console.log(data);
        //arraySub arreglo de strings
        var arraySub = data.split(/\r\n?|\n/);
        arraySub[arraySub.length - 1] ? void(0) : arraySub.pop();
        //console.log(arraySub);
        //Remove the first item of an array. The return value of the shift method is the removed item.
        var firstLine = arraySub.shift();
        //console.log(firstLine);
        //fieldsArray es el arreglo con los campos o llaves.
        var fieldsArray = firstLine.split(",");
        //console.log(fieldsArray);
        let arrayObjects = [];    
        
        for (var col of arraySub) {
            //arrayElem es el arreglo con los valores de una fila
            var arrayElem = col.split(",");
            var obj = {};
            for(let i=0; i < fieldsArray.length; i++){
                obj[fieldsArray[i]] = arrayElem[i];
            }
            arrayObjects.push(obj);
        }
        //Identacion de 2 espacios
        return JSON.stringify(arrayObjects, null, 2);
        
    }

    
    const transform = (fileCSVF, callback) => {
        fs.readFile(path.join(__dirname, fileCSV), {encoding: 'utf-8'}, function (error, data) {
            if (error) 
                return console.error(error);
            var JSONdata = processing(data);
            callback(JSONdata);  
        });
    }


    transform(fileCSV, (data) => {
        fs.writeFile(path.join(__dirname, 'customer-data.json'), data, function (error) {
            if (error) 
                return console.error(error);
            console.log('Downloading is done!');
        });
    });

}

CSVtoJSON(process.argv[2]);