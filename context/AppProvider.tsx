'use client';
import { fetchAccountProfile } from "@/store/actions/userActions";
import { useSession } from "next-auth/react";
import { useState, useContext, createContext, useEffect } from "react";
import { useDispatch } from "react-redux";


type AlertType = {
  live:     boolean;
  status:   'default'|'warning'|'error'|'success';
  title:    string;
  msg:      string;
}

// Create the context with a default value
const AppContext = createContext({
  cartDrawerOpen: false,
  modalOpen: false,
  appAlert: {}, 
  setAppAlert:  {},
  loading:true,
  toggleLoading:()=>{},
  toggleCartDrawer: () => {},
  toggleModal: () => {},
});



// Create a provider component
export const AppProvider = ({ children }) => {
  const dispatch = useDispatch()
  const { data: session, status } = useSession()
  const id = session?.user?.id
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [appAlert, setAppAlert] = useState<AlertType>({
      live:false,
      title:'default',
      status:'default',
      msg:'default',
  });

  useEffect(() => {
    if (!id ) return undefined
    dispatch(fetchAccountProfile(id))
  }, [dispatch, id ])
  
  const toggleLoading = () => {
    setCartDrawerOpen((prev) => {
      console.log("Cart Drawer toggled:", !prev);
      return !prev;
    });
  };

  // Toggle functions for better state management
  const toggleCartDrawer = () => {
    setCartDrawerOpen((prev) => {
      console.log("Cart Drawer toggled:", !prev);
      return !prev;
    });
  };

  const toggleModal = () => {
    setModalOpen((prev) => {
      console.log("Modal toggled:", !prev);
      return !prev;
    });
  };

  return (
    <AppContext.Provider value={{ cartDrawerOpen, modalOpen, appAlert, loading,   toggleLoading,  setAppAlert,  toggleCartDrawer, toggleModal }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for easy access
export const useAppContext = () => useContext(AppContext);
