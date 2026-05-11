const BOARD_SIZE = 5;
const MAX_ATTEMPTS = 3;

const TEAM_DEFS = [
  { id: "red", name: "チームA", color: "#ef4444", soft: "rgba(239,68,68,0.18)", border: "rgba(254,202,202,0.9)" },
  { id: "blue", name: "チームB", color: "#3b82f6", soft: "rgba(59,130,246,0.18)", border: "rgba(191,219,254,0.9)" },
  { id: "green", name: "チームC", color: "#10b981", soft: "rgba(16,185,129,0.18)", border: "rgba(167,243,208,0.9)" },
  { id: "yellow", name: "チームD", color: "#f59e0b", soft: "rgba(245,158,11,0.18)", border: "rgba(253,230,138,0.9)" },
];

const QUESTIONS = [
  { id: 1, category: "投与", question: "長期の全身性ステロイド投与を急に中止したとき、最も注意すべき状態はどれ？", options: ["副腎不全", "高カリウム血症の急速改善", "即時型アレルギー", "急性腎不全"], correctIndex: 0, explanation: "長期投与では視床下部-下垂体-副腎系が抑制され、急な中止で副腎不全を来しうる。" },
  { id: 2, category: "投与", question: "プレドニゾロン内服の基本的な服用タイミングとして最も一般的なのはどれ？", options: ["朝", "昼", "夕方", "就寝前"], correctIndex: 0, explanation: "生理的コルチゾール分泌に合わせ、朝投与が基本となることが多い。" },
  { id: 3, category: "副作用", question: "ステロイド投与で上昇しやすく、モニタリングが重要なものはどれ？", options: ["血糖", "血中鉄", "尿酸のみ", "ビリルビンのみ"], correctIndex: 0, explanation: "ステロイドは耐糖能異常を起こしうるため、血糖管理が重要。" },
  { id: 4, category: "感染", question: "ステロイド投与中の感染症について正しいのはどれ？", options: ["炎症所見が目立ちにくくなることがある", "感染リスクは下がる", "抗菌薬は無効になる", "発熱は必ず高度になる"], correctIndex: 0, explanation: "免疫抑制と抗炎症作用により、感染徴候がマスクされることがある。" },
  { id: 5, category: "吸入", question: "吸入ステロイド後のうがいの主目的はどれ？", options: ["口腔カンジダ予防", "薬効増強", "気道乾燥の促進", "頻脈予防"], correctIndex: 0, explanation: "口腔内への残留を減らし、口腔カンジダや嗄声を予防する。" },
  { id: 6, category: "骨代謝", question: "長期ステロイド投与で特に問題となる骨関連の副作用はどれ？", options: ["骨粗鬆症", "骨髄炎", "骨肉腫", "疲労骨折の完全予防"], correctIndex: 0, explanation: "長期投与では骨量減少が起こり、骨粗鬆症リスクが上がる。" },
  { id: 7, category: "作用", question: "ステロイドの鉱質コルチコイド作用で起こりやすいのはどれ？", options: ["ナトリウム・水分貯留", "低血糖", "徐脈", "低眼圧"], correctIndex: 0, explanation: "鉱質コルチコイド作用によりNa・水分貯留、浮腫、血圧上昇を来しうる。" },
  { id: 8, category: "皮膚", question: "外用ステロイドの局所副作用として代表的なのはどれ？", options: ["皮膚萎縮", "永久的な発毛増強", "角膜混濁", "低血糖"], correctIndex: 0, explanation: "長期・不適切使用で皮膚萎縮、毛細血管拡張などがみられる。" },
  { id: 9, category: "周術期", question: "長期ステロイド使用患者が手術や重症感染など強いストレスにさらされる際、考慮すべきなのはどれ？", options: ["ステロイド補充の追加", "必ず即日中止", "輸液禁止", "鎮痛薬中止"], correctIndex: 0, explanation: "副腎抑制がある場合、ストレス時には追加補充が必要になることがある。" },
  { id: 10, category: "精神症状", question: "ステロイドで起こりうる精神・神経症状として適切なのはどれ？", options: ["不眠や気分変調", "失語のみ", "必発のけいれん", "聴力の恒久改善"], correctIndex: 0, explanation: "不眠、気分高揚、抑うつ、せん妄などが起こりうる。" },
  { id: 11, category: "ワクチン", question: "高用量の全身性ステロイド投与中に原則として慎重になるべきものはどれ？", options: ["生ワクチン", "不活化ワクチンの筋注", "経口補水", "血圧測定"], correctIndex: 0, explanation: "免疫抑制下では生ワクチン接種が問題となる。" },
  { id: 12, category: "外見変化", question: "クッシング様変化として代表的なのはどれ？", options: ["ムーンフェイス", "縮瞳", "眼球突出の必発", "難聴"], correctIndex: 0, explanation: "中心性肥満やムーンフェイスなどの外見変化がみられることがある。" },
  { id: 13, category: "眼科", question: "ステロイド使用で眼科的に注意すべき副作用として適切なのはどれ？", options: ["眼圧上昇", "網膜血流の必発停止", "色覚の急速改善", "近視の完全消失"], correctIndex: 0, explanation: "長期使用で眼圧上昇や白内障などに注意する。" },
  { id: 14, category: "消化器", question: "消化管障害の観点で、ステロイドと併用時により注意が必要な薬はどれ？", options: ["NSAIDs", "制酸薬", "整腸薬", "経口補水液"], correctIndex: 0, explanation: "NSAIDs併用では消化管障害リスクが問題となる。" },
  { id: 15, category: "小児", question: "小児の長期ステロイド投与で特に意識すべき点はどれ？", options: ["成長への影響", "永久歯の即時脱落", "身長の急速増加", "必発の高身長"], correctIndex: 0, explanation: "小児では成長障害にも注意が必要。" },
  { id: 16, category: "看護", question: "ステロイド投与患者の観察項目として不適切なのはどれ？", options: ["感染徴候・血糖・血圧の確認", "体重変化の確認", "浮腫の観察", "投与中は何も観察しなくてよい"], correctIndex: 3, explanation: "感染、血糖、血圧、浮腫、体重、精神症状など多面的な観察が必要。" },
  { id: 17, category: "電解質", question: "ステロイドの影響で起こりうる電解質変化として比較的知られるのはどれ？", options: ["低カリウム血症", "高マグネシウム血症のみ", "重度高リン血症のみ", "必発の高カルシウム血症"], correctIndex: 0, explanation: "鉱質コルチコイド作用の強い薬では低カリウム血症に注意する。" },
  { id: 18, category: "皮膚・創傷", question: "ステロイド使用で遅れやすいものはどれ？", options: ["創傷治癒", "脈拍の測定", "尿量記録", "体温測定"], correctIndex: 0, explanation: "創傷治癒遅延は重要な副作用の一つ。" },
  { id: 19, category: "患者指導", question: "患者指導として適切なのはどれ？", options: ["自己判断で急に中止しない", "飲み忘れ時は翌日に10倍量を飲む", "感染症状は必ず軽いので受診不要", "副作用は絶対に起こらないと説明する"], correctIndex: 0, explanation: "自己中断は危険であり、指示どおりの漸減や受診が重要。" },
  { id: 20, category: "薬理", question: "ステロイドの糖質コルチコイド作用として正しいのはどれ？", options: ["抗炎症作用がある", "血糖を下げる", "免疫を必ず増強する", "骨形成を促進する"], correctIndex: 0, explanation: "糖質コルチコイド作用には抗炎症・免疫抑制が含まれる。" },
  { id: 21, category: "全身管理", question: "ステロイド投与中の一般的な副作用として適切なのはどれ？", options: ["血圧上昇", "必発の徐脈", "不可逆的な低体温のみ", "急速な脱水のみ"], correctIndex: 0, explanation: "水分貯留などにより血圧が上昇することがある。" },
  { id: 22, category: "投与経路", question: "ステロイドのパルス療法の特徴として正しいのはどれ？", options: ["大量を短期間投与し、急速に減量する", "少量を永久に続ける", "内服のみで行う", "点滴は禁忌である"], correctIndex: 0, explanation: "パルス療法は大量を短期間投与し、減量する方法。" },
  { id: 23, category: "副作用", question: "ステロイド性糖尿病の特徴として正しいのはどれ？", options: ["食後高血糖が目立つことがある", "必ず空腹時のみ高血糖になる", "インスリンは絶対不要", "食事療法は無効である"], correctIndex: 0, explanation: "ステロイド性糖尿病では食後高血糖が目立つことがある。" },
  { id: 24, category: "特殊状況", question: "妊娠中のステロイド使用について正しいのはどれ？", options: ["疾患によっては使用されることがある", "絶対に禁忌である", "大量投与が推奨される", "胎児に影響はない"], correctIndex: 0, explanation: "疾患によっては慎重に使用されることがある。" },
  { id: 25, category: "全身管理", question: "ステロイド投与中のモニタリングとして最も包括的なのはどれ？", options: ["血糖・血圧・体重・感染徴候の定期確認", "血糖のみ測定すればよい", "体重のみ記録すればよい", "副作用は起こらないので不要"], correctIndex: 0, explanation: "多面的なモニタリングが必要である。" },
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
  log: ["開始前：好きなマスを選び、正答チームを右側パネルで確定する方式です。"],
  pendingAssignment: null,
  teamNames: TEAM_DEFS.map((team) => team.name),
  collapseAnimating: false,
  collapseFinished: false,
  attempts: {},
  usedOptions: {},
};

