// ref: https://stackoverflow.com/questions/8038235/create-a-javascript-regexp-to-find-opening-tags-in-html-php-template
export const isOpenTag = (str) => /<[a-zA-Z]+(>|.*?[^?]>)/gi.test(str);
// ref: https://stackoverflow.com/questions/22895913/regex-to-match-all-closing-html-tags
export const isCloseTag = (str) => /<\/.+?>/.test(str);
export const isSelfClosedTag = (str) => /<[a-zA-Z]+.*?\/>/gi.test(str); // <input />;
export const getTag = (str) => str.replace(/(<)|(( .*?)?\/?>)/g, "");
export const attributeChecker = (str) => {
    if (str === "class")
        return "className";
    return str;
};
export const getAttributes = (str) => {
    if (!str)
        return null;
    // ref: https://regex101.com/r/dD4uT4/1
    const regex = /(\w+)\s*=\s*((["'])(.*?)\3|([^>\s]*)(?=\s|\/>))(?=[^<]*>)/g;
    const match = str.match(regex);
    if (match === null)
        return null;
    const entries = match.map(res => res.replace(/"/g, "").split("="));
    // .map(([key, value]) => [attributeChecker(key), value]);
    return Object.fromEntries(entries);
};
export const isProp = (str) => /[{}]/g.test(str);
export const clearProp = (str) => str.replace(/[{}]/g, "").trim();
export const isTextNode = (node) => ["string", "boolean", "number"].includes(typeof node);
export const parseProps = (str) => {
    const text = str.split(/{({[^{}]+})}/g);
    const tags = text
        .map((item, index, array) => {
        if (!item || item === "")
            return undefined;
        if (item === "{")
            return "";
        if (item[0] === "{" && item.length > 1 && array[index + 1] !== "}") {
            item = "{" + item + "}";
        }
        if (item[0] === "{" && item.length > 1 && array[index + 1] === "}") {
            item = "{{" + item + "}}";
            text[index + 1] = "";
        }
        return item;
    })
        .filter(res => Boolean(res) && res !== '"');
    return tags; // clear undefined
};
export const isEventProp = (name) => {
    return /^on/.test(name);
};
export const extractEventName = (name) => {
    return name.slice(2).toLowerCase();
};
export const isSvgTag = (tag) => ["svg", "circle", "path", "stroke", "rect", "line", "g"].includes(tag);
// не успел со своим
// ref: https://gomakethings.com/getting-the-differences-between-two-objects-with-vanilla-js/
export const diff = (obj1, obj2) => {
    if (!obj2 || Object.prototype.toString.call(obj2) !== "[object Object]") {
        return obj1;
    }
    const diffs = {};
    const arraysMatch = function (arr1, arr2) {
        if (arr1.length !== arr2.length)
            return false;
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i])
                return false;
        }
        return true;
    };
    const compare = function (item1, item2, key) {
        // Get the object type
        const type1 = Object.prototype.toString.call(item1);
        const type2 = Object.prototype.toString.call(item2);
        // If type2 is undefined it has been removed
        if (type2 === "[object Undefined]") {
            diffs[key] = item1;
            return;
        }
        // If items are different types
        if (type1 !== type2) {
            diffs[key] = item2;
            return;
        }
        // If an object, compare recursively
        if (type1 === "[object Object]") {
            const objDiff = diff(item1, item2);
            if (Object.keys(objDiff).length > 0) {
                diffs[key] = objDiff;
            }
            return;
        }
        // If an array, compare
        if (type1 === "[object Array]") {
            if (!arraysMatch(item1, item2)) {
                diffs[key] = item2;
            }
            return;
        }
        // Else if it's a function, convert to a string and compare
        // Otherwise, just compare
        if (type1 === "[object Function]") {
            if (item1.toString() !== item2.toString()) {
                diffs[key] = item2;
            }
        }
        else {
            if (item1 !== item2) {
                diffs[key] = item2;
            }
        }
    };
    for (const key in obj1) {
        if (obj1.hasOwnProperty(key)) {
            compare(obj1[key], obj2[key], key);
        }
    }
    for (const key in obj2) {
        if (obj2.hasOwnProperty(key)) {
            if (!obj1[key] && obj1[key] !== obj2[key]) {
                diffs[key] = obj2[key];
            }
        }
    }
    return Object.keys(diffs).length ? diffs : undefined;
};
//# sourceMappingURL=templateHelpers.js.map