'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');



Blockly.Arduino.mdStepperSpeedPrepare = function() {
	var StepperChoice = this.getFieldValue('StepperChoice');
	var defineStepperBegin='#include <Microduino_Stepper.h>\n';
	Blockly.Arduino.definitions_['define_stepperBegin'] = defineStepperBegin;

	Blockly.Arduino.definitions_['define_stepper'+StepperChoice] = 'Stepper stepper'+StepperChoice+'(PIN_DIR'+StepperChoice+', PIN_STEP'+StepperChoice+');';
	Blockly.Arduino.setups_['setup_stepper'+StepperChoice] = 'stepper'+StepperChoice+'.begin(1024);';

	var code='';
	return code;
};


Blockly.Arduino.mdStepperSpeedControl = function() {
	var StepperChoice = this.getFieldValue('StepperChoice');
	var StepperControl = this.getFieldValue('StepperControl');
	var speed = Blockly.Arduino.valueToCode(this, 'speed', Blockly.Arduino.ORDER_ATOMIC) || '';

	var code='';
	code+='stepper'+StepperChoice+'.'+StepperControl+'('+speed+');\n';

	return code;
};


Blockly.Arduino.mdStepperSpeedGet = function() {
	var StepperChoice = this.getFieldValue('StepperChoice');
	var StepperAttrib = this.getFieldValue('StepperAttrib');
	var code = '';
	code +='stepper'+StepperChoice+'.'+StepperAttrib+'()';
	return [code, Blockly.Arduino.ORDER_ATOMIC];
};



Blockly.Arduino.mdStepperPosPrepare = function() {
	var StepperChoice = this.getFieldValue('StepperChoice');
	var maxSpeed = Blockly.Arduino.valueToCode(this, 'maxSpeed', Blockly.Arduino.ORDER_ATOMIC) || '';
	var accelerate = Blockly.Arduino.valueToCode(this, 'accelerate', Blockly.Arduino.ORDER_ATOMIC) || '';
	var stepperNum = Blockly.Arduino.valueToCode(this, 'stepperNum', Blockly.Arduino.ORDER_ATOMIC) || '';

	var defineStepperBegin='#include <Microduino_Stepper.h>\n';
	Blockly.Arduino.definitions_['define_stepperBegin'] = defineStepperBegin;

	var setupPosition='';

	Blockly.Arduino.definitions_['define_stepperP'+StepperChoice] = 'StepServo stepper'+StepperChoice+'(PIN_DIR'+StepperChoice+', PIN_STEP'+StepperChoice+');';
	setupPosition+='stepper'+StepperChoice+'.begin();\n';
	setupPosition+='stepper'+StepperChoice+'.setMaxSpeed('+maxSpeed+');\n';
	setupPosition+='stepper'+StepperChoice+'.setAcceleration('+accelerate+');\n';
	setupPosition+='stepper'+StepperChoice+'.moveTo('+stepperNum+');';
	Blockly.Arduino.setups_['setup_stepperP'+StepperChoice] = setupPosition;


	var code='';
	return code;
};


Blockly.Arduino.mdStepperPosControlP1 = function() {
	var StepperChoice = this.getFieldValue('StepperChoice');
	var StepperControl = this.getFieldValue('StepperControl');
	var controlNum = Blockly.Arduino.valueToCode(this, 'controlNum', Blockly.Arduino.ORDER_ATOMIC) || '';
	var code='';
	code+='stepper'+StepperChoice+'.'+StepperControl+'('+controlNum+');\n';
	return code;
};

Blockly.Arduino.mdStepperPosControl = function() {
	var StepperChoice = this.getFieldValue('StepperChoice');
	var StepperControl = this.getFieldValue('StepperControl');
	var code='';
	code+='stepper'+StepperChoice+'.'+StepperControl+'();\n';
	return code;
};


Blockly.Arduino.mdStepperPosGet = function() {
	var StepperChoice = this.getFieldValue('StepperChoice');
	var StepperAttrib = this.getFieldValue('StepperAttrib');
	var code = '';
	code +='stepper'+StepperChoice+'.'+StepperAttrib+'()';
	return [code, Blockly.Arduino.ORDER_ATOMIC];
};







