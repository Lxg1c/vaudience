import { useDropdownContext } from "@/shared/ui/Dropdown/DropdownContext.js";
import PropTypes from "prop-types";
import "./DropdownItem.scss"

const DropdownItem = ({ children, as: Component = "li", ...props }) => {
    const { close } = useDropdownContext();

    const handleClick = (e) => {
        props.onClick(e);
        close();
    };

    return (
        <Component {...props} className="dropdown__list-item" onClick={handleClick}>
            {children}
        </Component>
    );
};

DropdownItem.propTypes = {
    children: PropTypes.node.isRequired,
    as: PropTypes.elementType,
    onClick: PropTypes.func
};

export default DropdownItem;
