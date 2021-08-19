export const login = (jwt_key) => {
    localStorage.setItem("TOKEN_KEY", jwt_key);
}

export const logout = () => {
    localStorage.removeItem("TOKEN_KEY");
}

export const isLogin = () => {
    if (localStorage.getItem("TOKEN_KEY"))
        return true;
    else
        return false;
}