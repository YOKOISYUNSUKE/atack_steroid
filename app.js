const BOARD_SIZE = 5;
const MAX_ATTEMPTS = 3;
const ATTACK_CHANCE_TRIGGER_COUNT = 17;
const FLIP_ANIMATION_DURATION_MS = 500;
const FLIP_ANIMATION_STAGGER_MS = 500;

const BONUS_QUESTION = {
  id: "attack-chance",
  category: "アタックチャンス",
  question: "本日の講師横井先生が妻と出会った場所は？",
  options: ["ガラシャ", "KG' BAR", "北九州総合病院", "前世"],
  correctIndex: 1,
};

const TEAM_DEFS = [
  { id: "red", name: "チームA", color: "#ef4444", soft: "rgba(239,68,68,0.18)", border: "rgba(254,202,202,0.9)" },
  { id: "blue", name: "チームB", color: "#3b82f6", soft: "rgba(59,130,246,0.18)", border: "rgba(191,219,254,0.9)" },
  { id: "green", name: "チームC", color: "#10b981", soft: "rgba(16,185,129,0.18)", border: "rgba(167,243,208,0.9)" },
  { id: "yellow", name: "チームD", color: "#f59e0b", soft: "rgba(245,158,11,0.18)", border: "rgba(253,230,138,0.9)" },
];
const TEAM_KEYS = ["a", "b", "c", "d"];

const QUESTIONS = [
  { id: 1, category: "投与", question: "長期の全身性ステロイド投与を急に中止したとき、最も注意すべき状態はどれ？", options: ["副腎不全", "高カリウム血症の急速改善", "即時型アレルギー", "急性腎不全"], correctIndex: 0 },
  { id: 2, category: "投与", question: "プレドニゾロン内服の基本的な服用タイミングとして最も一般的なのはどれ？", options: ["朝", "昼", "夕方", "就寝前"], correctIndex: 0 },
  { id: 3, category: "副作用", question: "ステロイド投与で上昇しやすく、モニタリングが重要なものはどれ？", options: ["血糖", "血中鉄", "尿酸のみ", "ビリルビンのみ"], correctIndex: 0 },
  { id: 4, category: "感染", question: "ステロイド投与中の感染症について正しいのはどれ？", options: ["炎症所見が目立ちにくくなることがある", "感染リスクは下がる", "抗菌薬は無効になる", "発熱は必ず高度になる"], correctIndex: 0 },
  { id: 5, category: "吸入", question: "吸入ステロイド後のうがいの主目的はどれ？", options: ["口腔カンジダ予防", "薬効増強", "気道乾燥の促進", "頻脈予防"], correctIndex: 0 },
  { id: 6, category: "骨代謝", question: "長期ステロイド投与で特に問題となる骨関連の副作用はどれ？", options: ["骨粗鬆症", "骨髄炎", "骨肉腫", "疲労骨折の完全予防"], correctIndex: 0 },
  { id: 7, category: "作用", question: "ステロイドの鉱質コルチコイド作用で起こりやすいのはどれ？", options: ["ナトリウム・水分貯留", "低血糖", "徐脈", "低眼圧"], correctIndex: 0 },
  { id: 8, category: "皮膚", question: "外用ステロイドの局所副作用として代表的なのはどれ？", options: ["皮膚萎縮", "永久的な発毛増強", "角膜混濁", "低血糖"], correctIndex: 0 },
  { id: 9, category: "周術期", question: "長期ステロイド使用患者が手術や重症感染など強いストレスにさらされる際、考慮すべきなのはどれ？", options: ["ステロイド補充の追加", "必ず即日中止", "輸液禁止", "鎮痛薬中止"], correctIndex: 0 },
  { id: 10, category: "精神症状", question: "ステロイドで起こりうる精神・神経症状として適切なのはどれ？", options: ["不眠や気分変調", "失語のみ", "必発のけいれん", "聴力の恒久改善"], correctIndex: 0 },
  { id: 11, category: "ワクチン", question: "高用量の全身性ステロイド投与中に原則として慎重になるべきものはどれ？", options: ["生ワクチン", "不活化ワクチンの筋注", "経口補水", "血圧測定"], correctIndex: 0 },
  { id: 12, category: "外見変化", question: "クッシング様変化として代表的なのはどれ？", options: ["ムーンフェイス", "縮瞳", "眼球突出の必発", "難聴"], correctIndex: 0 },
  { id: 13, category: "眼科", question: "ステロイド使用で眼科的に注意すべき副作用として適切なのはどれ？", options: ["眼圧上昇", "網膜血流の必発停止", "色覚の急速改善", "近視の完全消失"], correctIndex: 0 },
  { id: 14, category: "消化器", question: "消化管障害の観点で、ステロイドと併用時により注意が必要な薬はどれ？", options: ["NSAIDs", "制酸薬", "整腸薬", "経口補水液"], correctIndex: 0 },
  { id: 15, category: "小児", question: "小児の長期ステロイド投与で特に意識すべき点はどれ？", options: ["成長への影響", "永久歯の即時脱落", "身長の急速増加", "必発の高身長"], correctIndex: 0 },
  { id: 16, category: "看護", question: "ステロイド投与患者の観察項目として不適切なのはどれ？", options: ["感染徴候・血糖・血圧の確認", "体重変化の確認", "浮腫の観察", "投与中は何も観察しなくてよい"], correctIndex: 3 },
  { id: 17, category: "電解質", question: "ステロイドの影響で起こりうる電解質変化として比較的知られるのはどれ？", options: ["低カリウム血症", "高マグネシウム血症のみ", "重度高リン血症のみ", "必発の高カルシウム血症"], correctIndex: 0 },
  { id: 18, category: "皮膚・創傷", question: "ステロイド使用で遅れやすいものはどれ？", options: ["創傷治癒", "脈拍の測定", "尿量記録", "体温測定"], correctIndex: 0 },
  { id: 19, category: "患者指導", question: "患者指導として適切なのはどれ？", options: ["自己判断で急に中止しない", "飲み忘れ時は翌日に10倍量を飲む", "感染症状は必ず軽いので受診不要", "副作用は絶対に起こらないと説明する"], correctIndex: 0 },
  { id: 20, category: "薬理", question: "ステロイドの糖質コルチコイド作用として正しいのはどれ？", options: ["抗炎症作用がある", "血糖を下げる", "免疫を必ず増強する", "骨形成を促進する"], correctIndex: 0 },
  { id: 21, category: "全身管理", question: "ステロイド投与中の一般的な副作用として適切なのはどれ？", options: ["血圧上昇", "必発の徐脈", "不可逆的な低体温のみ", "急速な脱水のみ"], correctIndex: 0 },
  { id: 22, category: "投与経路", question: "ステロイドのパルス療法の特徴として正しいのはどれ？", options: ["大量を短期間投与し、急速に減量する", "少量を永久に続ける", "内服のみで行う", "点滴は禁忌である"], correctIndex: 0 },
  { id: 23, category: "副作用", question: "ステロイド性糖尿病の特徴として正しいのはどれ？", options: ["食後高血糖が目立つことがある", "必ず空腹時のみ高血糖になる", "インスリンは絶対不要", "食事療法は無効である"], correctIndex: 0 },
  { id: 24, category: "特殊状況", question: "妊娠中のステロイド使用について正しいのはどれ？", options: ["疾患によっては使用されることがある", "絶対に禁忌である", "大量投与が推奨される", "胎児に影響はない"], correctIndex: 0 },
  { id: 25, category: "全身管理", question: "ステロイド投与中のモニタリングとして最も包括的なのはどれ？", options: ["血糖・血圧・体重・感染徴候の定期確認", "血糖のみ測定すればよい", "体重のみ記録すればよい", "副作用は起こらないので不要"], correctIndex: 0 },
];

