import { LitElement, html } from "lit-element";

export class FORMPanel extends LitElement {
  static properties = {
    theme: { type: String },
  };

  constructor() {
    super();
    this.theme = "Testerino";
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div class="form-group">
        <label class="form-label" for="input-example-1">Theme</label>
        <input
          @input=${this.changeTheme}
          class="form-input"
          type="text"
          id="input-example-1"
          placeholder="${this.theme}"
        />
      </div>
    `;
  }

  changeTheme(event) {
    const input = event.target;
    this.theme = input.value;
  }
}

customElements.define("form-panel", FORMPanel);

// "src": ["<%= grunt.config.get(\"dev.website\") %>/lit/widgets.mjs"],
// "dest": "<%= grunt.config.get(\"prod.pages\") %>/js/widget-es6-compiled.js",
