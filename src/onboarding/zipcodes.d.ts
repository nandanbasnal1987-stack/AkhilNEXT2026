declare module 'zipcodes' {
  interface Zip { zip: string; city: string; state: string; country: string; latitude: number; longitude: number }
  const zipcodes: { lookup(zip: string): Zip | undefined };
  export default zipcodes;
}
