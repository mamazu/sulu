define(function(){"use strict";var a=function(a){this.sandbox.on("sulu.list-toolbar.add",function(){this.sandbox.emit("husky.datagrid.record.add",{id:"",name:"",changed:"",created:"",author:""})}.bind(this)),this.sandbox.on("sulu.list-toolbar.delete",function(){this.sandbox.emit("husky.toolbar."+a+".item.disable","delete"),this.sandbox.emit("husky.datagrid.items.get-selected",function(a){this.sandbox.emit("sulu.tags.delete",a)}.bind(this))},this),this.sandbox.on("husky.datagrid.data.save.failed",function(a){a.responseJSON&&a.responseJSON.code&&b.call(this,a.responseJSON.code)},this)},b=function(a){var b="";switch(a){case 1101:b="tag.error.notUnique"}this.sandbox.emit("sulu.labels.error.show",b,"labels.error","")};return{view:!0,instanceNameToolbar:"saveToolbar",layout:{content:{width:"max",leftSpace:!1,rightSpace:!1}},header:function(){return{title:"tag.tags.title",noBack:!0,breadcrumb:[{title:"navigation.settings"},{title:"tag.tags.title"}]}},templates:["/admin/tag/template/tag/list"],initialize:function(){this.render(),a.call(this,this.instanceNameToolbar)},render:function(){this.sandbox.dom.html(this.$el,this.renderTemplate("/admin/tag/template/tag/list")),this.sandbox.sulu.initListToolbarAndList.call(this,"tagsFields","/admin/api/tags/fields",{el:this.$find("#list-toolbar-container"),template:"default",listener:"default",instanceName:this.instanceNameToolbar,inHeader:!0},{el:this.sandbox.dom.find("#tags-list",this.$el),url:"/admin/api/tags?flat=true",resultKey:"tags",viewOptions:{table:{editable:!0,validation:!0,fullWidth:!0}}})}}});