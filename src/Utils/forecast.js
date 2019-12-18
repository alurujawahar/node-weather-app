const request = require('request')

const forecast = (long,lat , callback) => {
   
    url = 'https://api.darksky.net/forecast/919ba8f0edaf6974afd5013bc9d1cc5e/' + long + ',' + lat + '?units=si'

    console.log(url)
   
    request({url, json:true }, (error, {body}) => {
      if(error){
       callback('Check your internet conection', undefined)

      }
      else if(body.error){
        callback('place not found ', undefined)

      }
      else {
       callback(undefined, 

         'It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain'
        
    )
      }

    })

}

module.exports = forecast