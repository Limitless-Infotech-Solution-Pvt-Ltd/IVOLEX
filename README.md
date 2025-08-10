Project goal
Rearrange and redesign every screen/page of IXOLEX into a production-quality development preview build with pixel-polished UI/UX, an accessible design system, working interactions, and a complete admin interface for content management.

Global rules & design system
Theme: modern e-commerce: minimal, spacious, high-contrast CTAs, soft shadows, rounded cards (2xl), consistent 8px grid.

Tokens: provide palette (primary, secondary, neutral, success, warning, danger), font-family (e.g., Inter / system fallback), type scale (h1, h2, h3, body, caption), spacing scale, elevation tokens.

Motion: define 3 motion levels (micro: 120–180ms for hover/pulse; mid: 300–450ms for modals/menus; large: 600ms for page transitions). Use easing: cubic-bezier(0.2, 0.9, 0.3, 1).

Accessibility: WCAG AA minimum; keyboard nav, visible focus states, alt text for images, proper ARIA for dynamic components, color contrast ≥4.5:1 for body text.

Performance: lazy load product images, use responsive image sizes, SSR where feasible for SEO.

Responsive & ratio rules
Auto-detect device ratio and adapt layout (auto fetch parent screen ratio):

Desktop: ≥1280px — 4+ column layout for product lists.

Tablet: 768–1279px — 2 column grid or a single centered card column depending on ratio.

Mobile: <768px — single column, touch-friendly targets ≥44px.

In addition to breakpoints, create a “ratio-aware” container that scales components (card aspect ratios, image crops, carousel height) based on viewport height/width ratio to optimize above-the-fold content.

Navbar (header)
Transparent background by default (navbar BG transparent). When content scrolls under, keep navbar visually separate with subtle backdrop-blur or a translucent gradient if needed.

Sticky and always visible (position: sticky/top:0).

Parent-Match behavior:

Always display the parent category or “parent match” badge (small pill next to nav items) when user is within a subcategory or product page (so users always know which top-level section they’re in).

Buttons:

Pop-up micro-animation on mouse hover (slight scale up + shadow + Tooltip optional).

Highlight the opened tab (active tab underline or colored pill).

Keyboard accessible, focus-visible with clear outline.

Secondary items: search (typeahead), cart icon with live count, account menu, locale/currency toggle.

Home page (public)
Hero / Sliding Product Item view

Full-width carousel with product cards (auto slide loop interval: 1.5 seconds).

Hover behavior: when mouse is over the carousel, pause the auto sliding.

Product click: navigates to Product Page (deep link).

Carousel must support keyboard controls (left/right) and focusable slides.

Each slide card shows image, product name, price, quick-view CTA (opens quick modal).

Three section icons

Immediately under carousel: three large icon CTAs (prominent, tappable). These map to major flows (e.g., Shop, Services, Offers) or highlight three core categories—visual emphasis for conversion.

On hover/tap: subtle pop & shadow; on click: route to targeted section.

Product Category Main

After icons: horizontally scrollable category strip (or grid depending on ratio) listing main categories:

Furniture — opens Furniture Category page

EV Electronics — opens EV Electronics Category page

Leather — opens Leather Category page

Each main category has its own Category Page showing:

Hero with category image & description

Sub-categories (cards or filter chips) derived from product taxonomy

Product grid with sort & filter

SEO-friendly structured data

Sales & Offers

Below categories: dynamic lists / carousels for Sales, Clearance, Bundle Offers, Trending.

These lists are filterable, and each card shows badge (e.g., “20% OFF”), countdown where applicable.

Other blocks

Featured brands, recommendations (personalized), newsletter opt-in, footer with links.

Product Page
Hero gallery (gallery thumbnails, zoom, responsive lazy images).

Title, rating, price, variant selector, stock status.

Add to Cart & Buy Now CTAs prominently.

Sticky product info summary on desktop (right column pinned).

Tabs: Description, Specs, Reviews, Shipping & Returns, Q&A.

Related Products & Upsells below.

Admin Panel (complete)
Design and implement full admin app with a focus on content management and live preview.

Core admin features (screens)
Dashboard (KPIs: sales, traffic, low stock, recent orders)

Products: list / create / edit / bulk import (CSV/XLSX) / variant manager / media manager (drag & drop, crop)

Categories: create main categories, sub-categories, reorder (drag), parent-match metadata

Orders: list, detail, status update, invoice download

Customers: list, segmentation, notes

Promotions & Offers: create coupons, flash sales, countdowns, target segments

Content: CMS for homepage blocks, banners, static pages (WYSIWYG with preview)

Menus & Navbar: edit nav items, set parent relationships, visibility, icons

Users & Roles: role-based access control (Admin, Editor, Sales, Support)

Settings: Payment gateways, shipping zones/rates, taxes, locales/currencies

Analytics: simple traffic & conversion charts and export

Audit logs + activity feed

Preview & Publish workflow (Draft / Staged / Live)

API keys and integrations screen

Functionality requirements
Every admin screen supports CRUD with validation and inline help.

Media manager: image optimization, multiple sizes, alt text editor, search by tag.

Realtime preview of homepage changes (stage -> live publish).

Role-based controls for who can publish.

Bulk actions & import/export.

Comprehensive error-handling and success toasts.

Interactions & animations (explicit)
Navbar hover: pop-up micro animation (scale 1.04, translateY -2px, shadow) 140ms.

