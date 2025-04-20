import { motion } from "framer-motion";
import PropTypes from "prop-types";

export const AuthTabs = ({ authType, setAuthType }) => (
    <div className="auth-tabs">
        {["login", "registration"].map((type) => (
            <motion.button
                key={type}
                className={`auth-tab ${authType === type ? "active" : ""}`}
                onClick={() => setAuthType(type)}
            >
                {type === "login" ? "Авторизация" : "Регистрация"}
                {authType === type && (
                    <motion.div
                        className="underline"
                        layoutId="underline"
                        transition={{ duration: 0.3 }}
                    />
                )}
            </motion.button>
        ))}
    </div>
);

AuthTabs.propTypes = {
    authType: PropTypes.oneOf(["login", "registration"]).isRequired,
    setAuthType: PropTypes.func.isRequired,
};
