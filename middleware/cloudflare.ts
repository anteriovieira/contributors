export default defineEventHandler(async (event) => {
  const cloudflare = {}
  const { keys } = await globalThis?.Env?.list() || { keys: [] }

  for (const key of keys) {
    cloudflare[key.name] = await globalThis?.Env?.get(key.name)
  }

  event.context.cloudflare = cloudflare
})
