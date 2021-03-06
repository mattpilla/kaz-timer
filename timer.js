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
            (function($) {
                var colors = {
                    default: '#9693CB',
                    success: '#58F58B',
                    danger: '#ff4242'
                }
                var timerBodyStyles = {
                    'background-color': '#000',
                    cursor: 'move',
                    display: 'inline-block',
                    position: 'fixed',
                    padding: '0 5px',
                    'z-index': 1000000000,
                    top: 0,
                    left: '50%',
                    'line-height': 1,
                    'user-select': 'none',
                    '-ms-user-select': 'none',
                    '-moz-user-select': 'none',
                    '-webkit-user-select': 'none'
                };
                var timerStyles = {
                    color: colors.default,
                    'font-family': 'Cambria',
                    'font-size': '36px',
                    'font-weight': 'bold',
                    'font-style': 'italic'
                };
                var closeStyles = {
                    color: colors.danger,
                    float: 'right',
                    'z-index': 1000000001,
                    cursor: 'pointer',
                    'padding-left': '2px',
                    'font-weight': 'bold',
                    'font-family': 'sans-serif',
                    'font-size': '14px'
                };
                var buttonStyles = {
                    'text-align': 'center',
                    'font-family': 'sans-serif',
                    'font-size': '18px',
                    cursor: 'default'
                };
                var startStyles = {
                    color: colors.success,
                    padding: '0 5px',
                    cursor: 'pointer',
                    'margin-right': '10px'
                };
                var stopStyles = {
                    color: colors.danger,
                    padding: '0 5px',
                    cursor: 'pointer',
                    'margin-right': '10px'
                };
                var resetStyles = {
                    color: colors.default,
                    padding: '0 5px',
                    cursor: 'pointer'
                }

                var timerHtml = '<div id="kaz-timer-body">'
                    + '<span id="kaz-close">&times;</span>'
                    + '<span id="kaz-timer">0:00:00</span>'
                    + '<div id="kaz-buttons">'
                    + '<span id="kaz-start">&#9658;</span>'
                    + '<span id="kaz-stop">&#10074;&#10074;</span>'
                    + '<span id="kaz-reset">&#8634;</span>'
                    + '</div>'
                    + '</div>';

                $('body').prepend(timerHtml);
                $('#kaz-timer-body').css(timerBodyStyles);
                $('#kaz-close').css(closeStyles);
                $('#kaz-timer').css(timerStyles);
                $('#kaz-buttons').css(buttonStyles);
                $('#kaz-start').css(startStyles);
                $('#kaz-stop').css(stopStyles);
                $('#kaz-reset').css(resetStyles);

                $('#kaz-close').click(function() {
                    $(this).parent().remove();
                });

                $('#kaz-start').click(function() {
                    $(this).parent().siblings('#kaz-timer').css('color', colors.success);
                });

                $('#kaz-stop').click(function() {
                    $(this).parent().siblings('#kaz-timer').css('color', colors.danger);
                });

                $('#kaz-reset').click(function() {
                    $(this).parent().siblings('#kaz-timer').css('color', colors.default);
                })

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
            })(jQuery);
        })();
    }
})();
