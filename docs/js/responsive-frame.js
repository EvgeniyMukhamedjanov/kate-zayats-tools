var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _ResponsiveFrame_instances, _ResponsiveFrame_$form, _ResponsiveFrame_$iframe, _ResponsiveFrame_$urlInput, _ResponsiveFrame_$iframeContainer, _ResponsiveFrame_$caterogyInputs, _ResponsiveFrame_defaultDeviceCategory, _ResponsiveFrame_state, _ResponsiveFrame_addEvents, _ResponsiveFrame_refreshIframe, _ResponsiveFrame_setState, _ResponsiveFrame_render;
var DeviceCategory;
(function (DeviceCategory) {
    DeviceCategory["Desktop"] = "desktop";
    DeviceCategory["Tablet"] = "tablet";
    DeviceCategory["Mobile"] = "mobile";
})(DeviceCategory || (DeviceCategory = {}));
;
const attributes = {
    urlInput: 'data-responsive-frame-url',
    caterogyInput: 'data-responsive-frame-device-cat',
    iframeContainer: 'data-responsive-frame-iframe-container'
};
class ResponsiveFrame extends HTMLElement {
    constructor() {
        super();
        _ResponsiveFrame_instances.add(this);
        _ResponsiveFrame_$form.set(this, null);
        _ResponsiveFrame_$iframe.set(this, null);
        _ResponsiveFrame_$urlInput.set(this, null);
        _ResponsiveFrame_$iframeContainer.set(this, null);
        _ResponsiveFrame_$caterogyInputs.set(this, []);
        _ResponsiveFrame_defaultDeviceCategory.set(this, DeviceCategory.Desktop);
        _ResponsiveFrame_state.set(this, {
            url: null,
            deviceCategory: __classPrivateFieldGet(this, _ResponsiveFrame_defaultDeviceCategory, "f")
        });
    }
    connectedCallback() {
        __classPrivateFieldSet(this, _ResponsiveFrame_$form, this.querySelector(`form`), "f");
        if (!__classPrivateFieldGet(this, _ResponsiveFrame_$form, "f"))
            throw new Error(`The form element isn't found`);
        __classPrivateFieldSet(this, _ResponsiveFrame_$iframe, this.querySelector(`iframe`), "f");
        if (!__classPrivateFieldGet(this, _ResponsiveFrame_$iframe, "f"))
            throw new Error(`The iframe element isn't found`);
        __classPrivateFieldSet(this, _ResponsiveFrame_$urlInput, this.querySelector(`input[${attributes.urlInput}]`), "f");
        if (!__classPrivateFieldGet(this, _ResponsiveFrame_$urlInput, "f"))
            throw new Error(`The ${attributes.urlInput} element isn't found`);
        __classPrivateFieldSet(this, _ResponsiveFrame_$iframeContainer, this.querySelector(`[${attributes.iframeContainer}]`), "f");
        if (!__classPrivateFieldGet(this, _ResponsiveFrame_$iframeContainer, "f"))
            throw new Error(`The ${attributes.iframeContainer} element isn't found`);
        __classPrivateFieldSet(this, _ResponsiveFrame_$caterogyInputs, Array.from(this.querySelectorAll(`input[${attributes.caterogyInput}]`)), "f");
        __classPrivateFieldGet(this, _ResponsiveFrame_instances, "m", _ResponsiveFrame_addEvents).call(this);
    }
}
_ResponsiveFrame_$form = new WeakMap(), _ResponsiveFrame_$iframe = new WeakMap(), _ResponsiveFrame_$urlInput = new WeakMap(), _ResponsiveFrame_$iframeContainer = new WeakMap(), _ResponsiveFrame_$caterogyInputs = new WeakMap(), _ResponsiveFrame_defaultDeviceCategory = new WeakMap(), _ResponsiveFrame_state = new WeakMap(), _ResponsiveFrame_instances = new WeakSet(), _ResponsiveFrame_addEvents = function _ResponsiveFrame_addEvents() {
    __classPrivateFieldGet(this, _ResponsiveFrame_$form, "f").addEventListener('submit', (event) => {
        event.preventDefault();
        __classPrivateFieldGet(this, _ResponsiveFrame_instances, "m", _ResponsiveFrame_setState).call(this, {
            url: __classPrivateFieldGet(this, _ResponsiveFrame_$urlInput, "f").value || null
        });
        __classPrivateFieldGet(this, _ResponsiveFrame_instances, "m", _ResponsiveFrame_refreshIframe).call(this);
    });
    __classPrivateFieldGet(this, _ResponsiveFrame_$caterogyInputs, "f").forEach($item => {
        $item.addEventListener('change', () => {
            const $checked = __classPrivateFieldGet(this, _ResponsiveFrame_$caterogyInputs, "f").find($item => $item.checked);
            if ($checked && $checked.value) {
                __classPrivateFieldGet(this, _ResponsiveFrame_instances, "m", _ResponsiveFrame_setState).call(this, {
                    deviceCategory: $checked.value
                });
            }
            else {
                __classPrivateFieldGet(this, _ResponsiveFrame_instances, "m", _ResponsiveFrame_setState).call(this, {
                    deviceCategory: __classPrivateFieldGet(this, _ResponsiveFrame_defaultDeviceCategory, "f")
                });
            }
        });
    });
}, _ResponsiveFrame_refreshIframe = function _ResponsiveFrame_refreshIframe() {
    __classPrivateFieldGet(this, _ResponsiveFrame_$iframe, "f").src = __classPrivateFieldGet(this, _ResponsiveFrame_state, "f").url || '';
}, _ResponsiveFrame_setState = function _ResponsiveFrame_setState(state) {
    if (state.url) {
        if (state.url.indexOf('http://') !== 0 && state.url.indexOf('https://') !== 0) {
            state.url = '//' + state.url;
        }
    }
    __classPrivateFieldSet(this, _ResponsiveFrame_state, Object.assign(Object.assign({}, __classPrivateFieldGet(this, _ResponsiveFrame_state, "f")), state), "f");
    __classPrivateFieldGet(this, _ResponsiveFrame_instances, "m", _ResponsiveFrame_render).call(this);
}, _ResponsiveFrame_render = function _ResponsiveFrame_render() {
    __classPrivateFieldGet(this, _ResponsiveFrame_$caterogyInputs, "f").forEach($item => {
        $item.checked = $item.value === __classPrivateFieldGet(this, _ResponsiveFrame_state, "f").deviceCategory;
    });
    let width = 'auto';
    if (__classPrivateFieldGet(this, _ResponsiveFrame_state, "f").deviceCategory === DeviceCategory.Tablet) {
        width = '768px';
    }
    else if (__classPrivateFieldGet(this, _ResponsiveFrame_state, "f").deviceCategory === DeviceCategory.Mobile) {
        width = '460px';
    }
    __classPrivateFieldGet(this, _ResponsiveFrame_$iframeContainer, "f").style.width = width;
};
customElements.define("responsive-frame", ResponsiveFrame);
export {};
