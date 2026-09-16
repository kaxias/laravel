export default async function apiFetch(url, options = {}) {
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;
    const headers = new Headers(options.headers);

    headers.set('Accept', 'application/json');

    if (csrfToken) {
        headers.set('X-CSRF-TOKEN', csrfToken);
    }

    let body = options.body;
    const contentType = headers.get('Content-Type') || '';

    const isPlainObject =
        body !== null &&
        typeof body === 'object' &&
        Object.getPrototypeOf(body) === Object.prototype;

    if (isPlainObject) {
        if (contentType.includes('application/json')) {
            body = JSON.stringify(body);
        } else {
            headers.set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            body = new URLSearchParams(body);
        }
    }

    const response = await fetch(url, { ...options, headers, body });
    const responseText = await response.text();

    let data = responseText;

    if (responseText && response.headers.get('content-type')?.includes('application/json')) {
        try {
            data = JSON.parse(responseText);
        } catch {
            data = responseText;
        }
    }

    if (!response.ok) {
        throw new Error(data?.message || `Request failed with status ${response.status}`);
    }

    return data || null;
}
