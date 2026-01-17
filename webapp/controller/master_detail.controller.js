sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
  "sap/ui/model/FilterType",
  "sap/ui/model/json/JSONModel",

], (Controller, Filter, FilterOperator, FilterType, JSONModel) => {
  "use strict";

  return Controller.extend("masterdetail.masterdetail.controller.master_detail", {
    onInit() {
    },

    onListPress: function (oEvent) {
      var orderID = oEvent.getParameter("listItem").getBindingContext().getProperty("OrderID");
      var oFilter = new Filter("OrderID", FilterOperator.EQ, orderID);

      //this.getView().byId("orderTable").getBinding("items").filter(oFilter, FilterType.Application);
      this.byId("orderTable").getBinding("items").filter([oFilter], FilterType.Application);
      this.getSplitContObj().to(this.createId("orderDetail"));
    },

    onPressOrderdetail: function (oEvent) {
      var that = this;
      var productID = oEvent.getSource().getBindingContext().getProperty("ProductID")
      var oModel = this.getOwnerComponent().getModel();
      oModel.read("/Products(" + productID + ")", {
        success: function (oData) {
          var jData = new JSONModel(oData);
          that.getView().byId("productForm").setModel(jData);
          that.getSplitContObj().to(that.createId("productDetailPage"))
        }, error: function (oError) {
          console.log(oError);
        }
      })
    },

    getSplitContObj: function () {
      var result = this.byId("SplitCont");
      return result;
    },
    onProductBack: function () {
      this.getSplitContObj().backDetail();
    },

    onUpdateStarted: function (oEvent) {
      //onPressOrderdetail(oEvent);

      var that = this;
      //var productID = oEvent.getSource().getBindingContext().getProperty("ProductID")
      // var oModel = this.getOwnerComponent().getModel();
      // oModel.read("/Products(" + productID + ")", {
      //     success: function (oData) {
      //       var jData = new JSONModel(oData);
      //       that.getView().byId("productForm").setModel(jData);
      //       that.getSplitContObj().to(that.createId("productDetailPage"))
      //     }, error: function (oError) {            
      //       console.log(oError);
      //     }
      //   })


    },
    onUpdateFinished: function (oEvent) {      
      sap.ui.core.BusyIndicator.show(0);  
      var oBinding = oEvent.getSource().getBinding("items");
      if (oBinding) {
        var aContexts = oBinding.getCurrentContexts();

        if (aContexts.length > 0) {
          var OrderID = aContexts[0].getProperty("OrderID");
          console.log("First Order ID:", OrderID);
        }
      }     
      var oFilter = new Filter("OrderID", FilterOperator.EQ, OrderID);
       this.byId("orderTable").getBinding("items").filter([oFilter], FilterType.Application);
       //this.getSplitContObj().to(this.createId("orderDetail"));            

       sap.ui.core.BusyIndicator.hide();  
       this.getOwnerComponent().getModel().attachBatchRequestCompleted(() => 
        {
          this.byId("orderTable").setBusy(false);
        });
      
      
      

    }

  });
});