import axios, { AxiosResponse } from 'axios';
import * as cheerio from 'cheerio';
import { ScanResult, SecurityCheck, PerformanceMetric, SEOCheck, AccessibilityCheck } from './types';

export class WebsiteScanner {
  private url: string;
  private baseUrl: string;

  constructor(url: string) {
    this.url = url;
    try {
      const urlObj = new URL(url);
      this.baseUrl = `${urlObj.protocol}//${urlObj.host}`;
    } catch {
      throw new Error('Invalid URL provided');
    }
  }

  private generateDemoResult(): ScanResult {
    return {
      url: this.url,
      date: new Date().toISOString(),
      security: {
        issues: [
          'Missing Content-Security-Policy header',
          'X-Frame-Options header not set'
        ],
        score: 75,
        checks: [
          { name: 'HTTPS Usage', status: 'pass', description: 'Site uses HTTPS encryption' },
          { name: 'HSTS', status: 'pass', description: 'HTTP Strict Transport Security is enabled' },
          { name: 'Content Security Policy', status: 'fail', description: 'CSP header is missing', recommendation: 'Implement Content-Security-Policy header' },
          { name: 'X-Frame-Options', status: 'fail', description: 'X-Frame-Options header not set', recommendation: 'Add X-Frame-Options header to prevent clickjacking' },
          { name: 'X-Content-Type-Options', status: 'pass', description: 'X-Content-Type-Options header is set' },
        ],
      },
      performance: {
        metrics: {
          'load_time': 1200,
          'ttfb': 300,
          'page_size': 245760,
          'resource_count': 15,
        },
        score: 85,
        details: {
          ttfb: 300,
          lcp: 1200,
          cls: 0.1,
          fid: 50,
          pageSize: 245760,
          loadTime: 1200,
        },
      },
      seo: {
        issues: ['Meta description is too short'],
        score: 90,
        checks: [
          { name: 'Title Tag', status: 'pass', description: 'Page has a title tag' },
          { name: 'Meta Description', status: 'warning', description: 'Meta description is too short', recommendation: 'Expand meta description to 150-160 characters' },
          { name: 'Heading Structure', status: 'pass', description: 'Found proper heading structure' },
          { name: 'Robots.txt', status: 'pass', description: 'Robots.txt file is accessible' },
          { name: 'Sitemap', status: 'pass', description: 'XML sitemap is available' },
        ],
      },
      accessibility: {
        issues: ['2 images missing alt text'],
        score: 80,
        checks: [
          { name: 'Alt Text', status: 'fail', description: '2 images missing alt text', recommendation: 'Add descriptive alt text to all images' },
          { name: 'Semantic HTML', status: 'pass', description: 'Uses semantic HTML elements' },
          { name: 'Keyboard Navigation', status: 'warning', description: 'Some elements may not be keyboard accessible', recommendation: 'Ensure all interactive elements are keyboard accessible' },
          { name: 'Color Contrast', status: 'pass', description: 'Text has sufficient color contrast' },
        ],
      },
      recommendations: [
        'Add Content-Security-Policy header to prevent XSS attacks',
        'Set X-Frame-Options header to prevent clickjacking',
        'Optimize images to improve load times',
        'Add alt text to all images for better accessibility',
        'Expand meta description to 150-160 characters',
      ],
    };
  }

