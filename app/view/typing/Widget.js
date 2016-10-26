Ext.define('TypinApp.view.typing.Widget',{
    extend: 'Ext.panel.Panel',

    requires: [
        'TypinApp.view.typing.WidgetController',
        'TypinApp.view.typing.WidgetModel',
        'Ext.ux.LiveSearchGridPanel',
        'TypinApp.store.Books',
        'TypinApp.store.Chapters',
        'Ext.layout.container.Border'
    ],

    controller: 'typing-widget',
    viewModel: {
        type: 'typing-widget'
    },

    cls: 'widget',

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
                    id: 'northPanel',
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
                                displayField: 'name',
                                queryMode: 'local',
                                labelWidth: 50,
                                flex: 1
                            },
                            items: [
                                me.bookCombo = new Ext.form.field.ComboBox({
                                    displayField: 'name',
                                    valueField: 'id',
                                    name: 'book',
                                    padding: '0 20 0 0',
                                    emptyText: 'Select Book',
                                    store: {
                                        type: 'books'
                                    }
                                }),
                                me.chapterCombo = new Ext.form.field.ComboBox({
                                    displayField: 'chapters',
                                    valueField: 'chapters',
                                    name: 'chapter',
                                    id: 'chapterCombo',
                                    cls: 'chapter',
                                    emptyText: 'Select Chapter',
                                    store: {
                                        type: 'chapters'
                                    }
                                })
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
                            cls: 'display-field',
                            padding: '0 0 0 10'
                        }),
                        me.textarea = new Ext.form.field.TextArea({
                            disabled: true,
                            emptyText: 'Start typing...',
                            listeners: {
                                change: 'isTyping'
                            }
                        })
                    ]
                },
                me.resultWindow = new Ext.window.Window({
                    modal: true,
                    width: 400,
                    height: 200,
                    keyMapEnabled: true,
                    bind: {
                        title: '{resultWindowTitle}'
                    },
                    bbar: [
                        '->',
                        {
                            xtyep: 'button',
                            text: 'OK',
                            handler: 'restartApp'
                        }
                    ],
                    items: [
                        {
                            xtype: 'displayfield',
                            bind: {
                                fieldLabel: '{errorCount}'
                            }
                        },{
                            xtype: 'displayfield',
                            bind: {
                                fieldLabel: '{wordCount}'
                            }
                        }
                    ]
                })
            ]
        });

        me.callParent();
    },
    
    initEvents: function () {
        var me = this;
        me.callParent();
                
        me.bookCombo.on({
            select: 'selectBook'
        });

        me.chapterCombo.on({
            select: 'selectChapter'
        });
            
    }
});
