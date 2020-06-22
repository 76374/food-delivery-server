import type { Request } from 'express';

export const getToken = (request: Request) => {
    const value = request.get('Authorization');
    if (value) {
        const parts = value.split(' ');
        if (parts.length > 1) {
            return parts[1];
        }
    }
    return null;
}