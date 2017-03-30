import axios from './index'
export function GetAll (page, limit) {
    return new Promise((resolve, reject) => {
        axios.post('/api/admin/article', {
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

export function Get (id, page, limit) {
    return new Promise((resolve, reject) => {
        axios.post(`/api/admin/article/${id}`, {
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

export function Put (id, data) {
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

export function Add (data) {
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

export function Del (id) {
    return new Promise((resolve, reject) => {
        axios.delete('/api/article', {
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