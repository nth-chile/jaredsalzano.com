## Subdomains

To update `<your subdomain>.jaredsalzano.com`:
- from the other repository
  - add a `netlify.toml` if there isn't one
  - `git remote add jaredsalzano.com https://github.com/nth-chile/jaredsalzano.com-new` if you haven't
  - `git push jaredsalzano.com main:<your subdomain>`

## Resume

Edit `src/data/resume.yaml` to update resume content. The homepage section updates automatically on deploy.

`public/resume.pdf` is regenerated automatically on commit (via husky pre-commit hook) whenever `resume.yaml` or `scripts/generate-resume-pdf.ts` is staged. To regenerate manually:

```sh
npm run resume:pdf
```

Note: PDF generation requires macOS (Arial fonts are loaded from `/System/Library/Fonts/Supplemental/`).
