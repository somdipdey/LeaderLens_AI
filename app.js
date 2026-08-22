/*
  LeaderLens AI
  Static, browser-side only. No analytics, server calls, cookies, or remote libraries.
  Code © Dr Somdip Dey, Regent European University / Regent Global.
*/

const STORAGE_KEYS = {
  code: 'leaderlens_participant_code',
  pre: 'leaderlens_pre_survey',
  assessment: 'leaderlens_assessment',
  post: 'leaderlens_post_survey'
};

const LIKERT = [
  { value: 1, label: '1\nStrongly disagree' },
  { value: 2, label: '2\nDisagree' },
  { value: 3, label: '3\nNeutral' },
  { value: 4, label: '4\nAgree' },
  { value: 5, label: '5\nStrongly agree' }
];

const baselineItems = [
  { id: 'b1', text: 'I pause before responding to difficult workplace interactions.' },
  { id: 'b2', text: 'I consider colleagues’ perspectives before judging their actions.' },
  { id: 'b3', text: 'I ask for feedback when conflict or misunderstanding emerges.' },
  { id: 'b4', text: 'I manage disagreement without personalising or escalating it.' },
  { id: 'b5', text: 'I consider fairness before making decisions that affect others.' },
  { id: 'b6', text: 'I acknowledge mistakes and apologise when appropriate.' },
  { id: 'b7', text: 'I protect confidentiality when people share sensitive information.' },
  { id: 'b8', text: 'I notice when status, recognition, or ego may be influencing my behaviour.' },
  { id: 'b9', text: 'I avoid using information asymmetry to gain unfair advantage.' },
  { id: 'b10', text: 'I respond appropriately when jokes, sarcasm, or comments risk humiliating others.' },
  { id: 'b11', text: 'I make space for others’ contributions and give credit where due.' },
  { id: 'b12', text: 'I set concrete behavioural improvement goals and review them.' }
];

const postExtraItems = [
  { id: 'p_engagement', text: 'During the last 2–4 weeks, I actively followed at least part of my AI-assisted development plan.', dimension: 'Engagement' },
  { id: 'p_helpful', text: 'The tool helped me understand my workplace behaviours more clearly.', dimension: 'Usefulness' },
  { id: 'p_safe', text: 'The AI-generated suggestions felt safe, proportionate, and appropriate to my workplace context.', dimension: 'AI safety' },
  { id: 'p_agency', text: 'I felt in control of whether and how to use the tool and AI guidance.', dimension: 'Agency' },
  { id: 'p_stigma_r', text: 'The exercise made me feel labelled or stigmatised.', dimension: 'Stigma', reverse: true },
  { id: 'p_recommend', text: 'I would recommend this self-reflection process to other professionals for voluntary development.', dimension: 'Recommendation' }
];

