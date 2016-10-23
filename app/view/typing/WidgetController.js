var index = 0,
    errorCount = 0,
    originalValue,
    correctValue;

Ext.define('TypinApp.view.typing.WidgetController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.typing-widget',

    isTyping: function (field , newValue) {
        var me = this,
            view = me.getView();

        me.togglePanel(false);

        //TODO: remove span if value is empty
        /*if(newValue == ''){
            console.warn('new value now: ', newValue);
            me.resetValue();
        }*/

        if(index == 0){
            originalValue = view.displayField.getValue();
        } else {
            me.resetValue();
        }

        if(originalValue.substring(0, newValue.length) == newValue.substring(0)){
            index++;
            correctValue = newValue;
            me.changeColor(newValue, false);
        } else {
            errorCount++;
            me.changeColor(newValue, true)
        }

        if(newValue.length == originalValue.length){
            //TODO: trigger on some other condition
            me.showResults();
        }
    },

    resetValue: function () {
        var view = this.getView();
        view.displayField.setValue(originalValue);
    },

    restartApp: function () {
        var me           = this,
            view         = me.getView(),
            chapterCombo = Ext.getCmp('chapterCombo'),
            textarea     = view.textarea;

        //TODO: see if my 'originalValue' can be replaced
        view.resultWindow.close();
        textarea.setValue(textarea.originalValue);
        me.resetValue();
        me.togglePanel(true);
        chapterCombo.focus(null, 500);
    },

    wordsMinute: function () {
        return originalValue
            .split(/(\s+)/)
            .filter(function (word) {
                return word != ' ';
            })
            .length;
    },

    showResults: function () {
        var me = this,
            view = this.getView();

        // var wordCount = me.wordsMinute();

        //TODO: restart app on Enter
        view.resultWindow.show();
        view.resultWindow.initKeyMap();
    },

    changeColor: function (newValue, mistyped) {
        var view = this.getView(),
            valueLength = newValue.length;

        if(mistyped){
            view.displayField.setValue(
                    '<span class="change-green">' +
                        originalValue.substring(0, correctValue.length) +
                    '</span>' +
                    '<span class="change-red">' +
                        originalValue.substring(correctValue.length) +
                    '</span>'
            );
        } else {
            view.displayField.setValue(
                    '<span class="change-green">' +
                        originalValue.substring(0, valueLength) +
                    '</span>' +
                        originalValue.substring(valueLength)
            );
        }

    },

    togglePanel: function (show) {
        var me = this.getView(),
            panel = Ext.getCmp('northPanel');

        if(show){
            panel.expand();
        } else {
            panel.collapse();
        }
    },

    selectChapter: function (combo, record) {
        var me = this,
            view = this.getView();

        me.togglePanel(false);

        Ext.Function.defer(function () {
            view.textarea.enable();
            view.textarea.focus();
            view.displayField.applyBind({
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
