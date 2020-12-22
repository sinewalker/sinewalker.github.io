/**
 * main.js
 *
 * responsible for adding menu to the page
 *
 * taken from https://github.com/oriSomething/Btns
 *
 * MJL20150117 - This is horribly hard-coded. For now I wish to just
 *               get a site up, so I'll follow along, but I'd love to
 *               make this dynamic somehow
 * MJL20150119 - on reflection, the code is no more 'hard coded' than
 *               HTML, it's just imperative rather than
 *               declarative. As such, I think I can live with this
 *               as-is, though I think I'll format it more to my own
 *               taste.
 * MJL20160110 - new "blog roll" style blogs section under Links
 *               (replaces Google Bookmarks which is not as useful first thought)
 *             - Be nice to web servers, put trailing / on directory URLs
 * MJL20160127 - Tom Limoncelli's blog is more awesome than Brian Hicks'
 *               Spacemacs one.
 *             - Note the Jargon file is a mirror
 *
 * MJL20170805 - history in the git log
 *
 * Note:- all the styling is done in CSS, this just builds the menu Btns
 *
 */


(function ( window, document, Btn, FastClick, undefined) {
    'use strict';


    // Used for creating alert messages popups for button
    function alertEvent( title ) {
        return function() { window.alert( title ); };
    }


    // Used for creating links for button
    function linkEvent( link ) {
        return function() { window.location.href = link; };
    }


    // remove CSS that makes the menu invisible onload
    function removeIsMainInvisble() {
        document.documentElement.classList.remove('is-main-invisible');
    }


    // The functions that run after `DOMContetedLoaded`
    function onload() {
        // fast click for iOS / Android
        if ( document.documentElement.classList.contains('touch-fix') ) FastClick.attach(document.body);

        /////////////////////////////////////////////////////////////

        // create the menu
        new Btn('Mike Lockhart').addClass('skin-main_menu')
            .append(new Btn('About').addClass('skin-about')
                    .append(new Btn('Colophon').addClass('skin-blog').on('click', linkEvent('https://sinewalker.github.io/pg/colophon.html')))
                    .append(new Btn('milohax.net').addClass('skin-main_menu').on('click', linkEvent('https://milohax.net')))
                    .append(new Btn('Stack Overflow').addClass('skin-stack-overflow').on('click', linkEvent('http://stackoverflow.com/users/776953/mike/')))
                    .append(new Btn('Gists').addClass('skin-github').on('click', linkEvent('https://gist.github.com/sinewalker/')))
                    .append(new Btn('CodePen').addClass('skin-hax').on('click', linkEvent('https://codepen.io/sinewalker/')))
                    .append(new Btn('Facebook').addClass('skin-facebook').on('click', linkEvent('https://www.facebook.com/sinewalker/')))
                    .append(new Btn('LinkedIn').addClass('skin-linkedin').on('click', linkEvent('https://www.linkedin.com/in/mikelockhart/')))
                    .append(new Btn('GitLab README').addClass('skin-gitlab').on('click', linkEvent('https://web.archive.org/web/20200921170617/https://about.gitlab.com/handbook/engineering/readmes/mike-lockhart/')))
                   )
            .append(new Btn('Blog').addClass('skin-blog').on('click', linkEvent('/blog/')))
            .append(new Btn('Codex').addClass('skin-codex')
                    .append(new Btn('Jargon (MIRROR)').addClass('skin-codex')
                            .append(new Btn('Glossary').addClass('skin-hax').on('click', linkEvent('https://sinewalker.github.io/jargon/html/go01.html')))
                            .append(new Btn('Lexicon').addClass('skin-hax').on('click', linkEvent('https://sinewalker.github.io/jargon/html/lexicon.html')))
                            .append(new Btn('Main Page').addClass('skin-hax').on('click', linkEvent('https://sinewalker.github.io/jargon/index.html')))
                            .append(new Btn('Jargon File').addClass('skin-hax').on('click', linkEvent('https://sinewalker.github.io/jargon/html/index.html')))
                            .append(new Btn('Folklore').addClass('skin-hax').on('click', linkEvent('https://sinewalker.github.io/jargon/html/appendixa.html')))
                            )
                    .append(new Btn('Writings').addClass('skin-codex').on('click', linkEvent('https://sinewalker.github.io/pg/index.html')))
                    )
            .append(new Btn('Pixels').addClass('skin-gallery').on('click', linkEvent('https://sinewalker.github.io/pixels/')))
            .append(new Btn('Code').addClass('skin-code')
                    .append(new Btn('Source Forge').addClass('skin-sourceforge').on('click', linkEvent('https://sourceforge.net/u/sinewalker/profile/')))
                    .append(new Btn('GitLab').addClass('skin-gitlab').on('click', linkEvent('https://gitlab.com/sinewalker')))
                    .append(new Btn('Bit Bucket').addClass('skin-bitbucket').on('click', linkEvent('http://www.bitbucket.com/sinewalker/')))
                    .append(new Btn('Gists').addClass('skin-github').on('click', linkEvent('http://gist.github.com/sinewalker/')))
                    .append(new Btn('Github').addClass('skin-github').on('click', linkEvent('http://www.github.com/sinewalker/')))
                    )
            .append(new Btn('Hacks').addClass('skin-hax')
                    //.append(new Btn('(directory list)').addClass('skin-menu').on('click', linkEvent('/hax/')))
                    .append(new Btn('Matrix rain').addClass('skin-matrix').on('click', linkEvent('https://sinewalker.github.io/hax/matrix-rain/matrix.html')))
                    .append(new Btn('Unicodify').addClass('skin-hax').on('click', linkEvent('https://sinewalker.github.io/hax/unicodify/')))
                    .append(new Btn('Pick-up sticks').addClass('skin-hax').on('click', linkEvent('https://sinewalker.github.io/hax/pickup-sticks/sticks.html')))
                    )

            // Append the button menu to the DOM - `#main` element
            .appendTo('#main');

        ////////////////////////////////////////////////////////////

        // remove the class that makes the menu invisible
        if ('requestAnimationFrame' in window) {
            window.requestAnimationFrame(removeIsMainInvisble);
        } else if ('webkitRequestAnimationFrame' in window) {
            window.webkitRequestAnimationFrame(removeIsMainInvisble);
        } else {
            window.setTimeout(removeIsMainInvisble, 0);
        }
    }

    // the init function - also call it self
    (function init() {
        // iOS / Android - touch hack fix by sniffing user agent - it
        // may be better to use modernizr touch event detect - but not
        // sure it's a problem of all Webkit
        document.documentElement.className += ((/(like Mac OS X)|(Android)/i.test(window.navigator.userAgent)) ? ' touch-fix' : ' no-touch-fix');

        // Make the menu invisible for fading in animation
        document.documentElement.className += ' is-main-invisible';

        // Make  sure everything is work when blocking render
        document.addEventListener( 'DOMContentLoaded', onload, false );
    } ());

} (window, document, Btn, FastClick) );
