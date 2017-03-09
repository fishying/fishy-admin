import axios from './index'

export function all () {
    return new Promise((resolve, reject) => {
        axios.get('/api/setting')
            .then(data => {
                resolve(data.data)
            })
            .catch(e => {
                reject(e)
            })
    })
}

export function update (id, data) {
    return new Promise((resolve, reject) => {
        axios.put('/api/setting', {
            id: id,
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