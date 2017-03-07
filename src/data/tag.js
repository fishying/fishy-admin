import axios from 'axios'

export function index (page, limit) {
    return new Promise((resolve, reject) => {
        axios.get('/api/tag', {
            params: {
                page: page,
                limit: limit
            }
        })
            .then(data => {
                resolve(data.data)
            })
            .catch(e => {
                reject(e)
            })
    })
}
export function article (page, limit) {
    return new Promise((resolve, reject) => {
        axios.get('/api/tag', {
            params: {
                page: page,
                limit: limit
            }
        })
            .then(data => {
                resolve(data.data)
            })
            .catch(e => {
                reject(e)
            })
    })
}