const DIRECTIONS = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1],           [0, 1],
  [1, -1],  [1, 0],  [1, 1],
];

const state = {
  board: [],
  modalCellIndex: null,
  step: "question",
  selectedOption: null,
  history: [],
  log: ["開始前：好きなマスを選び、回答は1〜4キー、正答チームはA/B/C/Dキーで確定する方式です。"],
  pendingAssignment: null,
  pendingStealTeamId: null,
  teamNames: TEAM_DEFS.map((team) => team.name),
  attackChanceReady: false,
  attackChanceUsed: false,
  bonusModalOpen: false,
  bonusStep: "question",
  bonusSelectedOption: null,
  collapseReady: false,
  collapseAnimating: false,
  collapseFinished: false,
  attempts: {},
  usedOptions: {},
  flipAnimations: [],
  flipAnimating: false,
};

let flipAnimationTimerId = null;

const els = {
  boardGrid: document.getElementById("boardGrid"),
  boardArt: document.getElementById("boardArt"),
  boardImage: document.getElementById("boardImage"),

  teamNameGrid: document.getElementById("teamNameGrid"),
  resetBtn: document.getElementById("resetBtn"),
  undoBtn: document.getElementById("undoBtn"),
  modalOverlay: document.getElementById("modalOverlay"),
  closeModalBtn: document.getElementById("closeModalBtn"),
  modalLabel: document.getElementById("modalLabel"),
  modalCategory: document.getElementById("modalCategory"),
  modalTitle: document.getElementById("modalTitle"),
  modalOptions: document.getElementById("modalOptions"),
  modalExplanation: document.getElementById("modalExplanation"),
  modalResultBar: document.getElementById("modalResultBar"),
  attackChanceOverlay: document.getElementById("attackChanceOverlay"),
  winnerOverlay: document.getElementById("winnerOverlay"),
};

function createInitialBoard() {
  return QUESTIONS.map((q, index) => ({
    ...q,
    index,
    status: "hidden",
    owner: null,
    selectedOption: null,
  }));
}

function inBounds(r, c) {
  return r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE;
}

function cloneBoard(board) {
  return board.map((cell) => ({ ...cell }));
}

function clonePendingAssignment(pa) {
  return pa ? { ...pa } : null;
}

function cloneHistoryEntry() {
  return {
    board: cloneBoard(state.board),
    log: [...state.log],
    pendingAssignment: clonePendingAssignment(state.pendingAssignment),
    pendingStealTeamId: state.pendingStealTeamId,
    attackChanceReady: state.attackChanceReady,
    attackChanceUsed: state.attackChanceUsed,
    bonusModalOpen: state.bonusModalOpen,
    bonusStep: state.bonusStep,
    bonusSelectedOption: state.bonusSelectedOption,
    attempts: { ...state.attempts },
    usedOptions: JSON.parse(JSON.stringify(state.usedOptions)),
  };
}

function getTeams() {
  return TEAM_DEFS.map((team, index) => ({
    ...team,
    name: state.teamNames[index] || team.name,
  }));
}

function getTeamLookup() {
  return Object.fromEntries(getTeams().map((team) => [team.id, team]));
}

function getCounts() {
  const counts = Object.fromEntries(getTeams().map((team) => [team.id, 0]));
  state.board.forEach((cell) => {
    if (cell.status === "claimed" && cell.owner) {
      counts[cell.owner] += 1;
    }
  });
  return counts;
}

function getWinners() {
  const teams = getTeams();
  const counts = getCounts();
  const topCount = Math.max(...teams.map((team) => counts[team.id]));
  const winners = teams.filter((team) => counts[team.id] === topCount && topCount > 0);
  return { counts, topCount, winners };
}

function getPendingCell() {
  return state.pendingAssignment ? state.board[state.pendingAssignment.cellIndex] : null;
}

function isGameEnded() {
  return state.board.every((cell) => cell.status !== "hidden");
}

function getResolvedCount() {
  return state.board.filter((cell) => cell.status !== "hidden").length;
}

function getSingleWinner() {
  const { winners } = getWinners();
  return isGameEnded() && winners.length === 1 ? winners[0] : null;
}

// 同点優勝を含む全勝者を返す（1チームでも複数チームでも）
function getAllWinners() {
  const { winners } = getWinners();
  if (!isGameEnded() || winners.length === 0) return [];
  return winners;
}

function getWinnerIds() {
  return getAllWinners().map(w => w.id);
}

function applyOthelloCapture(board, placedIndex, teamId) {
  const next = cloneBoard(board);
  next[placedIndex].status = "claimed";
  next[placedIndex].owner = teamId;

  const row = Math.floor(placedIndex / BOARD_SIZE);
  const col = placedIndex % BOARD_SIZE;
  let flipped = 0;
  const flips = [];

  for (const [dr, dc] of DIRECTIONS) {
    let r = row + dr;
    let c = col + dc;
    const path = [];

    while (inBounds(r, c)) {
      const idx = r * BOARD_SIZE + c;
      const cell = next[idx];

      if (cell.status === "missed") {
        path.length = 0;
        break;
      }

      if (cell.status !== "claimed" || !cell.owner) {
        path.length = 0;
        break;
      }

      if (cell.owner === teamId) {
        if (path.length > 0) {
          path.forEach((pathIndex) => {
            if (next[pathIndex].owner !== teamId) {
              flips.push({
                index: pathIndex,
                fromOwner: next[pathIndex].owner,
                toOwner: teamId,
              });
              next[pathIndex].owner = teamId;
              flipped += 1;
            }
          });
        }
        path.length = 0;
        break;
      }

      path.push(idx);
      r += dr;
      c += dc;
    }
  }

  return { next, flipped, flips };
}

