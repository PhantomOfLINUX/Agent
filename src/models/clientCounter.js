const counter = {
    count: 0,
    increase: () => {
        counter.count++;
    },
    decrease: () => {
        if (counter.count <= 0) {
            return;
        }
        counter.count--;
    },
    getCount: () => {
        return counter.count;
    },
};

Object.freeze(counter);

module.exports = counter;