const els = {
  boardGrid: document.getElementById("boardGrid"),
  boardArt: document.getElementById("boardArt"),
  boardImage: document.getElementById("boardImage"),
  scoreGrid: document.getElementById("scoreGrid"),
  statusText: document.getElementById("statusText"),
  teamNameGrid: document.getElementById("teamNameGrid"),
  assignmentPanel: document.getElementById("assignmentPanel"),
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

function getSingleWinner() {
  const { winners } = getWinners();
  return isGameEnded() && winners.length === 1 ? winners[0] : null;
}

function applyOthelloCapture(board, placedIndex, teamId) {
  const next = cloneBoard(board);
  next[placedIndex].status = "claimed";
  next[placedIndex].owner = teamId;

  const row = Math.floor(placedIndex / BOARD_SIZE);
  const col = placedIndex % BOARD_SIZE;
  let flipped = 0;

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

  return { next, flipped };
}

function setLogEntry(entry) {
  state.log = [entry, ...state.log];
}

function openCell(index) {
  if (state.pendingAssignment) return;
  if (state.collapseAnimating) return;
  if (state.board[index].status !== "hidden") return;
  state.modalCellIndex = index;
  state.step = "question";
  state.selectedOption = null;
  render();
  showModal();
}

function closeModal() {
  state.modalCellIndex = null;
  state.step = "question";
  state.selectedOption = null;
  hideModal();
  render();
}

function getAttemptCount(cellIndex) {
  return state.attempts[cellIndex] || 0;
}

function getUsedOptions(cellIndex) {
  return state.usedOptions[cellIndex] || [];
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
      explanation: modalCell.explanation,
    };
    setLogEntry(`${modalCell.id}番：正解（${attemptCount}回目）。右側パネルで獲得チームを選択してください。`);
    closeModal();
    return;
  }

  if (attemptCount >= MAX_ATTEMPTS) {
    state.step = "result";
  } else {
    state.step = "wrong";
  }
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
    setTimeout(() => triggerCollapseAnimation(), 600);
  }
}

