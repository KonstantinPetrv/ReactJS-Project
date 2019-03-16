const mongoose = require('mongoose')

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let reviewSchema = mongoose.Schema({
    creator: { type: mongoose.Schema.Types.ObjectId, required: true, REQUIRED_VALIDATION_MESSAGE, ref: 'User' },
    product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
    content: { type: mongoose.Schema.Types.String, required: true },
    opinion: {
        type: mongoose.Schema.Types.String,
        enum: {
            values: ['Positive', 'Negative'],
            message: 'Opinion is invalid, valid values include [Positive, Negative].'
        },
        default: 'Positive',
        required: REQUIRED_VALIDATION_MESSAGE
    }
})

let Review = mongoose.model('Review', reviewSchema)

module.exports = Review
