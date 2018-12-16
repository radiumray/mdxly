'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');

var colorSet='#6c91ac';

var mCookie_PORTS =[["D0,D1", "0"],
                    ["D2,D3", "1"], 
                    ["D4,D5", "2"]];

Blockly.Blocks.bluetoothMicroduinoBegin = {

  init: function() {
    this.setColour(colorSet);

    this.appendDummyInput("")
        .appendField(new Blockly.FieldImage("../../media/Microduino/mCookie_BT.png", 45, 32))
        .appendField(Blockly.bluePrepare)
        .appendField(Blockly.productType)
        .appendField(new Blockly.FieldDropdown(mCookie_PORTS), "PIN")
        .appendField(new Blockly.FieldTextInput("9600"), "baudRate");

    this.setPreviousStatement(true);
    this.setNextStatement(true);

  }
};


Blockly.Blocks.bluetoothMicroduinoReciver = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(new Blockly.FieldImage("../../media/Microduino/mCookie_BT.png", 45, 32))
        .appendField(Blockly.microduinoBlueReciver);
    
    this.appendStatementInput("reciverDataInput");

    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};


Blockly.Blocks.btMicroduinoReciverData = {

  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(Blockly.BTReciverData);

	this.setOutput(true, String);
  }
};


Blockly.Blocks.btMicroduinoSenderData = {

  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(Blockly.BTSenderData);

    this.appendValueInput('senderText')
        .setCheck(String)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.BTSende);

    this.setPreviousStatement(true);
    this.setNextStatement(true);

  }
};



Blockly.Blocks.MDBTSender = {

  init: function() {
    this.setColour(colorSet);

    this.appendDummyInput("")
        .appendField(new Blockly.FieldImage("../../media/Microduino/mCookie_BT.png", 45, 32))
        .appendField(Blockly.BTMDockSender)
        // .appendField(Blockly.productType)
        // .appendField(new Blockly.FieldDropdown(Type_md_mc), "Type_md_mc");
        .appendField(new Blockly.FieldTextInput(Blockly.typeMdockItem), "item");

    this.appendValueInput('mDockValue')
        .setCheck(String)
        .appendField(Blockly.typeMdockValue);
        // mDockValue
        // .appendField(new Blockly.FieldTextInput(Blockly.typeMdockValue), "value");

    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
  }
};


Blockly.Blocks.MDBTReciver = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(new Blockly.FieldImage("../../media/Microduino/mCookie_BT.png", 45, 32))
        .appendField(Blockly.mDockBlueReciver);
        
    
    this.appendStatementInput("reciverDataInput");

    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.MDBTReciverData= {
  init: function() {

    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(Blockly.mDockBTReciveData)
        .appendField(new Blockly.FieldTextInput(Blockly.typeMdockItem), "item");

    this.setOutput(true, String);
  }
};

// Blockly.Blocks.bluetoothcolorled = {

//   init: function() {
//     this.setColour(colorSet);

//     this.appendDummyInput("")
//         .appendField(Blockly.blueled)
//         .appendField(new Blockly.FieldImage("../../media/Microduino/mCookie_BT.png", 45, 32))
//         .appendField(Blockly.ColorLEDControl)
//         .appendField(new Blockly.FieldImage("../../media/Microduino/colorLEDBegin.png", 80, 32));

//     this.setPreviousStatement(true);
//     this.setNextStatement(true);


//   }
// };




Blockly.Blocks.BTATPrepare = {
  init: function() {
    var ATSerialType = 
        [[Blockly.MD_BTSerail, "serial"],
        [Blockly.MD_BTSerial1, 'serial1'],
        [Blockly.MD_BTSoftSerial45, 'softSerial45'],
              ];
    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(Blockly.MD_BTSerialType)
        .appendField(new Blockly.FieldDropdown(ATSerialType), "ATSerialType");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};


Blockly.Blocks.BTATOneTime = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(Blockly.MD_BTATExecuted);
    this.appendStatementInput("ATExecuted");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};


Blockly.Blocks.BTATCommands = {
  init: function() {
    var ATCommandsType = [
        [Blockly.MD_BTATTest, "ATTest"],
        [Blockly.MD_BTATqueryNAME, 'queryNAME'],
        [Blockly.MD_BTATqueryBaud, 'queryBaud'],
        [Blockly.MD_BTATqueryPARI, "queryPARI"],
        [Blockly.MD_BTATquerySTOP, 'querySTOP'],
        [Blockly.MD_BTATqueryMODE, 'queryMODE'],
        [Blockly.MD_BTATqueryROLE, "queryROLE"],
        [Blockly.MD_BTATqueryPASS, 'queryPASS'],
        [Blockly.MD_BTATqueryTYPE, 'queryTYPE'],
        [Blockly.MD_BTATqueryADDR, "queryADDR"],
        [Blockly.MD_BTATquerySuccessedADDR, 'querySuccessedADDR'],
        [Blockly.MD_BTATqueryVersion, 'queryVersion'],
        [Blockly.MD_BTATqueryTimeCON, "queryTimeCON"],
        [Blockly.MD_BTATqueryWorkStyle, 'queryWorkStyle'],
        [Blockly.MD_BTATsearchRSSI, 'searchRSSI'],
        [Blockly.MD_BTATqueryTIBE, "queryTIBE"],
        [Blockly.MD_BTATqueryEmissionSignalStrength, 'queryEmissionSignalStrength'],
        [Blockly.MD_BTATrenew, 'renew'],
        [Blockly.MD_BTATreset, "reset"],
        [Blockly.MD_BTATCLEAR, 'CLEAR'],
        [Blockly.MD_BTATqueryCONNLast, 'queryCONNLast'],
              ];
    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(Blockly.MD_BTATCommands)
        .appendField(new Blockly.FieldDropdown(ATCommandsType), "ATCommandsType");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    // this.setOutput(true, Boolean);
  }
};


