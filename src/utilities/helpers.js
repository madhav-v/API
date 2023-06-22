const helpers = {
    generateRandomString: (len=100) => {
        let chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let length = chars.length;
        let random = "";
        for(let i =1; i <= len; i++){
            let posn = Math.floor(Math.random() * length)
            random += chars[posn];
        }
        return random;
    }
}

module.exports = helpers;