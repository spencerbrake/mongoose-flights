let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let destinationSchema = new Schema({
    airport: {
        type: String,
        enum: ['AUS','DAL','LAX','SAN', 'SEA']
    },
    arrival: {
        type: Date
    } 
})

let flightSchema = new Schema({
    airline: {
        type: String,
        enum: ['Southwest', 'United', 'American']
    },
    flightNo: {
        type: Number,
        required: true,
        min: 10,
        max: 9999
    },
    departs: { 
        type: Date,
        default: function() {
            let today = new Date();
            return new Date(today.setFullYear(today.getFullYear()+1));
        },
    },
    destinations: [destinationSchema],
    airport: {
        type: String,
        enum: ['AUS','DAL','LAX','SAN', 'SEA'],
        default: 'SAN'
    }
});

module.exports = mongoose.model('Flight', flightSchema)