var SINGLE_LINE = false;

var canvas = new fabric.Canvas('canvas');

// custom input area
if (SINGLE_LINE) {
    var $itext = $('<input/>').attr('type', 'text').addClass('itext');
}
else {
    var $itext = $('<textarea/>').addClass('itext');
}

var text = 'enter multi-byte text here 日本語';
var itext = new fabric.IText(text, {
    left: 100,
    top: 100,
    fontSize: 20,
    fill: '#000'
})
.on('editing:entered', function(e) {
    var obj = this;
    if (SINGLE_LINE) {
        var keyDownCode = 0;
    }

    canvas.remove(obj);

    // show input area
    $itext.css({
        left: obj.left,
        top: obj.top,
        'line-height': obj.lineHeight,
        'font-family': obj.fontFamily,
        'font-size': Math.floor(obj.fontSize * Math.min(obj.scaleX, obj.scaleY)) + 'px',
        'font-weight': obj.fontWeight,
        'font-style': obj.fontStyle,
        color: obj.fill
    })
    .val(obj.text)
    .appendTo($(canvas.wrapperEl).closest('.canvas-wrapper'));

    // text submit event
    if (SINGLE_LINE) {
        // submit text by ENTER key
        $itext.on('keydown', function(e) {
            // save the key code of a pressed key while kanji conversion (it differs from the code for keyup)
            keyDownCode = e.which;
        })
        .on('keyup', function(e) {
            if (e.keyCode == 13 && e.which == keyDownCode) {
                obj.exitEditing();
                obj.set('text', $(this).val());
                $(this).remove();
                canvas.add(obj);
                canvas.renderAll();
            }
        });
    }
    else {
        // submit text by focusout
        $itext.on('focusout', function(e) {
            obj.exitEditing();
            obj.set('text', $(this).val());
            $(this).remove();
            canvas.add(obj);
            canvas.renderAll();
        });
    }

    // focus on text
    setTimeout(function() {
        $itext.select();
    }, 1);
});
canvas.add(itext);
canvas.setActiveObject(itext);
//itext.selectAll();
//itext.enterEditing();
