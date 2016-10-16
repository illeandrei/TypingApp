Ext.define('TypinApp.view.typing.WidgetController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.typing-widget',

    selectChapter: function (combo, record) {
        var me = this.getView();
        
        console.warn('form values: ', me.comboForm.getForm().getValues());

        // form.submit({
        //     url: '',
        //     method: 'GET',
        //     headers: {
        //         'Origin': 'http://localhost:8080'
        //     }
        // })

    }
    
});
