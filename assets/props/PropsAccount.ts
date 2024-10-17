export interface FirebaseConfigProps {
  apiKey: string;
  appId: string;
  authDomain: string;
  storageBucket: string;
  measurementId: string;
  messagingSenderId: string;
  projectId: string;
}

export interface AddressProps {
  firstname: string;
  lastname: string;
  address: string;
  city: string;
  district: string;
  ward: string;
  phonenumber: string;
}

export interface AccountProps {
  stt: number;
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  defaultAddress: AddressProps;
  address: AddressProps[];
  checked: boolean;
  phonenumber?: string;
  gender?: string;
  date?: string;
}
