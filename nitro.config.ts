import { defineNitroConfig } from "nitropack/config";

export default defineNitroConfig({
  preset: 'cloudflare',
  routeRules: {
    "/**": { cache: { maxAge: 60 }, cors: true },
  },
})
