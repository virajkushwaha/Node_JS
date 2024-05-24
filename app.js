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
<<<<<<< HEAD
      movieName: eachMovie.movie_name,
=======
       movieName : eachMovie.movie_name,
>>>>>>> one test case failing
    })),
  )
})

<<<<<<< HEAD
app.post('/moives/', async (req, res) => {
  const detailOfMovie = req.body
  const {directorID, movieName, leadActor} = detailOfMovie
=======
app.post('/movies/', async (req, res) => {
  const detailOfMovie = req.body
  const {directorId, movieName, leadActor} = detailOfMovie
>>>>>>> one test case failing
  const addmovie = `INSERT 
  INTO MOVIE 
  (director_id,movie_name,lead_actor) 
  VALUES 
  (
<<<<<<< HEAD
    ${directorID},
=======
    ${directorId},
>>>>>>> one test case failing
    '${movieName}',
    '${leadActor}');`
  await db.run(addmovie)
  res.send('Movie Successfully Added')
})

<<<<<<< HEAD
app.get('/movies/:movieID/', async (req, res) => {
  const {movieID} = req.params
  const getMovie = `SELECT * FROM movie WHERE movie_id = ${movieID};`
  const oneMovie = await db.get(getMovie)
  res.send({
    movieID: oneMovie.movie_id,
    directorID: oneMovie.director_id,
=======
app.get('/movies/:movieId/', async (req, res) => {
  const {movieId} = req.params
  const getMovie = `SELECT * FROM movie WHERE movie_id = ${movieId};`
  const oneMovie = await db.get(getMovie)
  res.send({
    movieId: oneMovie.movie_id,
    directorId: oneMovie.director_id,
>>>>>>> one test case failing
    movieName: oneMovie.movie_name,
    leadActor: oneMovie.lead_actor,
  })
})

<<<<<<< HEAD
app.put('/movies/:movieID/', async (req, res) => {
  const {movieID} = req.params
  const updateTheDetail = req.body
  const {directorID, movieName, leadActor} = updateTheDetail
  const updateDetailQuery = `UPDATE movie SET director_id = ${directorID}, movie_name = '${movieName}',lead_actor = '${leadActor}' WHERE movie_id = ${movieID};
=======
app.put('/movies/:movieId/', async (req, res) => {
  const {movieId} = req.params
  const updateTheDetail = req.body
  const {directorId, movieName, leadActor} = updateTheDetail
  const updateDetailQuery = `UPDATE movie SET director_id = ${directorId}, movie_name = '${movieName}',lead_actor = '${leadActor}' WHERE movie_id = ${movieId};
>>>>>>> one test case failing
  `
  await db.run(updateDetailQuery)
  res.send('Movie Details Updated')
})

<<<<<<< HEAD
app.delete('/movies/:movieID/', async (req, res) => {
  const {movieID} = req.params
  const deleteMovie = `DELETE FROM movie WHERE movie_id = ${movieID}`
=======
app.delete('/movies/:movieId/', async (req, res) => {
  const {movieId} = req.params
  const deleteMovie = `DELETE FROM movie WHERE movie_id = ${movieId}`
>>>>>>> one test case failing
  await db.run(deleteMovie)
  await res.send('Movie Removed')
})

app.get('/directors/', async (req, res) => {
  const getAllDirector = `SELECT * FROM director;`
  const directorsData = await db.all(getAllDirector)
  res.send(
    directorsData.map(eachdirector => ({
<<<<<<< HEAD
      directorID: eachdirector.director_id,
=======
      directorId: eachdirector.director_id,
>>>>>>> one test case failing
      directorName: eachdirector.director_name,
    })),
  )
})

<<<<<<< HEAD
app.get('/directors/:directorID/movies/', async (req, res) => {
  const {directorID} = req.params
  const getMoviesNames = `SELECT movie_name FROM movie WHERE director_id = ${directorID};`
  const moviesNameBYdirectorID = await db.all(getMoviesNames)
  res.send(
    moviesNameBYdirectorID.map(eachmovie => ({
=======
app.get('/directors/:directorId/movies/', async (req, res) => {
  const {directorId} = req.params
  const getMoviesNames = `SELECT movie_name FROM movie WHERE director_id = ${directorId};`
  const moviesNameBYdirectorId = await db.all(getMoviesNames)
  res.send(
    moviesNameBYdirectorId.map(eachmovie => ({
>>>>>>> one test case failing
      movieName: eachmovie.movie_name,
    })),
  )
})

module.exports = app
