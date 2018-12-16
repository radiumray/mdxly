'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');


var colorSet='#efa752';

Blockly.Blocks.MDSerialMotionPre = {
  init: function() {
    this.setColour(colorSet);

    var ss =[["2,3", "2"], 
              ["4,5", "4"], 
              ["6,7", "6"], 
              ["8,9", "8"], 
              ["10,11", "10"], 
              ["ideaBox", "1"], 
             ];

    this.appendDummyInput("")
        .appendField(Blockly.MDSerialMotion)
        .appendField(new Blockly.FieldDropdown(ss), "ss");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    var tip="接收串口姿态角\n";
    this.setTooltip(tip);

  }
};

Blockly.Blocks.MDSerialMotionGet = {
  init: function() {
    this.setColour(colorSet);
    var s_ypr =[[Blockly.motionYaw, "0"], 
              [Blockly.motionPitch, "1"],
              [Blockly.motionRoll, "2"]
             ];
    this.appendDummyInput("")
        .appendField(Blockly.GetMotionDegree)
        .appendField(new Blockly.FieldDropdown(s_ypr), "s_ypr");
    this.setOutput(true, Number);

    var tip="获取姿态角\n";
    this.setTooltip(tip);

  }
};

