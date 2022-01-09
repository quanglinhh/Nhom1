"use strict";

//=> Class Definition
var AudioPlayer = AudioPlayer || {};

$(function () {
    AudioPlayer = {
        //=> Initialize function to call all functions of the class
        init: function () {
            if ($('#audioPlayer').length === 0) {
                return false;
            }
            AudioPlayer.initAudioPlayer();
            AudioPlayer.volumeDropdownClick();
            AudioPlayer.volumeIconClick();
            AudioPlayer.addAudioInPlayer();
        },

        //=> Initialize audio player
        initAudioPlayer: function () {
            Amplitude.init({
                "songs": [
                    {
                        "name": "I Love You Mummy",
                        "artist": "Arebica Luna",
                        "album": "Mummy",
                        "url": "../assets/audio/ringtone-1.mp3",
                        "cover_art_url": "../assets/images/cover/small/1.jpg"
                    }
                ],
                "playlists": {
                    "special": {
                        songs: [
                            {
                                "name": "I Love You Mummy",
                                "artist": "Arebica Luna",
                                "album": "Mummy",
                                "url": "../assets/audio/ringtone-1.mp3",
                                "cover_art_url": "../assets/images/cover/small/1.jpg"
                            },
                            {
                                "name": "Shack Your Butty",
                                "artist": "Gerrina Linda",
                                "album": "Hot Shot",
                                "url": "../assets/audio/ringtone-2.mp3",
                                "cover_art_url": "../assets/images/cover/small/2.jpg"
                            },
                            {
                                "name": "Do It Your Way(Female)",
                                "artist": "Zunira Willy & Nutty Nina",
                                "album": "Own Way",
                                "url": "../assets/audio/ringtone-3.mp3",
                                "cover_art_url": "../assets/images/cover/small/3.jpg"
                            },
                            {
                                "name": "Say Yes",
                                "artist": "Johnny Marro",
                                "album": "Say Yes",
                                "url": "../assets/audio/ringtone-4.mp3",
                                "cover_art_url": "../assets/images/cover/small/4.jpg"
                            },
                            {
                                "name": "Where Is Your Letter",
                                "artist": "Jina Moore & Lenisa Gory",
                                "album": "Letter",
                                "url": "../assets/audio/ringtone-5.mp3",
                                "cover_art_url": "../assets/images/cover/small/5.jpg"
                            },
                            {
                                "name": "Hey Not Me",
                                "artist": "Rasomi Pelina",
                                "album": "Find Soul",
                                "url": "../assets/audio/ringtone-6.mp3",
                                "cover_art_url": "../assets/images/cover/small/6.jpg"
                            },
                            {
                                "name": "Deep Inside",
                                "artist": "Pimila Holliwy",
                                "album": "Deep Inside",
                                "url": "../assets/audio/ringtone-7.mp3",
                                "cover_art_url": "../assets/images/cover/small/7.jpg"
                            }
                        ]
                    }
                }
            });
        },

        //=> Volume dropdown click
        volumeDropdownClick: function () {
            $(document).on('click', '.volume-dropdown-menu', function (e) {
                e.stopPropagation();
            });
        },

        //=> Change volume icon in audio player from it's range
        volumeIconClick: function () {
            var $audioInput = $('.audio-volume input[type="range"]');
            var $audioButton = $('.audio-volume .btn');

            $audioInput.on('change', function () {
                var $this = $(this);
                var value = parseInt($this.val(), 10);

                if (value === 0) {
                    $audioButton.html('<i class="ion-md-volume-mute"></i>');
                } else if (value > 0 && value < 70) {
                    $audioButton.html('<i class="ion-md-volume-low"></i>');
                } else if (value > 70) {
                    $audioButton.html('<i class="ion-md-volume-high"></i>');
                }
            })
        },

        //=> Add audio in player on click of card
        addAudioInPlayer: function () {
            var $audio = $('a[data-audio]');

            $audio.on('click', function () {
                var audioData = $(this).data('audio');
                Amplitude.removeSong(0);
                Amplitude.playNow(audioData);
            })
        }
    };

    //=> Call class at document ready
    $(document).ready(AudioPlayer.init);
});