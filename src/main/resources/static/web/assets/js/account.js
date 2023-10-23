const app = Vue.createApp({
    data() {
        return {
            client: {},
            account: {},
            transactions: {},
        };
    },

    created() {
        let urlParams = new URLSearchParams(location.search);
        let id = urlParams.get('id')
        axios.get(`/api/accounts/${id}`)
            .then(response => {
                this.account = response.data;
                this.transactions = this.account.transactions
                this.transactions.sort((a, b) => b.id - a.id);
            })
            .catch(error => {
                console.log(error);
            });
        
        axios.get("/api/clients/1")
            .then(response => {
                this.client = response.data;
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
                    location.href = `http://localhost:8080/index.html`;
                })
                .catch(error => {
                    console.log(error);
                });
        },

        formatNumber(number) {
            return number.toLocaleString("De-DE", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });
        },
}   

},
);
app.mount('#app');