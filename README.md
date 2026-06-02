# atack_steroid

## ローカルアプリとして起動

初回のみ依存関係をインストールします。

```powershell
npm install
```

開発・確認用に起動します。

```powershell
npm start
```

## 配布用フォルダを作成

Defender や SmartScreen に消されやすい単体ポータブル exe ではなく、展開済みフォルダ形式を標準にしています。

```powershell
npm run dist
```

作成後は `dist\win-unpacked\Steroid Quiz.exe` を起動します。

## 単体 exe を作る場合

単体 exe は未署名だと悪意あるアプリとして誤検知されやすいため、通常利用では推奨しません。

```powershell
npm run dist:portable
```
