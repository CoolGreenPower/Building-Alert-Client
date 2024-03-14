// create a local storage service to store and get data from local storage

// Path: client/src/services/Storage.js
// Compare this snippet from client/src/services/Storage.js:
class StorageService {
    constructor() {
        this.localStorage = window.localStorage;
    }
    // constructor() {
    //     window.localStorage = window.localStorage;
    // }
    // create a function to set data in local storage
    set(key, value) {
        this.localStorage.setItem(key, JSON.stringify(value));
    }

    // create a function to get data from local storage
    get(key) {
        console.log("fetching key", key);
        const value = this.localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    }

    // create a function to remove data from local storage
    remove(key) {
        this.localStorage.removeItem(key);
    }

    // create a function to clear local storage
    clear() {
        this.localStorage.clear();
    }
}

export default StorageService;



