import {LitElement, html, css} from 'lit';

export class MyCustomTreeElement extends LitElement {
  static properties = {
    items: {
      converter: (attrValue) => {
        if (attrValue) return JSON.parse(attrValue)
        else return undefined;
      },
    },
  };

  static styles = css`
    div {
      margin-left: 20px;
    }
  `;

  render() {

    return ('id' || 'items') in this.items && html`
      <div>
        ${Object.keys(this.items).map(key => {
          if(key === 'id') {
            return html`<div>${'items' in this.items ? html`&#128210;` : html`&#128209;`} ${this.items.id}</div>`
          } 
          if(key === 'items') {
            return this.items.items.map(item => 
              html`<my-custom-tree-element items="${JSON.stringify(item)}"></my-custom-tree-element>`
            )
          }
        })}
      </div>
    `;
  }
}
customElements.define('my-custom-tree-element', MyCustomTreeElement);
