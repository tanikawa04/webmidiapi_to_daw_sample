'use strict';

const outputSelector = document.getElementById('output_selector');
const playButton = document.getElementById('play_button');

let outputs,
    output;

let playing = false;    // ボタン押下中かを判定するフラグ

const getSelectedOutput = () => {
    const index = outputSelector.selectedIndex;
    const portId = outputSelector[index].value;
    return outputs.get(portId);
};

const playC = () => {
    playing = true;
    output.send([0x90, 60, 100]);
};

const stopC = () => {
    if (playing) {
        playing = false;
        // ノートオフ (0x80) の代わりにベロシティ0のノートオンでも音を止めることが可能
        output.send([0x90, 60, 0]);
    }
};

navigator.requestMIDIAccess()
    .then(midiAccess => {
        outputs = midiAccess.outputs;
        for (let output of outputs.values()) {
            const optionEl = document.createElement('option');
            optionEl.text = output.name;
            optionEl.value = output.id;
            outputSelector.add(optionEl);
        }
        output = getSelectedOutput();
    })
    .catch(err => {
        console.log(err);
    });

// MIDI Output Port の項目が変更されたら output を更新
outputSelector.addEventListener('change', () => {
    output = getSelectedOutput();
});

playButton.addEventListener('mousedown', () => {
    playC();
});

playButton.addEventListener('mouseup', () => {
    stopC();
});

playButton.addEventListener('mouseout', () => {
    stopC();
});