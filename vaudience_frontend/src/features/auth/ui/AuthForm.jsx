import PropTypes from "prop-types";
import Input from "@/shared/ui/Input/Input.jsx";
import Button from "@/shared/ui/Button/Button.jsx";
import Checkbox from "@/shared/ui/Checkbox/Checkbox.jsx";
import { motion } from "framer-motion";

export const AuthForm = ({
                             authType,
                             formData,
                             onChange,
                             onBlur,
                             errors,
                             agreeToPolicy,
                             rememberMe,
                             setAgreeToPolicy,
                             setRememberMe,
                             isFormValid,
                             onSubmit,
                         }) => (
    <form onSubmit={onSubmit} className="auth-form">
        <div className="form-fields">
            {authType === "registration" && (
                <>
                    <InputField
                        label="Имя"
                        name="name"
                        value={formData.name}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder="Введите ваше имя"
                        error={errors.name}
                    />
                    <InputField
                        label="Телефон"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder="+7 (999) 999-99-99"
                        error={errors.phone}
                    />
                </>
            )}

            <InputField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={onChange}
                onBlur={onBlur}
                placeholder="example@gmail.com"
                error={errors.email}
            />

            <InputField
                label="Пароль"
                name="password"
                type="password"
                value={formData.password}
                onChange={onChange}
                onBlur={onBlur}
                placeholder="Минимум 8 символов"
                error={errors.password}
            />

            {authType === "registration" && (
                <InputField
                    label="Повторите пароль"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder="Повторите пароль"
                    error={errors.confirmPassword}
                />
            )}
        </div>

        <motion.div
            className="form-agreement"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            {authType === "registration" ? (
                <>
                    <Checkbox
                        id="policy-agreement"
                        checked={agreeToPolicy}
                        onChange={(e) => setAgreeToPolicy(e.target.checked)}
                    />
                    <label htmlFor="policy-agreement" className="agreement-text">
                        Я согласен с <a href="#">политикой конфиденциальности</a> и на обработку персональных данных
                    </label>
                    {errors.agreeToPolicy && <p className="error">{errors.agreeToPolicy}</p>}
                </>
            ) : (
                <>
                    <Checkbox
                        id="remember-me"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label htmlFor="remember-me" className="agreement-text">
                        Запомнить меня
                    </label>
                </>
            )}
        </motion.div>

        <motion.div whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.02 }}>
            <Button
                type="submit"
                text={authType === "login" ? "Войти" : "Зарегистрироваться"}
                disabled={!isFormValid()}
            />
        </motion.div>

        {authType === "login" && (
            <div className="forgot__password-container">
                <a className="forgot__password-container--link btn-reset" href="#">
                    Забыли пароль?
                </a>
            </div>
        )}
    </form>
);

AuthForm.propTypes = {
    authType: PropTypes.oneOf(["login", "registration"]).isRequired,
    formData: PropTypes.shape({
        name: PropTypes.string,
        phone: PropTypes.string,
        email: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        confirmPassword: PropTypes.string,
    }).isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    agreeToPolicy: PropTypes.bool,
    rememberMe: PropTypes.bool,
    setAgreeToPolicy: PropTypes.func,
    setRememberMe: PropTypes.func,
    isFormValid: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

const InputField = ({ label, name, ...rest }) => (
    <div className={`form__field-${name}`}>
        <label>
            {label}<span>*</span>
        </label>
        <Input name={name} {...rest} />
    </div>
);

InputField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};
