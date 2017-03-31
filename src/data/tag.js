import axios from './index'
export function GetAll (page, limit) {
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

export function Get (id) {
    return new Promise((resolve, reject) => {
        axios.get(`/api/tag/${id}`)
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
        axios.put('/api/tag', {
            id: id,
            data: data
        })
            .then(res => {
                resolve(res.data)
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

export function del (id) {
    return new Promise((resolve, reject) => {
        axios.delete('/api/tag', {
            data: {
                id: id
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