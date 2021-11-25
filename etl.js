/* eslint-disable prettier/prettier */
import { post } from 'axios';

(async () => {
    const {data} = await post('http://localhost:3000/auth/login', {
        email: 'test@example.com',
        password: 'azerty1233',
    });

    console.log(data);
})