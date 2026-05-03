const BOARD_SIZE = 5;
const MAX_ATTEMPTS = 3;

const TEAM_DEFS = [
  { id: "red", name: "\u30c1\u30fc\u30e0A", color: "#ef4444", soft: "rgba(239,68,68,0.18)", border: "rgba(254,202,202,0.9)" },
  { id: "blue", name: "\u30c1\u30fc\u30e0B", color: "#3b82f6", soft: "rgba(59,130,246,0.18)", border: "rgba(191,219,254,0.9)" },
  { id: "green", name: "\u30c1\u30fc\u30e0C", color: "#10b981", soft: "rgba(16,185,129,0.18)", border: "rgba(167,243,208,0.9)" },
  { id: "yellow", name: "\u30c1\u30fc\u30e0D", color: "#f59e0b", soft: "rgba(245,158,11,0.18)", border: "rgba(253,230,138,0.9)" },
];

const QUESTIONS = [
  { id: 1, category: "\u6295\u4e0e", question: "\u9577\u671f\u306e\u5168\u8eab\u6027\u30b9\u30c6\u30ed\u30a4\u30c9\u6295\u4e0e\u3092\u6025\u306b\u4e2d\u6b62\u3057\u305f\u3068\u304d\u3001\u6700\u3082\u6ce8\u610f\u3059\u3079\u304d\u72b6\u614b\u306f\u3069\u308c\uff1f", options: ["\u526f\u814e\u4e0d\u5168", "\u9ad8\u30ab\u30ea\u30a6\u30e0\u8840\u75c7\u306e\u6025\u901f\u6539\u5584", "\u5373\u6642\u578b\u30a2\u30ec\u30eb\u30ae\u30fc", "\u6025\u6027\u814e\u4e0d\u5168"], correctIndex: 0, explanation: "\u9577\u671f\u6295\u4e0e\u3067\u306f\u8996\u5e8a\u4e0b\u90e8-\u4e0b\u5782\u4f53-\u526f\u814e\u7cfb\u304c\u6291\u5236\u3055\u308c\u3001\u6025\u306a\u4e2d\u6b62\u3067\u526f\u814e\u4e0d\u5168\u3092\u6765\u3057\u3046\u308b\u3002" },
  { id: 2, category: "\u6295\u4e0e", question: "\u30d7\u30ec\u30c9\u30cb\u30be\u30ed\u30f3\u5185\u670d\u306e\u57fa\u672c\u7684\u306a\u670d\u7528\u30bf\u30a4\u30df\u30f3\u30b0\u3068\u3057\u3066\u6700\u3082\u4e00\u822c\u7684\u306a\u306e\u306f\u3069\u308c\uff1f", options: ["\u671d", "\u6627", "\u5915\u65b9", "\u5c31\u5bdd\u524d"], correctIndex: 0, explanation: "\u751f\u7406\u7684\u30b3\u30eb\u30c1\u30be\u30fc\u30eb\u5206\u6ccc\u306b\u5408\u308f\u305b\u3001\u671d\u6295\u4e0e\u304c\u57fa\u672c\u3068\u306a\u308b\u3053\u3068\u304c\u591a\u3044\u3002" },
  { id: 3, category: "\u526f\u4f5c\u7528", question: "\u30b9\u30c6\u30ed\u30a4\u30c9\u6295\u4e0e\u3067\u4e0a\u6607\u3057\u3084\u3059\u304f\u3001\u30e2\u30cb\u30bf\u30ea\u30f3\u30b0\u304c\u91cd\u8981\u306a\u3082\u306e\u306f\u3069\u308c\uff1f", options: ["\u8840\u7cd6", "\u8840\u4e2d\u9244", "\u5c3f\u9178\u306e\u307f", "\u30d3\u30ea\u30eb\u30d3\u30f3\u306e\u307f"], correctIndex: 0, explanation: "\u30b9\u30c6\u30ed\u30a4\u30c9\u306f\u8010\u7cd6\u80fd\u7570\u5e38\u3092\u8d77\u3053\u3057\u3046\u308b\u305f\u3081\u3001\u8840\u7cd6\u7ba1\u7406\u304c\u91cd\u8981\u3002" },
  { id: 4, category: "\u611f\u67d3", question: "\u30b9\u30c6\u30ed\u30a4\u30c9\u6295\u4e0e\u4e2d\u306e\u611f\u67d3\u75c7\u306b\u3064\u3044\u3066\u6b63\u3057\u3044\u306e\u306f\u3069\u308c\uff1f", options: ["\u708e\u75c7\u6240\u898b\u304c\u76ee\u7acb\u3061\u306b\u304f\u304f\u306a\u308b\u3053\u3068\u304c\u3042\u308b", "\u611f\u67d3\u30ea\u30b9\u30af\u306f\u4e0b\u304c\u308b", "\u6297\u83cc\u85ac\u306f\u7121\u52b9\u306b\u306a\u308b", "\u767a\u71b1\u306f\u5fc5\u305a\u9ad8\u5ea6\u306b\u306a\u308b"], correctIndex: 0, explanation: "\u514d\u75ab\u6291\u5236\u3068\u6297\u708e\u75c7\u4f5c\u7528\u306b\u3088\u308a\u3001\u611f\u67d3\u5fb4\u5019\u304c\u30de\u30b9\u30af\u3055\u308c\u308b\u3053\u3068\u304c\u3042\u308b\u3002" },
  { id: 5, category: "\u5438\u5165", question: "\u5438\u5165\u30b9\u30c6\u30ed\u30a4\u30c9\u5f8c\u306e\u3046\u304c\u3044\u306e\u4e3b\u76ee\u7684\u306f\u3069\u308c\uff1f", options: ["\u53e3\u8154\u30ab\u30f3\u30b8\u30c0\u4e88\u9632", "\u85ac\u52b9\u5897\u5f37", "\u6c17\u9053\u4e7e\u71e5\u306e\u4fc3\u9032", "\u983b\u8108\u4e88\u9632"], correctIndex: 0, explanation: "\u53e3\u8154\u5185\u3078\u306e\u6b8b\u7559\u3092\u6e1b\u3089\u3057\u3001\u53e3\u8154\u30ab\u30f3\u30b8\u30c0\u3084\u5617\u58f0\u3092\u4e88\u9632\u3059\u308b\u3002" },
  { id: 6, category: "\u9aa8\u4ee3\u8b1d", question: "\u9577\u671f\u30b9\u30c6\u30ed\u30a4\u30c9\u6295\u4e0e\u3067\u7279\u306b\u554f\u984c\u3068\u306a\u308b\u9aa8\u95a2\u9023\u306e\u526f\u4f5c\u7528\u306f\u3069\u308c\uff1f", options: ["\u9aa8\u7c97\u9b86\u75c7", "\u9aa8\u9ac4\u708e", "\u9aa8\u8089\u816b", "\u75b2\u52b4\u9aa8\u6298\u306e\u5b8c\u5168\u4e88\u9632"], correctIndex: 0, explanation: "\u9577\u671f\u6295\u4e0e\u3067\u306f\u9aa8\u91cf\u6e1b\u5c11\u304c\u8d77\u3053\u308a\u3001\u9aa8\u7c97\u9b86\u75c7\u30ea\u30b9\u30af\u304c\u4e0a\u304c\u308b\u3002" },
  { id: 7, category: "\u4f5c\u7528", question: "\u30b9\u30c6\u30ed\u30a4\u30c9\u306e\u9271\u8cea\u30b3\u30eb\u30c1\u30b3\u30a4\u30c9\u4f5c\u7528\u3067\u8d77\u3053\u308a\u3084\u3059\u3044\u306e\u306f\u3069\u308c\uff1f", options: ["\u30ca\u30c8\u30ea\u30a6\u30e0\u30fb\u6c34\u5206\u8caf\u7559", "\u4f4e\u8840\u7cd6", "\u5f90\u8108", "\u4f4e\u773c\u5727"], correctIndex: 0, explanation: "\u9271\u8cea\u30b3\u30eb\u30c1\u30b3\u30a4\u30c9\u4f5c\u7528\u306b\u3088\u308aNa\u30fb\u6c34\u5206\u8caf\u7559\u3001\u6d6e\u816b\u3001\u8840\u5727\u4e0a\u6607\u3092\u6765\u3057\u3046\u308b\u3002" },
  { id: 8, category: "\u76ae\u819a", question: "\u5916\u7528\u30b9\u30c6\u30ed\u30a4\u30c9\u306e\u5c40\u6240\u526f\u4f5c\u7528\u3068\u3057\u3066\u4ee3\u8868\u7684\u306a\u306e\u306f\u3069\u308c\uff1f", options: ["\u76ae\u819a\u840e\u7e2e", "\u6c38\u4e45\u7684\u306a\u767a\u6bdb\u5897\u5f37", "\u89d2\u819c\u6df7\u6fc1", "\u4f4e\u8840\u7cd6"], correctIndex: 0, explanation: "\u9577\u671f\u30fb\u4e0d\u9069\u5207\u4f7f\u7528\u3067\u76ae\u819a\u840e\u7e2e\u3001\u6bdb\u7d30\u8840\u7ba1\u62e1\u5f35\u306a\u3069\u304c\u307f\u3089\u308c\u308b\u3002" },
  { id: 9, category: "\u5468\u8853\u671f", question: "\u9577\u671f\u30b9\u30c6\u30ed\u30a4\u30c9\u4f7f\u7528\u60a3\u8005\u304c\u624b\u8853\u3084\u91cd\u75c7\u611f\u67d3\u306a\u3069\u5f37\u3044\u30b9\u30c8\u30ec\u30b9\u306b\u3055\u3089\u3055\u308c\u308b\u969b\u3001\u8003\u616e\u3059\u3079\u304d\u306a\u306e\u306f\u3069\u308c\uff1f", options: ["\u30b9\u30c6\u30ed\u30a4\u30c9\u88dc\u5145\u306e\u8ffd\u52a0", "\u5fc5\u305a\u5373\u65e5\u4e2d\u6b62", "\u8f38\u6db2\u7981\u6b62", "\u93ae\u75db\u85ac\u4e2d\u6b62"], correctIndex: 0, explanation: "\u526f\u814e\u6291\u5236\u304c\u3042\u308b\u5834\u5408\u3001\u30b9\u30c8\u30ec\u30b9\u6642\u306b\u306f\u8ffd\u52a0\u88dc\u5145\u304c\u5fc5\u8981\u306b\u306a\u308b\u3053\u3068\u304c\u3042\u308b\u3002" },
  { id: 10, category: "\u7cbe\u795e\u75c7\u72b6", question: "\u30b9\u30c6\u30ed\u30a4\u30c9\u3067\u8d77\u3053\u308a\u3046\u308b\u7cbe\u795e\u30fb\u795e\u7d4c\u75c7\u72b6\u3068\u3057\u3066\u9069\u5207\u306a\u306e\u306f\u3069\u308c\uff1f", options: ["\u4e0d\u7720\u3084\u6c17\u5206\u5909\u8abf", "\u5931\u8a9e\u306e\u307f", "\u5fc5\u767a\u306e\u3051\u3044\u308c\u3093", "\u8074\u529b\u306e\u6052\u4e45\u6539\u5584"], correctIndex: 0, explanation: "\u4e0d\u7720\u3001\u6c17\u5206\u9ad8\u63da\u3001\u6291\u3046\u3064\u3001\u305b\u3093\u5984\u306a\u3069\u304c\u8d77\u3053\u308a\u3046\u308b\u3002" },
  { id: 11, category: "\u30ef\u30af\u30c1\u30f3", question: "\u9ad8\u7528\u91cf\u306e\u5168\u8eab\u6027\u30b9\u30c6\u30ed\u30a4\u30c9\u6295\u4e0e\u4e2d\u306b\u539f\u5247\u3068\u3057\u3066\u614e\u91cd\u306b\u306a\u308b\u3079\u304d\u3082\u306e\u306f\u3069\u308c\uff1f", options: ["\u751f\u30ef\u30af\u30c1\u30f3", "\u4e0d\u6d3b\u5316\u30ef\u30af\u30c1\u30f3\u306e\u7b4b\u6ce8", "\u7d4c\u53e3\u88dc\u6c34", "\u8840\u5727\u6e2c\u5b9a"], correctIndex: 0, explanation: "\u514d\u75ab\u6291\u5236\u4e0b\u3067\u306f\u751f\u30ef\u30af\u30c1\u30f3\u63a5\u7a2e\u304c\u554f\u984c\u3068\u306a\u308b\u3002" },
  { id: 12, category: "\u5916\u898b\u5909\u5316", question: "\u30af\u30c3\u30b7\u30f3\u30b0\u69d8\u5909\u5316\u3068\u3057\u3066\u4ee3\u8868\u7684\u306a\u306e\u306f\u3069\u308c\uff1f", options: ["\u30e0\u30fc\u30f3\u30d5\u30a7\u30a4\u30b9", "\u7e2e\u77b3", "\u773c\u7403\u7a81\u51fa\u306e\u5fc5\u767a", "\u96e3\u8074"], correctIndex: 0, explanation: "\u4e2d\u5fc3\u6027\u80a5\u6e80\u3084\u30e0\u30fc\u30f3\u30d5\u30a7\u30a4\u30b9\u306a\u3069\u306e\u5916\u898b\u5909\u5316\u304c\u307f\u3089\u308c\u308b\u3053\u3068\u304c\u3042\u308b\u3002" },
  { id: 13, category: "\u773c\u79d1", question: "\u30b9\u30c6\u30ed\u30a4\u30c9\u4f7f\u7528\u3067\u773c\u79d1\u7684\u306b\u6ce8\u610f\u3059\u3079\u304d\u526f\u4f5c\u7528\u3068\u3057\u3066\u9069\u5207\u306a\u306e\u306f\u3069\u308c\uff1f", options: ["\u773c\u5727\u4e0a\u6607", "\u7db2\u819c\u8840\u6d41\u306e\u5fc5\u767a\u505c\u6b62", "\u8272\u899a\u306e\u6025\u901f\u6539\u5584", "\u8fd1\u8996\u306e\u5b8c\u5168\u6d88\u5931"], correctIndex: 0, explanation: "\u9577\u671f\u4f7f\u7528\u3067\u773c\u5727\u4e0a\u6607\u3084\u767d\u5185\u969c\u306a\u3069\u306b\u6ce8\u610f\u3059\u308b\u3002" },
  { id: 14, category: "\u6d88\u5316\u5668", question: "\u6d88\u5316\u7ba1\u969c\u5bb3\u306e\u89b3\u70b9\u3067\u3001\u30b9\u30c6\u30ed\u30a4\u30c9\u3068\u4f75\u7528\u6642\u306b\u3088\u308a\u6ce8\u610f\u304c\u5fc5\u8981\u306a\u85ac\u306f\u3069\u308c\uff1f", options: ["NSAIDs", "\u5236\u9178\u85ac", "\u6574\u8178\u85ac", "\u7d4c\u53e3\u88dc\u6c34\u6db2"], correctIndex: 0, explanation: "NSAIDs\u4f75\u7528\u3067\u306f\u6d88\u5316\u7ba1\u969c\u5bb3\u30ea\u30b9\u30af\u304c\u554f\u984c\u3068\u306a\u308b\u3002" },
  { id: 15, category: "\u5c0f\u5150", question: "\u5c0f\u5150\u306e\u9577\u671f\u30b9\u30c6\u30ed\u30a4\u30c9\u6295\u4e0e\u3067\u7279\u306b\u610f\u8b58\u3059\u3079\u304d\u70b9\u306f\u3069\u308c\uff1f", options: ["\u6210\u9577\u3078\u306e\u5f71\u97ff", "\u6c38\u4e45\u6b6f\u306e\u5373\u6642\u8131\u843d", "\u8eab\u9577\u306e\u6025\u901f\u5897\u52a0", "\u5fc5\u767a\u306e\u9ad8\u8eab\u9577"], correctIndex: 0, explanation: "\u5c0f\u5150\u3067\u306f\u6210\u9577\u969c\u5bb3\u306b\u3082\u6ce8\u610f\u304c\u5fc5\u8981\u3002" },
  { id: 16, category: "\u770b\u8b77", question: "\u30b9\u30c6\u30ed\u30a4\u30c9\u6295\u4e0e\u60a3\u8005\u306e\u89b3\u5bdf\u9805\u76ee\u3068\u3057\u3066\u4e0d\u9069\u5207\u306a\u306e\u306f\u3069\u308c\uff1f", options: ["\u611f\u67d3\u5fb4\u5019\u30fb\u8840\u7cd6\u30fb\u8840\u5727\u306e\u78ba\u8a8d", "\u4f53\u91cd\u5909\u5316\u306e\u78ba\u8a8d", "\u6d6e\u816b\u306e\u89b3\u5bdf", "\u6295\u4e0e\u4e2d\u306f\u4f55\u3082\u89b3\u5bdf\u3057\u306a\u304f\u3066\u3088\u3044"], correctIndex: 3, explanation: "\u611f\u67d3\u3001\u8840\u7cd6\u3001\u8840\u5727\u3001\u6d6e\u816b\u3001\u4f53\u91cd\u3001\u7cbe\u795e\u75c7\u72b6\u306a\u3069\u591a\u9762\u7684\u306a\u89b3\u5bdf\u304c\u5fc5\u8981\u3002" },
  { id: 17, category: "\u96fb\u89e3\u8cea", question: "\u30b9\u30c6\u30ed\u30a4\u30c9\u306e\u5f71\u97ff\u3067\u8d77\u3053\u308a\u3046\u308b\u96fb\u89e3\u8cea\u5909\u5316\u3068\u3057\u3066\u6bd4\u8f03\u7684\u77e5\u3089\u308c\u308b\u306e\u306f\u3069\u308c\uff1f", options: ["\u4f4e\u30ab\u30ea\u30a6\u30e0\u8840\u75c7", "\u9ad8\u30de\u30b0\u30cd\u30b7\u30a6\u30e0\u8840\u75c7\u306e\u307f", "\u91cd\u5ea6\u9ad8\u30ea\u30f3\u8840\u75c7\u306e\u307f", "\u5fc5\u767a\u306e\u9ad8\u30ab\u30eb\u30b7\u30a6\u30e0\u8840\u75c7"], correctIndex: 0, explanation: "\u9271\u8cea\u30b3\u30eb\u30c1\u30b3\u30a4\u30c9\u4f5c\u7528\u306e\u5f37\u3044\u85ac\u3067\u306f\u4f4e\u30ab\u30ea\u30a6\u30e0\u8840\u75c7\u306b\u6ce8\u610f\u3059\u308b\u3002" },
  { id: 18, category: "\u76ae\u819a\u30fb\u5275\u50b7", question: "\u30b9\u30c6\u30ed\u30a4\u30c9\u4f7f\u7528\u3067\u9045\u308c\u3084\u3059\u3044\u3082\u306e\u306f\u3069\u308c\uff1f", options: ["\u5275\u50b7\u6cbb\u7652", "\u8108\u62cd\u306e\u6e2c\u5b9a", "\u5c3f\u91cf\u8a18\u9332", "\u4f53\u6e29\u6e2c\u5b9a"], correctIndex: 0, explanation: "\u5275\u50b7\u6cbb\u7652\u9045\u5ef6\u306f\u91cd\u8981\u306a\u526f\u4f5c\u7528\u306e\u4e00\u3064\u3002" },
  { id: 19, category: "\u60a3\u8005\u6307\u5c0e", question: "\u60a3\u8005\u6307\u5c0e\u3068\u3057\u3066\u9069\u5207\u306a\u306e\u306f\u3069\u308c\uff1f", options: ["\u81ea\u5df1\u5224\u65ad\u3067\u6025\u306b\u4e2d\u6b62\u3057\u306a\u3044", "\u98f2\u307f\u5fd8\u308c\u6642\u306f\u7fcc\u65e5\u306b10\u500d\u91cf\u3092\u98f2\u3080", "\u611f\u67d3\u75c7\u72b6\u306f\u5fc5\u305a\u8efd\u3044\u306e\u3067\u53d7\u8a3a\u4e0d\u8981", "\u526f\u4f5c\u7528\u306f\u7d76\u5bfe\u306b\u8d77\u3053\u3089\u306a\u3044\u3068\u8aac\u660e\u3059\u308b"], correctIndex: 0, explanation: "\u81ea\u5df1\u4e2d\u65ad\u306f\u5371\u967a\u3067\u3042\u308a\u3001\u6307\u793a\u3069\u304a\u308a\u306e\u6f38\u6e1b\u3084\u53d7\u8a3a\u304c\u91cd\u8981\u3002" },
  { id: 20, category: "\u85ac\u7406", question: "\u30b9\u30c6\u30ed\u30a4\u30c9\u306e\u7cd6\u8cea\u30b3\u30eb\u30c1\u30b3\u30a4\u30c9\u4f5c\u7528\u3068\u3057\u3066\u6b63\u3057\u3044\u306e\u306f\u3069\u308c\uff1f", options: ["\u6297\u708e\u75c7\u4f5c\u7528\u304c\u3042\u308b", "\u8840\u7cd6\u3092\u4e0b\u3052\u308b", "\u514d\u75ab\u3092\u5fc5\u305a\u5897\u5f37\u3059\u308b", "\u9aa8\u5f62\u6210\u3092\u4fc3\u9032\u3059\u308b"], correctIndex: 0, explanation: "\u7cd6\u8cea\u30b3\u30eb\u30c1\u30b3\u30a4\u30c9\u4f5c\u7528\u306b\u306f\u6297\u708e\u75c7\u30fb\u514d\u75ab\u6291\u5236\u304c\u542b\u307e\u308c\u308b\u3002" },
  { id: 21, category: "\u5168\u8eab\u7ba1\u7406", question: "\u30b9\u30c6\u30ed\u30a4\u30c9\u6295\u4e0e\u4e2d\u306e\u4e00\u822c\u7684\u306a\u526f\u4f5c\u7528\u3068\u3057\u3066\u9069\u5207\u306a\u306e\u306f\u3069\u308c\uff1f", options: ["\u8840\u5727\u4e0a\u6607", "\u5fc5\u767a\u306e\u5f90\u8108", "\u4e0d\u53ef\u9006\u7684\u306a\u4f4e\u4f53\u6e29\u306e\u307f", "\u6025\u901f\u306a\u8131\u6c34\u306e\u307f"], correctIndex: 0, explanation: "\u6c34\u5206\u8caf\u7559\u306a\u3069\u306b\u3088\u308a\u8840\u5727\u304c\u4e0a\u6607\u3059\u308b\u3053\u3068\u304c\u3042\u308b\u3002" },
  { id: 22, category: "\u6295\u4e0e\u7d4c\u8def", question: "\u30b9\u30c6\u30ed\u30a4\u30c9\u306e\u30d1\u30eb\u30b9\u7642\u6cd5\u306e\u7279\u5fb4\u3068\u3057\u3066\u6b63\u3057\u3044\u306e\u306f\u3069\u308c\uff1f", options: ["\u5927\u91cf\u3092\u77ed\u671f\u9593\u6295\u4e0e\u3057\u3001\u6025\u901f\u306b\u6e1b\u91cf\u3059\u308b", "\u5c11\u91cf\u3092\u6c38\u4e45\u306b\u7d9a\u3051\u308b", "\u5185\u670d\u306e\u307f\u3067\u884c\u3046", "\u70b9\u6ef4\u306f\u7981\u5fcc\u3067\u3042\u308b"], correctIndex: 0, explanation: "\u30d1\u30eb\u30b9\u7642\u6cd5\u306f\u5927\u91cf\u3092\u77ed\u671f\u9593\u6295\u4e0e\u3057\u3001\u6e1b\u91cf\u3059\u308b\u65b9\u6cd5\u3002" },
  { id: 23, category: "\u526f\u4f5c\u7528", question: "\u30b9\u30c6\u30ed\u30a4\u30c9\u6027\u7cd6\u5c3f\u75c5\u306e\u7279\u5fb4\u3068\u3057\u3066\u6b63\u3057\u3044\u306e\u306f\u3069\u308c\uff1f", options: ["\u98df\u5f8c\u9ad8\u8840\u7cd6\u304c\u76ee\u7acb\u3064\u3053\u3068\u304c\u3042\u308b", "\u5fc5\u305a\u7a7a\u8179\u6642\u306e\u307f\u9ad8\u8840\u7cd6\u306b\u306a\u308b", "\u30a4\u30f3\u30b9\u30ea\u30f3\u306f\u7d76\u5bfe\u4e0d\u8981", "\u98df\u4e8b\u7642\u6cd5\u306f\u7121\u52b9\u3067\u3042\u308b"], correctIndex: 0, explanation: "\u30b9\u30c6\u30ed\u30a4\u30c9\u6027\u7cd6\u5c3f\u75c5\u3067\u306f\u98df\u5f8c\u9ad8\u8840\u7cd6\u304c\u76ee\u7acb\u3064\u3053\u3068\u304c\u3042\u308b\u3002" },
  { id: 24, category: "\u7279\u6b8a\u72b6\u6cc1", question: "\u59b9\u5a20\u4e2d\u306e\u30b9\u30c6\u30ed\u30a4\u30c9\u4f7f\u7528\u306b\u3064\u3044\u3066\u6b63\u3057\u3044\u306e\u306f\u3069\u308c\uff1f", options: ["\u75be\u60a3\u306b\u3088\u3063\u3066\u306f\u4f7f\u7528\u3055\u308c\u308b\u3053\u3068\u304c\u3042\u308b", "\u7d76\u5bfe\u306b\u7981\u5fcc\u3067\u3042\u308b", "\u5927\u91cf\u6295\u4e0e\u304c\u63a8\u5968\u3055\u308c\u308b", "\u80ce\u5150\u306b\u5f71\u97ff\u306f\u306a\u3044"], correctIndex: 0, explanation: "\u75be\u60a3\u306b\u3088\u3063\u3066\u306f\u6177\u91cd\u306b\u4f7f\u7528\u3055\u308c\u308b\u3053\u3068\u304c\u3042\u308b\u3002" },
  { id: 25, category: "\u5168\u8eab\u7ba1\u7406", question: "\u30b9\u30c6\u30ed\u30a4\u30c9\u6295\u4e0e\u4e2d\u306e\u4e00\u822c\u7684\u306a\u526f\u4f5c\u7528\u3068\u3057\u3066\u9069\u5207\u306a\u306e\u306f\u3069\u308c\uff1f", options: ["\u8840\u5727\u4e0a\u6607", "\u5fc5\u767a\u306e\u5f90\u8108", "\u4e0d\u53ef\u9006\u7684\u306a\u4f4e\u4f53\u6e29\u306e\u307f", "\u6025\u901f\u306a\u8131\u6c34\u306e\u307f"], correctIndex: 0, explanation: "\u6c34\u5206\u8caf\u7559\u306a\u3069\u306b\u3088\u308a\u8840\u5727\u304c\u4e0a\u6607\u3059\u308b\u3053\u3068\u304c\u3042\u308b\u3002" },
];

