import express from "express"

const app = express();

app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})

app.listen(8888, () => {
  console.log('Server started on port 8888')
})