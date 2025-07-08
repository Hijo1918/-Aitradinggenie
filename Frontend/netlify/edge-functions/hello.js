// frontend/netlify/edge-functions/hello.js
export default async (request, context) => {
  return new Response("Hello from Netlify Edge!", {
    headers: { "content-type": "text/plain" }
  });
};
