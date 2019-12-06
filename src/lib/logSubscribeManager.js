class Log {
    constructor() {
        this.logSubscriber = [];
    }

    subscribe(subscriber) {
        this.logSubscriber.push(subscriber);
    }
}

const log = new Log();

module.exports = log;
