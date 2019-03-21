import proxy from "@fly/proxy"

const domain = 'kittybot.typeform.com';

const origin = proxy(`https://${domain}`, { forwardHostHeader: true })

// HTTP entry point
fly.http.respondWith(serveTypeformApp)

async function serveTypeformApp(req) {
  console.debug("Serving typeform app")
  const host = req.headers.get("host")

  req.headers.set("X-Forwarded-Host", host)
  req.headers.set("Host", domain)
  console.log(`${host} -> ${domain}`)

  // do proxying
  return origin(req)
}
