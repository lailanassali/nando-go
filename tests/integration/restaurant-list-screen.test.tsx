import { mockRestaurant } from "@/__mocks__/mockRestaurant";
import RestaurantScreen from "@/app/(tabs)";
import { render, waitFor } from "@testing-library/react-native";

global.fetch = jest.fn() as jest.Mock;

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
  useLocalSearchParams: jest.fn(() => ({})),
  useSegments: jest.fn(() => []),
  usePathname: jest.fn(() => "/"),
  Stack: { Screen: () => null },
  Link: () => null,
}));

describe("RestaurantScreen", () => {
  it("shows the empty state when restaurants have missing fields", async () => {
    const incomplete = { ...mockRestaurant, geo: undefined };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: { restaurant: { items: [incomplete] } } }),
    });
    const { getByText } = render(<RestaurantScreen />);
    await waitFor(() => {
      expect(
        getByText(
          "Sorry, we couldn’t load any restaurant locations at the moment.",
        ),
      ).toBeTruthy();
    });
  });
  it("shows the empty state when the API request fails", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
    const { getByText } = render(<RestaurantScreen />);
    await waitFor(() => {
      expect(
        getByText(
          "Sorry, we couldn’t load any restaurant locations at the moment.",
        ),
      ).toBeTruthy();
    });
  });
});
