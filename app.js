/*
  LeaderLens AI
  Static, browser-side only. No analytics, server calls, cookies, or remote libraries.
  Code © Dr Somdip Dey, Regent European University / Regent Global.
*/

const STORAGE_KEYS = {
  code: 'leaderlens_participant_code',
  assessment: 'leaderlens_assessment'
};

const LIKERT = [
  { value: 1, label: '1\nStrongly disagree' },
  { value: 2, label: '2\nDisagree' },
  { value: 3, label: '3\nNeutral' },
  { value: 4, label: '4\nAgree' },
  { value: 5, label: '5\nStrongly agree' }
];

const researchSources = {
  darkTriad: {
    label: 'Paulhus & Williams (2002)',
    url: 'https://doi.org/10.1016/S0092-6566(02)00505-6',
    note: 'Foundational Dark Triad framework: narcissism, Machiavellianism, and psychopathy as overlapping but distinct socially aversive traits.'
  },
  sd3: {
    label: 'Jones & Paulhus (2014)',
    url: 'https://doi.org/10.1177/1073191113514105',
    note: 'Short Dark Triad (SD3) construct coverage for narcissism, Machiavellianism, and psychopathy.'
  },
  sd4: {
    label: 'Paulhus et al. (2021)',
    url: 'https://doi.org/10.1027/1015-5759/a000602',
    note: 'Short Dark Tetrad (SD4) extension adding everyday sadism to the Dark Triad profile.'
  },
  sadismWork: {
    label: 'Min et al. (2019)',
    url: 'https://doi.org/10.1016/j.jrp.2019.103862',
    note: 'Workplace-focused evidence that sadism explains mistreatment above and beyond Dark Triad traits.'
  },
  lightTriad: {
    label: 'Kaufman et al. (2019)',
    url: 'https://doi.org/10.3389/fpsyg.2019.00467',
    note: 'Light vs Dark Triad framing and balanced interpretation of prosocial and aversive profiles.'
  },
  ethicalLeadership: {
    label: 'Brown, Treviño & Harrison (2005)',
    url: 'https://doi.org/10.1016/j.obhdp.2005.03.002',
    note: 'Ethical leadership as normatively appropriate conduct promoted through social learning, communication, and reinforcement.'
  },
  empathy: {
    label: 'Davis (1983)',
    url: 'https://doi.org/10.1037/0022-3514.44.1.113',
    note: 'Multidimensional empathy, including perspective-taking and empathic concern.'
  },
  humility: {
    label: 'Owens, Johnson & Mitchell (2013)',
    url: 'https://doi.org/10.1287/orsc.1120.0795',
    note: 'Expressed humility in organisations: accurate self-view, appreciation of others, and teachability.'
  },
  oecd: {
    label: 'OECD AI Principles',
    url: 'https://legalinstruments.oecd.org/en/instruments/OECD-LEGAL-0449',
    note: 'Human-centred, transparent, robust, accountable AI principles.'
  },
  nist: {
    label: 'NIST AI RMF 1.0',
    url: 'https://doi.org/10.6028/NIST.AI.100-1',
    note: 'AI risk management framework covering map, measure, manage, and govern functions.'
  }
};

