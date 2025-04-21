import "./Dropdown.scss"
import PropTypes from "prop-types";
import { useState } from "react";
import { DropdownContext } from "@/shared/ui/Dropdown/DropdownContext.js";

const Dropdown = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    const close = () => setIsOpen(false);

    return (
        <DropdownContext.Provider value={{ isOpen, setIsOpen, close, toggle }}>
            <div className="dropdown">
                {children}
            </div>
        </DropdownContext.Provider>
    );
};

Dropdown.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Dropdown;
