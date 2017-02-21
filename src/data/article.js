import axios from 'axios'

export function index (page, limit) {
    return new Promise((resolve, reject) => {
        axios.get('/api/article', {
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

export function article (slug, page, limit) {
    return new Promise((resolve, reject) => {
        axios.get(`/api/article/slug/${slug}`, {
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