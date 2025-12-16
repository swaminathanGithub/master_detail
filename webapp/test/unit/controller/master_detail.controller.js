/*global QUnit*/

sap.ui.define([
	"masterdetail/masterdetail/controller/master_detail.controller"
], function (Controller) {
	"use strict";

	QUnit.module("master_detail Controller");

	QUnit.test("I should test the master_detail controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
