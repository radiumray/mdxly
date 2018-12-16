'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');

var colorSet='#efa752';

Blockly.Blocks.MDGesturePre = {
  init: function() {

    var gestureMode =[[Blockly.MDGestureGestEnable, "gesture"], 
              [Blockly.MDGestureColrEnable, "color"],
              [Blockly.MDGestureProxEnable, "proximity"]
             ];



    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(Blockly.MDGesturePre)
        .appendField(Blockly.MDGestureMode)
        .appendField(new Blockly.FieldDropdown(gestureMode), "gestureMode");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    var tip="手势准备\n";
    this.setTooltip(tip);

  }
};

Blockly.Blocks.MDGestureGet = {
  init: function() {
    this.setColour(colorSet);
    var getSensor =[[Blockly.MDIsGestureAvailable, "isGestureAvailable"], 
              [Blockly.MDReadGesture, "readGesture"],
              [Blockly.MDReadAmbientLight, "readAmbientLight"],
              [Blockly.MDReadRedLight, "readRedLight"],
              [Blockly.MDReadGreenLight, "readGreenLight"],
              [Blockly.MDReadBlueLight, "readBlueLight"],
              [Blockly.MDReadProximity, "readProximity"]
             ];
    this.appendDummyInput("")
        .appendField(Blockly.MDGestureGet)
        .appendField(new Blockly.FieldDropdown(getSensor), "getSensor");
    this.setOutput(true, Number);

    var tip="获取手势,颜色,距离\n";
    tip+="手势码:\n";
    tip+="0->NONE:\n";
    tip+="1->LEFT:\n";
    tip+="2->RIGHT:\n";
    tip+="3->UP:\n";
    tip+="4->DOWN:\n";
    tip+="5->NEAR:\n";
    tip+="6->FAR:\n";
    tip+="7->ALL:\n";
    this.setTooltip(tip);

  }
};

