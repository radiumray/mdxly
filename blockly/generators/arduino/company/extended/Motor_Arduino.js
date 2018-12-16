'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');

Blockly.Arduino.MotorBegin = function() {
  var defineMotorBegin='#include <Microduino_Motor.h>\n';
  defineMotorBegin+='Motor MotorLeft(MOTOR0_PINA, MOTOR0_PINB);\n';
  defineMotorBegin+='Motor MotorRight(MOTOR1_PINA, MOTOR1_PINB);\n';

  Blockly.Arduino.definitions_['define_motorBegin'] = defineMotorBegin;

  var motorSetup='MotorLeft.begin();\n';
  motorSetup+='MotorRight.begin();\n';

  Blockly.Arduino.setups_['setup_mCookie_motor'] = motorSetup;

  var code='';
  return code;
};

Blockly.Arduino.MotorBeginchange = function() {
  var defineMotorBegin='#include <Microduino_Motor.h>\n';
  defineMotorBegin+='Motor MotorLeft(MOTOR0_PINA, MOTOR0_PINB);\n';
  defineMotorBegin+='Motor MotorRight(MOTOR1_PINA, MOTOR1_PINB);\n';

  Blockly.Arduino.definitions_['define_motorBegin'] = defineMotorBegin;

  var motorSetup='MotorLeft.begin();\n';
  motorSetup+='MotorRight.begin();\n';

  Blockly.Arduino.setups_['setup_mCookie_motor'] = motorSetup;

  var code='';
  return code;
};

Blockly.Arduino.Motor_run = function() {

var Break_left_right = this.getFieldValue('Break_left_right');
var speed = Blockly.Arduino.valueToCode(this, 'speed',Blockly.Arduino.ORDER_ATOMIC) || '0';

//var throttle = this.getFieldValue('motor_ctrl');
// var code='throttle = '+speed+';\n';
var code='';

 if (Break_left_right==1)  code+='MotorLeft.setSpeed('+speed+');\n';
 else if (Break_left_right==2) code+='MotorRight.setSpeed('+speed+');\n';

return code;

};

Blockly.Arduino.MotorBreak = function() {

var Break_left_right = this.getFieldValue('Break_left_right');

if (Break_left_right==1) var code='MotorLeft.Brake();\n';
else if (Break_left_right==2) var code='MotorRight.Brake();\n';

return code;

};

Blockly.Arduino.MotorFree = function() {

var Free_left_right = this.getFieldValue('Free_left_right');

if (Free_left_right==1) var code='MotorLeft.setSpeed(FREE);\n';
else if (Free_left_right==2) var code='MotorRight.setSpeed(FREE);\n';

return code;
};

Blockly.Arduino.microduinoCarControl = function() {

  var leftSpeed = Blockly.Arduino.valueToCode(this, 'leftSpeed',Blockly.Arduino.ORDER_ATOMIC) || '0';
  var rightSpeed = Blockly.Arduino.valueToCode(this, 'rightSpeed',Blockly.Arduino.ORDER_ATOMIC) || '0';
  


  // rightSpeed=-rightSpeed;

  var code='';
  code+='MotorLeft.setSpeed('+leftSpeed+');\n';
  code+='MotorRight.setSpeed(-'+rightSpeed+');\n';

  // if(rightSpeed>=0) {
  //   code+='MotorRight.setSpeed(-'+rightSpeed+');\n';
  // } else {
  //   code+='MotorRight.setSpeed(abs('+rightSpeed+'));\n';
  // }
  // code+='MotorRight.setSpeed('+rightSpeed+');\n';
  
  return code;
};

Blockly.Arduino.MDMotorPlusSpeed = function() {

  var defineMotorPlus='#include <Microduino_MotorPlus.h>\n';
  defineMotorPlus+='MotorPlus motoPlus; \n';
  Blockly.Arduino.definitions_['define_motorPlus'] = defineMotorPlus;

  var motorPlusSetup='motoPlus.begin();\n';
  Blockly.Arduino.setups_['setup_motoPlus'] = motorPlusSetup;


  var leftSpeed = Blockly.Arduino.valueToCode(this, 'leftSpeed',Blockly.Arduino.ORDER_ATOMIC) || '0';
  var rightSpeed = Blockly.Arduino.valueToCode(this, 'rightSpeed',Blockly.Arduino.ORDER_ATOMIC) || '0';

  var code='';
  code+='motoPlus.setSpeed('+leftSpeed+','+rightSpeed+');\n';
  
  return code;
};


Blockly.Arduino.MDMotorPlusRunStop = function() {

  var defineMotorPlus='#include <Microduino_MotorPlus.h>\n';
  defineMotorPlus+='MotorPlus motoPlus; \n';
  Blockly.Arduino.definitions_['define_motorPlus'] = defineMotorPlus;

  var motorPlusSetup='motoPlus.begin();\n';
  Blockly.Arduino.setups_['setup_motoPlus'] = motorPlusSetup;

var motorPlusLeft = this.getFieldValue('motorPlusLeft');
var motorPlusRight = this.getFieldValue('motorPlusRight');

var code='';

code+='motoPlus.setSpeed('+motorPlusLeft+','+motorPlusRight+');\n';

return code;

};