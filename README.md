# LeaderLens AI

Static GitHub Pages app for an MBA capstone research prototype: a privacy-preserving self-reflection and improvement tool for Dark Tetrad and ethical leadership traits.

## Purpose

LeaderLens AI supports a privacy-preserving pre/post evaluation of an individual self-reflection and improvement workflow:

1. Pre-survey baseline workplace reflection.
2. Browser-side self-assessment of Dark Tetrad reflective signals and light/ethical leadership capacities.
3. AI prompt export for a 2–4 week development plan using ChatGPT or Copilot.
4. Post-survey assessment of perceived change, usefulness, safety, and acceptability.
5. Anonymous local export for researcher collection through an approved survey system.

## Privacy design

- No server-side code.
- No analytics.
- No cookies.
- No remote JavaScript libraries.
- No form submission.
- Survey and assessment data are stored only in the participant's browser `localStorage` to enable comparison and export.
- Participants can delete all local data from the Overview page.

## Important research/ethics note

This app is not a clinical, diagnostic, recruitment, performance-management, or disciplinary tool. Scores are self-reflection indicators only.

The included questionnaire items are original, framework-informed prompts. They do not reproduce copyrighted scale items from SD3, SD4, Dirty Dozen, Interpersonal Reactivity Index, Ethical Leadership Scale, Expressed Humility Scale, or related instruments. If you replace the items with validated questionnaire items, obtain permission where required and cite the relevant scale owners/publications.

## How to deploy on GitHub Pages

1. Create a GitHub repository, e.g. `LeaderLens_AI`.
2. Upload these files to the repository root:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `README.md`
3. Go to **Settings → Pages**.
4. Set source to `Deploy from a branch`.
5. Choose branch `main` and folder `/root`.
6. Save and wait for GitHub Pages to publish.

## Local testing

You can open `index.html` directly in a browser, or run a local server:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Research basis

The prototype is informed by:

- Paulhus, D.L. and Williams, K.M. (2002) Dark Triad theory.
- Jones, D.N. and Paulhus, D.L. (2014) Short Dark Triad (SD3).
- SD4 / Short Dark Tetrad literature on Machiavellianism, narcissism, psychopathy and sadism.
- Kaufman et al. (2019) Light vs Dark Triad framing.
- Brown, Treviño and Harrison (2005) ethical leadership.
- Davis (1983) multidimensional empathy.
- Owens, Johnson and Mitchell (2013) expressed humility.
- OECD AI Principles and NIST AI Risk Management Framework.

## Copyright

LeaderLens AI is built as a static page for GitHub Pages. No data is sent anywhere; everything runs in your browser.

Questionnaire copyright notice: This prototype does not reproduce copyrighted questionnaire items from SD3, SD4, Dirty Dozen, Interpersonal Reactivity Index, Ethical Leadership Scale, Expressed Humility Scale, or related instruments. The items in this app are original, framework-informed prompts for educational research and self-reflection only. If you replace them with validated questionnaire items, obtain permissions and cite the respective scale owners/publications.

Code copyrighted by Dr Somdip Dey, Regent European University / Regent Global.