const assessmentItems = [
  // Narcissism
  { id: 'n1', dimension: 'Narcissism', type: 'dark', text: 'I often want my contributions to be clearly recognised.' },
  { id: 'n2', dimension: 'Narcissism', type: 'dark', text: 'I feel frustrated when others receive praise I believe should be mine.' },
  { id: 'n3', dimension: 'Narcissism', type: 'dark', text: 'I sometimes overestimate how much others need my guidance.' },
  { id: 'n4', dimension: 'Narcissism', type: 'dark', reverse: true, text: 'I can accept being wrong without needing to protect my image.' },
  { id: 'n5', dimension: 'Narcissism', type: 'dark', text: 'I tend to centre conversations around my successes.' },
  { id: 'n6', dimension: 'Narcissism', type: 'dark', text: 'Critical feedback can feel like a personal attack.' },
  { id: 'n7', dimension: 'Narcissism', type: 'dark', reverse: true, text: 'I can celebrate others’ success without comparing it with my own.' },

  // Machiavellianism
  { id: 'm1', dimension: 'Machiavellianism', type: 'dark', text: 'I sometimes withhold information to keep an advantage.' },
  { id: 'm2', dimension: 'Machiavellianism', type: 'dark', text: 'I think workplace politics is often necessary to get things done.' },
  { id: 'm3', dimension: 'Machiavellianism', type: 'dark', text: 'I may adapt what I say depending on who has power in a situation.' },
  { id: 'm4', dimension: 'Machiavellianism', type: 'dark', reverse: true, text: 'I prefer transparent decision-making even when it reduces my influence.' },
  { id: 'm5', dimension: 'Machiavellianism', type: 'dark', text: 'I sometimes build alliances to influence outcomes indirectly.' },
  { id: 'm6', dimension: 'Machiavellianism', type: 'dark', reverse: true, text: 'I avoid manipulating colleagues, even when it would help my goals.' },
  { id: 'm7', dimension: 'Machiavellianism', type: 'dark', text: 'I carefully manage how others perceive me to achieve results.' },

  // Psychopathy (subclinical / workplace reflection language)
  { id: 'p1', dimension: 'Psychopathy', type: 'dark', text: 'I sometimes take risks at work without fully considering consequences.' },
  { id: 'p2', dimension: 'Psychopathy', type: 'dark', text: 'I can stay calm in conflict but may appear detached from others’ feelings.' },
  { id: 'p3', dimension: 'Psychopathy', type: 'dark', text: 'I rarely feel guilty after breaking a minor rule if the outcome benefits me.' },
  { id: 'p4', dimension: 'Psychopathy', type: 'dark', reverse: true, text: 'I consider potential harm before acting under pressure.' },
  { id: 'p5', dimension: 'Psychopathy', type: 'dark', text: 'I can be blunt even when it might hurt others.' },
  { id: 'p6', dimension: 'Psychopathy', type: 'dark', text: 'I find it easy to move on after upsetting someone.' },
  { id: 'p7', dimension: 'Psychopathy', type: 'dark', reverse: true, text: 'I follow safety and ethics rules even when shortcuts are tempting.' },

  // Sadism
  { id: 's1', dimension: 'Sadism', type: 'dark', text: 'I sometimes enjoy seeing arrogant people brought down.' },
  { id: 's2', dimension: 'Sadism', type: 'dark', text: 'I have used sarcasm or teasing even when it may embarrass someone.' },
  { id: 's3', dimension: 'Sadism', type: 'dark', text: 'I find it difficult to feel concern when someone who annoyed me struggles.' },
  { id: 's4', dimension: 'Sadism', type: 'dark', reverse: true, text: 'I avoid humour that humiliates others.' },
  { id: 's5', dimension: 'Sadism', type: 'dark', text: 'I may feel satisfaction when a difficult colleague experiences consequences.' },
  { id: 's6', dimension: 'Sadism', type: 'dark', reverse: true, text: 'I would intervene if workplace jokes became cruel.' },
  { id: 's7', dimension: 'Sadism', type: 'dark', text: 'In conflict, I sometimes want the other person to feel the impact of my anger.' },

  // Empathy
  { id: 'e1', dimension: 'Empathy', type: 'light', text: 'I try to understand colleagues’ perspectives before judging their actions.' },
  { id: 'e2', dimension: 'Empathy', type: 'light', text: 'I notice when someone is uncomfortable in a discussion.' },
  { id: 'e3', dimension: 'Empathy', type: 'light', text: 'I ask questions to understand how decisions affect others.' },
  { id: 'e4', dimension: 'Empathy', type: 'light', text: 'I can disagree without dismissing others’ feelings.' },
  { id: 'e5', dimension: 'Empathy', type: 'light', text: 'I make time to consider the human impact of change.' },
  { id: 'e6', dimension: 'Empathy', type: 'light', text: 'I respond with curiosity when people see things differently.' },
  { id: 'e7', dimension: 'Empathy', type: 'light', reverse: true, text: 'I sometimes focus on tasks so strongly that I miss how people feel.' },

  // Humility
  { id: 'h1', dimension: 'Humility', type: 'light', text: 'I acknowledge when others have better ideas than mine.' },
  { id: 'h2', dimension: 'Humility', type: 'light', text: 'I ask for feedback even when it might challenge my self-image.' },
  { id: 'h3', dimension: 'Humility', type: 'light', text: 'I give credit publicly for others’ contributions.' },
  { id: 'h4', dimension: 'Humility', type: 'light', text: 'I can say “I don’t know” without feeling diminished.' },
  { id: 'h5', dimension: 'Humility', type: 'light', text: 'I apologise when my behaviour has harmed someone.' },
  { id: 'h6', dimension: 'Humility', type: 'light', text: 'I invite dissenting views before finalising decisions.' },
  { id: 'h7', dimension: 'Humility', type: 'light', reverse: true, text: 'I find it difficult to admit mistakes to my team.' },

  // Ethical leadership
  { id: 'el1', dimension: 'Ethical Leadership', type: 'light', text: 'I consider fairness before making decisions that affect others.' },
  { id: 'el2', dimension: 'Ethical Leadership', type: 'light', text: 'I explain the reasons behind decisions wherever appropriate.' },
  { id: 'el3', dimension: 'Ethical Leadership', type: 'light', text: 'I challenge behaviour that undermines respect or integrity.' },
  { id: 'el4', dimension: 'Ethical Leadership', type: 'light', text: 'I protect confidentiality when people share sensitive information.' },
  { id: 'el5', dimension: 'Ethical Leadership', type: 'light', text: 'I choose transparent processes over convenient shortcuts.' },
  { id: 'el6', dimension: 'Ethical Leadership', type: 'light', text: 'I encourage people to raise concerns without fear.' },
  { id: 'el7', dimension: 'Ethical Leadership', type: 'light', reverse: true, text: 'I sometimes justify questionable actions if they help achieve targets.' }
];

