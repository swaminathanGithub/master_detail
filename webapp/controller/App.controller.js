sap.ui.define([
  "sap/ui/core/mvc/Controller"
], (BaseController) => {
  "use strict";

  return BaseController.extend("masterdetail.masterdetail.controller.App", {
      onInit() {
        sap.ui.core.BusyIndicator.show(0);
      }
  });
});