import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, registerUser, aboutUser } from "@/enteties/user/index.js";
import { useNavigate } from "react-router-dom";

export const useAuthForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [authType, setAuthType] = useState("login");
    const [agreeToPolicy, setAgreeToPolicy] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePhone = (phone) => /^\+7\d{10}$/.test(phone);

    useEffect(() => {
        if (authType === "registration" && formData.confirmPassword) {
            setErrors((prev) => ({
                ...prev,
                confirmPassword:
                    formData.password !== formData.confirmPassword ? "Пароли не совпадают" : "",
            }));
        }
    }, [formData.password, formData.confirmPassword, authType]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validateField = (name, value) => {
        switch (name) {
            case "name":
                return value.trim() === "" ? "Имя обязательно" : "";
            case "phone":
                return !validatePhone(value) ? "Некорректный телефон" : "";
            case "email":
                return !validateEmail(value) ? "Некорректный email" : "";
            case "password":
                return value.length < 8 ? "Минимум 8 символов" : "";
            case "confirmPassword":
                return formData.password !== value ? "Пароли не совпадают" : "";
            default:
                return "";
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (authType === "registration") {
            newErrors.name = validateField("name", formData.name);
            newErrors.phone = validateField("phone", formData.phone);
            newErrors.confirmPassword = validateField("confirmPassword", formData.confirmPassword);

            if (!agreeToPolicy) {
                newErrors.agreeToPolicy = "Необходимо согласие";
            }
        }

        newErrors.email = validateField("email", formData.email);
        newErrors.password = validateField("password", formData.password);

        setErrors(newErrors);
        return Object.values(newErrors).every((error) => !error);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsLoading(true);

        const payload =
            authType === "login"
                ? { email: formData.email, password: formData.password, rememberMe }
                : {
                    username: formData.name,
                    phone: formData.phone,
                    email: formData.email,
                    password: formData.password,
                };

        try {
            const action = authType === "login" ? loginUser : registerUser;
            const response = await dispatch(action(payload));

            if (response.meta.requestStatus === "fulfilled") {
                if (authType === "login") {
                    await dispatch(aboutUser());
                    navigate("../");
                } else {
                    setAuthType("login");
                }
            }
        } finally {
            setIsLoading(false);
        }
    };

    const isFormValid = () => {
        if (authType === "login") {
            return validateEmail(formData.email) && formData.password.length >= 8;
        }
        return (
            formData.name.trim() &&
            validatePhone(formData.phone) &&
            validateEmail(formData.email) &&
            formData.password.length >= 8 &&
            formData.password === formData.confirmPassword &&
            agreeToPolicy
        );
    };

    return {
        authType,
        isLoading,
        formData,
        errors,
        agreeToPolicy,
        rememberMe,
        handleInputChange,
        handleBlur,
        handleSubmit,
        setAgreeToPolicy,
        setRememberMe,
        setAuthType,
        isFormValid,
    };
};