function clearFlipAnimations() {
  if (flipAnimationTimerId) {
    clearTimeout(flipAnimationTimerId);
    flipAnimationTimerId = null;
  }
  state.flipAnimations = [];
  state.flipAnimating = false;
}

function startFlipAnimations(flips) {
  clearFlipAnimations();
  if (!flips.length) return;

  state.flipAnimations = flips.map((flip, order) => ({
    ...flip,
    delay: order * FLIP_ANIMATION_STAGGER_MS,
  }));
  state.flipAnimating = true;

  const totalDuration =
    (flips.length - 1) * FLIP_ANIMATION_STAGGER_MS + FLIP_ANIMATION_DURATION_MS + 80;

  flipAnimationTimerId = setTimeout(() => {
    flipAnimationTimerId = null;
    state.flipAnimations = [];
    state.flipAnimating = false;
    render();
  }, totalDuration);
}

function setLogEntry(entry) {
  state.log = [entry, ...state.log];
}

function openCell(index) {
  if (state.pendingStealTeamId) {
    stealCell(index);
    return;
  }
  if (state.pendingAssignment) return;
  if (state.attackChanceReady || state.bonusModalOpen) return;
  if (state.collapseAnimating) return;
  if (state.flipAnimating) return;
  if (state.board[index].status !== "hidden") return;
  state.modalCellIndex = index;
  state.step = "question";
  state.selectedOption = null;
  render();
  showModal();
}

function closeModal() {
  if (state.bonusModalOpen) {
    if (state.bonusStep === "question" && !state.pendingAssignment && !state.attackChanceUsed) {
      state.attackChanceReady = true;
    }
    state.bonusModalOpen = false;
    state.bonusStep = "question";
    state.bonusSelectedOption = null;
  }
  state.modalCellIndex = null;
  state.step = "question";
  state.selectedOption = null;
  stopPetalAnimation();
  hideModal();
  render();
}

function getAttemptCount(cellIndex) {
  return state.attempts[cellIndex] || 0;
}

function getUsedOptions(cellIndex) {
  return state.usedOptions[cellIndex] || [];
}

function getQuestionExplanation(questionId) {
  return QUIZ_EXPLANATIONS[questionId] || "";
}

function maybePrepareAttackChance() {
  if (state.attackChanceUsed || state.attackChanceReady || state.pendingStealTeamId) return;
  if (isGameEnded()) return;
  if (getResolvedCount() !== ATTACK_CHANCE_TRIGGER_COUNT) return;

  state.attackChanceReady = true;
  setLogEntry("17問終了。アタックチャンスが発生しました。");
  render();
}

function startBonusQuestion() {
  if (!state.attackChanceReady || state.attackChanceUsed) return;

  state.attackChanceReady = false;
  state.bonusModalOpen = true;
  state.bonusStep = "question";
  state.bonusSelectedOption = null;
  render();
  showModal();
}

function prepareCollapseStart() {
  state.collapseReady = getAllWinners().length > 0;
  render();
}

function answerQuestion(optionIndex) {
  state.selectedOption = optionIndex;
  const cellIndex = state.modalCellIndex;
  const modalCell = cellIndex !== null ? state.board[cellIndex] : null;
  if (!modalCell) return;

  state.attempts[cellIndex] = (state.attempts[cellIndex] || 0) + 1;
  if (!state.usedOptions[cellIndex]) {
    state.usedOptions[cellIndex] = [];
  }
  state.usedOptions[cellIndex].push(optionIndex);

  const attemptCount = state.attempts[cellIndex];

  if (optionIndex === modalCell.correctIndex) {
    state.pendingAssignment = {
      cellIndex: cellIndex,
      selectedOption: optionIndex,
      questionId: modalCell.id,
      category: modalCell.category,
      question: modalCell.question,
    };
    setLogEntry(`${modalCell.id}番：正解（${attemptCount}回目）。A/B/C/Dキーで獲得チームを選択してください。`);
    state.step = "correct";
    render();
    return;
  }

  if (attemptCount >= MAX_ATTEMPTS) {
    state.step = "result";
  } else {
    state.step = "wrong";
  }
  renderModal();
}

function answerBonusQuestion(optionIndex) {
  state.bonusSelectedOption = optionIndex;

  if (optionIndex === BONUS_QUESTION.correctIndex) {
    state.pendingAssignment = {
      type: "bonusSteal",
      selectedOption: optionIndex,
      questionId: "アタックチャンス",
      category: BONUS_QUESTION.category,
      question: BONUS_QUESTION.question,
    };
    state.bonusStep = "correct";
    setLogEntry("アタックチャンス正解。A/B/C/Dキーで正解チームを選択してください。");
    render();
    return;
  }

  state.attackChanceUsed = true;
  state.bonusStep = "wrong";
  setLogEntry("アタックチャンス不正解。アタックチャンスは終了しました。");
  renderModal();
}

function commitMiss() {
  const modalCell = state.modalCellIndex !== null ? state.board[state.modalCellIndex] : null;
  if (!modalCell) return;

  state.history.push(cloneHistoryEntry());
  state.board = state.board.map((cell, index) => (
    index === state.modalCellIndex
      ? { ...cell, status: "missed", owner: null, selectedOption: state.selectedOption }
      : { ...cell }
  ));
  setLogEntry(`${modalCell.id}番：${MAX_ATTEMPTS}回不正解。灰色パネルとして固定。`);
  closeModal();

  if (isGameEnded()) {
    prepareCollapseStart();
  } else {
    maybePrepareAttackChance();
  }
}

function retryQuestion() {
  state.step = "question";
  state.selectedOption = null;
  renderModal();
}

