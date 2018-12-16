'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');



Blockly.Arduino.TSL2561LightReady = function() {

  var TSL2561Include='#include <Miroduino_Light.h>\n';
  TSL2561Include+='Light_D1 lightSensor;\n';
  Blockly.Arduino.definitions_['var_TSL2561Include'] = TSL2561Include;

  var TSL2561Var='bool result = lightSensor.begin();\n';
  TSL2561Var+='while (!result) {\n';
  TSL2561Var+='result = lightSensor.begin();\n';
  TSL2561Var+='}\n';
  TSL2561Var+='lightSensor.enableAutoGain(true);\n';
  Blockly.Arduino.setups_['var_TSL2561defineVar'] = TSL2561Var;
  var code='';

  //return [code, Blockly.Arduino.ORDER_ATOMIC];
  return code;
};


Blockly.Arduino.TSL2561Light = function() {

  var code='lightSensor.getLuminosity()';

  return [code, Blockly.Arduino.ORDER_ATOMIC];
};