const dimensionOrder = {
  dark: ['Narcissism', 'Machiavellianism', 'Psychopathy', 'Sadism'],
  light: ['Empathy', 'Humility', 'Ethical Leadership']
};

const darkAdvice = {
  Narcissism: 'Focus on feedback tolerance, shared credit, and separating self-worth from recognition.',
  Machiavellianism: 'Focus on transparent communication, fair information sharing, and ethical influence boundaries.',
  Psychopathy: 'Focus on consequence-checking, empathy pauses, and avoiding impulsive or harmful shortcuts.',
  Sadism: 'Focus on avoiding humiliation, stopping cruel humour, and replacing retaliatory impulses with proportionate action.'
};

const lightAdvice = {
  Empathy: 'Practise perspective-taking, active listening, and checking emotional impact before acting.',
  Humility: 'Practise acknowledging uncertainty, inviting dissent, apologising, and giving credit.',
  'Ethical Leadership': 'Practise fairness, transparency, confidentiality, and safe challenge of harmful behaviour.'
};

function getCode() {
  let code = localStorage.getItem(STORAGE_KEYS.code);
  if (!code) {
    code = generateCode();
    localStorage.setItem(STORAGE_KEYS.code, code);
  }
  return code;
}

function generateCode() {
  const bytes = new Uint8Array(4);
  crypto.getRandomValues(bytes);
  return 'LLAI-' + Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
}

function setStatus(id, message, isError = false) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = message;
  el.style.color = isError ? '#b42318' : '#14345e';
}

function renderLikertQuestion(item, groupName, number) {
  const block = document.createElement('fieldset');
  block.className = 'question-block';
  const legend = document.createElement('legend');
  legend.className = 'question-title';
  const text = document.createElement('strong');
  text.textContent = `${number}. ${item.text}`;
  const tag = document.createElement('span');
  tag.className = 'dimension-tag';
  tag.textContent = item.dimension || 'Behaviour';
  legend.appendChild(text);
  legend.appendChild(tag);
  block.appendChild(legend);

  const scale = document.createElement('div');
  scale.className = 'scale';
  LIKERT.forEach(opt => {
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = `${groupName}_${item.id}`;
    input.value = opt.value;
    input.required = true;
    label.appendChild(input);
    const span = document.createElement('span');
    span.textContent = opt.label;
    label.appendChild(span);
    scale.appendChild(label);
  });
  block.appendChild(scale);
  return block;
}

