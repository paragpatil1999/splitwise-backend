import express from 'express';
import logger from 'morgan';
import mongoose from 'mongoose';
import config from 'config';
import { OAuth2Client } from 'google-auth-library';
import limiter from './middleware/rateLimiter.js';
import session from 'express-session';
const store = new session.MemoryStore();
// const register = require('./routes/register');
// const auth = require('./routes/auth');
// const users = require('./routes/users');
// const indexRoute = require('./routes/index');
import indexRoute from './routes/index.js';
import register from './routes/register.js';
import login from './routes/login.js';
import groups from './routes/groups.js';

const app = express();
const port = process.env.PORT || 8000;

if (!config.get('MongoDBUserName')) {
  console.error('FATAL ERROR: MongoDBUserName is not defined.');
  process.exit(1);
}
if (!config.get('MongoDBUserName')) {
  console.error('FATAL ERROR: MongoDBUserName is not defined.');
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


app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 3000 },
  cookie: { secure: false },
  store: store
}))
app.use(logger('dev'));
app.use(express.json());
app.use(limiter);

app.use('/', indexRoute);
app.use('/api/register', register);
app.use('/api/login', login);
app.use('/api/groups', groups);
// app.use('/api/users', users);

app.listen(port, (req, res) => {
  console.log(`server listening on port: ${port}`);
});
