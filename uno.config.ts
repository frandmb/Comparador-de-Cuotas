import transformerAttributifyJsx from "@unocss/transformer-attributify-jsx";
import transformerVariantGroup from "@unocss/transformer-variant-group";
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
} from "unocss";

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons(),
    presetAttributify(),
    presetWebFonts({
      provider: "google",
      fonts: {
        inter: "Inter",
      },
    }),
  ],
  transformers: [transformerVariantGroup(), transformerAttributifyJsx()],
});
