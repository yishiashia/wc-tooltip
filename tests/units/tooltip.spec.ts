import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/dom';
import Tooltip from '../../src/tooltip'

describe('Tooltip', () => {
  window.customElements.define('wc-tooltip', Tooltip);

  beforeAll(() => {
    // Mocking window.visualViewport
    const mockVisualViewport = {
      width: 1024,
      height: 768,
      offsetLeft: 0,
      offsetTop: 0,
      pageLeft: 0,
      pageTop: 0,
      scale: 1,
    };
    Object.defineProperty(window, 'visualViewport', {
      value: mockVisualViewport,
    });
  })

  // Render test cases
  test('Must render `alt` attribute when passed', () => {
    const tooltipMsg = 'tooltip message';
    document.body.innerHTML = `
      <wc-tooltip alt="${tooltipMsg}"><span>target</span></wc-tooltip>
    `
    const customElement = document.querySelector('wc-tooltip');
    expect(customElement).not.toBeNull();
    if (customElement !== null && customElement.shadowRoot !== null) {
      const buubleRef = customElement.shadowRoot.querySelector('.bubble')
      if (buubleRef !== null) {
        expect(buubleRef.textContent === tooltipMsg)
      } else {
        fail("shadow dom not mount")
      }
    } else {
      fail("shadow dom not mount")
    }
  });

  test('Mouse enter event on the slotted element', async () => {
    document.body.innerHTML = `
      <wc-tooltip alt="Hello"><span>target</span></wc-tooltip>
    `
    const customElement = document.querySelector('wc-tooltip');
    expect(customElement).not.toBeNull();

    if (customElement !== null && customElement.shadowRoot !== null) {
      await fireEvent.mouseEnter(customElement, {
        bubbles: true,
        cancelable: true,
      })
      const buubleRef = customElement.shadowRoot.querySelector('.bubble')
      expect(buubleRef).not.toBeNull()
      if (buubleRef !== null) {
        expect(buubleRef).not.toHaveClass('hidden')
      }
    }
  })

  test('Test with HTML slot (1)', async () => {
    document.body.innerHTML = `
      <wc-tooltip>
        <div slot="tooltip-html">
          <h3>title</h3>
          <hr/>
          <p>123123</p>
        </div>
        <span>target</span>
      </wc-tooltip>
    `
    const customElement = document.querySelector('wc-tooltip');
    expect(customElement).not.toBeNull();

    if (customElement !== null && customElement.shadowRoot !== null) {
      await fireEvent.mouseEnter(customElement, {
        bubbles: true,
        cancelable: true,
      })
      const buubleRef = customElement.shadowRoot.querySelector('.bubble')
      expect(buubleRef).not.toBeNull()
      if (buubleRef !== null) {
        expect(buubleRef).not.toHaveClass('hidden')
      }
    }
  })

  test('Test with HTML slot (2)', async () => {
    document.body.innerHTML = `
      <wc-tooltip alt>
        <div slot="tooltip-html">
          <h3>title</h3>
          <hr/>
          <p>123123</p>
        </div>
        <span>target</span>
      </wc-tooltip>
    `
    const customElement = document.querySelector('wc-tooltip');
    expect(customElement).not.toBeNull();

    if (customElement !== null && customElement.shadowRoot !== null) {
      await fireEvent.mouseEnter(customElement, {
        bubbles: true,
        cancelable: true,
      })
      const buubleRef = customElement.shadowRoot.querySelector('.bubble')
      expect(buubleRef).not.toBeNull()
      if (buubleRef !== null) {
        expect(buubleRef).not.toHaveClass('hidden')
      }
    }
  })

  test('Show on bottom when top space is not enough', async () => {
    document.body.innerHTML = `
      <wc-tooltip alt="Hello"><span>target</span></wc-tooltip>
    `
    const customElement = document.querySelector('wc-tooltip');
    expect(customElement).not.toBeNull();

    if (customElement !== null && customElement.shadowRoot !== null) {
      const buubleRef = customElement.shadowRoot.querySelector('.bubble')
      expect(buubleRef).not.toBeNull()
      if (buubleRef !== null) {
        // Mocking htmlElement.getBoundingClientRect()
        jest.spyOn(customElement, 'getBoundingClientRect').mockImplementation(() => ({
          top: 20,
          left: 0,
          width: 100,
          height: 100,
          right: 100,
          bottom: 100,
        }));
        jest.spyOn(buubleRef, 'getBoundingClientRect').mockImplementation(() => ({
          top: 20,
          left: 0,
          width: 100,
          height: 100,
          right: 100,
          bottom: 100,
        }));

        await fireEvent.mouseEnter(customElement, {
          bubbles: true,
          cancelable: true,
        })
        expect(buubleRef).not.toHaveClass('hidden')
        expect(buubleRef).toHaveClass('bottom')
        expect(customElement.style.getPropertyValue('--slot-shift-right')).toBe('-8px')

      }
    }
  })

  test('Show on bottom when right space is not enough', async () => {
    document.body.innerHTML = `
      <wc-tooltip alt="Hello"><span>target</span></wc-tooltip>
    `
    const customElement = document.querySelector('wc-tooltip');
    expect(customElement).not.toBeNull();

    if (customElement !== null && customElement.shadowRoot !== null) {
      const buubleRef = customElement.shadowRoot.querySelector('.bubble')
      expect(buubleRef).not.toBeNull()
      if (buubleRef !== null) {
        // Mocking htmlElement.getBoundingClientRect()
        jest.spyOn(customElement, 'getBoundingClientRect').mockImplementation(() => ({
          top: 20,
          left: 55,
          width: 100,
          height: 100,
          right: 1000,
          bottom: 100,
        }));
        jest.spyOn(buubleRef, 'getBoundingClientRect').mockImplementation(() => ({
          top: 20,
          left: 0,
          width: 100,
          height: 100,
          right: 100,
          bottom: 100,
        }));

        await fireEvent.mouseEnter(customElement, {
          bubbles: true,
          cancelable: true,
        })
        expect(buubleRef).not.toHaveClass('hidden')
        expect(customElement.style.getPropertyValue('--slot-shift-right')).toBe('-16px')
      }
    }
  })

  test('Mouse leave event on the slotted element', async () => {
    document.body.innerHTML = `
      <wc-tooltip alt="Hello"><span>target</span></wc-tooltip>
    `
    const customElement = document.querySelector('wc-tooltip');
    expect(customElement).not.toBeNull();

    if (customElement !== null && customElement.shadowRoot !== null) {
      await fireEvent.mouseEnter(customElement, {
        bubbles: true,
        cancelable: true,
      })
      const buubleRef = customElement.shadowRoot.querySelector('.bubble')
      expect(buubleRef).not.toBeNull()
      if (buubleRef !== null) {
        expect(buubleRef).not.toHaveClass('hidden')
        await fireEvent.mouseLeave(customElement, {
          bubbles: true,
          cancelable: true,
        })
        expect(buubleRef).toHaveClass('hidden')
      }
    }
  })

});
