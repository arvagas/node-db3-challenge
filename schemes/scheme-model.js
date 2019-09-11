const db = require('../data/db-config')

module.exports = {
    find,
    findById,
    findSteps,
    add,

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

function findSteps(id) {
    return db('schemes as sc')
    .join('steps as st', 'sc.id', 'st.scheme_id')
    .select('st.id', 'sc.scheme_name', 'st.step_number', 'st.instructions')
    .where({ scheme_id: id })
    .orderBy('step_number', 'asc')
    .then(steps => steps)
}

function add(newScheme) {
    return db('schemes')
    .insert(newScheme, 'id')
    .then(ids => findById(ids[0]))
}