function assignToTeam(teamId) {
  if (state.pendingAssignment?.type === "bonusSteal") {
    state.pendingStealTeamId = teamId;
    state.pendingAssignment = null;
    state.attackChanceUsed = true;
    closeModal();
    const teamName = getTeamLookup()[teamId]?.name ?? teamId;
    setLogEntry(`アタックチャンス：${teamName}が奪うマスを選択します。`);
    render();
    return;
  }

  const sourceIndex = state.pendingAssignment?.cellIndex ?? state.modalCellIndex;
  const assignmentCell = sourceIndex !== null ? state.board[sourceIndex] : null;
  const answerIndex = state.pendingAssignment?.selectedOption ?? state.selectedOption;
  if (sourceIndex === null || !assignmentCell) return;

  state.history.push(cloneHistoryEntry());

  const prepared = state.board.map((cell, index) => (
    index === sourceIndex
      ? { ...cell, selectedOption: answerIndex, status: "claimed", owner: teamId }
      : { ...cell }
  ));

  const { next, flipped, flips } = applyOthelloCapture(prepared, sourceIndex, teamId);
  const teamLookup = getTeamLookup();
  const teamName = teamLookup[teamId]?.name ?? teamId;

  state.board = next;
  state.pendingAssignment = null;
  startFlipAnimations(flips);
  setLogEntry(`${assignmentCell.id}番：${teamName}が獲得。${flipped > 0 ? `${flipped}マス反転。` : "反転なし。"}`);
  closeModal();

  if (isGameEnded()) {
    prepareCollapseStart();
  } else {
    maybePrepareAttackChance();
  }
}

function stealCell(index) {
  const targetCell = state.board[index];
  const teamId = state.pendingStealTeamId;
  if (!teamId || !targetCell || targetCell.status !== "claimed" || targetCell.owner === teamId) return;

  state.history.push(cloneHistoryEntry());

  const prepared = state.board.map((cell, cellIndex) => (
    cellIndex === index
      ? { ...cell, owner: teamId }
      : { ...cell }
  ));
  const { next, flipped, flips } = applyOthelloCapture(prepared, index, teamId);
  const teamName = getTeamLookup()[teamId]?.name ?? teamId;

  state.board = next;
  state.pendingStealTeamId = null;
  startFlipAnimations(flips);
  setLogEntry(`アタックチャンス：${teamName}が${targetCell.id}番を奪取。${flipped > 0 ? `${flipped}マス反転。` : "反転なし。"}`);
  render();
}

// --- 崩れ落ち演出 ---
function triggerCollapseAnimation() {
  const winnerIds = getWinnerIds();
  if (!isGameEnded() || winnerIds.length === 0 || state.collapseAnimating || state.collapseFinished) return;

  state.collapseReady = false;
  state.collapseAnimating = true;
  render();

  const buttons = els.boardGrid.querySelectorAll(".cell-button");
  const collapseTargets = [];

  buttons.forEach((button) => {
    const cellIndex = Number(button.dataset.cellIndex);
    const cell = state.board[cellIndex];

    if (cell.status === "missed") return;
    if (cell.status === "claimed" && winnerIds.includes(cell.owner)) return;

    collapseTargets.push({ button, cellIndex });
  });

  collapseTargets.forEach((target) => {
    const row = Math.floor(target.cellIndex / BOARD_SIZE);
    const delay = (BOARD_SIZE - 1 - row) * 150 + Math.random() * 100;
    const face = target.button.querySelector(".cell-face");
    if (face) {
      const rotateDir = Math.random() > 0.5 ? 1 : -1;
      const rotateDeg = 15 + Math.random() * 30;
      const translateX = (Math.random() - 0.5) * 60;

      setTimeout(() => {
        face.style.setProperty("--collapse-rotate", `${rotateDir * rotateDeg}deg`);
        face.style.setProperty("--collapse-tx", `${translateX}px`);
        face.classList.add("cell-collapse");
      }, delay);
    }
  });

  const maxDelay = (BOARD_SIZE - 1) * 150 + 100 + 1500;
  setTimeout(() => {
    state.collapseAnimating = false;
    state.collapseFinished = true;
    render();
    // 崩れ落ち完了後、優勝マスを透明にして画像を表示
    setTimeout(() => revealWinnerImage(), 300);
  }, maxDelay);
}

// --- 崩れ落ち完了後に優勝マスを透明にして背景画像を見せる ---
function revealWinnerImage() {
  // 優勝マスのセルだけ透明にし、背景のvideo要素が透けて見えるようにする
  // board-artに穴を開けて、優勝マスの位置だけvideoが見えるようにする
  const buttons = els.boardGrid.querySelectorAll(".cell-button");
  const winnerIds = getWinnerIds();

  // board-artにCSS maskを適用して優勝マス位置を穴あきにする
  applyBoardArtMask(winnerIds);

  let delay = 0;
  buttons.forEach((button) => {
    const cellIndex = Number(button.dataset.cellIndex);
    const cell = state.board[cellIndex];

    if (cell.status === "claimed" && winnerIds.includes(cell.owner)) {
      const face = button.querySelector(".cell-face");
      if (face) {
        setTimeout(() => {
          face.classList.add("cell-transparent");
        }, delay);
        delay += 100;
      }
    }
  });
}

function applyBoardArtMask(winnerIds) {
  // board-artにCSS maskを適用し、優勝マスの位置を透明にする
  // これにより優勝マス位置ではboard-imageのvideoが見える
  const rects = [];
  const cellPercent = 100 / BOARD_SIZE; // 20%
  const gap = 1; // gap分の余白（%）

  state.board.forEach((cell, index) => {
    if (cell.status === "claimed" && winnerIds.includes(cell.owner)) {
      const row = Math.floor(index / BOARD_SIZE);
      const col = index % BOARD_SIZE;
      const x = col * cellPercent + gap / 2;
      const y = row * cellPercent + gap / 2;
      const w = cellPercent - gap;
      const h = cellPercent - gap;
      rects.push({ x, y, w, h });
    }
  });

  // Render the SVG with real transparent holes so WebKit/Chromium alpha masks work.
  let svgMask = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">`;
  svgMask += `<defs><mask id="winner-holes" maskUnits="userSpaceOnUse">`;
  svgMask += `<rect width="100" height="100" fill="white"/>`;
  rects.forEach(r => {
    svgMask += `<rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" rx="2" fill="black"/>`;
  });
  svgMask += `</mask></defs>`;
  svgMask += `<rect width="100" height="100" fill="white" mask="url(#winner-holes)"/>`;
  svgMask += `</svg>`;

  const encoded = encodeURIComponent(svgMask);
  const maskUrl = `url("data:image/svg+xml,${encoded}")`;

  els.boardArt.style.maskImage = maskUrl;
  els.boardArt.style.webkitMaskImage = maskUrl;
  els.boardArt.style.maskSize = "100% 100%";
  els.boardArt.style.webkitMaskSize = "100% 100%";
  els.boardArt.style.maskRepeat = "no-repeat";
  els.boardArt.style.webkitMaskRepeat = "no-repeat";
}

