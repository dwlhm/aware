const firebase = require('firebase-admin')
var serviceAccount = require("../../key/serviceAccountKey.json")

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://xcampportanidb.firestore.com"
})

module.exports =  {
	firestore: () => firebase.firestore()
}