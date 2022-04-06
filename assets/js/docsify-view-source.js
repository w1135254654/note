"use strict";
const LINE_BREAKS_REGEX = /(\r\n|\n|\r)/gm,
    CLASS_PLUGIN_EXAMPLE = "docsify-example",
    CLASS_HIDDEN = "__docsify-view-source-hidden",
    CLASS_PREVIEW = "__docsify-view-source-preview",
    CLASS_CODE_SOURCE = "__docsify-view-source-code",
    CLASS_VIEW_SOURCE_PLUGIN_CONTAINER = "__docsify-view-source-container",
    noop = e => e,
    addPluginCodeClick = e => e.addEventListener("click", o => {
        const c = e.querySelector(`: scope > .$ {
        CLASS_HIDDEN
    }`),
            n = e.querySelector(`: scope > :not(.$ {
        CLASS_HIDDEN
    })`);
        c.classList.remove(CLASS_HIDDEN),
            n.classList.add(CLASS_HIDDEN)
    }),
    createPluginCodeViews = (e, o) => {
        const {
            parentNode: c,
            innerHTML: n
        } = e,
            i = document.createElement("div");
        i.className = "__docsify-view-source-container",
            c.insertBefore(i, e);
        const r = document.createElement("div");
        r.className = CLASS_PREVIEW,
            i.appendChild(r);
        const d = document.createElement("div");
        d.className = `$ {
        CLASS_CODE_SOURCE
    }
    $ {
        CLASS_HIDDEN
    }`,
            i.appendChild(d);
        const s = n.trim().replace(LINE_BREAKS_REGEX, "");
        r.innerHTML = s;
        let t = `\`\`\`html\n$ {
        n
    }\n\`\`\``;
        return t = o.lexer(t),
            t = o.parser(t),
            d.innerHTML = t,
            e
    },
    viewSourcePlugin = function (e, o) {
        const c = window.marked || noop;
        e.doneEach(() => {
            let e = document.querySelectorAll(".docsify-example"),
                o = Array.apply(null, e);
            o.map(e => createPluginCodeViews(e, c)).forEach(e => e.parentNode.removeChild(e));
            e = document.querySelectorAll(".__docsify-view-source-container"),
                (o = Array.apply(null, e)).forEach(addPluginCodeClick)
        })
    };
window.$docsify = window.$docsify || {},
    window.$docsify.plugins = [viewSourcePlugin].concat(window.$docsify.plugins || []);