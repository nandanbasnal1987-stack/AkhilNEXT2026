'use client';

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
});

async function handleRequest(request) {
  const url = new URL(request.url);
  const path = url.pathname;
  
  // Fetch your React app
  const response = await fetch(`https://your-react-app.com${path}`);
  const html = await response.text();
  
  // Inject meta tags based on route
  let metaTags = '';
  if (path === '/Aboutus') {
    metaTags = `
      <title>About Us | Akhil Systems</title>
      <meta name="description" content="With 31 years in healthcare IT..." />
    `;
  } else if (path === '/') {
    metaTags = `
      <title>Akhil Systems - Healthcare IT Solutions</title>
      <meta name="description" content="Discover cutting-edge healthcare software solutions..." />
    `;
  }
  
  // Replace meta tags in HTML
  const modifiedHtml = html
    .replace('<title>Akhil</title>', metaTags)
    .replace(
      '<meta name="description" content="Discover cutting-edge healthcare software solutions..."/>',
      ''
    );
  
  return new Response(modifiedHtml, {
    headers: { 'Content-Type': 'text/html' }
  });
}