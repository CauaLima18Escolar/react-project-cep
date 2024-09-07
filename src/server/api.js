import axios from 'axios'

export const CEP_API = axios.create({
    baseURL: 'https://viacep.com.br/ws/'
});