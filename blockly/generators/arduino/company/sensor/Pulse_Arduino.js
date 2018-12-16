'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');

Blockly.Arduino.MDPluse = function() {

	var pulseMode = this.getFieldValue('pulseMode');
	var analogPin = this.getFieldValue('analogPin');

	var PulseInclude="";
	PulseInclude+="#include <Microduino_Pulse.h>\n";
	Blockly.Arduino.definitions_['var_PulseInclude'] = PulseInclude;

	var PulseVar='';
	PulseVar+='Pulse pulse'+analogPin+'('+analogPin+');\n';
	Blockly.Arduino.definitions_['var_PulseVar'+analogPin] = PulseVar;

  var code='';
  code+='pulse'+analogPin+'.'+pulseMode+'()';

  return [code, Blockly.Arduino.ORDER_ATOMIC];

};

