// navbar
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}
window.onscroll = function() { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 40) {
        document.getElementById("logo").style.width = "45px";
    } else {
        document.getElementById("logo").style.width = "120px";
    }
}
// navbar

//modal
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
var makeOrder = document.getElementById('freeze');
var orderForm = document.getElementsByClassName('order-form');
var successMsg = document.getElementsByClassName('success');

btn.onclick = function() {
    modal.classList.toggle('active');
    document.getElementById('myBtn').classList.toggle('active');
}

span.onclick = function() {
    modal.classList.remove('active');
    document.getElementById('myBtn').classList.remove('active');
}


makeOrder.onclick = function(e) {
    e.preventDefault();
    e.stopPropagation();
    orderForm[0].classList.add('hide');
    successMsg[0].classList.add('active');
}



//modal
//tabs
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace("active", "");
    }

    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}
//tabs


//timer
// для задания обратного отсчета до определенной даты укажите дату в формате:
// timeend= new Date(ГОД, МЕСЯЦ-1, ДЕНЬ);
// Для задания даты с точностью до времени укажите дату в формате:
// timeend= new Date(ГОД, МЕСЯЦ-1, ДЕНЬ, ЧАСЫ-1, МИНУТЫ);

timeend = new Date();
timeend = new Date(timeend.getYear() > 1900 ? (timeend.getYear() + 1) : (timeend.getYear() + 1900), 2, 23);

function time() {
    today = new Date();
    today = Math.floor((timeend - today) / 1000);
    tsec = today % 60;
    today = Math.floor(today / 60);
    if (tsec < 10) tsec = '0' + tsec;
    tmin = today % 60;
    today = Math.floor(today / 60);
    if (tmin < 10) tmin = '0' + tmin;
    thour = today % 24;
    today = Math.floor(today / 24);
    timestr = today + ":" + thour + ":" + tmin + ":" + tsec;
    document.getElementById('t').innerHTML = timestr;
    window.setTimeout("time()", 1000);
}
//timer




