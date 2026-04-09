const BOARD_SIZE = 5;

const TEAM_DEFS = [
  { id: "red", name: "チームA", color: "#ef4444", soft: "rgba(239,68,68,0.18)", border: "rgba(254,202,202,0.9)" },
  { id: "blue", name: "チームB", color: "#3b82f6", soft: "rgba(59,130,246,0.18)", border: "rgba(191,219,254,0.9)" },
  { id: "green", name: "チームC", color: "#10b981", soft: "rgba(16,185,129,0.18)", border: "rgba(167,243,208,0.9)" },
  { id: "yellow", name: "チームD", color: "#f59e0b", soft: "rgba(245,158,11,0.18)", border: "rgba(253,230,138,0.9)" },
];

// 問題文はこの単一配列だけを編集すれば差し替え可能
const QUESTIONS = [
  {
    id: 1,
    category: "投与",
    question: "長期の全身性ステロイド投与を急に中止したとき、最も注意すべき状態はどれ？",
    options: ["副腎不全", "高カリウム血症の急速改善", "即時型アレルギー", "急性腎不全"],
    correctIndex: 0,
    explanation: "長期投与では視床下部-下垂体-副腎系が抑制され、急な中止で副腎不全を来しうる。",
  },
  {
    id: 2,
    category: "投与",
    question: "プレドニゾロン内服の基本的な服用タイミングとして最も一般的なのはどれ？",
    options: ["朝", "昼", "夕方", "就寝前"],
    correctIndex: 0,
    explanation: "生理的コルチゾール分泌に合わせ、朝投与が基本となることが多い。",
  },
  {
    id: 3,
    category: "副作用",
    question: "ステロイド投与で上昇しやすく、モニタリングが重要なものはどれ？",
    options: ["血糖", "血中鉄", "尿酸のみ", "ビリルビンのみ"],
    correctIndex: 0,
    explanation: "ステロイドは耐糖能異常を起こしうるため、血糖管理が重要。",
  },
  {
    id: 4,
    category: "感染",
    question: "ステロイド投与中の感染症について正しいのはどれ？",
    options: ["炎症所見が目立ちにくくなることがある", "感染リスクは下がる", "抗菌薬は無効になる", "発熱は必ず高度になる"],
    correctIndex: 0,
    explanation: "免疫抑制と抗炎症作用により、感染徴候がマスクされることがある。",
  },
  {
    id: 5,
    category: "吸入",
    question: "吸入ステロイド後のうがいの主目的はどれ？",
    options: ["口腔カンジダ予防", "薬効増強", "気道乾燥の促進", "頻脈予防"],
    correctIndex: 0,
    explanation: "口腔内への残留を減らし、口腔カンジダや嗄声を予防する。",
  },
  {
    id: 6,
    category: "骨代謝",
    question: "長期ステロイド投与で特に問題となる骨関連の副作用はどれ？",
    options: ["骨粗鬆症", "骨髄炎", "骨肉腫", "疲労骨折の完全予防"],
    correctIndex: 0,
    explanation: "長期投与では骨量減少が起こり、骨粗鬆症リスクが上がる。",
  },
  {
    id: 7,
    category: "作用",
    question: "ステロイドの鉱質コルチコイド作用で起こりやすいのはどれ？",
    options: ["ナトリウム・水分貯留", "低血糖", "徐脈", "低眼圧"],
    correctIndex: 0,
    explanation: "鉱質コルチコイド作用によりNa・水分貯留、浮腫、血圧上昇を来しうる。",
  },
  {
    id: 8,
    category: "皮膚",
    question: "外用ステロイドの局所副作用として代表的なのはどれ？",
    options: ["皮膚萎縮", "永久的な発毛増強", "角膜混濁", "低血糖"],
    correctIndex: 0,
    explanation: "長期・不適切使用で皮膚萎縮、毛細血管拡張などがみられる。",
  },
  {
    id: 9,
    category: "周術期",
    question: "長期ステロイド使用患者が手術や重症感染など強いストレスにさらされる際、考慮すべきなのはどれ？",
    options: ["ステロイド補充の追加", "必ず即日中止", "輸液禁止", "鎮痛薬中止"],
    correctIndex: 0,
    explanation: "副腎抑制がある場合、ストレス時には追加補充が必要になることがある。",
  },
  {
    id: 10,
    category: "精神症状",
    question: "ステロイドで起こりうる精神・神経症状として適切なのはどれ？",
    options: ["不眠や気分変調", "失語のみ", "必発のけいれん", "聴力の恒久改善"],
    correctIndex: 0,
    explanation: "不眠、気分高揚、抑うつ、せん妄などが起こりうる。",
  },
  {
    id: 11,
    category: "ワクチン",
    question: "高用量の全身性ステロイド投与中に原則として慎重になるべきものはどれ？",
    options: ["生ワクチン", "不活化ワクチンの筋注", "経口補水", "血圧測定"],
    correctIndex: 0,
    explanation: "免疫抑制下では生ワクチン接種が問題となる。",
  },
  {
    id: 12,
    category: "外見変化",
    question: "クッシング様変化として代表的なのはどれ？",
    options: ["ムーンフェイス", "縮瞳", "眼球突出の必発", "難聴"],
    correctIndex: 0,
    explanation: "中心性肥満やムーンフェイスなどの外見変化がみられることがある。",
  },
  {
    id: 13,
    category: "眼科",
    question: "ステロイド使用で眼科的に注意すべき副作用として適切なのはどれ？",
    options: ["眼圧上昇", "網膜血流の必発停止", "色覚の急速改善", "近視の完全消失"],
    correctIndex: 0,
    explanation: "長期使用で眼圧上昇や白内障などに注意する。",
  },
  {
    id: 14,
    category: "消化器",
    question: "消化管障害の観点で、ステロイドと併用時により注意が必要な薬はどれ？",
    options: ["NSAIDs", "制酸薬", "整腸薬", "経口補水液"],
    correctIndex: 0,
    explanation: "NSAIDs併用では消化管障害リスクが問題となる。",
  },
  {
    id: 15,
    category: "小児",
    question: "小児の長期ステロイド投与で特に意識すべき点はどれ？",
    options: ["成長への影響", "永久歯の即時脱落", "身長の急速増加", "必発の高身長"],
    correctIndex: 0,
    explanation: "小児では成長障害にも注意が必要。",
  },
  {
    id: 16,
    category: "看護",
    question: "ステロイド投与患者の観察項目として不適切なのはどれ？",
    options: ["感染徴候・血糖・血圧の確認", "体重変化の確認", "浮腫の観察", "投与中は何も観察しなくてよい"],
    correctIndex: 3,
    explanation: "感染、血糖、血圧、浮腫、体重、精神症状など多面的な観察が必要。",
  },
  {
    id: 17,
    category: "電解質",
    question: "ステロイドの影響で起こりうる電解質変化として比較的知られるのはどれ？",
    options: ["低カリウム血症", "高マグネシウム血症のみ", "重度高リン血症のみ", "必発の高カルシウム血症"],
    correctIndex: 0,
    explanation: "鉱質コルチコイド作用の強い薬では低カリウム血症に注意する。",
  },
  {
    id: 18,
    category: "皮膚・創傷",
    question: "ステロイド使用で遅れやすいものはどれ？",
    options: ["創傷治癒", "脈拍の測定", "尿量記録", "体温測定"],
    correctIndex: 0,
    explanation: "創傷治癒遅延は重要な副作用の一つ。",
  },
  {
    id: 19,
    category: "患者指導",
    question: "患者指導として適切なのはどれ？",
    options: ["自己判断で急に中止しない", "飲み忘れ時は翌日に10倍量を飲む", "感染症状は必ず軽いので受診不要", "副作用は絶対に起こらないと説明する"],
    correctIndex: 0,
    explanation: "自己中断は危険であり、指示どおりの漸減や受診が重要。",
  },
  {
    id: 20,
    category: "糖代謝",
    question: "ステロイド糖尿病で特に重要な対応はどれ？",
    options: ["血糖モニタリング", "水分制限のみ", "聴力検査のみ", "眼帯固定"],
    correctIndex: 0,
    explanation: "ステロイドにより血糖が悪化しうるため、継続的な評価が必要。",
  },
  {
    id: 21,
    category: "感染予防",
    question: "免疫抑制下の生活指導として適切なのはどれ？",
    options: ["手洗い・感染者との接触回避を指導する", "発熱しても必ず様子を見る", "口腔ケアは不要", "ワクチン歴確認は不要"],
    correctIndex: 0,
    explanation: "基本的な感染予防行動の指導は重要。",
  },
  {
    id: 22,
    category: "筋骨格",
    question: "長期ステロイド投与で起こりうるものとして適切なのはどれ？",
    options: ["筋力低下", "筋肉量の必発増加", "骨折リスクの完全消失", "全例で腱反射亢進のみ"],
    correctIndex: 0,
    explanation: "ステロイドミオパチーによる筋力低下も起こりうる。",
  },
  {
    id: 23,
    category: "発熱評価",
    question: "ステロイド投与中の発熱評価で最も適切なのはどれ？",
    options: ["軽度の発熱でも感染を否定しない", "発熱が低ければ感染は絶対にない", "発熱があれば必ず薬疹", "解熱していれば観察不要"],
    correctIndex: 0,
    explanation: "炎症反応が修飾されるため、軽微な徴候でも丁寧な評価が必要。",
  },
  {
    id: 24,
    category: "外用",
    question: "外用ステロイドの使い方として一般に適切なのはどれ？",
    options: ["部位・病変に応じて強さを選ぶ", "どこでも最強ランクを使う", "顔面には常に最強を長期使用する", "症状がなくても無期限で塗り続ける"],
    correctIndex: 0,
    explanation: "部位や病変の程度で適切なランク・量・期間を選ぶことが重要。",
  },
  {
    id: 25,
    category: "全身管理",
    question: "ステロイド投与中の一般的な副作用として適切なのはどれ？",
    options: ["血圧上昇", "必発の徐脈", "不可逆的な低体温のみ", "急速な脱水のみ"],
    correctIndex: 0,
    explanation: "水分貯留などにより血圧上昇が問題となることがある。",
  },
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
};