Blockly.Blocks.BTATOLEDShow = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(Blockly.MD_BTATOLEDShow);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.BTATClear = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(Blockly.MD_BTATClear);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};


Blockly.Blocks.BTATsetBaud = {
  init: function() {
    var ATBandType = [
        ["9600", "0"],
        ["19200", "1"],
        ["38400", "2"],
        ["57600", "3"],
        ["115200", "4"],
        ];
    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(Blockly.MD_BTATsetBaud)
        .appendField(new Blockly.FieldDropdown(ATBandType), "ATBandType");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    // this.setOutput(true, Boolean);
  }
};

Blockly.Blocks.BTATsetPARI = {
  init: function() {
    var ATPARIType = [
        [Blockly.MD_BTATNoPARI, "0"],
        ["EVEN", "1"],
        ["ODD", "2"],
        ];
    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(Blockly.MD_BTATsetPARI)
        .appendField(new Blockly.FieldDropdown(ATPARIType), "ATPARIType");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    // this.setOutput(true, Boolean);
  }
};


Blockly.Blocks.BTATsetSTOP = {
  init: function() {
    var ATSTOPType = [
        [Blockly.MD_BTATset1STOP, "0"],
        [Blockly.MD_BTATset2STOP, "1"],
        ];
    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(Blockly.MD_BTATsetSTOP)
        .appendField(new Blockly.FieldDropdown(ATSTOPType), "ATSTOPType");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.BTATsetMODE = {
  init: function() {
    var ATMODEType = [
        [Blockly.MD_BTATEnSetMODE, "0"],
        [Blockly.MD_BTATDisSetMODE, "1"],
        ];
    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(Blockly.MD_BTATsetMODE)
        .appendField(new Blockly.FieldDropdown(ATMODEType), "ATMODEType");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.BTATsetROLE = {
  init: function() {
    var ATROLEType = [
        [Blockly.MD_BTATMaster, "0"],
        [Blockly.MD_BTATSlaver, "1"],
        ];
    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(Blockly.MD_BTATsetROLE)
        .appendField(new Blockly.FieldDropdown(ATROLEType), "ATROLEType");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.BTATsetTYPE = {
  init: function() {
    var ATTypeType = [
        [Blockly.MD_BTATConNoPass, "0"],
        [Blockly.MD_BTATConNeedPass, "1"],
        ];
    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(Blockly.MD_BTATsetTYPE)
        .appendField(new Blockly.FieldDropdown(ATTypeType), "ATTypeType");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};


Blockly.Blocks.BTATsetEmissionSignalStrength = {
  init: function() {
    var ATEmissionSignalStrengthType = [
        ["4dbm", "0"],
        ["0dbm", "1"],
        ["-6dbm", "2"],
        ["-23dbm", "3"],
        ];
    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(Blockly.MD_BTATsetEmissionSignalStrength)
        .appendField(new Blockly.FieldDropdown(ATEmissionSignalStrengthType), "ATEmissionSignalStrengthType");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};


Blockly.Blocks.BTATsetWorkStyle = {
  init: function() {
    var ATsetWorkStyleType = [
        [Blockly.MD_BTATWaitCon, "0"],
        [Blockly.MD_BTATWorkNow, "1"],
        ];
    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(Blockly.MD_BTATsetWorkStyle)
        .appendField(new Blockly.FieldDropdown(ATsetWorkStyleType), "ATsetWorkStyleType");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};


Blockly.Blocks.BTATsetConnectNum = {
  init: function() {
    this.setColour(colorSet);
    this.appendValueInput('btNum')
      .setCheck(Number)
      .appendField(Blockly.MD_BTATsetConnectNum);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
  }
};


Blockly.Blocks.BTATsetNAME = {
  init: function() {
    this.setColour(colorSet);
    this.appendValueInput('btName')
      .setCheck(String)
      .appendField(Blockly.MD_BTATsetName);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
  }
};


Blockly.Blocks.BTATconnectSlaver = {
  init: function() {
    this.setColour(colorSet);
    this.appendValueInput('btAddress')
      .setCheck(String)
      .appendField(Blockly.MD_BTATconnectSlaver);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
  }
};


Blockly.Blocks.BTATsetPASS = {
  init: function() {
    this.setColour(colorSet);
    this.appendValueInput('btPass')
      .setCheck(Number)
      .appendField(Blockly.MD_BTATsetPASS);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
  }
};

Blockly.Blocks.BTATsetTimeCON = {
  init: function() {
    this.setColour(colorSet);
    this.appendValueInput('btTime')
      .setCheck(Number)
      .appendField(Blockly.MD_BTATsetTimeCON);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
  }
};

Blockly.Blocks.BTATsetTIBE = {
  init: function() {
    this.setColour(colorSet);
    this.appendValueInput('btTIBETime')
      .setCheck(Number)
      .appendField(Blockly.MD_BTATsetTIBE);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
  }
};

Blockly.Blocks.BTATsearchAvalibleSlavers = {
  init: function() {
    this.setColour(colorSet);
    this.appendValueInput('btSearchTime')
      .setCheck(Number)
      .appendField(Blockly.MD_BTATsearchAvalibleSlavers);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
  }
};