import type { Config } from 'tailwindcss'
import PrimeUI from 'tailwindcss-primeui';

export default <Partial<Config>>{
  theme: {
    extend: {}
  },
  plugins: [PrimeUI]
}
