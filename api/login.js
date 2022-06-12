import { post } from '@/plugins/request';

export function login(data) {
    return post('/users/login', data)
}

export function register(data) {
    return post('/users', data)
}