const { articles } = require('../libs/db');
const Article = require('../entities/article');

exports.getAllArticles = (req, res) => res.json(articles);

exports.getArticleById = (req, res) => {
    const article = articles.find(a => a.id === parseInt(req.params.id));
    article ? res.json(article) : res.status(404).send('Not found');
};

exports.addArticle = (req, res) => {
    const { title, content, date } = req.body;
    const newArticle = new Article(articles.length + 1, title, content, date);
    articles.push(newArticle);
    res.status(201).json(newArticle);
};

exports.updateArticle = (req, res) => {
    const article = articles.find(a => a.id === parseInt(req.params.id));
    if (article) {
        Object.assign(article, req.body);
        res.json(article);
    } else {
        res.status(404).send('Not found');
    }
};

exports.deleteArticle = (req, res) => {
    const index = articles.findIndex(a => a.id === parseInt(req.params.id));
    if (index !== -1) {
        articles.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Not found');
    }
};