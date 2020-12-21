const express = require('express');
const morgan = require('morgan');
const mongoos = require('mongoose');

const blogRoutes = require('./routes/blogRoutes')

const app = express();


const dbURI = 'mongodb+srv://netninja:test1234@nodetuts.7pkwk.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoos.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => app.listen(3000))
.catch((err) => console.log(err));


app.set('view engine','ejs');
app.set('views','myviewes');

//app.listen(3000);

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

app.use((req,res,next) => {
    console.log('* new request made:');
    console.log('host: ' + req.hostname);
    console.log('path: ' + req.path);
    console.log('method: ' + req.method);
    next();
});


app.get('/',(req,res)=>{
  res.redirect('/blogs');
});

app.get('/about',(req,res)=>{
    res.render('about',{title : 'About'});
});

app.get('/about-us',(req,res)=>{
    res.redirect('/about');
});

app.use('/blogs',blogRoutes);

app.use((req,res)=>{
    res.status(404).render('404',{title : '404 Error'});
});

/*

//retourner une collection d'objets json
app.get('/all-blogs',(req,res) => {
    Blog.find()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});
//add a blog statically
app.get('/add-blog', (req,res) => {
    const blog = new Blog({
        title : 'new blog 2',
        snippet : 'about my blog',
        body:'more about my blog'
    });
    
    blog.save()
    .then((result) =>{
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
    });

//get blog statically
app.get('/single-blog',(re,res) => {
    Blog.findById('5f4b616886b31c08acb2f6b0')
         .then((results) => {
        res.send(results)
    })
        .catch((err) => {
            console.log(err);
         });
    });
*/