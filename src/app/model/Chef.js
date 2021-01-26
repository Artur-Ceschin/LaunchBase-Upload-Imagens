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
            avatar_url,
            created_at
        ) VALUES ($1, $2, $3)
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
        db.query(`SELECT chefs.*, COUNT(recipes) AS total_recipes
        FROM chefs
        LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
        WHERE chefs.id = $1
        GROUP BY chefs.id`, [id], function (err, results) {
            if (err) {
                throw ('DataBase error ' + err)
            }
            callback(results.rows[0])
        })
    },
    findChefRecipes(id, callback) {
        db.query(`
            SELECT *
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            WHERE chefs.id = $1`, [id], function(err, results) {
                if(err) throw `Database error! + ${err}`
    
                callback(results.rows)
            })
        },
    update(data, callback) {

        const query = `
        UPDATE chefs SET
            avatar_url=($1),
            name=($2)
        WHERE id = $3
        `
        let values = [
            data.avatar_url,
            data.name,
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