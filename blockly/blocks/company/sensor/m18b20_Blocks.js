'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');


//var colorSet=518;
var colorSet='#efa752';


// Blockly.Blocks.mCookie_18B20 = {
//   init: function() {
//     this.setColour(colorSet);

//     this.appendDummyInput()
//     // .appendField(new Blockly.FieldImage("../../media/Microduino/LM75.png", 40, 30))
//         .appendField(Blockly.MicroduinoLM75)
//     this.appendValueInput("digitalPin", Number)
//         .setCheck(Number)
//         .setAlign(Blockly.ALIGN_RIGHT);

//     this.setInputsInline(true);

//     this.setOutput(true, Number);

//     var tip="获取一个温度值\n";
//     tip+="返回一个数字值\n";
//     tip+="数字接口\n";
//     this.setTooltip(tip);
//     //this.setHelpUrl('https://www.microduino.cn/wiki/index.php/Main_Page/zh');

//   }
// };

//DS18B20温度传感器
Blockly.Blocks.mCookie_18B20 = {
    init: function () {
        var UNIT = [[Blockly.MIXLY_DS18B20_C, '0'], [Blockly.MIXLY_DS18B20_F, '1']];
        this.setColour(colorSet);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.MIXLY_DS18B20)
            .setCheck(Number);
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_DS18B20_GET_TEMP)
            .appendField(new Blockly.FieldDropdown(UNIT), "UNIT");
        this.setOutput(true, Number);
    }
};
