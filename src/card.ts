import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

class ProductCard extends LitElement {
  static styles = css`
    /* Add your CSS here */
    .card {
      border: 1px solid #cecece;
      padding: 8px;
      margin: 8px;
    }
    .card img {
      width: 100%;
    }
  `;

  @property({ type: Object })
  product = { image: '', title: '', description: '', price: '', category: '', rating: { rate: '', count: '' } };

  render() {
    return html`
      <div class="card">
        <img src="${this.product.image}" alt="${this.product.title}" />
        <h3>${this.product.title}</h3>
        <p>${this.product.description}</p>
        <p>Price: ${this.product.price}</p>
        <p>Category: ${this.product.category}</p>
        <p>Rating: ${this.product.rating.rate} (${this.product.rating.count} reviews)</p>
      </div>
    `;
  }
}

customElements.define('product-card', ProductCard);