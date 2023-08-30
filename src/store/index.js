import { createStore } from 'vuex'
export default createStore ( {
    state: {
        count: 0
    },
    mutations: {
        increase(state,count) {
            state.count += count
        }
    }
})