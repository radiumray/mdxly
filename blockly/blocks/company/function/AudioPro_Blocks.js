'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');

//var colorSet=65;
var colorSet='#e5b748';

Blockly.Blocks.audioProPrepare={
init:function(){

    var getType =[[Blockly.ACOUSTIC_GRAND_PIANO, "VS1053_GM1_ACOUSTIC_GRAND_PIANO"], 
                  [Blockly.PIANO, "VS1053_GM1_PIANO"], 
                  [Blockly.ELECTRIC_GRAND_PIANO, "VS1053_GM1_ELECTRIC_GRAND_PIANO"], 
                  [Blockly.HONKY_TONK_PIANO, "VS1053_GM1_HONKY_TONK_PIANO"],
                  [Blockly.RHODES_PIANO, "VS1053_GM1_RHODES_PIANO"],
                  [Blockly.CHORUSED_PIANO, "VS1053_GM1_CHORUSED_PIANO"],
                  [Blockly.OCARINA, "VS1053_GM1_OCARINA"],
                  [Blockly.OCARINB, "VS1053_GM1_OCARINB"],
                  [Blockly.OCARINC, "VS1053_GM1_OCARINC"]
                ];

    this.setColour(colorSet);
    this.appendDummyInput("")
         .appendField(Blockly.AudioProPrepare)
         .appendField(new Blockly.FieldDropdown(getType), "getType");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    //this.setOutput(true);
  }
};



Blockly.Blocks.audioProInstrument={
init:function(){

    var getType =[[Blockly.ACOUSTIC_GRAND_PIANO, "VS1053_GM1_ACOUSTIC_GRAND_PIANO"], 
                  [Blockly.PIANO, "VS1053_GM1_PIANO"], 
                  [Blockly.ELECTRIC_GRAND_PIANO, "VS1053_GM1_ELECTRIC_GRAND_PIANO"], 
                  [Blockly.HONKY_TONK_PIANO, "VS1053_GM1_HONKY_TONK_PIANO"],
                  [Blockly.RHODES_PIANO, "VS1053_GM1_RHODES_PIANO"],
                  [Blockly.CHORUSED_PIANO, "VS1053_GM1_CHORUSED_PIANO"],
                  [Blockly.OCARINA, "VS1053_GM1_OCARINA"],
                  [Blockly.OCARINB, "VS1053_GM1_OCARINB"],
                  [Blockly.OCARINC, "VS1053_GM1_OCARINC"]
                ];

    this.setColour(colorSet);
    this.appendDummyInput("")
         .appendField(Blockly.AudioProInstrument)
         .appendField(new Blockly.FieldDropdown(getType), "getType");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    //this.setOutput(true);
  }
};

Blockly.Blocks.audioProControl = {
  init: function() {
    this.setColour(colorSet);

    var getType =[[Blockly.AudioProPlay, "midiPlayer.noteOn"],
                  [Blockly.AudioProPause, "midiPlayer.noteOff"]
                ];

    this.appendDummyInput("")
         .appendField(Blockly.AudioProControl)
         .appendField(new Blockly.FieldDropdown(getType), "getType");


    this.appendDummyInput("")
        .appendField(Blockly.audioProMelody)
    this.appendValueInput("audioProMelody", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT);

    this.appendDummyInput("")
        .appendField(Blockly.audioProLoudness)
    this.appendValueInput("audioProVolume", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT);

    this.appendDummyInput("")
        .appendField(Blockly.audioProDuration)
    this.appendValueInput("audioProDuration", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT);

    this.setInputsInline(true);
    var tip="音调/音量范围(0~127)\n";
    this.setTooltip(tip);
    this.setPreviousStatement(true);
    this.setNextStatement(true);

  }
};



Blockly.Blocks.audioProSDPrepare = {
  init: function() {
    this.setColour(colorSet);

    this.appendDummyInput("")
         .appendField(Blockly.MD_audioProSDPrepare);

    this.appendDummyInput("")
        .appendField(Blockly.MD_MAXSongNum)
    this.appendValueInput("MAXSongNum", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT);

    this.appendDummyInput("")
        .appendField(Blockly.MD_MAXSongUnit);


    this.appendDummyInput("")
        .appendField(Blockly.MD_audioProSDVolume)
    this.appendValueInput("volume", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT);

    this.setInputsInline(true);
    var tip="读取歌曲数量太多会导致运行不正常\n";
    this.setTooltip(tip);
    this.setPreviousStatement(true);
    this.setNextStatement(true);

  }
};


