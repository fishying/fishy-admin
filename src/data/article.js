import axios from './index'
export function index (page, limit) {
    return new Promise((resolve, reject) => {
        axios.get('/api/admin/article', {
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
        axios.get(`/api/admin/article/slug/${slug}`, {
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

export function update (id, data) {
    return new Promise((resolve, reject) => {
        axios.put('/api/article', {
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

export function add (data) {
    return new Promise((resolve, reject) => {
        axios.post('/api/article', {
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