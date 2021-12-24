# Readme

## 確認事項

- [x] 複数個のDiscordサーバーで動かすこと前提で作ってはいません。
- [x] Glitchの利用を前提としたアプリケーションです。
  - Glitchにクローンしたあと、ターミナルで「npm install」を実行してください。
  - Glitch以外でご利用の場合、必要に応じて変更してください。
- [x] .envファイルにBOTのトークンやクライアントIDなどを記述しなければなりません。
    - [x] これらは必須項目です。
      - DISCORD_BOT_TOKEN: BOTのトークン
      - CLIENT_ID: BOTのクライアントID
        - BOT自身のIDかどうか判別のために利用します。
    - [ ] これらは必要に応じて設定する必要があります。
      - ADMIN_CH_NAME: 運営専用テキストチャンネルの名前
        - BOT稼働中にエラーが起きた際、エラーメッセージの投稿先として利用しています。例：'運営チャンネル'
      - BOT_ROLE_NAME: BOTが持つロールの名前
        - BOTにロールメンションが来たことを把握するために利用しています。例：'BOT'


- [x] `discord.js`のバージョン`12.2.0`を利用しています。
  - Google検索などで引っかかる日本語の記事は、ほとんどがバージョン`11以下`で記載されており、ロールの追加など一部の記法が通用しません。下記公式ドキュメントを参照して下さい。
    - [discord.js(ver12.2.0のドキュメント)](https://discord.js.org/#/docs/main/12.2.0/general/welcome "discord.js")
    - [discord.jsのver11からver12へのアップデート内容](https://discordjs.guide/additional-info/changes-in-v12.html#before-you-start "Updating from v11 to v12 | Discord.js Guide")
- [x] `reply.json`について
  - `reply.json`では、自動応答の中身を作っています。応答メッセージにおいて、これらの値は置換されます：
    - %%name%%
      - BOTにメッセージを送ったアカウントの名前（ニックネーム）
    - %%date%%
      - BOTにメッセージを送ったときの日付（yyyy年m月d日、JST）
    - %%time%%
      - BOTにメッセージを送った日時（yyyy年m月d日h時i分s秒、JST）
  

## Glitch利用時の注意

　無料プランでは、5分間サーバーへのアクセスがないとサーバーが閉じます。つまりBOTはオフラインになります。
  
　これを回避するには、5分以内に何度もアクセスするのを繰り返すか、有料プランを契約する必要があります。
  
　尚、無料プランでは、1時間あたり4000回までのアクセス制限があります。また、プロジェクトを非公開にできません（※メンバーを招待しない限り、外部の人が`.env`内を見ることはできません）
 
 これらの制限は変わる可能性もあるので、最新の状況は[Become a Glitch Member](https://glitch.com/pricing "Become a Glitch Member")をチェックして下さい。