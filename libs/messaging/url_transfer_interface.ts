// Url transfer protocol
// Actions: GET & POST
interface UTP {
  action: string;
  urls: Array<string | undefined>;
  errors: string
}

export default UTP;