function renderForm(formId, items, groupName) {
  const form = document.getElementById(formId);
  form.innerHTML = '';
  items.forEach((item, idx) => form.appendChild(renderLikertQuestion(item, groupName, idx + 1)));
}

function getFormValues(formId, items, groupName) {
  const form = document.getElementById(formId);
  const data = {};
  for (const item of items) {
    const selected = form.querySelector(`input[name="${groupName}_${item.id}"]:checked`);
    if (!selected) return null;
    data[item.id] = Number(selected.value);
  }
  return data;
}

function setFormValues(formId, items, groupName, values) {
  if (!values) return;
  const form = document.getElementById(formId);
  for (const item of items) {
    const value = values[item.id];
    if (value) {
      const input = form.querySelector(`input[name="${groupName}_${item.id}"][value="${value}"]`);
      if (input) input.checked = true;
    }
  }
}

function randomFill(formId, items, groupName, mode = 'balanced') {
  const values = {};
  items.forEach(item => {
    const base = mode === 'positive' ? 4 : 3;
    const noise = Math.floor(Math.random() * 3) - 1;
    values[item.id] = Math.min(5, Math.max(1, base + noise));
  });
  setFormValues(formId, items, groupName, values);
}

function saveJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadJson(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || 'null');
  } catch {
    return null;
  }
}

function reverseScore(value) {
  return 6 - Number(value);
}

function percentageFromMean(mean) {
  return Math.round(((mean - 1) / 4) * 100);
}

