var index = 0,
    originalValue;

Ext.define('TypinApp.view.typing.WidgetController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.typing-widget',

    isTyping: function (field , newValue) {
        var me = this.getView(),
            typedValue = newValue.split(''),
            pos = typedValue.length - 1;

        if(index == 0){
            originalValue = me.displayField.getValue();
            console.warn('original value: ', originalValue);
        } else {
            me.displayField.setValue(originalValue);
        }

        var displayValue = me.displayField.getValue(),
            splitValue = displayValue.split('');

        if(splitValue[pos] == typedValue[pos]){
            index++;
            this.changeColor(typedValue, true);
        } else {
            this.changeColor(typedValue, false)
        }
    },

    changeColor: function (typedValue, correct) {
        var me = this.getView(),
            correctValue = typedValue.length;

        if(correct){
            me.displayField.setValue(
                '<span style="color:green; border: 1px solid grey; border-radius: 3px;">' +
                originalValue.substring(0, correctValue) +
                '</span>' +
                originalValue.substring(correctValue));
        } else {
            me.displayField.setValue(
                '<span style="color:green; border: 1px solid grey; border-radius: 3px;">' +
                originalValue.substring(0, correctValue - 1) +
                '</span>' +
                '<span style="color:red">' + originalValue.substring(correctValue - 1) + '</span>');
        }
    },

    selectChapter: function (combo, record) {
        var me = this.getView();
        
        console.warn('form values: ', me.comboForm.getForm().getValues());

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
