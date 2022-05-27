import movies from '../movies.json';
import theMovie from '../../singleMovie/[movieId]'

export default function handler(req, res) {
    res.status(200).json(movies[req.query.movieId])
}