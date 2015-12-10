# 仮想 MIDI ポートの設定


## Mac: IAC ドライバ

(1) 「Audio MIDI 設定」を起動

![Mac 1](https://qiita-image-store.s3.amazonaws.com/0/19511/a2cb6f72-9233-af22-77b0-87419532e995.png)

(2) メニューの「ウィンドウ」→「MIDI スタジオを表示」を選択

![Mac 2](https://qiita-image-store.s3.amazonaws.com/0/19511/df150d47-f3ae-cbdc-7ec7-4308695339eb.png)

(3) 「IAC ドライバ」をダブルクリック

![Mac 3](https://qiita-image-store.s3.amazonaws.com/0/19511/74e718a0-706c-4544-5e5e-2ce10f015ff4.png)

(4) 「装置はオンライン」にチェックを入れ、「ポート」リストにポートが登録されていることを確認
※ ポート名は、日本語だと上手く認識してくれないシステムもあるので、英語にしておくことをおすすめします

![Mac 4](https://qiita-image-store.s3.amazonaws.com/0/19511/bdc18537-e8f2-ea45-9034-d329520a6c71.png)


## Windows: loopMIDI

ダウンロードサイト
http://www.tobias-erichsen.de/software/loopmidi.html


(1) "loopMIDI" を起動

![Win 1](https://qiita-image-store.s3.amazonaws.com/0/19511/133f3f65-7928-cdc7-7a72-7faa2bd2d12c.png)

(2) "New port-name" に任意のポート名を入力し（デフォルト名のままでも問題ありません）、"+" ボタンをクリック。"My loopback MIDI ports" にポートが登録されていることを確認

![Win 2](https://qiita-image-store.s3.amazonaws.com/0/19511/3129d9d6-a096-6f12-4733-e6557f677a7f.png)


## トラブルシューティング

"MIDI Output port" に IAC ドライバや loopMIDI で設定した仮想 MIDI ポートが存在しない場合は、IAC ドライバ、loopMIDI の設定に失敗している可能性があります。

loopMIDI はタスクが動作している時のみ仮想 MIDI ポートがアクティブになる仕様です。loopMIDI のタスクが終了している場合は、再度 loopMIDI を起動する必要があります。

"MIDI Output port" に仮想 MIDI ポートがあるにも関わらず DAW から音が出ない場合は、DAW の MIDI 入力に仮想 MIDI ポートを登録していない可能性があります。DAW の環境設定を開いて確認してみてください。
