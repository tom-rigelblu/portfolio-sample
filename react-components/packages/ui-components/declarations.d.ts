declare module '*.json' {
  const value: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  export default value;
}

declare module '*.module.scss' {
  // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
  const classes: { [key: string]: string };
  export default classes;
}
declare module '*.scss';

declare module '*.svg' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any;
  export default data;
}
