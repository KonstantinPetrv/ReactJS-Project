const express = require('express')
const authCheck = require('../config/auth-check')
const Product = require('../models/Product')
const Review = require('../models/Review')
const User = require('../models/User')
const mongoose = require('mongoose')


const router = new express.Router()

function validateProductForm(payload) {
    const errors = []
    let isFormValid = true
    let message = ''

    payload.price = parseFloat(payload.price)

    if (!payload || typeof payload.title !== 'string') {
        isFormValid = false
        errors.name = 'Title required.'
    }

    if (!payload || typeof payload.description !== 'string' || payload.description.length < 10 || payload.description.length > 400) {
        isFormValid = false
        errors.push('Description must be at least 10 symbols and less than 400 symbols.')
    }

    if (!payload || !payload.price || payload.price < 0) {
        isFormValid = false
        errors.push('Price must be a positive number.')
    }

    if (!payload || typeof payload.image !== 'string' || !(payload.image.startsWith('https://') || payload.image.startsWith('http://')) || payload.image.length < 14) {
        isFormValid = false
        errors.push('Please enter valid Image URL. Image URL must be at least 14 symbols.')
    }

    if (!isFormValid) {
        message = 'Check the form for errors.'
    }

    return {
        success: isFormValid,
        message,
        errors
    }
}

router.post('/create', (req, res) => {
    const productObj = req.body;
    if (productObj.roles.indexOf('Admin') > -1) {
        const validationResult = validateProductForm(productObj)
        if (!validationResult.success) {
            return res.status(200).json({
                success: false,
                message: validationResult.message,
                errors: validationResult.errors
            })
        }

        delete productObj.roles;

        Product
            .create(productObj)
            .then((createProduct) => {
                res.status(200).json({
                    success: true,
                    message: 'Product added successfully.',
                    data: createProduct
                })
            })
            .catch((err) => {
                console.log(err)
                let message = 'Something went wrong :( Check the form for errors.'
                if (err.code === 11000) {
                    message = 'Product with the given name already exists.'
                }
                return res.status(200).json({
                    success: false,
                    message: message
                })
            })
    } else {
        return res.status(200).json({
            success: false,
            message: 'Invalid credentials!'
        })
    }
})

router.post('/edit/:id', authCheck, (req, res) => {
    const productObj = req.body
    if (productObj.roles.indexOf('Admin') > -1) {
        delete productObj.roles;
        const productId = req.params.id
        const validationResult = validateProductForm(productObj)
        if (!validationResult.success) {
            return res.status(200).json({
                success: false,
                message: validationResult.message,
                errors: validationResult.errors
            })
        }

        Product
            .findById(productId)
            .then(existingProduct => {
                existingProduct.title = productObj.title
                existingProduct.author = productObj.author
                existingProduct.genres = productObj.genres
                existingProduct.description = productObj.description
                existingProduct.price = productObj.price
                existingProduct.image = productObj.image

                existingProduct
                    .save()
                    .then(editedProduct => {
                        res.status(200).json({
                            success: true,
                            message: 'Product edited successfully.',
                            data: editedProduct
                        })
                    })
                    .catch((err) => {
                        console.log(err)
                        let message = 'Something went wrong :( Check the form for errors.'
                        if (err.code === 11000) {
                            message = 'Product with the given name already exists.'
                        }
                        return res.status(200).json({
                            success: false,
                            message: message
                        })
                    })
            })
            .catch((err) => {
                console.log(err)
                const message = 'Something went wrong :( Check the form for errors.'
                return res.status(200).json({
                    success: false,
                    message: message
                })
            })
    } else {
        return res.status(200).json({
            success: false,
            message: 'Invalid credentials!'
        })
    }
})

router.get('/all', (req, res) => {
    Product
        .find()
        .then(products => {
            res.status(200).json(products)
        })
})

router.post('/order', (req, res) => {
    const productIds = req.body.map((id) => mongoose.Types.ObjectId(id));
    Product
        .find({
            '_id': { $in: productIds }
        })
        .then(products => {
            res.status(200).json(products);
        })
})

router.get('/details/:id', (req, res) => {
    const id = req.params.id;
    Product
        .findById(id)
        .then(product => {
            Review
                .find({ product: id })
                .populate('creator', 'username')
                .then(reviews => {
                    res.status(200).json({
                        product,
                        reviews
                    })
                })
        })
})

router.delete('/delete/:id', authCheck, (req, res) => {
    const id = req.params.id
    if (req.body.roles.indexOf('Admin') > -1) {
        Product
            .findById(id)
            .then((product) => {
                Review.find({ '_id': { $in: product.reviews } })

                Review.deleteMany({ 'product': id })
                    .then(() => {
                        product
                            .remove()
                            .then(() => {
                                return res.status(200).json({
                                    success: true,
                                    message: 'Product deleted successfully!'
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
    } else {
        return res.status(200).json({
            success: false,
            message: 'Invalid credentials!'
        })
    }
})

router.get('/search', (req, res) => {
    const searchS = req.query.qr.toLowerCase();

    Product
        .find()
        .then(products => {
            const filtered = products.filter(a => a.title.toLowerCase().includes(searchS))

            res.status(200).json(filtered)
        })
})

module.exports = router