const els = {
  boardGrid: document.getElementById("boardGrid"),
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

function clonePendingAssignment(pendingAssignment) {
  return pendingAssignment ? { ...pendingAssignment } : null;
}

function cloneHistoryEntry() {
  return {
    board: cloneBoard(state.board),
    log: [...state.log],
    pendingAssignment: clonePendingAssignment(state.pendingAssignment),
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

function answerQuestion(optionIndex) {
  state.selectedOption = optionIndex;
  const modalCell = state.modalCellIndex !== null ? state.board[state.modalCellIndex] : null;
  if (!modalCell) return;

  if (optionIndex === modalCell.correctIndex) {
    state.pendingAssignment = {
      cellIndex: state.modalCellIndex,
      selectedOption: optionIndex,
      questionId: modalCell.id,
      category: modalCell.category,
      question: modalCell.question,
      explanation: modalCell.explanation,
    };
    setLogEntry(`${modalCell.id}番：正解。右側パネルで獲得チームを選択してください。`);
    closeModal();
    return;
  }

  state.step = "result";
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
  setLogEntry(`${modalCell.id}番：不正解。マスは空白のまま消費。`);
  closeModal();
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
}

function resetGame() {
  state.board = createInitialBoard();
  state.modalCellIndex = null;
  state.step = "question";
  state.selectedOption = null;
  state.history = [];
  state.pendingAssignment = null;
  state.log = ["ゲームをリセットしました。"];
  hideModal();
  render();
}

function undoLast() {
  if (state.history.length === 0) return;
  const latest = state.history.pop();
  state.board = cloneBoard(latest.board);
  state.log = [...latest.log];
  state.pendingAssignment = clonePendingAssignment(latest.pendingAssignment);
  state.modalCellIndex = null;
  state.step = "question";
  state.selectedOption = null;
  hideModal();
  render();
}

function getStatusText() {
  const pendingCell = getPendingCell();
  if (pendingCell) {
    return `${pendingCell.id}番が正解済み。右側パネルで獲得チームを選択してください。`;
  }

  if (isGameEnded()) {
    const singleWinner = getSingleWinner();
    const { winners } = getWinners();
    if (singleWinner) {
      return `${singleWinner.name} の勝利。獲得マス部分が透明化し、隠し絵が見えます。`;
    }
    if (winners.length > 1) {
      return `引き分け（${winners.map((winner) => winner.name).join(" / ")}）。隠し絵は開放されません。`;
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

  els.boardGrid.innerHTML = state.board.map((cell, index) => {
    const isPending = pendingCell && pendingCell.index === index;
    if (cell.status === "claimed") {
      const team = teamLookup[cell.owner];
      const revealArt = isGameEnded() && singleWinner && singleWinner.id === cell.owner;
      return `
        <button class="cell-button" type="button" data-cell-index="${index}" ${cell.status !== "hidden" || state.pendingAssignment ? "disabled" : ""}>
          <div class="cell-face cell-claimed ${revealArt ? "cell-reveal" : ""} ${isPending ? "pending-highlight" : ""}" style="background:${revealArt ? "rgba(255,255,255,0.02)" : team.color}; border-color:${revealArt ? "rgba(255,255,255,0.55)" : team.border}; box-shadow:${revealArt ? "inset 0 0 0 1px rgba(255,255,255,0.08)" : `inset 0 0 0 1px ${team.border}`};">
            <div class="cell-owned-label">OWNED</div>
            <div class="cell-owned-team">${escapeHtml(team.name)}</div>
            <div class="cell-number">${cell.id}</div>
          </div>
        </button>
      `;
    }

    if (cell.status === "missed") {
      return `
        <button class="cell-button" type="button" data-cell-index="${index}" disabled>
          <div class="cell-face cell-missed ${isPending ? "pending-highlight" : ""}">
            <div class="no-point-mark">×</div>
            <div class="no-point-label">NO POINT</div>
          </div>
        </button>
      `;
    }

    return `
      <button class="cell-button" type="button" data-cell-index="${index}" ${state.pendingAssignment ? "disabled" : ""}>
        <div class="cell-face cell-hidden ${isPending ? "pending-highlight" : ""}">
          <div class="cell-kicker">QUIZ</div>
          <div class="cell-number">${cell.id}</div>
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
        ${isTop ? `<div class="score-top-label" style="color:${team.border};">トップ</div>` : ""}
      </article>
    `;
  }).join("");
}

function renderAssignmentPanel() {
  const pendingCell = getPendingCell();
  const teams = getTeams();

  if (!pendingCell || !state.pendingAssignment) {
    els.assignmentPanel.innerHTML = `
      <div class="assignment-idle">
        正解が出ると、このパネルに対象問題が表示されるでござる。ここで司会者が4チームのうち正答チームを選択すると、盤面へ反映される。
      </div>
    `;
    return;
  }

  els.assignmentPanel.innerHTML = `
    <div class="assignment-box">
      <div class="assignment-meta">確定待ち</div>
      <div class="assignment-question-id">問題 ${pendingCell.id}</div>
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

  els.modalLabel.textContent = `QUESTION ${modalCell.id}`;
  els.modalCategory.textContent = modalCell.category;
  els.modalTitle.textContent = modalCell.question;

  els.modalOptions.innerHTML = modalCell.options.map((option, index) => {
    const selected = state.selectedOption === index;
    const isCorrect = modalCell.correctIndex === index;
    const reveal = state.step !== "question";

    let border = "rgba(255,255,255,0.1)";
    let background = "rgba(255,255,255,0.04)";

    if (reveal && isCorrect) {
      border = "rgba(134,239,172,0.8)";
      background = "rgba(34,197,94,0.16)";
    } else if (reveal && selected && !isCorrect) {
      border = "rgba(252,165,165,0.75)";
      background = "rgba(239,68,68,0.16)";
    } else if (selected) {
      border = "rgba(125,211,252,0.8)";
      background = "rgba(14,165,233,0.16)";
    }

    return `
      <button class="option-btn" type="button" data-option-index="${index}" ${state.step !== "question" ? "disabled" : ""} style="border-color:${border}; background:${background};">
        <div class="option-row">
          <span class="option-letter">${String.fromCharCode(65 + index)}</span>
          <span>${escapeHtml(option)}</span>
        </div>
      </button>
    `;
  }).join("");

  els.modalOptions.querySelectorAll(".option-btn").forEach((button) => {
    if (button.disabled) return;
    button.addEventListener("click", () => answerQuestion(Number(button.dataset.optionIndex)));
  });

  if (state.step !== "question") {
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
        <div class="result-title">不正解</div>
        <div class="result-desc">このマスは空白のまま使用済みにします。</div>
      </div>
      <button id="commitMissBtn" class="btn btn-danger" type="button">確定する</button>
    `;
    document.getElementById("commitMissBtn").addEventListener("click", commitMiss);
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
  els.undoBtn.disabled = state.history.length === 0;
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
