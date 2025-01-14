/* PrismJS 1.17.1
https://prismjs.com/download.html#themes=prism-tomorrow&languages=markup+clike+javascript+jsx */
var _self =
        'undefined' != typeof window
            ? window
            : 'undefined' != typeof WorkerGlobalScope &&
              self instanceof WorkerGlobalScope
            ? self
            : {},
    Prism = (function(u) {
        var c = /\blang(?:uage)?-([\w-]+)\b/i,
            a = 0;
        var _ = {
            manual: u.Prism && u.Prism.manual,
            disableWorkerMessageHandler:
                u.Prism && u.Prism.disableWorkerMessageHandler,
            util: {
                encode: function(e) {
                    return e instanceof L
                        ? new L(e.type, _.util.encode(e.content), e.alias)
                        : Array.isArray(e)
                        ? e.map(_.util.encode)
                        : e
                              .replace(/&/g, '&amp;')
                              .replace(/</g, '&lt;')
                              .replace(/\u00a0/g, ' ');
                },
                type: function(e) {
                    return Object.prototype.toString.call(e).slice(8, -1);
                },
                objId: function(e) {
                    return (
                        e.__id ||
                            Object.defineProperty(e, '__id', { value: ++a }),
                        e.__id
                    );
                },
                clone: function n(e, r) {
                    var t,
                        a,
                        i = _.util.type(e);
                    switch (((r = r || {}), i)) {
                        case 'Object':
                            if (((a = _.util.objId(e)), r[a])) return r[a];
                            for (var o in ((t = {}), (r[a] = t), e))
                                e.hasOwnProperty(o) && (t[o] = n(e[o], r));
                            return t;
                        case 'Array':
                            return (
                                (a = _.util.objId(e)),
                                r[a]
                                    ? r[a]
                                    : ((t = []),
                                      (r[a] = t),
                                      e.forEach(function(e, a) {
                                          t[a] = n(e, r);
                                      }),
                                      t)
                            );
                        default:
                            return e;
                    }
                },
            },
            languages: {
                extend: function(e, a) {
                    var n = _.util.clone(_.languages[e]);
                    for (var r in a) n[r] = a[r];
                    return n;
                },
                insertBefore: function(n, e, a, r) {
                    var t = (r = r || _.languages)[n],
                        i = {};
                    for (var o in t)
                        if (t.hasOwnProperty(o)) {
                            if (o == e)
                                for (var l in a)
                                    a.hasOwnProperty(l) && (i[l] = a[l]);
                            a.hasOwnProperty(o) || (i[o] = t[o]);
                        }
                    var s = r[n];
                    return (
                        (r[n] = i),
                        _.languages.DFS(_.languages, function(e, a) {
                            a === s && e != n && (this[e] = i);
                        }),
                        i
                    );
                },
                DFS: function e(a, n, r, t) {
                    t = t || {};
                    var i = _.util.objId;
                    for (var o in a)
                        if (a.hasOwnProperty(o)) {
                            n.call(a, o, a[o], r || o);
                            var l = a[o],
                                s = _.util.type(l);
                            'Object' !== s || t[i(l)]
                                ? 'Array' !== s ||
                                  t[i(l)] ||
                                  ((t[i(l)] = !0), e(l, n, o, t))
                                : ((t[i(l)] = !0), e(l, n, null, t));
                        }
                },
            },
            plugins: {},
            highlightAll: function(e, a) {
                _.highlightAllUnder(document, e, a);
            },
            highlightAllUnder: function(e, a, n) {
                var r = {
                    callback: n,
                    selector:
                        'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code',
                };
                _.hooks.run('before-highlightall', r);
                for (
                    var t, i = e.querySelectorAll(r.selector), o = 0;
                    (t = i[o++]);

                )
                    _.highlightElement(t, !0 === a, r.callback);
            },
            highlightElement: function(e, a, n) {
                var r = (function(e) {
                        for (; e && !c.test(e.className); ) e = e.parentNode;
                        return e
                            ? (e.className.match(c) || [
                                  ,
                                  'none',
                              ])[1].toLowerCase()
                            : 'none';
                    })(e),
                    t = _.languages[r];
                e.className =
                    e.className.replace(c, '').replace(/\s+/g, ' ') +
                    ' language-' +
                    r;
                var i = e.parentNode;
                i &&
                    'pre' === i.nodeName.toLowerCase() &&
                    (i.className =
                        i.className.replace(c, '').replace(/\s+/g, ' ') +
                        ' language-' +
                        r);
                var o = {
                    element: e,
                    language: r,
                    grammar: t,
                    code: e.textContent,
                };
                function l(e) {
                    (o.highlightedCode = e),
                        _.hooks.run('before-insert', o),
                        (o.element.innerHTML = o.highlightedCode),
                        _.hooks.run('after-highlight', o),
                        _.hooks.run('complete', o),
                        n && n.call(o.element);
                }
                if ((_.hooks.run('before-sanity-check', o), !o.code))
                    return (
                        _.hooks.run('complete', o),
                        void (n && n.call(o.element))
                    );
                if ((_.hooks.run('before-highlight', o), o.grammar))
                    if (a && u.Worker) {
                        var s = new Worker(_.filename);
                        (s.onmessage = function(e) {
                            l(e.data);
                        }),
                            s.postMessage(
                                JSON.stringify({
                                    language: o.language,
                                    code: o.code,
                                    immediateClose: !0,
                                })
                            );
                    } else l(_.highlight(o.code, o.grammar, o.language));
                else l(_.util.encode(o.code));
            },
            highlight: function(e, a, n) {
                var r = { code: e, grammar: a, language: n };
                return (
                    _.hooks.run('before-tokenize', r),
                    (r.tokens = _.tokenize(r.code, r.grammar)),
                    _.hooks.run('after-tokenize', r),
                    L.stringify(_.util.encode(r.tokens), r.language)
                );
            },
            matchGrammar: function(e, a, n, r, t, i, o) {
                for (var l in n)
                    if (n.hasOwnProperty(l) && n[l]) {
                        var s = n[l];
                        s = Array.isArray(s) ? s : [s];
                        for (var u = 0; u < s.length; ++u) {
                            if (o && o == l + ',' + u) return;
                            var c = s[u],
                                g = c.inside,
                                f = !!c.lookbehind,
                                h = !!c.greedy,
                                d = 0,
                                m = c.alias;
                            if (h && !c.pattern.global) {
                                var p = c.pattern
                                    .toString()
                                    .match(/[imsuy]*$/)[0];
                                c.pattern = RegExp(c.pattern.source, p + 'g');
                            }
                            c = c.pattern || c;
                            for (
                                var y = r, v = t;
                                y < a.length;
                                v += a[y].length, ++y
                            ) {
                                var k = a[y];
                                if (a.length > e.length) return;
                                if (!(k instanceof L)) {
                                    if (h && y != a.length - 1) {
                                        if (
                                            ((c.lastIndex = v),
                                            !(x = c.exec(e)))
                                        )
                                            break;
                                        for (
                                            var b =
                                                    x.index +
                                                    (f && x[1]
                                                        ? x[1].length
                                                        : 0),
                                                w = x.index + x[0].length,
                                                A = y,
                                                P = v,
                                                O = a.length;
                                            A < O &&
                                            (P < w ||
                                                (!a[A].type &&
                                                    !a[A - 1].greedy));
                                            ++A
                                        )
                                            (P += a[A].length) <= b &&
                                                (++y, (v = P));
                                        if (a[y] instanceof L) continue;
                                        (j = A - y),
                                            (k = e.slice(v, P)),
                                            (x.index -= v);
                                    } else {
                                        c.lastIndex = 0;
                                        var x = c.exec(k),
                                            j = 1;
                                    }
                                    if (x) {
                                        f && (d = x[1] ? x[1].length : 0);
                                        w =
                                            (b = x.index + d) +
                                            (x = x[0].slice(d)).length;
                                        var N = k.slice(0, b),
                                            S = k.slice(w),
                                            C = [y, j];
                                        N && (++y, (v += N.length), C.push(N));
                                        var E = new L(
                                            l,
                                            g ? _.tokenize(x, g) : x,
                                            m,
                                            x,
                                            h
                                        );
                                        if (
                                            (C.push(E),
                                            S && C.push(S),
                                            Array.prototype.splice.apply(a, C),
                                            1 != j &&
                                                _.matchGrammar(
                                                    e,
                                                    a,
                                                    n,
                                                    y,
                                                    v,
                                                    !0,
                                                    l + ',' + u
                                                ),
                                            i)
                                        )
                                            break;
                                    } else if (i) break;
                                }
                            }
                        }
                    }
            },
            tokenize: function(e, a) {
                var n = [e],
                    r = a.rest;
                if (r) {
                    for (var t in r) a[t] = r[t];
                    delete a.rest;
                }
                return _.matchGrammar(e, n, a, 0, 0, !1), n;
            },
            hooks: {
                all: {},
                add: function(e, a) {
                    var n = _.hooks.all;
                    (n[e] = n[e] || []), n[e].push(a);
                },
                run: function(e, a) {
                    var n = _.hooks.all[e];
                    if (n && n.length) for (var r, t = 0; (r = n[t++]); ) r(a);
                },
            },
            Token: L,
        };
        function L(e, a, n, r, t) {
            (this.type = e),
                (this.content = a),
                (this.alias = n),
                (this.length = 0 | (r || '').length),
                (this.greedy = !!t);
        }
        if (
            ((u.Prism = _),
            (L.stringify = function(e, a) {
                if ('string' == typeof e) return e;
                if (Array.isArray(e))
                    return e
                        .map(function(e) {
                            return L.stringify(e, a);
                        })
                        .join('');
                var n = {
                    type: e.type,
                    content: L.stringify(e.content, a),
                    tag: 'span',
                    classes: ['token', e.type],
                    attributes: {},
                    language: a,
                };
                if (e.alias) {
                    var r = Array.isArray(e.alias) ? e.alias : [e.alias];
                    Array.prototype.push.apply(n.classes, r);
                }
                _.hooks.run('wrap', n);
                var t = Object.keys(n.attributes)
                    .map(function(e) {
                        return (
                            e +
                            '="' +
                            (n.attributes[e] || '').replace(/"/g, '&quot;') +
                            '"'
                        );
                    })
                    .join(' ');
                return (
                    '<' +
                    n.tag +
                    ' class="' +
                    n.classes.join(' ') +
                    '"' +
                    (t ? ' ' + t : '') +
                    '>' +
                    n.content +
                    '</' +
                    n.tag +
                    '>'
                );
            }),
            !u.document)
        )
            return (
                u.addEventListener &&
                    (_.disableWorkerMessageHandler ||
                        u.addEventListener(
                            'message',
                            function(e) {
                                var a = JSON.parse(e.data),
                                    n = a.language,
                                    r = a.code,
                                    t = a.immediateClose;
                                u.postMessage(
                                    _.highlight(r, _.languages[n], n)
                                ),
                                    t && u.close();
                            },
                            !1
                        )),
                _
            );
        var e =
            document.currentScript ||
            [].slice.call(document.getElementsByTagName('script')).pop();
        if (
            (e &&
                ((_.filename = e.src),
                e.hasAttribute('data-manual') && (_.manual = !0)),
            !_.manual)
        ) {
            function n() {
                _.manual || _.highlightAll();
            }
            'loading' !== document.readyState
                ? window.requestAnimationFrame
                    ? window.requestAnimationFrame(n)
                    : window.setTimeout(n, 16)
                : document.addEventListener('DOMContentLoaded', n);
        }
        return _;
    })(_self);
'undefined' != typeof module && module.exports && (module.exports = Prism),
    'undefined' != typeof global && (global.Prism = Prism);
(Prism.languages.markup = {
    comment: /<!--[\s\S]*?-->/,
    prolog: /<\?[\s\S]+?\?>/,
    doctype: /<!DOCTYPE[\s\S]+?>/i,
    cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
    tag: {
        pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/i,
        greedy: !0,
        inside: {
            tag: {
                pattern: /^<\/?[^\s>\/]+/i,
                inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ },
            },
            'attr-value': {
                pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/i,
                inside: {
                    punctuation: [
                        /^=/,
                        { pattern: /^(\s*)["']|["']$/, lookbehind: !0 },
                    ],
                },
            },
            punctuation: /\/?>/,
            'attr-name': {
                pattern: /[^\s>\/]+/,
                inside: { namespace: /^[^\s>\/:]+:/ },
            },
        },
    },
    entity: /&#?[\da-z]{1,8};/i,
}),
    (Prism.languages.markup.tag.inside['attr-value'].inside.entity =
        Prism.languages.markup.entity),
    Prism.hooks.add('wrap', function(a) {
        'entity' === a.type &&
            (a.attributes.title = a.content.replace(/&amp;/, '&'));
    }),
    Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
        value: function(a, e) {
            var s = {};
            (s['language-' + e] = {
                pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
                lookbehind: !0,
                inside: Prism.languages[e],
            }),
                (s.cdata = /^<!\[CDATA\[|\]\]>$/i);
            var n = {
                'included-cdata': {
                    pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
                    inside: s,
                },
            };
            n['language-' + e] = {
                pattern: /[\s\S]+/,
                inside: Prism.languages[e],
            };
            var i = {};
            (i[a] = {
                pattern: RegExp(
                    '(<__[\\s\\S]*?>)(?:<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\s*|[\\s\\S])*?(?=<\\/__>)'.replace(
                        /__/g,
                        a
                    ),
                    'i'
                ),
                lookbehind: !0,
                greedy: !0,
                inside: n,
            }),
                Prism.languages.insertBefore('markup', 'cdata', i);
        },
    }),
    (Prism.languages.xml = Prism.languages.extend('markup', {})),
    (Prism.languages.html = Prism.languages.markup),
    (Prism.languages.mathml = Prism.languages.markup),
    (Prism.languages.svg = Prism.languages.markup);
