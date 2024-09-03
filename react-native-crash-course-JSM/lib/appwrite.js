import { Client, Account, ID } from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.jsm.aora-tutorial",
  projectId: "66d686d30019d3a1745d",
  databaseId: "66d68b9e001d2c08b5d4",
  userCollectionId: "66d68c42000fa0c5d8f8",
  videoCollectionId: "66d68c87002c26a1b3ad",
  storageId: "66d69260001a98347ab2",
};

const client = new Client();
client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);

// Register user
export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw new Error("Account creation failed");
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

// -------- Copied from https://appwrite.io/docs/quick-starts/react-native --------
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
// import { Client, Account, ID } from 'react-native-appwrite';
// import React, { useState } from 'react';

// let client;
// let account;

// client = new Client();
// client
//   .setEndpoint('https://cloud.appwrite.io/v1')
//   .setProject('sisyphus')
//   .setPlatform('com.example.my-app');

// account = new Account(client);
// export default function App() {
//   const [loggedInUser, setLoggedInUser] = useState(null);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');

//   async function login(email, password) {
//     await account.createEmailPasswordSession(email, password);
//     setLoggedInUser(await account.get());
//   }

//   async function register(email, password, name) {
//     await account.create(ID.unique(), email, password, name);
//     await login(email, password);
//     setLoggedInUser(await account.get());
//   }
//   return (
//     // ... Implement your UI here
//   );
// }

// const styles = StyleSheet.create({
//     // ... define some tyles
// });
