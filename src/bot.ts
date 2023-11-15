import client from './client'
import { token } from '../config.json';

client.login(token);
console.log(client);