Prism.languages.clike = {
    comment: [
        { pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0 },
        { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 },
    ],
    string: {
        pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: !0,
    },
    'class-name': {
        pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,
        lookbehind: !0,
        inside: { punctuation: /[.\\]/ },
    },
    keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
    boolean: /\b(?:true|false)\b/,
    function: /\w+(?=\()/,
    number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
    operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
    punctuation: /[{}[\];(),.:]/,
};
(Prism.languages.javascript = Prism.languages.extend('clike', {
    'class-name': [
        Prism.languages.clike['class-name'],
        {
            pattern: /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,
            lookbehind: !0,
        },
    ],
    keyword: [
        { pattern: /((?:^|})\s*)(?:catch|finally)\b/, lookbehind: !0 },
        {
            pattern: /(^|[^.])\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
            lookbehind: !0,
        },
    ],
    number: /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
    function: /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
    operator: /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/,
})),
    (Prism.languages.javascript[
        'class-name'
    ][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/),
    Prism.languages.insertBefore('javascript', 'keyword', {
        regex: {
            pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=\s*($|[\r\n,.;})\]]))/,
            lookbehind: !0,
            greedy: !0,
        },
        'function-variable': {
            pattern: /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/,
            alias: 'function',
        },
        parameter: [
            {
                pattern: /(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/,
                lookbehind: !0,
                inside: Prism.languages.javascript,
            },
            {
                pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i,
                inside: Prism.languages.javascript,
            },
            {
                pattern: /(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/,
                lookbehind: !0,
                inside: Prism.languages.javascript,
            },
            {
                pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/,
                lookbehind: !0,
                inside: Prism.languages.javascript,
            },
        ],
        constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
    }),
    Prism.languages.insertBefore('javascript', 'string', {
        'template-string': {
            pattern: /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,
            greedy: !0,
            inside: {
                'template-punctuation': { pattern: /^`|`$/, alias: 'string' },
                interpolation: {
                    pattern: /((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,
                    lookbehind: !0,
                    inside: {
                        'interpolation-punctuation': {
                            pattern: /^\${|}$/,
                            alias: 'punctuation',
                        },
                        rest: Prism.languages.javascript,
                    },
                },
                string: /[\s\S]+/,
            },
        },
    }),
    Prism.languages.markup &&
        Prism.languages.markup.tag.addInlined('script', 'javascript'),
    (Prism.languages.js = Prism.languages.javascript);
!(function(i) {
    var t = i.util.clone(i.languages.javascript);
    (i.languages.jsx = i.languages.extend('markup', t)),
        (i.languages.jsx.tag.pattern = /<\/?(?:[\w.:-]+\s*(?:\s+(?:[\w.:-]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s{'">=]+|\{(?:\{(?:\{[^}]*\}|[^{}])*\}|[^{}])+\}))?|\{\.{3}[a-z_$][\w$]*(?:\.[a-z_$][\w$]*)*\}))*\s*\/?)?>/i),
        (i.languages.jsx.tag.inside.tag.pattern = /^<\/?[^\s>\/]*/i),
        (i.languages.jsx.tag.inside[
            'attr-value'
        ].pattern = /=(?!\{)(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">]+)/i),
        (i.languages.jsx.tag.inside.tag.inside[
            'class-name'
        ] = /^[A-Z]\w*(?:\.[A-Z]\w*)*$/),
        i.languages.insertBefore(
            'inside',
            'attr-name',
            {
                spread: {
                    pattern: /\{\.{3}[a-z_$][\w$]*(?:\.[a-z_$][\w$]*)*\}/,
                    inside: { punctuation: /\.{3}|[{}.]/, 'attr-value': /\w+/ },
                },
            },
            i.languages.jsx.tag
        ),
        i.languages.insertBefore(
            'inside',
            'attr-value',
            {
                script: {
                    pattern: /=(\{(?:\{(?:\{[^}]*\}|[^}])*\}|[^}])+\})/i,
                    inside: {
                        'script-punctuation': {
                            pattern: /^=(?={)/,
                            alias: 'punctuation',
                        },
                        rest: i.languages.jsx,
                    },
                    alias: 'language-javascript',
                },
            },
            i.languages.jsx.tag
        );
    var o = function(t) {
            return t
                ? 'string' == typeof t
                    ? t
                    : 'string' == typeof t.content
                    ? t.content
                    : t.content.map(o).join('')
                : '';
        },
        p = function(t) {
            for (var n = [], e = 0; e < t.length; e++) {
                var a = t[e],
                    s = !1;
                if (
                    ('string' != typeof a &&
                        ('tag' === a.type &&
                        a.content[0] &&
                        'tag' === a.content[0].type
                            ? '</' === a.content[0].content[0].content
                                ? 0 < n.length &&
                                  n[n.length - 1].tagName ===
                                      o(a.content[0].content[1]) &&
                                  n.pop()
                                : '/>' ===
                                      a.content[a.content.length - 1].content ||
                                  n.push({
                                      tagName: o(a.content[0].content[1]),
                                      openedBraces: 0,
                                  })
                            : 0 < n.length &&
                              'punctuation' === a.type &&
                              '{' === a.content
                            ? n[n.length - 1].openedBraces++
                            : 0 < n.length &&
                              0 < n[n.length - 1].openedBraces &&
                              'punctuation' === a.type &&
                              '}' === a.content
                            ? n[n.length - 1].openedBraces--
                            : (s = !0)),
                    (s || 'string' == typeof a) &&
                        0 < n.length &&
                        0 === n[n.length - 1].openedBraces)
                ) {
                    var g = o(a);
                    e < t.length - 1 &&
                        ('string' == typeof t[e + 1] ||
                            'plain-text' === t[e + 1].type) &&
                        ((g += o(t[e + 1])), t.splice(e + 1, 1)),
                        0 < e &&
                            ('string' == typeof t[e - 1] ||
                                'plain-text' === t[e - 1].type) &&
                            ((g = o(t[e - 1]) + g), t.splice(e - 1, 1), e--),
                        (t[e] = new i.Token('plain-text', g, null, g));
                }
                a.content && 'string' != typeof a.content && p(a.content);
            }
        };
    i.hooks.add('after-tokenize', function(t) {
        ('jsx' !== t.language && 'tsx' !== t.language) || p(t.tokens);
    });
})(Prism);
