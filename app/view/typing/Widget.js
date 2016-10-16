
Ext.define('TypinApp.view.typing.Widget',{
    extend: 'Ext.panel.Panel',

    requires: [
        'TypinApp.view.typing.WidgetController',
        'TypinApp.view.typing.WidgetModel'
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
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Text'
                },
                {
                    xtype: 'textarea',
                    cls: 'typing-area',
                    width: '100%'
                }
            ]
        });

        me.callParent();
    }
});
