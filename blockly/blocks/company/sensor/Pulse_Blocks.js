'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');

var colorSet='#efa752';

Blockly.Blocks.MDPluse = {
  init: function() {

    var pulseMode =[[Blockly.MDPulseAvailable, "available"], 
              [Blockly.MDPulseValue, "getPulse"]
             ];


    var analogPin =[["A0", "A0"], 
              		["A1", "A1"], 
              		["A2", "A2"], 
              		["A3", "A3"], 
              		["A4", "A4"], 
              		["A5", "A5"], 
              		["A6", "A6"], 
              		["A7", "A7"], 
             		];

    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(Blockly.MDPulse)
        .appendField(new Blockly.FieldDropdown(analogPin), "analogPin")
        .appendField(new Blockly.FieldDropdown(pulseMode), "pulseMode");
    this.setOutput(true, Number);
    var tip="心率\n";
    this.setTooltip(tip);

  }
};