Blockly.Blocks.audioProSDControl = {
  init: function() {
    this.setColour(colorSet);

    var getType =[[Blockly.MD_audioProSDStop, "stopPlaying"],
                  [Blockly.MD_audioProSDReset, "reset"],
                  [Blockly.MD_audioProSDBegin, "begin"],
                  [Blockly.MD_audioProSDEnd, "end"]
                  // [Blockly.MD_audioProSDVolumSub, "volumeChage(\'-\')"],
                  // [Blockly.MD_audioProSDFast, "speedChange(\'>\')"],
                  // [Blockly.MD_audioProSDSlow, "speedChange(\'<\')"],
                  // [Blockly.MD_audioProSDRepeat, "songChange(\'~\')"],
                  // [Blockly.MD_AudioProSDShowList, "showSongList()"],
                ];

    this.appendDummyInput("")
         .appendField(Blockly.MD_AudioProSDControl)
         .appendField(new Blockly.FieldDropdown(getType), "getType");

    this.setInputsInline(true);

    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};


Blockly.Blocks.audioProSDControlSetBool = {
  init: function() {
    this.setColour(colorSet);

    var setMode = [
                 [Blockly.MD_audioProSDAmplifier, 'setAmplifier'],
                 [Blockly.MD_audioProSDPausePlaying, 'pausePlaying']
              ];

    var trueFalse = [
                 ['true', 'true'],
                 ['false', 'false']
              ];

    this.appendDummyInput("")
         .appendField(Blockly.MD_AudioProSDControl)
        .appendField(new Blockly.FieldDropdown(setMode), 'setMode')
        .appendField(new Blockly.FieldDropdown(trueFalse), 'trueFalse');


    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);

    this.setTooltip("音频MP3 设置");
  }
};


Blockly.Blocks.audioProSDPlayByName = {
  init: function() {
    this.setColour(colorSet);


    this.appendDummyInput("")
    .appendField(Blockly.MD_AudioProSDPlayByName);

    this.appendValueInput('songName')
    .setCheck(String)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.File_Name);

    this.setInputsInline(true);

    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};


Blockly.Blocks.audioProSDPlayByNum = {
  init: function() {
    this.setColour(colorSet);

    this.appendDummyInput("")
    .appendField(Blockly.MD_AudioProSDPlayByNum);

    this.appendValueInput('songNum')
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT);
    // .appendField(Blockly.File_Name);

    this.setInputsInline(true);

    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};


Blockly.Blocks.audioProSDGetState={
init:function(){

  var getType =[
                [Blockly.MD_audioProSDAmplifier, "getAmplifier"],
                [Blockly.MD_audioProSDStoped, "stopped"],
                [Blockly.MD_audioProSDPaused, "paused"],
                // [Blockly.MD_AudioProSDPlayNum, "volumeDown"],
                // [Blockly.MD_AudioProSDPlayNum, "volumeUp"],
                [Blockly.MD_audioProSDVolume, "getVolume"],
                [Blockly.MD_audioProSDPlaySpeed, "getPlaySpeed"],
                [Blockly.MD_audioProSDDecodeTime, "decodeTime"],
                [Blockly.MD_audioProSDMonoMode, "getMonoMode"],
              ];

    this.setColour(colorSet);
    this.appendDummyInput("")
         .appendField(Blockly.RTCFormatGetInfo)
         .appendField(new Blockly.FieldDropdown(getType), "getType");
    this.setInputsInline(true);
    this.setOutput(true);
  }
};


Blockly.Blocks.audioProSDControlPNum = {
  init: function() {
    this.setColour(colorSet);

    var getType =[[Blockly.MD_audioProSDSetVolume, "setVolume"],
                  [Blockly.MD_audioProSDSetPlaySpeed, "setPlaySpeed"],
                  [Blockly.MD_audioProSDSetMonoMode, "setMonoMode"],
                  [Blockly.MD_audioProSDSetDifferentialOutput, "setDifferentialOutput"]
                ];

    this.appendDummyInput("")
         .appendField(Blockly.MD_AudioProSDControl)
         .appendField(new Blockly.FieldDropdown(getType), "getType");


    this.appendValueInput('controlNum')
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT);

    this.setInputsInline(true);

    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};