// let fs = require("fs");

// let b = fs.readFileSync('./movies_fun.json', 'utf-8');

// let rawdata = fs.readFileSync('movies_fun.json');

// let std = JSON.parse(rawdata); 
const fs = require("fs");
const express = require("express");
const app = express();

var uuid = require('uuid');
app.use(express.json());

app.get('/api/v1/movies', (req, res) => {
    const movies = JSON.parse(fs.readFileSync(`${__dirname}/movies_fun.json`));
    res.status(200).json({
        status : 'success',
        results: movies.length,
       movies 
    });
});


// app.post('/api/v1/movies', (req, res) => {
//     //console.log(req.body);
 
//    const newmovies = Object.assign( req.body);
   
//    movies.push(newmovies);

//    fs.writeFile(`${__dirname}/movies_fun.json`,JSON.stringify(movies),
//     err => {
//    res.status(201).json({
//     status: 'suceess',
//     movies: newmovies
//    });
//    });

// });
app.post('/api/v1/movies', (req, res) => {
    const movies = JSON.parse(fs.readFileSync(`${__dirname}/movies_fun.json`));
    const movie = req.body;
    movies.push ({ ...movie, id : uuid.v4()});

    res.send(`User with the name ${movie.Title}  added!!`);
    fs.writeFile ("movies_fun.json", JSON.stringify( movies, null, 5), function(err) {
  
        if (err) throw err;
        console.log('complete');
        }
    );
});

// app.patch('/api/v1/movies/:id', (req, res) => {
//     if(!movies){
//         return res.status(404).json({
//             status:'fail',
//             message: 'Invalid ID'
//         });
//     }
//     res.status(200).json({
//         status: 'success',
//         movies: '<Updated tour here.....>'
//     })
// })

app.patch('/api/v1/movies/:id', (req, res) => {
    const movies = JSON.parse(fs.readFileSync(`${__dirname}/movies_fun.json`));
    const {id} = req.params;
    const{ Title, Genre, ReleaseDate, IMBDrating, IMDBvotes} = req.body;
    const movie = movies.find((movie) => movie.Id == id);

    if (Title) movie.Title = Title ;
    if (Genre) movie.Genre = Genre ; 
    if (Genre) movie.ReleaseDate = ReleaseDate ; 
    if (Genre) movie.IMBDrating = IMBDrating ; 
    if (Genre) movie.IMDBvotes = IMDBvotes ; 
    
    res.send('User with thw id ${id} has been updated');
    fs.writeFile ("movies_fun.json", JSON.stringify( movies, null, 5), function(err) {
  
        if (err) throw err;
        console.log('complete');
        }
    );
    
})

// app.delete('/api/v2/movies/:id', (req, res) => {
// const { id } = req.params;
//     if(!movies){
//         return res.status(404).json({
//             status:'fail',
//             message: 'Invalid ID'
//         });
//     }
//     res.status(204).json({
//         status: 'success',
//         movies: null
//     })
// })
app.delete('/api/v2/movies/:id', (req, res) => {
    const movies = JSON.parse(fs.readFileSync(`${__dirname}/movies_fun.json`));
    const {id} = req.params;
    
    // for(let i=0; i< movies.length ; i++){
    //       if (movies[i][Id] == id ){
    //         movies[i].remove();
    //       } };
    
   const foundmovies = movies.filter((movies) => movies.Id != id );
   
    res.send(`user with id    ${id}     deletet from the databaze`);
    
    res.send(foundmovies);
    console.log(foundmovies);

    fs.writeFile ("movies_fun.json", JSON.stringify( movies, null, 5), function(err) {
  
        if (err) throw err;
        console.log('complete');
        }
    );
});

// app.get('movies/:Genre', function (req, res) {
//     // First read existing users.
//     fs.readFile( `${__dirname}/movies_fun.json`, 'utf8', function (err, data) {
//        var movies = JSON.parse( data );
//        var movie = movies["movie" + req.params.Genre] 
//        console.log( movie );
//        res.end( JSON.stringify(movie));
//     });
//  });
 
//  var server = app.listen(8080, function () {
//     var host = server.address().address
//     var port = server.address().port
//     console.log("Example app listening at http://%s:%s", host, port)
//  })

// router.param('Genre' , (req, res, next, val) => {
// console.log(`Tour id is: ${val}`);
// next();
// });

app.get('/api/v2/movies/:genre', ( req, res) => {
    
    const movies = JSON.parse(fs.readFileSync(`${__dirname}/movies_fun.json`));

const {genre}  = req.params;


const foundValue = movies.filter(movies=>movies.Title === genre || movies.Genre === genre );

// const foundValue1 = movies.filter(obj=>obj.Genre === genre);
// const foundmovies = movies.find((foundmovies) => movies.Genre == genre );
// res.send(foundmovies);
res.send(foundValue);
});

// app.get('/:Title', ( req, res) => {
//     const {Title}  = req.params;
//     const foundmovies = movies.find((Title) => movies.Title == Title );
//     res.send(foundmovies);
//     });
    



const port = 7000;
app.listen(port, () => {
    console.log(`app running on port ${port}`);
});


