
import Home from '@/pages/home/home'

module.exports = {
    routes: [
        {path: '/', redirect: '/home'},
        {path: '/home', name: 'home', component: Home},
    ]
}