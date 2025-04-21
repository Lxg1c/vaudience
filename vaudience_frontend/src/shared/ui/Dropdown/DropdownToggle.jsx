import {useDropdownContext} from "@/shared/ui/Dropdown/DropdownContext.js";
import PropTypes from "prop-types";

const DropdownToggle = ({children}) => {
    const { toggle } = useDropdownContext();
    return(
        <button className='btn-reset' onClick={toggle}>
            {children}
        </button>
    )
}

DropdownToggle.propTypes = {
    children: PropTypes.node.isRequired,
}

export default DropdownToggle;