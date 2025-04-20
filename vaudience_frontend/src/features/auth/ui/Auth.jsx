import { useAuthForm } from "../model/useAuthForm";
import { AuthForm } from "./AuthForm";
import { AuthTabs } from "./AuthTabs";
import Loader from "@/shared/ui/Loader/Loader.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./Auth.scss";

const Auth = () => {
    const {
        authType,
        isLoading,
        handleSubmit,
        formData,
        handleInputChange,
        handleBlur,
        errors,
        agreeToPolicy,
        rememberMe,
        setAgreeToPolicy,
        setRememberMe,
        setAuthType,
        isFormValid,
    } = useAuthForm();

    return (
        <div className="auth__container" style={{ position: "relative" }}>
            {isLoading && (
                <div className="loading-overlay">
                    <Loader />
                </div>
            )}

            <motion.section
                className="auth__section"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
            >
                <AuthTabs authType={authType} setAuthType={setAuthType} />

                <AnimatePresence mode="wait">
                    <motion.div
                        key={authType}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.3 }}
                    >
                        <AuthForm
                            authType={authType}
                            formData={formData}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            errors={errors}
                            agreeToPolicy={agreeToPolicy}
                            rememberMe={rememberMe}
                            setAgreeToPolicy={setAgreeToPolicy}
                            setRememberMe={setRememberMe}
                            isFormValid={isFormValid}
                            onSubmit={handleSubmit}
                        />
                    </motion.div>
                </AnimatePresence>
            </motion.section>
        </div>
    );
};

export default Auth;
