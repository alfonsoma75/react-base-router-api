export const API_URL = 'http://localhost:8000'

const API_VERSION = '/api/v1'
const API_BASE = `${API_URL}${API_VERSION}`

// Login y gestion de token
const API_ACCOUNT = `${API_BASE}/account`

export const API_LOGIN = `${API_ACCOUNT}/token`
export const API_CHECK_TOKEN = `${API_LOGIN}/verify`
export const API_REFRESH_TOKEN = `${API_LOGIN}/refresh`