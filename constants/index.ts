import Constants from "expo-constants";

export const APP_VERSION = Constants.expoConfig?.version ?? "unknown";

export const getAddress = (address: any) => {
  if (!address) return "";
  return [address.addressLocality, address.streetAddress, address.postalCode]
    .filter(Boolean)
    .join("\n"); // join each part with a newline
};

export const HEADER_HEIGHT = 250;
export const ITEM_HEIGHT = 140;
