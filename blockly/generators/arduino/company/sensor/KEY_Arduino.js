'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');


Blockly.Arduino.Microduino_KEYDigital = function() {

  var branch = Blockly.Arduino.statementToCode(this, 'DO');

  var pin = this.getFieldValue('KPin');
  //var type = this.getFieldValue('INPUTTYPE');
  var check = this.getFieldValue('CHECK');

  Blockly.Arduino.definitions_['define_key'] = '#include <Microduino_Key.h>';
  Blockly.Arduino.definitions_['var_key_'+pin+''] = 'DigitalKey Key'+pin+'('+pin+');';
  Blockly.Arduino.setups_['var_key_'+pin+''] = 'Key'+pin+'.begin(INPUT_PULLUP);';
  var code='';
  code+='if(Key'+pin+'.readEvent()=='+check+') {\n';
  code+=branch;
  code+='}\n';

  //return [code, Blockly.Arduino.ORDER_ATOMIC];
  return code;
};


Blockly.Arduino.Microduino_KEYDigitalVal = function() {

  var branch = Blockly.Arduino.statementToCode(this, 'DO');

  var pin = this.getFieldValue('KPin');
  //var type = this.getFieldValue('INPUTTYPE');
  var check = this.getFieldValue('CHECK');

  Blockly.Arduino.definitions_['define_key'] = '#include <Microduino_Key.h>';
  Blockly.Arduino.definitions_['var_key_'+pin+''] = 'DigitalKey Key'+pin+'('+pin+');';
  Blockly.Arduino.setups_['var_key_'+pin+''] = 'Key'+pin+'.begin(INPUT_PULLUP);';
  var code='';
  code+='if(Key'+pin+'.readVal()=='+check+') {\n';
  code+=branch;
  code+='}\n';

  //return [code, Blockly.Arduino.ORDER_ATOMIC];
  return code;
};


Blockly.Arduino.Microduino_KEYAnalog = function() {

  var branch = Blockly.Arduino.statementToCode(this, 'DO');

  var joyStickAction = this.getFieldValue('joyStickAction');
  var pin = this.getFieldValue('KPin');
  var min = this.getFieldValue('MIN');
  var max = this.getFieldValue('MAX');
  var check = this.getFieldValue('CHECK');

  Blockly.Arduino.definitions_['define_key'] = '#include <Microduino_Key.h>';
  Blockly.Arduino.definitions_['var_key_'+joyStickAction+''] = 'AnalogKey Key'+joyStickAction+'('+pin+');';
  Blockly.Arduino.setups_['var_key_'+joyStickAction+''] = 'Key'+joyStickAction+'.begin(INPUT);';

  var code='';
  code+='if(Key'+joyStickAction+'.readEvent('+min+', '+max+')=='+check+') {\n';
  code+=branch;
  code+='}\n';

  //return [code, Blockly.Arduino.ORDER_ATOMIC];
  return code;
};

Blockly.Arduino.Microduino_KEYAnalogVal = function() {

  var branch = Blockly.Arduino.statementToCode(this, 'DO');

  var joyStickAction = this.getFieldValue('joyStickAction');
  var pin = this.getFieldValue('KPin');
  var min = this.getFieldValue('MIN');
  var max = this.getFieldValue('MAX');
  var check = this.getFieldValue('CHECK');

  Blockly.Arduino.definitions_['define_key'] = '#include <Microduino_Key.h>';
  Blockly.Arduino.definitions_['var_key_'+joyStickAction+''] = 'AnalogKey Key'+joyStickAction+'('+pin+');';
  Blockly.Arduino.setups_['var_key_'+joyStickAction+''] = 'Key'+joyStickAction+'.begin(INPUT);';

  var code='';
  code+='if(Key'+joyStickAction+'.readVal('+min+', '+max+')=='+check+') {\n';
  code+=branch;
  code+='}\n';

  //return [code, Blockly.Arduino.ORDER_ATOMIC];
  return code;
};