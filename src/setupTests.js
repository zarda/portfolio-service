import '@testing-library/jest-dom/vitest'

// Mock matchMedia - must be before PortfolioService initialization
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => {},
    }),
});

// Initialize portfolio data layer for tests
import '@/features/portfolio/data'
import { PortfolioService } from '@/features/portfolio/services/PortfolioService'

// Initialize PortfolioService for all tests
PortfolioService.initialize()

// Mock IntersectionObserver
class IntersectionObserver {
    constructor(callback, options) {
        this.callback = callback;
        this.options = options;
    }
    observe(element) {
        // Simulate intersection immediately for testing purposes
        this.callback([{ isIntersecting: true, target: element }]);
    }
    unobserve() {
        return null;
    }
    disconnect() {
        return null;
    }
}

global.IntersectionObserver = IntersectionObserver;
