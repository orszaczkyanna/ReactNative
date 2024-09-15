import GlobalContextProvider from "./GlobalContextProvider";
import SavedVideosContextProvider from "./SavedVideosContextProvider";

const ContextProviders = ({ children }) => {
  return (
    <GlobalContextProvider>
      <SavedVideosContextProvider>
        {children}
      </SavedVideosContextProvider>
    </GlobalContextProvider>
  );
};

export default ContextProviders;
