export type Address = {
  streetAddress: string;
  addressLocality: string;
  postalCode: string;
};

export type Restaurant = {
  name: string;
  url: string;
  geo: {
    address: Address;
  };
};

export type ApiResponse = {
  data: {
    restaurant: {
      items: Restaurant[];
    };
  };
};
