import React from "react";
import styles from '../../styles/singleMovie.module.css';
import Link from 'next/link';


export default function singleMovie(props) {
    return (
        <div>
            <header className={styles.headerSingle}>
                <Link href={`/`}>
                    <a>
                        <img src={"/leftArrow.svg"} alt="" />
                    </a>

                </Link>
                <p>Detail movie</p>
            </header>
            <section className={styles.movieDetails}>
                <article className={styles.poster}>
                    <img src={props.movieData.poster} alt="" />
                </article>
                <article className={styles.mainDetails}>
                    <h1>{props.movieData.title}</h1>
                    <div>
                        <p>Director: {props.movieData.director} | </p>
                        <img className={styles.noteSvg}
                            src={"/noteAsStars" + Math.ceil(((props.movieData.netflix + props.movieData.amazon + props.movieData.disney) / 3) / 2) + ".svg"}
                            alt={"note of  " + Math.ceil(((props.movieData.netflix + props.movieData.amazon + props.movieData.disney) / 3) / 2) + "stars"} />
                    </div>
                    <div className={styles.category}>{props.movieData.category}</div>
                </article>
                <article id="btnBuy">
                    <Link href={{
                        pathname: `/singleMovie/selectSeats/${props.movieData.id}`
                    }}>
                        <a className={styles.buyATicket}>
                            Buy tickets
                        </a>
                    </Link>
                </article>
            </section>
        </div>
    )
}

export async function getServerSideProps(context) {
    const res = await fetch(`http://localhost:3000/api/movie/${context.query.movieId}`);
    const movieData = await res.json();
    return { props: { movieData } };
}