function resetGame() {
  clearFlipAnimations();
  state.board = createInitialBoard();
  state.modalCellIndex = null;
  state.step = "question";
  state.selectedOption = null;
  state.history = [];
  state.pendingAssignment = null;
  state.pendingStealTeamId = null;
  state.attackChanceReady = false;
  state.attackChanceUsed = false;
  state.bonusModalOpen = false;
  state.bonusStep = "question";
  state.bonusSelectedOption = null;
  state.collapseReady = false;
  state.collapseAnimating = false;
  state.collapseFinished = false;
  state.attempts = {};
  state.usedOptions = {};
  state.log = ["ゲームをリセットしました。"];
  if (els.boardArt) {
    els.boardArt.classList.remove("art-hidden");
    els.boardArt.style.maskImage = "";
    els.boardArt.style.webkitMaskImage = "";
  }
  hideModal();
  render();
}

function undoLast() {
  if (state.history.length === 0) return;
  if (state.collapseAnimating) return;
  if (state.flipAnimating) return;
  clearFlipAnimations();
  const latest = state.history.pop();
  state.board = cloneBoard(latest.board);
  state.log = [...latest.log];
  state.pendingAssignment = clonePendingAssignment(latest.pendingAssignment);
  state.pendingStealTeamId = latest.pendingStealTeamId;
  state.attackChanceReady = latest.attackChanceReady;
  state.attackChanceUsed = latest.attackChanceUsed;
  state.bonusModalOpen = latest.bonusModalOpen;
  state.bonusStep = latest.bonusStep;
  state.bonusSelectedOption = latest.bonusSelectedOption;
  state.attempts = { ...latest.attempts };
  state.usedOptions = JSON.parse(JSON.stringify(latest.usedOptions));
  state.modalCellIndex = null;
  state.step = "question";
  state.selectedOption = null;
  state.collapseReady = false;
  state.collapseAnimating = false;
  state.collapseFinished = false;
  if (els.boardArt) {
    els.boardArt.classList.remove("art-hidden");
    els.boardArt.style.maskImage = "";
    els.boardArt.style.webkitMaskImage = "";
  }
  hideModal();
  render();
}

function renderTeamNameInputs() {
  const teams = getTeams();
  const { counts, topCount } = getWinners();
  const missedCount = state.board.filter((cell) => cell.status === "missed").length;
  const gameEnded = isGameEnded();

  els.teamNameGrid.innerHTML = teams.map((team, index) => {
    const isTop = counts[team.id] === topCount && topCount > 0;
    const cardBg = isTop
      ? `linear-gradient(135deg, ${team.soft}, rgba(255,255,255,0.05))`
      : "rgba(0, 0, 0, 0.15)";
    const cardBorder = isTop ? team.border : "rgba(255, 255, 255, 0.1)";
    return `
    <label class="team-name-card ${isTop ? 'is-top-card' : ''}" style="background:${cardBg}; border-color:${cardBorder};">
      <div class="team-name-top">
        <div class="team-name-label-row">
          <span class="color-dot" style="background:${team.color}; ${isTop ? `box-shadow:0 0 12px ${team.color};` : ''}"></span>
          <span>TEAM ${index + 1}</span>
        </div>
        <span class="team-name-score ${isTop ? 'score-highlight' : ''}">${counts[team.id]}</span>
      </div>
      <input
        class="team-name-input"
        type="text"
        value="${escapeHtml(team.name)}"
        data-team-index="${index}"
        autocomplete="off"
        spellcheck="false"
      />
      ${isTop ? '<div class="team-top-badge">TOP</div>' : ''}
    </label>
  `;
  }).join("") + `
    <label class="team-name-card team-missed-card">
      <div class="team-name-top">
        <div class="team-name-label-row">
          <span class="color-dot" style="background:#64748b;"></span>
          <span>MISS</span>
        </div>
        <span class="team-name-score">${missedCount}</span>
      </div>
      <div class="team-missed-label">不正解パネル</div>
    </label>
  `;

  els.teamNameGrid.querySelectorAll(".team-name-input").forEach((input) => {
    input.addEventListener("input", (event) => {
      const teamIndex = Number(event.currentTarget.dataset.teamIndex);
      state.teamNames[teamIndex] = event.currentTarget.value;
      renderBoard();
      renderWinnerOverlay();
      renderModal();
    });

    input.addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;

      event.preventDefault();
      const inputs = [...els.teamNameGrid.querySelectorAll(".team-name-input")];
      const currentIndex = inputs.indexOf(event.currentTarget);
      const nextInput = inputs[currentIndex + 1] ?? inputs[0];
      nextInput.focus();
      nextInput.select();
    });
  });
}

function renderBoard() {
  const teamLookup = getTeamLookup();
  const pendingCell = getPendingCell();
  const gameEnded = isGameEnded();

  const winnerIdsForCollapse = gameEnded ? getWinnerIds() : [];

  els.boardGrid.innerHTML = state.board.map((cell, index) => {
    const isPending = pendingCell && pendingCell.index === index;

    if (state.collapseFinished && cell.status === "claimed" && !winnerIdsForCollapse.includes(cell.owner)) {
      return `
        <button class="cell-button" type="button" data-cell-index="${index}" disabled>
          <div class="cell-face cell-hidden" style="opacity:0; pointer-events:none;"></div>
        </button>
      `;
    }

    if (cell.status === "claimed") {
      const team = teamLookup[cell.owner];
      const revealArt = gameEnded && winnerIdsForCollapse.includes(cell.owner);
      const isRevealedImage = state.collapseFinished && revealArt;
      const canStealTarget = Boolean(state.pendingStealTeamId && cell.owner !== state.pendingStealTeamId);
      const flipAnimation = state.flipAnimations.find((animation) => animation.index === index);
      const fromTeam = flipAnimation ? teamLookup[flipAnimation.fromOwner] : null;
      const flipClass = fromTeam && !isRevealedImage ? "cell-flip" : "";
      const flipStyle = flipClass
        ? `--flip-from:${fromTeam.color}; --flip-to:${team.color}; --flip-border-from:${fromTeam.border}; --flip-border-to:${team.border}; --flip-delay:${flipAnimation.delay}ms;`
        : "";

      // 崩れ落ち完了後の優勝マス：透明にしてvideoを見せる
      let faceStyle = "";
      if (isRevealedImage) {
        faceStyle = `${flipStyle} background:transparent; border-color:rgba(255,255,255,0.55); box-shadow:inset 0 0 0 1px rgba(255,255,255,0.08);`;
      } else if (revealArt) {
        faceStyle = `${flipStyle} background:rgba(255,255,255,0.02); border-color:rgba(255,255,255,0.55); box-shadow:inset 0 0 0 1px rgba(255,255,255,0.08);`;
      } else {
        faceStyle = `${flipStyle} background:${team.color}; border-color:${team.border}; box-shadow:inset 0 0 0 1px ${team.border};`;
      }

      return `
        <button class="cell-button" type="button" data-cell-index="${index}" ${canStealTarget ? "" : "disabled"}>
          <div class="cell-face cell-claimed ${revealArt ? "cell-reveal" : ""} ${isRevealedImage ? "cell-transparent" : ""} ${isPending ? "pending-highlight" : ""} ${canStealTarget ? "steal-target" : ""} ${flipClass}" style="${faceStyle}">
            ${isRevealedImage ? "" : `<div class="cell-owned-label">OWNED</div>
            <div class="cell-owned-team">${escapeHtml(team.name)}</div>
            <div class="cell-number">${cell.id}</div>`}
          </div>
        </button>
      `;
    }

    if (cell.status === "missed") {
      return `
        <button class="cell-button" type="button" data-cell-index="${index}" disabled>
          <div class="cell-face cell-missed ${isPending ? "pending-highlight" : ""}">
            <div class="no-point-mark">\u00d7</div>
            <div class="no-point-label">NO POINT</div>
            <div class="cell-number" style="font-size:0.8rem; margin-top:2px; opacity:0.6;">${cell.id}</div>
          </div>
        </button>
      `;
    }

    const attemptCount = getAttemptCount(index);
    const attemptBadge = attemptCount > 0
      ? `<div class="cell-attempt-badge">${attemptCount}/${MAX_ATTEMPTS}</div>`
      : "";

    return `
      <button class="cell-button" type="button" data-cell-index="${index}" ${state.pendingAssignment || state.pendingStealTeamId || state.attackChanceReady || state.collapseAnimating || state.flipAnimating ? "disabled" : ""}>
        <div class="cell-face cell-hidden ${isPending ? "pending-highlight" : ""} ${attemptCount > 0 ? "cell-attempted" : ""}">
          <div class="cell-kicker">QUIZ</div>
          <div class="cell-number">${cell.id}</div>
          ${attemptBadge}
        </div>
      </button>
    `;
  }).join("");

  els.boardGrid.querySelectorAll(".cell-button").forEach((button) => {
    if (button.disabled) return;
    button.addEventListener("click", () => {
      const cellIndex = Number(button.dataset.cellIndex);
      if (state.pendingStealTeamId) {
        stealCell(cellIndex);
        return;
      }
      openCell(cellIndex);
    });
  });
}

