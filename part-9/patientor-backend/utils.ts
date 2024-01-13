import { Gender } from "./types";
export const isObject = (obj: unknown): obj is object => {
    return typeof obj === 'object' && obj !== null;
}

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

  const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };

  const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
  };

  
  
  export const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
  };
  
  export const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
  };

export const parseString = (str: unknown): string => {
    if (!str || !isString(str)) {
      throw new Error('Incorrect or missing field');
    }

    return str;
};