<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Lessons Learned & Mistakes to Avoid

1. **Always Verify File State Before Replacing**: When editing components (like `BrideGroom.tsx` or `Venue.tsx`), always run `view_file` to read the absolute latest state before using `replace_file_content`. Using outdated assumptions can accidentally overwrite or truncate recent design improvements.
2. **Double-Check Imports During Edits**: When doing bulk replacements in React components, ensure that third-party imports (like `lucide-react` icons) are not accidentally deleted. Deleting an import (e.g., `<Navigation>`) can cause Next.js to fall back to global browser APIs and throw obscure `Illegal constructor` errors.
3. **Do Not Hardcode UI Text in Multi-Lingual Sites**: Do not use raw strings or `metadata` fallbacks for text in UI components (like `Hero.tsx` couple names). Always map UI elements to the translation files (`en.json` / `te.json`) so the bilingual functionality works seamlessly across all sections.
4. **Verify Translation Keys Before Replacing**: When editing localization files (like `te.json`), do not assume the exact translated text string matches the English version. Always verify the current content of the specific language file before attempting a string replacement, as mismatches will cause the edit to fail.
5. **Query Params over Path Params for i18n**: When manually implementing simple i18n without heavy middleware, utilizing `searchParams` (`/?lang=te`) in `src/app/page.tsx` is often cleaner and avoids complex folder structures (`src/app/[lang]`) and redirect loops.
