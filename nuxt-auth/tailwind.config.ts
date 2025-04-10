import type { Config } from 'tailwindcss'
import animate from "tailwindcss-animate";
import { setupInspiraUI } from "@inspira-ui/plugins";
import PrimeUI from 'tailwindcss-primeui';

export default <Partial<Config>>{
  darkMode: ['selector', '[class~="dark-mode"]'],
  theme: {
    extend: {}
  },
  plugins: [PrimeUI, animate, setupInspiraUI]
};
