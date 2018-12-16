'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');

var colorSet='#efa752';

Blockly.Blocks.MDUltrasonic = {
  init: function() {

    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(Blockly.MDUltrasonic);
	this.setOutput(true, Number);
    var tip="超声波\n";
    this.setTooltip(tip);

  }
};
