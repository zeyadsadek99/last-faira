import { defineNuxtPlugin } from "#app";
import { Loader } from "@googlemaps/js-api-loader";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const googleMapsApiKey = config.public.googleMapsApiKey;

  const loader = new Loader({
    apiKey: googleMapsApiKey,
    libraries: ["places"],
  });

  return {
    provide: {
      googleMaps: loader,
    },
  };
});
