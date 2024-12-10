# Solace Health Candidate Assignment Solution (Dustin Lee)

## Bugs Investigated and Fixed

- PostgreSQL database seed and migration (`@/db`)
- Fixed potential issues with character comparison based on the search input
- Added missing `key` props for all components while iterating object array

## Features, Improvement

- Error handling for all asynchronous operations
- Removed document object, moved from the usage of `useRef` to `useState` for search input
- Used `AntD` components for the UI improvement
- Add pagination feature to advocates API and table component
