import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.jsm.aora-tutorial",
  projectId: "66d686d30019d3a1745d",
  databaseId: "66d68b9e001d2c08b5d4",
  userCollectionId: "66d68c42000fa0c5d8f8",
  videoCollectionId: "66d68c87002c26a1b3ad",
  storageId: "66d69260001a98347ab2",
};

// Destructuring
const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId,
} = appwriteConfig;

const client = new Client();
client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register user
export const createUser = async (email, password, username) => {
  try {
    // await signOut();

    // ---- account.create: Létrehoz egy új felhasználói fiókot az e-mail, jelszó és felhasználónév alapján.
    const newAccount = await account.create(
      ID.unique(), // create a new unique ID
      email,
      password,
      username
    );

    if (!newAccount) throw new Error("Account creation failed");

    // ---- avatars.getInitials: Létrehoz egy avatárt a felhasználónév kezdőbetűiből.
    const avatarUrl = avatars.getInitials(username);

    // ---- signIn: Automatikusan bejelentkezteti a felhasználót a regisztráció után.
    await signIn(email, password);

    // ---- databases.createDocument: Elmenti az új felhasználó adatait az adatbázisban.
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      { accountId: newAccount.$id, email, username, avatar: avatarUrl }
      // $ Appwrite szintaxis: beépített mező
    );

    console.log("User created successfully");
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

// Sign In
export const signIn = async (email, password) => {
  try {
    // await signOut();
    // await account.deleteSessions();

    // ---- account.createEmailPasswordSession: Létrehoz egy új munkamenetet a felhasználó számára.
    const session = await account.createEmailPasswordSession(email, password);
    console.log("User signed in successfully");
    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

// Get Current User
export const getCurrentUser = async () => {
  try {
    // ---- account.get: Lekéri az aktuális felhasználói fiók adatait.
    const currentAccount = await account.get();

    if (!currentAccount) throw new Error("No current account found");

    // ---- databases.listDocuments: Lekéri az adatbázisból a felhasználóhoz tartozó adatokat.
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw new Error("No current user found");

    // ---- Visszaadja az első dokumentumot, ami az aktuális felhasználóhoz tartozik.
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};

// Sign Out
export const signOut = async () => {
  try {
    // ---- account.deleteSession("current"): Törli az aktuális munkamenetet.
    const session = await account.deleteSession("current");
    console.log("User signed out successfully");
    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

// Get all video Posts
export const getAllPosts = async () => {
  try {
    // ---- databases.listDocuments: Lekéri a videó posztokat tartalmazó gyűjtemény összes dokumentumát, és visszaadja azokat.
    const posts = await databases.listDocuments(databaseId, videoCollectionId);
    return posts.documents;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

// Get latest created video posts
export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId, [
      Query.orderDesc("$createdAt"),
      Query.limit(7),
    ]);
    return posts.documents;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

// Get video posts that matches search query
export const searchPosts = async (query) => {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId, [
      // ---- Query.search("title", query): A "title" mezőben keres a megadott "query" kifejezésre
      Query.search("title", query),
    ]);

    return posts.documents;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
