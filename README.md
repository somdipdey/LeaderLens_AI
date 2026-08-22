# LeaderLens AI

LeaderLens AI is a privacy-preserving, browser-based self-reflection and improvement tool for understanding Dark Tetrad reflective signals, strengthening light / ethical leadership capacities, and generating AI-assisted leadership development guidance.

## Purpose

LeaderLens AI helps individuals reflect on workplace behaviour and leadership style using a private, browser-side workflow:

1. Generate or copy an anonymous study code for any separate pre/post survey process.
2. Complete a browser-side self-assessment of Dark Tetrad reflective signals and light / ethical leadership capacities.
3. View two score dashboards: dark signals to manage and prosocial capacities to strengthen.
4. Download the dark and light profile charts as PNG images for personal records or approved research/survey workflows.
5. Copy a structured GenAI prompt into ChatGPT, Copilot, Gemini, Claude, or another preferred GenAI assistant.
6. Use the AI output as a non-diagnostic, safety-oriented 2–4 week development plan.
7. Export an anonymous local summary only if the user chooses to share it through an approved survey or research process.

## Privacy design

- No server-side code.
- No analytics.
- No cookies.
- No remote JavaScript libraries.
- No form submission.
- Self-assessment responses are stored only in the participant's browser `localStorage` so results can be viewed and exported locally.
- Participants can delete all local data from the Overview page.

## Important ethics note

This app is not a clinical, diagnostic, recruitment, performance-management, or disciplinary tool. Scores are self-reflection indicators only. Use them to guide self-learning, leadership development, and behaviour improvement; do not use them to label yourself or others.

The included questionnaire items are original, framework-informed prompts. They do not reproduce copyrighted scale items from SD3, SD4, Dirty Dozen, Interpersonal Reactivity Index, Ethical Leadership Scale, Expressed Humility Scale, or related instruments. The underlying scientific scales, frameworks, and publications belong to their respective authors, publishers, and rights holders.

## Item selection and scoring transparency

LeaderLens AI uses 49 original framework-informed items: seven items for each of seven dimensions (narcissism, Machiavellianism, psychopathy, sadism, empathy, humility, and ethical leadership). Seven items per dimension were selected to balance construct coverage with participant burden. A longer instrument could capture more nuance but may reduce completion quality; a shorter instrument could be easier to complete but may underrepresent key workplace behaviours.

The app does not copy copyrighted questionnaire items. Each prompt is written as an original workplace-relevant behavioural statement and mapped transparently to the research basis in the app's Question Mapping section.

Scores are calculated by averaging seven adjusted item responses per dimension, then converting the mean to a 0–100 score using:

```text
((mean - 1) / 4) × 100
```

Reverse-scored items are first converted using `6 - response`. Every item within a dimension has equal weight, so each contributes approximately 14.29% of that dimension score. Equal weighting is used to keep the tool transparent and avoid hidden algorithmic weighting. Future peer-reviewed validation should test reliability, factor structure, sensitivity to change, and whether different empirical weights are justified.

## Research basis

The tool is informed by the following established research and governance sources:

- Paulhus, D.L. and Williams, K.M. (2002) Dark Triad theory. https://doi.org/10.1016/S0092-6566(02)00505-6
- Jones, D.N. and Paulhus, D.L. (2014) Short Dark Triad (SD3). https://doi.org/10.1177/1073191113514105
- Paulhus, D.L., Buckels, E.E., Trapnell, P.D. and Jones, D.N. (2021) Short Dark Tetrad (SD4). https://doi.org/10.1027/1015-5759/a000602
- Min, H., Pavisic, I., Howald, N., Highhouse, S. and Zickar, M.J. (2019) Sadism and workplace mistreatment. https://doi.org/10.1016/j.jrp.2019.103862
- Kaufman, S.B., Yaden, D.B., Hyde, E. and Tsukayama, E. (2019) Light vs Dark Triad framing. https://doi.org/10.3389/fpsyg.2019.00467
- Brown, M.E., Treviño, L.K. and Harrison, D.A. (2005) Ethical leadership. https://doi.org/10.1016/j.obhdp.2005.03.002
- Davis, M.H. (1983) Multidimensional empathy. https://doi.org/10.1037/0022-3514.44.1.113
- Owens, B.P., Johnson, M.D. and Mitchell, T.R. (2013) Expressed humility. https://doi.org/10.1287/orsc.1120.0795
- OECD AI Principles. https://legalinstruments.oecd.org/en/instruments/OECD-LEGAL-0449
- NIST Artificial Intelligence Risk Management Framework (AI RMF 1.0). https://doi.org/10.6028/NIST.AI.100-1

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

## Copyright

LeaderLens AI is built as a static page for GitHub Pages. No data is sent anywhere; everything runs in your browser.

Questionnaire copyright notice: The items in this app are original, framework-informed self-reflection prompts. They do not reproduce copyrighted questionnaire items from SD3, SD4, Dirty Dozen, Interpersonal Reactivity Index, Ethical Leadership Scale, Expressed Humility Scale, or related instruments. The underlying scientific scales, frameworks, and publications belong to their respective authors, publishers, and rights holders; links are provided in the app.

Code copyrighted by Dr Somdip Dey, Regent European University / Regent Global.
