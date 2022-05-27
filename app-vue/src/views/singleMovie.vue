<template>
    <section class="movieDetails">
        <article class="poster">
            <img :src="`${moviesDataList.poster}`" alt="">
        </article>
        <article class="mainDetails">
            <h1>{{ moviesDataList.title }}</h1>
            <div>
                <p>Director: {{ moviesDataList.director }} | </p>
                <img :src="`/noteAsStars${Math.ceil(((moviesDataList.netflix + moviesDataList.amazon + moviesDataList.disney) / 3) / 2)}.svg`"
                    :alt="`noteAsStars${Math.ceil(((moviesDataList.netflix + moviesDataList.amazon + moviesDataList.disney) / 3) / 2)} stars`">
            </div>
            <div className="category">{{ moviesDataList.category }}</div>
        </article>
        <article id="btnBuy">
            <router-link :to="{
                name: 'SelectSeats',
                params: {
                    id: id
                }
            }">
                Buy tickets
            </router-link>
        </article>

    </section>
</template>

<script>
import axios from 'axios';
import { useAllMoviesStore } from "@/stores/movies";


export default {
    name: "Movie",
    props: ['id'],
    data() {
        axios.get("../movies.json").then(response => (this.moviesDataList = response.data[this.id]));

        return {
            moviesDataList: {}
        };
    },
    setup() {
        const moviesStore = useAllMoviesStore();
        moviesStore.emptySelect();
        return {
            moviesStore
        };
    },
    methods: {
    }
};
</script>

<style>

#btnBuy {
    width: fit-content;
    padding: 10px;
    border-radius: 15px;
    border: none;
    background-color: #566ee5;
    opacity: 1;
}

#btnBuy a {
    color: #f0f0f0;
    font-weight: bold;
    font-size: 12px;
} 

.movieDetails {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-left: 5%;
    padding-right: 5%;
    width: 100%;
}

.movieDetails .poster {
    /* height: 45vh; */
    width: 80%;

}

.movieDetails .poster img {
    border-radius: 40px;
    width: 100%;
}

.movieDetails .mainDetails .category {
    border-radius: 20px;
    padding: 3px 20px;
    background-color: #3d4364;
    width: fit-content;
    opacity: 0.8;
    font-size: 0.8em;
}

.movieDetails .mainDetails h1 {
    font-size: 1.5em;
}

.movieDetails .mainDetails div {
    display: flex;
    align-items: center;
    margin-bottom: 3vh;
}

.movieDetails .mainDetails div p {
    margin: 0;
    padding: 0;
}

.movieDetails .mainDetails div .noteSvg {
    width: 30%;
}

.movieDetails .mainDetails h1,
.movieDetails .mainDetails div {
    width: 100%;
}

.movieDetails article {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
}
</style>