  async performScan(): Promise<ScanResult> {
    const startTime = Date.now();
    
    // Demo mode for localhost or example URLs
    if (this.url.includes('localhost') || this.url.includes('example.com') || this.url.includes('test.com')) {
      return this.generateDemoResult();
    }
    
    try {
      // Fetch the main page
      const response = await axios.get(this.url, {
        timeout: 30000, // Increased timeout to 30 seconds
        validateStatus: () => true, // Accept all status codes
        headers: {
          'User-Agent': 'SiteSleuth/1.0 Mozilla/5.0 (compatible; website scanner)',
        },
        maxRedirects: 5,
      });

      const $ = cheerio.load(response.data);
      const endTime = Date.now();
      const loadTime = endTime - startTime;

      // Perform all checks
      const securityResults = await this.checkSecurity(response, $);
      const performanceResults = this.checkPerformance(response, loadTime, $);
      const seoResults = await this.checkSEO($);
      const accessibilityResults = this.checkAccessibility($);

      // Generate recommendations
      const recommendations = this.generateRecommendations(
        securityResults,
        performanceResults,
        seoResults,
        accessibilityResults
      );

      return {
        url: this.url,
        date: new Date().toISOString(),
        security: {
          issues: securityResults.filter(check => check.status === 'fail').map(check => check.description),
          score: this.calculateScore(securityResults),
          checks: securityResults,
        },
        performance: {
          metrics: performanceResults.reduce((acc, metric) => ({
            ...acc,
            [metric.name.toLowerCase().replace(/\s/g, '_')]: metric.value
          }), {}),
          score: this.calculateScore(performanceResults.map(m => ({ 
            status: m.status === 'good' ? 'pass' as const : m.status === 'needs-improvement' ? 'warning' as const : 'fail' as const
          }))),
          details: {
            ttfb: performanceResults.find(m => m.name === 'TTFB')?.value,
            lcp: performanceResults.find(m => m.name === 'Load Time')?.value,
            cls: 0, // Would need real browser metrics
            fid: 0, // Would need real browser metrics
            pageSize: response.data.length,
            loadTime,
          }
        },
        seo: {
          issues: seoResults.filter(check => check.status === 'fail').map(check => check.description),
          score: this.calculateScore(seoResults),
          checks: seoResults,
        },
        accessibility: {
          issues: accessibilityResults.filter(check => check.status === 'fail').map(check => check.description),
          score: this.calculateScore(accessibilityResults),
          checks: accessibilityResults,
        },
        recommendations
      };
    } catch (error) {
      console.error('Scanner error details:', error);
      
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNREFUSED') {
          throw new Error('Connection refused - the website may be down or unreachable');
        } else if (error.code === 'ENOTFOUND') {
          throw new Error('Website not found - please check the URL is correct');
        } else if (error.code === 'ETIMEDOUT' || error.message.includes('timeout')) {
          throw new Error('Request timeout - the website took too long to respond');
        } else if (error.response?.status) {
          throw new Error(`HTTP ${error.response.status}: ${error.response.statusText || 'Server error'}`);
        }
      }
      
