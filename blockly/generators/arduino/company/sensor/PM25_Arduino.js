'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');

Blockly.Arduino.MDPM25 = function() {

	var PM25Mode = this.getFieldValue('PM25Mode');
	// var analogPin = this.getFieldValue('analogPin');

	var PM25Include="";
	PM25Include+="#include <Microduino_Dust.h>\n";
	Blockly.Arduino.definitions_['var_PM25Include'] = PM25Include;

	var PM25Var='';
	PM25Var+='SoftwareSerial mySerial(4, -1);\n';
	PM25Var+='Dust pmSensor(&mySerial);\n';
	Blockly.Arduino.definitions_['var_PM25Var'] = PM25Var;

  var code='';
  code+='pmSensor.'+PM25Mode+'()';

  return [code, Blockly.Arduino.ORDER_ATOMIC];

};

