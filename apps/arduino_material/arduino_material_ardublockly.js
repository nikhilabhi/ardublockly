/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview JavaScript for Arduino app with material design.
 */
'use strict';

/**
 * Create a namespace for the application.
 */
var ArduinoMaterial = ArduinoMaterial || {};

/**
 * Injects Blockly into a given text area.
 * @param {!Element} el Element to inject Blockly into.
 */
ArduinoMaterial.injectBlockly = function(el) {
  var toolbox = ArduinoMaterial.readToolbox('arduino_toolbox.xml');
  Blockly.inject(el, {
        media: '../../media/',
        rtl: false,
        scrollbars: true,
        toolbox: toolbox });
};

/**
 * Open the XML containing the toolbox data.
 * @param {!string} xml_path String containing the XML file path.
 * @return {!string} Contains the text in a single string.
 */
ArduinoMaterial.readToolbox = function(xml_path) {
  var request = new XMLHttpRequest();
  request.open("GET", xml_path, false);
  request.send(null);
  return request.responseText;
};

/**
 * Renders the XML code into a given text area.
 * TODO: This file should not contain "elements", needs to be refactored to
 *       return as string to be added into the design somewhere else.
 * @param {!Element} el Textarea element to save the code into.
 */
ArduinoMaterial.generateXml = function(el) {
  var xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
  var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
  el.value = xmlText;
};

/**
 * Renders the Arduino color highlighted code code into an element.
 * TODO: This file should not contain "elements", needs to be refactored to
 *       return as string to be added into the design somewhere else.
 * @param {!Element} el Pre element to save the code into.
 */
ArduinoMaterial.generateArduino = function(el) {
  var code = Blockly.Arduino.workspaceToCode();
  el.textContent = code;
  if (typeof prettyPrintOne == 'function') {
    code = el.innerHTML;
    code = prettyPrintOne(code, 'cpp');
    el.innerHTML = code;
  }
};

/**
 * Execute the user's code.
 */
ArduinoMaterial.runCode = function() {
  ArduinoMaterial.materialAlert(
      'Under development',
      'Function not yet implemented. Code is:\n' +
      Blockly.Arduino.workspaceToCode());
};

/**
 * Parses the XML from its input to generate and replace the blocks in the
 * Blockly workspace.
 * @param {!string} blocks_xml String of XML code for the blocks.
 * @return {!boolean} Indicates if the XML into blocks parse was successful.
 */
ArduinoMaterial.replaceBlocksfromXml = function(blocks_xml) {
  var xmlDom = null;
  try {
    xmlDom = Blockly.Xml.textToDom(blocks_xml);
  } catch (e) {
    return false;
  }
  Blockly.mainWorkspace.clear();
  var sucess = false;
  if (xmlDom) {
    sucess = ArduinoMaterial.loadBlocksfromXmlDom(xmlDom);
  }
  return sucess;
};


/**
 * Parses the XML from its input to generate and add blocks to the workspace.
 * @param {!string} blocks_xml_dom String of XML DOM code for the blocks.
 * @return {!boolean} Indicates if the XML into blocks parse was successful.
 */
ArduinoMaterial.loadBlocksfromXmlDom = function(blocks_xml_dom) {
  try {
    Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, blocks_xml_dom);
  } catch (e) {
    return false;
  }
  return true;
};

/**
 * Scrolls In or Out the toolbox from the Blockly workspace.
 * As the jQuery animation takes some time a callback is used to continue
 * operation.
 * @param {!boolean} show Indicates to show or hide the toolbox.
 * @param {function=} callback Function to be called once the animation is
 *                             finished.
 */
ArduinoMaterial.viewToolbox = function(show, callback) {
  var toolbox = $( ".blocklyToolboxDiv" );
  if (show == false) {
    toolbox.slideUp('slow', callback);
  } else {
    toolbox.slideDown('slow', callback);
  }
  ArduinoMaterial.resizeBlocklyWorkspace();
};

/**
 * Discard all blocks from the workspace.
 */
ArduinoMaterial.discard = function() {
  var block_count = Blockly.mainWorkspace.getAllBlocks().length;
  if (block_count == 1) {
    Blockly.mainWorkspace.clear();
    ArduinoMaterial.renderContent();
  } else if (block_count > 1) {
    ArduinoMaterial.materialAlert(
        'Delete blocks?',
        'There are ' + block_count + ' blocks on the workspace. Are you \
        sure you want to delete them?',
        true,
        function() {
          Blockly.mainWorkspace.clear();
          ArduinoMaterial.renderContent();
        });
  }
};

/**
 * Loads the blocks XML onto the Blockly SVG area.
 * @param {!String} xml_path String containing the XML file path.
 */
ArduinoMaterial.loadXMLblocks = function(xmlCode) {
  alert('Function not yet implemented');
};
