import axios from 'axios'
import { Notification } from 'components'
axios.defaults.validateStatus = function () {
    return true
}
axios.interceptors.response.use(function (config) {
    if (config.status >= 400 && config.status !== 404) {
        return Promise.reject(config.data)
    } else if (config.status === 404) {
        Notification.error('获取数据失败，请刷新重试！')
    } else if (config.status === 401) {
        location.href = '/'
    } else {
        return config
    }
    return config
}, function (e) {
    return Promise.reject(e)
})

export default axios