const axios = require('axios')

module.exports = {
	read: async (req, res, next) => {

		res.body = {
			status: undefined,
			data: undefined
		}
		
		let config = {
              method: "get",
              url:
                "https://platform.antares.id:8443/~/antares-cse/antares-id/AutomaticWarehouse/A-Ware/la",
              headers: {
                "X-M2M-Origin": "86de344c2859f09e:4fbf992fe0ca59d3",
                "Content-Type": "application/json"
              }
            };

        await axios(config).then(function (response) {
        	console.log(JSON.parse(response.data["m2m:cin"].con))
        	res.body.status = 200
        	res.body.data = JSON.parse(response.data["m2m:cin"].con)
        	next()
        })
        .catch(function (error) {
        	console.log(error)
        	res.body.status = 500
        	next()
        })

	}
}