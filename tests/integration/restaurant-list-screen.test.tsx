import { mockRestaurant } from "@/__mocks__/mockRestaurant";
import RestaurantScreen from "@/app/(tabs)";
import RestaurantItem from "@/components/restaurant-item";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";

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
  it("navigates and triggers haptics when pressed", () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    const { getByTestId } = render(
      <RestaurantItem restaurant={mockRestaurant} />,
    );

    fireEvent.press(getByTestId("restaurant-item"));

    expect(mockPush).toHaveBeenCalled();
    expect(Haptics.selectionAsync).toHaveBeenCalled();
  });

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
