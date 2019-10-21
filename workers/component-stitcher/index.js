addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Fetch and log a request
 * @param {Request} request
 */
async function handleRequest(request) {
  const response = await fetch(request)

  return new HTMLRewriter()
    .on('[data-component]', new ComponentStitcher())
    .transform(response)
}

class ComponentStitcher {
  element(element) {
    const componentName = element.getAttribute('data-component')

    // For now, replace the component with a text version
    element.setInnerContent(`<p style="color: red;">${componentName}</p>`, {
      html: true,
    })
  }

  comments(comment) {}

  text(text) {}
}
