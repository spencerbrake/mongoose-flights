let Ticket = require('../models/ticket')

module.exports = {
    new: newTicket,
    create,
    delete: deleteTicket
}

function newTicket(req,res) {
    res.render('tickets/new', {title: 'Add Ticket', flightId: req.params.id});
}

function create(req,res) {
    req.body.flight = req.params.id;  //flight property on the ticket
    Ticket.create(req.body, function(err,ticket){
        res.redirect(`/flights/${req.body.flight}`)
    })
}

function deleteTicket(req,res) {
    Ticket.findById(req.params.id).populate('Flight').exec(function(err,ticket){
        let flightId = ticket.flight
        Ticket.findByIdAndDelete(req.params.id, function(err, flight){
            res.redirect(`/flights/${flightId}`)
        });
    });
}