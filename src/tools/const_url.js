export  const URL='http://127.0.0.1:8000'

export  const  TOKEN = 'crm_token'

const AuthStr = 'TOKEN ' + localStorage.getItem(TOKEN);
export const options = {
    headers: { Authorization: AuthStr }
}