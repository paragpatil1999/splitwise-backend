import express from 'express';
import logger from 'morgan';
import mongoose from 'mongoose';
import config from 'config';
import { OAuth2Client } from 'google-auth-library';
import limiter from './middleware/rateLimiter.js';
import User from './models/user.js';
// const register = require('./routes/register');
// const auth = require('./routes/auth');
// const users = require('./routes/users');
// const indexRoute = require('./routes/index');
import indexRoute from './routes/index.js';



const app = express();
const port = process.env.PORT || 8080;




// if (!config.get('jwtPrivateKey')) {
//   console.error('FATAL ERROR: jwtPrivateKey is not defined.');
//   process.exit(1);
// }
if (!config.get('MongoDBUserName')) {
  console.error('FATAL ERROR: MongoDBUserName is not defined.');
  process.exit(1);
}
else if (!config.get('MongoDBPassword')) {
  console.error('FATAL ERROR: MongoDBPassword is not defined.');
  process.exit(1);
}

const dbUrl = `mongodb+srv://${config.get('MongoDBUserName')}:${config.get('MongoDBPassword')}@splitwise.eneyypj.mongodb.net/SplitWiseDev?retryWrites=true&w=majority`;

const options = {
  keepAlive: true,
  connectTimeoutMS: 30000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.set('strictQuery', true);
mongoose.connect(dbUrl, options, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to MongoDB');
  }
});



app.use(logger('dev'));
app.use(express.json());
app.use(limiter);

app.use('/', indexRoute);
// app.use('/api/register', register);
// app.use('/api/auth', auth);
// app.use('/api/users', users);

app.listen(port, (req, res) => {
  console.log(`server listening on port: ${port}`);
});