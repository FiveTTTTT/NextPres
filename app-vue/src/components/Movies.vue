<template>
    <div class="allMovies">
        <div v-for="moviesData in moviesDataList" :key="moviesData.id" class="movieInfo">
            <router-link :to="{
                name: 'SingleMovie',
                params: {
                    id: moviesData.id
                }
            }">

                <div class="weather-icon">
                    <img :src="`${moviesData.poster}`">
                    <h4>{{ moviesData.title }}</h4>
                    <img :src="`/noteAsStars${Math.ceil(((moviesData.netflix + moviesData.amazon + moviesData.disney) / 3) / 2)}.svg`"
                        :alt="`noteAsStars${Math.ceil(((moviesData.netflix + moviesData.amazon + moviesData.disney) / 3) / 2)} stars`">

                </div>

            </router-link>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "Movies",
    props: ['category'],
    data() {
        axios.get("movies.json").then(response => (this.moviesDataList = this.getMoviesWithCategory(response.data)));

        return {
            moviesDataList: []
        };
    },
    methods: {
        getMoviesWithCategory(data) {
            let tempArray = [];
            let firstFive = 5;
            data.forEach(element => {
                if (this.category == "best") {
                    if (Math.ceil(((element.netflix + element.amazon + element.disney) / 3) / 2) >= 4 && firstFive > 0) {
                        firstFive -= 1;
                        tempArray.push(element);
                    }
                } else {
                    if (element.category == this.category) {
                        tempArray.push(element);
                    }
                }
            });
            return tempArray;
        }

    }
};
</script>
<style>
.allMovies {
    width: 100%;
    display: grid;
    grid-gap: 10px;
    grid-auto-rows: minmax(100px, auto);
    grid-template-columns: repeat(3, 1fr);
    overflow: scroll;
    grid-row-start: 1;
}

.movieInfo {
    grid-row: 1;
    display: grid;
    grid-gap: 5px;
    grid-auto-rows: minmax(100px, auto);
    grid-template-rows: repeat(3, 1fr);
    width: 40vw;
    height: 42vh;
    /* height: 30vw; */
    margin-left: 20px;
}

.movieInfo img {
    width: 100%;
    border-radius: 30px;
}

h2 {
    text-align: center;
}
</style>