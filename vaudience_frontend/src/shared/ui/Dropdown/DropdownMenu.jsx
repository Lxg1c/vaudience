import {useDropdownContext} from "@/shared/ui/Dropdown/DropdownContext.js";
import PropTypes from "prop-types";
import "./DropdownMenu.scss"

const DropdownMenu = ({ children }) => {
    const { isOpen } = useDropdownContext()

    if (!isOpen) return null

    return(
        <ul className="dropdown__menu">{children}</ul>
    )
}

DropdownMenu.propTypes = {
    children: PropTypes.node.isRequired,
}

export default DropdownMenu;