/* renderScore は廃止 - スコアはチーム紹介欄に統合済み */
/*
function renderScore_REMOVED() {
  const teams = getTeams();
  const { counts, topCount } = getWinners();
  const missedCount = state.board.filter((cell) => cell.status === "missed").length;

  els.scoreGrid.innerHTML = teams.map((team) => {
    const isTop = counts[team.id] === topCount && topCount > 0;
    return `
      <article class="score-card ${isTop ? "is-top" : ""}" style="background:${isTop ? `linear-gradient(135deg, ${team.soft}, rgba(255,255,255,0.05))` : "rgba(255,255,255,0.04)"}; border-color:${isTop ? team.border : "rgba(255,255,255,0.12)"};">
        <div class="score-row">
          <div class="score-team-box">
            <div class="team-name-top" style="margin-bottom:0;">
              <span class="color-dot" style="background:${team.color}; box-shadow:0 0 18px ${team.color};"></span>
              <div>
                <div class="score-team-title">${escapeHtml(team.name)}</div>
                <div class="score-team-sub">獲得マス</div>
              </div>
            </div>
          </div>
          <div class="score-value">${counts[team.id]}</div>
        </div>
        ${isTop ? `<div class="score-top-label">トップ</div>` : ""}
      </article>
    `;
  }).join("") + `
    <article class="score-card" style="background:rgba(100,116,139,0.12); border-color:rgba(148,163,184,0.3);">
      <div class="score-row">
        <div class="score-team-box">
          <div class="team-name-top" style="margin-bottom:0;">
            <span class="color-dot" style="background:#64748b;"></span>
            <div>
              <div class="score-team-title">不正解</div>
              <div class="score-team-sub">固定パネル</div>
            </div>
          </div>
        </div>
        <div class="score-value">${missedCount}</div>
      </div>
    </article>
  `;
}
*/

function renderAttackChanceOverlay() {
  if (!els.attackChanceOverlay) return;

  if (!state.attackChanceReady) {
    els.attackChanceOverlay.classList.add("hidden");
    els.attackChanceOverlay.setAttribute("aria-hidden", "true");
    els.attackChanceOverlay.innerHTML = "";
    return;
  }

  els.attackChanceOverlay.classList.remove("hidden");
  els.attackChanceOverlay.setAttribute("aria-hidden", "false");
  els.attackChanceOverlay.innerHTML = `
    <div class="attack-chance-card" role="button" tabindex="0">
      <img class="attack-chance-avatar" src="image.png" alt="" />
      <div class="attack-chance-kicker">17問終了</div>
      <div class="attack-chance-title">アタックチャンス</div>
      <div class="attack-chance-hint">左クリックでボーナス問題へ</div>
    </div>
  `;
}

function renderWinnerOverlay() {
  if (!els.winnerOverlay) return;

  const winners = getAllWinners();
  if (!state.collapseReady || winners.length === 0) {
    els.winnerOverlay.classList.add("hidden");
    els.winnerOverlay.setAttribute("aria-hidden", "true");
    els.winnerOverlay.innerHTML = "";
    return;
  }

  const isTie = winners.length > 1;
  const winnerNames = winners.map((winner) => escapeHtml(winner.name)).join(" / ");
  els.winnerOverlay.classList.remove("hidden");
  els.winnerOverlay.setAttribute("aria-hidden", "false");
  els.winnerOverlay.innerHTML = `
    <div class="winner-announcement" role="button" tabindex="0">
      <div class="winner-label">${isTie ? "同点優勝" : "優勝"}</div>
      <div class="winner-name">${winnerNames}</div>
      <div class="winner-hint">左クリックでマスを落とす</div>
    </div>
  `;
}

