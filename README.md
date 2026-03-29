# 支店組織図プロフィールアプリ

東日本支店の組織図とメンバープロフィールを確認し、その場で編集できる Web アプリです。共有サーバーで起動すれば、ほかのPCからも同じ内容を閲覧でき、Cloudflare Pages + D1 を使えば無料でインターネット公開できます。

## できること

- 組織図のカードを押して詳細を表示
- メンバー一覧からプロフィールを表示
- 年齢、入社年、勤続、経歴をシンプル表示
- 年齢、入社年、勤続、経歴、営業所紹介などを画面上で編集
- `業務1部` から `業務3部` を折りたたみ表示
- 共有サーバー経由なら編集内容を共通データとして保存
- Cloudflare Pages + D1 へ載せると、無料で常時公開できる

## 共有で使う方法

1. このPCで `start-shared.bat` か `node server.js` を実行します。
2. 画面に表示された `http://...:3000` のアドレスを確認します。
3. 同じネットワーク内のほかのPCで、そのアドレスをブラウザに開きます。
4. 編集内容は [data/org-data.json](C:/Users/cotto/OneDrive/デスクトップ/codex/data/org-data.json) に保存され、同じサーバーを見ているPCで共有されます。

Node.js が入っていないPCでは共有サーバーは起動できません。
最初の起動時に Windows ファイアウォールの確認が出たら、社内ネットワークでのアクセスを許可してください。

## 無料で常設公開する方法

このPCの電源状態に関係なく、無料で公開するなら Cloudflare Pages + D1 が最短です。

1. GitHub に新しいリポジトリを作成します。
2. `cmd /c npm run prepare:github` を実行して、[build/github-upload](C:/Users/cotto/OneDrive/デスクトップ/codex/build/github-upload) を作ります。
3. GitHub へは [build/github-upload](C:/Users/cotto/OneDrive/デスクトップ/codex/build/github-upload) の中身だけをアップロードします。
4. Cloudflare Pages で GitHub リポジトリを接続します。
5. Build command は `npm run build:pages`、Build output directory は `build/cloudflare-pages` にします。
6. Cloudflare で D1 データベースを1つ作成します。
7. Pages の `Settings` → `Bindings` で、D1 を `ORG_DB` という名前で接続します。
8. 再デプロイすると `*.pages.dev` のURLで誰のPCからでも見られます。

この構成では以下を使います。

- [wrangler.jsonc](C:/Users/cotto/OneDrive/デスクトップ/codex/wrangler.jsonc): Cloudflare Pages / D1 の設定
- [functions/api/org-data.js](C:/Users/cotto/OneDrive/デスクトップ/codex/functions/api/org-data.js): D1 を使う共有保存API
- [tools/build-pages.mjs](C:/Users/cotto/OneDrive/デスクトップ/codex/tools/build-pages.mjs): 公開用ファイルの出力
- [tools/prepare-github-upload.mjs](C:/Users/cotto/OneDrive/デスクトップ/codex/tools/prepare-github-upload.mjs): GitHub アップロード用に必要ファイルだけをまとめる

D1 が空でも画面は初期データで開き、最初の保存時に共有DBへ内容が入ります。

## 使い方

1. 個人確認だけなら `index.html` をブラウザで開きます。
2. 共有利用なら `start-shared.bat` か `node server.js` で起動したURLを開きます。
3. インターネット公開なら `npm run deploy:pages` 後のURLを開きます。
4. 組織図のカード、または下部の一覧からメンバーを選択します。
5. 右側の詳細パネルで内容を確認し、必要なら編集して保存します。

## ファイル

- `index.html`: 画面構成
- `styles.css`: レイアウトと見た目
- `script.js`: 組織図描画、編集、保存
- `server.js`: 共有閲覧用の簡易サーバー
- `start-shared.bat`: 共有サーバーの起動
- `data/org-data.json`: 共有保存されるデータ本体
- `functions/api/org-data.js`: Cloudflare D1 保存API
- `wrangler.jsonc`: Cloudflare Pages / D1 設定
- `tools/build-pages.mjs`: Cloudflare Pages 用ビルド
- `tools/prepare-github-upload.mjs`: GitHub アップロード用の整理

## カスタマイズ

- `script.js` の `DEFAULT_BRANCHES` を編集すると、ローカル表示時の初期データを変更できます。
- 共有運用時の初期データは `data/org-data.json` を編集します。
- `rootId` と各ノードの `reports` を変更すると組織図の階層を更新できます。
