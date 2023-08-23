import * as yup from "yup";


const LoginValidation = yup.object().shape({
    email: yup.string().email().required("L'adresse e-mail est requise").trim(),
    password: yup.string().required("Le mot de passe est requis").min(6, "Le mot de passe doit comporter au moins 6 caractères").max(20, "Le mot de passe doit comporter moins de 20 caractères").matches(/(?=.*[0-9])/, "Le mot de passe doit contenir un chiffre")
});


const RegisterValidation = yup.object().shape({
    email: yup.string().email().required("L'adresse e-mail est requise").trim(),
    password: yup.string().required("Le mot de passe est requis").min(6, "Le mot de passe doit comporter au moins 6 caractères").max(20, "Le mot de passe doit comporter moins de 20 caractères").matches(/(?=.*[0-9])/, "Le mot de passe doit contenir un chiffre"),
    fullName: yup.string().required("Le nom complet est requis").max(20, "Le nom complet doit comporter moins de 20 caractères").matches(/^[a-zA-Z]+$/, "Le nom complet ne doit contenir que des lettres")
});

const ProfileValidation = yup.object().shape({
    fullName: yup.string().required("Le nom complet est requis").max(20, "Le nom complet doit comporter moins de 20 caractères").matches(/^[a-zA-Z]+$/, "Le nom complet ne doit contenir que des lettres"),
    email: yup.string().email().required("L'adresse e-mail est requise").trim(),
});

const PasswordValidation = yup.object().shape({
    oldPassword: yup.string().required("Le mot de passe est requis").min(6, "Le mot de passe doit comporter au moins 6 caractères").max(20, "Le mot de passe doit comporter moins de 20 caractères").matches(/(?=.*[0-9])/, "Le mot de passe doit contenir un chiffre"),
    newPassword: yup.string().required("Le mot de passe est requis").min(6, "Le mot de passe doit comporter au moins 6 caractères").max(20, "Le mot de passe doit comporter moins de 20 caractères").matches(/(?=.*[0-9])/, "Le mot de passe doit contenir un chiffre"),
    confirmPassword: yup.string().required("Le mot de passe est requis").min(6, "Le mot de passe doit comporter au moins 6 caractères").max(20, "Le mot de passe doit comporter moins de 20 caractères").matches(/(?=.*[0-9])/, "Le mot de passe doit contenir un chiffre").oneOf([yup.ref("newPassword"), null], "Les mots de passe doivent correspondre"),
});


export {LoginValidation, RegisterValidation,ProfileValidation, PasswordValidation };