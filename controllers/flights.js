let Flight = require('../models/flight');
let Ticket = require('../models/ticket')

module.exports = {
    new: newFlight,
    create,
    index,
    show
}

function create(req,res) {
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key]
    }
    let flight = new Flight(req.body);
    flight.save(function(err) {
        if (err) return res.render('flights/new');
        console.log(flight);
        res.redirect('/flights/')
    });
}

function newFlight(req,res) {
    res.render('flights/new')
}

function index(req,res) {
    Flight.find({}, function(err,flights) {
        res.render('flights/index', {flights});
    }).sort({departs:1});
}

function show(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        Ticket.find(
            {flight: flight._id}, 
            function(err, tickets) {
                res.render('flights/show', { 
                    title: 'Flight Detail', flight, tickets 
                });
            });
  });
};