'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');

Blockly.Arduino.MDGesturePre = function() {

	var gestureMode = this.getFieldValue('gestureMode');

	var GestureInclude="";
	GestureInclude+="#include <Microduino_Gesture.h>\n";
	Blockly.Arduino.definitions_['var_GestureInclude'] = GestureInclude;

	var GestureVar='';
	GestureVar+='Gesture gestureSensor;\n';
	Blockly.Arduino.definitions_['var_GestureVar'] = GestureVar;

	var GestureSetup='';
	GestureSetup+='gestureSensor.begin();\n';
	switch(gestureMode)
	{
	case 'gesture':
	  GestureSetup+='gestureSensor.setGestureGain(GGAIN_1X);\n';
	  GestureSetup+='gestureSensor.enableGestureSensor(true);\n';
	  break;
	case 'color':
	  GestureSetup+='gestureSensor.enableLightSensor(true);\n';
	  break;
	case 'proximity':
		GestureSetup+='gestureSensor.setProximityGain(PGAIN_1X);\n';
		GestureSetup+='gestureSensor.enableProximitySensor(true);\n';
	  break;
	default:
	}
	Blockly.Arduino.setups_['setup_GestureSetup'] = GestureSetup;

  var code='\n';

  return code;

};

Blockly.Arduino.MDGestureGet = function() {
  var getSensor = this.getFieldValue('getSensor');
  var code='gestureSensor.'+getSensor+'()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