function renderBonusModal() {
  els.modalLabel.textContent = "ATTACK CHANCE";
  els.modalCategory.textContent = BONUS_QUESTION.category;
  els.modalTitle.textContent = BONUS_QUESTION.question;

  const reveal = state.bonusStep === "correct" || state.bonusStep === "wrong";
  els.modalOptions.innerHTML = BONUS_QUESTION.options.map((option, index) => {
    const selected = state.bonusSelectedOption === index;
    const isCorrect = BONUS_QUESTION.correctIndex === index;

    let border = "rgba(255,255,255,0.1)";
    let background = "rgba(255,255,255,0.04)";

    if (reveal && isCorrect) {
      border = "rgba(134,239,172,0.8)";
      background = "rgba(34,197,94,0.16)";
    } else if (reveal && selected && !isCorrect) {
      border = "rgba(252,165,165,0.75)";
      background = "rgba(239,68,68,0.16)";
    }

    return `
      <button class="option-btn" type="button" data-option-index="${index}" disabled style="border-color:${border}; background:${background};">
        <div class="option-row">
          <span class="option-letter">${index + 1}</span>
          <span>${escapeHtml(option)}</span>
        </div>
      </button>
    `;
  }).join("");

  els.modalExplanation.classList.add("hidden");
  els.modalExplanation.innerHTML = "";

  if (state.bonusStep === "correct") {
    els.modalResultBar.classList.remove("hidden");
    els.modalResultBar.classList.add("result-bar-correct");
    els.modalResultBar.innerHTML = `
      <div>
        <div class="correct-title">正解</div>
        <div class="result-desc">A/B/C/Dキーで正解チームを選択してください。</div>
      </div>
    `;
  } else if (state.bonusStep === "wrong") {
    els.modalResultBar.classList.remove("hidden");
    els.modalResultBar.classList.remove("result-bar-correct");
    els.modalResultBar.innerHTML = `
      <div>
        <div class="result-title">不正解</div>
        <div class="result-desc">アタックチャンスは終了です。</div>
      </div>
      <button id="closeBonusBtn" class="btn btn-secondary" type="button">閉じる</button>
    `;
    document.getElementById("closeBonusBtn").addEventListener("click", closeModal);
  } else {
    els.modalResultBar.classList.add("hidden");
    els.modalResultBar.classList.remove("result-bar-correct");
    els.modalResultBar.innerHTML = "";
  }
}

function renderModal() {
  if (state.bonusModalOpen) {
    renderBonusModal();
    return;
  }

  const modalCell = state.modalCellIndex !== null ? state.board[state.modalCellIndex] : null;
  if (!modalCell) {
    hideModal();
    return;
  }

  const cellIndex = state.modalCellIndex;
  const attemptCount = getAttemptCount(cellIndex);
  const usedOpts = getUsedOptions(cellIndex);
  const remaining = MAX_ATTEMPTS - attemptCount;

  els.modalLabel.textContent = `QUESTION ${modalCell.id}`;
  els.modalCategory.textContent = modalCell.category;

  // 正解時は問題文エリアを派手な演出に差し替える
  if (state.step === "correct") {
    els.modalTitle.innerHTML = `
      <div class="correct-display">
        <div class="correct-display-main">正解</div>

      </div>
    `;
    startPetalAnimation();
  } else {
    els.modalTitle.textContent = modalCell.question;
  }

  const attemptInfoHtml = `<div class="modal-attempt-info">回答権：<span class="attempt-remaining ${remaining <= 1 ? "attempt-danger" : ""}">${remaining}</span> / ${MAX_ATTEMPTS}</div>`;

  els.modalOptions.innerHTML = attemptInfoHtml + modalCell.options.map((option, index) => {
    const selected = state.selectedOption === index;
    const isCorrect = modalCell.correctIndex === index;
    const isUsed = usedOpts.includes(index);
    const reveal = state.step === "result" || state.step === "correct";

    let border = "rgba(255,255,255,0.1)";
    let background = "rgba(255,255,255,0.04)";

    if (reveal && isCorrect) {
      border = "rgba(134,239,172,0.8)";
      background = "rgba(34,197,94,0.16)";
    } else if ((reveal || state.step === "wrong") && selected && !isCorrect) {
      border = "rgba(252,165,165,0.75)";
      background = "rgba(239,68,68,0.16)";
    } else if (selected) {
      border = "rgba(125,211,252,0.8)";
      background = "rgba(14,165,233,0.16)";
    }

    if (state.step === "question" && isUsed) {
      border = "rgba(255,255,255,0.06)";
      background = "rgba(239,68,68,0.06)";
    }

    return `
      <button class="option-btn ${isUsed && state.step === "question" ? "option-used" : ""}" type="button" data-option-index="${index}" disabled style="border-color:${border}; background:${background};">
        <div class="option-row">
          <span class="option-letter">${index + 1}</span>
          <span>${escapeHtml(option)}</span>
          ${isUsed && state.step === "question" ? '<span class="option-used-mark">\u2716</span>' : ""}
        </div>
      </button>
    `;
  }).join("");

  if (state.step === "result" || state.step === "correct") {
    const explanation = getQuestionExplanation(modalCell.id);
    els.modalExplanation.classList.remove("hidden");
    els.modalExplanation.innerHTML = `
      <div class="assignment-meta" style="color: var(--text-sub); letter-spacing:0.2em;">解説</div>
      <div style="margin-top:8px;">${escapeHtml(explanation)}</div>
    `;
  } else {
    els.modalExplanation.classList.add("hidden");
    els.modalExplanation.innerHTML = "";
  }

  if (state.step === "correct") {
    els.modalResultBar.classList.add("hidden");
    els.modalResultBar.classList.remove("result-bar-correct");
    els.modalResultBar.innerHTML = "";
  } else if (state.step === "result") {
    els.modalResultBar.classList.remove("hidden");
    els.modalResultBar.classList.remove("result-bar-correct");
    els.modalResultBar.innerHTML = `
      <div>
        <div class="result-title">${MAX_ATTEMPTS}回不正解</div>
        <div class="result-desc">このマスは灰色の不正解パネルとして固定されます。</div>
      </div>
      <button id="commitMissBtn" class="btn btn-danger" type="button">確定する</button>
    `;
    document.getElementById("commitMissBtn").addEventListener("click", commitMiss);
  } else if (state.step === "wrong") {
    els.modalResultBar.classList.remove("hidden");
    els.modalResultBar.classList.remove("result-bar-correct");
    els.modalResultBar.innerHTML = `
      <div>
        <div class="result-title">不正解</div>
        <div class="result-desc">残り回答権：${remaining} 回。もう一度挑戦できます。</div>
      </div>
      <button id="retryBtn" class="btn btn-retry" type="button">もう一度挑戦</button>
    `;
    document.getElementById("retryBtn").addEventListener("click", retryQuestion);
  } else {
    els.modalResultBar.classList.add("hidden");
    els.modalResultBar.classList.remove("result-bar-correct");
    els.modalResultBar.innerHTML = "";
  }
}

function showModal() {
  els.modalOverlay.classList.remove("hidden");
  els.modalOverlay.setAttribute("aria-hidden", "false");
  renderModal();
}

function hideModal() {
  els.modalOverlay.classList.add("hidden");
  els.modalOverlay.setAttribute("aria-hidden", "true");
}