function mean(values) {
  if (!values.length) return 0;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

function scoreSurvey(values, items) {
  const scored = items.map(item => item.reverse ? reverseScore(values[item.id]) : values[item.id]);
  const avg = mean(scored);
  return {
    mean: Number(avg.toFixed(2)),
    percent: percentageFromMean(avg),
    completeItems: scored.length
  };
}

function scoreAssessment(values) {
  const byDimension = {};
  for (const item of assessmentItems) {
    const val = item.reverse ? reverseScore(values[item.id]) : values[item.id];
    if (!byDimension[item.dimension]) byDimension[item.dimension] = { values: [], type: item.type };
    byDimension[item.dimension].values.push(val);
  }

  const scores = {};
  Object.entries(byDimension).forEach(([dimension, info]) => {
    const avg = mean(info.values);
    scores[dimension] = {
      type: info.type,
      mean: Number(avg.toFixed(2)),
      percent: percentageFromMean(avg),
      band: bandFor(info.type, percentageFromMean(avg))
    };
  });
  return scores;
}

function bandFor(type, percent) {
  if (type === 'dark') {
    if (percent < 34) return 'Lower reflective signal';
    if (percent < 67) return 'Moderate reflective signal';
    return 'Elevated reflective signal';
  }
  if (percent < 34) return 'Development priority';
  if (percent < 67) return 'Emerging capacity';
  return 'Reported strength';
}

function savePre(event) {
  event.preventDefault();
  const values = getFormValues('preForm', baselineItems, 'pre');
  if (!values) return setStatus('preStatus', 'Please answer every pre-survey item before saving.', true);
  const payload = {
    kind: 'pre_survey',
    participantCode: getCode(),
    timestamp: new Date().toISOString(),
    values,
    score: scoreSurvey(values, baselineItems)
  };
  saveJson(STORAGE_KEYS.pre, payload);
  setStatus('preStatus', `Saved locally. Baseline workplace reflection index: ${payload.score.percent}/100.`);
}

function saveAssessment(event) {
  event.preventDefault();
  const values = getFormValues('assessmentForm', assessmentItems, 'assessment');
  if (!values) return setStatus('assessmentStatus', 'Please answer every self-assessment item before calculating scores.', true);
  const payload = {
    kind: 'self_assessment',
    participantCode: getCode(),
    timestamp: new Date().toISOString(),
    values,
    scores: scoreAssessment(values)
  };
  saveJson(STORAGE_KEYS.assessment, payload);
  setStatus('assessmentStatus', 'Scores calculated and saved locally. Open Results & AI Plan to view your dashboard.');
  renderResults();
  activateTab('results');
}

function savePost(event) {
  event.preventDefault();
  const postItems = [...baselineItems, ...postExtraItems];
  const values = getFormValues('postForm', postItems, 'post');
  if (!values) return setStatus('postStatus', 'Please answer every post-survey item before saving.', true);
  const payload = {
    kind: 'post_survey',
    participantCode: getCode(),
    timestamp: new Date().toISOString(),
    values,
    repeatedScore: scoreSurvey(values, baselineItems),
    acceptabilityScore: scoreSurvey(values, postExtraItems)
  };
  saveJson(STORAGE_KEYS.post, payload);
  setStatus('postStatus', `Saved locally. Follow-up workplace reflection index: ${payload.repeatedScore.percent}/100.`);
  renderComparison();
}

function drawBarChart(canvasId, title, labels, scores, options = {}) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);
  ctx.font = '700 22px Inter, Arial, sans-serif';
  ctx.fillStyle = '#172033';
  ctx.fillText(title, 28, 36);

  const left = 190, right = 52, top = 72, rowH = 58, barH = 22;
  const barW = width - left - right;

  ctx.font = '500 15px Inter, Arial, sans-serif';
  ctx.fillStyle = '#5b6678';
  for (let i = 0; i <= 4; i++) {
    const x = left + (barW * i / 4);
    ctx.strokeStyle = '#e2e8f0';
    ctx.beginPath(); ctx.moveTo(x, top - 18); ctx.lineTo(x, height - 30); ctx.stroke();
    ctx.fillText(String(i * 25), x - 8, height - 12);
  }

  labels.forEach((label, i) => {
    const y = top + i * rowH;
    const pct = scores[label]?.percent || 0;
    const band = scores[label]?.band || '';
    ctx.fillStyle = '#172033';
    ctx.font = '700 16px Inter, Arial, sans-serif';
    ctx.fillText(label, 28, y + 18);
    ctx.fillStyle = '#5b6678';
    ctx.font = '500 12px Inter, Arial, sans-serif';
    ctx.fillText(band, 28, y + 36);

    ctx.fillStyle = '#eef2f7';
    roundRect(ctx, left, y + 7, barW, barH, 11, true, false);
    const fillW = Math.max(6, barW * pct / 100);
    const grad = ctx.createLinearGradient(left, 0, left + barW, 0);
    grad.addColorStop(0, options.start || '#1f4f8a');
    grad.addColorStop(1, options.end || '#0aa6a6');
    ctx.fillStyle = grad;
    roundRect(ctx, left, y + 7, fillW, barH, 11, true, false);

    ctx.fillStyle = '#172033';
    ctx.font = '700 15px Inter, Arial, sans-serif';
    ctx.fillText(`${pct}/100`, left + barW + 10, y + 23);
  });
}

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof radius === 'number') radius = { tl: radius, tr: radius, br: radius, bl: radius };
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if (fill) ctx.fill();
  if (stroke) ctx.stroke();
}

