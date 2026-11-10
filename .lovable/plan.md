# Portfolio redesign and project matcher

## Outcome
Replace the all-sticky-note page with a bright, distinctive white-and-orange portfolio that keeps playful notes and stickers as accents.

## Build
- Rework the home page into a clear portfolio with an interactive, perspective-driven 3D project orbit, smooth GSAP movement, and real navigation controls.
- Keep the React Three Fiber orbit in a client-only module and optional MediaPipe hand control in its own browser lifecycle with permission/error handling.
- Add an AI project-matching form that recommends from the existing portfolio entries and gives a concrete contact next step; keep prompts, credentials, and AI calls server-side.
- Check the preview, AI request, mobile layout, and project build diagnostics.

## Technical notes
- Preserve the four existing project descriptions as demo portfolio content; do not invent working project links.
- Use the existing React 19, Three.js, React Three Fiber, GSAP, MediaPipe, and Lovable AI Gateway dependencies.