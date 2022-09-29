
const baseUrl = process.env.NODE_ENV === "development" ? "http://localhost:8080" : "";

export function login({ email, password }: { email: string, password: string }) {
    return fetch(baseUrl + '/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' }
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('HTTP status ' + response.status)
            }
            return response.json();
        })
        .then((data) => {
            localStorage.setItem("token", data.token);

            return data;
        })
        .catch((e) => {
            console.log(e)
        });
};

export function register({ name, email, password }: { name: string, email: string, password: string }) {
    return fetch(baseUrl + '/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
            username: name,
            email,
            password
        }),
        headers: { 'Content-Type': 'application/json' }
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('HTTP status ' + response.status)
            }
            return response.json();
        })
        .catch((e) => {
            console.log(e)
            throw e;
        });
};

export function getAllUsers() {
    return fetch(baseUrl + "/api/users", {
        method: 'GET',
        headers: {"Authorization": localStorage.getItem("token") || ""}
    })
        .then((response) => {
            if (!response.ok) {
                if (response.status === 401) {
                    window.location.href = "/login";
                    localStorage.removeItem("token");
                }
                throw new Error('HTTP status ' + response.status)
            }
            return response.json();
        })
        .catch((e) => {
            console.log(e)
        });
};

export function blockUsers(userIds: number[]) {
    return fetch(baseUrl + "/api/users/block", {
        method: 'POST',
        body: JSON.stringify({ userIds }),
        headers: { 'Content-Type': 'application/json', "Authorization": localStorage.getItem("token") || "" }
    })
        .then((response) => {
            if (!response.ok) {
                if (response.status === 401) {
                    window.location.href = "/login";
                    localStorage.removeItem("token");
                }
                throw new Error('HTTP status ' + response.status)
            }
            return response.json();
        })
        .catch((e) => {
            console.log(e)
        });
};

export function unblockUsers(userIds: number[]) {
    return fetch(baseUrl + "/api/users/unblock", {
        method: 'POST',
        body: JSON.stringify({ userIds }),
        headers: { 'Content-Type': 'application/json', "Authorization": localStorage.getItem("token") || "" }
    })
        .then((response) => {
            if (!response.ok) {
                if (response.status === 401) {
                    window.location.href = "/login";
                    localStorage.removeItem("token");
                }
                throw new Error('HTTP status ' + response.status)
            }
            return response.json();
        })
        .catch((e) => {
            console.log(e)
        });
};

export function deleteUsers(userIds: number[]) {
    return fetch(baseUrl + "/api/users/delete", {
        method: 'DELETE',
        body: JSON.stringify({ userIds }),
        headers: { 'Content-Type': 'application/json', "Authorization": localStorage.getItem("token") || "" }
    })
        .then((response) => {
            if (!response.ok) {
                if (response.status === 401) {
                    window.location.href = "/login";
                    localStorage.removeItem("token");
                }
                throw new Error('HTTP status ' + response.status)
            }
            return response.json();
        })
        .catch((e) => {
            console.log(e)
        });
};