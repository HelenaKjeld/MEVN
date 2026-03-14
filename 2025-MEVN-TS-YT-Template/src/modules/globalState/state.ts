import { reactive, watch } from 'vue'

const isLoggedInFromStorage = localStorage.getItem('isLoggedIn') === 'true'

export const state = reactive({
  isLoggedIn: isLoggedInFromStorage
})

watch(() => state.isLoggedIn, (newValue) => {
    localStorage.setItem('isLoggedIn', String(newValue))
})
