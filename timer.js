(function(){
    var v = "1.7.0";

    if (window.jQuery === undefined || window.jQuery.fn.jquery < v) {
        var done = false;
        var script = document.createElement("script");
        script.src = "https://ajax.googleapis.com/ajax/libs/jquery/" + v + "/jquery.min.js";
        script.onload = script.onreadystatechange = function(){
            if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
                done = true;
                initMyBookmarklet();
            }
        };
        document.getElementsByTagName("head")[0].appendChild(script);
    } else {
        initMyBookmarklet();
    }

    function initMyBookmarklet() {
        (window.myBookmarklet = function() {
            jQuery.noConflict();
            (function( $ ) {
                $(function() {
                    var timerBodyStyles = {
                        'background-color': '#000',
                        cursor: 'move',
                        display: 'inline-block',
                        position: 'fixed',
                        padding: '0 5px',
                        'z-index': 1000000000,
                        top: 0,
                        left: '50%',
                        'line-height': 1
                    };
                    var timerStyles = {
                        color: '#9693CB',
                        'font-family': 'Cambria',
                        'font-size': '36px',
                        'font-weight': 'bold',
                        'font-style': 'italic'
                    };
                    var closeStyles = {
                        color: '#ff4242',
                        float: 'right',
                        'z-index': 1000000001,
                        cursor: 'pointer',
                        'padding-left': '2px',
                        'font-weight': 'bold',
                        'font-family': 'sans-serif'
                    }

                    var timerHtml = '<div id="kaz-timer-body">'
                        + '<span class="kaz-close">&times;</span>'
                        + '<span class="kaz-timer">0:00:00</span></div>';

                    $('body').prepend(timerHtml);
                    $('#kaz-timer-body').css(timerBodyStyles);
                    $('.kaz-close').css(closeStyles);
                    $('.kaz-timer').css(timerStyles);

                    $('.kaz-close').click(function() {
                        $(this).parent().remove();
                    });

                    function handle_mousedown(e) {
                        window.my_dragging = {};
                        my_dragging.pageX0 = e.pageX;
                        my_dragging.pageY0 = e.pageY;
                        my_dragging.elem = this;
                        my_dragging.offset0 = $(this).offset();
                        function handle_dragging(e){
                            var left = my_dragging.offset0.left + (e.pageX - my_dragging.pageX0);
                            var top = my_dragging.offset0.top + (e.pageY - my_dragging.pageY0);
                            $(my_dragging.elem)
                                .offset({top: top, left: left});
                        }
                        function handle_mouseup(e) {
                            $('body')
                                .off('mousemove', handle_dragging)
                                .off('mouseup', handle_mouseup);
                        }
                        $('body')
                            .on('mouseup', handle_mouseup)
                            .on('mousemove', handle_dragging);
                    }
                    $('#kaz-timer-body')
                        .mousedown(handle_mousedown);
                });
            })(jQuery);
        })();
    }
})();
