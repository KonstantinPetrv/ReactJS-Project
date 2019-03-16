const express = require('express');
const authCheck = require('../config/auth-check');
const Review = require('../models/Review');
const Product = require('../models/Product')

const router = new express.Router()

router.post('/submit', authCheck, (req, res) => {
    const { productId, content, opinion } = req.body

    let reviewObj = {
        creator: req.user._id,
        product: productId,
        content: content,
        opinion: opinion
    }

    Review
        .create(reviewObj)
        .then((createdReview) => {
            Product.findById(productId)
                .then((product) => {
                    product.reviews = [...product.reviews, createdReview._id];
                    product.save();
                })
            Review.findById(createdReview._id)
                .populate('creator')
                .then(review => {
                    res.status(200).json({
                        success: true,
                        message: 'Review created successfully.',
                        data: review
                    })
                })
        })
        .catch((err) => {
            console.log(err)
            const message = 'Something went wrong :('
            return res.status(200).json({
                success: false,
                message: message
            })
        })
})

router.get('/details/:id', authCheck, (req, res) => {
    const id = req.params.id

    Review
        .findById(id)
        .populate('creator')
        .then((review) => {
            res.status(200).json({
                success: true,
                message: 'Review found',
                data: review
            }).catch((err) => {
                console.log(err)
                const message = 'Something went wrong :('
                return res.status(200).json({
                    success: false,
                    message: message
                })
            })
        })
})

router.get('/user', authCheck, (req, res) => {
    Review
        .find({ creator: req.user._id })
        .populate('product')
        .then(reviews => {
            res.status(200).json(reviews)
        })
})
router.delete('/delete/:id', authCheck, (req, res) => {
    const id = req.params.id
    Review
        .findById(id)
        .then((review) => {
            Product.findById(review.product)
                .then(product => {
                    product.reviews.splice(product.reviews.indexOf(id), 1);
                    return product.save()
                }).then(() => {
                    review
                        .remove()
                        .then(() => {
                            return res.status(200).json({
                                success: true,
                                message: 'Review Deleted'
                            })
                        })
                })
        })
        .catch(() => {
            return res.status(200).json({
                success: false,
                message: 'Entry does not exist!'
            })
        })

})

module.exports = router