function renderResults() {
  const assessment = loadJson(STORAGE_KEYS.assessment);
  const resultsEmpty = document.getElementById('resultsEmpty');
  const resultsContent = document.getElementById('resultsContent');
  if (!assessment) {
    resultsEmpty.classList.remove('hidden');
    resultsContent.classList.add('hidden');
    return;
  }

  resultsEmpty.classList.add('hidden');
  resultsContent.classList.remove('hidden');

  const scoreCards = document.getElementById('scoreCards');
  scoreCards.innerHTML = '';
  [...dimensionOrder.dark, ...dimensionOrder.light].forEach(dim => {
    const s = assessment.scores[dim];
    const div = document.createElement('div');
    div.className = `score-card ${s.type}`;
    div.innerHTML = `<span>${dim}</span><strong>${s.percent}/100</strong><span>${s.band}</span>`;
    scoreCards.appendChild(div);
  });

  drawBarChart('darkChart', 'Reflective signals to manage', dimensionOrder.dark, assessment.scores, { start: '#b84a62', end: '#8156a8' });
  drawBarChart('lightChart', 'Prosocial capacities to strengthen', dimensionOrder.light, assessment.scores, { start: '#0b8f8f', end: '#2f855a' });
  document.getElementById('aiPrompt').value = buildAIPrompt();
  updateSummaryBox();
}

function buildAIPrompt() {
  const assessment = loadJson(STORAGE_KEYS.assessment);
  const pre = loadJson(STORAGE_KEYS.pre);
  if (!assessment) return '';
  const darkLines = dimensionOrder.dark.map(dim => {
    const s = assessment.scores[dim];
    return `- ${dim}: ${s.percent}/100 (${s.band}). Reflection focus: ${darkAdvice[dim]}`;
  }).join('\n');
  const lightLines = dimensionOrder.light.map(dim => {
    const s = assessment.scores[dim];
    return `- ${dim}: ${s.percent}/100 (${s.band}). Development focus: ${lightAdvice[dim]}`;
  }).join('\n');

  const baseline = pre ? `My baseline workplace reflection index is ${pre.score.percent}/100.` : 'I have not included a baseline workplace reflection index.';
  return `You are helping me reflect on my workplace behaviour and leadership style. Please act as a cautious, ethical, non-clinical development coach.\n\nImportant boundaries:\n- Do not diagnose me or label me as a narcissist, Machiavellian, psychopath, sadist, or unethical leader.\n- Treat these scores as self-reflection signals, not clinical or objective truth.\n- Prioritise psychological safety, workplace ethics, dignity, and low-risk behaviour experiments.\n- Do not recommend confrontation, retaliation, manipulation, surveillance, or anything that could breach workplace policy.\n- If a situation involves bullying, harassment, discrimination, self-harm, or risk to others, advise me to seek appropriate formal support rather than handling it alone.\n\nContext:\n${baseline}\n\nMy Dark Tetrad reflective signals are:\n${darkLines}\n\nMy light / ethical leadership capacities are:\n${lightLines}\n\nPlease provide:\n1. A balanced interpretation of what this profile might suggest about my leadership style, biases, and workplace triggers.\n2. The top 3 behavioural risks I should monitor, written in non-stigmatising language.\n3. The top 3 strengths or protective capacities I can build on.\n4. A practical 2–4 week improvement plan with weekly micro-experiments, reflection questions, and observable workplace behaviours.\n5. Short scripts for seeking feedback, pausing before reactive decisions, giving credit, and responding ethically to conflict.\n6. A final reminder about interpreting these results cautiously and respecting others’ privacy and dignity.`;
}

