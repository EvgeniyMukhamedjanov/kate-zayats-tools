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
var _IdeaMatrix_instances, _IdeaMatrix_$form, _IdeaMatrix_$keyPhraseInput, _IdeaMatrix_$keyPhraseCleanButton, _IdeaMatrix_$keyPhraseGenerationButton, _IdeaMatrix_$randomButton, _IdeaMatrix_$categorySelect, _IdeaMatrix_$resultContainer, _IdeaMatrix_$resultTemplate, _IdeaMatrix_$loadingTemplate, _IdeaMatrix_$errorTemplate, _IdeaMatrix_state, _IdeaMatrix_abortControllerKeyPhrase, _IdeaMatrix_abortControllerResult, _IdeaMatrix_addEvents, _IdeaMatrix_fetchKeyPhrase, _IdeaMatrix_fetchResults, _IdeaMatrix_setState, _IdeaMatrix_render;
const attributes = {
    keyPhrase: 'data-idea-matrix-key-phrase',
    keyPhraseCleanButton: 'data-idea-matrix-key-phrase-clean',
    keyPhraseGenerationButton: 'data-idea-matrix-key-phrase-generate',
    categorySelect: 'data-idea-matrix-category',
    randomButton: 'data-idea-matrix-random',
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
        _IdeaMatrix_$keyPhraseCleanButton.set(this, null);
        _IdeaMatrix_$keyPhraseGenerationButton.set(this, null);
        _IdeaMatrix_$randomButton.set(this, null);
        _IdeaMatrix_$categorySelect.set(this, null);
        _IdeaMatrix_$resultContainer.set(this, null);
        _IdeaMatrix_$resultTemplate.set(this, null);
        _IdeaMatrix_$loadingTemplate.set(this, null);
        _IdeaMatrix_$errorTemplate.set(this, null);
        _IdeaMatrix_state.set(this, {
            keyPhraseGeneration: false,
            loading: false,
            error: false,
            items: []
        });
        _IdeaMatrix_abortControllerKeyPhrase.set(this, null);
        _IdeaMatrix_abortControllerResult.set(this, null);
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
        __classPrivateFieldSet(this, _IdeaMatrix_$keyPhraseCleanButton, this.querySelector(`[${attributes.keyPhraseCleanButton}]`), "f");
        __classPrivateFieldSet(this, _IdeaMatrix_$keyPhraseGenerationButton, this.querySelector(`[${attributes.keyPhraseGenerationButton}]`), "f");
        __classPrivateFieldSet(this, _IdeaMatrix_$randomButton, this.querySelector(`[${attributes.randomButton}]`), "f");
        __classPrivateFieldSet(this, _IdeaMatrix_$categorySelect, this.querySelector(`select[${attributes.categorySelect}]`), "f");
        __classPrivateFieldGet(this, _IdeaMatrix_instances, "m", _IdeaMatrix_addEvents).call(this);
    }
}
_IdeaMatrix_$form = new WeakMap(), _IdeaMatrix_$keyPhraseInput = new WeakMap(), _IdeaMatrix_$keyPhraseCleanButton = new WeakMap(), _IdeaMatrix_$keyPhraseGenerationButton = new WeakMap(), _IdeaMatrix_$randomButton = new WeakMap(), _IdeaMatrix_$categorySelect = new WeakMap(), _IdeaMatrix_$resultContainer = new WeakMap(), _IdeaMatrix_$resultTemplate = new WeakMap(), _IdeaMatrix_$loadingTemplate = new WeakMap(), _IdeaMatrix_$errorTemplate = new WeakMap(), _IdeaMatrix_state = new WeakMap(), _IdeaMatrix_abortControllerKeyPhrase = new WeakMap(), _IdeaMatrix_abortControllerResult = new WeakMap(), _IdeaMatrix_instances = new WeakSet(), _IdeaMatrix_addEvents = function _IdeaMatrix_addEvents() {
    __classPrivateFieldGet(this, _IdeaMatrix_$form, "f").addEventListener('submit', (event) => {
        event.preventDefault();
        __classPrivateFieldGet(this, _IdeaMatrix_instances, "m", _IdeaMatrix_fetchResults).call(this);
    });
    if (__classPrivateFieldGet(this, _IdeaMatrix_$keyPhraseCleanButton, "f") && __classPrivateFieldGet(this, _IdeaMatrix_$keyPhraseInput, "f")) {
        __classPrivateFieldGet(this, _IdeaMatrix_$keyPhraseCleanButton, "f").addEventListener('click', () => {
            if (__classPrivateFieldGet(this, _IdeaMatrix_$keyPhraseInput, "f")) {
                __classPrivateFieldGet(this, _IdeaMatrix_$keyPhraseInput, "f").value = '';
            }
        });
    }
    if (__classPrivateFieldGet(this, _IdeaMatrix_$keyPhraseGenerationButton, "f") && __classPrivateFieldGet(this, _IdeaMatrix_$keyPhraseInput, "f")) {
        __classPrivateFieldGet(this, _IdeaMatrix_$keyPhraseGenerationButton, "f").addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            if (yield __classPrivateFieldGet(this, _IdeaMatrix_instances, "m", _IdeaMatrix_fetchKeyPhrase).call(this))
                __classPrivateFieldGet(this, _IdeaMatrix_instances, "m", _IdeaMatrix_fetchResults).call(this);
        }));
    }
    if (__classPrivateFieldGet(this, _IdeaMatrix_$randomButton, "f")) {
        __classPrivateFieldGet(this, _IdeaMatrix_$randomButton, "f").addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (__classPrivateFieldGet(this, _IdeaMatrix_$categorySelect, "f")) {
                const optionsLength = (_a = __classPrivateFieldGet(this, _IdeaMatrix_$categorySelect, "f").querySelectorAll('option')) === null || _a === void 0 ? void 0 : _a.length;
                if (optionsLength > 1) {
                    const randomOptionIndex = Math.floor(Math.random() * (optionsLength - 1 + 1) + 1);
                    const $randomOption = __classPrivateFieldGet(this, _IdeaMatrix_$categorySelect, "f").querySelector(`option:nth-child(${randomOptionIndex})`);
                    if ($randomOption && $randomOption instanceof HTMLOptionElement) {
                        $randomOption.selected = true;
                    }
                    // this.#$categorySelect.querySelector(`option:nth-child(${ randomOption })`)?.selected = true;
                }
            }
            if (__classPrivateFieldGet(this, _IdeaMatrix_$keyPhraseInput, "f")) {
                yield __classPrivateFieldGet(this, _IdeaMatrix_instances, "m", _IdeaMatrix_fetchKeyPhrase).call(this);
            }
            __classPrivateFieldGet(this, _IdeaMatrix_instances, "m", _IdeaMatrix_fetchResults).call(this);
        }));
    }
}, _IdeaMatrix_fetchKeyPhrase = function _IdeaMatrix_fetchKeyPhrase() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!__classPrivateFieldGet(this, _IdeaMatrix_$keyPhraseInput, "f"))
            return;
        __classPrivateFieldGet(this, _IdeaMatrix_instances, "m", _IdeaMatrix_setState).call(this, { keyPhraseGeneration: true });
        if (__classPrivateFieldGet(this, _IdeaMatrix_abortControllerKeyPhrase, "f")) {
            __classPrivateFieldGet(this, _IdeaMatrix_abortControllerKeyPhrase, "f").abort();
        }
        __classPrivateFieldSet(this, _IdeaMatrix_abortControllerKeyPhrase, new AbortController(), "f");
        try {
            const response = yield fetch('https://random-data-api.com/api/v2/appliances', {
                signal: __classPrivateFieldGet(this, _IdeaMatrix_abortControllerKeyPhrase, "f").signal,
            });
            if (!response.ok)
                throw new Error(`Response error from the "${response.url}" URL`);
            const data = yield response.json();
            if (data instanceof Object && 'equipment' in data)
                __classPrivateFieldGet(this, _IdeaMatrix_$keyPhraseInput, "f").value = data.equipment;
            __classPrivateFieldGet(this, _IdeaMatrix_instances, "m", _IdeaMatrix_setState).call(this, { keyPhraseGeneration: false });
            return true;
        }
        catch (error) {
            if (!(error instanceof DOMException) || error.name !== "AbortError") {
                __classPrivateFieldGet(this, _IdeaMatrix_instances, "m", _IdeaMatrix_setState).call(this, { keyPhraseGeneration: false });
                throw error;
            }
        }
    });
}, _IdeaMatrix_fetchResults = function _IdeaMatrix_fetchResults() {
    return __awaiter(this, void 0, void 0, function* () {
        __classPrivateFieldGet(this, _IdeaMatrix_instances, "m", _IdeaMatrix_setState).call(this, { loading: true });
        if (__classPrivateFieldGet(this, _IdeaMatrix_abortControllerResult, "f")) {
            __classPrivateFieldGet(this, _IdeaMatrix_abortControllerResult, "f").abort();
        }
        __classPrivateFieldSet(this, _IdeaMatrix_abortControllerResult, new AbortController(), "f");
        try {
            const response = yield fetch('https://random-data-api.com/api/v2/appliances?size=12', {
                signal: __classPrivateFieldGet(this, _IdeaMatrix_abortControllerResult, "f").signal,
            });
            if (!response.ok)
                throw new Error(`Response error from the "${response.url}" URL`);
            const data = yield response.json();
            const state = {
                keyPhraseGeneration: __classPrivateFieldGet(this, _IdeaMatrix_state, "f").keyPhraseGeneration,
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
    if (__classPrivateFieldGet(this, _IdeaMatrix_$keyPhraseInput, "f")) {
        __classPrivateFieldGet(this, _IdeaMatrix_$keyPhraseInput, "f").disabled = __classPrivateFieldGet(this, _IdeaMatrix_state, "f").keyPhraseGeneration;
    }
    if (__classPrivateFieldGet(this, _IdeaMatrix_state, "f").loading) {
        __classPrivateFieldGet(this, _IdeaMatrix_$resultContainer, "f").innerHTML = __classPrivateFieldGet(this, _IdeaMatrix_$loadingTemplate, "f").innerHTML;
        return;
    }
    if (__classPrivateFieldGet(this, _IdeaMatrix_state, "f").error) {
        __classPrivateFieldGet(this, _IdeaMatrix_$resultContainer, "f").innerHTML = __classPrivateFieldGet(this, _IdeaMatrix_$errorTemplate, "f").innerHTML;
        return;
    }
    if (__classPrivateFieldGet(this, _IdeaMatrix_state, "f").items.length === 0) {
        __classPrivateFieldGet(this, _IdeaMatrix_$resultContainer, "f").innerHTML = '';
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
