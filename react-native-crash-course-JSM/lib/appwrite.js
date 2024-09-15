import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
  Storage,
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
const storage = new Storage(client);

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
    const posts = await databases.listDocuments(databaseId, videoCollectionId, [
      Query.orderDesc("$createdAt"),
    ]);
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

// Get video posts created by user
export const getUserPosts = async (userId) => {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId, [
      Query.equal("creator", userId),
      Query.orderDesc("$createdAt"),
    ]);
    return posts.documents;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

// Get File Preview
export const getFilePreview = async (fileId, type) => {
  let fileUrl;

  try {
    switch (type) {
      case "video":
        // ---- storage.getFileView: olyan URL-t ad vissza, amely közvetlenül megjeleníti a fájl tartalmát a böngészőben
        // Létrehoz egy linket, ahol a videófájl megnyitható és lejátszható.
        fileUrl = storage.getFileView(storageId, fileId);
        break;
      case "image":
        // ---- storage.getFilePreview: Létrehoz egy URL-t a képfájl előnézetének a megadott paraméterek alapján
        // A getFileView-val ellentétben lehetőséget ad arra, hogy vágás, méretezés, és egyéb beállítások alapján módosítsuk az előnézeti képet.
        fileUrl = storage.getFilePreview(
          storageId,
          fileId,
          2000, // szélesség
          2000, // magasság
          "top", // gravity=vágási opció: átméretezés vagy vágás után a kép felső része legyen megtartva
          100 // minőség százalékban
        );
        break;
      default:
        console.log(`Invalid file type: ${type}`);
        break;
    }

    if (!fileUrl) {
      console.log("Invalid file url");
      throw new Error("Invalid file url");
    }

    // Visszaadja a fájl URL-jét
    return fileUrl;
  } catch (error) {
    console.log(`Error during creating preview: ${error}`);
    throw new Error(error);
  }
};

// Upload File
export const uploadFile = async (file, type) => {
  if (!file) return; // Ha nincs fájl, kilép a függvényből

  // // ----- ImagePicker version -----
  // const asset = {
  //   name: file.fileName,
  //   type: file.mimeType, // mime type e.g. image/jpeg
  //   size: file.fileSize,
  //   uri: file.uri,
  // };

  // ----- DocumentPicker version -----
  const { mimeType, ...rest } = file; // MIME típust külön választja, a maradék adatot változatlanul hagyja (...rest: naming convention)
  const asset = { type: mimeType, ...rest }; // rename mimeType to type for Appwrite

  try {
    // storage.createFile: Feltölti a fájlt a megadott Appwrite tárhelyre, egyedi azonosítót generálva neki.
    const uploadedFile = await storage.createFile(
      storageId, // a tároló azonosítója
      ID.unique(), // egyedi fájlazonosító létrehozása
      asset // a feltöltendő fájl adatai
    );

    // Lekéri az előnézet URL-jét a feltöltött fájlhoz a típusa alapján
    const fileUrl = await getFilePreview(uploadedFile.$id, type);

    // Visszaadja a fájl URL-jét
    return fileUrl;
  } catch (error) {
    console.log(`Error during file upload: ${error}`);
    throw new Error(error);
  }
};

// Create Video Post
export const createVideo = async (form) => {
  try {
    // ---- Promise.all: lehetővé teszi több Promise (aszinron művelet (objektum)) párhuzamos végrehajtását, majd egyszerre várja meg mindegyik eredményét
    // A Promise-okat tömbben kell megadni
    // Egyszerre tölti fel a videót és a hozzá tartozó thumbnailt
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video"),
    ]);

    // ---- databases.createDocument: Új videó bejegyzést hoz létre az adatbázisban a megadott adatokkal
    const newPost = await databases.createDocument(
      databaseId,
      videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId,
      }
    );

    // Visszaadja az új bejegyzést
    return newPost;
  } catch (error) {
    console.log(`Error during creating video: ${error}`);
    throw new Error(error);
  }
};

// Get saved videos by user
export const getSavedPosts = async (userId) => {
  try {
    // Összes videó lekérdezése
    const posts = await databases.listDocuments(databaseId, videoCollectionId, [
      Query.orderDesc("$createdAt"),
    ]);

    // Szűri azokat, ahol a userId benne van a saved_by mezőjében (azon belül user.$id)
    const savedPosts = posts.documents.filter((video) =>
      video.saved_by?.some((user) => user.$id === userId)
    );

    // Visszaadja a felhasználó által mentett videókat
    return savedPosts;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

// Save videos
export const savePost = async (userId, videoId) => {
  try {
    // Kiválasztott videó aktuális állapota
    const video = await databases.getDocument(
      databaseId,
      videoCollectionId,
      videoId
    );

    // Ha még senki nem mentette a videót, undefined vagy null helyett üres tömböt használjon, hogy ne lépjen fel hiba a spread operátor használatánál
    const savedBy = video.saved_by || [];

    // Ha már mentette a felhasználó, akkor ne változzon a tömb
    // különben hozzáadjuk a userId-t a 'saved_by' mezőhöz.
    const updatedSavedBy = savedBy.includes(userId)
      ? savedBy
      : [...savedBy, userId];

    // Frissíti a videó dokumentumot az új 'saved_by' értékkel
    const updatedVideo = await databases.updateDocument(
      databaseId,
      videoCollectionId,
      videoId,
      { saved_by: updatedSavedBy }
    );

    // Visszaadja a frissített videót
    return updatedVideo;
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to save video.\n${error}`);
  }
};

// Remove saved videos
export const removeSavedPost = async (userId, videoId) => {
  try {
    // Lekéri a videó dokumentumot az azonosító alapján
    const video = await databases.getDocument(
      databaseId,
      videoCollectionId,
      videoId
    );

    // Eltávolítja a felhasználó azonosítóját a 'saved_by' mezőből
    // szűrés a nem egyező userId-k alapján
    const updatedSavedBy =
      video.saved_by?.filter((user) => user.$id !== userId) || [];

    // Frissíti a videó dokumentumot az új 'saved_by' értékkel
    const updatedVideo = await databases.updateDocument(
      databaseId,
      videoCollectionId,
      videoId,
      { saved_by: updatedSavedBy }
    );

    // Visszaadja a frissített videót
    return updatedVideo;
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to remove saved video.\n${error}`);
  }
};
