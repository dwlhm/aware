const { firestore } = require('./firebase.service')

module.exports = {
	write: async (docs) => {

		try {

			let rak = null

			await firestore().collection('rak').where('cond', '==', 'empty').limit(1).get().then(res => {
				res.forEach(result => {
					rak = result.id
				})
			})

			await firestore().collection('cart').doc(docs.cart)
						.collection('barang').doc(docs.code)
						.create({
							...docs,
							rak: rak
						})

			await firestore().collection('history').doc(docs.code)
						.create({
							...docs,
							disimpanOleh: docs.cart
						})

			await firestore().collection('rak').doc(rak).update({ cond: 'full' })

			return true	
		} catch (error) {
			console.log(error)
			return undefined
		}
		
	},
	read: async (docs) => {

		try {

			let data = await firestore().collection('history').doc(docs).get().then(result => {

				let data

				if (result.empty) {
					console.log('empty')
					data = undefined
				}

				data = result.data()

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
	},
	deletes: async (docs) => {

		try {

			let rak = null

			await firestore().collection('rak').doc(docs.cart).collection('barang').doc(docs.qr).get().then(async it => {
			
				
				rak = it.data().rak
				await firestore().collection('rak').doc(rak).update({ cond: 'empty' }).then(it => {
					console.log(it.writeTime)
				}).catch(err => {
					console.log(err)
				})
			})

			await firestore().collection('rak').doc(docs.cart).collection('barang').doc(docs.qr).update({ rak: null, diambil: true }).then(it => {
				console.log(it.writeTime)
			}).catch(err => {
				console.log(err)
			})

			

			return true	
		} catch (error) {
			console.log(error)
			return undefined
		}
		
	},
}