abstract class Time {
    // Each constant is a conversion to milliseconds
    // This is to add readability to code that is meant to execute at regular intervals
    static readonly SECOND = 1000
    static readonly MINUTE = 60000
    static readonly HOUR = 3600000
    static readonly DAY = 86400000
}

export { Time }