const assessmentItems = [
  // Narcissism
  { id: 'n1', dimension: 'Narcissism', type: 'dark', text: 'I often want my contributions to be clearly recognised.', sources: ['darkTriad', 'sd3'], rationale: 'Recognition-seeking reflects the status and admiration themes commonly associated with narcissistic tendencies.' },
  { id: 'n2', dimension: 'Narcissism', type: 'dark', text: 'I feel frustrated when others receive praise I believe should be mine.', sources: ['darkTriad', 'sd3'], rationale: 'This item reflects entitlement and sensitivity around recognition, which are central to narcissistic self-image protection.' },
  { id: 'n3', dimension: 'Narcissism', type: 'dark', text: 'I sometimes overestimate how much others need my guidance.', sources: ['darkTriad', 'sd3'], rationale: 'Overestimating one’s importance captures grandiosity and inflated self-assessment themes.' },
  { id: 'n4', dimension: 'Narcissism', type: 'dark', reverse: true, text: 'I can accept being wrong without needing to protect my image.', sources: ['darkTriad', 'sd3', 'humility'], rationale: 'This reverse-scored item captures feedback tolerance and reduced image-defensiveness, which lower narcissistic reflective risk.' },
  { id: 'n5', dimension: 'Narcissism', type: 'dark', text: 'I tend to centre conversations around my successes.', sources: ['darkTriad', 'sd3'], rationale: 'Self-centred achievement narration reflects admiration-seeking and self-enhancement.' },
  { id: 'n6', dimension: 'Narcissism', type: 'dark', text: 'Critical feedback can feel like a personal attack.', sources: ['darkTriad', 'sd3'], rationale: 'Defensiveness toward criticism is associated with fragile self-image and ego threat.' },
  { id: 'n7', dimension: 'Narcissism', type: 'dark', reverse: true, text: 'I can celebrate others’ success without comparing it with my own.', sources: ['darkTriad', 'sd3', 'humility'], rationale: 'This reverse-scored item reflects reduced social comparison and healthier recognition of others.' },

  // Machiavellianism
  { id: 'm1', dimension: 'Machiavellianism', type: 'dark', text: 'I sometimes withhold information to keep an advantage.', sources: ['darkTriad', 'sd3'], rationale: 'Selective information control reflects strategic manipulation and instrumental influence.' },
  { id: 'm2', dimension: 'Machiavellianism', type: 'dark', text: 'I think workplace politics is often necessary to get things done.', sources: ['darkTriad', 'sd3'], rationale: 'The item captures a pragmatic or cynical orientation to political influence in organisational settings.' },
  { id: 'm3', dimension: 'Machiavellianism', type: 'dark', text: 'I may adapt what I say depending on who has power in a situation.', sources: ['darkTriad', 'sd3'], rationale: 'Strategic self-presentation toward powerful stakeholders reflects calculated impression management.' },
  { id: 'm4', dimension: 'Machiavellianism', type: 'dark', reverse: true, text: 'I prefer transparent decision-making even when it reduces my influence.', sources: ['sd3', 'ethicalLeadership'], rationale: 'This reverse-scored item captures transparency and principled process over private influence.' },
  { id: 'm5', dimension: 'Machiavellianism', type: 'dark', text: 'I sometimes build alliances to influence outcomes indirectly.', sources: ['darkTriad', 'sd3'], rationale: 'Indirect alliance-building can reflect strategic interpersonal manipulation when used primarily for self-serving influence.' },
  { id: 'm6', dimension: 'Machiavellianism', type: 'dark', reverse: true, text: 'I avoid manipulating colleagues, even when it would help my goals.', sources: ['sd3', 'ethicalLeadership'], rationale: 'This reverse-scored item measures willingness to limit manipulative tactics despite personal incentives.' },
  { id: 'm7', dimension: 'Machiavellianism', type: 'dark', text: 'I carefully manage how others perceive me to achieve results.', sources: ['darkTriad', 'sd3'], rationale: 'Calculated impression management maps onto instrumental self-presentation and strategic influence.' },

  // Psychopathy (subclinical / workplace reflection language)
  { id: 'p1', dimension: 'Psychopathy', type: 'dark', text: 'I sometimes take risks at work without fully considering consequences.', sources: ['darkTriad', 'sd3'], rationale: 'Risk-taking and low consequence-checking reflect subclinical psychopathy-related impulsivity.' },
  { id: 'p2', dimension: 'Psychopathy', type: 'dark', text: 'I can stay calm in conflict but may appear detached from others’ feelings.', sources: ['darkTriad', 'sd3'], rationale: 'Low emotional reactivity can be adaptive, but detachment from others’ feelings may reflect callousness.' },
  { id: 'p3', dimension: 'Psychopathy', type: 'dark', text: 'I rarely feel guilty after breaking a minor rule if the outcome benefits me.', sources: ['darkTriad', 'sd3'], rationale: 'Reduced guilt around rule-breaking reflects remorse and ethical-control themes in subclinical psychopathy.' },
  { id: 'p4', dimension: 'Psychopathy', type: 'dark', reverse: true, text: 'I consider potential harm before acting under pressure.', sources: ['sd3', 'ethicalLeadership'], rationale: 'This reverse-scored item captures consequence-checking and harm awareness under pressure.' },
  { id: 'p5', dimension: 'Psychopathy', type: 'dark', text: 'I can be blunt even when it might hurt others.', sources: ['darkTriad', 'sd3', 'empathy'], rationale: 'Bluntness without interpersonal concern reflects reduced sensitivity to emotional harm.' },
  { id: 'p6', dimension: 'Psychopathy', type: 'dark', text: 'I find it easy to move on after upsetting someone.', sources: ['darkTriad', 'sd3', 'empathy'], rationale: 'Ease in moving on after harm can reflect lower remorse or reduced empathic concern.' },
  { id: 'p7', dimension: 'Psychopathy', type: 'dark', reverse: true, text: 'I follow safety and ethics rules even when shortcuts are tempting.', sources: ['sd3', 'ethicalLeadership'], rationale: 'This reverse-scored item reflects behavioural restraint and respect for ethical safeguards.' },

  // Sadism
  { id: 's1', dimension: 'Sadism', type: 'dark', text: 'I sometimes enjoy seeing arrogant people brought down.', sources: ['sd4', 'sadismWork'], rationale: 'Enjoyment of another person’s social defeat reflects everyday sadism-related affective response.' },
  { id: 's2', dimension: 'Sadism', type: 'dark', text: 'I have used sarcasm or teasing even when it may embarrass someone.', sources: ['sd4', 'sadismWork'], rationale: 'Humiliating humour or teasing is a workplace-relevant expression of interpersonal harm.' },
  { id: 's3', dimension: 'Sadism', type: 'dark', text: 'I find it difficult to feel concern when someone who annoyed me struggles.', sources: ['sd4', 'sadismWork', 'empathy'], rationale: 'Reduced concern for disliked others can signal indifference to suffering in antagonistic contexts.' },
  { id: 's4', dimension: 'Sadism', type: 'dark', reverse: true, text: 'I avoid humour that humiliates others.', sources: ['sd4', 'sadismWork', 'ethicalLeadership'], rationale: 'This reverse-scored item captures active avoidance of humiliation and cruelty.' },
  { id: 's5', dimension: 'Sadism', type: 'dark', text: 'I may feel satisfaction when a difficult colleague experiences consequences.', sources: ['sd4', 'sadismWork'], rationale: 'Satisfaction at another’s discomfort or punishment reflects sadism-related enjoyment of harm.' },
  { id: 's6', dimension: 'Sadism', type: 'dark', reverse: true, text: 'I would intervene if workplace jokes became cruel.', sources: ['sadismWork', 'ethicalLeadership'], rationale: 'This reverse-scored item reflects willingness to interrupt cruelty and protect dignity.' },
  { id: 's7', dimension: 'Sadism', type: 'dark', text: 'In conflict, I sometimes want the other person to feel the impact of my anger.', sources: ['sd4', 'sadismWork'], rationale: 'Wanting others to feel emotional pain during conflict reflects retaliatory harm motivation.' },

  // Empathy
  { id: 'e1', dimension: 'Empathy', type: 'light', text: 'I try to understand colleagues’ perspectives before judging their actions.', sources: ['empathy', 'lightTriad'], rationale: 'Perspective-taking is a core component of multidimensional empathy and prosocial interpretation.' },
  { id: 'e2', dimension: 'Empathy', type: 'light', text: 'I notice when someone is uncomfortable in a discussion.', sources: ['empathy'], rationale: 'Noticing discomfort reflects interpersonal sensitivity and emotional awareness.' },
  { id: 'e3', dimension: 'Empathy', type: 'light', text: 'I ask questions to understand how decisions affect others.', sources: ['empathy', 'ethicalLeadership'], rationale: 'Questioning impact reflects perspective-taking and ethical consideration of affected stakeholders.' },
  { id: 'e4', dimension: 'Empathy', type: 'light', text: 'I can disagree without dismissing others’ feelings.', sources: ['empathy', 'ethicalLeadership'], rationale: 'Respectful disagreement captures emotional validation while maintaining task clarity.' },
  { id: 'e5', dimension: 'Empathy', type: 'light', text: 'I make time to consider the human impact of change.', sources: ['empathy', 'ethicalLeadership'], rationale: 'Considering human impact reflects empathic concern in workplace decision-making.' },
  { id: 'e6', dimension: 'Empathy', type: 'light', text: 'I respond with curiosity when people see things differently.', sources: ['empathy', 'lightTriad'], rationale: 'Curiosity toward difference supports perspective-taking and reduces reactive judgement.' },
  { id: 'e7', dimension: 'Empathy', type: 'light', reverse: true, text: 'I sometimes focus on tasks so strongly that I miss how people feel.', sources: ['empathy'], rationale: 'This reverse-scored item captures a barrier to empathic awareness when task focus overrides people awareness.' },

  // Humility
  { id: 'h1', dimension: 'Humility', type: 'light', text: 'I acknowledge when others have better ideas than mine.', sources: ['humility'], rationale: 'Recognising others’ strengths reflects accurate self-view and appreciation of others.' },
  { id: 'h2', dimension: 'Humility', type: 'light', text: 'I ask for feedback even when it might challenge my self-image.', sources: ['humility'], rationale: 'Seeking challenging feedback reflects teachability and openness to correction.' },
  { id: 'h3', dimension: 'Humility', type: 'light', text: 'I give credit publicly for others’ contributions.', sources: ['humility', 'ethicalLeadership'], rationale: 'Public credit-giving reflects appreciation of others and ethical recognition.' },
  { id: 'h4', dimension: 'Humility', type: 'light', text: 'I can say “I don’t know” without feeling diminished.', sources: ['humility'], rationale: 'Acknowledging limits reflects accurate self-assessment and reduced image-defensiveness.' },
  { id: 'h5', dimension: 'Humility', type: 'light', text: 'I apologise when my behaviour has harmed someone.', sources: ['humility', 'ethicalLeadership'], rationale: 'Apologising reflects accountability, teachability, and respect for others’ experience.' },
  { id: 'h6', dimension: 'Humility', type: 'light', text: 'I invite dissenting views before finalising decisions.', sources: ['humility', 'ethicalLeadership'], rationale: 'Inviting dissent reflects openness to others’ knowledge and reduces overconfidence.' },
  { id: 'h7', dimension: 'Humility', type: 'light', reverse: true, text: 'I find it difficult to admit mistakes to my team.', sources: ['humility'], rationale: 'This reverse-scored item captures resistance to accountability and low openness about fallibility.' },

  // Ethical leadership
  { id: 'el1', dimension: 'Ethical Leadership', type: 'light', text: 'I consider fairness before making decisions that affect others.', sources: ['ethicalLeadership'], rationale: 'Fairness in decisions is central to ethical leadership and normatively appropriate conduct.' },
  { id: 'el2', dimension: 'Ethical Leadership', type: 'light', text: 'I explain the reasons behind decisions wherever appropriate.', sources: ['ethicalLeadership'], rationale: 'Explaining decisions supports transparency and ethical communication.' },
  { id: 'el3', dimension: 'Ethical Leadership', type: 'light', text: 'I challenge behaviour that undermines respect or integrity.', sources: ['ethicalLeadership'], rationale: 'Challenging harmful conduct reflects reinforcement of ethical norms.' },
  { id: 'el4', dimension: 'Ethical Leadership', type: 'light', text: 'I protect confidentiality when people share sensitive information.', sources: ['ethicalLeadership'], rationale: 'Protecting confidentiality reflects integrity, trustworthiness, and responsible leadership.' },
  { id: 'el5', dimension: 'Ethical Leadership', type: 'light', text: 'I choose transparent processes over convenient shortcuts.', sources: ['ethicalLeadership'], rationale: 'Transparent process over expediency reflects ethical decision discipline.' },
  { id: 'el6', dimension: 'Ethical Leadership', type: 'light', text: 'I encourage people to raise concerns without fear.', sources: ['ethicalLeadership'], rationale: 'Encouraging voice supports ethical climate and psychologically safer reporting of concerns.' },
  { id: 'el7', dimension: 'Ethical Leadership', type: 'light', reverse: true, text: 'I sometimes justify questionable actions if they help achieve targets.', sources: ['ethicalLeadership'], rationale: 'This reverse-scored item captures ethical compromise under performance pressure.' }
];

