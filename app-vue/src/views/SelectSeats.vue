<template>
    <div class="tiddyTable">
        <div class="leftSide">
            <div v-for="seat in moviesStore.leftSeats" :key="seat.number"
                v-on:click="moviesStore.selectedASeat($event, seat.isTaken)" :class="[seat.isTaken ? 'test ' : 'normalRow ']
                    + [seat.number == 'A1' ? 'firstRow' : '']
                    + [seat.number == 'A2' ? ' secondRow' : '']
                    + [seat.number == 'H3' ? ' secondLastRow' : '']
                    + [seat.number == 'I1' ? ' lastRow' : '']
                    + [moviesStore.selectedSeats.includes(seat.number) ? ' selected' : '']
                ">

                {{ seat.number }}
            </div>

        </div>
        <div class="rightSide">
            <div v-for="seat in moviesStore.rightSeats" :key="seat.number"
                v-on:click="moviesStore.selectedASeat($event, seat.isTaken)" :class="[seat.isTaken ? 'test ' : 'normalRow ']
                    + [seat.number == 'A4' ? 'firstRowR' : '']
                    + [seat.number == 'A5' ? ' secondRowR' : '']
                    + [seat.number == 'H6' ? ' secondLastRowR' : '']
                    + [seat.number == 'I2' ? ' lastRowR' : '']
                    + [moviesStore.selectedSeats.includes(seat.number) ? ' selected' : '']
                ">
                {{ seat.number }}
            </div>
        </div>
        <div class="demo">
            <div>
                <div class="normalRow">A1</div>
                <p>Available</p>
            </div>
            <div>
                <div class="test">A1</div>
                <p>Reserved</p>
            </div>
            <div>
                <div class="selected">A1</div>
                <p>Selected</p>
            </div>
        </div>
    </div>
    <article class="seatsArticle">
        <button v-for="oneHour in moviesStore.theHoursArray" :key="oneHour.id"
            v-on:click="moviesStore.changeHour(oneHour.hour, moviesDataList[oneHour.id])"
            v-bind:class="oneHour.selected ? 'hourBtn' + ' ' + 'selectedHour' : 'hourBtn'">
            {{ oneHour.hour }}
        </button>

    </article>
    <article>
        <div>
            <p>{{ moviesStore.selectedSeats.length }} Seats selected</p>
            <p>{{ moviesStore.selectedSeats.length > 0 ? "$" + moviesStore.selectedSeats.length * 11.08 : "" }}</p>
        </div>
        <div class="toFlex">
            <button id="btnBuy" v-on:click="moviesStore.unHide" v-if="moviesStore.selectedSeats.length > 0">Book
                seats</button>
            <article v-bind:class="moviesStore.hidePurchase ? 'toHide' : ''">
                <p>Thanks for your purchase!</p>
            </article>

        </div>
    </article>
</template>

<script>
import axios from 'axios';
import { useAllMoviesStore } from "@/stores/movies"

let hidePurchase = true;

export default {
    name: "SelectSeats",
    props: ['id'],

    data() {
        axios.get("../movies.json")
            .then(response => (this.moviesDataList = response.data[this.id].screenings))
            .then(response => this.moviesStore.fillSeats(this.moviesDataList[0]));

        return {
            moviesDataList: {},
            hidePurchase: hidePurchase
        };
    },
    setup() {
        const moviesStore = useAllMoviesStore();
        return {
            moviesStore
        };
    },
    methods: {

    }
};
</script>
<style>
.seatsArticle {
    height: 12vh;
    display: grid;
    padding-left: 7%;
    padding-right: 7%;
    column-gap: 1vh;
    row-gap: 1vh;
    grid-auto-rows: minmax(40px, auto);
    grid-template-columns: repeat(3, 1fr);
}

#btnBuy {
    color: #f0f0f0;
    font-weight: bold;
    font-size: 16px;
    background-color: #3d4364;
    width: fit-content;
    padding: 10px;
    border-radius: 15px;
    border: none;
    background-color: #566ee5;
    opacity: 1;
}

.seatsArticle .hourBtn.selectedHour {
    background-color: #566ee5;
    opacity: 1;
}

.seatsArticle .hourBtn {
    opacity: 0.7;
    color: #f0f0f0;
    font-weight: bold;
    font-size: 12px;
    background-color: #3d4364;
    width: 100%;
    border-radius: 15px;
    border: none;
}

.toHide {
    display: none;
}

.toFlex{
    display: flex;
    justify-content: space-around;
}

.tiddyTable {
    width: 100%;
    display: grid;
    grid-gap: 10%;
    grid-auto-rows: minmax(100px, auto);
    grid-template-columns: repeat(2, 1fr);
}

.tiddyTable .leftSide,
.tiddyTable .rightSide {
    display: grid;
    width: 100%;
    grid-gap: 10px;
    grid-template-columns: repeat(3, 1fr);
}

.tiddyTable .leftSide .firstRow,
.tiddyTable .rightSide .firstRow {
    grid-column: 2;
}

.tiddyTable .leftSide .firstRowR,
.tiddyTable .rightSide .firstRowR {
    grid-column: 1;
}

.tiddyTable .leftSide .secondRow,
.tiddyTable .rightSide .secondRow {
    grid-column: 3;
}

.tiddyTable .leftSide .secondRowR,
.tiddyTable .rightSide .secondRowR {
    grid-column: 2;
    grid-column-end: 4;
}

.tiddyTable .leftSide .lastRow,
.tiddyTable .rightSide .lastRow {
    grid-column: 3;
}

.tiddyTable .leftSide .lastRowR,
.tiddyTable .rightSide .lastRowR {
    grid-column: 2;
}

.tiddyTable .leftSide .secondLastRow,
.tiddyTable .rightSide .secondLastRow {
    grid-column: 2;
}

.tiddyTable .leftSide .secondLastRowR,
.tiddyTable .rightSide .secondLastRowR {
    grid-column: 1;
}

.tiddyTable .leftSide div,
.tiddyTable .rightSide div {
    border-width: 2px;
    border-style: solid;
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 30%;
}

.tiddyTable .leftSide {
    grid-column: 1;
}

.tiddyTable .rightSide {
    grid-column: 2;
}

.tiddyTable .normalRow {
    border-color: #566ee5;
}

.tiddyTable .test {
    border-color: #3d4364;
    opacity: 0.7;
}

.tiddyTable .selected {
    background-color: #566ee5;
    color: black;
}

.tiddyTable .demo {
    grid-column: 1/3;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
}

.tiddyTable .demo div {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
}

.tiddyTable .demo div div {
    width: 30px;
    height: 30px;
    border-width: 2px;
    border-style: solid;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 30%;
}
</style>