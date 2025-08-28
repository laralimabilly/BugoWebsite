// Components - scripts/components.js

class BugoComponents {
    static init() {
        this.loadHeader();
        this.loadHero();
        this.loadFeatures();
        this.loadComparison();
        this.loadDownload();
        this.loadFooter();
    }

    static loadHeader() {
        const headerHTML = `
            <header id="header">
                <div class="container">
                    <div class="header-content">
                        <a href="#" class="logo">
                            <div class="logo-img">B</div>
                            <span>bugo</span>
                        </a>
                        <nav>
                            <ul class="nav">
                                <li><a href="#home">Home</a></li>
                                <li><a href="#features">Features</a></li>
                                <li><a href="#why">Why Bugo</a></li>
                                <li><a href="#download">Download</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
        `;
        document.getElementById('header-container').innerHTML = headerHTML;
    }

    static loadHero() {
        const heroHTML = `
            <section class="hero" id="home">
                <div class="container">
                    <div class="hero-content">
                        <div class="hero-text">
                            <h1>Never Leave Anything Behind</h1>
                            <p>Bugo uses smart geolocation to remind you of your belongings before you leave. No bluetooth tags, no complex setup - just pure location intelligence.</p>
                            <a href="#download" class="btn btn-primary cta-button">Get Bugo Now</a>
                        </div>
                        <div class="hero-visual">
                            <div class="phone-mockup glass">
                                <div>App Screenshot Placeholder</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Floating Elements -->
                <div class="floating-element floating-1"></div>
                <div class="floating-element floating-2"></div>
                <div class="floating-element floating-3"></div>
            </section>
        `;
        document.getElementById('hero-container').innerHTML = heroHTML;
    }

    static loadFeatures() {
        const featuresHTML = `
            <section class="what-it-does" id="features">
                <div class="container">
                    <div class="section-header">
                        <h2>How Bugo Works</h2>
                        <p>Simple, effective, and intelligent. Bugo learns your patterns and keeps track of your belongings using advanced geolocation technology.</p>
                    </div>
                    <div class="features-grid">
                        <div class="feature-card glass reveal-up stagger-1">
                            <div class="feature-icon">📍</div>
                            <h3>Add Your Items</h3>
                            <p>Simply add any item to your tracking list. Bugo automatically captures the location and sets smart distance thresholds.</p>
                        </div>
                        <div class="feature-card glass reveal-up stagger-2">
                            <div class="feature-icon">🌍</div>
                            <h3>Location Intelligence</h3>
                            <p>Our advanced geolocation technology monitors your distance from tracked items without draining your battery.</p>
                        </div>
                        <div class="feature-card glass reveal-up stagger-3">
                            <div class="feature-icon">🔔</div>
                            <h3>Smart Reminders</h3>
                            <p>Get timely notifications when you're moving away from your belongings, preventing you from leaving them behind.</p>
                        </div>
                    </div>
                </div>
            </section>
        `;
        document.getElementById('features-container').innerHTML = featuresHTML;
    }

    static loadComparison() {
        const comparisonHTML = `
            <section class="why-better" id="why">
                <div class="container">
                    <div class="comparison-grid">
                        <div class="comparison-content reveal-left">
                            <h2>Why Choose Bugo?</h2>
                            <ul class="comparison-list">
                                <li><strong>No Hardware Required:</strong> Unlike Bluetooth trackers, Bugo works with pure geolocation - no tags to buy or lose.</li>
                                <li><strong>Universal Compatibility:</strong> Track anything, anywhere - not limited by Bluetooth range or device compatibility.</li>
                                <li><strong>Battery Efficient:</strong> Smart location algorithms that don't drain your phone's battery.</li>
                                <li><strong>Instant Setup:</strong> Add items in seconds, no pairing or configuration needed.</li>
                                <li><strong>Cost Effective:</strong> One app, unlimited items - no per-item hardware costs.</li>
                            </ul>
                        </div>
                        <div class="comparison-visual reveal-right">
                            <div class="comparison-phones">
                                <div class="phone-old">Old Way: Tags & Bluetooth</div>
                                <div class="phone-new">Bugo: Pure GPS</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
        document.getElementById('comparison-container').innerHTML = comparisonHTML;
    }

    static loadDownload() {
        const downloadHTML = `
            <section class="download" id="download">
                <div class="container">
                    <div class="section-header reveal-up">
                        <h2>Get Bugo Today</h2>
                        <p>Join thousands of users who never leave anything behind. Download Bugo and experience the future of item tracking.</p>
                    </div>
                    <div class="download-buttons reveal-up">
                        <a href="#" class="download-btn primary">
                            <span>📱</span>
                            Download for iOS
                        </a>
                        <a href="#" class="download-btn">
                            <span>🤖</span>
                            Download for Android
                        </a>
                    </div>
                </div>
            </section>
        `;
        document.getElementById('download-container').innerHTML = downloadHTML;
    }

    static loadFooter() {
        const footerHTML = `
            <footer>
                <div class="container">
                    <div class="footer-content">
                        <div class="footer-brand">
                            <h3>bugo</h3>
                            <p>The smart way to never leave anything behind. Using advanced geolocation technology to keep track of your belongings.</p>
                        </div>
                        <div class="footer-links">
                            <h4>Product</h4>
                            <ul>
                                <li><a href="#">Features</a></li>
                                <li><a href="#">How it Works</a></li>
                                <li><a href="#">Pricing</a></li>
                                <li><a href="#">FAQ</a></li>
                            </ul>
                        </div>
                        <div class="footer-links">
                            <h4>Company</h4>
                            <ul>
                                <li><a href="#">About</a></li>
                                <li><a href="#">Privacy Policy</a></li>
                                <li><a href="#">Terms of Service</a></li>
                                <li><a href="#">Contact</a></li>
                            </ul>
                        </div>
                        <div class="footer-links">
                            <h4>Support</h4>
                            <ul>
                                <li><a href="#">Help Center</a></li>
                                <li><a href="#">Contact Support</a></li>
                                <li><a href="#">Bug Reports</a></li>
                                <li><a href="#">Feature Requests</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="footer-bottom">
                        <p>&copy; 2025 Bugo. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        `;
        document.getElementById('footer-container').innerHTML = footerHTML;
    }
}