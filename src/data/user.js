import axios from './index'

export function Get () {
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

export function Put (data) {
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