function renderComparison() {
  const pre = loadJson(STORAGE_KEYS.pre);
  const post = loadJson(STORAGE_KEYS.post);
  const box = document.getElementById('postComparison');
  if (!post) {
    box.classList.add('hidden');
    return;
  }
  box.classList.remove('hidden');
  if (!pre) {
    box.innerHTML = '<strong>Post-survey saved.</strong><p>No pre-survey is stored in this browser, so a comparison cannot be calculated.</p>';
    return;
  }
  const delta = post.repeatedScore.percent - pre.score.percent;
  const dir = delta > 0 ? '+' : '';
  box.innerHTML = `
    <h3>Pre/Post comparison</h3>
    <div class="comparison-grid">
      <div class="comparison-card"><span>Pre-survey index</span><strong>${pre.score.percent}/100</strong></div>
      <div class="comparison-card"><span>Post-survey index</span><strong>${post.repeatedScore.percent}/100</strong></div>
      <div class="comparison-card"><span>Change</span><strong>${dir}${delta}</strong></div>
      <div class="comparison-card"><span>Acceptability index</span><strong>${post.acceptabilityScore.percent}/100</strong></div>
    </div>
    <p class="muted">Interpret cautiously: change may reflect self-report bias, novelty effects, priming, or events outside the tool.</p>`;
  updateSummaryBox();
}

function getFullSummary() {
  const pre = loadJson(STORAGE_KEYS.pre);
  const assessment = loadJson(STORAGE_KEYS.assessment);
  const post = loadJson(STORAGE_KEYS.post);
  const summary = {
    participantCode: getCode(),
    exportedAt: new Date().toISOString(),
    privacyNote: 'Generated locally in browser. User controls whether to share/export.',
    preSurvey: pre ? { timestamp: pre.timestamp, score: pre.score } : null,
    selfAssessment: assessment ? { timestamp: assessment.timestamp, scores: assessment.scores } : null,
    postSurvey: post ? { timestamp: post.timestamp, repeatedScore: post.repeatedScore, acceptabilityScore: post.acceptabilityScore } : null
  };
  if (pre && post) {
    summary.prePostChange = post.repeatedScore.percent - pre.score.percent;
  }
  return summary;
}

function updateSummaryBox() {
  const box = document.getElementById('summaryBox');
  if (box) box.value = JSON.stringify(getFullSummary(), null, 2);
}

function exportJson(filename, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  downloadBlob(filename, blob);
}

function exportCsv() {
  const summary = getFullSummary();
  const rows = [];
  const flat = flattenObject(summary);
  rows.push(Object.keys(flat).join(','));
  rows.push(Object.values(flat).map(csvEscape).join(','));
  downloadBlob(`leaderlens-summary-${summary.participantCode}.csv`, new Blob([rows.join('\n')], { type: 'text/csv' }));
}

function flattenObject(obj, prefix = '', out = {}) {
  Object.entries(obj || {}).forEach(([key, value]) => {
    const nextKey = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) flattenObject(value, nextKey, out);
    else out[nextKey] = value == null ? '' : value;
  });
  return out;
}

