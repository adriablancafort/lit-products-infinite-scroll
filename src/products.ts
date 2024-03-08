import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import './card';

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

class ProductGrid extends LitElement {
    static styles = css`
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        }
        .title {
            text-align: center;
        }
    `;

    @property({ type: Array })
    products: Product[] = [];

    page = 1;

    connectedCallback() {
        super.connectedCallback();
        this.loadProducts();
        window.addEventListener('scroll', () => this.handleScroll());
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener('scroll', () => this.handleScroll());
    }

    handleScroll() {
        const scrollTop = (document.documentElement 
                           && document.documentElement.scrollTop) 
                           || document.body.scrollTop;
        const scrollHeight = (document.documentElement 
                              && document.documentElement.scrollHeight) 
                              || document.body.scrollHeight;
        const clientHeight = document.documentElement.clientHeight 
                             || window.innerHeight;
        const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

        if (scrolledToBottom) {
            this.page++;
            this.loadProducts();
        }
    }

    loadProducts() {
        fetch(`https://fakestoreapi.com/products?page=${this.page}`)
            .then(response => response.json())
            .then(data => this.products = [...this.products, ...data]);
    }

    render() {
        return html`
            <h1 class="title">Products</h1>
            <div class="grid">
                ${this.products.map(product => html`<product-card .product=${product}></product-card>`)}
            </div>
        `;
    }
}

customElements.define('product-grid', ProductGrid);