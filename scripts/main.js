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
 *
 * MJL20150119 - on reflection, the code is no more 'hard coded' than
 *               HTML, it's just imperative rather than
 *               declarative. As such, I think I can live with this
 *               as-is, though I think I'll format it more to my own
 *               taste.
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
                    .append(new Btn('Colophon').addClass('skin-blog').on('click', linkEvent('/pg/colophon.html')))
                    .append(new Btn('LinkedIn').addClass('skin-linkedin').on('click', linkEvent('https://www.linkedin.com/in/mikelockhart')))
                    .append(new Btn('Google Plus').addClass('skin-gplus').on('click', linkEvent('https://plus.google.com/+MichaelLockhart')))
                    .append(new Btn('Stack Overflow').addClass('skin-stack-overflow').on('click', linkEvent('http://stackoverflow.com/users/776953/mike')))
                    .append(new Btn('Calendar').addClass('skin-gcal').on('click', linkEvent('https://www.google.com/calendar/embed?src=sinewalker%40gmail.com&ctz=Australia/Sydney')))
                    .append(new Btn('Facebook').addClass('skin-facebook').on('click', linkEvent('https://www.facebook.com/sinewalker')))
                    .append(new Btn('email').addClass('skin-gmail').on('click', linkEvent('mailto:sinewalker@gmail.com')))
                   )
            .append(new Btn('Blog').addClass('skin-blog').on('click', linkEvent('/blog/')))
            .append(new Btn('Codex').addClass('skin-codex').on('click', linkEvent('/pg/index.html')))
            .append(new Btn('Pixels').addClass('skin-gallery').on('click', linkEvent('/pixels/')))
            .append(new Btn('Code').addClass('skin-code')
                    .append(new Btn('Source Forge').addClass('skin-sourceforge').on('click', linkEvent('https://sourceforge.net/u/sinewalker/profile/')))
                    .append(new Btn('Github').addClass('skin-github').on('click', linkEvent('http://www.github.com/sinewalker')))
                    .append(new Btn('Bit Bucket').addClass('skin-bitbucket').on('click', linkEvent('http://www.bitbucket.com/sinewalker')))
                   )
            .append(new Btn('Hacks').addClass('skin-hax')
                    .append(new Btn('(directory list)').addClass('skin-menu').on('click', linkEvent('/hax/')))
                    .append(new Btn('Matrix rain').addClass('skin-matrix').on('click', linkEvent('/hax/matrix-rain/matrix.html')))
                    )
            .append(new Btn('iStorage').addClass('skin-cloud')
                    .append(new Btn('Google Drive').addClass('skin-gdrive').on('click', linkEvent('https://drive.google.com/folderview?id=0Bx4srwpEBrFMUEJPRll4ajdDakU&usp=sharing')))
                    .append(new Btn('Copy').addClass('skin-copy').on('click', linkEvent('https://copy.com/miRM1RSf1ha2lifS')))
                    .append(new Btn('Box').addClass('skin-box').on('click', linkEvent('https://app.box.com/mike-public')))
                   )
            .append(new Btn('Links').addClass('skin-links')
                    .append(new Btn('Zendesk').addClass('skin-www').on('click', linkEvent('https://squizaustralia.zendesk.com/agent/filters')))
                    .append(new Btn('Matrix Manuals').addClass('skin-www').on('click', linkEvent('http://manuals.matrix.squizsuite.net/')))
                    .append(new Btn('Squiz Intranet').addClass('skin-www').on('click', linkEvent('https://intranet.squiz.net')))
                    .append(new Btn('Squiz Ops Wiki').addClass('skin-www').on('click', linkEvent('https://opswiki.squiz.net/mlockhart')))
                    .append(new Btn('Google Bookmarks').addClass('skin-www').on('click', linkEvent('https://www.google.com.au/bookmarks/')))
                    .append(new Btn('Pocket').addClass('skin-www').on('click', linkEvent('http://getpocket.com/a/queue/')))
                    .append(new Btn('Pinterest').addClass('skin-www').on('click', linkEvent('http://www.pinterest.com/'))) // I may pick this up again: Jenny is quite active...
                    .append(new Btn('Search Web').addClass('skin-www').on('click', linkEvent('https://duckduckgo.com/')))
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
