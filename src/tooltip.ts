import tooltopStyle from './tooltip.scss'

export default class Tooltip extends HTMLElement {

  #showTooltip: boolean
  #altExist: boolean

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);

    this.#showTooltip = true
    this.#altExist = false
  }

  connectedCallback() {
    if (this.shadowRoot !== null) {
      // DOM
      this.shadowRoot.innerHTML = this.template()

      const bubble = this.shadowRoot.querySelector(".bubble");
      const htmlSlot = this.shadowRoot.querySelector(
        'slot[name="tooltip-html"]'
      );
      const textSpan = this.shadowRoot.querySelector(".tooltip-text");

      // Style
      const styleElement = document.createElement('style')
      styleElement.appendChild(document.createTextNode(tooltopStyle))
      this.shadowRoot.appendChild(styleElement)

      // Events
      this.addEventListener("mouseenter", this.handleMouseEnter);
      this.addEventListener("mouseleave", this.handleMouseLeave);

      const _self = this
      if (htmlSlot !== null) {
        if (this.hasAttribute("alt")) {
          const altText = this.getAttribute("alt");
          if (
            textSpan !== null &&
            typeof altText === 'string' && altText.trim() !== ""
          ) {
            (htmlSlot as HTMLElement).style.display = "none";
            this.#altExist = true
            textSpan.textContent = altText;
          } else if (bubble !== null) {
            (bubble as HTMLSlotElement).style.display = "none";
          }
        } else if (bubble !== null) {
          (bubble as HTMLSlotElement).style.display = "none";
        }
        htmlSlot.addEventListener('slotchange', () => {
          const nodes = (htmlSlot as HTMLSlotElement).assignedNodes();
          if (!_self.#altExist) {
            if (nodes.length > 0) {
              (htmlSlot as HTMLElement).style.display = "block";
              (bubble as HTMLSlotElement).style.display = "";
            }
          }
        });
      }
    }
  }

  disconnectedCallback() {
    this.removeEventListener("mouseenter", this.handleMouseEnter);
    this.removeEventListener("mouseleave", this.handleMouseLeave);
  }

  handleMouseEnter() {
    if (this.shadowRoot !== null) {
      const bubble = this.shadowRoot.querySelector(".bubble");
      const tooltipContainer = this.shadowRoot.querySelector(".tooltip-container");
      if (bubble !== null && tooltipContainer !== null) {
        bubble.classList.remove("hidden");

        // check viewport boundary
        // 1. check top/bottom space
        const selfRect = tooltipContainer.getBoundingClientRect()
        this.style.setProperty('--slot-content-heght', `${selfRect.height}px`)
        const bubbleRect = bubble.getBoundingClientRect()
        if (selfRect.top < bubbleRect.height) {
          bubble.classList.add('bottom')
        } else {
          bubble.classList.remove('bottom')
        }
        // 2. check left/right space
        if (selfRect.left < bubbleRect.width / 2) {
          this.style.setProperty('--slot-shift-right', `${bubbleRect.width / 2 -
            selfRect.left -
            selfRect.width / 2 + 8
            }px`)
        } else if ((window.visualViewport!.width - selfRect.right) < bubbleRect.width / 2) {
          this.style.setProperty('--slot-shift-right', `-${bubbleRect.width / 2 -
            (window.visualViewport!.width - selfRect.right) -
            selfRect.width / 2 + 8
            }px`)
        }
      }
    }
  }

  handleMouseLeave() {
    if (this.shadowRoot !== null) {
      const bubble = this.shadowRoot.querySelector(".bubble");
      if (bubble !== null) {
        bubble.classList.add("hidden");
      }
    }
  }

  template() {
    return `
    <div class="tooltip-container">
      <div class="bubble hidden bottom">
        <slot name="tooltip-html"></slot>
        <span class="tooltip-text"></span>
      </div>
      <slot></slot>
    </div>
    `
  }
}
