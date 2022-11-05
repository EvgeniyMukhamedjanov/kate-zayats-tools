"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _IdeaMatrix_instances, _IdeaMatrix_$form, _IdeaMatrix_$keyPhraseInput, _IdeaMatrix_$categorySelect, _IdeaMatrix_$resultContainer, _IdeaMatrix_$resultTemplate, _IdeaMatrix_$loadingTemplate, _IdeaMatrix_$errorTemplate, _IdeaMatrix_state, _IdeaMatrix_abortController, _IdeaMatrix_addEvents, _IdeaMatrix_fetchResults, _IdeaMatrix_setState, _IdeaMatrix_render;
const attributes = {
    keyPhrase: 'data-idea-matrix-key-phrase',
    categorySelect: 'data-idea-matrix-category',
    resultContainer: 'data-idea-matrix-result',
    resultTemplate: 'data-idea-matrix-result-tmp',
    resultItem: 'data-idea-matrix-result-item',
    loadingTemplate: 'data-idea-matrix-loading-tmp',
    errorTemplate: 'data-idea-matrix-error-tmp'
};
class IdeaMatrix extends HTMLElement {
    constructor() {
        super();
        _IdeaMatrix_instances.add(this);
        _IdeaMatrix_$form.set(this, null);
        _IdeaMatrix_$keyPhraseInput.set(this, null);
        _IdeaMatrix_$categorySelect.set(this, null);
        _IdeaMatrix_$resultContainer.set(this, null);
        _IdeaMatrix_$resultTemplate.set(this, null);
        _IdeaMatrix_$loadingTemplate.set(this, null);
        _IdeaMatrix_$errorTemplate.set(this, null);
        _IdeaMatrix_state.set(this, {
            loading: false,
            error: false,
            items: []
        });
        _IdeaMatrix_abortController.set(this, null);
    }
    connectedCallback() {
        __classPrivateFieldSet(this, _IdeaMatrix_$form, this.querySelector(`form`), "f");
        if (!__classPrivateFieldGet(this, _IdeaMatrix_$form, "f"))
            throw new Error(`The form element isn't found`);
        __classPrivateFieldSet(this, _IdeaMatrix_$resultContainer, this.querySelector(`[${attributes.resultContainer}]`), "f");
        if (!__classPrivateFieldGet(this, _IdeaMatrix_$resultContainer, "f"))
            throw new Error(`The ${attributes.resultContainer} isn't found`);
        __classPrivateFieldSet(this, _IdeaMatrix_$resultTemplate, this.querySelector(`[${attributes.resultTemplate}]`), "f");
        if (!__classPrivateFieldGet(this, _IdeaMatrix_$resultTemplate, "f"))
            throw new Error(`The ${attributes.resultTemplate} isn't found`);
        __classPrivateFieldSet(this, _IdeaMatrix_$loadingTemplate, this.querySelector(`[${attributes.loadingTemplate}]`), "f");
        if (!__classPrivateFieldGet(this, _IdeaMatrix_$loadingTemplate, "f"))
            throw new Error(`The ${attributes.loadingTemplate} isn't found`);
        __classPrivateFieldSet(this, _IdeaMatrix_$errorTemplate, this.querySelector(`[${attributes.errorTemplate}]`), "f");
        if (!__classPrivateFieldGet(this, _IdeaMatrix_$errorTemplate, "f"))
            throw new Error(`The ${attributes.errorTemplate} isn't found`);
        __classPrivateFieldSet(this, _IdeaMatrix_$keyPhraseInput, this.querySelector(`input[${attributes.keyPhrase}]`), "f");
        __classPrivateFieldSet(this, _IdeaMatrix_$categorySelect, this.querySelector(`select[${attributes.categorySelect}]`), "f");
        __classPrivateFieldGet(this, _IdeaMatrix_instances, "m", _IdeaMatrix_addEvents).call(this);
    }
}
_IdeaMatrix_$form = new WeakMap(), _IdeaMatrix_$keyPhraseInput = new WeakMap(), _IdeaMatrix_$categorySelect = new WeakMap(), _IdeaMatrix_$resultContainer = new WeakMap(), _IdeaMatrix_$resultTemplate = new WeakMap(), _IdeaMatrix_$loadingTemplate = new WeakMap(), _IdeaMatrix_$errorTemplate = new WeakMap(), _IdeaMatrix_state = new WeakMap(), _IdeaMatrix_abortController = new WeakMap(), _IdeaMatrix_instances = new WeakSet(), _IdeaMatrix_addEvents = function _IdeaMatrix_addEvents() {
    __classPrivateFieldGet(this, _IdeaMatrix_$form, "f").addEventListener('submit', (event) => {
        event.preventDefault();
        __classPrivateFieldGet(this, _IdeaMatrix_instances, "m", _IdeaMatrix_fetchResults).call(this);
    });
}, _IdeaMatrix_fetchResults = function _IdeaMatrix_fetchResults() {
    return __awaiter(this, void 0, void 0, function* () {
        __classPrivateFieldGet(this, _IdeaMatrix_instances, "m", _IdeaMatrix_setState).call(this, { loading: true });
        if (__classPrivateFieldGet(this, _IdeaMatrix_abortController, "f")) {
            __classPrivateFieldGet(this, _IdeaMatrix_abortController, "f").abort();
        }
        __classPrivateFieldSet(this, _IdeaMatrix_abortController, new AbortController(), "f");
        try {
            const response = yield fetch('https://random-data-api.com/api/v2/appliances?size=12', {
                signal: __classPrivateFieldGet(this, _IdeaMatrix_abortController, "f").signal,
            });
            if (!response.ok)
                throw new Error(`Response error from the "${response.url}" URL`);
            const data = yield response.json();
            const state = {
                loading: false,
                error: false,
                items: []
            };
            let suffix = '';
            if (__classPrivateFieldGet(this, _IdeaMatrix_$keyPhraseInput, "f")) {
                suffix += ` ${__classPrivateFieldGet(this, _IdeaMatrix_$keyPhraseInput, "f").value}`;
            }
            if (__classPrivateFieldGet(this, _IdeaMatrix_$categorySelect, "f")) {
                suffix += ` in ${__classPrivateFieldGet(this, _IdeaMatrix_$categorySelect, "f").value}`;
            }
            if (Array.isArray(data)) {
                data.forEach(item => {
                    if ('equipment' in item)
                        state.items.push(item.equipment + suffix);
                });
            }
            __classPrivateFieldGet(this, _IdeaMatrix_instances, "m", _IdeaMatrix_setState).call(this, state);
        }
        catch (error) {
            if (!(error instanceof DOMException) || error.name !== "AbortError") {
                __classPrivateFieldGet(this, _IdeaMatrix_instances, "m", _IdeaMatrix_setState).call(this, {
                    loading: false,
                    error: true
                });
                throw error;
            }
        }
    });
}, _IdeaMatrix_setState = function _IdeaMatrix_setState(state) {
    __classPrivateFieldSet(this, _IdeaMatrix_state, Object.assign(Object.assign({}, __classPrivateFieldGet(this, _IdeaMatrix_state, "f")), state), "f");
    __classPrivateFieldGet(this, _IdeaMatrix_instances, "m", _IdeaMatrix_render).call(this);
}, _IdeaMatrix_render = function _IdeaMatrix_render() {
    if (__classPrivateFieldGet(this, _IdeaMatrix_state, "f").loading) {
        __classPrivateFieldGet(this, _IdeaMatrix_$resultContainer, "f").innerHTML = __classPrivateFieldGet(this, _IdeaMatrix_$loadingTemplate, "f").innerHTML;
        return;
    }
    if (__classPrivateFieldGet(this, _IdeaMatrix_state, "f").error) {
        __classPrivateFieldGet(this, _IdeaMatrix_$resultContainer, "f").innerHTML = __classPrivateFieldGet(this, _IdeaMatrix_$errorTemplate, "f").innerHTML;
        return;
    }
    __classPrivateFieldGet(this, _IdeaMatrix_$resultContainer, "f").innerHTML = __classPrivateFieldGet(this, _IdeaMatrix_$resultTemplate, "f").innerHTML;
    const $itemExample = __classPrivateFieldGet(this, _IdeaMatrix_$resultContainer, "f").querySelector(`[${attributes.resultItem}]`);
    if (!$itemExample)
        throw new Error(`The ${attributes.resultItem} isn't found`);
    const $itemsContainer = $itemExample.parentNode;
    $itemExample.remove();
    __classPrivateFieldGet(this, _IdeaMatrix_state, "f").items.forEach(item => {
        const $item = $itemExample.cloneNode();
        $item.textContent = item;
        $itemsContainer.appendChild($item);
    });
};
customElements.define("idea-matrix", IdeaMatrix);
