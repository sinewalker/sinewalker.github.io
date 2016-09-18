function flip() {
    var flipType=document.f.flipType.value;
    var originalString=document.f.original.value;
    var result="";
    if (flipType == "flip") {
        result = flipString(originalString);
    } else {
        result = transformString(originalString, flipType);
    }
    document.f.flipped.value = result;
}

function flipString(aString) {
    aString=aString.toLocaleLowerCase();
    var last = aString.length - 1;
    var result = new Array(aString.length);
    //also reverse the result string
    for (var i = last; i >= 0; --i) {
        var c = aString.charAt(i);
        var r = flipTable[c];
        result[last - i] = r ? r : c;
    }
    return result.join('');
}

function transformString(aString, txType) {
    var last = aString.length - 1;
    var result = new Array(aString.length);

    switch(txType) {
    case "weird":
        txTable=weirdTable;
        aString=aString.toLocaleLowerCase();
        break;
    case "script":
        txTable=scriptTable;
        break;
    case "fraktur":
        txTable=frakturTable;
        break;
    }

    for (var i = last; i >= 0; --i) {
        var c = aString.charAt(i);
        var r = txTable[c];
        result[i] = r ? r : c;
    }
    return result.join('');
};

var flipTable = {
    a : '\u0250',
    b : 'q',
    c : '\u0254', //open o -- from pne
    d : 'p',
    e : '\u01DD',
    f : '\u025F', //from pne
    g : '\u0183',
    h : '\u0265',
    i : '\u0131', //from pne
    j : '\u027E',
    k : '\u029E',
    //l : '\u0283',
    m : '\u026F',
    n : 'u',
    r : '\u0279',
    t : '\u0287',
    v : '\u028C',
    w : '\u028D',
    y : '\u028E',
    '.' : '\u02D9',
    '[' : ']',
    '(' : ')',
    '{' : '}',
    '?' : '\u00BF', //from pne
    '!' : '\u00A1',
    "\'" : ',',
    '<' : '>',
    '_' : '\u203E',
    '\u203F' : '\u2040',
    '\u2045' : '\u2046',
    '\u2234' : '\u2235',
    '\r' : '\n' //thank you, Yeeliberto
};

for (i in flipTable) {
    flipTable[flipTable[i]] = i;
};

var weirdTable = {
    a : '\u03B1',
    b : '\u0432',
    c : 'c',
    d : '\u0111',
    e : '\u0454',
    f : 'f',
    g : '\u0121',
    h : '\u043d',
    i : '\u03af',
    j : '\u05e0',
    k : '\u043a',
    l : 'l',
    m : '\u043c',
    n : '\u0438',
    o : 'o',
    p : '\u03c1',
    r : '\u044f',
    s : 's',
    t : '\u0442',
    u : '\u03c5',
    v : 'v',
    w : '\u03c9',
    x : 'x',
    y : '\u0443',
    z : 'z',
    '\r' : '\n'
};

for (i in weirdTable) {
    weirdTable[weirdTable[i]] = i;
};

//Astral plane -- extended escapes \u{aabbcc} is for ECMAScript 6 only...
// also the browser needs a font with the astral glyphs.
var scriptTable = {
    A : '𝓐',    a : '𝓪',
    B : '𝓑',    b : '𝓫',
    C : '𝓒',    c : '𝓬',
    D : '𝓓',    d : '𝓭',
    E : '𝓔',    e : '𝓮',
    F : '𝓕',    f : '𝓯',
    G : '𝓖',    g : '𝓰',
    H : '𝓗',    h : '𝓱',
    I : '𝓘',    i : '𝓲',
    J : '𝓙',    j : '𝓳',
    K : '𝓚',    k : '𝓴',
    L : '𝓛',    l : '𝓵',
    M : '𝓜',    m : '𝓶',
    N : '𝓝',    n : '𝓷',
    O : '𝓞',    o : '𝓸',
    P : '𝓟',    p : '𝓹',
    Q : '𝓠',    q : '𝓺',
    R : '𝓡',    r : '𝓻',
    S : '𝓢',    s : '𝓼',
    T : '𝓣',    t : '𝓽',
    U : '𝓤',    u : '𝓾',
    V : '𝓥',    v : '𝓿',
    W : '𝓦',    w : '𝔀',
    X : '𝓧',    x : '𝔁',
    Y : '𝓨',    y : '𝔂',
    Z : '𝓩',    z : '𝔃'
};

for (i in scriptTable) {
    scriptTable[scriptTable[i]] = i;
}

var frakturTable = {
    A : '𝕬',    a : '𝔞',
    B : '𝕭',    b : '𝔟',
    C : '𝕮',    c : '𝔠',
    D : '𝕯',    d : '𝔡',
    E : '𝕰',    e : '𝔢',
    F : '𝕱',    f : '𝔣',
    G : '𝕲',    g : '𝔤',
    H : '𝕳',    h : '𝔥',
    I : '𝕴',    i : '𝔦',
    J : '𝕵',    j : '𝔧',
    K : '𝕶',    k : '𝔨',
    L : '𝕷',    l : '𝔩',
    M : '𝕸',    m : '𝔪',
    N : '𝕹',    n : '𝔫',
    O : '𝕺',    o : '𝔬',
    P : '𝕻',    p : '𝔭',
    Q : '𝕼',    q : '𝔮',
    R : '𝕽',    r : '𝔯',
    S : '𝕾',    s : '𝔰',
    T : '𝕿',    t : '𝔱',
    U : '𝖀',    u : '𝔲',
    V : '𝖁',    v : '𝔳',
    W : '𝖂',    w : '𝔴',
    X : '𝖃',    x : '𝔵',
    Y : '𝖄',    y : '𝔶',
    Z : '𝖅',    z : '𝔷'
};

for (i in frakturTable) {
    frakturTable[frakturTable[i]] = i;
}
