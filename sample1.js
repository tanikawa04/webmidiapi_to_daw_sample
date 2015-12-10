'use strict';

const outputSelector = document.getElementById('output_selector');
const playButton = document.getElementById('play_button');

let outputs;

// MIDIデバイスへのアクセス要求
navigator.requestMIDIAccess()
    // アクセス許可（成功）
    .then(midiAccess => {
        // 使用可能なポートを output_selector に追加
        outputs = midiAccess.outputs;
        for (let output of outputs.values()) {
            const optionEl = document.createElement('option');
            optionEl.text = output.name;    // ポート名
            optionEl.value = output.id;     // ポート ID
            outputSelector.add(optionEl);
        }
    })
    // アクセス拒否（失敗）
    .catch(err => {
        console.log(err);
    });

playButton.addEventListener('click', () => {
    // output_selector で選択されているポートの ID を取得
    const index = outputSelector.selectedIndex;
    const portId = outputSelector[index].value;

    // 出力先の MIDI ポートを取得
    const output = outputs.get(portId);

    // MIDI メッセージを送信
    output.send([0x90, 60, 100]);                                       // ノートオン
    output.send([0x80, 60, 100], window.performance.now() + 1000);      // 1秒後にノートオフ
});