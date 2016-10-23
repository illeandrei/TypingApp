var index = 0,
    originalValue,
    correctValue,
    errorCount = 0;

Ext.define('TypinApp.view.typing.WidgetController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.typing-widget',

    isTyping: function (field , newValue) {
        var me = this,
            view = me.getView();

        //TODO: remove span if value is empty
        /*if(newValue == ''){
            view.displayField.setValue(originalValue);
            me.resetValeu();
        }*/

        var typedValue = newValue.split('');

        if(index == 0){
            originalValue = view.displayField.getValue();
        } else {
            // view.displayField.setValue(originalValue);
            me.resetValue();
        }

        if(originalValue.substring(0, typedValue.length) == newValue.substring(0)){
            index++;
            correctValue = typedValue;
            me.changeColor(typedValue, false);
        } else {
            errorCount++;
            me.changeColor(typedValue, true)
        }

        if(newValue.length == originalValue.length){
            //TODO: trigger on some other condition
            me.showResults(me.wordsMinute());
        }
    },

    resetValue: function () {
        var view = this.getView();
        view.displayField.setValue(originalValue);
    },

    wordsMinute: function () {
        return originalValue
            .split(/(\s+)/)
            .filter(function (word) {
                return word != ' ';
            })
            .length;
    },

    showResults: function (wordCount) {
        var me = this,
            view = this.getView();

        view.resultWindow = new Ext.window.Window({
            modal: true,
            width: 400,
            height: 200,
            bind: {
                title: '{resultWindowTitle}'
            },
            bbar: [
                '->',
                {
                    xtyep: 'button',
                    text: 'OK',
                    handler: function () {
                        view.resultWindow.close();
                        me.restart();
                    }
                }
            ],
            items: [
                {
                    xtype: 'displayfield',
                    bind: {
                        fieldLabel: '{errorCount}'
                    },
                    value: errorCount
                },{
                    xtype: 'displayfield',
                    bind: {
                        fieldLabel: '{wordCount}'
                    },
                    value: wordCount
                }
            ]
        }).show();
    },

    changeColor: function (typedValue, mistyped) {
        var view = this.getView(),
            valueLength = typedValue.length;

        if(mistyped){
            view.displayField.setValue(
                '<span style="color:green; border: 1px solid grey; border-radius: 3px;">' +
                originalValue.substring(0, correctValue.length) +
                '</span>' +
                '<span style="color:red">' + originalValue.substring(correctValue.length) + '</span>');
        } else {
            view.displayField.setValue(
                '<span style="color:green; border: 1px solid grey; border-radius: 3px;">' +
                originalValue.substring(0, valueLength) +
                '</span>' +
                originalValue.substring(valueLength));
        }

    },

    restart: function () {
        var me           = this,
            view         = me.getView(),
            panel        = Ext.getCmp('NorthPanel'),
            chapterCombo = Ext.getCmp('chapterCombo'),
            textarea     = view.textarea;

        //TODO: see if my 'originalValue' can be replaced
        textarea.setValue(textarea.originalValue);
        me.resetValue();
        panel.expand();
        chapterCombo.focus(null, 500);
    },

    selectChapter: function (combo, record) {
        var me = this.getView(),
            panel = Ext.getCmp('NorthPanel');

        panel.collapse();

        Ext.Function.defer(function () {
            me.textarea.enable();
            me.textarea.focus();
            me.displayField.applyBind({
                value: '{test}'
            });
        }, 500);

        /*Ext.Ajax.request({
            url: 'resources/Mocks',
            success: function (response) {
                console.warn('success: ', response); 
            },
            failure: function (response) {
                console.warn('failure: ', response);
            }
        });*/

        // form.submit({
        //     url: '',
        //     method: 'GET',
        //     headers: {
        //         'Origin': 'http://localhost:8080'
        //     }
        // })

    }
    
});
