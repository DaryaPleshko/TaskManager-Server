require('dotenv').config();
const app = require('./src/app');

const port = process.env.PORT;

app.listen(port, () => `Server is running on ${port} port`);
