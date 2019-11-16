const express = require('express');
const morgan = require('morgan');

const PORT = 1234;

const app = express();

app.use(morgan('dev'));
app.use(express.static('./dist'));

// app.get('/', (req, res) => {
//   res.send('Server up');
// })

app.listen(PORT, () => {
  console.log('listening at port ' + PORT);
});