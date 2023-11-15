const app = Vue.createApp({
    data() {
        return {
            client: {},
            accounts: {},
            accountsActives: {},
            loans: {},
        };
    },

    created() {
        axios.get("/api/clients/current")
            .then(response => {
                this.client = response.data;
                this.accounts = this.client.accounts;
                this.accountsActives = this.filterAccountsActives()
                console.log(this.accountsActives);
                this.loans = this.client.loans
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
                    location.pathname = `/index.html`;
                })
                .catch(error => {
                    console.log(error);
                });
        },

        createNewAccount() {
            Swal.fire({
                title: 'Do you want to create a new account?',
                text: 'Remember that you can only have 3 accounts',
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
            axios.post(`/api/clients/current/accounts`)
                .then(() => {
                    Swal.fire({
                        title: "Successfully created account",
                        icon: "success",
                        confirmButtonColor: "#3085d6",
                      }).then((result) => {
                        if (result.isConfirmed) {
                            location.pathname = `/web/accounts.html`;
                        }
                      });   
                    
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

    deleteAccount(id) {
        Swal.fire({
            title: 'Do you want to delete account?',
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
        axios.put(`/api/clients/current/accounts`, `id=${id}`)
            .then(() => {
                Swal.fire({
                    title: "Successfully created account",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                  }).then((result) => {
                    if (result.isConfirmed) {
                        location.pathname = `/web/accounts.html`;
                    }
                  });    
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
    filterAccountsActives(){
     return this.accounts.filter(accounts => accounts.active)
    },


        formatNumber(number) {
            return number.toLocaleString("De-DE", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });
        },

        dateFormat(date) {
            return moment(date).format('lll');
        }
    }
},
);
app.mount('#app');