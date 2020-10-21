const request = require('postman-request');

const geocode = (address , callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiMTA2NzEzNDMiLCJhIjoiY2tnYWcwYWk2MDZxdjJ6cXU4bXl2dDQxcyJ9.9rvrNSwAwfBPaGlUYlto8Q&limit=1'
    
    request({url,json : true},(error,{body}) => {
    if(error){
      callback(error + ' Unable to connect',undefined)
    }
    else if (body.features.length === 0) {
      callback(' Unable to find location',undefined)
    }
    else{
      callback(undefined,{
        latitude : body.features[0].center[1],
        longitude : body.features[0].center[0],
        location : body.features[0].place_name
      })
    }
  })
  }

module.exports = geocode;