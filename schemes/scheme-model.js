const db = require('../data/db-config')

module.exports = {
    find,
    findById,
}

function find() {
    return db('schemes')
    .then(schemes => schemes)
}

function findById(id) {
    return db('schemes')
    .where({ id })
    .first()
    .then(scheme => scheme)
}