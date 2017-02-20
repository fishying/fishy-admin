import axios from 'axios'

export default {
    index (page, limit) {
        axios.get('/api/article')
            .then(date => {
                Promise.resolve(data.data)
            })
    }
}