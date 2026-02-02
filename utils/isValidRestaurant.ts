import { Restaurant } from "@/types/restaurant";

export function isValidRestaurant(r: any): r is Restaurant {
  if (!r) return false;
  if (!r.name) return false;
  if (!r.url) return false;

  const addr = r.geo?.address;

  if (!addr) return false;

  return Boolean(addr.streetAddress && addr.addressLocality && addr.postalCode);
}