const dimensionOrder = {
  dark: ['Narcissism', 'Machiavellianism', 'Psychopathy', 'Sadism'],
  light: ['Empathy', 'Humility', 'Ethical Leadership']
};

const ITEMS_PER_DIMENSION = 7;
const ITEM_WEIGHT_PERCENT = Number((100 / ITEMS_PER_DIMENSION).toFixed(2));

const scoringMethod = {
  responseScale: '1 to 5 agreement scale',
  itemsPerDimension: ITEMS_PER_DIMENSION,
  itemWeightWithinDimension: `${ITEM_WEIGHT_PERCENT}%`,
  reverseScoring: 'For reverse-scored items, adjusted score = 6 - response.',
  dimensionFormula: 'dimensionScore0to100 = round(((meanAdjustedItemScore - 1) / 4) * 100)',
  interpretationBoundary: 'Scores are reflective indicators for self-development, not diagnostic categories or validated selection scores.',
  validationNote: 'The 49-item structure is original and framework-informed; future peer-reviewed validation should test reliability, factor structure, sensitivity to change, and whether different empirical weights are justified.'
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
  legend.className = 'question-title no-tag';

  const text = document.createElement('strong');
  text.textContent = `${number}. ${item.text}`;
  legend.appendChild(text);
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
  if (!form) return;
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
  if (!form) return;
  for (const item of items) {
    const value = values[item.id];
    if (value) {
      const input = form.querySelector(`input[name="${groupName}_${item.id}"][value="${value}"]`);
      if (input) input.checked = true;
    }
  }
}

