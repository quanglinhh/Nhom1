/**
 * Theme Settings v1.0.0
 * Copyright 2019 Kri8thm
 * Licensed under MIT
 *------------------------------------*/

;(function ($, window, document, undefined) {

    function Theme(element, options) {

        this.$body = $('body');

        /*
         * Theme settings options
         */
        this.options = $.extend({}, Theme.Defaults, options);

        /*
         * Options to store in cookies
         */
        this.cookiesOptions = {
            'themeDark': this.options.darkTheme,
            'header': this.options.header,
            'sidebar': this.options.sidebar,
            'player': this.options.player,
        };

        /*
         * Get cookies of app and set on options
         */
        if ($.cookie('themeSetting') != null && options === false) {
            this.cookiesOptions = JSON.parse($.cookie('themeSetting'));
            this.options.darkTheme = this.cookiesOptions.themeDark;
            this.options.header = this.cookiesOptions.header;
            this.options.sidebar = this.cookiesOptions.sidebar;
            this.options.player = this.cookiesOptions.player;
        }

        /*
         * Count for checkbox
         */
        this.optionList = [
            {
                'text': 'Dark Theme',
                'value': this.options.darkTheme
            }
        ];

        var pageName = window.location.pathname.split('/').pop().split('.')[0];
        var pages = ['index', 'error'];
        var isSettingNotVisible = pages.includes(pageName);
        if (pageName && !isSettingNotVisible) {
            this.initialize();
        }
    }

    /**
     * Default options for the theme.
     * @public
     */
    Theme.Defaults = {
        darkTheme: false,

        header: 0,
        sidebar: 0,
        player: 0,
        themeClass: ['primary', 'danger', 'success', 'warning', 'info', 'brand', 'dark'],

        settingsButton: 'button',
        settingsButtonId: 'customSettings',
        settingsButtonClass: 'btn btn-pill btn-air btn-brand btn-icon-only',
        settingIcon: '<i class="ion-md-settings"></i>',

        itemElement: 'div',
        wrapperId: 'settingsWrapper',

        listClass: 'custom-list',
        listItemClass: 'custom-list--item'
    };

    /**
     * Initializes the theme settings.
     * @protected
     */
    Theme.prototype.initialize = function () {
        var $header = $('#header');
        var $sidebar = $('#sidebar');
        var $player = $('#audioPlayer');

        if (this.options.darkTheme) {
            this.$body.addClass('theme-dark');
        }
        $header.addClass('bg-' + this.options.themeClass[this.options.header]);
        $sidebar.addClass('sidebar-' + this.options.themeClass[this.options.sidebar]);
        $player.addClass('player-' + this.options.themeClass[this.options.player]);
        this.settingsButtonElement();
        this.skinClicks();
    };

    /**
     * Add theme settings button.
     * @protected
     */
    Theme.prototype.settingsButtonElement = function () {
        var attributes = {
            'type': 'button',
            'id': this.options.settingsButtonId,
            'className': this.options.settingsButtonClass
        };

        var btnElement = document.createElement(this.options.settingsButton);
        Object.assign(btnElement, attributes);
        btnElement.innerHTML = this.options.settingIcon;
        this.$body.append(btnElement);
        this.themeOptions();
    };

    /**
     * Add theme settings options.
     * @protected
     */
    Theme.prototype.themeOptions = function () {
        var wrapperElement = document.createElement(this.options.itemElement);
        wrapperElement.setAttribute('id', this.options.wrapperId);

        var header = '<header>' +
            '<span class="title-bold font-md text-uppercase">Theme Settings</span>' +
            '<a href="javascript:void(0)" class="ml-auto"><i class="ion-md-close"></i></a>' +
            '</header>';

        var body = '<div class="theme-settings-body"><ul class="' + this.options.listClass + '">';

        for (var i = 0; i < this.optionList.length; i++) {
            var checked = this.optionList[i].value ? 'checked' : '';

            body += '<li class="' + this.options.listItemClass + '">' +
                '<label for="to' + i + '">' + this.optionList[i].text + '</label>' +
                '<div class="custom-control custom-checkbox ml-auto">' +
                '<input type="checkbox" class="custom-control-input" id="to' + i + '" ' + checked + '>' +
                '<label class="custom-control-label" for="to' + i + '"></label>' +
                '</div>' +
                '</li>';
        }

        body += '<li class="custom-list-group--item-separator"></li>' +
            '<li class="custom-list-group--item custom-list-group--item-header">Header Colors</li>' +
            '<li class="' + this.options.listItemClass + '">';

        for (var j = 0; j < this.options.themeClass.length; j++) {
            var activeClass = j === this.options.header ? 'active' : '';
            body += '<a href="javascript:void(0);" class="header-skin bg-' + this.options.themeClass[j] + ' ' + activeClass + '" ' +
                'data-header-skin="' + j + '"></a>';
        }

        body += '</li>';

        body += '<li class="custom-list-group--item-separator"></li>' +
            '<li class="custom-list-group--item custom-list-group--item-header">Sidebar Colors</li>' +
            '<li class="' + this.options.listItemClass + '">';

        for (var k = 0; k < this.options.themeClass.length; k++) {
            var activeClassSidebar = k === this.options.sidebar ? 'active' : '';
            body += '<a href="javascript:void(0);" class="sidebar-skin bg-' + this.options.themeClass[k] + ' ' + activeClassSidebar + '" ' +
                'data-sidebar-skin="' + k + '"></a>';
        }

        body += '</li>';

        body += '<li class="custom-list-group--item-separator"></li>' +
            '<li class="custom-list-group--item custom-list-group--item-header">Player Colors</li>' +
            '<li class="' + this.options.listItemClass + '">';

        for (var m = 0; m < this.options.themeClass.length; m++) {
            var activeClassPlayer = m === this.options.player ? 'active' : '';
            body += '<a href="javascript:void(0);" class="player-skin bg-' + this.options.themeClass[m] + ' ' + activeClassPlayer + '" ' +
                'data-player-skin="' + m + '"></a>';
        }

        body += '</li>';

        body += '</ul></div>';

        wrapperElement.innerHTML = header + body;
        this.$body.append(wrapperElement);
    };

    /**
     * App click events.
     * @protected
     */
    Theme.prototype.skinClicks = function () {
        var _this = this;
        var settings = '#' + _this.options.settingsButtonId;
        var $wrapper = $('#' + _this.options.wrapperId);
        var $header = $('#header');
        var $sidebar = $('#sidebar');
        var $player = $('#audioPlayer');
        var $headerSkin = $('.header-skin');
        var $sidebarSkin = $('.sidebar-skin');
        var $playerSkin = $('.player-skin');

        this.$body.on('click', '#to0', function () {
            var $this = $(this);
            _this.cookiesOptions.themeDark = $this[0].checked;
            _this.$body.toggleClass('theme-dark');
            _this.setCookies();
        });

        this.$body.on('click', '.header-skin', function () {
            var $this = $(this);
            var headerSkin = $this.data('header-skin');
            _this.cookiesOptions.header = headerSkin;
            $header.removeClass();
            $header.addClass('bg-' + _this.options.themeClass[headerSkin]);
            $headerSkin.removeClass('active');
            $this.addClass('active');
            _this.setCookies();
        });

        this.$body.on('click', '.sidebar-skin', function () {
            var $this = $(this);
            var sidebarSkin = $this.data('sidebar-skin');
            _this.cookiesOptions.sidebar = sidebarSkin;
            $sidebar.removeClass();
            $sidebar.addClass('sidebar-' + _this.options.themeClass[sidebarSkin]);
            $sidebarSkin.removeClass('active');
            $this.addClass('active');
            _this.setCookies();
        });

        this.$body.on('click', '.player-skin', function () {
            var $this = $(this);
            var playerSkin = $this.data('player-skin');
            _this.cookiesOptions.player = playerSkin;
            $player.removeClass();
            $player.addClass('player-' + _this.options.themeClass[playerSkin]);
            $playerSkin.removeClass('active');
            $this.addClass('active');
            _this.setCookies();
        });

        this.$body.on('click', settings, function () {
            $wrapper.toggleClass('open-settings');
        });

        this.$body.on('click', 'header a', function () {
            $wrapper.removeClass('open-settings');
        });
    };

    /**
     * Set app cookies.
     * @protected
     */
    Theme.prototype.setCookies = function () {
        $.cookie('themeSetting', JSON.stringify(this.cookiesOptions), {expires: 7, path: '/'});
    };

    /**
     * The jQuery Plugin for the Theme Setting
     * @public
     */
    $.fn.themeSettings = function (option) {
        return this.each(function () {
            var $this = $(this);
            var data = new Theme(this, typeof option === 'object' && option);
        });
    };

    /**
     * The constructor for the jQuery Plugin
     * @public
     */
    $.fn.themeSettings.Constructor = Theme;

})(jQuery, window, document);