export type ThemeStyle = {
  DEFAULT: string;
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  dark: string;
};

export const buttonStyleVariation: Record<"primary" | "secondary", ThemeStyle> =
  {
    primary: {
      DEFAULT: "#4C51BF", // Primary color
      50: "#EBEEF9",
      100: "#CED2F2",
      200: "#B1B7EC",
      300: "#949CE6",
      400: "#777DE0",
      500: "#5B62DA",
      600: "#494EC6",
      700: "#3C42A3",
      800: "#2E327F",
      900: "#21265B",
      dark: "#3C3F9E", // Darker shade of primary color
    },
    secondary: {
      DEFAULT: "#9B2C2C", // Secondary color
      50: "#FCECEC",
      100: "#F7C3C3",
      200: "#F19999",
      300: "#EC7070",
      400: "#E74646",
      500: "#E21D1D",
      600: "#BF1A1A",
      700: "#9E1616",
      800: "#7C1212",
      900: "#5B0E0E",
      dark: "#7F2424", // Darker shade of secondary color
    },
    // Rest of your color palette...
  };
