//TODO load from Matei

Ext.define('TypinApp.store.Books', {
    extend: 'Ext.data.Store',

    alias: 'store.books',

    fields: [
        {name: 'id', type: 'int'},
        'name',
        {name: 'chapters', type: 'int'},
        'lastLoaded'
    ],

    data: [
        [1,  "Genesa", 50],
        [2,  "Exodul", 40],
        [3,  "Leviticul", 27],
        [4,  "Numeri", 36],
        [5,  "Deuteronomul", 34],
        [6,  "Iosua", 24],
        [7,  "Judec\u0103tori", 21],
        [8,  "Rut", 4],
        [9,  "1 Samuel", 31],
        [10, "2 Samuel", 24],
        [11, "1 \u00cemp\u0103ra\u0163i", 22],
        [12, "2 \u00cemp\u0103ra\u0163i", 25],
        [13, "1 Cronici", 29],
        [14, "2 Cronici", 36],
        [15, "Ezra", 10],
        [16, "Neemia", 13],
        [17, "Estera", 10],
        [18, "Iov", 42],
        [19, "Psalmi", 150],
        [20, "Proverbe", 31],
        [21, "Eclesiastul", 12],
        [22, "C\u00e2ntarea c\u00e2nt\u0103rilor", 8],
        [23, "Isaia", 66],
        [24, "Ieremia", 52],
        [25, "Pl\u00e2ngerile lui Ieremia", 5],
        [26, "Ezechiel", 48],
        [27, "Daniel", 12],
        [28, "Osea", 14],
        [29, "Ioel", 3],
        [30, "Amos", 9],
        [31, "Obadia", 1],
        [32, "Iona", 4],
        [33, "Mica", 7],
        [34, "Naum", 3],
        [35, "Habacuc", 3],
        [36, "\u0162efania", 3],
        [37, "Hagai", 2],
        [38, "Zaharia", 14],
        [39, "Maleahi", 4],
        [40, "Matei", 28],
        [41, "Marcu", 16],
        [42, "Luca", 24],
        [43, "Ioan", 21],
        [44, "Faptele Apostolilor", 28],
        [45, "Romani", 16],
        [46, "1 Corinteni", 16],
        [47, "2 Corinteni", 13],
        [48, "Galateni", 6],
        [49, "Efeseni", 6],
        [50, "Filipeni", 4],
        [51, "Coloseni", 4],
        [52, "1 Tesaloniceni", 5],
        [53, "2 Tesaloniceni", 3],
        [54, "1 Timotei", 6],
        [55, "2 Timotei", 4],
        [56, "Tit", 3],
        [57, "Filimon", 1],
        [58, "Evrei", 13],
        [59, "Iacov", 5],
        [60, "1 Petru", 5],
        [61, "2 Petru", 3],
        [62, "1 Ioan", 5],
        [63, "2 Ioan", 1],
        [64, "3 Ioan", 1],
        [65, "Iuda", 1],
        [66, "Apocalipsa", 22]
    ]

});