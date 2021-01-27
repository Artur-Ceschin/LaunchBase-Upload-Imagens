const db = require('../../../config/db')
const {
    ingredients,
    preparation,
    date
} = require('../../lib/utils')


module.exports = {
    all(callback) {
        db.query(`SELECT recipes.*, chefs.name AS chef_name
        FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id =  chefs.id)`, function (err, results) {
            if (err) {
                throw ('DataBase error ' + err.message)
            }

            callback(results.rows)
            
        })
    },
    create(data, callback) {
        const query = `
        INSERT INTO recipes (
            chef_id,
            image,
            title,
            ingredients,
            preparation,
            information,
            created_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id
    `

        const values = [
            data.chef,
            data.image,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
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
        db.query(`SELECT recipes.*, chefs.name AS chef_name
        FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        WHERE recipes.id = $1`, [id], function (err, results) {
            if (err) {
                throw ('DataBase error ' + err)
            }
            callback(results.rows[0])
        })
    },
    findBy(filter, callback) {
        db.query(`
          SELECT recipes.*, chefs.name AS chef_name
          FROM recipes
          LEFT JOIN chefs ON (recipes.chef_id =  chefs.id)
          WHERE recipes.title ILIKE '%${filter}%'
          GROUP BY recipes.id, chefs.name
          `, function(err, results) {
          if(err) throw `Database error! ${err}`
          
          callback(results.rows)
        })
      },
    update(data, callback) {

        const query = `
        UPDATE recipes SET
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
        db.query(`DELETE FROM recipes WHERE id = $1`, [id], function (err, results) {
            if(err){
                throw ('DataBase error ' + err)
            }

            return callback()
        })
    },
    chefsSelectOptions(callback) {
        db.query(`SELECT name, id FROM chefs`, function(err, results) {
            if (err) throw 'Database Error!'

            callback(results.rows)
        })
    },
    paginate(params){

        let {
            filter,
            limit,
            offset,
            callback
        } = params

        let query = "",
            filterQuery = "",
            totalQuery = `(
                SELECT count(*)
                FROM recipes
            ) AS total`

        if (filter) {
            filterQuery = `
            WHERE recipes.title ILIKE '%${filter}%' `
            totalQuery = `(
            SELECT count(*)
            FROM recipes
            ${filterQuery}
            ) AS total`
        }
        query = `
        SELECT recipes.*,${totalQuery}, chefs.name AS chef_name
        FROM recipes
        LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
        ${filterQuery}
        LIMIT $1 OFFSET $2
        `
        db.query(query, [limit, offset], (err, results) => {
            if (err) throw `Database is ${err}`

            callback(results.rows)
        })

    }
}