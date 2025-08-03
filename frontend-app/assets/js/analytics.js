console.log("Analytics script loaded!");
const ANALYTICS_URL = "http://localhost:8080";   // using port-forwarding

window.addEventListener('load', () => {
    fetch(`${ANALYTICS_URL}/pageview`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: window.location.pathname })
    }).catch(err => console.error("Pageview Error:", err));
});

document.addEventListener('click', (e) => {
    fetch(`${ANALYTICS_URL}/click`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ element: e.target.tagName })
    }).catch(err => console.error("Click Error:", err));
});

window.addEventListener('beforeunload', () => {
    const depth = (window.scrollY + window.innerHeight) / document.body.scrollHeight;
    fetch(`${ANALYTICS_URL}/scroll`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ depth })
    }).catch(err => console.error("Scroll Error:", err));
});
