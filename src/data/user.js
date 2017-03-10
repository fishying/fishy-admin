import axios from './index'

export function view () {
    return new Promise((resolve, reject) => {
        axios.get('/api/user')
            .then(data => {
                resolve(data.data)
            })
            .catch(e => {
                reject(e)
            })
    })
}

export function update (data) {
    return new Promise((resolve, reject) => {
        axios.put('/api/user', {
            data: data
        })
            .then(data => {
                resolve(data.data)
            })
            .catch(e => {
                reject(e)
            })
    })
}