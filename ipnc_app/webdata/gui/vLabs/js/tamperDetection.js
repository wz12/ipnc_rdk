var origTDSettings={};var tDSettings={};function saveTamperDetSettings(){if($("#val").val()!=="NaN"&&parseDecimal($("#val").val())!==0&&parseDecimal($("#val").val())<=100){sendSettings(tDSettings,["dmvacfgtdresettime","dmvacfgtdsensitivity","dmvacfgtdenv1","dmvacfgtdenv2"],function(){$("#tamperModal").modal("hide");videoManager.showAll()})}else{showMessageModal("Message","Invalid Reset Sec")}}function openTamperDetection(){$.ajax({url:IPNC.serverURL+"ini.htm",success:function(d){var e=parseINI(d);origTDSettings=$.extend({},e,{tDSensitivities:e.dmvacfgtdsensitivityname.split(/;/)});tDSettings=$.extend({},origTDSettings);senSettings=curry(updateFromCombo,tDSettings,"dmvacfgtdsensitivity","selectSensitivityId");var b=mkElem("div",{},[mkInlineSelectionInput("Sensitivity   ","selectSensitivityId",tDSettings.tDSensitivities,{selectClass:"input-large",selectedIndex:tDSettings.dmvacfgtdsensitivity-1,change:function(){senSettings();tDSettings.dmvacfgtdsensitivity=tDSettings.dmvacfgtdsensitivity+1}}),slidingControls("Reset Sec","resetSecId","val"),mkElem("h3",{},"Press Save to accept or Cancel to reject changes")]);var a=mkElemClass("div","form-actions",[mkButton("Save","btn btn-primary",saveTamperDetSettings)," ",mkButton("Cancel",null,function(){$("#tamperModal").modal("hide");videoManager.showAll()})," "]);var c=mkModal("tamperModal","","<h3> Configure Camera Tamper</h3>",b,a,true,videoManager.showAll);videoManager.hideAll();$("#modalContainer").html(c);$("#tamperModal").modal("show");connectSlider("resetSecId","#val",tDSettings,"dmvacfgtdresettime",100);validateNumericField("#val",3)}})};