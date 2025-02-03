const { render } = require('ejs');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose')
const Blog = require('./models/blog');
const BlogRoutes = require('./routes/blogRoutes');

//express app

const app = express();

//connect to mongodb
const dbURI = 'mongodb+srv://ninja:powpow@nodetutorial.pi758.mongodb.net/?retryWrites=true&w=majority&appName=nodeTutorial'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));
// register view engine
app.set('view engine', 'ejs');

// listen for requests


//middleware staTic files

app.use(express.static('public'));

app.use(morgan('dev'));

app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
  });
  
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog',
        snppet: 'about my new blog',
        body: 'more about my blog'
    });

    blog.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        });
});
  
app.get('/all-blogs' , (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err)
        });
})

// app.set('views','myviews');

app.get('/', (req, res) => {
    const blogs = [
      {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
      {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
      {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    ];
    res.render('index', { title: 'Home', blogs });
  });
  
  app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
  });
  
  app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
  });
  
  // 404 page
  app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
  });