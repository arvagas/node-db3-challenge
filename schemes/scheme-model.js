const db = require('../data/db-config')

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove,
    addStep
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
    .then(arrId => findById(arrId[0]))
}

function update(changes, id) {
    return db('schemes')
    .where({ id })
    .update(changes)
    .then(() => findById(id))
}

function remove(id) {
    return findById(id)
    .then(scheme => {
        return db('schemes')
        .where({ id })
        .del()
        .then(() => scheme)
    })
}

function addStep(step, scheme_id) {
    return db('steps')
    .insert({ ...step, scheme_id })
    .then(arrId => {
        return db('steps')
        .where({ id: arrId[0] })
        .first()
        .then(newStep => newStep)
    })
}