import { mockRestaurant } from "@/__mocks__/mockRestaurant";
import RestaurantItem from "@/components/restaurant-item";
import { useRestaurants } from "@/hooks/use-restaurants";
import { getAddress } from "@/utils/get-address";
import {
  fireEvent,
  render,
  renderHook,
  waitFor,
} from "@testing-library/react-native";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";

global.fetch = jest.fn() as jest.Mock;

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("expo-haptics", () => ({
  selectionAsync: jest.fn(),
}));

describe("Given I am on the restaurant screen", () => {
  it("Then I should see the restaurant name", () => {
    const { getByText } = render(
      <RestaurantItem restaurant={mockRestaurant} />,
    );
    expect(getByText("Nandos Soho")).toBeTruthy();
  });

  it("Then I should see the formatted restaurant address", () => {
    const { getByText } = render(
      <RestaurantItem restaurant={mockRestaurant} />,
    );
    const fullAddress = getAddress(mockRestaurant.geo.address);
    expect(getByText(fullAddress)).toBeTruthy();
  });

  it("Then pressing the item should navigate to the WebView with the correct URL", () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    const { getByText } = render(
      <RestaurantItem restaurant={mockRestaurant} />,
    );
    fireEvent.press(getByText("Nandos Soho"));

    expect(mockPush).toHaveBeenCalledWith(
      expect.objectContaining({
        params: expect.objectContaining({ url: mockRestaurant.url }),
      }),
    );
  });

  it("Then pressing the item should trigger haptic feedback", () => {
    const { getByText } = render(
      <RestaurantItem restaurant={mockRestaurant} />,
    );
    fireEvent.press(getByText("Nandos Soho"));

    expect(Haptics.selectionAsync).toHaveBeenCalled();
  });
  it("Then restaurants with missing fields should not appear in the list", async () => {
    const valid = mockRestaurant;
    const invalid = {
      name: "Broken Place",
      url: "https://example.com",
      geo: undefined,
    };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: { restaurant: { items: [valid, invalid] } } }),
    });
    const { result } = renderHook(() => useRestaurants());
    await waitFor(() => {
      expect(result.current.restaurants).toEqual([valid]);
    });
  });
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
  it("matches snapshot", () => {
    const tree = render(
      <RestaurantItem restaurant={mockRestaurant} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
