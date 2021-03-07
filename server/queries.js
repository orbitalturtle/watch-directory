const Pool = require('pg').Pool
const pool = new Pool({
  user: 'alyssa',
  host: 'localhost',
  database: 'tower_api',
  password: 'password',
  port: 5432,
})

const getTowers = (request, response) => {
  pool.query('SELECT * FROM towers ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getTowerById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM towers WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createTower = (request, response) => {
  const { tower_id, address } = request.body

  pool.query('INSERT INTO towers (tower_id, address) VALUES ($1, $2)', [tower_id, address], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Tower added with ID: ${result.insertId}`)
  })
}

const deleteTower = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM towers WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getTowers,
  getTowerById,
  createTower,
  deleteTower,
}