function retryQuestion() {
  state.step = "question";
  state.selectedOption = null;
  renderModal();
}

function assignToTeam(teamId) {
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

  const { next, flipped } = applyOthelloCapture(prepared, sourceIndex, teamId);
  const teamLookup = getTeamLookup();
  const teamName = teamLookup[teamId]?.name ?? teamId;

  state.board = next;
  state.pendingAssignment = null;
  setLogEntry(`${assignmentCell.id}番：${teamName}が獲得。${flipped > 0 ? `${flipped}マス反転。` : "反転なし。"}`);
  closeModal();

  if (isGameEnded()) {
    setTimeout(() => triggerCollapseAnimation(), 600);
  }
}

// --- 崩れ落ち演出 ---
function triggerCollapseAnimation() {
  const { winners } = getWinners();
  const winnerIds = winners.length === 1 ? [winners[0].id] : [];

  state.collapseAnimating = true;

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
  // board-artはそのまま残す（敗北チームの箇所はSVGアートが見える）
  // 優勝マスのセルだけ透明にし、そのセルの背景にimage.pngの対応部分を表示
  const buttons = els.boardGrid.querySelectorAll(".cell-button");
  const { winners } = getWinners();
  const winnerIds = winners.length === 1 ? [winners[0].id] : [];

  // グリッドのサイズ情報を取得してbackground-positionを計算
  const gridRect = els.boardGrid.getBoundingClientRect();

  let delay = 0;
  buttons.forEach((button) => {
    const cellIndex = Number(button.dataset.cellIndex);
    const cell = state.board[cellIndex];

    if (cell.status === "claimed" && winnerIds.includes(cell.owner)) {
      const face = button.querySelector(".cell-face");
      if (face) {
        // セルの位置からbackground-positionを計算
        const row = Math.floor(cellIndex / BOARD_SIZE);
        const col = cellIndex % BOARD_SIZE;
        // 5x5グリッドなので、各セルの位置を%で計算
        const bgPosX = col * 25; // 0%, 25%, 50%, 75%, 100%
        const bgPosY = row * 25;

        setTimeout(() => {
          face.classList.add("cell-transparent");
          // 背景画像をセルに設定（対応する部分だけ表示）
          face.style.backgroundImage = "url('image.png')";
          face.style.backgroundSize = `${BOARD_SIZE * 100}% ${BOARD_SIZE * 100}%`;
          face.style.backgroundPosition = `${bgPosX}% ${bgPosY}%`;
          face.style.backgroundRepeat = "no-repeat";
        }, delay);
        delay += 100;
      }
    }
  });
}