var multiItemSlider = (function() {

    function _isElementVisible(element) {
        var rect = element.getBoundingClientRect(),
            vWidth = window.innerWidth || doc.documentElement.clientWidth,
            vHeight = window.innerHeight || doc.documentElement.clientHeight,
            elemFromPoint = function(x, y) { return document.elementFromPoint(x, y) };
        if (rect.right < 0 || rect.bottom < 0 ||
            rect.left > vWidth || rect.top > vHeight)
            return false;
        return (
            element.contains(elemFromPoint(rect.left, rect.top)) ||
            element.contains(elemFromPoint(rect.right, rect.top)) ||
            element.contains(elemFromPoint(rect.right, rect.bottom)) ||
            element.contains(elemFromPoint(rect.left, rect.bottom))
        );
    }

    return function(selector, config) {
        var
            _mainElement = document.querySelector(selector),
            _sliderWrapper = _mainElement.querySelector('.slider__wrapper'),
            _sliderItems = _mainElement.querySelectorAll('.slider__item'),
            _sliderControls = _mainElement.querySelectorAll('.slider__control'),
            _sliderControlLeft = _mainElement.querySelector('.slider__control_left'),
            _sliderControlRight = _mainElement.querySelector('.slider__control_right'),
            _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width),
            _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width),
            _positionLeftItem = 0,
            _transform = 0,
            _step = _itemWidth / _wrapperWidth * 100,
            _items = [],
            _interval = 0,
            _html = _mainElement.innerHTML,
            _states = [
                { active: false, minWidth: 0, count: 1 },
                { active: false, minWidth: 980, count: 2 }
            ],
            _config = {
                isCycling: false,
                direction: 'right',
                interval: 5000,
                pause: true
            };

        for (var key in config) {
            if (key in _config) {
                _config[key] = config[key];
            }
        }

        _sliderItems.forEach(function(item, index) {
            _items.push({ item: item, position: index, transform: 0 });
        });

        var _setActive = function() {
            var _index = 0;
            var width = parseFloat(document.body.clientWidth);
            _states.forEach(function(item, index, arr) {
                _states[index].active = false;
                if (width >= _states[index].minWidth)
                    _index = index;
            });
            _states[_index].active = true;
        }

        var _getActive = function() {
            var _index;
            _states.forEach(function(item, index, arr) {
                if (_states[index].active) {
                    _index = index;
                }
            });
            return _index;
        }

        var position = {
            getItemMin: function() {
                var indexItem = 0;
                _items.forEach(function(item, index) {
                    if (item.position < _items[indexItem].position) {
                        indexItem = index;
                    }
                });
                return indexItem;
            },
            getItemMax: function() {
                var indexItem = 0;
                _items.forEach(function(item, index) {
                    if (item.position > _items[indexItem].position) {
                        indexItem = index;
                    }
                });
                return indexItem;
            },
            getMin: function() {
                return _items[position.getItemMin()].position;
            },
            getMax: function() {
                return _items[position.getItemMax()].position;
            }
        }

        var _transformItem = function(direction) {
            var nextItem;
            if (!_isElementVisible(_mainElement)) {
                return;
            }
            if (direction === 'right') {
                _positionLeftItem++;
                if ((_positionLeftItem + _wrapperWidth / _itemWidth - 1) > position.getMax()) {
                    nextItem = position.getItemMin();
                    _items[nextItem].position = position.getMax() + 1;
                    _items[nextItem].transform += _items.length * 100;
                    _items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
                }
                _transform -= _step;
            }
            if (direction === 'left') {
                _positionLeftItem--;
                if (_positionLeftItem < position.getMin()) {
                    nextItem = position.getItemMax();
                    _items[nextItem].position = position.getMin() - 1;
                    _items[nextItem].transform -= _items.length * 100;
                    _items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
                }
                _transform += _step;
            }
            _sliderWrapper.style.transform = 'translateX(' + _transform + '%)';
        }

        var _cycle = function(direction) {
            if (!_config.isCycling) {
                return;
            }
            _interval = setInterval(function() {
                _transformItem(direction);
            }, _config.interval);
        }

        var _controlClick = function(e) {
            if (e.target.classList.contains('slider__control')) {
                e.preventDefault();
                var direction = e.target.classList.contains('slider__control_right') ? 'right' : 'left';
                _transformItem(direction);
                clearInterval(_interval);
                _cycle(_config.direction);
            }
        };

        var _handleVisibilityChange = function() {
            if (document.visibilityState === "hidden") {
                clearInterval(_interval);
            } else {
                clearInterval(_interval);
                _cycle(_config.direction);
            }
        }

        var _refresh = function() {
            clearInterval(_interval);
            _mainElement.innerHTML = _html;
            _sliderWrapper = _mainElement.querySelector('.slider__wrapper');
            _sliderItems = _mainElement.querySelectorAll('.slider__item');
            _sliderControls = _mainElement.querySelectorAll('.slider__control');
            _sliderControlLeft = _mainElement.querySelector('.slider__control_left');
            _sliderControlRight = _mainElement.querySelector('.slider__control_right');
            _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width);
            _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width);
            _positionLeftItem = 0;
            _transform = 0;
            _step = _itemWidth / _wrapperWidth * 100;
            _items = [];
            _sliderItems.forEach(function(item, index) {
                _items.push({ item: item, position: index, transform: 0 });
            });
        }

        var _setUpListeners = function() {
            _mainElement.addEventListener('click', _controlClick);
            if (_config.pause && _config.isCycling) {
                _mainElement.addEventListener('mouseenter', function() {
                    clearInterval(_interval);
                });
                _mainElement.addEventListener('mouseleave', function() {
                    clearInterval(_interval);
                    _cycle(_config.direction);
                });
            }
            document.addEventListener('visibilitychange', _handleVisibilityChange, false);
            window.addEventListener('resize', function() {
                var
                    _index = 0,
                    width = parseFloat(document.body.clientWidth);
                _states.forEach(function(item, index, arr) {
                    if (width >= _states[index].minWidth)
                        _index = index;
                });
                if (_index !== _getActive()) {
                    _setActive();
                    _refresh();
                }
            });
        }

        _setUpListeners();
        if (document.visibilityState === "visible") {
            _cycle(_config.direction);
        }
        _setActive();

        return {
            right: function() {
                _transformItem('right');
            },
            left: function() {
                _transformItem('left');
            },
            stop: function() {
                _config.isCycling = false;
                clearInterval(_interval);
            },
            cycle: function() {
                _config.isCycling = true;
                clearInterval(_interval);
                _cycle();
            }
        }

    }
}());

var slider = multiItemSlider('.slider', {
    isCycling: true
})