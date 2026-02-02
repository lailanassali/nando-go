import "@testing-library/jest-native/extend-expect";

jest.mock("expo-router", () => ({ useRouter: () => ({ push: jest.fn() }) }));
jest.mock("expo-haptics", () => ({ selectionAsync: jest.fn() }));
