const express = require('express')
const app = express()
const sqlite3 = require('sqlite3')
const path = require('path')
const {open} = require('sqlite')
const dbpath = path.join(__dirname, 'moviesData.db')
app.use(express.json())

let db = null

const initializedb = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    })
    await app.listen(3000, () => {
      console.log(
        'Server Running at https://viraji7f3fnjscpdiitb.drops.nxtwave.tech',
      )
    })
  } catch (e) {
    console.log(`DB Error: ${e.message} `)
    process.exit(1)
  }
}
initializedb()

app.get('/movies/', async (request, respond) => {
  const getAllMovies = `SELECT * FROM MOVIE;`
  const dbData = await db.all(getAllMovies)
  await respond.send(
    dbData.map(eachMovie => ({
      movieName: eachMovie.movie_name,
    })),
  )
})

app.post('/moives/', async (req, res) => {
  const detailOfMovie = req.body
  const {directorID, movieName, leadActor} = detailOfMovie
  const addmovie = `INSERT 
  INTO MOVIE 
  (director_id,movie_name,lead_actor) 
  VALUES 
  (
    ${directorID},
    '${movieName}',
    '${leadActor}');`
  await db.run(addmovie)
  res.send('Movie Successfully Added')
})

app.get('/movies/:movieID/', async (req, res) => {
  const {movieID} = req.params
  const getMovie = `SELECT * FROM movie WHERE movie_id = ${movieID};`
  const oneMovie = await db.get(getMovie)
  res.send({
    movieID: oneMovie.movie_id,
    directorID: oneMovie.director_id,
    movieName: oneMovie.movie_name,
    leadActor: oneMovie.lead_actor,
  })
})

app.put('/movies/:movieID/', async (req, res) => {
  const {movieID} = req.params
  const updateTheDetail = req.body
  const {directorID, movieName, leadActor} = updateTheDetail
  const updateDetailQuery = `UPDATE movie SET director_id = ${directorID}, movie_name = '${movieName}',lead_actor = '${leadActor}' WHERE movie_id = ${movieID};
  `
  await db.run(updateDetailQuery)
  res.send('Movie Details Updated')
})

app.delete('/movies/:movieID/', async (req, res) => {
  const {movieID} = req.params
  const deleteMovie = `DELETE FROM movie WHERE movie_id = ${movieID}`
  await db.run(deleteMovie)
  await res.send('Movie Removed')
})

app.get('/directors/', async (req, res) => {
  const getAllDirector = `SELECT * FROM director;`
  const directorsData = await db.all(getAllDirector)
  res.send(
    directorsData.map(eachdirector => ({
      directorID: eachdirector.director_id,
      directorName: eachdirector.director_name,
    })),
  )
})

app.get('/directors/:directorID/movies/', async (req, res) => {
  const {directorID} = req.params
  const getMoviesNames = `SELECT movie_name FROM movie WHERE director_id = ${directorID};`
  const moviesNameBYdirectorID = await db.all(getMoviesNames)
  res.send(
    moviesNameBYdirectorID.map(eachmovie => ({
      movieName: eachmovie.movie_name,
    })),
  )
})

module.exports = app
