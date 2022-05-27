import React from "react";
import styles from '../../../styles/selectSeats.module.css';
import Link from 'next/link';

let theSelectedSeats = [];

function singleMovieSeats(props) {
    let [data, setData] = React.useState(props.screenings[0]);
    let [numberOfSeats, setNumberOfSeats] = React.useState(0);
    let [hideIt, setHideIt] = React.useState(true);


    let theHoursArray = [
        {
            hour: props.screenings[0],
            selected: true
        },
        {
            hour: props.screenings[1],
            selected: false
        },
        {
            hour: props.screenings[2],
            selected: false
        },
        {
            hour: props.screenings[3],
            selected: false
        },
        {
            hour: props.screenings[4],
            selected: false
        }
    ];

    let [theHour, setTheHour] = React.useState(theHoursArray);

    function restartVal() {
        theSelectedSeats = [];
        setSelectedSeats([]);
        setNumberOfSeats(0);
        setHideIt(true);
    }

    function selectAnHour(params, idx) {
        restartVal();
        for (let index = 0; index < theHoursArray.length; index++) {
            if (index == idx) {
                theHoursArray[index].selected = true;

            } else {

                theHoursArray[index].selected = false;
            }
        }
        setTheHour(theHoursArray);
        setData(params);
    }

    function unHide() {
        setHideIt(false);
    }


    let [selectedSeats, setSelectedSeats] = React.useState([]);

    function selectASeat(e, isTaken) {

        if (isTaken) {
            console.log("this seat is already taken");
        } else {
            if (e.target.classList.contains(styles.selected)) {
                for (let index = 0; index < theSelectedSeats.length; index++) {
                    if (theSelectedSeats[index] == e.target.innerHTML) {
                        theSelectedSeats.splice(index, 1);
                    }
                }

            } else {
                theSelectedSeats.push(e.target.innerHTML);

            }
            setSelectedSeats(theSelectedSeats);

            setNumberOfSeats(selectedSeats.length);
        }
    }

    return (
        <section id="helloId">
            <header className={styles.headerSingle}>
                <Link href={`/`}>
                    <a>
                        <img src={"/leftArrow.svg"} alt="" />
                    </a>

                </Link>
                <p>Detail movie</p>
            </header>
            <div className={styles.tiddyTable}>
                <div className={styles.leftSide}>
                    {
                        data.seats.map(function (item, idx) {
                            if (idx < 25) {
                                switch (idx) {
                                    case 0:
                                        return (
                                            <div onClick={(e) => selectASeat(e, item.isTaken)} className={
                                                item.isTaken ? styles.firstRow + " " + styles.reserved :
                                                    selectedSeats.includes(item.number) ? styles.firstRow + " " + styles.selected :
                                                        styles.firstRow + " " + styles.normalRow
                                            }
                                                key={idx + 1}>{item.number}</div>
                                        )
                                        break;
                                    case 1:
                                        return (
                                            <div onClick={(e) => selectASeat(e, item.isTaken)} className={
                                                item.isTaken ? styles.secondRow + " " + styles.reserved :
                                                    selectedSeats.includes(item.number) ? styles.secondRow + " " + styles.selected :
                                                        styles.secondRow + " " + styles.normalRow
                                            } key={idx + 1}>{item.number}</div>
                                        )
                                        break;
                                    case 23:
                                        return (

                                            <div onClick={(e) => selectASeat(e, item.isTaken)} className={
                                                item.isTaken ? styles.secondLastRow + " " + styles.reserved :
                                                    selectedSeats.includes(item.number) ? styles.secondLastRow + " " + styles.selected :
                                                        styles.secondLastRow + " " + styles.normalRow
                                            } key={idx + 1}>{item.number}</div>
                                        )
                                        break;
                                    case 24:
                                        return (

                                            <div onClick={(e) => selectASeat(e, item.isTaken)} className={
                                                item.isTaken ? styles.lastRow + " " + styles.reserved :
                                                    selectedSeats.includes(item.number) ? styles.lastRow + " " + styles.selected :
                                                        styles.lastRow + " " + styles.normalRow
                                            } key={idx + 1}>{item.number}</div>
                                        )
                                        break;

                                    default:

                                        return (
                                            <div onClick={(e) => selectASeat(e, item.isTaken)} className={
                                                item.isTaken ? styles.reserved :
                                                    selectedSeats.includes(item.number) ? styles.normalRow + " " + styles.selected :
                                                        styles.normalRow
                                            } key={idx + 1}>{item.number}</div>
                                        )
                                        break;
                                }

                            }
                        })
                    }
                </div>
                <div className={styles.rightSide}>
                    {
                        data.seats.map(function (item, idx) {

                            if (idx >= 25) {
                                switch (idx) {
                                    case 25:
                                        return (
                                            <div onClick={(e) => selectASeat(e, item.isTaken)} className={
                                                item.isTaken ? styles.firstRowR + " " + styles.reserved :
                                                    selectedSeats.includes(item.number) ? styles.firstRowR + " " + styles.selected :
                                                        styles.firstRowR + " " + styles.normalRow
                                            } key={idx + 1}>{item.number}</div>
                                        )
                                        break;
                                    case 26:
                                        return (

                                            <div onClick={(e) => selectASeat(e, item.isTaken)} className={
                                                item.isTaken ? styles.secondRowR + " " + styles.reserved :
                                                    selectedSeats.includes(item.number) ? styles.secondRowR + " " + styles.selected :
                                                        styles.secondRowR + " " + styles.normalRow
                                            } key={idx + 1}>{item.number}</div>
                                        )
                                        break;
                                    case 48:
                                        return (

                                            <div onClick={(e) => selectASeat(e, item.isTaken)} className={
                                                item.isTaken ? styles.secondLastRowR + " " + styles.reserved :
                                                    selectedSeats.includes(item.number) ? styles.secondLastRowR + " " + styles.selected :
                                                        styles.secondLastRowR + " " + styles.normalRow
                                            } key={idx + 1}>{item.number}</div>
                                        )
                                        break;
                                    case 49:
                                        return (

                                            <div onClick={(e) => selectASeat(e, item.isTaken)} className={
                                                item.isTaken ? styles.lastRowR + " " + styles.reserved :
                                                    selectedSeats.includes(item.number) ? styles.lastRowR + " " + styles.selected :
                                                        styles.lastRowR + " " + styles.normalRow
                                            } key={idx + 1}>{item.number}</div>
                                        )
                                        break;

                                    default:
                                        return (

                                            <div onClick={(e) => selectASeat(e, item.isTaken)} className={
                                                item.isTaken ? styles.reserved :
                                                    selectedSeats.includes(item.number) ? styles.normalRow + " " + styles.selected :
                                                        styles.normalRow
                                            } key={idx + 1}>{item.number}</div>
                                        )
                                        break;
                                }
                            }
                        })
                    }
                </div>
                <article className={styles.demo}>
                    <div>
                        <div className={styles.normalRow}>A1</div>
                        <p>Available</p>
                    </div>
                    <div>
                        <div className={styles.reserved}>A1</div>
                        <p>Reserved</p>
                    </div>
                    <div>
                        <div className={styles.selected}>A1</div>
                        <p>Selected</p>
                    </div>
                </article>
            </div>
            <article className={styles.seatsArticle}>
                {
                    props.screenings.map(function (item, idx) {
                        return (
                            <button key={idx + 1} className={theHour[idx].selected ? styles.hourBtn + " " + styles.selectedHour :
                                styles.hourBtn} onClick={(e) => selectAnHour(item, idx)}>{item.hour}</button>
                        )
                    })
                }
            </article>
            <article>
                <div >
                    <p>{numberOfSeats} Seats selected</p>
                    <p>{numberOfSeats > 0 ? "$" + numberOfSeats * 11.08 : ""}</p>
                </div>
                <div className={styles.toFlex}>
                    <button onClick={unHide} className={numberOfSeats <= 0 ? styles.toHide + " " + styles.buyATicket : styles.buyATicket}>Book seats</button>
                    <article className={hideIt ? styles.toHide : ""}>
                        <p>Thanks for your purchase!</p>
                    </article>

                </div>
            </article>

        </section>
    )
}

export async function getServerSideProps(context) {
    const res = await fetch(`http://localhost:3000/api/movie/${context.query.movieIdSeats}`);
    const movieData = await res.json();
    return { props: movieData };
}


export default singleMovieSeats;