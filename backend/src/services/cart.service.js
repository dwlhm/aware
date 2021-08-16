const { firestore } = require('../services/firebase.service')

module.exports = {
	read: async (docs) => {

		const listData = []

		const data = await firestore().collection('cart').doc(docs).collection('barang').where('rak', '!=', null).get().then(result => {
			
			let data = []

			if (result.empty) {
				return undefined
			}

			result.forEach(doc => {
				data.push(doc.id)
			})

			return data

		}).catch(err => {
			console.log(err)
			return undefined
		})

		for (let index = 0; index < data.length; index++) {
			let last = await firestore().collection('cart').doc(docs).collection('barang')
							.doc(data[index]).get()

			listData.push(last.data())
			
		}

		console.log(listData)

		return listData
	}
}