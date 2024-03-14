class DataFetcher {
  
  constructor(network, storage, cacheKey) {
    this.network = network;
    this.storage = storage;
    this.cacheKey = cacheKey;
  }

  // create a boolean variable isOnline to check if the user is online or not
  isOnline = () => window.navigator.onLine;

  postData = async (endPoint, shouldCache = true) => {
    if (!this.isOnline()) {
      console.log("cacheKey", this.cacheKey);
      const storageKey = this.cacheKey;
      const val = this.storage.get(storageKey);
      console.log("value", val);
      return val;
    } else {
      return this.network
        .post(endPoint, this.network.data)
        .then((response) => {
          if (shouldCache) {
            this.storage.set(this.cacheKey, response.data);
          }
          console.log(response.headers['access_token'])
         console.log(document.cookie);

          return response;
        })
        .catch((error) => {
          return error;
        });
    }
  };

  getData(endPoint, shouldCache = true) {
    if (!this.isOnline()) {
      const storageKey = this.cacheKey;
      return this.storage.getData(storageKey);
    } else {
      console.log("this.network", this.network.headers);
      return this.network
        .get(endPoint)
        .then((response) => {
          if (shouldCache) {
            this.storage.set(this.cacheKey, response.data);
          }
          return response;
        })
        .catch((error) => {
          return error;
        });
    }
  }
}

export default DataFetcher;
