'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');


//var colorSet=65;
var colorSet='#e5b748';

Blockly.Blocks.mCookie_Audio_Serial={
init:function(){
    var mCookie_MODE =[[Blockly.MODE_ONE, "MODE_ONE"], 
                      [Blockly.MODE_ONE_STOP, "MODE_ONE_STOP"], 
                      [Blockly.MODE_ALL, "MODE_ALL"],
                      [Blockly.MODE_FOL, "MODE_FOL"],
                      [Blockly.MODE_RAM, "MODE_RAM"]];

    var mCookie_DEVICE =[[Blockly.flashMemory, "DEVICE_FLASH"], 
                        [Blockly.tfCard, "DEVICE_TF"]];
    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(Blockly.chooseAudioPlay);

    this.appendDummyInput("")
        .appendField(Blockly.memoryDevice)
        .appendField(new Blockly.FieldDropdown(mCookie_DEVICE), "PIN1")
        .appendField(Blockly.playMode)
        .appendField(new Blockly.FieldDropdown(mCookie_MODE), "PIN2")
    this.appendValueInput("Vol", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.volume);
    //this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};


Blockly.Blocks.mCookie_Audio_Control={
init:function(){


    var getType =[[Blockly.AudioPlay, "playMusic()"], 
                  [Blockly.AudioPause, "pauseMusic()"], 
                  [Blockly.AudioNext, "nextMusic()"], 
                  [Blockly.AudioPrev, "prevMusic()"],
                  [Blockly.AudioVolUp, "volumeUp()"],
                  [Blockly.AudioVolDown, "volumeDown()"]
                ];

    this.setColour(colorSet);
    this.appendDummyInput("")
         .appendField(Blockly.RTCAudioControl)
         .appendField(new Blockly.FieldDropdown(getType), "getType");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    //this.setOutput(true);
  }
};


Blockly.Blocks.mCookie_Audio_Choose = {
  init: function() {
    this.setColour(colorSet);

    this.appendDummyInput("")
        .appendField(Blockly.chooseAudioNum)
    this.appendValueInput("audioNumber", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT);

    this.setInputsInline(true);
    var tip="选择音频文件序号\n";
    // tip+="返回一个数字值\n";
    // tip+="数字接口\n";
    this.setTooltip(tip);
    this.setPreviousStatement(true);
    this.setNextStatement(true);

  }
};