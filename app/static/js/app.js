const tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
if (tg) {
  tg.ready();
  tg.expand();
  tg.setHeaderColor('#050509');
  tg.setBackgroundColor('#050509');
  tg.requestViewport({ height: window.innerHeight });
}
const storageKey = 'ec1:state';
const defaultState = {
  profile: {
    username: 'Енергоклікер',
    level: 1,
    exp: 0,
    efhc: 0,
    kwh: 0,
    bonus: 0,
    baseGen: 0.12567891,
    power: 0,
    referralCode: 'EC1-7421'
  },
  panels: {
    active: [
      { id: 1, name: 'Helio Nova #001', power: 2.80000000, gen: 0.21000000, origin: 'starter' },
      { id: 2, name: 'Photon Arc #002', power: 3.40000000, gen: 0.26000000, origin: 'starter' }
    ],
    archive: [
      { id: 101, name: 'Vintage Pulse #101', power: 1.50000000, gen: 0.12000000, origin: 'archive' }
    ]
  },
  tasks: {
    subscription: false,
    view: false,
    repost: false,
    promo: false,
    survey: false
  },
  wallets: [
    { chain: 'TON', address: 'UQC1-TON-ENERGY-001' },
    { chain: 'SOL', address: 'EC1SOL-VAULT-5588' },
    { chain: 'ETH', address: '0xEc1F00D9bE1a4FfC11cD90C9982Aa45eC10' }
  ],
  ui: {
    activeTab: 'dashboard',
    ratingMode: 'global',
    ratingPage: 1,
    ratingSearch: '',
    referralPage: 1,
    referralSearch: ''
  },
  nextPanelId: 3,
  logs: []
};
const panelTemplates = [
  { name: 'Aurora Edge', power: 2.94000000, gen: 0.22500000 },
  { name: 'Lumen Flow', power: 3.18000000, gen: 0.24200000 },
  { name: 'Solaris Crest', power: 3.52000000, gen: 0.26800000 },
  { name: 'Flux Wave', power: 2.88000000, gen: 0.21800000 },
  { name: 'Radiant Core', power: 3.60000000, gen: 0.28400000 }
];
const ratingData = {
  global: [
    { name: 'SolarLion', efhc: 5324.88901234, kwh: 18234.77234567 },
    { name: 'EcoRunner', efhc: 4876.22347890, kwh: 16320.88765432 },
    { name: 'PhotonStar', efhc: 4520.77890123, kwh: 15210.99876543 },
    { name: 'HelioSage', efhc: 3987.11234567, kwh: 14020.12345678 },
    { name: 'GridPulse', efhc: 3620.45678901, kwh: 13110.44556677 },
    { name: 'VoltPanda', efhc: 3345.88990012, kwh: 12234.55667788 },
    { name: 'AuroraKid', efhc: 3187.22334455, kwh: 11567.77889900 },
    { name: 'EcoWave', efhc: 2980.66778899, kwh: 10980.33445566 },
    { name: 'SparkNova', efhc: 2856.99887766, kwh: 10450.99887766 },
    { name: 'FluxOrbit', efhc: 2700.55443322, kwh: 9867.55443322 },
    { name: 'LumenFox', efhc: 2555.66778891, kwh: 9320.66778891 },
    { name: 'HelixGlow', efhc: 2440.88990012, kwh: 8845.77889901 },
    { name: 'PulseShift', efhc: 2320.11223344, kwh: 8420.55667788 },
    { name: 'VoltDrake', efhc: 2210.33445566, kwh: 8010.44556677 },
    { name: 'EcoQuartz', efhc: 2105.55667788, kwh: 7620.33445566 },
    { name: 'PhotonGale', efhc: 2020.77889900, kwh: 7280.22334455 },
    { name: 'SolarMuse', efhc: 1945.99001122, kwh: 6950.11223344 },
    { name: 'GridNexus', efhc: 1870.11223344, kwh: 6640.00112233 },
    { name: 'VoltVerse', efhc: 1795.33445566, kwh: 6345.88990011 },
    { name: 'EcoFlare', efhc: 1720.55667788, kwh: 6060.77889901 }
  ],
  referral: [
    { name: 'RadiantWolf', efhc: 2210.33445566, kwh: 8020.66778891 },
    { name: 'SolarWhale', efhc: 2140.55667788, kwh: 7740.55667788 },
    { name: 'FluxTiger', efhc: 2055.77889900, kwh: 7420.33445566 },
    { name: 'PhotonEagle', efhc: 1970.99001122, kwh: 7110.22334455 },
    { name: 'EcoFalcon', efhc: 1885.11223344, kwh: 6810.11223344 },
    { name: 'VoltLynx', efhc: 1820.33445566, kwh: 6540.00112233 },
    { name: 'HelioBear', efhc: 1755.55667788, kwh: 6280.88990011 },
    { name: 'AuroraStag', efhc: 1690.77889900, kwh: 6035.77889901 },
    { name: 'GridOtter', efhc: 1625.99001122, kwh: 5800.66778891 },
    { name: 'SparkManta', efhc: 1560.11223344, kwh: 5575.55667788 },
    { name: 'EcoRay', efhc: 1505.33445566, kwh: 5360.44556677 },
    { name: 'FluxHeron', efhc: 1450.55667788, kwh: 5155.33445566 },
    { name: 'PhotonSeal', efhc: 1395.77889900, kwh: 4960.22334455 },
    { name: 'SolarHawk', efhc: 1350.99001122, kwh: 4775.11223344 },
    { name: 'VoltRaven', efhc: 1305.11223344, kwh: 4599.00112233 },
    { name: 'AuroraFawn', efhc: 1260.33445566, kwh: 4430.88990011 },
    { name: 'GridDolphin', efhc: 1225.55667788, kwh: 4270.77889901 },
    { name: 'SparkIbis', efhc: 1180.77889900, kwh: 4118.66778891 },
    { name: 'EcoJay', efhc: 1145.99001122, kwh: 3974.55667788 },
    { name: 'FluxQuail', efhc: 1100.11223344, kwh: 3838.44556677 }
  ]
};
const referralsData = [
  { name: 'LunaMint', status: 'ACTIVE', efhc: 420.88990011 },
  { name: 'VoltNest', status: 'ACTIVE', efhc: 388.55667788 },
  { name: 'EcoRidge', status: 'INACTIVE', efhc: 120.11223344 },
  { name: 'PhotonDen', status: 'ACTIVE', efhc: 255.33445566 },
  { name: 'SolarBloom', status: 'INACTIVE', efhc: 90.55667788 },
  { name: 'AuroraRoot', status: 'ACTIVE', efhc: 310.77889900 },
  { name: 'FluxVale', status: 'ACTIVE', efhc: 278.99001122 },
  { name: 'GridHive', status: 'INACTIVE', efhc: 85.11223344 },
  { name: 'SparkGrove', status: 'ACTIVE', efhc: 198.33445566 },
  { name: 'HelioNest', status: 'ACTIVE', efhc: 210.55667788 },
  { name: 'VoltWing', status: 'INACTIVE', efhc: 70.77889900 },
  { name: 'EcoShade', status: 'ACTIVE', efhc: 182.99001122 },
  { name: 'PhotonWave', status: 'ACTIVE', efhc: 205.11223344 },
  { name: 'SolarFrost', status: 'INACTIVE', efhc: 64.33445566 },
  { name: 'AuroraFleck', status: 'ACTIVE', efhc: 176.55667788 }
];
const shopItems = [
  { id: 'shop-efhc', title: 'EFHC', description: 'Додайте віртуальні монети для апгрейдів', price: '49.00000000 USDT' },
  { id: 'shop-vip', title: 'VIP NFT', description: 'Ексклюзивна NFT для елітного клубу', price: '199.00000000 USDT' },
  { id: 'shop-panel', title: 'Панелі', description: 'Комплект панелей для демо-генерації', price: '0.00000000 EFHC' }
];
const taskConfigs = [
  { id: 'subscription', title: 'Підписка', detail: 'Підпишіться на енергетичний канал' },
  { id: 'view', title: 'Перегляд', detail: 'Перегляньте добірку новин' },
  { id: 'repost', title: 'Репост', detail: 'Поділіться оновленням у чаті' },
  { id: 'promo', title: 'Промокод', detail: 'Активуйте промокод дня' },
  { id: 'survey', title: 'Опитування', detail: 'Пройдіть коротке опитування' }
];
let mainButtonHandler = null;
let backButtonVisible = false;
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const modalActions = document.getElementById('modal-actions');
const modalClose = document.getElementById('modal-close');
const kwhCounter = document.getElementById('kwh-counter');
const levelLabel = document.getElementById('level-label');
const levelProgress = document.getElementById('level-progress');
const genSpeed = document.getElementById('gen-speed');
const panelCount = document.getElementById('panel-count');
const realtimeGen = document.getElementById('realtime-gen');
const profileName = document.getElementById('profile-name');
const badgeEfhc = document.getElementById('badge-efhc');
const badgeKwh = document.getElementById('badge-kwh');
const profileLevel = document.getElementById('profile-level');
const profilePower = document.getElementById('profile-power');
const profileEfhc = document.getElementById('profile-efhc');
const profileKwh = document.getElementById('profile-kwh');
const referralCodeLabel = document.getElementById('referral-code');
const bonusIndicator = document.getElementById('bonus-indicator');
const activePanelsNode = document.getElementById('active-panels');
const archivedPanelsNode = document.getElementById('archived-panels');
const tasksList = document.getElementById('tasks-list');
const shopGrid = document.getElementById('shop-grid');
const ratingBody = document.getElementById('rating-body');
const ratingSearchInput = document.getElementById('rating-search');
const ratingPageLabel = document.getElementById('rating-page');
const ratingPrev = document.getElementById('rating-prev');
const ratingNext = document.getElementById('rating-next');
const referralBody = document.getElementById('referral-body');
const referralSearchInput = document.getElementById('referral-search');
const referralPageLabel = document.getElementById('referral-page');
const referralPrev = document.getElementById('referral-prev');
const referralNext = document.getElementById('referral-next');
const screens = document.querySelectorAll('.screen');
const tabButtons = document.querySelectorAll('.tab-button');
const toggleButtons = document.querySelectorAll('.toggle-button');
function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
function deepMerge(target, source) {
  if (!source || typeof source !== 'object') {
    return target;
  }
  Object.keys(source).forEach((key) => {
    const value = source[key];
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      target[key] = deepMerge(target[key] ? target[key] : {}, value);
    } else {
      target[key] = Array.isArray(value) ? value.slice() : value;
    }
  });
  return target;
}
function loadState() {
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      const parsed = JSON.parse(stored);
      const merged = deepMerge(clone(defaultState), parsed);
      recalcDerived(merged);
      return merged;
    }
  } catch (err) {
    console.error(err);
  }
  const base = clone(defaultState);
  recalcDerived(base);
  return base;
}
let state = loadState();
function recalcDerived(target) {
  if (!target.panels) {
    target.panels = clone(defaultState.panels);
  }
  if (!Array.isArray(target.panels.active)) {
    target.panels.active = [];
  }
  if (!Array.isArray(target.panels.archive)) {
    target.panels.archive = [];
  }
  const activeGen = target.panels.active.reduce((sum, panel) => sum + Number(panel.gen || 0), 0);
  const activePower = target.panels.active.reduce((sum, panel) => sum + Number(panel.power || 0), 0);
  target.profile.baseGen = Number(target.profile.baseGen || 0);
  target.profile.kwh = Number(target.profile.kwh || 0);
  target.profile.efhc = Number(target.profile.efhc || 0);
  target.profile.exp = Number(target.profile.exp || 0);
  target.profile.bonus = Number(target.profile.bonus || 0);
  target.profile.level = Math.max(1, Number(target.profile.level || 1));
  target.profile.genPerSec = Number((target.profile.baseGen + activeGen).toFixed(8));
  target.profile.power = Number(activePower.toFixed(8));
}
function persistState() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(state));
  } catch (err) {
    console.error(err);
  }
}
function formatNumber(value) {
  return Number(value || 0).toFixed(8);
}
function updateHeader() {
  profileName.textContent = state.profile.username;
  badgeEfhc.textContent = `${formatNumber(state.profile.efhc)} EFHC`;
  badgeKwh.textContent = `${formatNumber(state.profile.kwh)} kWh`;
}
function updateDashboard() {
  kwhCounter.textContent = formatNumber(state.profile.kwh);
  levelLabel.textContent = `Рівень ${state.profile.level} / 12`;
  const levelCap = state.profile.level >= 12 ? 1 : Math.min(1, state.profile.exp / 100);
  levelProgress.style.width = `${(levelCap * 100).toFixed(2)}%`;
  genSpeed.textContent = `${formatNumber(state.profile.genPerSec)} kWh/с`;
  panelCount.textContent = formatNumber(state.panels.active.length);
  realtimeGen.textContent = `${formatNumber(state.profile.genPerSec)} kWh/с`;
}
function renderPanels() {
  activePanelsNode.innerHTML = '';
  archivedPanelsNode.innerHTML = '';
  if (!state.panels.active.length) {
    const empty = document.createElement('div');
    empty.className = 'empty-note';
    empty.textContent = 'Ще немає активних панелей';
    activePanelsNode.appendChild(empty);
  } else {
    state.panels.active.forEach((panel) => {
      const card = document.createElement('div');
      card.className = 'panel-card active';
      card.innerHTML = `<div class="panel-info"><div class="panel-name">${panel.name}</div><div class="panel-meta">Потужність: ${formatNumber(panel.power)} kW</div></div><div class="panel-metric">${formatNumber(panel.gen)} kWh/с</div>`;
      activePanelsNode.appendChild(card);
    });
  }
  if (!state.panels.archive.length) {
    const emptyArchive = document.createElement('div');
    emptyArchive.className = 'empty-note';
    emptyArchive.textContent = 'Архів поки порожній';
    archivedPanelsNode.appendChild(emptyArchive);
  } else {
    state.panels.archive.forEach((panel) => {
      const card = document.createElement('div');
      card.className = 'panel-card archive';
      card.innerHTML = `<div class="panel-info"><div class="panel-name">${panel.name}</div><div class="panel-meta">Потужність: ${formatNumber(panel.power)} kW</div></div><div class="panel-metric">${formatNumber(panel.gen)} kWh/с</div>`;
      archivedPanelsNode.appendChild(card);
    });
  }
}
function updateBonusIndicator() {
  bonusIndicator.textContent = `Бонуси: ${formatNumber(state.profile.bonus)} / 100.00000000 · 100 бонусів = 1 панель`;
}
function renderTasks() {
  tasksList.innerHTML = '';
  taskConfigs.forEach((task) => {
    const card = document.createElement('div');
    card.className = 'task-card';
    if (state.tasks[task.id]) {
      card.classList.add('done');
    }
    const name = document.createElement('div');
    name.className = 'task-name';
    name.textContent = task.title;
    const description = document.createElement('div');
    description.className = 'task-detail';
    description.textContent = task.detail;
    const status = document.createElement('div');
    status.className = 'task-status';
    status.textContent = state.tasks[task.id] ? 'Бонус нараховано' : '+1 бонус';
    const button = document.createElement('button');
    button.className = 'task-button';
    button.textContent = state.tasks[task.id] ? 'Готово' : 'Виконати';
    button.disabled = !!state.tasks[task.id];
    button.addEventListener('click', () => handleTaskComplete(task.id));
    card.appendChild(name);
    card.appendChild(description);
    card.appendChild(status);
    card.appendChild(button);
    tasksList.appendChild(card);
  });
}
function renderShop() {
  shopGrid.innerHTML = '';
  shopItems.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'shop-card';
    const title = document.createElement('h3');
    title.textContent = item.title;
    const description = document.createElement('p');
    description.textContent = item.description;
    const price = document.createElement('div');
    price.className = 'price';
    price.textContent = item.price;
    const button = document.createElement('button');
    button.textContent = 'Оплатити';
    button.addEventListener('click', () => handleShopPayment(item));
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(price);
    card.appendChild(button);
    shopGrid.appendChild(card);
  });
}
function renderRating() {
  ratingSearchInput.value = state.ui.ratingSearch;
  toggleButtons.forEach((button) => {
    if (button.dataset.mode === state.ui.ratingMode) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
  const dataset = ratingData[state.ui.ratingMode] || [];
  const term = (state.ui.ratingSearch || '').toLowerCase();
  const filtered = dataset.filter((row) => row.name.toLowerCase().includes(term));
  const pageSize = 5;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  state.ui.ratingPage = Math.min(Math.max(1, state.ui.ratingPage), totalPages);
  const start = (state.ui.ratingPage - 1) * pageSize;
  const rows = filtered.slice(start, start + pageSize);
  ratingBody.innerHTML = '';
  rows.forEach((row, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${formatNumber(start + index + 1)}</td><td>${row.name}</td><td>${formatNumber(row.efhc)}</td><td>${formatNumber(row.kwh)}</td>`;
    ratingBody.appendChild(tr);
  });
  ratingPageLabel.textContent = `${state.ui.ratingPage} / ${totalPages}`;
  ratingPrev.disabled = state.ui.ratingPage <= 1;
  ratingNext.disabled = state.ui.ratingPage >= totalPages;
}
function renderReferrals() {
  referralSearchInput.value = state.ui.referralSearch;
  const term = (state.ui.referralSearch || '').toLowerCase();
  const filtered = referralsData.filter((item) => item.name.toLowerCase().includes(term));
  const pageSize = 5;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  state.ui.referralPage = Math.min(Math.max(1, state.ui.referralPage), totalPages);
  const start = (state.ui.referralPage - 1) * pageSize;
  const rows = filtered.slice(start, start + pageSize);
  referralBody.innerHTML = '';
  rows.forEach((row) => {
    const tr = document.createElement('tr');
    const statusClass = row.status === 'ACTIVE' ? 'active' : 'inactive';
    tr.innerHTML = `<td>${row.name}</td><td><span class="status-chip ${statusClass}">${row.status}</span></td><td>${formatNumber(row.efhc)}</td>`;
    referralBody.appendChild(tr);
  });
  referralPageLabel.textContent = `${state.ui.referralPage} / ${totalPages}`;
  referralPrev.disabled = state.ui.referralPage <= 1;
  referralNext.disabled = state.ui.referralPage >= totalPages;
}
function renderProfile() {
  profileLevel.textContent = formatNumber(state.profile.level);
  profilePower.textContent = `${formatNumber(state.profile.power)} kW`;
  profileEfhc.textContent = formatNumber(state.profile.efhc);
  profileKwh.textContent = formatNumber(state.profile.kwh);
  referralCodeLabel.textContent = state.profile.referralCode;
}
function renderAll() {
  recalcDerived(state);
  updateHeader();
  updateDashboard();
  renderPanels();
  updateBonusIndicator();
  renderTasks();
  renderShop();
  renderRating();
  renderReferrals();
  renderProfile();
}
function showTab(tab) {
  screens.forEach((section) => {
    if (section.id === `screen-${tab}`) {
      section.classList.remove('hidden');
    } else {
      section.classList.add('hidden');
    }
  });
  tabButtons.forEach((button) => {
    if (button.dataset.tab === tab) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
  state.ui.activeTab = tab;
  persistState();
}
function setBackButton(visible) {
  if (!tg || !tg.BackButton) {
    return;
  }
  if (visible && !backButtonVisible) {
    tg.BackButton.show();
    backButtonVisible = true;
  }
  if (!visible && backButtonVisible) {
    tg.BackButton.hide();
    backButtonVisible = false;
  }
}
function configureMainButton(action) {
  if (!tg || !tg.MainButton) {
    return;
  }
  if (!action) {
    tg.MainButton.hide();
    mainButtonHandler = null;
    return;
  }
  tg.MainButton.setText(action.text);
  tg.MainButton.setColor('#f5c555');
  tg.MainButton.setTextColor('#1a1407');
  tg.MainButton.show();
  mainButtonHandler = action.handler;
}
function closeModal() {
  modal.classList.add('hidden');
  document.body.style.overflow = '';
  modalTitle.textContent = '';
  modalBody.innerHTML = '';
  modalActions.innerHTML = '';
  configureMainButton(null);
  setBackButton(false);
}
function openModal(options) {
  modalTitle.textContent = options.title || '';
  modalBody.innerHTML = '';
  modalActions.innerHTML = '';
  const bodyContent = Array.isArray(options.body) ? options.body : [options.body];
  bodyContent.filter(Boolean).forEach((chunk) => {
    const paragraph = document.createElement('div');
    paragraph.textContent = chunk;
    modalBody.appendChild(paragraph);
  });
  if (Array.isArray(options.actions)) {
    options.actions.forEach((action) => {
      const button = document.createElement('button');
      button.textContent = action.text;
      button.addEventListener('click', action.handler);
      modalActions.appendChild(button);
    });
  }
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  if (options.mainAction && (!tg || !tg.MainButton)) {
    const fallback = document.createElement('button');
    fallback.textContent = options.mainAction.text;
    fallback.addEventListener('click', options.mainAction.handler);
    modalActions.appendChild(fallback);
  }
  if (options.mainAction) {
    configureMainButton(options.mainAction);
  }
  setBackButton(true);
}
function createPanelBlueprint(kind) {
  const id = state.nextPanelId;
  const offset = kind === 'bonus' ? 2 : 1;
  const template = panelTemplates[(state.nextPanelId + offset) % panelTemplates.length];
  return {
    id,
    name: `${template.name} #${String(id).padStart(3, '0')}`,
    power: Number(template.power),
    gen: Number(template.gen),
    origin: kind
  };
}
function addPanelFromBlueprint(blueprint) {
  state.panels.active.push({ id: blueprint.id, name: blueprint.name, power: blueprint.power, gen: blueprint.gen, origin: blueprint.origin });
  state.nextPanelId = Math.max(state.nextPanelId, blueprint.id + 1);
  recalcDerived(state);
  addLog({ type: 'panel', origin: blueprint.origin, name: blueprint.name, gen: blueprint.gen });
  persistState();
  renderPanels();
  updateDashboard();
  renderProfile();
  updateHeader();
  updateBonusIndicator();
}
function handlePanelPurchase() {
  const blueprint = createPanelBlueprint('purchase');
  openModal({
    title: 'Нова панель',
    body: [
      `Модель: ${blueprint.name}`,
      `Потужність: ${formatNumber(blueprint.power)} kW`,
      `Генерація: ${formatNumber(blueprint.gen)} kWh/с`
    ],
    actions: [
      { text: 'Скасувати', handler: () => closeModal() }
    ],
    mainAction: {
      text: 'Підтвердити',
      handler: () => {
        addPanelFromBlueprint(blueprint);
        closeModal();
      }
    }
  });
}
function convertBonusPanels() {
  while (state.profile.bonus >= 100) {
    state.profile.bonus = Number((state.profile.bonus - 100).toFixed(8));
    const blueprint = createPanelBlueprint('bonus');
    addPanelFromBlueprint(blueprint);
  }
}
function handleTaskComplete(taskId) {
  if (state.tasks[taskId]) {
    return;
  }
  state.tasks[taskId] = true;
  state.profile.bonus = Number((state.profile.bonus + 1).toFixed(8));
  addLog({ type: 'task', task: taskId });
  convertBonusPanels();
  updateBonusIndicator();
  renderTasks();
  persistState();
}
function handleShopPayment(item) {
  openModal({
    title: 'Демо-оплата',
    body: [
      `Продукт: ${item.title}`,
      `Сума: ${item.price}`,
      'Операція збережена у журналі'
    ],
    actions: [
      { text: 'Закрити', handler: () => closeModal() }
    ],
    mainAction: {
      text: 'Підтвердити',
      handler: () => {
        addLog({ type: 'shop', item: item.title, price: item.price });
        closeModal();
        persistState();
      }
    }
  });
}
function openWallets() {
  const list = state.wallets.map((wallet) => `${wallet.chain}: ${wallet.address}`);
  openModal({
    title: 'Гаманці',
    body: list,
    actions: [
      { text: 'Закрити', handler: () => closeModal() }
    ]
  });
}
function addLog(entry) {
  state.logs.unshift({ ...entry, ts: new Date().toISOString() });
  state.logs = state.logs.slice(0, 60);
}
function levelTick() {
  state.profile.kwh = Number((state.profile.kwh + state.profile.genPerSec).toFixed(8));
  state.profile.exp = Number((state.profile.exp + state.profile.genPerSec).toFixed(8));
  const maxLevel = 12;
  while (state.profile.exp >= 100 && state.profile.level < maxLevel) {
    state.profile.exp -= 100;
    state.profile.level += 1;
    addLog({ type: 'level', level: state.profile.level });
  }
  if (state.profile.level >= maxLevel) {
    state.profile.level = maxLevel;
    state.profile.exp = Math.min(state.profile.exp, 100);
  }
  updateHeader();
  updateDashboard();
  renderProfile();
  persistState();
}
function scheduleTick() {
  setInterval(levelTick, 1000);
}
function updateViewport() {
  document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
  if (tg) {
    tg.requestViewport({ height: window.innerHeight });
  }
}
modalClose.addEventListener('click', () => closeModal());
modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});
if (tg) {
  tg.onEvent('mainButtonClicked', () => {
    if (typeof mainButtonHandler === 'function') {
      mainButtonHandler();
    }
  });
  tg.onEvent('backButtonClicked', () => {
    if (!modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}
window.addEventListener('resize', updateViewport);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
document.getElementById('open-shop').addEventListener('click', () => showTab('shop'));
document.getElementById('buy-panel').addEventListener('click', handlePanelPurchase);
document.getElementById('wallets-button').addEventListener('click', openWallets);
tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    showTab(button.dataset.tab);
  });
});
toggleButtons.forEach((button) => {
  button.addEventListener('click', () => {
    toggleButtons.forEach((peer) => peer.classList.remove('active'));
    button.classList.add('active');
    state.ui.ratingMode = button.dataset.mode;
    state.ui.ratingPage = 1;
    renderRating();
    persistState();
  });
});
ratingSearchInput.addEventListener('input', (event) => {
  state.ui.ratingSearch = event.target.value;
  state.ui.ratingPage = 1;
  renderRating();
  persistState();
});
ratingPrev.addEventListener('click', () => {
  if (state.ui.ratingPage > 1) {
    state.ui.ratingPage -= 1;
    renderRating();
    persistState();
  }
});
ratingNext.addEventListener('click', () => {
  state.ui.ratingPage += 1;
  renderRating();
  persistState();
});
referralSearchInput.addEventListener('input', (event) => {
  state.ui.referralSearch = event.target.value;
  state.ui.referralPage = 1;
  renderReferrals();
  persistState();
});
referralPrev.addEventListener('click', () => {
  if (state.ui.referralPage > 1) {
    state.ui.referralPage -= 1;
    renderReferrals();
    persistState();
  }
});
referralNext.addEventListener('click', () => {
  state.ui.referralPage += 1;
  renderReferrals();
  persistState();
});
renderAll();
showTab(state.ui.activeTab || 'dashboard');
updateViewport();
scheduleTick();
