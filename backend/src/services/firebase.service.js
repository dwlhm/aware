const firebase = require('firebase-admin')

firebase.initializeApp({ projectId: 'xcampportanidb' })

module.exports =  {
	firestore: () => firebase.firestore()
}