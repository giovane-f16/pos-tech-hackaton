class AuthProvider {
    public validadePassword(password: string, confirmPassword: string): boolean | string {
        if (password !== confirmPassword) {
            return "As senhas não coincidem.";
        }

        const minLength = 8;
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (password.length < minLength) {
            return `A senha precisa ter ao menos ${minLength} caracteres.`;
        }

        if (!specialCharRegex.test(password)) {
            return "A senha precisa conter ao menos 1 caractere especial.";
        }

        return true;
    }
}

export default AuthProvider;