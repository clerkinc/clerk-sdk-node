import { ClerkServerSDK } from 'clerk_server_sdk_node';
import dotenv from 'dotenv';

dotenv.config();

const accessToken = process.env.ACCESS_TOKEN;
const userId = process.env.USER_ID;
const userIdToDelete = process.env.USER_ID_TO_DELETE;

const sdk = new ClerkServerSDK(accessToken);

console.log('Get user list');
let users = await sdk.userApi.getUserList();
console.log(JSON.stringify(users));

console.log('Get single user');
let user = await sdk.userApi.getUser(userId);
console.log(JSON.stringify(user));

console.log('Update user');
let updatedUser = await sdk.userApi.updateUser(userId, { firstName: 'Kyle', lastName: 'Reese' });
// let updatedUser = await sdk.userApi.updateUser(userId, { firstName: 'John', lastName: 'Connor' });
// let updatedUser = await sdk.userApi.updateUser(userId, { firstName: 'Peter', lastName: 'Silberman' });
console.log(JSON.stringify(updatedUser));

console.log('Delete user');
let deletedUser = await sdk.userApi.deleteUser(userIdToDelete);
console.log(JSON.stringify(deletedUser));