const db = require('../../../config/db')
const {
    ingredients,
    preparation,
    date
} = require('../../lib/utils')


module.exports = {
    all(callback) {
        db.query('SELECT * FROM chefs', function (err, results) {
            if (err) {
                throw ('DataBase error ' + err.message)
            }

            callback(results.rows)
        })
    },
    create(data, callback) {
        const query = `
        INSERT INTO chefs (
            name,
            avatar_url
            created_at
        ) VALUES ($1, $2, $3,)
        RETURNING id
    `

        const values = [
            data.name,
            data.avatar_url,
            date(Date.now()).iso
        ]

        db.query(query, values, function (err, results) {
            if (err) {
                throw ('DataBase error ' + err)
            }

            callback(results.rows[0])
        })
    },
    find(id, callback) {
        db.query('SELECT * FROM chefs WHERE id = $1', [id], function (err, results) {
            if (err) {
                throw ('DataBase error ' + err)
            }
            callback(results.rows[0])
        })
    },
    update(data, callback) {

        const query = `
        UPDATE chefs SET
            image=($1),
            title=($2),
            chef_id=($3),
            ingredients=($4),
            preparation=($5),
            information=($6)
        WHERE id = $7
        `
        let values = [
            data.image,
            data.title,
            data.chefs,
            data.ingredients,
            data.preparation,
            data.information,
            data.id
        ]

        db.query(query, values, function (err, results) {
            if (err) {
                throw ('DataBase error ' + err)
            }

            return callback()
        })
            
    },
    delete(id, callback) {
        db.query(`DELETE FROM chefs WHERE id = $1`, [id], function (err, results) {
            if(err){
                throw ('DataBase error ' + err)
            }

            return callback()
        })
    }
}