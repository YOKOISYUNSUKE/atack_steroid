const BOARD_SIZE = 5;
const MAX_ATTEMPTS = 3;
const ATTACK_CHANCE_TRIGGER_COUNT = 17;
const ATTACK_CHANCE_INTERVAL_MS = 3000;
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
  { id: 1, category: "電解質", question: "ステロイド服用中に「カリウム」が低下しやすい理由として正しいのは？", options: ["便へのカリウム排泄が促進されるため", "カリウムの腸管吸収が完全に停止するため", "尿中へのカリウム排泄が促進されるため", "カリウムが骨に過剰に沈着するため"], correctIndex: 2 },
  { id: 2, category: "減量", question: "ステロイドの減量おいて、最もゆっくり減らすべき期間は？", options: ["生理的必要量（プレドニゾロン 5-7.5mg 相当）付近の減量時", "投与初期の減量時", "症状が完全に消失した直後", "服薬を開始して1週間以内"], correctIndex: 0 },
  { id: 3, category: "副腎不全", question: "ステロイドの急激な中断によって起こる「急性副腎不全」の症状は？", options: ["急激な高血圧", "一過性の食欲増進", "無症状で経過することが多い", "ショック状態（低血圧、頻脈、嘔吐など）"], correctIndex: 3 },
  { id: 4, category: "患者指導", question: "患者指導において、最も効果的なアプローチはどれですか？", options: ["副作用の恐ろしさを強調して服薬を守らせる", "「副作用は予測と対策が可能」とつたえ、受診の必要な点を共有する", "副作用については不安を避けるため説明しない", "服薬管理は患者本人だけに任せる"], correctIndex: 1 },
  { id: 5, category: "高血圧", question: "ステロイドによる高血圧への対策として、最も適切なのは？", options: ["塩分制限の指導と適切な降圧薬の使用", "ステロイドを飲む前に血圧を測り、高いときは飲まない", "水分摂取を完全に制限する", "血圧が上がっても経過観察のみとする"], correctIndex: 0 },
  { id: 6, category: "服薬管理", question: "薬の飲み忘れに気づいた時、どうするのが正解ですか？", options: ["忘れた分をまとめて次回に倍量飲む", "その日以降の薬をすべて中止する", "気づいた時点で1回分を服用し、次回からは通常通りにする", "次回から自己判断で半量にする"], correctIndex: 2 },
  { id: 7, category: "服用時間", question: "プレドニゾロン錠を朝食後に服用する理由として最も適切なのは？", options: ["空腹時の胃腸障害を軽減するため", "夜間の血糖値を必ず下げるため", "腎機能を直接改善するため", "生理的なコルチゾール分泌リズムに合わせるため"], correctIndex: 3 },
  { id: 8, category: "相互作用", question: "ステロイド服用中の患者がNSAIDsを併用する際、最も警戒すべきリスクは？", options: ["腎機能障害", "消化性潰瘍", "視力の急激な改善", "カリウムの急激な上昇"], correctIndex: 1 },
  { id: 9, category: "減量", question: "ステロイドの「退薬徴候」と「リバウンド」の違いで正しいのは？", options: ["退薬徴候は原疾患の悪化、リバウンドは副腎不全症状", "退薬徴候もリバウンドも薬剤アレルギーのことである", "退薬徴候は離脱に伴う副腎不全症状、リバウンドは原疾患の悪化", "退薬徴候もリバウンドも感染症の悪化のみを指す"], correctIndex: 2 },
  { id: 10, category: "骨粗鬆症", question: "ビスホスホネート製剤を服用する際、服薬指導で最も重要なことは？", options: ["起床時に服用し、その後30分は横にならず、コップ一杯の水で飲むこと", "ご飯を食べたとしても忘れず午前中に服用すること", "寝る直前に少量の水で服用すること", "牛乳やお茶で服用すると吸収が良くなること"], correctIndex: 0 },
  { id: 11, category: "不眠", question: "ステロイドによる不眠を防ぐための服薬時間の工夫として適切なのは？", options: ["夕食後に服用時間を変更する", "就寝直前にまとめて服用する", "不眠が出たら自己判断で中止する", "昼食後以降の服用を避ける"], correctIndex: 3 },
  { id: 12, category: "患者指導", question: "ステロイド服用患者への「おくすり手帳」の活用として適切なのは？", options: ["家に大事にしまっておく", "ステロイドの名称と用量を明記し、他の医療機関受診時に必ず提示する", "副作用が出た時だけ持参する", "ステロイドの記載は不安を招くため避ける"], correctIndex: 1 },
  { id: 13, category: "感染症", question: "ステロイド服用中に感染症にかかった際、薬はどうすべき？", options: ["自己判断で中止せず、必ず相談する", "熱が下がるまで自分で中止する", "抗菌薬を飲めばステロイドは必ず中止してよい", "感染症の時は必ず倍量にする"], correctIndex: 0 },
  { id: 14, category: "消化管", question: "ステロイド服用中の消化管潰瘍予防として、最も適切なのは？", options: ["全例に強力な胃粘膜保護薬を処方する", "胃症状がなければNSAIDs併用中でも対策は不要", "潰瘍のリスクが高い患者に絞って酸分泌抑制薬を検討する", "食事量を減らせば潰瘍は完全に予防できる"], correctIndex: 2 },
  { id: 15, category: "離脱症候群", question: "「ステロイド離脱症候群」の主な症状はどれですか？", options: ["急激な体重増加と顔のむくみ（副腎の機能不全による症状）", "急激な筋力増強", "視力の改善", "関節痛、全身倦怠感、食欲不振"], correctIndex: 3 },
  { id: 16, category: "患者指導", question: "患者が「自己判断で薬を減らした」と報告してきた時、医療従事者として最も重要な対応は？", options: ["「副作用が出なくて良かった」と褒める", "減量のリスクを説明し、必ず主治医に連絡するよう促す", "そのまま完全中止を勧める", "残薬をすべて破棄するよう伝える"], correctIndex: 1 },
  { id: 17, category: "皮膚", question: "ステロイド服用中、日光（紫外線）について適切な対応は？", options: ["気にする必要はない", "日焼けをすると皮膚が強くなるため推奨する", "日光による皮膚ダメージを受けやすい為、日焼け止めなどで対策する", "日光浴で副作用を予防できる"], correctIndex: 2 },
  { id: 18, category: "減量", question: "「ステロイドはいつやめられるのか」と聞かれた際の適切な返答は？", options: ["「病気の経過に合わせて少しずつ減らしていくので、一緒に頑張りましょう」と伝える", "「今の調子なら1ヶ月で完全にやめられます」と断言する", "「副作用が怖ければ今日からやめてもよい」と伝える", "「飲み続けるかどうかは毎日自分で決めてよい」と伝える"], correctIndex: 0 },
  { id: 19, category: "治療管理", question: "ステロイド治療において「最も恐れるべきもの」は何ですか？", options: ["ステロイドという薬剤そのもの", "朝食後に服用すること", "おくすり手帳に記載すること", "漫然とした使用やフォローアップ不足"], correctIndex: 3 },
  { id: 20, category: "観察", question: "ステロイド長期服用中の患者さんを観察する際、特に重視すべき指標は？", options: ["服薬直後の眠気だけをみる", "毎日の体重測定と全身の状態観察", "食事内容だけを記録する", "血圧や体重は気にしない"], correctIndex: 1 },
  { id: 21, category: "検査", question: "ステロイド治療中の患者に予防的な検査を勧めるとき、適切なのは？", options: ["「ステロイドは怖くないので検査は必要ありません」と言う", "症状がなければ長期内服中でも検査は不要と伝える", "感染症や骨密度などの定期的な検査を提案する", "検査より自己判断で減量することを勧める"], correctIndex: 2 },
  { id: 22, category: "創傷", question: "ステロイド服用中の患者が怪我をしたとき、特に気をつけるべきことは？", options: ["傷の治りが遅い可能性があるため、感染に注意深く観察する", "特にステロイドとは関係ないので通常の処置で良い", "傷があっても必ず消毒だけで十分である", "出血しても観察は不要である"], correctIndex: 0 },
  { id: 23, category: "骨粗鬆症", question: "長期ステロイド投与を行う時行う骨粗しょう症予防策のうち、骨吸収を抑制するのはどれですか。", options: ["カルシウムとビタミンDの積極的摂取　エルデカルシトール", "鉄剤", "抗ヒスタミン薬", "ビスホスホネート製剤"], correctIndex: 3 },
  { id: 24, category: "骨粗鬆症", question: "ステロイド内服を開始したら何ヶ月で骨粗鬆症が進行し始めますか。", options: ["12か月以上", "3～6か月", "5年以上", "中止後に初めて進行する"], correctIndex: 1 },
  { id: 25, category: "血糖", question: "ステロイドによる糖尿病発症や血糖悪化が最も起こりやすい時間帯は？", options: ["昼食後から夕方・夜間", "朝の空腹時", "深夜から早朝のみ", "服薬前だけ"], correctIndex: 0 },
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
  attackChanceWaiting: false,
  attackChanceSignalReady: false,
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
let attackChanceTimerId = null;

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
    attackChanceWaiting: state.attackChanceWaiting,
    attackChanceSignalReady: state.attackChanceSignalReady,
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

