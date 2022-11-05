interface StateInterface {
  loading: boolean;
  error: boolean;
  items: Array<string>;
}

const attributes = {
  keyPhrase: 'data-idea-matrix-key-phrase',
  categorySelect: 'data-idea-matrix-category',
  resultContainer: 'data-idea-matrix-result',
  resultTemplate: 'data-idea-matrix-result-tmp',
  resultItem: 'data-idea-matrix-result-item',
  loadingTemplate: 'data-idea-matrix-loading-tmp',
  errorTemplate: 'data-idea-matrix-error-tmp'
}

class IdeaMatrix extends HTMLElement {
  #$form: HTMLFormElement | null = null;
  #$keyPhraseInput: HTMLInputElement | null = null;
  #$categorySelect: HTMLSelectElement | null = null;
  #$resultContainer: Element | null = null;
  #$resultTemplate: Element | null = null;
  #$loadingTemplate: Element | null = null;
  #$errorTemplate: Element | null = null;

  #state: StateInterface = {
    loading: false,
    error: false,
    items: []
  }

  #abortController: AbortController | null = null;

  constructor() {
    super();
  }

  connectedCallback() {
    this.#$form = this.querySelector(`form`);
    if (!this.#$form)
      throw new Error(`The form element isn't found`);

    this.#$resultContainer = this.querySelector(`[${ attributes.resultContainer }]`);
    if (!this.#$resultContainer)
      throw new Error(`The ${ attributes.resultContainer } isn't found`);

    this.#$resultTemplate = this.querySelector(`[${ attributes.resultTemplate }]`);
    if (!this.#$resultTemplate)
      throw new Error(`The ${ attributes.resultTemplate } isn't found`);

    this.#$loadingTemplate = this.querySelector(`[${ attributes.loadingTemplate }]`);
    if (!this.#$loadingTemplate)
      throw new Error(`The ${ attributes.loadingTemplate } isn't found`);

    this.#$errorTemplate = this.querySelector(`[${ attributes.errorTemplate }]`);
    if (!this.#$errorTemplate)
      throw new Error(`The ${ attributes.errorTemplate } isn't found`);

    this.#$keyPhraseInput = this.querySelector(`input[${ attributes.keyPhrase }]`);

    this.#$categorySelect = this.querySelector(`select[${ attributes.categorySelect }]`);

    this.#addEvents();
  }

  #addEvents() {
    this.#$form!.addEventListener('submit', (event: Event) => {
      event.preventDefault();
      this.#fetchResults();
    });
  }

  async #fetchResults() {
    this.#setState({ loading: true });

    if (this.#abortController) {
      this.#abortController.abort();
    }
    this.#abortController = new AbortController();

    try {
      const response = await fetch('https://random-data-api.com/api/v2/appliances?size=12', {
        signal: this.#abortController.signal,
      });
      if (!response.ok)
        throw new Error(`Response error from the "${response.url}" URL`);

      const data = await response.json();
      const state: StateInterface = {
        loading: false, 
        error: false, 
        items: []
      };
      let suffix = ''
      if (this.#$keyPhraseInput) {
        suffix += ` ${ this.#$keyPhraseInput.value }`;
      }
      if (this.#$categorySelect) {
        suffix += ` in ${ this.#$categorySelect.value }`;
      }

      if (Array.isArray(data)) {
        data.forEach(item => {
          if ('equipment' in item)
            state.items.push(item.equipment + suffix);
        })
      }
      this.#setState(state);

    } catch (error) {
      if (!(error instanceof DOMException) || error.name !== "AbortError") {
        this.#setState({ 
          loading: false, 
          error: true
        });
        throw error;
      }
    }
  }

  #setState(state: Partial<StateInterface>) {
    this.#state = { ...this.#state, ...state };
    this.#render();
  }

  #render() {
    if (this.#state.loading) {
      this.#$resultContainer!.innerHTML = this.#$loadingTemplate!.innerHTML;
      return;
    }

    if (this.#state.error) {
      this.#$resultContainer!.innerHTML = this.#$errorTemplate!.innerHTML;
      return;
    }

    this.#$resultContainer!.innerHTML = this.#$resultTemplate!.innerHTML;
    const $itemExample = this.#$resultContainer!.querySelector(`[${ attributes.resultItem }]`);
    if (!$itemExample)
      throw new Error(`The ${ attributes.resultItem } isn't found`);

    const $itemsContainer = $itemExample.parentNode!;
    $itemExample.remove();

    this.#state.items.forEach(item => {
      const $item = $itemExample.cloneNode();
      $item.textContent = item;
      $itemsContainer.appendChild($item);
    })
  }
}
customElements.define("idea-matrix", IdeaMatrix);