const DIRECTIONS = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1],           [0, 1],
  [1, -1],  [1, 0],  [1, 1],
];

const state = {
  board: [],
  modalCellIndex: null,
  step: "question", // "question" | "wrong" | "result"
  selectedOption: null,
  history: [],
  log: ["\u958b\u59cb\u524d\uff1a\u597d\u304d\u306a\u30de\u30b9\u3092\u9078\u3073\u3001\u6b63\u7b54\u30c1\u30fc\u30e0\u3092\u53f3\u5074\u30d1\u30cd\u30eb\u3067\u78ba\u5b9a\u3059\u308b\u65b9\u5f0f\u3067\u3059\u3002"],
  pendingAssignment: null,
  teamNames: TEAM_DEFS.map((team) => team.name),
  collapseAnimating: false,
  collapseFinished: false,
  // 各セルの回答試行回数と使用済み選択肢を追跡
  attempts: {},        // { [cellIndex]: number }
  usedOptions: {},     // { [cellIndex]: number[] }
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

// missedパネル（不正解・灰色）は反転対象外。挟み判定で壁として扱い、連鎖を中断する。
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

      // missedパネルに当たったら挟み不成立（壁扱い）
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

  // 回答試行回数を増やす
  state.attempts[cellIndex] = (state.attempts[cellIndex] || 0) + 1;
  if (!state.usedOptions[cellIndex]) {
    state.usedOptions[cellIndex] = [];
  }
  state.usedOptions[cellIndex].push(optionIndex);

  const attemptCount = state.attempts[cellIndex];

  if (optionIndex === modalCell.correctIndex) {
    // 正解
    state.pendingAssignment = {
      cellIndex: cellIndex,
      selectedOption: optionIndex,
      questionId: modalCell.id,
      category: modalCell.category,
      question: modalCell.question,
      explanation: modalCell.explanation,
    };
    setLogEntry(`${modalCell.id}\u756a\uff1a\u6b63\u89e3\uff08${attemptCount}\u56de\u76ee\uff09\u3002\u53f3\u5074\u30d1\u30cd\u30eb\u3067\u7372\u5f97\u30c1\u30fc\u30e0\u3092\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044\u3002`);
    closeModal();
    return;
  }

  // 不正解
  if (attemptCount >= MAX_ATTEMPTS) {
    // 3回目の誤答 → 不正解パネル確定
    state.step = "result";
  } else {
    // 1・2回目の誤答 → 再挑戦可能
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
  setLogEntry(`${modalCell.id}\u756a\uff1a${MAX_ATTEMPTS}\u56de\u4e0d\u6b63\u89e3\u3002\u7070\u8272\u30d1\u30cd\u30eb\u3068\u3057\u3066\u56fa\u5b9a\u3002`);
  closeModal();

  // 全マス埋まったか確認して崩れ落ち演出
  if (isGameEnded()) {
    setTimeout(() => triggerCollapseAnimation(), 600);
  }
}

function retryQuestion() {
  // 再挑戦：questionステップに戻す（選択肢の使用済み状態はusedOptionsで管理）
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
  setLogEntry(`${assignmentCell.id}\u756a\uff1a${teamName}\u304c\u7372\u5f97\u3002${flipped > 0 ? `${flipped}\u30de\u30b9\u53cd\u8ee2\u3002` : "\u53cd\u8ee2\u306a\u3057\u3002"}`);
  closeModal();

  // 全マス埋まったか確認して崩れ落ち演出
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
  }, maxDelay);
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
  state.log = ["\u30b2\u30fc\u30e0\u3092\u30ea\u30bb\u30c3\u30c8\u3057\u307e\u3057\u305f\u3002"];
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
  hideModal();
  render();
}