function clearAttackChanceTimer() {
  if (attackChanceTimerId === null) return;
  clearTimeout(attackChanceTimerId);
  attackChanceTimerId = null;
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
  if (state.attackChanceWaiting || state.attackChanceSignalReady || state.attackChanceReady || state.bonusModalOpen) return;
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
  if (state.attackChanceUsed || state.attackChanceWaiting || state.attackChanceSignalReady || state.attackChanceReady || state.pendingStealTeamId) return;
  if (isGameEnded()) return;
  if (getResolvedCount() !== ATTACK_CHANCE_TRIGGER_COUNT) return;

  state.attackChanceWaiting = true;
  setLogEntry("17問終了。3秒後にアタックチャンスへ移行します。");
  render();

  attackChanceTimerId = window.setTimeout(() => {
    attackChanceTimerId = null;
    if (!state.attackChanceWaiting || state.attackChanceUsed) return;

    state.attackChanceWaiting = false;
    state.attackChanceSignalReady = true;
    setLogEntry("サイレンマークが出現しました。");
    render();
  }, ATTACK_CHANCE_INTERVAL_MS);
}

function revealAttackChance() {
  if (!state.attackChanceSignalReady || state.attackChanceUsed) return;

  state.attackChanceSignalReady = false;
  state.attackChanceReady = true;
  setLogEntry("アタックチャンスが発生しました。");
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
  clearAttackChanceTimer();
  state.board = createInitialBoard();
  state.modalCellIndex = null;
  state.step = "question";
  state.selectedOption = null;
  state.history = [];
  state.pendingAssignment = null;
  state.pendingStealTeamId = null;
  state.attackChanceWaiting = false;
  state.attackChanceSignalReady = false;
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
  clearAttackChanceTimer();
  const latest = state.history.pop();
  state.board = cloneBoard(latest.board);
  state.log = [...latest.log];
  state.pendingAssignment = clonePendingAssignment(latest.pendingAssignment);
  state.pendingStealTeamId = latest.pendingStealTeamId;
  state.attackChanceWaiting = latest.attackChanceWaiting;
  state.attackChanceSignalReady = latest.attackChanceSignalReady;
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
      <button class="cell-button" type="button" data-cell-index="${index}" ${state.pendingAssignment || state.pendingStealTeamId || state.attackChanceWaiting || state.attackChanceSignalReady || state.attackChanceReady || state.collapseAnimating || state.flipAnimating ? "disabled" : ""}>
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

  const showSignal = state.attackChanceSignalReady && !state.flipAnimating;
  const showAttackChance = state.attackChanceReady;

  if (!showSignal && !showAttackChance) {
    els.attackChanceOverlay.classList.add("hidden");
    els.attackChanceOverlay.setAttribute("aria-hidden", "true");
    els.attackChanceOverlay.innerHTML = "";
    return;
  }

  els.attackChanceOverlay.classList.remove("hidden");
  els.attackChanceOverlay.setAttribute("aria-hidden", "false");

  if (showSignal) {
    els.attackChanceOverlay.innerHTML = `
      <div class="attack-siren-card" role="button" tabindex="0" aria-label="サイレン">
        <div class="attack-siren-mark" aria-hidden="true">!</div>
      </div>
    `;
    return;
  }

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
        <div class="result-desc">Enterキーで灰色の不正解パネルとして確定します。</div>
      </div>
    `;
  } else if (state.step === "wrong") {
    els.modalResultBar.classList.remove("hidden");
    els.modalResultBar.classList.remove("result-bar-correct");
    els.modalResultBar.innerHTML = `
      <div>
        <div class="result-title">不正解</div>
        <div class="result-desc">残り回答権：${remaining} 回。Enterキーで次の選択へ進みます。</div>
      </div>
    `;
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

  if (state.step !== "question") {
    return false;
  }

  const usedOpts = getUsedOptions(state.modalCellIndex);
  event.preventDefault();
  if (usedOpts.includes(optionIndex)) {
    return true;
  }

  answerQuestion(optionIndex);
  return true;
}

function handleKeyboardResultAction(event) {
  if (
    event.key !== "Enter"
    || els.modalOverlay.classList.contains("hidden")
    || state.modalCellIndex === null
    || (state.step !== "wrong" && state.step !== "result")
  ) {
    return false;
  }

  event.preventDefault();
  if (state.step === "result") {
    commitMiss();
  } else {
    retryQuestion();
  }
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
    if (state.attackChanceSignalReady) {
      revealAttackChance();
    } else {
      startBonusQuestion();
    }
  });

  els.attackChanceOverlay.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (state.attackChanceSignalReady) {
        revealAttackChance();
      } else {
        startBonusQuestion();
      }
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

    if (handleKeyboardResultAction(event)) return;
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
