const express = require('express')
const app = express()
const port = 3000
const path = require('path');

app.use(express.static('assets'))
app.use("/assets", express.static(__dirname + '/assets'));

// app.get('/', (req, res) => res.send('Hello World!'))


app.get('/',function(req,res) {
	res.sendFile('index.html', {
        root: path.join(__dirname, './')
    })
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))