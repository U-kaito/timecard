勤怠管理システム

ローカル DB 作成
$docker compose up -d
DB接続情報
DATABASE_URL=mysql://root:password@127.0.0.1:3306/defaultdb

サーバー起動
$yarn dev

フォーマット
$yarn fmt

テスト
$yarn test

migrationファイル作成方法
yarn prisma migrate dev
yarn prisma generate
