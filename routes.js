module.exports = router => {
    require('./routes/books')(router);
    require('./routes/authors')(router);
    
    return router;
}