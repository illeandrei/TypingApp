var index = 0,
    nextVerse = 1,
    errorCount = 0,
    originalValue,
    correctValue,
    verses = [];

Ext.define('TypinApp.view.typing.WidgetController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.typing-widget',

    selectBook: function (combo, record) {
        var me = this,
            view = me.getView(),
            arr = [];

        for(var i=1; i<=record.get('chapters'); i++){
            arr.push([i]);
        }

        view.chapterCombo.getStore().loadRawData(arr);
        view.chapterCombo.focus();
    },

    selectChapter: function (combo, record) {
        var me = this,
            view = this.getView(),
            params = view.comboForm.getForm().getValues();


        index = 0;
        nextVerse = 1;
        errorCount = 0;
        verses = [];
        view.textarea.setValue();
        me.togglePanel(false);

        Ext.apply(params, {
            action: 'get_chapter',
            references: true,
            titles: true
        });

        var store = new Ext.data.Store({
            proxy: {
                type: 'ajax',
                url: './servlets/chapters.php',
                extraParams: params
            }
        });

        store.load(function (records) {
            me.manageData(records);
        });
    },

    manageData: function (records) {
        var me = this,
            view = me.getView(),
            data = records[0].get('data'),
            accents = view.accentsCheckBox.getValue();

        data.forEach(function (array) {
            if(accents){
                verses.push(array[3]);
            } else {
                verses.push(me.removeAccents(array[3]))
            }
        });

        Ext.Function.defer(function () {
            view.textarea.enable();
            view.textarea.focus();
            originalValue = verses[0];
            view.displayField.setValue(originalValue);
            view.inactiveDisplay.setValue(verses[1]);
        }, 500);
    },

    removeAccents: function(str) {
        var convMap = {
            "ă" : "a",
            "â" : "a",
            "ş" : "s",
            "Ş" : "S",
            "ţ" : "t",
            "Ț" : "T",
            "î" : "i",
            "Î" : "I"
        };
        for (var i in convMap) {
            str = str.replace(new RegExp(i, "g"), convMap[i]);
        }
        return str;
    },

    isTyping: function (field , newValue) {
        var me = this,
            view = me.getView();

        me.togglePanel(false);

        //TODO: remove span if value is empty

        if(index == 0){
            originalValue = verses[0];
            me.startTimer();
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
            me.appendText();
        }
    },

    startTimer: function () {
        var me = this,
            view = me.getView(),
            minute = 60;

        console.warn('start timer!: ');
        Ext.Function.defer(function () {
            me.showResults();
        }, minute * 1000);

        Ext.interval(function () {
            if(minute < 1){
                return;
            }
            view.stopwatch.setValue('<h1>' + --minute + '</h1>');
        }, 1000)
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

    appendText: function () {
        var view = this.getView(),
            activeValue = originalValue.concat(" " + verses[nextVerse]);

        view.displayField.setValue(activeValue);
        view.inactiveDisplay.setValue(verses[nextVerse + 1]);
        nextVerse++;
        originalValue = activeValue;
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

        view.resultWindow.hide();
        textarea.setValue();
        me.togglePanel(true);
        chapterCombo.focus(null, 500);
    },

    getWordsMinute: function () {
        return correctValue
            .split(/(\s+)/)
            .filter(function (word) {
                return word != ' ';
            })
            .length;
    },

    showResults: function () {
        var me = this,
            view = this.getView();

        console.warn('wpm: ', me.getWordsMinute());

        // var wordCount = me.wordsMinute();
        // view.resultForm.getForm().findField('mistyped').setValue(errorCount);
        view.resultWindow.show();
    },

    togglePanel: function (show) {
        var panel = Ext.getCmp('northPanel');

        if(show){
            panel.expand();
        } else {
            panel.collapse();
        }
    }
    
});
