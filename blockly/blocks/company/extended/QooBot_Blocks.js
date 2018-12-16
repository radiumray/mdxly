'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');


//var colorSet=120;
var colorSet='#FF4500';


Blockly.Blocks.QooBotMotor = {
  init: function() {

  this.setColour(colorSet);
  this.appendDummyInput("")
        .appendField(Blockly.QooBotMotor_ctrl);

  this.appendValueInput('leftSpeed')
        .setCheck(Number)
        .appendField(' '+Blockly.QooBotA);
  this.appendValueInput('rightSpeed')
        .setCheck(Number)
        .appendField(' '+Blockly.QooBotB);
        
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
  }
};

Blockly.Blocks.QooBotLineAB = {
  init: function() {

  var LineData = [
                 [Blockly.QooBotLineA, 'A'],
                 [Blockly.QooBotLineB, 'B'],
              ];

  var COLORMode = [
                 [Blockly.ColorLEDRed, 'RED'],
                 [Blockly.ColorLEDGreen, 'GREEN'],
                 [Blockly.ColorLEDBlue, 'BLUE'],
                 [Blockly.ColorLEDBLACK, 'BLACK'],
              ];

    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(Blockly.QooBot)
        .appendField(new Blockly.FieldDropdown(LineData), 'LineData')
        .appendField(Blockly.QooBotSetLight)
        .appendField(new Blockly.FieldDropdown(COLORMode), 'COLORMode');

    this.setOutput(true, Number);
  }
};

Blockly.Blocks.QooBotGetColor = {
  init: function() {

  var LineData = [
                 ['A', 'A'],
                 ['B', 'B'],
              ];


    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(Blockly.QooBot)
        .appendField(Blockly.QooBotColorDetector)
        .appendField(new Blockly.FieldDropdown(LineData), 'LineData');

    this.setOutput(true, Number);
  }
};



Blockly.Blocks.QooBotBuzzerTone = { 
  init: function() {
    this.setColour(colorSet);

    this.appendDummyInput("")
        .appendField(Blockly.QooBot)
        .appendField(Blockly.Buzzer);

    this.appendValueInput("Frequency", Number)
      .setCheck(Number)
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(Blockly.Frequency);

    var tip="控制小强蜂鸣器\n";
    this.setTooltip(tip);

    this.setPreviousStatement(true,null);
    this.setNextStatement(true,null);
    this.setInputsInline(true);
  },
};




Blockly.Blocks.QooBotBuzzerToneMelody = { 
  init: function() {

    var buzzerMelody =[[Blockly.low1DO, "262"], [Blockly.low2RE, "294"], [Blockly.low3MI, "330"],
                       [Blockly.low4FA, "349"], [Blockly.low5SO, "392"], [Blockly.low6LA, "440"],
                       [Blockly.low7XI, "494"], [Blockly.midlle1DO, "523"], [Blockly.midlle2RE, "587"], 
                       [Blockly.midlle3MI, "659"],[Blockly.midlle4FA, "698"], [Blockly.midlle5SO, "784"], 
                       [Blockly.midlle6LA, "880"],[Blockly.midlle7XI, "988"], [Blockly.high1DO, "1046"], 
                       [Blockly.high2RE, "1175"], [Blockly.high3MI, "1318"],[Blockly.high4FA, "1397"], 
                       [Blockly.high5SO, "1568"], [Blockly.high6LA, "1760"],[Blockly.high7XI, "1967"]
                      ];
    this.setColour(colorSet);

    this.appendDummyInput("")
        .appendField(Blockly.QooBot)
        .appendField(Blockly.Buzzer);
    

    this.appendDummyInput("")
    .appendField(Blockly.BuzzerMelody)
    .appendField(new Blockly.FieldDropdown(buzzerMelody), "buzzerMelody");

    var tip="定义控制小强蜂鸣器的旋律\n";
    this.setTooltip(tip);

    this.setPreviousStatement(true,null);
    this.setNextStatement(true,null);
    this.setInputsInline(true);
  },
};


Blockly.Blocks.QooBotBuzzerToneSong = {
  init: function() {

    var buzzerSong =[[Blockly.BuzzerSong1, "1"], [Blockly.BuzzerSong2, "2"], [Blockly.BuzzerSong3, "3"],
                      [Blockly.BuzzerSong4, "4"], [Blockly.BuzzerSong5, "5"], [Blockly.BuzzerSong6, "6"],
                      [Blockly.BuzzerSong7, "7"], [Blockly.BuzzerSong8, "8"], [Blockly.BuzzerSong9, "9"],
                      [Blockly.BuzzerSong10, "10"]];
    this.setColour(colorSet);

    this.appendDummyInput("")
        .appendField(Blockly.QooBot)
        .appendField(Blockly.Buzzer);
    

    this.appendDummyInput("")
    .appendField(Blockly.BuzzerSong)
    .appendField(new Blockly.FieldDropdown(buzzerSong), "buzzerSong");

    var tip="定义控制小强蜂鸣器的曲目\n";
    this.setTooltip(tip);

    this.setPreviousStatement(true,null);
    this.setNextStatement(true,null);
    this.setInputsInline(true);
  },
};


Blockly.Blocks.QooBotBuzzerNoTone = { 
  init: function() {
    this.setColour(colorSet);

    this.appendDummyInput("")
        .appendField(Blockly.QooBot)
        .appendField(Blockly.BuzzerNoTone);

    var tip="关闭小强蜂鸣器\n";
    this.setTooltip(tip);

    this.setPreviousStatement(true,null);
    this.setNextStatement(true,null);
    this.setInputsInline(true);
  },
};


Blockly.Blocks.QooBotColorLED = {
  init: function() {

  var LineData = [
                 ['A', 'A'],
                 ['B', 'B'],
              ];

    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(Blockly.QooBot)
        .appendField(Blockly.ColorLEDControl)
        .appendField(new Blockly.FieldDropdown(LineData), 'LineData');

    this.appendValueInput("red", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.ColorLEDRed);
    this.appendValueInput("green", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.ColorLEDGreen);
    this.appendValueInput("blue", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.ColorLEDBlue);

    var tip="小强彩灯\n";
    tip+="红,绿,蓝颜色值在0~255之间\n";
    this.setTooltip(tip);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    },
};