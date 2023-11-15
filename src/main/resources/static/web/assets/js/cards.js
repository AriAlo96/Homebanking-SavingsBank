const app = Vue.createApp({
    data() {
        return {
            client: {},
            cards: [],
            creditCards: [],
            debitCards: [],
            cardType: "",
            cardColor: "",
            currentDate: new Date()
        };
    },

    created() {
        axios.get("/api/clients/current")
            .then(response => {
                this.client = response.data;
                this.cards = this.client.cards
                console.log(this.cards);
                this.creditCards = this.createCreditCards()
                this.debitCards = this.createDebitCards()
            })
            .catch(error => {
                console.log(error);
            });
           

    },

    methods: {
        logout() {
            axios
                .post(`/api/logout`)
                .then(response => {
                    console.log("SingOut");
                    location.pathname = `/index.html`;
                })
                .catch(error => {
                    console.log(error);
                });
        },

        deleteCard(id){
            Swal.fire({
                title: 'Are you sure to delete this card?',
                text: 'This action cannot be reversed',
                showCancelButton: true,
                cancelButtonText: 'Cancell',
                confirmButtonText: 'Yes',
                confirmButtonColor: '#28a745',
                cancelButtonColor: '#dc3545',
                showClass: {
                  popup: 'swal2-noanimation',
                  backdrop: 'swal2-noanimation'
                },
                hideClass: {
                  popup: '',
                  backdrop: ''
            }, preConfirm: () => {
            axios.put(`/api/clients/current/cards`, `id=${id}`)
                .then(() => {
                    Swal.fire({
                        icon: 'success',
                        text: 'Successfully delet card',
                        showConfirmButton: false,
                        timer: 2000,
                    })
                    location.pathname = `/web/assets/pages/cards.html`;
                })
                .catch(error => {
                    Swal.fire({
                      icon: 'error',
                      text: error.response.data,
                      confirmButtonColor: "#7c601893",
                    });
            });
            },
        })
        },

        formatNumber(number) {
            return number.toLocaleString("De-DE", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });
        },
        createCreditCards(){
            return this.cards.filter(card => card.type == "CREDIT" && card.active)
        },
        createDebitCards(){
            return this.cards.filter(card => card.type == "DEBIT" && card.active)
        }
    }
},
);
app.mount('#app');