function resetGame() {
  state.board = createInitialBoard();
  state.modalCellIndex = null;
  state.step = "question";
  state.selectedOption = null;
  state.history = [];
  state.pendingAssignment = null;
  state.collapseAnimating = false;
  state.collapseFinished = false;
  state.attempts = {};
  state.usedOptions = {};
  state.log = ["ゲームをリセットしました。"];
  if (els.boardArt) {
    els.boardArt.classList.remove("art-hidden");
  }
  hideModal();
  render();
}

function undoLast() {
  if (state.history.length === 0) return;
  if (state.collapseAnimating) return;
  const latest = state.history.pop();
  state.board = cloneBoard(latest.board);
  state.log = [...latest.log];
  state.pendingAssignment = clonePendingAssignment(latest.pendingAssignment);
  state.attempts = { ...latest.attempts };
  state.usedOptions = JSON.parse(JSON.stringify(latest.usedOptions));
  state.modalCellIndex = null;
  state.step = "question";
  state.selectedOption = null;
  state.collapseAnimating = false;
  state.collapseFinished = false;
  if (els.boardArt) {
    els.boardArt.classList.remove("art-hidden");
  }
  hideModal();
  render();
}

function getStatusText() {
  const pendingCell = getPendingCell();
  if (pendingCell) {
    return `${pendingCell.id}番が正解済み。右側パネルで獲得チームを選択してください。`;
  }

  if (state.collapseAnimating) {
    return "結果演出中...";
  }

  if (isGameEnded()) {
    const singleWinner = getSingleWinner();
    const { winners } = getWinners();
    if (state.collapseFinished && singleWinner) {
      return `${singleWinner.name} の勝利！ 獲得マスが透明になりました。この画像は何でしょう？`;
    }
    if (singleWinner) {
      return `${singleWinner.name} の勝利！ 獲得マスと不正解パネルが残り、他は崩れ落ちました。`;
    }
    if (winners.length > 1) {
      return `引き分け（${winners.map((w) => w.name).join(" / ")}）。不正解パネルのみ残りました。`;
    }
    return "全問終了。勝者なし。";
  }

  const unresolved = state.board.filter((cell) => cell.status === "hidden").length;
  return `残り ${unresolved} 問。正解した問題は、右側の固定パネルで獲得チームを確定します。`;
}

