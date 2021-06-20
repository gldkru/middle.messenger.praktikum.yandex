// ref: https://stackoverflow.com/questions/8038235/create-a-javascript-regexp-to-find-opening-tags-in-html-php-template
export const isOpenTag = (str: string): boolean => /<[a-zA-Z]+(>|.*?[^?]>)/gi.test(str);

// ref: https://stackoverflow.com/questions/22895913/regex-to-match-all-closing-html-tags
export const isCloseTag = (str: string): boolean => /<\/.+?>/.test(str);

export const isSelfClosedTag = (str: string): boolean => /<[a-zA-Z]+.*?\/>/gi.test(str); // <input />;

export const getTag = (str: string): string => str.replace(/(<)|(( .*?)?\/?>)/g, '');

export const attributeChecker = (str: string): string => {
  if (str === 'class') return 'className';

  return str;
};

export const getAttributes = (str: string) => {
  if (!str) return null;

  // ref: https://regex101.com/r/dD4uT4/1
  const regex = /(\w+)\s*=\s*((["'])(.*?)\3|([^>\s]*)(?=\s|\/>))(?=[^<]*>)/g;
  const match: RegExpMatchArray | null = str.match(regex);
  if (match === null) return null;

  const entries = match.map((res) => res.replace(/"/g, '').split('='));
  // .map(([key, value]) => [attributeChecker(key), value]);

  return Object.fromEntries(entries);
};

export const isProp = (str: string): boolean => /[{}]/g.test(str);

export const clearProp = (str: string): string => str.replace(/[{}]/g, '').trim();

export const isTextNode = (node: any): boolean => ['string', 'boolean', 'number'].includes(typeof node);

export const parseProps = (str: string): string[] => {
  const text: string[] = str.split(/{({[^{}]+})}/g);
  const tags: (string | undefined)[] = text
    .map((item, index, array): string | undefined => {
      if (!item || item === '') return undefined;
      if (item === '{') return '';

      let result = item;

      if (item[0] === '{' && item.length > 1 && array[index + 1] !== '}') {
        result = `{${item}}`;
      }
      if (item[0] === '{' && item.length > 1 && array[index + 1] === '}') {
        result = `{{${item}}}`;
        text[index + 1] = '';
      }

      return result;
    })
    .filter((res) => Boolean(res) && res !== '"');

  return tags as string[]; // clear undefined
};

export const isEventProp = (name: string): boolean => /^on/.test(name);

export const extractEventName = (name: string): string => name.slice(2).toLowerCase();

export const isSvgTag = (tag: string) => ['svg', 'circle', 'path', 'stroke', 'rect', 'line', 'g'].includes(tag);

// не успел со своим
// ref: https://gomakethings.com/getting-the-differences-between-two-objects-with-vanilla-js/
export const diff = (obj1, obj2) => {
  if (!obj2 || Object.prototype.toString.call(obj2) !== '[object Object]') {
    return obj1;
  }

  const diffs = {};

  const arraysMatch = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;

    for (let i = 0; i < arr1.length; i += 1) {
      if (arr1[i] !== arr2[i]) return false;
    }

    return true;
  };

  const compare = (item1, item2, key) => {
    // Get the object type
    const type1 = Object.prototype.toString.call(item1);
    const type2 = Object.prototype.toString.call(item2);

    // If type2 is undefined it has been removed
    if (type2 === '[object Undefined]') {
      diffs[key] = item1;

      return;
    }

    // If items are different types
    if (type1 !== type2) {
      diffs[key] = item2;
      return;
    }

    // If an object, compare recursively
    if (type1 === '[object Object]') {
      const objDiff = diff(item1, item2);
      if (Object.keys(objDiff).length > 0) {
        diffs[key] = objDiff;
      }
      return;
    }

    // If an array, compare
    if (type1 === '[object Array]') {
      if (!arraysMatch(item1, item2)) {
        diffs[key] = item2;
      }
      return;
    }

    // Else if it's a function, convert to a string and compare
    // Otherwise, just compare
    if (type1 === '[object Function]') {
      if (item1.toString() !== item2.toString()) {
        diffs[key] = item2;
      }
    } else if (item1 !== item2) {
      diffs[key] = item2;
    }
  };

  Object.keys(obj1).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(obj1, key)) {
      compare(obj1[key], obj2[key], key);
    }
  });

  Object.keys(obj2).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(obj2, key)) {
      if (!obj1[key] && obj1[key] !== obj2[key]) {
        diffs[key] = obj2[key];
      }
    }
  });

  return Object.keys(diffs).length ? diffs : undefined;
};
