import { defineNitroConfig } from "nitropack/config";

export default defineNitroConfig({
  runtimeConfig: {
    GH_TOKEN: process.env.GH_TOKEN,
  },
  preset: 'cloudflare',
})
