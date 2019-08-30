const express = require('express')

const app = express();

/*app.listen(5100, function(){
    console.log("Server has started on 5100 port")
})*/

/*app.get('/', (req,res) => {
	res.status(200).json({
		message: 'Working'
	})
})*/


app.get('/', (req,res) => {
	res.status(200).json({
		message: 'Working'
	})
})

app.listen(5100, () => {console.log("Server has started on 5100 port")})