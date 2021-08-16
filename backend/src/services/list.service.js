const { firestore } = require('./firebase.service')

module.exports = {
	read: async () => {

		try {

			let data = await firestore().collection('history').get().then(result => {

				let data = []

				result.forEach(async doc => {
					await firestore().collection('history').doc(doc.id).get().then(it => {
						data.push(it.data())
					})
					console.log(data) 
					
				})

				console.log(data)

				return data
			}).catch(error => {
				console.log(error)
				return undefined
			})

			return data

		} catch(error) {
			console.log(error)
			return undefined
		}
	}
}