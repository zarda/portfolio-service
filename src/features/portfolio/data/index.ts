import { PortfolioRegistry } from './PortfolioRegistry';
import { hengtai25Portfolio } from './versions/hengtai25';
import { demoPortfolio } from './versions/demo';

// Register all portfolio versions
PortfolioRegistry.register('hengtai25', hengtai25Portfolio);
PortfolioRegistry.register('demo', demoPortfolio);

// Set default version (hengtai25 is the production version)
PortfolioRegistry.setDefault('hengtai25');

export { PortfolioRegistry };
export type { PortfolioVersion } from './PortfolioRegistry';
