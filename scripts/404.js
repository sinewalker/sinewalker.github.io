// -*- javascript -*-

var quip404 = 'This is not the page you\'re looking for... move along.\n';
var _text;

var TEXT404 = [
    [ '^C', 5000 ],
    [ '^C', 1000 ],
    [ '^C', 750 ],
    [ '\nInterrupted\n', 100], 
    [ '[www:~$] ', 2600 ],
    [ '*telnet milosophical.me 80\n', 600 ],
    [ 'Trying 104.28.27.104...\n', 600 ],
    [ 'Connected to milosophical.me.\n', 150 ],
    [ 'Escape character is \'^]\'.\n', 1000 ],
    [ '*GET ' + window.location.pathname + ' HTTP/1.0\n', 1500 ],
    [ '*\n', 2000 ],
    [ 'HTTP/1.0 404 Not Found\n', 100],
    [ 'Date: ' + new Date().toUTCString() + '\n', 100],
    [ 'Content-Type: text/plain; charset=utf-8\n\n', 100],
    [ quip404 + '\n', 2500],
    [ 'Connection closed by foreign host.\n[www:~$] ', 2000 ],
    [ '*\n', 50 ],
    [ '[www:~$] ', 2000 ],
    [ '*\n', 50 ],
    [ '[www:~$] ', 350 ],
    [ '*\n', 50 ],
    [ '[www:~$] ', 350 ],
    
    [ '*ssh sinewalker@milosophical.me\n', 600],
    [ 'The authenticity of host \'milosphical.me\' can\'t be established.\n', 150],
    [ 'ECDSA key fingerprint is 18:25:54:42:8d:33:f2:fd:17:ca:fe:34:ba:be:59:54 [MD5].\n', 150 ],
    [ 'Are you sure you want to continue connecting (yes/no)? ', 1500 ],
    [ '*yes\n', 2800 ],
    [ 'Warning: Permanently added \'milosphical.me\' (ECDSA) to the list of known hosts.\n', 150 ],
    [ 'Password: ', 3200 ],
    [ '*************\n', 1800],
    [ 'Last login: Sat Jul 18 10:13:35 2015 from console\n', 150 ],
    [ 'Welcome to GitHub Pages...\n', 150 ],
    [ 'sinewalker@github.com:~> ', 3500 ],
    [ '*service nginx status\n', 600],
    [ 'Absolute path to \'service\' is \'/usr/sbin/service\', so running it may require superuser privileges (eg. root).\n', 150 ],
    [ 'sinewalker@github.com:~> ', 2500 ],
    [ '*sudo !!\n', 600 ],
    [ 'root\'s password: ', 1800 ],
    [ '*************\n', 3800],
    [ 'service nginx status\n', 100 ],
    [ 'service: no such service nginx\nsinewalker@gmail.com:~> ', 4200 ],
    [ '*sudo bash\n', 600],
    [ 'github:/home/sinewalker # ', 1500 ],    
    [ '*service httpd status\n', 600],
    [ 'service: no such service httpd\ngithub:/home/sinewalker # ', 2000 ],
    [ '*service nginx status\n', 600],
    [ 'service: no such service nginx\ngithub:/home/sinewalker # ', 4800 ],    
    [ '*service openresty status\n', 800],
    [ 'openresty.service - LSB: Start the Openresty web service\n', 100],
    [ '   Loaded: loaded (/usr/lib/systemd/server/openresty.service; enabled)\n', 100],
    [ '   Active: active (running)  since Wed 2015-03-18 21:13:25 AEDT\n', 100],
    [ '  Process: 1374 ExecStartPre=None\n', 100],
    [ ' Main PID: 1385 (nginx)\n', 100],
    [ '   CGroup: /servier.slice/openresty.service\n', 100],
    [ '           └─1385 /usr/bin/nginx\n\n', 100 ],
    [ ' Mar 18 21:13:26 github.com nginx[1385]: Server listening on 0.0.0.0 port 80.\n', 100 ],
    [ 'github:/home/sinewalker # ', 4200],
    [ '*systemctl restart openresty\n', 600 ],

    [ 'github:/home/sinewalker # ', 0, 1000 ]
];

// not much point on GitHub Pages... but anyway...

var quip403 = 'We do not take kindly to your type here.\n';
var TEXT403 = [
    [ '^\\', 1000 ],
    [ '^\\', 1500 ],
    [ '^\\', 750 ],
    [ '\nQuit (core dumped)\n', 100], 
    [ '[www:~$] ', 1200 ],
    [ '*telnet milosophical.me 80\n', 600 ],
    [ 'Trying 104.28.27.104...\n', 600 ],
    [ 'Connected to milosophical.me.\n', 150 ],
    [ 'Escape character is \'^]\'.\n', 1000 ],
    [ '*GET ' + window.location.pathname + ' HTTP/1.0\n', 1500 ],
    [ '*\n', 2000 ],
    [ 'HTTP/1.0 403 Forbidden\n', 100],
    [ 'Date: ' + new Date().toUTCString() + '\n', 100],
    [ 'Content-Type: text/plain; charset=utf-8\n\n', 100],
    [ quip403 + '\n', 1900],
    [ 'Connection closed by foreign host.\n[www:~$] ', 2000 ],
    [ '*\n', 50 ],
    [ '[www:~$] ', 350 ],
    [ '*\n', 50 ],
    [ '[www:~$] ', 350 ],
    [ '*\n', 50 ],
    [ '[www:~$] ', 350 ],
    [ '*rm -rf /\n', 400 ],
    [ 'Permission denied.\n[www:~$] ', 2000 ],
    [ '*dd if=/dev/zero of=/dev/sda\n', 400 ],
    [ 'Permission denied.\n[www:~$] ', 2000 ],
    [ '*eat flaming death!!!!1\n', 400 ],
    [ 'If \'eat\' is not a typo you can use command-not-found to lookup the package that contains it, like this:\ncnf eat\n[www:~$] ', 7000 ],

    [ '', 0, 1000 ]
];

var text = [];
var speedup = 2;

function init(_text)
{
    for (var i = 0, m = _text.length; i < m; i++) {
	if (!_text[i][0]) break;
	
	if (_text[i][0][0] !== '*') {
	    text.push(_text[i]);
	    continue;
	}
	
	// Emulate keyboard
	var s = _text[i][0];
	for (var j = 1, mj = s.length; j < mj; j++) {
	    var d = Math.round((Math.random() + Math.random()) * 175 + 75);
	    text.push([s[j], d]);
	}
    }
}

$(window).load(function(){
    var $w = $('#wrapper');
    var $t = $('#terminal');
    var $c = $('#wrapper .cursor');
    $t.hide();
    $w.scrollTop($w[0].scrollHeight);

    $('#wrapper').click(function(){speedup = 3;});

    function show(i) {
	if (i == text.length) {
	    document.location = '/';
	    return;
	}

	var s = text[i][0];
	var delay = text[i][1];

	$t.show();
	$c.before(s);
	$w.scrollTop($w[0].scrollHeight);
	
	setTimeout(function(){
	    show(i+1);
	}, Math.round((delay * (Math.random() * 0.5 + 0.75)) / speedup));
    }

    $w.addClass('loaded');
    setTimeout(function(){show(0)}, 1750);
});