function renderTeamNameInputs() {
  const teams = getTeams();
  const counts = getCounts();
  els.teamNameGrid.innerHTML = teams.map((team, index) => `
    <label class="team-name-card">
      <div class="team-name-top">
        <div class="team-name-label-row">
          <span class="color-dot" style="background:${team.color}"></span>
          <span>TEAM ${index + 1}</span>
        </div>
        <span class="team-name-score">${counts[team.id]}</span>
      </div>
      <input
        class="team-name-input"
        type="text"
        value="${escapeHtml(team.name)}"
        data-team-index="${index}"
      />
    </label>
  `).join("");

  els.teamNameGrid.querySelectorAll(".team-name-input").forEach((input) => {
    input.addEventListener("input", (event) => {
      const teamIndex = Number(event.currentTarget.dataset.teamIndex);
      state.teamNames[teamIndex] = event.currentTarget.value;
      render();
    });
  });
}

function renderBoard() {
  const teamLookup = getTeamLookup();
  const singleWinner = getSingleWinner();
  const pendingCell = getPendingCell();
  const gameEnded = isGameEnded();

  const { winners } = getWinners();
  const winnerIdsForCollapse = (gameEnded && winners.length === 1) ? [winners[0].id] : [];

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
      const revealArt = gameEnded && singleWinner && singleWinner.id === cell.owner;
      const isRevealedImage = state.collapseFinished && revealArt;

      // 崩れ落ち完了後の優勝マス：背景画像を表示
      let faceStyle = "";
      if (isRevealedImage) {
        const row = Math.floor(index / BOARD_SIZE);
        const col = index % BOARD_SIZE;
        const bgPosX = col * 25;
        const bgPosY = row * 25;
        faceStyle = `background-image:url('image.png'); background-size:${BOARD_SIZE * 100}% ${BOARD_SIZE * 100}%; background-position:${bgPosX}% ${bgPosY}%; background-repeat:no-repeat; border-color:rgba(255,255,255,0.55); box-shadow:inset 0 0 0 1px rgba(255,255,255,0.08);`;
      } else if (revealArt) {
        faceStyle = `background:rgba(255,255,255,0.02); border-color:rgba(255,255,255,0.55); box-shadow:inset 0 0 0 1px rgba(255,255,255,0.08);`;
      } else {
        faceStyle = `background:${team.color}; border-color:${team.border}; box-shadow:inset 0 0 0 1px ${team.border};`;
      }

      return `
        <button class="cell-button" type="button" data-cell-index="${index}" ${cell.status !== "hidden" || state.pendingAssignment ? "disabled" : ""}>
          <div class="cell-face cell-claimed ${revealArt ? "cell-reveal" : ""} ${isRevealedImage ? "cell-transparent" : ""} ${isPending ? "pending-highlight" : ""}" style="${faceStyle}">
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
      <button class="cell-button" type="button" data-cell-index="${index}" ${state.pendingAssignment || state.collapseAnimating ? "disabled" : ""}>
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
      openCell(Number(button.dataset.cellIndex));
    });
  });
}

function renderScore() {
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

function renderAssignmentPanel() {
  const teams = getTeams();

  if (!state.pendingAssignment) {
    els.assignmentPanel.innerHTML = `
      <div class="assignment-idle">
        <p>正解が出ると、このパネルに対象問題が表示されるでござる。ここで司会者が4チームのうち正答チームを選択すると、盤面へ反映される。</p>
      </div>
    `;
    return;
  }

  els.assignmentPanel.innerHTML = `
    <div class="assignment-box">
      <div class="assignment-meta">確定待ち</div>
      <div class="assignment-question-id">問題 ${state.pendingAssignment.questionId}</div>
      <div class="assignment-category">${escapeHtml(state.pendingAssignment.category)}</div>
      <div class="assignment-question">${escapeHtml(state.pendingAssignment.question)}</div>
    </div>
    <div class="explanation-box">
      <div class="assignment-meta" style="color: var(--text-sub); letter-spacing:0.2em;">解説</div>
      <div style="margin-top:8px;">${escapeHtml(state.pendingAssignment.explanation)}</div>
    </div>
    <div class="assignment-team-grid">
      ${teams.map((team) => `
        <button class="assignment-team-btn" type="button" data-team-id="${team.id}" style="border-color:${team.border}; background:${team.soft};">
          <div class="team-name-top" style="margin-bottom:0; color:white;">
            <span class="color-dot" style="background:${team.color}; box-shadow:0 0 16px ${team.color};"></span>
            <div>
              <div class="assignment-team-title">${escapeHtml(team.name)}</div>
              <div class="assignment-team-sub">このチームに確定する</div>
            </div>
          </div>
        </button>
      `).join("")}
    </div>
  `;

  els.assignmentPanel.querySelectorAll(".assignment-team-btn").forEach((button) => {
    button.addEventListener("click", () => assignToTeam(button.dataset.teamId));
  });
}

function renderModal() {
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
  els.modalTitle.textContent = modalCell.question;

  const attemptInfoHtml = `<div class="modal-attempt-info">回答権：<span class="attempt-remaining ${remaining <= 1 ? "attempt-danger" : ""}">${remaining}</span> / ${MAX_ATTEMPTS}</div>`;

  els.modalOptions.innerHTML = attemptInfoHtml + modalCell.options.map((option, index) => {
    const selected = state.selectedOption === index;
    const isCorrect = modalCell.correctIndex === index;
    const isUsed = usedOpts.includes(index);
    const reveal = state.step === "result";

    let border = "rgba(255,255,255,0.1)";
    let background = "rgba(255,255,255,0.04)";
    let disabled = false;

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
      disabled = true;
      border = "rgba(255,255,255,0.06)";
      background = "rgba(239,68,68,0.06)";
    }

    if (state.step !== "question") {
      disabled = true;
    }

    return `
      <button class="option-btn ${isUsed && state.step === "question" ? "option-used" : ""}" type="button" data-option-index="${index}" ${disabled ? "disabled" : ""} style="border-color:${border}; background:${background};">
        <div class="option-row">
          <span class="option-letter">${String.fromCharCode(65 + index)}</span>
          <span>${escapeHtml(option)}</span>
          ${isUsed && state.step === "question" ? '<span class="option-used-mark">\u2716</span>' : ""}
        </div>
      </button>
    `;
  }).join("");

  els.modalOptions.querySelectorAll(".option-btn").forEach((button) => {
    if (button.disabled) return;
    button.addEventListener("click", () => answerQuestion(Number(button.dataset.optionIndex)));
  });

  if (state.step === "result") {
    els.modalExplanation.classList.remove("hidden");
    els.modalExplanation.innerHTML = `
      <div class="assignment-meta" style="color: var(--text-sub); letter-spacing:0.2em;">解説</div>
      <div style="margin-top:8px;">${escapeHtml(modalCell.explanation)}</div>
    `;
  } else {
    els.modalExplanation.classList.add("hidden");
    els.modalExplanation.innerHTML = "";
  }

  if (state.step === "result") {
    els.modalResultBar.classList.remove("hidden");
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
  renderScore();
  renderAssignmentPanel();
  els.statusText.textContent = getStatusText();
  els.undoBtn.disabled = state.history.length === 0 || state.collapseAnimating;
  renderModal();
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function wireEvents() {
  els.resetBtn.addEventListener("click", resetGame);
  els.undoBtn.addEventListener("click", undoLast);
  els.closeModalBtn.addEventListener("click", closeModal);

  els.modalOverlay.addEventListener("click", (event) => {
    if (event.target === els.modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !els.modalOverlay.classList.contains("hidden")) {
      closeModal();
    }
  });
}

function init() {
  state.board = createInitialBoard();
  wireEvents();
  render();
}

init();