function csvEscape(value) {
  const str = String(value);
  return /[",\n]/.test(str) ? '"' + str.replace(/"/g, '""') + '"' : str;
}

function downloadBlob(filename, blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

async function copyText(text, statusId, message) {
  try {
    await navigator.clipboard.writeText(text);
    setStatus(statusId, message);
  } catch {
    setStatus(statusId, 'Copy failed. Please select the text and copy manually.', true);
  }
}

function activateTab(tabId) {
  document.querySelectorAll('.tab').forEach(btn => btn.classList.toggle('active', btn.dataset.tab === tabId));
  document.querySelectorAll('.panel').forEach(panel => panel.classList.toggle('active', panel.id === tabId));
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (tabId === 'results') renderResults();
  if (tabId === 'post') renderComparison();
  if (tabId === 'researcher') updateSummaryBox();
}

function bindEvents() {
  document.querySelectorAll('.tab').forEach(btn => btn.addEventListener('click', () => activateTab(btn.dataset.tab)));
  document.getElementById('newCodeBtn').addEventListener('click', () => {
    if (!confirm('Create a new participant code? Existing local data will remain unless you delete it.')) return;
    localStorage.setItem(STORAGE_KEYS.code, generateCode());
    document.getElementById('participantCode').textContent = getCode();
    updateSummaryBox();
  });
  document.getElementById('deleteAllBtn').addEventListener('click', () => {
    if (!confirm('Delete all locally stored data for this tool on this device?')) return;
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
    localStorage.setItem(STORAGE_KEYS.code, generateCode());
    document.getElementById('participantCode').textContent = getCode();
    setFormValues('preForm', baselineItems, 'pre', {});
    setFormValues('assessmentForm', assessmentItems, 'assessment', {});
    setFormValues('postForm', [...baselineItems, ...postExtraItems], 'post', {});
    renderResults();
    updateSummaryBox();
  });

  document.getElementById('savePreBtn').addEventListener('click', savePre);
  document.getElementById('scoreBtn').addEventListener('click', saveAssessment);
  document.getElementById('savePostBtn').addEventListener('click', savePost);
  document.getElementById('compareBtn').addEventListener('click', (e) => { e.preventDefault(); renderComparison(); });

  document.getElementById('exportPreBtn').addEventListener('click', (e) => {
    e.preventDefault();
    const pre = loadJson(STORAGE_KEYS.pre);
    if (!pre) return setStatus('preStatus', 'Save the pre-survey before exporting.', true);
    exportJson(`leaderlens-pre-${getCode()}.json`, pre);
  });
  document.getElementById('exportAssessmentBtn').addEventListener('click', (e) => {
    e.preventDefault();
    const assessment = loadJson(STORAGE_KEYS.assessment);
    if (!assessment) return setStatus('assessmentStatus', 'Calculate scores before exporting.', true);
    exportJson(`leaderlens-assessment-${getCode()}.json`, assessment);
  });
  document.getElementById('exportPostBtn').addEventListener('click', (e) => {
    e.preventDefault();
    const post = loadJson(STORAGE_KEYS.post);
    if (!post) return setStatus('postStatus', 'Save the post-survey before exporting.', true);
    exportJson(`leaderlens-post-${getCode()}.json`, post);
  });
  document.getElementById('downloadReportBtn').addEventListener('click', () => exportJson(`leaderlens-report-${getCode()}.json`, getFullSummary()));
  document.getElementById('copyPromptBtn').addEventListener('click', () => copyText(document.getElementById('aiPrompt').value, 'resultsStatus', 'AI prompt copied. Paste it into your chosen GenAI assistant.'));
  document.getElementById('copySummaryBtn').addEventListener('click', () => copyText(JSON.stringify(getFullSummary(), null, 2), 'researcherStatus', 'Anonymous summary copied.'));
  document.getElementById('downloadSummaryBtn').addEventListener('click', () => exportJson(`leaderlens-summary-${getCode()}.json`, getFullSummary()));
  document.getElementById('downloadCsvBtn').addEventListener('click', exportCsv);

  document.querySelectorAll('[data-fill]').forEach(btn => btn.addEventListener('click', () => {
    const target = btn.dataset.fill;
    if (target === 'pre') randomFill('preForm', baselineItems, 'pre', 'positive');
    if (target === 'assessment') randomFill('assessmentForm', assessmentItems, 'assessment', 'balanced');
    if (target === 'post') randomFill('postForm', [...baselineItems, ...postExtraItems], 'post', 'positive');
  }));
}

function initialise() {
  document.getElementById('participantCode').textContent = getCode();
  renderForm('preForm', baselineItems, 'pre');
  renderForm('assessmentForm', assessmentItems, 'assessment');
  renderForm('postForm', [...baselineItems, ...postExtraItems], 'post');
  const pre = loadJson(STORAGE_KEYS.pre);
  const assessment = loadJson(STORAGE_KEYS.assessment);
  const post = loadJson(STORAGE_KEYS.post);
  setFormValues('preForm', baselineItems, 'pre', pre?.values);
  setFormValues('assessmentForm', assessmentItems, 'assessment', assessment?.values);
  setFormValues('postForm', [...baselineItems, ...postExtraItems], 'post', post?.values);
  bindEvents();
  renderResults();
  renderComparison();
  updateSummaryBox();
}

document.addEventListener('DOMContentLoaded', initialise);
