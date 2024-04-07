//예시

let count = 0;

const clientCounter = {
    increment() {
        count += 1;
    },
    decrement() {
        if (count > 0) {
            count -= 1;
        }
    },
    getCount() {
        return count;
    }
};

Object.freeze(clientCounter);

module.exports = clientCounter;