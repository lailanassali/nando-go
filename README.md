# 🍗 Nando’s Restaurant Locator — React Native (Expo)

This is an Expo project built with **Expo Router**, **React Native**, and **TypeScript**. It displays nearby restaurant locations, supports navigation to a WebView, and includes a custom splash experience and testing setup.

## Get started

1. Install dependencies

   npm install

2. Run the app (development build recommended for splash + WebView)

   npx expo run:ios  
   or  
   npx expo run:android

   You can also run the standard dev server:

   npx expo start

## Project structure

This project uses **file-based routing** via Expo Router. The folder structure defines the navigation.

**mocks\_**
app/  
 (tabs)/  
 index.tsx → Main tab layout  
 Restaurant/  
 index.tsx → Restaurant WebView screen  
 \_layout.tsx → Root layout (fonts, splash, theme)

assets/  
 fonts/ → Custom fonts  
 images/ → Splash + icons

components/  
 restaurant-item.tsx → Single restaurant card  
 restaurant-list.tsx → FlatList wrapper

hooks/  
 use-restaurants.ts → Fetch + transform restaurant data

utils/  
 get-address.ts → Extracts formatted address
is-valid-address.ts → Validates address fields

types/ restaurant.ts → Restaurant TypeScript types

tests/
e2e/maestro
integration/
unit/
**snapshots**/

## Naming conventions

- Folders: **PascalCase** (e.g., Restaurant/)
- Files: **kebab-case** (e.g., restaurant-item.tsx)
- Components: **PascalCase** (e.g., RestaurantItem)
- Routes: follow **Expo Router** conventions

## Splash screen & fonts

The app uses:

- A **native static splash** configured in app.json
- A **custom fade‑in animation** in app/\_layout.tsx
- A custom **Nando’s font** loaded via expo-font

If you update the splash image or fonts, you must rebuild:

npx expo run:ios  
or  
npx expo run:android

## API & data

Restaurant data is fetched from a remote API inside:

hooks/use-restaurants.ts

The hook:

- Fetches restaurant data
- Validates required fields (geo, name, etc.)
- Filters out invalid restaurants
- Exposes loading and error states

## Testing

### Unit tests

Located in **tests**/components/:

- RestaurantItem
- RestaurantList
- Hooks

### Integration tests

Located in **tests**/integration/:

- Shows empty state when API fails
- Shows empty state when restaurants have missing fields
- Navigation + haptics behaviour tested at the RestaurantItem level

Run tests:

npm test

## End-to-end testing (Maestro)

Maestro flows live in:

maestro/  
 01_empty_state.yaml  
 02_success_state.yaml  
 03_navigation.yaml

Run all Maestro tests:

maestro test maestro

## Navigation

The app uses **Expo Router**:

- (tabs)/index.tsx defines the main tab layout
- Restaurant/index.tsx loads the WebView for a selected restaurant
- RestaurantItem triggers navigation using useRouter() and triggers haptics on press

## Notes for team members

- Use **kebab-case** for all file names
- Use **PascalCase** for components and route folders
- Keep business logic inside **hooks**, not screens
- Keep components small, focused, and reusable
- Use a **development build** when testing splash screens or WebView navigation
