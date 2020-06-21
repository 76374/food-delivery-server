export const isNotEmpty = (value: any) => Boolean(value);

export const checkLength = (value: string, min: number, max: number) => {
  return value && (!min || value.length >= min) && (!max || value.length <= max);
};

export const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const isEmail = (value: string) => emailRegex.test(value);

export const notNameRegex = /[^\u0400-\u04FFa-zA-Z-]/;
export const isName = (value: string) => !notNameRegex.test(value);