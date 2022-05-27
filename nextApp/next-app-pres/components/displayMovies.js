import React from "react";
import styles from '../styles/displayMovies.module.css';
import Link from 'next/link';

export default function displayMovies(prop) {
    let [data, setData] = React.useState();

    React.useEffect(() => {
        fetch('api/movies')
            .then((res) => res.json())
            .then((res) => {
                setData(orderBest(res))
            })
    }, [])

    function orderBest(params) {
        var switching, shouldSwitch, index;
        switching = true;
        let i = 0
        while (switching) {
            i++;
            switching = false;
            for (index = 0; index < (params.length - 1); index++) {
                shouldSwitch = false;
                if ((params[index].netflix + params[index].amazon + params[index].disney) < (params[index + 1].netflix + params[index + 1].amazon + params[index + 1].disney)) {
                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {
                let tempValue = params[index];
                params[index] = params[index + 1];
                params[index + 1] = tempValue;
                switching = true;
            }
        }
        return params
    }

    if (!data) return <p>No movie data</p>


    let firstFive = 5;

    return (
        <div className={styles.allMoviesClass}>
            {
                data.map(function (item, idx) {
                    switch (prop.category) {
                        case "best":
                            if (Math.ceil(((item.netflix + item.amazon + item.disney) / 3) / 2) >= 4 && firstFive > 0) {
                                firstFive -= 1;
                                return (
                                    <Link href={{
                                        pathname: `/singleMovie/${item.id}`
                                    }} key={idx + 1}>
                                        <a className={styles.movieInfo}>
                                            <img className={styles.imagesPoster} src={item.poster} alt="" />
                                            <h4>{item.title}</h4>
                                            <img className={styles.noteSvg}
                                                src={"/noteAsStars" + Math.ceil(((item.netflix + item.amazon + item.disney) / 3) / 2) + ".svg"}
                                                alt={"note of  " + Math.ceil(((item.netflix + item.amazon + item.disney) / 3) / 2) + "stars"} />

                                        </a>
                                    </Link>
                                )
                            }
                            break;

                        default:
                            if (prop.category == item.category) {
                                return (<Link href={{
                                    pathname: `/singleMovie/${item.id}`
                                }} key={idx + 1}>
                                    <a className={styles.movieInfo}>
                                        <img className={styles.imagesPoster} src={item.poster} alt="" />
                                        <p>{item.title}</p>
                                        <img className={styles.noteSvg}
                                            src={"/noteAsStars" + Math.ceil(((item.netflix + item.amazon + item.disney) / 3) / 2) + ".svg"}
                                            alt={"note of  " + Math.ceil(((item.netflix + item.amazon + item.disney) / 3) / 2) + "stars"} />
                                    </a>
                                </Link>
                                )
                            }

                            break;
                    }
                })
            }

        </div>


    )
}