Active tab: colored underline / pill that animates width on change (300ms).

Carousel: fade/slide transitions; loop interval 1500ms; pause on hover; touch-swipe enabled; accessible ARIA attributes.

Cards: hover lift (scale + 8px translation), quick add button fades in.

Modal & Drawer: use mid motion (300–400ms), backdrop blur, close on ESC.

Page transitions: subtle cross-fade or slide on route change (600ms).

Data & API expectations
Provide REST/GraphQL endpoints for:

/products (list, filters, pagination)

/products/:id (details)

/categories (hierarchy)

/cart, /checkout, /orders

/admin/* endpoints for CRUD

Client should fetch product images at multiple sizes (srcset).

Provide mock seed data for development (100–500 products across categories).

Component inventory (deliver as a library)
Navbar, Footer

Carousel, ProductCard, CategoryCard

IconButton, PrimaryButton, SecondaryButton

Form inputs, Select, MultiSelect, Chips

Modal, Drawer, Tooltip, Toast

Pagination, InfiniteScroll

Admin Table, Editor, MediaManager, RolePicker

Skeleton loaders & error states

QA & acceptance criteria
Responsive behavior verified at breakpoints (mobile, 375px; tablet, 768px; desktop, 1366px).

Navbar always visible and transparent; active tab highlight and parent-match pill persist correctly in subpages.

Carousel autoslides every 1.5s, pauses on hover, resumes after hover end, clickable slide opens product page.

All category pages reachable via homepage; subcategories present and products render correctly.

Admin CRUD works end-to-end: create product → publish → visible on front-end preview.

Keyboard accessible (tab order, enter to activate links, ESC closes modals).

Lighthouse performance score ≥ 80, accessibility ≥ 90.

Unit tests for critical components and end-to-end smoke test for key flows (browse → add to cart → checkout stub).

Deliverables & handoff
Figma / Sketch files with annotated components and tokens.
Production-ready React (or chosen framework) component library + Storybook.
Full dev preview build URL (staging) or Dockerized app with seed data.
API spec (OpenAPI/GraphQL schema) and mock server for front-end dev.
Test reports (accessibility, Lighthouse), and changelog.
Handoff checklist and README with run/build/test steps.
Rebuild Project IXOLEX as a development preview build with a full UI/UX redesign for every screen (public + admin). Implement a sticky, transparent navbar whose buttons show a parent-match state that’s always visible; buttons have pop-up micro-animations on hover and the active tab is highlighted. Auto-detect and adapt layout ratio for Desktop / Tablet / Mobile. Home: sliding product carousel (1.5s per slide loop) that pauses on hover and opens product page on click; below the carousel show three large section icons, then Product Categories (Main: Furniture, EV Electronics, Leather) each with category & subcategory pages, then dynamic sales/offers lists. Build full admin panel with CRUD screens for every content section, media manager, user/role management, and live preview. Provide design system (components, tokens, motion), responsive breakpoints, accessibility, tests, and handoff-ready assets.
Project Title:
IVOLEX E-Commerce Platform – Full UI/UX Redesign with Advanced Features & Functional Interface

Primary Objective:
Before installing any Node modules, complete all remaining UI/UX tasks for the IVOLEX platform, ensuring every single screen is built, refined, and fully functional. Deliver a production-ready frontend with modern design patterns, interactive animations, and advanced e-commerce features.

Execution Requirements:
	1.	Complete All Screens
	•	Implement every missing page from the design scope:
	•	Homepage (Hero, Featured Products, New Arrivals, Sale)
	•	Product Listing (Filters, Sorting, Pagination)
	•	Product Detail (Circular product display, image zoom, animations)
	•	Cart, Checkout, Payment
	•	User Account (Orders, Wishlist, Profile, Settings)
	•	Authentication (Sign Up, Sign In, Forgot Password)
	•	Admin Dashboard (Product CRUD, Orders, Analytics)
	2.	UI/UX Enhancements
	•	Use reference images for inspiration on modern layouts and branding.
	•	Implement product cards in circular frames with hover effects, glow, shadow depth, and smooth scaling animations.
	•	Add micro-interactions for buttons, navigation, and transitions.
	•	Ensure mobile-first responsive design across devices.
	3.	Advanced Functionality
	•	Real-time product search with predictive suggestions.
	•	Animated filters & sorting UI.
	•	Wishlist & recently viewed product tracking.
	•	Lazy-loading & skeleton loaders for smooth page rendering.
	•	Dynamic theme switching (Light/Dark).
	•	Interactive cart icon with live item count updates.
	4.	Code Implementation
	•	Write clean, modular React (or Next.js) components.
	•	Ensure full integration of state management (Redux Toolkit / Zustand).
	•	Apply optimized SCSS/Tailwind styling for customization.
	•	Include dummy product dataset for preview functionality.
	•	Keep file structure clean and scalable.
	5.	Extra Advanced Add-Ons
	•	360° product viewer on detail page.
	•	Parallax scrolling in hero section.
	•	Product quick view modal.
	•	“Add to Cart” animation with smooth fly-to-cart effect.
	•	Product image gallery with swipe/drag support.

⸻

Output Delivery:
	•	Full project folder with all screens coded & functional.
	•	All components linked & navigable.
	•	No placeholders — use either real product data or high-quality sample images.
	•	No pending tasks — everything must be production-ready before any npm install or backend integration.
