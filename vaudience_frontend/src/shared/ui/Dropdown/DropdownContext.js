import {useContext, createContext} from "react";

export const DropdownContext = createContext();
export const useDropdownContext = () => useContext(DropdownContext);