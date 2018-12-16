'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');

var colorSet='#efa752';

Blockly.Blocks.MDPM25 = {
  init: function() {

    var PM25Mode =[[Blockly.MDPulseAvailable, "available"], 
              [Blockly.MDPulseValue, "getPM25"]
             ];


    // var analogPin =[["A0", "A0"], 
    //           		["A1", "A1"], 
    //           		["A2", "A2"], 
    //           		["A3", "A3"], 
    //           		["A4", "A4"], 
    //           		["A5", "A5"], 
    //           		["A6", "A6"], 
    //           		["A7", "A7"], 
    //          		];

    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(Blockly.MDPM25)
        // .appendField(new Blockly.FieldDropdown(analogPin), "analogPin")
        .appendField(new Blockly.FieldDropdown(PM25Mode), "PM25Mode");
    this.setOutput(true, Number);
    var tip="PM25\n";
    this.setTooltip(tip);

  }
};