      throw new Error(`Scan failed: ${error instanceof Error ? error.message : 'Unknown network error'}`);
    }
  }

  private async checkSecurity(response: AxiosResponse, $: cheerio.CheerioAPI): Promise<SecurityCheck[]> {
    const checks: SecurityCheck[] = [];
    const headers = response.headers;
    const htmlContent = $.html();
    const statusCode = response.status;

    // OWASP Top 10 - 1. Broken Access Control
    await this.checkBrokenAccessControl(checks, response, $);

    // OWASP Top 10 - 2. Cryptographic Failures
    await this.checkCryptographicFailures(checks, response, $);

    // OWASP Top 10 - 3. Injection
    this.checkInjectionVulnerabilities(checks, response, $);

    // OWASP Top 10 - 4. Insecure Design
    this.checkInsecureDesign(checks, response, $);

    // OWASP Top 10 - 5. Security Misconfiguration
    this.checkSecurityMisconfiguration(checks, headers, statusCode);

    // OWASP Top 10 - 6. Vulnerable and Outdated Components
    this.checkOutdatedComponents(checks, response, $);

    // OWASP Top 10 - 7. Identification and Authentication Failures
    this.checkAuthenticationFailures(checks, response, $);

    // OWASP Top 10 - 8. Software and Data Integrity Failures
    this.checkDataIntegrityFailures(checks, response, $);

    // OWASP Top 10 - 9. Security Logging and Monitoring Failures
    this.checkLoggingMonitoringFailures(checks, response, $);

    // OWASP Top 10 - 10. Server-Side Request Forgery (SSRF)
    await this.checkSSRFVulnerabilities(checks, response, $);

    return checks;
  }

  private checkPerformance(response: AxiosResponse, loadTime: number, $: cheerio.CheerioAPI): PerformanceMetric[] {
    const metrics: PerformanceMetric[] = [];

    // Load Time
    metrics.push({
      name: 'Load Time',
      value: loadTime,
      unit: 'ms',
      status: loadTime < 2000 ? 'good' : loadTime < 4000 ? 'needs-improvement' : 'poor'
    });

    // TTFB (approximated)
    const ttfb = loadTime * 0.3; // Rough approximation
    metrics.push({
      name: 'TTFB',
      value: ttfb,
      unit: 'ms',
      status: ttfb < 600 ? 'good' : ttfb < 1000 ? 'needs-improvement' : 'poor'
    });

    // Page Size
    const responseDataStr = typeof response.data === 'string' ? response.data : JSON.stringify(response.data);
    const pageSize = Buffer.byteLength(responseDataStr, 'utf8');
    metrics.push({
      name: 'Page Size',
      value: pageSize,
      unit: 'bytes',
      status: pageSize < 500000 ? 'good' : pageSize < 1000000 ? 'needs-improvement' : 'poor'
    });

    // Resource Count
    const resources = $('script, link[rel="stylesheet"], img').length;
    metrics.push({
      name: 'Resource Count',
      value: resources,
      unit: 'count',
      status: resources < 20 ? 'good' : resources < 50 ? 'needs-improvement' : 'poor'
    });

    return metrics;
  }

  private async checkSEO($: cheerio.CheerioAPI): Promise<SEOCheck[]> {
    const checks: SEOCheck[] = [];

    // Title Tag
    const title = $('title').text();
    checks.push({
      name: 'Title Tag',
      status: title && title.length > 0 ? 'pass' : 'fail',
      description: title 
        ? `Title tag present: "${title.substring(0, 50)}${title.length > 50 ? '...' : ''}"` 
        : 'Missing title tag',
      recommendation: 'Add a descriptive title tag (50-60 characters)'
    });

    // Meta Description
    const metaDescription = $('meta[name="description"]').attr('content');
    checks.push({
      name: 'Meta Description',
      status: metaDescription && metaDescription.length > 0 ? 'pass' : 'fail',
      description: metaDescription 
        ? `Meta description present (${metaDescription.length} chars)` 
        : 'Missing meta description',
      recommendation: 'Add a meta description (150-160 characters)'
    });

    // Heading Structure
    const h1Count = $('h1').length;
    checks.push({
      name: 'Heading Structure',
      status: h1Count === 1 ? 'pass' : h1Count === 0 ? 'fail' : 'warning',
      description: `Found ${h1Count} H1 tag(s)`,
      recommendation: 'Use exactly one H1 tag per page'
    });

    // Canonical URL
    const canonical = $('link[rel="canonical"]').attr('href');
    checks.push({
      name: 'Canonical URL',
      status: canonical ? 'pass' : 'warning',
      description: canonical ? 'Canonical URL is set' : 'No canonical URL specified',
      recommendation: 'Add a canonical URL to avoid duplicate content issues'
    });

    // Check for robots.txt
    try {
      await axios.get(`${this.baseUrl}/robots.txt`, { 
        timeout: 10000,
        headers: {
          'User-Agent': 'SiteSleuth/1.0 Mozilla/5.0 (compatible; website scanner)',
        }
      });
      checks.push({
        name: 'Robots.txt',
        status: 'pass',
        description: 'robots.txt file found',
      });
    } catch {
      checks.push({
        name: 'Robots.txt',
        status: 'warning',
        description: 'robots.txt file not found',
        recommendation: 'Create a robots.txt file to guide search engine crawling'
      });
    }

    // Check for sitemap
    try {
      await axios.get(`${this.baseUrl}/sitemap.xml`, { 
        timeout: 10000,
        headers: {
          'User-Agent': 'SiteSleuth/1.0 Mozilla/5.0 (compatible; website scanner)',
        }
      });
      checks.push({
        name: 'Sitemap',
        status: 'pass',
        description: 'XML sitemap found',
      });
    } catch {
      checks.push({
        name: 'Sitemap',
        status: 'warning',
        description: 'XML sitemap not found',
        recommendation: 'Create an XML sitemap to help search engines discover your pages'
      });
    }

    return checks;
  }

  private checkAccessibility($: cheerio.CheerioAPI): AccessibilityCheck[] {
    const checks: AccessibilityCheck[] = [];

    // Alt Text Check
    const images = $('img');
    const imagesWithoutAlt = images.filter((_, img) => !$(img).attr('alt')).length;
    checks.push({
      name: 'Alt Text',
      status: imagesWithoutAlt === 0 ? 'pass' : 'fail',
      description: `${imagesWithoutAlt} of ${images.length} images missing alt text`,
      recommendation: 'Add descriptive alt text to all images'
    });

    // ARIA Labels
    const ariaElements = $('[aria-label], [aria-labelledby], [aria-describedby]').length;
    const interactiveElements = $('button, input, select, textarea, a').length;
    checks.push({
      name: 'ARIA Labels',
      status: ariaElements > 0 ? 'pass' : interactiveElements > 0 ? 'warning' : 'pass',
      description: `${ariaElements} elements with ARIA labels found`,
      recommendation: 'Use ARIA labels for interactive elements without visible labels'
    });

    // Semantic HTML
    const semanticElements = $('main, nav, header, footer, section, article, aside').length;
    checks.push({
      name: 'Semantic HTML',
      status: semanticElements > 0 ? 'pass' : 'warning',
      description: `${semanticElements} semantic HTML elements found`,
      recommendation: 'Use semantic HTML elements (main, nav, header, footer, etc.)'
    });

    // Form Labels
    const inputs = $('input:not([type="hidden"]), textarea, select');
    let inputsWithLabels = 0;
    
    inputs.each((_, input) => {
      const id = $(input).attr('id');
      const hasLabel = id && $(`label[for="${id}"]`).length > 0;
      const hasAriaLabel = $(input).attr('aria-label') || $(input).attr('aria-labelledby');
      if (hasLabel || hasAriaLabel) {
        inputsWithLabels++;
      }
    });
    
    if (inputs.length > 0) {
      checks.push({
        name: 'Form Labels',
        status: inputsWithLabels === inputs.length ? 'pass' : 'fail',
        description: `${inputsWithLabels} of ${inputs.length} form inputs have proper labels`,
        recommendation: 'Associate all form inputs with descriptive labels'
      });
    }

    // Keyboard Navigation
    const focusableElements = $('a, button, input, textarea, select, [tabindex]');
    const elementsWithTabindex = $('[tabindex="-1"]').length;
    checks.push({
      name: 'Keyboard Navigation',
      status: elementsWithTabindex === 0 ? 'pass' : 'warning',
      description: `${focusableElements.length} focusable elements found`,
      recommendation: 'Ensure all interactive elements are keyboard accessible'
    });

    return checks;
  }

  private calculateScore(checks: Array<{ status: string }>): number {
    if (checks.length === 0) return 100;
    
    const passCount = checks.filter(check => check.status === 'pass').length;
    const warningCount = checks.filter(check => check.status === 'warning').length;
    
    // Pass = 1 point, Warning = 0.5 points, Fail = 0 points
    const totalPoints = passCount + (warningCount * 0.5);
    const maxPoints = checks.length;
    
    return Math.round((totalPoints / maxPoints) * 100);
  }

  private generateRecommendations(
    security: SecurityCheck[],
    performance: PerformanceMetric[],
    seo: SEOCheck[],
    accessibility: AccessibilityCheck[]
  ): string[] {
    const recommendations: string[] = [];

    // Collect all recommendations from failed checks
    [...security, ...seo, ...accessibility]
      .filter(check => check.status === 'fail' && check.recommendation)
      .forEach(check => {
        if (check.recommendation) {
          recommendations.push(check.recommendation);
        }
      });

    // Add performance recommendations
    performance
      .filter(metric => metric.status === 'poor')
      .forEach(metric => {
        switch (metric.name) {
          case 'Load Time':
            recommendations.push('Optimize images, enable compression, and use a CDN to improve load times');
            break;
          case 'TTFB':
            recommendations.push('Optimize server response time by improving database queries and caching');
            break;
          case 'Page Size':
            recommendations.push('Reduce page size by optimizing images, minifying CSS/JS, and removing unused code');
            break;
          case 'Resource Count':
            recommendations.push('Reduce HTTP requests by combining files, using sprites, and lazy loading');
            break;
        }
      });

    return recommendations;
  }

  // OWASP Top 10 - 1. Broken Access Control
  private async checkBrokenAccessControl(checks: SecurityCheck[], response: AxiosResponse, $: cheerio.CheerioAPI): Promise<void> {
    const url = new URL(this.url);
    
    // Check for common admin paths
    const adminPaths = ['/admin', '/administrator', '/wp-admin', '/cpanel', '/control-panel'];
    let adminPathsAccessible = 0;
    
    for (const path of adminPaths) {
      try {
        const adminResponse = await axios.get(`${url.origin}${path}`, {
          timeout: 5000,
          validateStatus: (status) => status < 500,
        });
        if (adminResponse.status === 200) {
          adminPathsAccessible++;
        }
      } catch {
        // Path not accessible or error - this is good
      }
    }

    checks.push({
      name: 'Access Control - Admin Paths',
      status: adminPathsAccessible === 0 ? 'pass' : 'fail',
      description: adminPathsAccessible > 0 
        ? `${adminPathsAccessible} admin paths are publicly accessible`
        : 'No publicly accessible admin paths found',
      recommendation: adminPathsAccessible > 0 
        ? 'Restrict access to administrative interfaces with proper authentication'
        : undefined
    });

    // Check for directory listing
    const hasDirectoryListing = response.data.includes('Index of /') || 
                               response.data.includes('Directory Listing') ||
                               response.data.includes('Parent Directory');
    
    checks.push({
      name: 'Access Control - Directory Listing',
      status: hasDirectoryListing ? 'fail' : 'pass',
      description: hasDirectoryListing 
        ? 'Directory listing is enabled'
        : 'Directory listing is properly disabled',
      recommendation: hasDirectoryListing 
        ? 'Disable directory listing to prevent information disclosure'
        : undefined
    });
  }

  // OWASP Top 10 - 2. Cryptographic Failures
  private async checkCryptographicFailures(checks: SecurityCheck[], response: AxiosResponse, $: cheerio.CheerioAPI): Promise<void> {
    // Check HTTPS usage
    const isHttps = this.url.startsWith('https://');
    checks.push({
      name: 'Cryptographic - HTTPS Usage',
      status: isHttps ? 'pass' : 'fail',
      description: isHttps ? 'Site uses HTTPS encryption' : 'Site is not using HTTPS',
      recommendation: isHttps ? undefined : 'Implement HTTPS to encrypt data in transit'
    });

    // Check HSTS header
    const hstsHeader = response.headers['strict-transport-security'];
    checks.push({
      name: 'Cryptographic - HSTS',
      status: hstsHeader ? 'pass' : 'fail',
      description: hstsHeader 
        ? 'HTTP Strict Transport Security is enabled' 
        : 'HSTS header is missing',
      recommendation: hstsHeader ? undefined : 'Add Strict-Transport-Security header to enforce HTTPS'
    });

    // Check for weak SSL/TLS configuration (basic check)
    if (isHttps) {
      // Check for mixed content
      const hasMixedContent = $('script[src^="http:"], link[href^="http:"], img[src^="http:"]').length > 0;
      checks.push({
        name: 'Cryptographic - Mixed Content',
        status: hasMixedContent ? 'fail' : 'pass',
        description: hasMixedContent 
          ? 'Site contains mixed content (HTTP resources on HTTPS page)'
          : 'No mixed content detected',
        recommendation: hasMixedContent 
          ? 'Replace all HTTP resources with HTTPS versions'
          : undefined
      });
    }
  }

  // OWASP Top 10 - 3. Injection
  private checkInjectionVulnerabilities(checks: SecurityCheck[], response: AxiosResponse, $: cheerio.CheerioAPI): void {
    const htmlContent = response.data.toLowerCase();

    // Check for potential SQL injection indicators
    const sqlErrorPatterns = [
      /sql.*error/i,
      /mysql.*error/i,
      /postgresql.*error/i,
      /ora-\d{5}/i,
      /microsoft.*odbc.*sql/i
    ];

    const hasSqlErrors = sqlErrorPatterns.some(pattern => pattern.test(htmlContent));
    checks.push({
      name: 'Injection - SQL Error Disclosure',
      status: hasSqlErrors ? 'fail' : 'pass',
      description: hasSqlErrors 
        ? 'SQL error messages found in response'
        : 'No SQL error messages detected',
      recommendation: hasSqlErrors 
        ? 'Implement proper error handling and input validation'
        : undefined
    });

    // Check for XSS protection headers
    const xssProtection = response.headers['x-xss-protection'];
    const csp = response.headers['content-security-policy'];
    
    checks.push({
      name: 'Injection - XSS Protection',
      status: (xssProtection || csp) ? 'pass' : 'fail',
      description: (xssProtection || csp) 
        ? 'XSS protection mechanisms detected'
        : 'No XSS protection headers found',
      recommendation: (xssProtection || csp) ? undefined 
        : 'Implement Content-Security-Policy and X-XSS-Protection headers'
    });

    // Check for unescaped user input patterns
    const forms = $('form');
    let hasUnsafeInputs = false;
    
    forms.each((_, form) => {
      const inputs = $(form).find('input, textarea');
      if (inputs.length > 0 && !$(form).find('input[type="hidden"][name*="token"]').length) {
        hasUnsafeInputs = true;
      }
    });

    if (forms.length > 0) {
      checks.push({
        name: 'Injection - CSRF Protection',
        status: hasUnsafeInputs ? 'warning' : 'pass',
        description: hasUnsafeInputs 
          ? 'Forms may lack CSRF protection tokens'
          : 'Forms appear to have CSRF protection',
        recommendation: hasUnsafeInputs 
          ? 'Implement CSRF tokens in all forms'
          : undefined
      });
    }
  }

  // OWASP Top 10 - 4. Insecure Design
  private checkInsecureDesign(checks: SecurityCheck[], response: AxiosResponse, $: cheerio.CheerioAPI): void {
    // Check for security.txt file
    // Note: This would require a separate request in a full implementation
    
    // Check for proper error handling
    const hasDetailedErrors = response.data.includes('stack trace') || 
                             response.data.includes('debug') ||
                             response.data.includes('exception');
    
    checks.push({
      name: 'Insecure Design - Error Information',
      status: hasDetailedErrors ? 'fail' : 'pass',
      description: hasDetailedErrors 
        ? 'Detailed error information exposed'
        : 'Error handling appears secure',
      recommendation: hasDetailedErrors 
        ? 'Implement generic error messages to avoid information disclosure'
        : undefined
    });

    // Check for rate limiting indicators
    const rateLimitHeaders = [
      'x-ratelimit-limit',
      'x-ratelimit-remaining',
      'retry-after'
    ].some(header => response.headers[header]);

    checks.push({
      name: 'Insecure Design - Rate Limiting',
      status: rateLimitHeaders ? 'pass' : 'warning',
      description: rateLimitHeaders 
        ? 'Rate limiting headers detected'
        : 'No rate limiting headers found',
      recommendation: rateLimitHeaders ? undefined 
        : 'Implement rate limiting to prevent abuse'
    });
  }

  // OWASP Top 10 - 5. Security Misconfiguration
  private checkSecurityMisconfiguration(checks: SecurityCheck[], headers: any, statusCode: number): void {
    // Check server header disclosure
    const serverHeader = headers.server;
    checks.push({
      name: 'Security Config - Server Disclosure',
      status: serverHeader ? 'warning' : 'pass',
      description: serverHeader 
        ? `Server information disclosed: ${serverHeader}`
        : 'Server information properly hidden',
      recommendation: serverHeader 
        ? 'Hide server version information to reduce attack surface'
        : undefined
    });

    // Check X-Powered-By header
    const poweredBy = headers['x-powered-by'];
    checks.push({
      name: 'Security Config - Technology Disclosure',
      status: poweredBy ? 'warning' : 'pass',
      description: poweredBy 
        ? `Technology stack disclosed: ${poweredBy}`
        : 'Technology stack properly hidden',
      recommendation: poweredBy 
        ? 'Remove X-Powered-By header to hide technology stack'
        : undefined
    });

    // Check for security headers
    const securityHeaders = [
      'x-content-type-options',
      'x-frame-options',
      'x-xss-protection',
      'content-security-policy',
      'referrer-policy'
    ];

    const missingHeaders = securityHeaders.filter(header => !headers[header]);
    checks.push({
      name: 'Security Config - Security Headers',
      status: missingHeaders.length === 0 ? 'pass' : missingHeaders.length <= 2 ? 'warning' : 'fail',
      description: missingHeaders.length === 0 
        ? 'All security headers are present'
        : `Missing ${missingHeaders.length} security headers: ${missingHeaders.join(', ')}`,
      recommendation: missingHeaders.length > 0 
        ? `Implement missing security headers: ${missingHeaders.join(', ')}`
        : undefined
    });

    // Check for default error pages
    const hasDefaultErrorPage = statusCode === 404 && 
                               (headers['server']?.toLowerCase().includes('apache') ||
                                headers['server']?.toLowerCase().includes('nginx') ||
                                headers['server']?.toLowerCase().includes('iis'));

    if (statusCode >= 400) {
      checks.push({
        name: 'Security Config - Error Pages',
        status: hasDefaultErrorPage ? 'warning' : 'pass',
        description: hasDefaultErrorPage 
          ? 'Default server error page detected'
          : 'Custom error handling implemented',
        recommendation: hasDefaultErrorPage 
          ? 'Implement custom error pages to avoid information disclosure'
          : undefined
      });
    }
  }

  // OWASP Top 10 - 6. Vulnerable and Outdated Components
  private checkOutdatedComponents(checks: SecurityCheck[], response: AxiosResponse, $: cheerio.CheerioAPI): void {
    // Check JavaScript libraries
    const scripts = $('script[src]');
    const libraries: string[] = [];
    
    scripts.each((_, script) => {
      const src = $(script).attr('src');
      if (src) {
        // Check for common libraries with version numbers
        const libraryPatterns = [
          /jquery[.-](\d+\.\d+\.\d+)/i,
          /bootstrap[.-](\d+\.\d+\.\d+)/i,
          /angular[.-](\d+\.\d+\.\d+)/i,
          /react[.-](\d+\.\d+\.\d+)/i,
          /lodash[.-](\d+\.\d+\.\d+)/i
        ];

        libraryPatterns.forEach(pattern => {
          const match = src.match(pattern);
          if (match) {
            libraries.push(`${pattern.source.split('[')[0]} v${match[1]}`);
          }
        });
      }
    });

    checks.push({
      name: 'Outdated Components - JavaScript Libraries',
      status: libraries.length > 0 ? 'warning' : 'pass',
      description: libraries.length > 0 
        ? `Detected libraries: ${libraries.join(', ')}`
        : 'No identifiable JavaScript library versions found',
      recommendation: libraries.length > 0 
        ? 'Check if JavaScript libraries are up to date and have no known vulnerabilities'
        : undefined
    });

    // Check for WordPress indicators
    const isWordPress = response.data.includes('wp-content') || 
                       response.data.includes('wp-includes') ||
                       $('meta[name="generator"]').attr('content')?.includes('WordPress');

    if (isWordPress) {
      checks.push({
        name: 'Outdated Components - WordPress',
        status: 'warning',
        description: 'WordPress detected - version check recommended',
        recommendation: 'Ensure WordPress core, themes, and plugins are updated to latest versions'
      });
    }
  }

  // OWASP Top 10 - 7. Identification and Authentication Failures
  private checkAuthenticationFailures(checks: SecurityCheck[], response: AxiosResponse, $: cheerio.CheerioAPI): void {
    // Check for login forms
    const loginForms = $('form').filter((_, form) => {
      const formHtml = $(form).html()?.toLowerCase() || '';
      return formHtml.includes('password') || 
             formHtml.includes('login') || 
             formHtml.includes('signin') ||
             formHtml.includes('username');
    });

    if (loginForms.length > 0) {
      // Check if login forms are over HTTPS
      const isSecureLogin = this.url.startsWith('https://');
      checks.push({
        name: 'Authentication - Secure Login',
        status: isSecureLogin ? 'pass' : 'fail',
        description: isSecureLogin 
          ? 'Login forms are served over HTTPS'
          : 'Login forms are not served over HTTPS',
        recommendation: isSecureLogin ? undefined 
          : 'Serve login forms over HTTPS to protect credentials'
      });

      // Check for autocomplete on password fields
      const passwordFields = $('input[type="password"]');
      let hasInsecureAutocomplete = false;
      
      passwordFields.each((_, field) => {
        const autocomplete = $(field).attr('autocomplete');
        if (autocomplete !== 'off' && autocomplete !== 'new-password' && autocomplete !== 'current-password') {
          hasInsecureAutocomplete = true;
        }
      });

      checks.push({
        name: 'Authentication - Password Autocomplete',
        status: hasInsecureAutocomplete ? 'warning' : 'pass',
        description: hasInsecureAutocomplete 
          ? 'Password fields may have insecure autocomplete settings'
          : 'Password fields have proper autocomplete configuration',
        recommendation: hasInsecureAutocomplete 
          ? 'Configure appropriate autocomplete attributes on password fields'
          : undefined
      });
    }

    // Check for session cookies
    const cookies = response.headers['set-cookie'];
    if (cookies && Array.isArray(cookies)) {
      const sessionCookies = cookies.filter(cookie => 
        cookie.toLowerCase().includes('session') || 
        cookie.toLowerCase().includes('jsessionid') ||
        cookie.toLowerCase().includes('phpsessid')
      );

      if (sessionCookies.length > 0) {
        const secureSessionCookies = sessionCookies.filter(cookie => 
          cookie.includes('Secure') && cookie.includes('HttpOnly')
        );

        checks.push({
          name: 'Authentication - Session Cookie Security',
          status: secureSessionCookies.length === sessionCookies.length ? 'pass' : 'fail',
          description: secureSessionCookies.length === sessionCookies.length 
            ? 'Session cookies are properly secured'
            : 'Session cookies lack proper security flags',
          recommendation: secureSessionCookies.length < sessionCookies.length 
            ? 'Add Secure and HttpOnly flags to all session cookies'
            : undefined
        });
      }
    }
  }

  // OWASP Top 10 - 8. Software and Data Integrity Failures
  private checkDataIntegrityFailures(checks: SecurityCheck[], response: AxiosResponse, $: cheerio.CheerioAPI): void {
    // Check for Subresource Integrity (SRI)
    const externalScripts = $('script[src]').filter((_, script) => {
      const src = $(script).attr('src');
      return !!(src && src.startsWith('http') && !src.includes(new URL(this.url).hostname));
    });

    let scriptsWithSRI = 0;
    externalScripts.each((_, script) => {
      if ($(script).attr('integrity')) {
        scriptsWithSRI++;
      }
    });

    if (externalScripts.length > 0) {
      checks.push({
        name: 'Data Integrity - Subresource Integrity',
        status: scriptsWithSRI === externalScripts.length ? 'pass' : 'fail',
        description: `${scriptsWithSRI} of ${externalScripts.length} external scripts use SRI`,
        recommendation: scriptsWithSRI < externalScripts.length 
          ? 'Add integrity attributes to external scripts and stylesheets'
          : undefined
      });
    }

    // Check for Content Security Policy
    const csp = response.headers['content-security-policy'];
    const hasStrictCSP = csp && (
      csp.includes("'strict-dynamic'") || 
      csp.includes("'nonce-") ||
      !csp.includes("'unsafe-inline'")
    );

    checks.push({
      name: 'Data Integrity - Content Security Policy',
      status: hasStrictCSP ? 'pass' : csp ? 'warning' : 'fail',
      description: hasStrictCSP 
        ? 'Strict Content Security Policy implemented'
        : csp 
          ? 'Basic Content Security Policy found'
          : 'No Content Security Policy detected',
      recommendation: !hasStrictCSP 
        ? 'Implement a strict Content Security Policy to prevent code injection'
        : undefined
    });
  }

  // OWASP Top 10 - 9. Security Logging and Monitoring Failures
  private checkLoggingMonitoringFailures(checks: SecurityCheck[], response: AxiosResponse, $: cheerio.CheerioAPI): void {
    // Check for security monitoring headers
    const monitoringHeaders = [
      'x-request-id',
      'x-correlation-id',
      'x-trace-id'
    ].filter(header => response.headers[header]);

    checks.push({
      name: 'Logging - Request Tracing',
      status: monitoringHeaders.length > 0 ? 'pass' : 'warning',
      description: monitoringHeaders.length > 0 
        ? `Request tracing headers found: ${monitoringHeaders.join(', ')}`
        : 'No request tracing headers detected',
      recommendation: monitoringHeaders.length === 0 
        ? 'Implement request tracing headers for better monitoring'
        : undefined
    });

    // Check for Web Application Firewall (WAF) indicators
    const wafHeaders = [
      'cf-ray', // Cloudflare
      'x-amz-cf-id', // AWS CloudFront
      'x-azure-ref', // Azure
      'server-timing' // Generic performance monitoring
    ].filter(header => response.headers[header]);

    checks.push({
      name: 'Logging - Security Monitoring',
      status: wafHeaders.length > 0 ? 'pass' : 'warning',
      description: wafHeaders.length > 0 
        ? 'Security monitoring/WAF indicators detected'
        : 'No obvious security monitoring detected',
      recommendation: wafHeaders.length === 0 
        ? 'Consider implementing a Web Application Firewall (WAF) for monitoring and protection'
        : undefined
    });
  }

  // OWASP Top 10 - 10. Server-Side Request Forgery (SSRF)
  private async checkSSRFVulnerabilities(checks: SecurityCheck[], response: AxiosResponse, $: cheerio.CheerioAPI): Promise<void> {
    // Check for URL parameters that might be vulnerable to SSRF
    const urlParams = new URL(this.url).searchParams;
    const suspiciousParams = ['url', 'link', 'src', 'source', 'target', 'redirect', 'uri', 'path'];
    
    const foundSuspiciousParams = Array.from(urlParams.keys()).filter(param => 
      suspiciousParams.some(suspicious => param.toLowerCase().includes(suspicious))
    );

    if (foundSuspiciousParams.length > 0) {
      checks.push({
        name: 'SSRF - Suspicious URL Parameters',
        status: 'warning',
        description: `Found potentially vulnerable URL parameters: ${foundSuspiciousParams.join(', ')}`,
        recommendation: 'Validate and sanitize URL parameters to prevent SSRF attacks'
      });
    }

    // Check for forms with URL inputs
    const urlInputs = $('input[type="url"], input[name*="url"], input[name*="link"]');
    if (urlInputs.length > 0) {
      checks.push({
        name: 'SSRF - URL Input Fields',
        status: 'warning',
        description: `Found ${urlInputs.length} URL input field(s)`,
        recommendation: 'Implement proper URL validation and allowlisting for URL inputs'
      });
    }

    // Check for webhook/callback functionality indicators
    const hasWebhookIndicators = response.data.toLowerCase().includes('webhook') ||
                                response.data.toLowerCase().includes('callback') ||
                                response.data.toLowerCase().includes('notify');

    if (hasWebhookIndicators) {
      checks.push({
        name: 'SSRF - Webhook/Callback Functionality',
        status: 'warning',
        description: 'Webhook or callback functionality detected',
        recommendation: 'Ensure webhook URLs are properly validated and use allowlisting'
      });
    }
  }
}

export async function runScan(url: string): Promise<ScanResult> {
  const scanner = new WebsiteScanner(url);
  return await scanner.performScan();
}
