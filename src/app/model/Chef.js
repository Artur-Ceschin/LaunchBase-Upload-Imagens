const db = require('../../config/db')
const {
    ingredients,
    preparation,
    date
} = require('../../lib/utils')


module.exports = {
    all() {
        return db.query(`SELECT * FROM chefs`)
    },
    create(data) {
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

        return db.query(query, values)

        // db.query(query, values, function (err, results) {
        //     if (err) {
        //         throw ('DataBase error ' + err)
        //     }

        //     callback(results.rows[0])
        // })
    },
    find(id) {
        return db.query(`SELECT chefs.*, COUNT(recipes) AS total_recipes
        FROM chefs
        LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
        WHERE chefs.id = $1
        GROUP BY chefs.id`, [id])
    },
    findChefRecipes(id) {
        return db.query(`
            SELECT *
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            WHERE chefs.id = $1`, [id])
    },
    findChef(id) {
        return db.query(`SELECT * FROM chefs WHERE id = $1`, [id])
    },
    update(data) {

        const query = `
        UPDATE chefs SET
            avatar_url=($1),
            name=($2)
        WHERE id = $3
        `
        const values = [
            data.avatar_url,
            data.name,
            data.id
        ]

        return db.query(query, values)

    },
    delete(id) {
        return db.query(`DELETE FROM chefs WHERE id = $1`, [id])
    }
}