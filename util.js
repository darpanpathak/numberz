module.exports.isObject = (item) => {
    return (typeof item === "object" && !Array.isArray(item) && item !== null);
}