const express = require('express');
const app = express();
const mongoose=require('mongoose');
const ejs = require('ejs');
const articleRouter = require('./routes/articls');
const bodyParser = require('body-parser');
const Article = require('./models/article');
const methodoverride = require('method-override')
mongoose.connect('mongodb+srv://jatin121:jatin121@cluster0.9khi2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true,
    useFindAndModify:true

}).then(console.log('connection establish...')).catch(err=>console.log(err));
const port = process.env.PORT || 8080

app.set('view engine', 'ejs' );
app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodoverride('_method'));
app.use('/articles',articleRouter);

app.get('/',async (req,res)=>{
    const articles = await Article.find().sort({
        createdAt:'desc'
    })
    console.log(articles)
    res.render('articles/index',{articles:articles});
})
app.listen(port,console.log(`Listening at: http://localhost:${port}`));