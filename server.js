const express =  require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const exphdbs = require('express-handlebars');
const session = require('express-session');
const bcrybt = require('bcryptjs');
//const userRouter = require('./routes/userRoutes');
const userController = require('./controllers/userController');
const movieController = require('./controllers/movieController');
const MongoDBSession =  require('connect-mongodb-session')(session);
const home = require('./controllers/Home.js');
const url = "mongodb+srv://card:card1234@cluster0.ygz9k.mongodb.net/webMovies?retryWrites=true&w=majority";
const app = express();
const store = new MongoDBSession({
  uri: url,
  collection:"mySessions",
});
app.use(
  session({
    secret:"key that will sign cookie",
     cookie: {
    maxAge: 1000 * 60 * 12 // 1 week
     },
    resave:true,
    saveUninitialized:true,
    store: store,
  })
)

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.engine('.hbs', exphdbs.engine({ extname: '.hbs', defaultLayout: "main"}));
app.set('view engine','.hbs');
app.use(express.json());
mongoose.connect(url,{useUnifiedTopology:true,useNewUrlParser:true});
app.use(express.static('views'));
//app.use(userRouter);
var hbs = exphdbs.create({});
hbs.handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});
app.use('/',home);
app.use('/Users',userController);
app.use('/Movies',movieController);
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{console.log('server is running');})