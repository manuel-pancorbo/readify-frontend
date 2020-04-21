export const getUser = () => {
    try {
        return JSON.parse(localStorage.getItem("user"));
    } catch (e) {
        return null
    }
}
export const setUser = (token, userId) => localStorage.setItem("user", JSON.stringify({"token": token, "userId": userId}))

export const removeUser = () => localStorage.clear()