const request = require('request')

const geocode = (address, callback) => {
   
    url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWx1cnVqYXdhaGFyIiwiYSI6ImNrNDdlM3BhbDByZXEzbmtzcHB0NTl4cGoifQ.1H0s0UCZMMA4G3_6q2rs1w'
   
    request({url, json:true }, (error, {body}) => {
      if(error){
       callback('Check your internet conection', undefined)

      }
      else if(body.features.length === 0){
        callback('place not found in globe', undefined)

      }
      else {
       callback(undefined, {
        longitude : body.features[0].geometry.coordinates[1],
        latitude: body.features[0].geometry.coordinates[0],
        Placename : body.features[0].place_name
       })
      }

    })

}

module.exports = geocode

