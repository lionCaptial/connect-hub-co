import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export async function runHomeLandingTestSuite() {
  const results: { name: string; status: 'PASSED' | 'FAILED'; error?: string }[] = [];
  const assert = (condition: boolean, message: string) => {
    if (!condition) throw new Error(`Assertion failed: ${message}`);
  };

  try {
    const themePath = resolve(process.cwd(), 'apps/web/src/styles/public-theme.css');
    const theme = readFileSync(themePath, 'utf8');
    for (const token of [
      '--ch-bg',
      '--ch-bg-elevated',
      '--ch-ink',
      '--ch-ink-muted',
      '--ch-accent',
      '--ch-accent-soft',
      '--ch-gold',
      '--ch-gold-soft',
      '--ch-hero-overlay',
    ]) {
      assert(theme.includes(token), `public-theme.css defines ${token}`);
    }
    results.push({ name: 'Public theme tokens exist', status: 'PASSED' });
  } catch (err: unknown) {
    results.push({ name: 'Public theme tokens exist', status: 'FAILED', error: String(err) });
  }

  try {
    const headerPath = resolve(
      process.cwd(),
      'apps/web/src/components/auth/PublicHeader.tsx',
    );
    const footerPath = resolve(
      process.cwd(),
      'apps/web/src/components/auth/BusinessFooter.tsx',
    );
    const headerStylesPath = resolve(
      process.cwd(),
      'apps/web/src/components/auth/PublicHeader.module.css',
    );
    const header =
      readFileSync(headerPath, 'utf8') + readFileSync(headerStylesPath, 'utf8');
    const footer = readFileSync(footerPath, 'utf8');
    assert(header.includes('--ch-') || header.includes('var(--ch-'), 'header uses public tokens');
    assert(footer.includes('--ch-') || footer.includes('var(--ch-'), 'footer uses public tokens');
    results.push({ name: 'Public chrome uses shared tokens', status: 'PASSED' });
  } catch (err: unknown) {
    results.push({
      name: 'Public chrome uses shared tokens',
      status: 'FAILED',
      error: String(err),
    });
  }

  try {
    const { shouldShowPublicChrome } = await import('../config/publicShellVisibility');
    for (const hiddenPath of [
      '/admin',
      '/admin/users',
      '/dashboard',
      '/dashboard/settings',
      '/login',
      '/register',
      '/service/requests/123',
    ]) {
      assert(!shouldShowPublicChrome(hiddenPath), `public chrome is hidden on ${hiddenPath}`);
    }
    for (const visiblePath of ['/', '/about', '/request', '/services']) {
      assert(shouldShowPublicChrome(visiblePath), `public chrome is visible on ${visiblePath}`);
    }
    results.push({ name: 'Public chrome visibility is shared', status: 'PASSED' });
  } catch (err: unknown) {
    results.push({
      name: 'Public chrome visibility is shared',
      status: 'FAILED',
      error: String(err),
    });
  }

  try {
    const { homeLandingContent } = await import('../features/home-landing/content');
    assert(homeLandingContent.brand === 'Holy Yatra', 'brand lock');
    assert(homeLandingContent.slides.length === 5, 'five hero slides');
    const hrefs = homeLandingContent.slides.map((s) => s.cta.href);
    assert(hrefs.includes('/pitru-moksha-gaya'), 'includes PitruMoksha Gaya');
    assert(hrefs.includes('/ritual-services'), 'includes Ritual Services');
    assert(hrefs.includes('/travel-assistance'), 'includes Travel Assistance');
    assert(hrefs.includes('/vahi-records'), 'includes Vahi Records');
    assert(hrefs.includes('/religious-partners'), 'includes Verified Priest route');
    results.push({ name: 'Home landing content + routes', status: 'PASSED' });
  } catch (err: unknown) {
    results.push({ name: 'Home landing content + routes', status: 'FAILED', error: String(err) });
  }

  try {
    const pagePath = resolve(process.cwd(), 'apps/web/src/app/page.tsx');
    const page = readFileSync(pagePath, 'utf8');
    assert(page.includes('HomeLanding'), 'page.tsx renders HomeLanding');
    assert(!page.includes('BusinessHome'), 'page.tsx no longer uses BusinessHome scaffold');
    assert(!page.includes('PublicHeroShell'), 'homepage does not use PublicHeroShell');
    results.push({ name: 'Homepage entry uses HomeLanding', status: 'PASSED' });
  } catch (err: unknown) {
    results.push({ name: 'Homepage entry uses HomeLanding', status: 'FAILED', error: String(err) });
  }

  try {
    const assurancePath = resolve(
      process.cwd(),
      'apps/web/src/features/home-landing/components/ServiceAssuranceSection.tsx',
    );
    const assurance = readFileSync(assurancePath, 'utf8');
    assert(assurance.includes('item.image.src'), 'assurance visual renders the configured image');
    assert(assurance.includes('item.image.alt'), 'assurance image uses configured alt text');
    assert(assurance.includes('onError'), 'assurance image has a placeholder fallback');
    results.push({ name: 'Assurance visuals render configured images', status: 'PASSED' });
  } catch (err: unknown) {
    results.push({
      name: 'Assurance visuals render configured images',
      status: 'FAILED',
      error: String(err),
    });
  }

  try {
    const landingPath = resolve(
      process.cwd(),
      'apps/web/src/features/home-landing/HomeLanding.tsx',
    );
    const landing = readFileSync(landingPath, 'utf8');
    assert(!landing.includes('WhyUsSection'), 'home does not render duplicate Why Us content');
    assert(
      !existsSync(
        resolve(
          process.cwd(),
          'apps/web/src/features/home-landing/components/WhyUsSection.tsx',
        ),
      ),
      'unused WhyUsSection is deleted',
    );
    assert(
      !existsSync(
        resolve(process.cwd(), 'apps/web/src/features/home-landing/whyUsAccordion.ts'),
      ),
      'unused Why Us accordion helper is deleted',
    );
    const { homeLandingContent } = await import('../features/home-landing/content');
    assert(!('whyUs' in homeLandingContent), 'unused Why Us content is deleted');
    results.push({ name: 'Home omits duplicate Why Us section', status: 'PASSED' });
  } catch (err: unknown) {
    results.push({
      name: 'Home omits duplicate Why Us section',
      status: 'FAILED',
      error: String(err),
    });
  }

  try {
    const headerStylesPath = resolve(
      process.cwd(),
      'apps/web/src/components/auth/PublicHeader.module.css',
    );
    const headerStyles = readFileSync(headerStylesPath, 'utf8');
    assert(headerStyles.includes('brandMarkGlow'), 'header brand mark has glow layer');
    assert(headerStyles.includes('brandMarkBreathe'), 'header brand mark has breathe animation');
    assert(headerStyles.includes('brandMarkGlowBreathe'), 'header glow layer animates');
    assert(
      headerStyles.includes('@media (prefers-reduced-motion: reduce)'),
      'header brand mark respects reduced motion',
    );
    assert(
      !existsSync(
        resolve(
          process.cwd(),
          'apps/web/src/features/home-landing/components/LotusEnergyEmblem.tsx',
        ),
      ),
      'hero LotusEnergyEmblem is removed',
    );
    results.push({ name: 'Brand mark animation lives in header', status: 'PASSED' });
  } catch (err: unknown) {
    results.push({
      name: 'Brand mark animation lives in header',
      status: 'FAILED',
      error: String(err),
    });
  }

  return results;
}

if (require.main === module) {
  void runHomeLandingTestSuite().then((results) => {
    console.log(results);
    if (results.some((r) => r.status === 'FAILED')) process.exit(1);
  });
}
