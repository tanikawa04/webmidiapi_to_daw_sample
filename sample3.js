'use strict';

const vm = new Vue({
    el: '#main',
    data: {
        outputMap: null,
        selectedOutputId: null,
        port: null,
        chords: [
            {name: 'CM7', notes: [48, 55, 59, 60, 64]},
            {name: 'Dm7', notes: [50, 53, 57, 60, 62]},
            {name: 'Em7', notes: [52, 55, 59, 62, 64]},
            {name: 'FM7', notes: [41, 53, 57, 60, 64]},
            {name: 'G7',  notes: [43, 53, 55, 59, 62]},
            {name: 'Am7', notes: [45, 55, 57, 60, 64]},
            {name: 'Bφ', notes: [47, 53, 57, 59, 62]}
        ],
        playing: false
    },
    computed: {
        outputs() {
            const outputs = [];
            for (let output of this.outputMap.values()) {
                outputs.push({name: output.name, id: output.id});
            }
            return outputs;
        }
    },
    methods: {
        onMouseDown(notes) {
            this._play(notes);
        },
        onMouseUp(notes) {
            this._stop(notes);
        },
        onMouseOut(notes) {
            this._stop(notes);
        },
        _play(notes) {
            this.playing = true;
            notes.forEach(note => {
                this.port.send([0x90, note, 100]);
            });
        },
        _stop(notes) {
            if (this.playing) {
                this.playing = false;
                notes.forEach(note => {
                    this.port.send([0x90, note, 0]);
                });
            }
        }
    },
    watch: {
        selectedOutputId(newVal) {
            this.port = this.outputMap.get(newVal);
        }
    }
});

navigator.requestMIDIAccess()
    .then(midiAccess => {
        vm.outputMap = midiAccess.outputs;
        vm.selectedOutputId = vm.outputs[0].id;
    })
    .catch(err => {
        console.log(err);
    });
