import { createContext, useContext, useState, useEffect } from "react";
import { getSavedPosts } from "../lib/appwrite";
import { useGlobalContext } from "./GlobalContextProvider";

const SavedVideosContext = createContext();

export const useSavedVideosContext = () => {
  return useContext(SavedVideosContext);
};

const SavedVideosContextProvider = ({ children }) => {
  const { user } = useGlobalContext();
  const [savedVideos, setSavedVideos] = useState([]);

  const fetchSavedVideos = async () => {
    if (user?.$id) {
      try {
        const videos = await getSavedPosts(user.$id);
        setSavedVideos(videos);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const refreshSavedVideos = () => fetchSavedVideos();

  useEffect(() => {
    fetchSavedVideos();
  }, [user]);

  return (
    <SavedVideosContext.Provider value={{ savedVideos, refreshSavedVideos }}>
      {children}
    </SavedVideosContext.Provider>
  );
};

export default SavedVideosContextProvider;
