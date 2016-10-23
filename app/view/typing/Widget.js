Ext.define('TypinApp.view.typing.Widget',{
    extend: 'Ext.panel.Panel',

    requires: [
        'TypinApp.view.typing.WidgetController',
        'TypinApp.view.typing.WidgetModel',
        'Ext.ux.LiveSearchGridPanel',
        'TypinApp.store.Versete',
        'Ext.layout.container.Border'
    ],

    controller: 'typing-widget',
    viewModel: {
        type: 'typing-widget'
    },

    // cls: 'widget',

    layout: 'border',
    width: 500,
    height: 400,

    bodyBorder: false,

    defaults: {
        collapsible: true,
        bodyPadding: 10
    },

    initComponent: function(){
        var me = this;

        Ext.apply(me, {
            items: [
                {
                    title: 'Typing App',
                    region: 'north',
                    height: 150,
                    minHeight: 50,
                    maxHeight: 100,
                    items: [
                        me.comboForm = new Ext.form.Panel({
                            layout: 'hbox',
                            cls: 'comboForm',
                            defaults: {
                                xtype: 'combobox',
                                displayField: 'name',
                                queryMode: 'local',
                                labelWidth: 50,
                                flex: 1
                            },
                            items: [
                                {
                                    fieldLabel: 'Book',
                                    valueField: 'abbr',
                                    padding: '0 20 0 0',
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
                        })
                    ]
                },
                {
                    collapsible: false,
                    region: 'center',
                    layout: 'vbox',
                    defaults: {
                        width: '100%'
                    },
                    items: [
                        me.displayField = new Ext.form.field.Display({
                            padding: '0 0 0 10'
                        }),
                        me.textarea = new Ext.form.field.TextArea({
                            // cls: 'typing-area',
                            disabled: true
                        })
                    ]
                }
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
