// Bundle optimization recommendations for PadelHUB

// 1. Angular.json optimizations
{
  "configurations": {
    "production": {
      "optimization": {
        "scripts": true,
        "styles": true,
        "fonts": true
      },
      "buildOptimizer": true,
      "aot": true,
      "extractLicenses": true,
      "vendorChunk": true,
      "commonChunk": false,
      "namedChunks": false
    }
  }
}

// 2. Module imports optimization
// BEFORE (current):
import { MatModule } from '@angular/material';

// AFTER (optimized):
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

// 3. Lazy loading verification
// Check these routes are properly lazy loaded:
const lazyRoutes = [
  '/perfil',      // Profile component (119.79 KB)
  '/admin',       // Admin modules
  '/clubes',      // Club components
  '/rankings'     // Rankings
];

// 4. Bundle splitting strategy
// Consider splitting large features into micro-bundles:
const microBundles = {
  profile: ['profile', 'profile-stats', 'profile-history'],
  admin: ['admin-dashboard', 'admin-users', 'admin-clubs'],
  clubs: ['club-detail', 'club-edit', 'club-register']
};

// 5. Preloading strategy
export const routeConfig: PreloadingStrategy = {
  // Preload only critical user flows
  preload: (route, load) => {
    const criticalRoutes = ['/dashboard', '/clubes'];
    return criticalRoutes.includes(route.path) ? load() : of(null);
  }
};

// 6. Dynamic imports optimization
// Replace static imports with dynamic ones for non-critical features
// BEFORE:
import { HeavyChartsModule } from './charts';

// AFTER:
async loadCharts() {
  const { HeavyChartsModule } = await import('./charts');
  return HeavyChartsModule;
}

// 7. Bundle size monitoring
// Add to package.json scripts:
{
  "scripts": {
    "bundle:monitor": "ng build --prod && node bundle-analyzer.js",
    "bundle:limit": "bundlesize"
  },
  "bundlesize": [
    {
      "path": "dist/padelHUB/browser/main-*.js",
      "maxSize": "15 kB"
    },
    {
      "path": "dist/padelHUB/browser/chunk-*.js",
      "maxSize": "150 kB"
    }
  ]
}

// 8. Service Worker for caching
// Implement SW to cache chunks aggressively
const cacheStrategy = {
  initial: 'CacheFirst',    // Cache forever
  lazy: 'StaleWhileRevalidate', // Background updates
  css: 'CacheFirst'
};
