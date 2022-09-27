let fs = require("fs");

let a = fs.readFileSync('./movies.json', 'utf-8');

let rawdata = fs.readFileSync('movies.json');
let std = JSON.parse(rawdata); 
//console.log(std);

var uuid = require('uuid');
let data = [];
for (i=0 ; i < std.length; i++){
    let id = uuid.v4(); 
   let obj = {
       Id: id,
       Title: std[i]["Title12"],
       Genre: std[i]["Major Genre"],
       ReleaseDate: std[i]["Release Date"],
       IMBDrating: std[i]["IMDB Rating"],
       IMDBvotes:  std[i]["IMDB Votes"]
   }
   data.push(obj);
   //console.log(a[i]["Title"])
   
}
//console.log(data)


fs.writeFile ("movies_fun.json", JSON.stringify( data, null, 5), function(err) {
  
    if (err) throw err;
    console.log('complete');
    }
);
//JSON.stringify(data, null, "\t");
// let b = fs.readFileSync('./movies_fun.json', 'utf-8');

// //const express = require('express');
// const app = fs();
// const port = 3000 ;
// app.listen(port, () => {
//     console.log(`app runnin on port ${port}`);
// });

// indexedDB.get('movies\v1', (req,res) => {
//     res.status(200).json({
//         status : 'success',
//         results: b.length,
//         data : { b } 
//     });
// });