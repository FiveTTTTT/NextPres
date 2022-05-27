// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// api_key=c0cdbbe04b54f18f8026fbf762075a34
// exemple: https://api.themoviedb.org/3/movie/2?api_key=c0cdbbe04b54f18f8026fbf762075a34


import movies from './movies.json';


export default function Movies(req, res) {
  res.status(200).json(movies)
}
