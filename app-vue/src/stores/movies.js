import {
    defineStore
} from 'pinia'

export const useAllMoviesStore = defineStore({
    id: 'allMovies',
    state: () => ({
        hidePurchase: true,
        theHoursArray: [{
                id: 0,
                hour: "9:20 AM",
                selected: true
            },
            {
                id: 1,
                hour: "12:20 AM",
                selected: false
            },
            {
                id: 2,
                hour: "3:20 PM",
                selected: false
            },
            {
                id: 3,
                hour: "6:30 PM",
                selected: false
            },
            {
                id: 4,
                hour: "11 PM",
                selected: false
            }
        ],
        leftSeats: [],
        rightSeats: [],
        selectedSeats: []
    }),
    getters: {},
    actions: {
        changeHour(selectedHour, allSeats) {
            this.theHoursArray.forEach(element => {
                if (selectedHour == element.hour) {
                    element.selected = true;
                    this.emptySelect();
                    this.fillSeats(allSeats);


                } else {
                    element.selected = false;
                }
            });
        },
        fillSeats(data) {
            for (let index = 0; index < data.seats.length; index++) {
                if (index < 25) {
                    this.leftSeats.push(data.seats[index])
                } else {
                    this.rightSeats.push(data.seats[index])

                }
            }
            return {
                1: this.leftSeats,
                2: this.rightSeats
            }
        },
        selectedASeat: function (event, isTaken) {
            if (isTaken) {
                console.log("this seat is already taken");
            } else {

                if (event.target.classList.contains("selected")) {
                    for (let index = 0; index < this.selectedSeats.length; index++) {
                        if (this.selectedSeats[index] == event.target.innerHTML) {
                            this.selectedSeats.splice(index, 1);
                        }
                    }

                } else {
                    this.selectedSeats.push(event.target.innerHTML);

                }
            }
        },
        emptySelect() {
            this.leftSeats = [];
            this.rightSeats = [];
            this.selectedSeats = [];
            this.hidePurchase = true;
        },
        unHide() {
            this.hidePurchase = false;
        }
    }
})