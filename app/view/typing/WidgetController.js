var index = 0,
    originalValue,
    correctValue,
    errorCount = 0;

Ext.define('TypinApp.view.typing.WidgetController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.typing-widget',

    isTyping: function (field , newValue) {
        var me = this,
            view = me.getView(),
            typedValue = newValue.split('');

        if(index == 0){
            originalValue = view.displayField.getValue();
        } else {
            view.displayField.setValue(originalValue);
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
                        view.textarea.setValue('');
                        me.selectChapter();
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
                        fieldLabel: '{errorCount}'
                    },
                    value: wordCount
                }
            ]
        }).show();
    },

    changeColor: function (typedValue, mistyped) {
        var me = this.getView(),
            valueLength = typedValue.length;

        if(mistyped){
            me.displayField.setValue(
                '<span style="color:green; border: 1px solid grey; border-radius: 3px;">' +
                originalValue.substring(0, correctValue.length) +
                '</span>' +
                '<span style="color:red">' + originalValue.substring(correctValue.length) + '</span>');
        } else {
            me.displayField.setValue(
                '<span style="color:green; border: 1px solid grey; border-radius: 3px;">' +
                originalValue.substring(0, valueLength) +
                '</span>' +
                originalValue.substring(valueLength));
        }

    },

    selectChapter: function (combo, record) {
        var me = this.getView();
        
        console.warn('form values: ', me.comboForm.getForm().getValues());

        me.textarea.enable();
        me.textarea.focus();
        me.displayField.applyBind({
            value: '{test}'
        });

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
