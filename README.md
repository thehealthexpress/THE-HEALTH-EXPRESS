# The Health Express

A Swiggy/Zomato-style food ordering website with light green theme and 6km delivery radius.

## Setup
1. Clone and install deps: `npm install` in client/ and server/.
2. Set up MongoDB and add .env vars.
3. Seed DB with sample restaurants (e.g., via MongoDB Compass).
4. Run backend: `cd server && node server.js`.
5. Run frontend: `cd client && npm start`.
6. Open http://localhost:3000, grant location access.

## Features
- Location-based restaurant discovery (6km radius).
- Menu browsing, cart, and orders.
- JWT auth for users.