function render() {
  renderTeamNameInputs();
  renderBoard();
  renderAttackChanceOverlay();
  renderWinnerOverlay();
  els.undoBtn.disabled = state.history.length === 0 || state.collapseAnimating || state.flipAnimating;
  renderModal();

  // collapseFinished時はboard-artのmaskを再適用
  if (state.collapseFinished) {
    const winnerIds = getWinnerIds();
    if (winnerIds.length > 0) {
      applyBoardArtMask(winnerIds);
    }
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isEditableTarget(target) {
  return Boolean(
    target?.closest?.("input, textarea, select, [contenteditable='true']")
  );
}

function getOptionIndexFromKey(event) {
  if (/^[1-4]$/.test(event.key)) {
    return Number(event.key) - 1;
  }

  const numpadMatch = (event.code || "").match(/^Numpad([1-4])$/);
  return numpadMatch ? Number(numpadMatch[1]) - 1 : null;
}

function getTeamIdFromKey(event) {
  const teamIndex = TEAM_KEYS.indexOf(event.key.toLowerCase());
  return teamIndex === -1 ? null : TEAM_DEFS[teamIndex]?.id ?? null;
}

function handleKeyboardAnswer(event) {
  const optionIndex = getOptionIndexFromKey(event);
  if (optionIndex === null) return false;

  if (state.bonusModalOpen) {
    if (state.bonusStep !== "question") return false;
    event.preventDefault();
    answerBonusQuestion(optionIndex);
    return true;
  }

  if (els.modalOverlay.classList.contains("hidden") || state.modalCellIndex === null) {
    return false;
  }

  if (state.step !== "question" && state.step !== "wrong") {
    return false;
  }

  const usedOpts = getUsedOptions(state.modalCellIndex);
  event.preventDefault();
  if (usedOpts.includes(optionIndex)) {
    return true;
  }

  if (state.step === "wrong") {
    state.step = "question";
    state.selectedOption = null;
  }

  answerQuestion(optionIndex);
  return true;
}

function handleKeyboardTeamAssignment(event) {
  const teamId = getTeamIdFromKey(event);
  if (!teamId || !state.pendingAssignment) return false;

  event.preventDefault();
  assignToTeam(teamId);
  return true;
}

function wireEvents() {
  els.resetBtn.addEventListener("click", resetGame);
  els.undoBtn.addEventListener("click", undoLast);
  els.closeModalBtn.addEventListener("click", closeModal);

  els.attackChanceOverlay.addEventListener("click", (event) => {
    if (event.button !== 0) return;
    startBonusQuestion();
  });

  els.attackChanceOverlay.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      startBonusQuestion();
    }
  });

  els.winnerOverlay.addEventListener("click", (event) => {
    if (event.button !== 0) return;
    triggerCollapseAnimation();
  });

  els.winnerOverlay.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      triggerCollapseAnimation();
    }
  });

  els.modalOverlay.addEventListener("click", (event) => {
    if (event.target === els.modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !els.modalOverlay.classList.contains("hidden")) {
      closeModal();
      return;
    }

    if (isEditableTarget(event.target)) {
      return;
    }

    if (handleKeyboardAnswer(event)) return;
    handleKeyboardTeamAssignment(event);
  });
}

// ===== 花びら（confetti）アニメーション =====
const petalCanvas = document.getElementById("petalCanvas");
const petalCtx = petalCanvas ? petalCanvas.getContext("2d") : null;
let petalAnimId = null;
let petals = [];

const PETAL_COLORS = [
  "#fde68a", "#fbbf24", "#f472b6", "#fb7185", "#a78bfa",
  "#60a5fa", "#34d399", "#f9a8d4", "#c4b5fd", "#6ee7b7",
  "#fff",    "#fca5a5", "#fdba74", "#86efac", "#93c5fd",
];

function resizePetalCanvas() {
  if (!petalCanvas) return;
  petalCanvas.width = window.innerWidth;
  petalCanvas.height = window.innerHeight;
}

function createPetal() {
  return {
    x: Math.random() * (petalCanvas ? petalCanvas.width : window.innerWidth),
    y: -20 - Math.random() * 60,
    w: 8 + Math.random() * 14,
    h: 4 + Math.random() * 8,
    color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.18,
    vx: (Math.random() - 0.5) * 3.5,
    vy: 2.5 + Math.random() * 3.5,
    opacity: 0.85 + Math.random() * 0.15,
    wobble: Math.random() * Math.PI * 2,
    wobbleSpeed: 0.04 + Math.random() * 0.04,
  };
}

function drawPetal(ctx, p) {
  ctx.save();
  ctx.globalAlpha = p.opacity;
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rotation);
  ctx.fillStyle = p.color;
  ctx.beginPath();
  ctx.ellipse(0, 0, p.w / 2, p.h / 2, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function animatePetals() {
  if (!petalCanvas || !petalCtx) return;
  petalCtx.clearRect(0, 0, petalCanvas.width, petalCanvas.height);

  // 新しい花びらを補充（最大 120枚）
  if (petals.length < 120) {
    const burst = Math.min(4, 120 - petals.length);
    for (let i = 0; i < burst; i++) {
      petals.push(createPetal());
    }
  }

  petals.forEach((p) => {
    p.wobble += p.wobbleSpeed;
    p.x += p.vx + Math.sin(p.wobble) * 1.2;
    p.y += p.vy;
    p.rotation += p.rotationSpeed;
    drawPetal(petalCtx, p);
  });

  // 画面外に出た花びらを削除
  petals = petals.filter((p) => p.y < petalCanvas.height + 40);

  petalAnimId = requestAnimationFrame(animatePetals);
}

function startPetalAnimation() {
  if (!petalCanvas || !petalCtx) return;
  if (petalAnimId) return; // 既に走行中なら再起動しない
  resizePetalCanvas();
  petals = [];
  // 最初のバースト発射
  for (let i = 0; i < 60; i++) {
    const p = createPetal();
    p.y = Math.random() * (petalCanvas.height * 0.5); // 画面内から少し山側に分散
    petals.push(p);
  }
  petalAnimId = requestAnimationFrame(animatePetals);
}

function stopPetalAnimation() {
  if (petalAnimId) {
    cancelAnimationFrame(petalAnimId);
    petalAnimId = null;
  }
  petals = [];
  if (petalCanvas && petalCtx) {
    petalCtx.clearRect(0, 0, petalCanvas.width, petalCanvas.height);
  }
}

window.addEventListener("resize", () => {
  if (petalAnimId) resizePetalCanvas();
});
// ===== END 花びらアニメーション =====

function init() {
  state.board = createInitialBoard();
  wireEvents();
  render();
}

init();
