import { useState, useContext, createContext } from 'react'


const AppContext = createContext();

const AppProvider = ({children}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openSidebar = () => {
        setIsSidebarOpen(true);
    }

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    }

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const value = {
        isModalOpen,
        isSidebarOpen,
        openModal,
        openSidebar,
        closeModal,
        closeSidebar
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

// custom hook

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppContext, AppProvider};