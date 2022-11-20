interface StateInterface {
  url: string | null;
  deviceCategory: string;
}
enum DeviceCategory {
  Desktop = 'desktop',
  Tablet = 'tablet',
  Mobile = 'mobile'
};

const attributes = {
  urlInput: 'data-responsive-frame-url',
  caterogyInput: 'data-responsive-frame-device-cat',
  iframeContainer: 'data-responsive-frame-iframe-container'
}

class ResponsiveFrame extends HTMLElement {
  #$form: HTMLFormElement | null = null;
  #$iframe: HTMLIFrameElement | null = null;
  #$urlInput: HTMLInputElement | null = null;
  #$iframeContainer: HTMLElement | null = null;
  #$caterogyInputs: Array<HTMLInputElement> = [];
  #defaultDeviceCategory: string = DeviceCategory.Desktop;

  #state: StateInterface = {
    url: null,
    deviceCategory: this.#defaultDeviceCategory
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.#$form = this.querySelector(`form`);
    if (!this.#$form)
      throw new Error(`The form element isn't found`);

    this.#$iframe = this.querySelector(`iframe`);
    if (!this.#$iframe)
      throw new Error(`The iframe element isn't found`);

    this.#$urlInput = this.querySelector(`input[${ attributes.urlInput }]`);
    if (!this.#$urlInput)
      throw new Error(`The ${ attributes.urlInput } element isn't found`);

    this.#$iframeContainer = this.querySelector(`[${ attributes.iframeContainer }]`);
    if (!this.#$iframeContainer)
      throw new Error(`The ${ attributes.iframeContainer } element isn't found`);

    this.#$caterogyInputs = Array.from(this.querySelectorAll(`input[${ attributes.caterogyInput }]`));

    this.#addEvents();
  }

  #addEvents() {
    this.#$form!.addEventListener('submit', (event: Event) => {
      event.preventDefault();
      this.#setState({
        url: this.#$urlInput!.value || null
      })
      this.#refreshIframe();
    });

    this.#$caterogyInputs.forEach($item => {
      $item.addEventListener('change', () => {
        const $checked = this.#$caterogyInputs.find($item => $item.checked);
        if ($checked && $checked.value) {
          this.#setState({
            deviceCategory: $checked.value
          });
        } else {
          this.#setState({
            deviceCategory: this.#defaultDeviceCategory
          });
        }
      })
    })
  }

  #refreshIframe() {
    this.#$iframe!.src = this.#state.url || '';
  }

  #setState(state: Partial<StateInterface>) {
    if (state.url) {
      if (state.url.indexOf('http://') !== 0 && state.url.indexOf('https://') !== 0) {
        state.url = '//' + state.url;
      }
    }
    this.#state = { ...this.#state, ...state };
    this.#render();
  }

  #render() {
    this.#$caterogyInputs.forEach($item => {
      $item.checked = $item.value === this.#state.deviceCategory;
    });

    let width = 'auto';
    if (this.#state.deviceCategory === DeviceCategory.Tablet) {
      width = '768px';
    } else if (this.#state.deviceCategory === DeviceCategory.Mobile) {
      width = '460px';
    }
    this.#$iframeContainer!.style.width = width;
  }
}
customElements.define("responsive-frame", ResponsiveFrame);

export {}