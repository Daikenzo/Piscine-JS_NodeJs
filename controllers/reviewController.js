const { UniqueConstraintError, ValidationError, Op } = require('sequelize')
const { ReviewModel, UserModel } = require('../db/sequelize')

exports.findAllReviews = (req, res) => {
    ReviewModel
        .findAll()
        .then(result => {
            res.json({ message: 'La liste des avis a bien été récupérée.', data: result })
        })
        .catch(error => {
            res.status(500).json({ message: error })
        })
}

// Review POST
exports.createReview = (req, res) => {
    UserModel.findOne({ where: { username: req.username } })
        .then(user => {
            return ReviewModel.create({ ...req.body, UserId: user.id, CoworkingId: req.params.coworkingId })
                .then(result => {
                    res.json({ message: `création d'un avis`, data: result })
                })
        })
        .catch(error => {
            res.status((500)).json({ message: error.message })
        })


} 