function getStatusText() {
  const pendingCell = getPendingCell();
  if (pendingCell) {
    return `${pendingCell.id}\u756a\u304c\u6b63\u89e3\u6e08\u307f\u3002\u53f3\u5074\u30d1\u30cd\u30eb\u3067\u7372\u5f97\u30c1\u30fc\u30e0\u3092\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044\u3002`;
  }

  if (state.collapseAnimating) {
    return "\u7d50\u679c\u6f14\u51fa\u4e2d...";
  }

  if (isGameEnded()) {
    const singleWinner = getSingleWinner();
    const { winners } = getWinners();
    if (singleWinner) {
      return `${singleWinner.name} \u306e\u52dd\u5229\uff01\u7372\u5f97\u30de\u30b9\u3068\u4e0d\u6b63\u89e3\u30d1\u30cd\u30eb\u304c\u6b8b\u308a\u3001\u4ed6\u306f\u5d29\u308c\u843d\u3061\u307e\u3057\u305f\u3002`;
    }
    if (winners.length > 1) {
      return `\u5f15\u304d\u5206\u3051\uff08${winners.map((winner) => winner.name).join(" / ")}\uff09\u3002\u4e0d\u6b63\u89e3\u30d1\u30cd\u30eb\u306e\u307f\u6b8b\u308a\u307e\u3057\u305f\u3002`;
    }
    return "\u5168\u554f\u7d42\u4e86\u3002\u52dd\u8005\u306a\u3057\u3002";
  }

  const unresolved = state.board.filter((cell) => cell.status === "hidden").length;
  return `\u6b8b\u308a ${unresolved} \u554f\u3002\u6b63\u89e3\u3057\u305f\u554f\u984c\u306f\u3001\u53f3\u5074\u306e\u56fa\u5b9a\u30d1\u30cd\u30eb\u3067\u7372\u5f97\u30c1\u30fc\u30e0\u3092\u78ba\u5b9a\u3057\u307e\u3059\u3002`;
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
            <div class="no-point-mark">\u00d7</div>
            <div class="no-point-label">NO POINT</div>
            <div class="cell-number" style="font-size:0.8rem; margin-top:2px; opacity:0.6;">${cell.id}</div>
          </div>
        </button>
      `;
    }

    // hiddenセル：回答試行中の場合はバッジ表示
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
                <div class="score-team-sub">\u7372\u5f97\u30de\u30b9</div>
              </div>
            </div>
          </div>
          <div class="score-value">${counts[team.id]}</div>
        </div>
        ${isTop ? `<div class="score-top-label">\u30c8\u30c3\u30d7</div>` : ""}
      </article>
    `;
  }).join("") + `
    <article class="score-card" style="background:rgba(100,116,139,0.12); border-color:rgba(148,163,184,0.3);">
      <div class="score-row">
        <div class="score-team-box">
          <div class="team-name-top" style="margin-bottom:0;">
            <span class="color-dot" style="background:#64748b;"></span>
            <div>
              <div class="score-team-title">\u4e0d\u6b63\u89e3</div>
              <div class="score-team-sub">\u56fa\u5b9a\u30d1\u30cd\u30eb</div>
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
  const pendingCell = getPendingCell();

  if (!state.pendingAssignment) {
    els.assignmentPanel.innerHTML = `
      <div class="assignment-idle">
        <p>\u6b63\u89e3\u304c\u51fa\u308b\u3068\u3001\u3053\u306e\u30d1\u30cd\u30eb\u306b\u5bfe\u8c61\u554f\u984c\u304c\u8868\u793a\u3055\u308c\u308b\u3067\u3054\u3056\u308b\u3002\u3053\u3053\u3067\u53f8\u4f1a\u8005\u304c4\u30c1\u30fc\u30e0\u306e\u3046\u3061\u6b63\u7b54\u30c1\u30fc\u30e0\u3092\u9078\u629e\u3059\u308b\u3068\u3001\u76e4\u9762\u3078\u53cd\u6620\u3055\u308c\u308b\u3002</p>
      </div>
    `;
    return;
  }

  els.assignmentPanel.innerHTML = `
    <div class="assignment-box">
      <div class="assignment-meta">\u78ba\u5b9a\u5f85\u3061</div>
      <div class="assignment-question-id">\u554f\u984c ${state.pendingAssignment.questionId}</div>
      <div class="assignment-category">${escapeHtml(state.pendingAssignment.category)}</div>
      <div class="assignment-question">${escapeHtml(state.pendingAssignment.question)}</div>
    </div>
    <div class="explanation-box">
      <div class="assignment-meta" style="color: var(--text-sub); letter-spacing:0.2em;">\u89e3\u8aac</div>
      <div style="margin-top:8px;">${escapeHtml(state.pendingAssignment.explanation)}</div>
    </div>
    <div class="assignment-team-grid">
      ${teams.map((team) => `
        <button class="assignment-team-btn" type="button" data-team-id="${team.id}" style="border-color:${team.border}; background:${team.soft};">
          <div class="team-name-top" style="margin-bottom:0; color:white;">
            <span class="color-dot" style="background:${team.color}; box-shadow:0 0 16px ${team.color};"></span>
            <div>
              <div class="assignment-team-title">${escapeHtml(team.name)}</div>
              <div class="assignment-team-sub">\u3053\u306e\u30c1\u30fc\u30e0\u306b\u78ba\u5b9a\u3059\u308b</div>
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

  // 回答権バッジ表示
  const attemptInfoHtml = `<div class="modal-attempt-info">\u56de\u7b54\u6a29\uff1a<span class="attempt-remaining ${remaining <= 1 ? "attempt-danger" : ""}">${remaining}</span> / ${MAX_ATTEMPTS}</div>`;

  els.modalOptions.innerHTML = attemptInfoHtml + modalCell.options.map((option, index) => {
    const selected = state.selectedOption === index;
    const isCorrect = modalCell.correctIndex === index;
    const isUsed = usedOpts.includes(index);
    const reveal = state.step === "result"; // 3回目不正解時のみ正解を表示

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

    // 使用済み選択肢はdisabled（questionステップ時）
    if (state.step === "question" && isUsed) {
      disabled = true;
      border = "rgba(255,255,255,0.06)";
      background = "rgba(239,68,68,0.06)";
    }

    // wrong/resultステップでは全選択肢disabled
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

  // 解説表示：3回目不正解時のみ
  if (state.step === "result") {
    els.modalExplanation.classList.remove("hidden");
    els.modalExplanation.innerHTML = `
      <div class="assignment-meta" style="color: var(--text-sub); letter-spacing:0.2em;">\u89e3\u8aac</div>
      <div style="margin-top:8px;">${escapeHtml(modalCell.explanation)}</div>
    `;
  } else {
    els.modalExplanation.classList.add("hidden");
    els.modalExplanation.innerHTML = "";
  }

  // 結果バー
  if (state.step === "result") {
    // 3回目不正解 → 確定ボタン
    els.modalResultBar.classList.remove("hidden");
    els.modalResultBar.innerHTML = `
      <div>
        <div class="result-title">${MAX_ATTEMPTS}\u56de\u4e0d\u6b63\u89e3</div>
        <div class="result-desc">\u3053\u306e\u30de\u30b9\u306f\u7070\u8272\u306e\u4e0d\u6b63\u89e3\u30d1\u30cd\u30eb\u3068\u3057\u3066\u56fa\u5b9a\u3055\u308c\u307e\u3059\u3002</div>
      </div>
      <button id="commitMissBtn" class="btn btn-danger" type="button">\u78ba\u5b9a\u3059\u308b</button>
    `;
    document.getElementById("commitMissBtn").addEventListener("click", commitMiss);
  } else if (state.step === "wrong") {
    // 1・2回目不正解 → 再挑戦ボタン（解説は非表示）
    els.modalResultBar.classList.remove("hidden");
    els.modalResultBar.innerHTML = `
      <div>
        <div class="result-title">\u4e0d\u6b63\u89e3</div>
        <div class="result-desc">\u6b8b\u308a\u56de\u7b54\u6a29\uff1a${remaining} \u56de\u3002\u3082\u3046\u4e00\u5ea6\u6311\u6226\u3067\u304d\u307e\u3059\u3002</div>
      </div>
      <button id="retryBtn" class="btn btn-retry" type="button">\u3082\u3046\u4e00\u5ea6\u6311\u6226</button>
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
