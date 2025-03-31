import { Client } from 'appwrite';
const client = new Client();
client
.setEndpoint('https://localhost/v1') // Your API Endpoint
.setProject('67c0291a000b54c261f8'); // Your project ID
export const account = new Account(client);