function clearForm(formId, items, groupName) {
  const form = document.getElementById(formId);
  if (!form) return;
  for (const item of items) {
    const selected = form.querySelector(`input[name="${groupName}_${item.id}"]:checked`);
    if (selected) selected.checked = false;
  }
}

function randomFill(formId, items, groupName) {
  const values = {};
  items.forEach(item => {
    const base = item.type === 'light' ? 4 : 3;
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

function saveAssessment(event) {
  event.preventDefault();
  const values = getFormValues('assessmentForm', assessmentItems, 'assessment');
  if (!values) return setStatus('assessmentStatus', 'Please answer every self-assessment item before calculating scores.', true);
  const payload = {
    kind: 'leaderlens_self_assessment',
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

function drawBarChart(canvasId, title, labels, scores, options = {}) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
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
    updateSummaryBox();
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
    div.innerHTML = `<span>${escapeHtml(dim)}</span><strong>${s.percent}/100</strong><span>${escapeHtml(s.band)}</span>`;
    scoreCards.appendChild(div);
  });

  drawBarChart('darkChart', 'Reflective signals to manage', dimensionOrder.dark, assessment.scores, { start: '#b84a62', end: '#8156a8' });
  drawBarChart('lightChart', 'Prosocial capacities to strengthen', dimensionOrder.light, assessment.scores, { start: '#0b8f8f', end: '#2f855a' });
  document.getElementById('aiPrompt').value = buildAIPrompt();
  updateSummaryBox();
}

function buildAIPrompt() {
  const assessment = loadJson(STORAGE_KEYS.assessment);
  if (!assessment) return '';
  const darkLines = dimensionOrder.dark.map(dim => {
    const s = assessment.scores[dim];
    return `- ${dim}: ${s.percent}/100 (${s.band}). Reflection focus: ${darkAdvice[dim]}`;
  }).join('\n');
  const lightLines = dimensionOrder.light.map(dim => {
    const s = assessment.scores[dim];
    return `- ${dim}: ${s.percent}/100 (${s.band}). Development focus: ${lightAdvice[dim]}`;
  }).join('\n');

  return `You are helping me reflect on my workplace behaviour and leadership style. Please act as a cautious, ethical, non-clinical development coach.\n\nImportant boundaries:\n- Do not diagnose me or label me as a narcissist, Machiavellian, psychopath, sadist, or unethical leader.\n- Treat these scores as self-reflection signals, not clinical or objective truth.\n- Prioritise psychological safety, workplace ethics, dignity, and low-risk behaviour experiments.\n- Do not recommend confrontation, retaliation, manipulation, surveillance, or anything that could breach workplace policy.\n- If a situation involves bullying, harassment, discrimination, self-harm, or risk to others, advise me to seek appropriate formal support rather than handling it alone.\n\nMy anonymous LeaderLens AI study code is ${getCode()} if I need to use it in a separate survey.\n\nMy Dark Tetrad reflective signals are:\n${darkLines}\n\nMy light / ethical leadership capacities are:\n${lightLines}\n\nScoring note: each trait/capacity score is calculated from seven equally weighted items, converted to a 0–100 reflective score. Please interpret cautiously and developmentally.\n\nPlease provide:\n1. A balanced interpretation of what this profile might suggest about my leadership style, biases, and workplace triggers.\n2. The top 3 behavioural risks I should monitor, written in non-stigmatising language.\n3. The top 3 strengths or protective capacities I can build on.\n4. A practical 2–4 week improvement plan with weekly micro-experiments, reflection questions, and observable workplace behaviours.\n5. Short scripts for seeking feedback, pausing before reactive decisions, giving credit, and responding ethically to conflict.\n6. A final reminder about interpreting these results cautiously and respecting others’ privacy and dignity.`;
}

function getFullSummary() {
  const assessment = loadJson(STORAGE_KEYS.assessment);
  return {
    participantCode: getCode(),
    exportedAt: new Date().toISOString(),
    privacyNote: 'Generated locally in browser. User controls whether to share/export.',
    scoringMethod,
    itemStructure: {
      totalItems: assessmentItems.length,
      dimensions: [...dimensionOrder.dark, ...dimensionOrder.light],
      itemsPerDimension: ITEMS_PER_DIMENSION,
      equalItemWeightWithinDimension: `${ITEM_WEIGHT_PERCENT}%`
    },
    selfAssessment: assessment ? {
      timestamp: assessment.timestamp,
      scores: assessment.scores
    } : null
  };
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

function downloadCanvas(canvasId, filename, statusId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return setStatus(statusId, 'Chart could not be found.', true);
  const assessment = loadJson(STORAGE_KEYS.assessment);
  if (!assessment) return setStatus(statusId, 'Complete the self-assessment before downloading chart images.', true);
  if (canvas.toBlob) {
    canvas.toBlob((blob) => {
      if (!blob) return setStatus(statusId, 'Chart download failed. Please try again.', true);
      downloadBlob(filename, blob);
      setStatus(statusId, 'Chart image downloaded.');
    }, 'image/png');
  } else {
    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setStatus(statusId, 'Chart image downloaded.');
  }
}

async function copyText(text, statusId, message) {
  try {
    await navigator.clipboard.writeText(text);
    setStatus(statusId, message);
    return true;
  } catch {
    setStatus(statusId, 'Copy failed. Please select the text and copy manually.', true);
    return false;
  }
}

async function copyPromptAndOpen(url, label) {
  const prompt = document.getElementById('aiPrompt').value;
  const copied = await copyText(prompt, 'resultsStatus', `Prompt copied. ${label} is opening in a new tab; paste the prompt into the chat box.`);
  const opened = window.open(url, '_blank', 'noopener');
  if (!opened) {
    setStatus('resultsStatus', copied ? `Prompt copied. Your browser blocked the ${label} popup; please allow popups or open it manually.` : `Copy failed and your browser blocked the ${label} popup.`, true);
  }
}

function renderMapping() {
  const container = document.getElementById('mappingList');
  if (!container) return;
  container.innerHTML = '';
  assessmentItems.forEach((item, idx) => {
    const card = document.createElement('article');
    card.className = `mapping-card ${item.type}`;
    const sources = item.sources.map(key => {
      const source = researchSources[key];
      return `<a href="${source.url}" target="_blank" rel="noopener">${escapeHtml(source.label)}</a>`;
    }).join(', ');
    card.innerHTML = `
      <div class="mapping-head">
        <span class="question-number">Q${idx + 1}</span>
        <span class="mapping-dimension">${escapeHtml(item.dimension)}${item.reverse ? ' (reverse-scored)' : ''}</span>
      </div>
      <p><strong>Item:</strong> ${escapeHtml(item.text)}</p>
      <p><strong>Scoring role:</strong> ${item.reverse ? 'Reverse-scored protective item. Agreement lowers the relevant risk signal or strengthens the relevant capacity after conversion.' : 'Direct-scored item. Agreement increases the relevant reflective signal or reported capacity.'} Each item contributes approximately ${ITEM_WEIGHT_PERCENT}% of its own dimension score.</p>
      <p><strong>Justification:</strong> ${escapeHtml(item.rationale)}</p>
      <p class="source-links"><strong>Research basis:</strong> ${sources}</p>
    `;
    container.appendChild(card);
  });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function activateTab(tabId) {
  document.querySelectorAll('.tab').forEach(btn => btn.classList.toggle('active', btn.dataset.tab === tabId));
  document.querySelectorAll('.panel').forEach(panel => panel.classList.toggle('active', panel.id === tabId));
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (tabId === 'results') renderResults();
  if (tabId === 'mapping') renderMapping();
  if (tabId === 'export') updateSummaryBox();
}

function bindEvents() {
  document.querySelectorAll('.tab').forEach(btn => btn.addEventListener('click', () => activateTab(btn.dataset.tab)));

  document.getElementById('copyCodeBtn').addEventListener('click', () => copyText(getCode(), 'codeStatus', 'Study code copied.'));

  document.getElementById('newCodeBtn').addEventListener('click', () => {
    if (!confirm('Create a new participant code? Existing local assessment data will remain unless you delete it.')) return;
    localStorage.setItem(STORAGE_KEYS.code, generateCode());
    document.getElementById('participantCode').textContent = getCode();
    updateSummaryBox();
    renderResults();
    setStatus('codeStatus', 'New study code created.');
  });

  document.getElementById('deleteAllBtn').addEventListener('click', () => {
    if (!confirm('Delete all locally stored data for this tool on this device?')) return;
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
    localStorage.setItem(STORAGE_KEYS.code, generateCode());
    document.getElementById('participantCode').textContent = getCode();
    clearForm('assessmentForm', assessmentItems, 'assessment');
    renderResults();
    updateSummaryBox();
    setStatus('codeStatus', 'Local data deleted and a new study code generated.');
  });

  document.getElementById('scoreBtn').addEventListener('click', saveAssessment);

  document.getElementById('exportAssessmentBtn').addEventListener('click', (e) => {
    e.preventDefault();
    const assessment = loadJson(STORAGE_KEYS.assessment);
    if (!assessment) return setStatus('assessmentStatus', 'Calculate scores before exporting.', true);
    exportJson(`leaderlens-assessment-${getCode()}.json`, assessment);
  });

  document.getElementById('downloadReportBtn').addEventListener('click', () => exportJson(`leaderlens-report-${getCode()}.json`, getFullSummary()));
  document.getElementById('downloadDarkChartBtn').addEventListener('click', () => downloadCanvas('darkChart', `leaderlens-dark-tetrad-chart-${getCode()}.png`, 'resultsStatus'));
  document.getElementById('downloadLightChartBtn').addEventListener('click', () => downloadCanvas('lightChart', `leaderlens-light-leadership-chart-${getCode()}.png`, 'resultsStatus'));
  document.getElementById('copyPromptBtn').addEventListener('click', () => copyText(document.getElementById('aiPrompt').value, 'resultsStatus', 'Prompt copied. Paste it into your chosen GenAI assistant.'));
  document.getElementById('openChatGPTBtn').addEventListener('click', () => copyPromptAndOpen('https://chatgpt.com/', 'ChatGPT'));
  document.getElementById('openCopilotBtn').addEventListener('click', () => copyPromptAndOpen('https://copilot.microsoft.com/', 'Copilot'));
  document.getElementById('openGeminiBtn').addEventListener('click', () => copyPromptAndOpen('https://gemini.google.com/app', 'Gemini'));
  document.getElementById('openClaudeBtn').addEventListener('click', () => copyPromptAndOpen('https://claude.ai/new', 'Claude'));

  document.getElementById('copySummaryBtn').addEventListener('click', () => copyText(JSON.stringify(getFullSummary(), null, 2), 'exportStatus', 'Anonymous summary copied.'));
  document.getElementById('downloadSummaryBtn').addEventListener('click', () => exportJson(`leaderlens-summary-${getCode()}.json`, getFullSummary()));
  document.getElementById('downloadCsvBtn').addEventListener('click', exportCsv);

  document.querySelectorAll('[data-fill]').forEach(btn => btn.addEventListener('click', () => {
    if (btn.dataset.fill === 'assessment') randomFill('assessmentForm', assessmentItems, 'assessment');
  }));
}

function initialise() {
  document.getElementById('participantCode').textContent = getCode();
  renderForm('assessmentForm', assessmentItems, 'assessment');
  const assessment = loadJson(STORAGE_KEYS.assessment);
  setFormValues('assessmentForm', assessmentItems, 'assessment', assessment?.values);
  bindEvents();
  renderResults();
  renderMapping();
  updateSummaryBox();
}

document.addEventListener('DOMContentLoaded', initialise);
