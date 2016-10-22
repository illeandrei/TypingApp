Ext.define('TypinApp.view.typing.Widget',{
    extend: 'Ext.panel.Panel',

    requires: [
        'TypinApp.view.typing.WidgetController',
        'TypinApp.view.typing.WidgetModel',
        'Ext.ux.LiveSearchGridPanel',
        'TypinApp.store.Versete'
    ],

    controller: 'typing-widget',
    viewModel: {
        type: 'typing-widget'
    },

    cls: 'widget',

    initComponent: function(){
        var me = this;

        Ext.apply(me, {
            defaults: {
                style: {
                    marginRight: '10px',
                    paddingLeft: '20px',
                    paddingRight: '20px'
                }
            },
            items: [
                me.comboForm = new Ext.form.Panel({
                    layout: 'hbox',
                    cls: 'comboForm',
                    defaults: {
                        xtype: 'combobox',
                        displayField: 'name',
                        queryMode: 'local',
                        labelWidth: 50
                    },
                    items: [
                        {
                            fieldLabel: 'Book',
                            valueField: 'abbr',
                            store: {
                                fields: ['abbr', 'name'],
                                data : [
                                    {
                                        "abbr":"1",
                                        "name":"Geneza"
                                    },
                                    {
                                        "abbr":"2",
                                        "name":"Ioan"
                                    },{
                                        "abbr":"3",
                                        "name":"Apocalipsa"
                                    }
                                ]
                            }
                        },
                        {
                            fieldLabel: 'Chapter',
                            cls: 'chapter',
                            store: {
                                fields: ['name'],
                                data : [
                                    {
                                        "name":"1"
                                    },
                                    {
                                        "name":"2"
                                    },{
                                        "name":"3"
                                    }
                                ]
                            },
                            listeners: {
                                select: 'selectChapter'
                            }
                        }
                    ]
                }),
                /*me.grid = Ext.create('Ext.ux.LiveSearchGridPanel', {
                    store: Ext.create('TypinApp.store.Versete'),
                    columnLines: true,
                    columns: [
                        {
                            flex     : 1,
                            dataIndex: 'verset'
                        }
                    ],
                    height: 350,
                    width: 800,
                    viewConfig: {
                        stripeRows: false
                    }
                })*/

                me.displayField = new Ext.form.field.Display({
                    xtype: 'displayfield'
                    /*renderer: function (value, field) {
                        return '<h2>' + value + '<h2>';
                    }*/
                    /*,
                    fieldLabel: 'Text',
                    bind: {
                        value: '{name}'
                    }*/
                }),
                me.textarea = new Ext.form.field.TextArea({
                    cls: 'typing-area',
                    width: '100%'
                })
            ]
        });

        me.callParent();
    },

    initEvents: function () {
        var me = this;
        
        me.textarea.on({
            change: 'isTyping'
        })
    }
});
