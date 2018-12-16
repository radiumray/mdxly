'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');

Blockly.Arduino.MDSerialMotionPre = function() {

  var SerialMotionInclude="";
  SerialMotionInclude+="#include <Sensor_Motion.h>\n";
  Blockly.Arduino.definitions_['var_SerialMotionInclude'] = SerialMotionInclude;

  var ss = this.getFieldValue('ss');

  var SerialMotionVar='';
  SerialMotionVar+='//Core UART Port: [SoftSerial] [D2,D3]\n';
  SerialMotionVar+='#if defined (__AVR_ATmega168__) || defined (__AVR_ATmega328__) || defined (__AVR_ATmega328P__)\n';

  if(ss==2) {
    SerialMotionVar+='SoftwareSerial mySerialM(2, 3);\n';
  } else if(ss==4) {
    SerialMotionVar+='SoftwareSerial mySerialM(4, 5);\n';
  } else if(ss==6) {
    SerialMotionVar+='SoftwareSerial mySerialM(6, 7);\n';
  } else if(ss==8) {
    SerialMotionVar+='SoftwareSerial mySerialM(8, 9);\n';
  } else if(ss==10) {
    SerialMotionVar+='SoftwareSerial mySerialM(10, 11);\n';
  } else if(ss==1) {
    SerialMotionVar+='SoftwareSerial mySerialM(8, 9);\n';
  }

  // SerialMotionVar+='SoftwareSerial mySerialM(2, 3);\n';
  SerialMotionVar+='#define MotionSerial mySerialM\n';
  SerialMotionVar+='#endif\n';
  SerialMotionVar+='//Core+ UART Port: [Serial1] [D2,D3]\n';
  SerialMotionVar+='#if defined(__AVR_ATmega1284P__) || defined (__AVR_ATmega644P__) || defined(__AVR_ATmega128RFA1__)\n';
  
  if(ss==2) {
    SerialMotionVar+='#define MotionSerial Serial1\n';
  } else if(ss==4) {
    SerialMotionVar+='SoftwareSerial mySerialM(4, 5);\n';
  } else if(ss==6) {
    SerialMotionVar+='SoftwareSerial mySerialM(6, 7);\n';
  } else if(ss==8) {
    SerialMotionVar+='SoftwareSerial mySerialM(8, 9);\n';
  } else if(ss==10) {
    SerialMotionVar+='SoftwareSerial mySerialM(10, 11);\n';
  } else if(ss==1) {
    SerialMotionVar+='SoftwareSerial mySerialM(8, 9);\n';
  }
  
  // SerialMotionVar+='#define MotionSerial Serial1\n';
  SerialMotionVar+='#endif\n';
  SerialMotionVar+='\n';
  SerialMotionVar+='float s_ypr[3];\n';
  SerialMotionVar+='sensorMotion motion(&MotionSerial);\n';
  Blockly.Arduino.definitions_['var_SerialMotionVar'] = SerialMotionVar;

  var SerialMotionSetup='';
  SerialMotionSetup+='motion.begin();\n';
  Blockly.Arduino.setups_['setup_SerialMotionSetup'] = SerialMotionSetup;

  var code='motion.getData(MOTION_3, s_ypr);\n';

  return code;

};


Blockly.Arduino.MDSerialMotionGet = function() {
  var s_ypr = this.getFieldValue('s_ypr');
  var code='s_ypr['+s_ypr+']';
  return [code, Blockly.Arduino.ORDER_ATOMIC];

};

