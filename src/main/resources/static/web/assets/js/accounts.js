const app = Vue.createApp({
    data() {
        return {
            client: {},
            accounts: {},
        };
    },

    created() {
        axios.get("/api/clients/1")
            .then(response => {
                this.client = response.data;
                this.accounts = this.client.accounts;
            })
            .catch(error => {
                console.log(error);
            });
    },

    methods: {
        formatNumber(number) {
            return number.toLocaleString("De-DE", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });
        }
    }
},
);
app.mount('#app');