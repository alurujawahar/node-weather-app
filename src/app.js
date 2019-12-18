const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./Utils/forecast')
const geocode = require('./Utils/Geocode')

const port = process.env.PORT ||3000
const app = express()

//Define Paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')

//set up handle bars engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialspath)

//Setup statc directory to serve
app.use(express.static(publicDirectoryPath))
app.get('', (req, res) => {
    res.render('', {
        title: 'Weather',
        name: 'Andrew Mead'
    })
})

app.get('/products', (req,res) => {
    if(!req.query.search)
    {
        return res.send({
            error: 'You must enter a search term.'
        })
    }
    console.log(req.query.earch)
    res.send({
        products:[]
    })



})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title : 'help',
        name : 'Jawahar Chowdary'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
        return res.send({
            error: 'No address found'
        })
    }
    geocode(req.query.address, (error, { longitude , latitude , Placename } ={} ) => {
        if(error)
        {
            return res.send({
                error: 'Please enter valid place name!'
            })
        }
      
      forecast(longitude, latitude, (error, forecastdata) => {
          if(error)
          {
              return res.send({
                  error
              })
          }
          res.send({
            forecast: forecastdata,
            location: Placename
        })
      
    })
    })
    
})
app.get('/help/*', (req, res) => {
    res.render('404' , {
       
        title: '404 page',
        name : 'Jawahar Chowdary',
        errorMessage: 'Help article not found'
        
    })
})
app.get('*' , (req, res) => {

    res.render('404' , {
       
        title: '404 page',
        name : 'Jawahar Chowdary',
        errorMessage: 'Page not found'
        
    })
})

app.listen(port, () => {
    console.log('Server is up on port' + port)
})