# Programming language decisions

**Backend language:** TypeScript

**Frontend language:** HTML, CSS and TypeScript

Decided by Swaraj on 1 November 2026.

## Why TypeScript for the backend

Tend runs on Cloudflare Workers and Durable Objects. These run inside V8, the engine inside Chrome, and V8 runs only JavaScript and WebAssembly. TypeScript becomes JavaScript once its types are removed, so it runs natively. Python runs there only as an interpreter compiled to WebAssembly. Rust runs only as WebAssembly, with JavaScript glue for every Cloudflare call. TypeScript's type checker can refuse, before the code ever runs, a storage call that forgets which shop it belongs to. TypeScript's tests run inside the real Cloudflare runtime through Cloudflare's own test integration, which the build's test gate needs; we found no official way to do this for Python. Chrome's debugging tools can step through TypeScript code, profile it, and find what is holding memory. TypeScript also loads no interpreter into the 128 MB of memory that many situations share. Anthropic's and OpenAI's TypeScript SDKs both support Cloudflare Workers. The cost is a new language for Swaraj to learn to read; knowing Python helps him learn it by comparison.

## Why HTML, CSS and TypeScript for the frontend

Browsers run only JavaScript and WebAssembly. So the screen is HTML for structure, CSS for look and layout, and TypeScript for behaviour, which becomes JavaScript. Using TypeScript on both sides means one language to learn, and each piece of data's shape is defined once and checked on both sides. We use these languages directly, without a UI framework. Tend's screens are lists, timelines, the journey map, alerts and a chat box, all built from the records. The AI never builds screens: it hands over checked data, and pre-built templates draw it. React's useful part, keeping the screen in step with changing data, comes from a small signals module and a live connection from a Durable Object. Our users' mid-range phones are limited by their processors, not their data. So no framework code runs on every screen. Tend's product-design principles allow motion only as feedback, never as decoration, and CSS handles that alone. The screen looks and works the same in every browser because we use only features all major browsers support (Baseline); a framework would not add that. If components become repetitive, the step up is Lit, about 5 KB and built on the same browser components, not React. The landing page at usetend.in stays on Astro.
