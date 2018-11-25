var db = require("../models");

module.exports = function(app) {

    app.post('/api/burgers', function(req, res) {
        db.Burgers.create({
            burger_name: req.body.burger_name,
            devoured: false
        }).then(function(result) {
            res.json({ id: result.insertId });
        });
    });
    
    app.put("/api/burgers/:id", function(req, res) {
        // var condition = " id = " + req.params.id;
    
        db.Burgers.update({
            devoured: req.body.devoured
        }, {
            where: {
                id: req.params.id
            }
        }).then(function(result) {
            res.json(result);
        });
    });
    
    
    app.get('/api/burgers', function(req, res) {
        db.Burgers.findAll({}).then(function(result) {
            res.json(result);
        });
    });
    
};