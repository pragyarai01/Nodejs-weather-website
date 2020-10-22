const path = require('path');
const express = require('express');
const hbs = require('hbs')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


// console.log(__dirname);
// console.log(path.join(__dirname,'../public'))
// console.log(__filename);

const app = express();
const port = process.env.PORT || 3000

//Define paths for Express Config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and view location
app.set('view engine' , 'hbs')
app.set('views' , viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res) => {
    res.render('index',{
        title : 'Weather',
        name : 'Pragya Rai'
    });
})

app.get('/about',(req, res) => {
    res.render('about',{
        title : 'About Me',
        name : 'Pragya Rai'
    });
})
app.get('/help',(req, res) => {
    res.render('help',{
        helpText : 'Please help me :)\'',
        title : 'Help Me',
        name : 'Pragya Rai'
    });
})
app.get('',(req, res) => {
    res.send('<h1>Weather</h1>');
})
//app.com
//app.com/help 
//app.com/about

app.get('/help',(req, res) => {
    res.send({
        name : 'Pragya',
        age : 22
    });
})

app.get('/about',(req, res) => {
    res.send('<h1>Title</h1>');
})

app.get('/weather',(req, res) => {
    if(!req.query.address){
        return res.send({
            error : 'Please provide an address'
        })
    }

    geocode(req.query.address, (error,{latitude,longitude,location} = {})=>{
        if(error){
          return res.send({error});
        }
        //console.log('Data',data)
        forecast(latitude,longitude,(error,forecastData)=>{
          if(error){
            return res.send({error});
          }
          res.send({
          forecast : forecastData,
          location,
          address : req.query.address
          });
        })
   })
})

app.get('/products',(req, res) => {
    if(!req.query.search){
        return res.send({
            error : 'Please provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products : []
    })
})



app.get('/help/*',(req, res) => {
    res.render('404',{
        title : '404',
        name : 'Pragya Rai',
        errorMsg : 'Help Article Not Found'
    });
})
app.get('*',(req, res) => {
    res.render('404',{
        title : '404',
        name : 'Pragya Rai',
        errorMsg : 'Page Not Found'
    });
})

app.listen(port,() => {
    console.log('Server is up on port '+port);
})