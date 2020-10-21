const request = require ('postman-request');

const forecast = (latitude, longitude , callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=fd343ce3a310687cb6722f09c7755405&query='+latitude+','+longitude+'&units=f'
    request({url ,json : true},(error,{body}) => {
        if(error){
          callback(error + ' Unable to connect to weather service!',undefined)
        }
        else if (body.error) {
          callback(body.error.info + ' Unable to find location',undefined)
        }
        else{
        const data = body.current
        callback(undefined,`${data.weather_descriptions[0]}. It is currently ${data.temperature} degrees out. It feels like ${data.feelslike} degrees out.`)
      }});
}

module.exports = forecast

