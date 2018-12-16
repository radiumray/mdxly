'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');


//var colorSet=120;
var colorSet='#27b6ac';


Blockly.Blocks.mdStepperSpeedPrepare = {
   init: function() {

    var StepperChoice = [
                 ['A', 'A'],
                 ['B', 'B'],
                 ['C', 'C'],
                 ['D', 'D']
              ];

    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(Blockly.StepperSpeed)
        .appendField(Blockly.MDStepper);

    this.appendDummyInput("")
        .appendField(Blockly.StepperChoice)
        .appendField(new Blockly.FieldDropdown(StepperChoice), 'StepperChoice')
        .appendField(Blockly.MDStpperPrepare);

    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    }
};



Blockly.Blocks.mdStepperSpeedControl = {
   init: function() {
    var StepperChoice = [
                 ['A', 'A'],
                 ['B', 'B'],
                 ['C', 'C'],
                 ['D', 'D']
              ];
    var StepperControl = [
                [Blockly.StepperSpeed, 'setSpeed'],
                [Blockly.MDStepperMaxAccl, 'setMaxAccel'],
                [Blockly.MDStepperMaxSpeed, 'setMaxSpeed']
              ];
    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(Blockly.StepperSpeed)
        .appendField(Blockly.MDStepper)
        .appendField(Blockly.StepperChoice)
        .appendField(new Blockly.FieldDropdown(StepperChoice), 'StepperChoice');

    this.appendDummyInput("")
        .appendField(Blockly.MDStepperControl)
        .appendField(new Blockly.FieldDropdown(StepperControl), 'StepperControl');

    this.appendValueInput('speed')
        .setCheck(Number)
        .appendField('');

    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    }
};


Blockly.Blocks.mdStepperSpeedGet = {
  init: function() {
    var StepperChoice = [
                 ['A', 'A'],
                 ['B', 'B'],
                 ['C', 'C'],
                 ['D', 'D']
              ];
    var StepperAttrib = [
                [Blockly.StepperSpeed, 'getSpeed'],
                [Blockly.MDStepperMaxAccl, 'getMaxAccel'],
                [Blockly.MDStepperMaxSpeed, 'getMaxSpeed']
              ];
    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(Blockly.StepperSpeed)
        .appendField(Blockly.MDStepper)
    // this.appendDummyInput("")
        .appendField(Blockly.StepperChoice)
        .appendField(new Blockly.FieldDropdown(StepperChoice), 'StepperChoice')
    // this.appendDummyInput("")
        .appendField(Blockly.MDStepperAttribute)
        .appendField(new Blockly.FieldDropdown(StepperAttrib), 'StepperAttrib');

    this.setOutput(true, Number);
    this.setTooltip("返回速度步进各种属性");
  }
};




Blockly.Blocks.mdStepperPosPrepare = {
   init: function() {

    var StepperChoice = [
                 ['A', 'A'],
                 ['B', 'B'],
                 ['C', 'C'],
                 ['D', 'D']
              ];

    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(Blockly.MDStepperPosition)
        .appendField(Blockly.MDStepper)
        .appendField(Blockly.StepperChoice)
        .appendField(new Blockly.FieldDropdown(StepperChoice), 'StepperChoice');


    this.appendValueInput('maxSpeed')
        .setCheck(Number)
        .appendField(Blockly.MDStepperMaxSpeed);

    this.appendValueInput('accelerate')
        .setCheck(Number)
        .appendField(Blockly.MDStepperAccl);

    this.appendValueInput('stepperNum')
        .setCheck(Number)
        .appendField(Blockly.MDStepperNum);

    this.appendDummyInput("")
        .appendField(Blockly.MDStpperPrepare);

    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    }
};





Blockly.Blocks.mdStepperPosControlP1 = {
   init: function() {
    var StepperChoice = [
                 ['A', 'A'],
                 ['B', 'B'],
                 ['C', 'C'],
                 ['D', 'D']
              ];
    var StepperControl = [
                [Blockly.StepperSpeed, 'setSpeed'],
                [Blockly.MDStepperMaxSpeed, 'setMaxSpeed'],
                [Blockly.MDStepperAccl, 'setAcceleration'],
                [Blockly.MDStepperPosition, 'setCurrentPosition'],
                [Blockly.MDStepperPosMoveTo, 'moveTo'],
                [Blockly.MDStepperPosMove, 'move'],
                [Blockly.MDStepperRunToNewPosition, 'runToNewPosition'],
                [Blockly.MDStepperRunDistance, 'runDistance']
              ];
    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(Blockly.MDStepperPosition)
        .appendField(Blockly.MDStepper)
        .appendField(Blockly.StepperChoice)
        .appendField(new Blockly.FieldDropdown(StepperChoice), 'StepperChoice');

    this.appendDummyInput("")
        .appendField(Blockly.MDStepperControl)
        .appendField(new Blockly.FieldDropdown(StepperControl), 'StepperControl');

    this.appendValueInput('controlNum')
        .setCheck(Number)
        .appendField('');

    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    }
};



Blockly.Blocks.mdStepperPosControl = {
   init: function() {
    var StepperChoice = [
                 ['A', 'A'],
                 ['B', 'B'],
                 ['C', 'C'],
                 ['D', 'D']
              ];
    var StepperControl = [
                [Blockly.MDStpperRun, 'run'],
                [Blockly.MDStpperStop, 'stop'],
                [Blockly.MDStepperRunToPosition, 'runToPosition']
              ];
    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(Blockly.MDStepperPosition)
        .appendField(Blockly.MDStepper)
        .appendField(Blockly.StepperChoice)
        .appendField(new Blockly.FieldDropdown(StepperChoice), 'StepperChoice');

    this.appendDummyInput("")
        .appendField(Blockly.MDStepperControl)
        .appendField(new Blockly.FieldDropdown(StepperControl), 'StepperControl');

    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    }
};


Blockly.Blocks.mdStepperPosGet = {
  init: function() {
    var StepperChoice = [
                 ['A', 'A'],
                 ['B', 'B'],
                 ['C', 'C'],
                 ['D', 'D']
              ];
    var StepperAttrib = [
                [Blockly.StepperSpeed, 'getSpeed'],
                [Blockly.MDStepperAccl, 'getAcceleration'],
                [Blockly.MDStepperPosDistanceToGo, 'distanceToGo'],
                [Blockly.MDStepperCurrentPosition, 'getCurrentPosition'],
                [Blockly.MDStepperTargetPosition, 'getTargetPosition'],
                [Blockly.MDStepperRunSpeedToPosition, 'runSpeedToPosition']
              ];
    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(Blockly.MDStepper)
        .appendField(Blockly.MDStepperPosition)

    // this.appendDummyInput("")
        .appendField(Blockly.StepperChoice)
        .appendField(new Blockly.FieldDropdown(StepperChoice), 'StepperChoice')

    // this.appendDummyInput("")
        .appendField(Blockly.MDStepperAttribute)
        .appendField(new Blockly.FieldDropdown(StepperAttrib), 'StepperAttrib');

    this.setOutput(true, Number);
    this.setTooltip("返回位置步进各种属性");
  }
};








