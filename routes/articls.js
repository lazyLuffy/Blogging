const express = require('express');
const article = require('./../models/article');
const router = express.Router();
const Article = require('./../models/article')
console.log("Route")

router.get('/new',(req,res)=>{
    res.render('articles/new',{article: new Article()});
})
router.get('/:slug',async (req,res)=>{
    const article = await Article.findOne({slug : req.params.slug});
    // console.log(article)
    if(article == null) res.redirect('/');
    res.render('articles/show',{article:article})
})
router.delete('/:id',async (req,res)=>{
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})
router.get('/edit/:id',async (req,res)=>{
    const article = await Article.findById(req.params.id)
    console.log(article)
    res.render('articles/edit',{article:article})
})

router.put('/:id',async (req,res)=>{

    const updated = await Article.findByIdAndUpdate(req.params.id,{
        title:req.body.title,
        description:req.body.description,
        markdown:req.body.markdown
    })
    console.log(updated)
    res.redirect('/')
})

router.post('/create', async (req,res)=>{
    // console.log('route2create');
    try{
    let article = new Article({
        title:req.body.title,
        description:req.body.description,
        markdown:req.body.markdown
    })
    article = await article.save();
    // console.log(article)
    res.redirect(`/articles/${article._id}`)
    }
    catch(err){
        console.log("something wrong:",err.message);
        // res.render('articles/new',{article:article})
    }

})

module.exports = router;
