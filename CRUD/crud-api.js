const {Createapp} = Vue

const app = Createapp({
    data() {
        return {
            users: [],
            user: { id: '', name: '', email: '', phone: '' },
            edit: false
        }
    },
    created() {
        this.getUsers()
    },
    methods: {
        getUsers() {
            fetch('http://localhost:3000/users')
                .then(res => res.json())
                .then(data => { this.users = data }
                )
        },
        deleteUser(id) {
            fetch(`http://localhost:3000/users/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    this.getUsers()
                })
        },
        addUser() {
            fetch('http://localhost:3000/users', {
                method: 'POST',
                body: JSON.stringify(this.user),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => { this.getUsers() })
        },
        editUser(user) {
            this.edit = true
            this.user.id = user.id
            this.user.name = user.name
            this.user.email = user.email
            this.user.phone = user.phone
        },
        updateUser() {
            fetch(`http://localhost:3000/users/${this.user.id}`, {
                method: 'PUT',
                body: JSON.stringify(this.user),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => { this.getUsers() })
        }
    }
})