# ECO — UI/UX design specification

**Design handoff · 17 November 2026 · English + Arabic · Next.js, Tailwind CSS, shadcn/ui**

This specification defines exactly nine screen designs. Supporting routes appear in the sitemap; supporting interactions are drawers, sections, or states of those screens. Mockups communicate visual direction; this document governs behavior, accessibility, content, and responsive layout. All products, prices, fees, dates, campaign counts, and people in examples are illustrative.

## 1. Direction and design system

### Five principles

1. **A store first, a conversation when needed.** Keep search, product selection, cart, and payment familiar; introduce assisted shopping beside relevant decisions.
2. **One obvious next step.** Use one filled primary action per decision area so nine features do not become nine competing buttons.
3. **Every promise has a visible boundary.** Show the payable amount, exact quote version, delivery basis, expiry, and refund outcome before commitment.
4. **Premium comes from clarity.** Use generous imagery, readable typography, open layouts, and restrained accents instead of ornamental cards and perpetual sale banners.
5. **Arabic and accessibility shape the layout.** Build semantic, bidirectional components from day one rather than creating a translated skin later.

### Brand direction

Keep **ECO** as a working wordmark. Do not imply ecological certification or sustainability merely because of the name. Positioning: **“Good finds. Better together.”** Mood: calm, tactile, considered, helpful; a contemporary general store rather than a luxury fashion imitation. Voice: concise, warm, transparent. Say “The shop offered AED 265 delivered,” not “Congratulations! Exclusive deal unlocked!”

Photography: real products on warm stone or ivory, consistent light and scale, 4:5 catalog crops; show details and real-world scale on PDP. Preserve truthful color. Product cutouts for the board need transparent backgrounds and a separate catalog fallback. No star ratings, delivery claims, or scarcity numbers without genuine data.

### Tokens → Tailwind

Use semantic names everywhere. The companion `eco-tokens.css` contains Tailwind v4 mappings; for Tailwind v3 map the same CSS variables in `theme.extend`. Do not combine both configuration styles.

- `background` **#FAF8F4**: warm page canvas; `card` / `popover` **#FFFFFF**: product and form surfaces.
- `foreground` **#202522**: body and headings; `muted-foreground` **#626963**: secondary text; `muted` **#F0F1EC**: secondary surfaces.
- `primary` **#A33F2B**, foreground **#FFFFFF**: main purchase/accept actions. Hover **#8D3322**; pressed **#75291B**. Restrained terracotta makes the decision point identifiable within otherwise neutral pages.
- `accent` **#F7EAE3**, foreground **#A33F2B**: editorial emphasis, selected offers, savings; never the only state cue.
- `border` **#DADFD8**: decorative dividers; `input` **#798279**: form boundaries that need stronger contrast.
- `ring` **#2E654D**: 2px focus ring + 2px surface offset, on both white and ivory.
- `success` **#246146**, surface **#ECF4EE**; `warning` **#805300**, surface **#FBF2DE**; `destructive` **#B3261E**, surface **#FCEDEA**; `info` **#285C84**, surface **#EDF3F8**. Always pair status color with text, optionally an icon.
- Type: **Noto Sans** for Latin; **Noto Sans Arabic** for Arabic, then system sans-serif. Load required weights with `next/font`; avoid synthetic bold. One coherent sans family pair keeps multilingual commerce legible.
- Body/input: `text-base` **16/24px**, 400; labels/buttons **14/20px**, 600; metadata **14/20px**, 400. Do not shrink legal/payment text below 14px.
- Product title mobile **24/32px**, desktop **32/40px**, 600. Page heading **28/36px → 40/48px**, 600. Home hero **36/42px → 56/64px**, 500. Price **20/28px**, 600. Arabic body line height **28px**, heading line height at least **1.4**; no letter spacing or uppercase transformation.
- Spacing: **4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96px** → Tailwind `1,2,3,4,5,6,8,10,12,16,20,24`. Use 16px mobile gutters, 24px tablet, 40px desktop; sections 40px mobile / 64px desktop.
- Radius: controls **6px** (`rounded-md`); cards/drawers **12px** (`rounded-xl`); tiny badges **4px**; pill only for tags/chips. Product images may be square edged inside a 6px crop.
- Elevation: none on catalog cards; dropdown `0 4px 16px rgb(32 37 34 / .08)`; modal/drawer `0 16px 48px rgb(32 37 34 / .16)`; overlay black 40%. Shadows indicate overlays, not decoration.
- Icons: **Lucide**, 20px regular / 24px navigation, 1.75px stroke. Give icon-only controls accessible names. Mirror directional arrows/chevrons; preserve bags, search, clocks, payment logos, product imagery.
- Controls: 48px input/button height; compact admin controls 40px with at least 44px actionable hit areas where possible. Product design target **44×44px minimum**, exceeding the WCAG 2.2 AA 24px minimum subject to exceptions.
- Motion: 150ms color/opacity, 200ms drawer; respect reduced motion; no auto-rotating heroes or animated urgency.

### Responsive shell and behavior

Test widths **320, 390, 768, 1024, 1440px**. Use Tailwind defaults `sm:640`, `md:768`, `lg:1024`, `xl:1280`. Main container max **1280px**; prose max 65 characters. Mobile is one column; 768–1023px is two-column catalog with a compact header; desktop catalog is four columns. Mobile product cards use two columns; at 320px allow titles to wrap rather than clipping critical price/variant information.

Customer header: 56px mobile; desktop 80px main row + 44px category row. Mobile bottom navigation 64px plus safe area. **On PDP and checkout replace bottom navigation with the action bar** so two sticky bars do not compete. Content padding must equal the measured sticky region plus 16px; use `scroll-padding` and `scroll-margin` so focus and errors remain visible. Do not depend on a hardcoded 80px bar when text wraps. Desktop purchase panels stick below the header only if shorter than the usable viewport.

Mobile drawers cover the viewport below a visible close/title row and use their own scroll region. Use a bottom sheet only for short choices such as quantity; forms and quote review use full-height drawers. Escape closes reversible overlays; return focus to the trigger; preserve drafts.

## 2. Information architecture and navigation

### Customer sitemap

```text
/[locale]
  /                              Home [S1]
  /shop                          Catalog; search /search?q=; category filters
  /category/[slug]                Fashion / Accessories / Home / Gifts / Tech
  /product/[slug]                 Product [S2; Arabic version S9]
  /mix-match/[boardId]            Try Them Together [S3]
  /buy-together                  Campaign directory
    /[campaignId]                Campaign [S6]
  /gifts                         Send a Gift; funded gift-link / gift-card setup
  /gift/[token]                  Recipient entry and claim [S7]
  /help-me-shop                   Find It for Me / Shop My Budget entry points
  /cart                          Cart [S5]
  /checkout                      Account → Delivery → Payment [S5]
  /account
    /conversations               Offers, sourcing, budget and deal requests
      /[threadId]                Shared thread and quote review [S4]
    /orders /orders/[orderId]     Receipt, separate status tracks, Add to This Order
    /group-buys                   Participation and refund status
    /gifts                       Sent gifts / claimed value / activity
    /boards /addresses /profile  Saved boards and preferences
    /returns                     Requests and refund progress
  /help                          Delivery, returns, contact, quote/group/gift FAQs
  /policies                      Privacy, terms, accessibility, gift/group conditions
```

Auth is a return-to-action gate, not a navigation destination users must visit first. Guest browsing, cart, and local board editing persist without an account. Account creation is required for every commit listed in the brief, including payment and gift claiming.

### Admin sitemap

```text
/admin
  /inbox                         Offers / sourcing / budget / negotiation [S8]
    /[threadId]                   Split-view detail and quote composer [S8]
  /catalog                       Products / variants / categories / stock / media
  /orders                        Payment exceptions / sourcing / packing / shipping
    /[orderId]                   Items, add-on window, activity, fulfillment
  /campaigns                     Draft / active / succeeded / failed / refunds
  /gifts                         Funding / claims / balance activity / exceptions
  /returns                       Requests / inspection / resolutions
  /refunds                       Pending / completed / failed; retry with reason
  /customers                     Order context and authorized support actions
  /settings                      Roles / locales / currencies / shipping / wrapping
  /audit                         Staff actions and quote/payment activity
```

The same app has a separate staff shell and permission-checked routes. Switching to admin is an explicit account menu item for authorized staff. Customers never see a disabled Admin link. Catalog editors cannot silently gain refund permissions.

### Navigation decisions

- **Desktop customer:** ECO wordmark/Home, broad search, language/country/currency selector, Account, Bag with quantity; second row Shop, Buy Together, Gifts, Help me shop. Categories live inside Shop. Reason: this preserves retail clarity while giving assisted shopping a single entry.
- **Mobile customer:** top ECO + Search + Bag; bottom **Home, Shop, Together, Account**, each with icon + text. Gifts and Help me shop are prominent inside Shop and on Home. Reason: four stable destinations fit small screens without shrinking labels.
- **Desktop admin:** 240px sidebar grouped Commerce, Assistance, Operations, Settings; inbox count and current staff identity. **Mobile admin:** compact header + navigation drawer, inbox list opens a full-screen detail route with Back. Reason: inbox work needs more than an icon rail.
- Locale selector labels **English / العربية**; country, language, and currency are separate settings, not flag icons. On unsupported market selection show availability before changing a committed transaction. Preserve the current item/board/route when changing language.

## 3. Shared commerce rules — implement before individual screens

### Quote contract

F01, F05, F06, and F07 use one thread type with a `requestType` label. A quote snapshot has ID, integer version, currency, variant IDs and descriptions, quantities, unit prices, explicit discounts, shipping method/fee, delivery estimate or agreed date, wrapping and message charges, taxes/tax treatment, total, expiry timestamp/time zone, and terms. Store monetary amounts in integer minor units with currency metadata, not floating point or a universal two-decimal assumption.

Example for screenshots: tote 180 + pouch 60 + organizer 20 = items **AED 260**; discount **−10** + shipping **15** + wrapping **0** = total **AED 265**. Where tax is included, identify included tax from backend calculation without adding it a second time. Figures are sample totals, not tax advice.

Lifecycle: `draft → sent → accepted → checkout/payment → paid`; alternatives `superseded`, `expired`, `rejected`, `withdrawn`. Request lifecycle is separate: `draft → submitted → awaiting shop → awaiting you → resolved / closed`.

- Only the newest, unexpired, payable version can be accepted. A shop counter creates a new complete quote version; it never edits history. “Superseded” and “Expired” are different labels.
- Distinguish **customer proposal revisions** (nonpayable requests) from **shop-issued quote versions** (complete financial snapshots). A buyer counter explicitly declines the current unaccepted quote and creates a proposal revision awaiting the shop; only the subsequent shop-issued full quote can be accepted. Quote numbering belongs to shop snapshots, not chat messages or incomplete buyer proposals.
- Acceptance is an atomic server check of owner, current version, expiry, availability, selected option, and total. Client button state is a convenience, not authority. Two tabs accepting competing versions must produce one result.
- Acceptance does **not** mean paid. It locks agreed content until the quote's displayed payment expiry; show “Accepted · Payment required.” Proposed default: staff-issued quotes expire after 24 hours; show the actual absolute timestamp everywhere.
- Proposed inventory policy: acceptance reserves stock until the existing quote expiry, subject to stock availability. If the service cannot provide that reservation, change copy to “Availability checked again before payment” and never claim a hold.
- Quote checkout is separate from the ordinary cart. Changing quantity, variants, delivery terms, currency, wrapping, or extras that affect the snapshot requires **Request a revised quote**. A matching address within the quoted delivery zone may be entered without revision; different service/zone requires revision.
- Staff cannot replace an accepted quote silently. They must withdraw/cancel it with a visible reason and issue a new one if unpaid; paid changes go through order adjustments/refunds. On conflict display “There’s a newer quote. Review v3.”
- Backend calculates totals and payment eligibility; retain an idempotent checkout attempt and show pending status after network ambiguity. A paid receipt follows verified payment state, not a success animation alone.

### Proposed operating policies requiring owner sign-off before launch

These are explicit design defaults, not facts from the brief. Build them as configurable policies; do not ship contradictory microcopy.

1. **Group buying:** one participation per account/campaign; charge the complete displayed amount when joining. Count successfully paid participants only. At deadline, succeed if the target is reached; otherwise refund all campaign charges, including delivery and optional wrapping. No immediate success at the target: remaining places stay open only up to stated capacity until deadline. This keeps the deadline meaningful. Do not promise bank arrival times; show a provider-backed estimate if available.
2. **Group cancellation:** self-service withdrawal before the deadline, full refund, removes the participant from the count; success threshold is evaluated on active paid participation at close. Publish this rule in joining terms; it can change outcome if people withdraw.
3. **Gift link:** one claim into one signed-in recipient account; the link is not a reusable bearer wallet. After claim, value stays in that account for later purchases, including unused balance. Permit split payment for an excess; no cash-out or gifting of gifted balance in v1. Gift expiry, eligible products, cancellation, transfer restrictions, and any currency conversion must be approved and displayed before funding. Do not invent an expiry.
4. **Gift purchase returns:** credit the gift-funded portion back to recipient gift balance and the card-funded portion to the original card. Show this allocation before confirming a return.
5. **Order add-ons:** submit and pay in a separate linked adjustment; never edit the old receipt. Eligibility depends on the server's packing cutoff, delivery compatibility, and current packing lock, not just an estimated timer.
6. **Gift wrapping:** illustrative AED 12 per selected wrapped unit, max 200 message characters, selectable grouped wrap only if staff supports it. Clearly count units and packages; never infer one fee per order.
7. **Service response:** show “The shop will reply here” until a measured response promise exists. Returns periods, tax wording, delivery charges, gift restrictions, payment/refund terms, and customer support details need owner/legal verification for each market.

## 4. Key flows

### Normal purchase

1. Home/search/category → product; select required variant and quantity; optionally choose wrapping and message with visible fee.
2. Add to cart → inline confirmation “Added to your bag” with View bag, no forced modal. Guest cart persists locally/server session.
3. Cart → review exact variants, quantities, wrapped units, estimated subtotal. Delivery remains “Calculated after address” until known.
4. Continue → account gate: “Sign in to check out. Your bag is saved.” Sign in or create account; preserve every selection. Merge guest/account carts with a visible review if duplicates or limits change.
5. Choose destination, address, delivery method; show actual charges, availability, expected dates, tax treatment, final currency. Resolve stock/price changes explicitly.
6. Payment → eligible wallet or card → “Pay AED [total]”. Account gate precedes all payment buttons.
7. Handle challenge/processing; server confirms receipt. Show payment and fulfillment separately. If still eligible, show Add to This Order on the order detail destination.

### Bundle offer → counter → accept → checkout

1. Choose “Make a Bundle Offer” from PDP, cart, or board. Seed selected product; a bundle requires at least two purchasable lines. Single-line negotiation uses Negotiate a Deal.
2. Drawer: selected variants, quantities, catalog subtotal, proposed items total, destination country/emirate, fulfillment preference, optional note; clarify “Delivery and wrapping are confirmed in the quote.”
3. Sign in only at Submit, preserve draft; submit → thread S4, Awaiting shop. Show “You proposed AED 250 for items.”
4. Staff counter creates Quote v2 with full landed breakdown and expiry. Notify in account; optional transactional notification channels only if configured/consented.
5. Buyer reviews changes from v1, including shipping/extras; may counter or accept exact v2 and option. Confirmation action is “Accept v2 & continue”, not a payment button.
6. Atomic acceptance → quote checkout with accepted snapshot. Ordinary cart remains separate. Revalidate payment expiry and amount before payment.
7. Pay once → quote marked Paid and linked order. Stale tabs show “This quote has already been used” with View order. Expiry returns to thread → Request a new quote; do not silently fall back to retail prices.

### Group buy join

1. PDP/banner/directory → S6; review product/variant, discounted price, paid count/target, capacity, deadline, delivery basis, charge-now and refund terms.
2. Join → required variant and quantity fixed per campaign rules; sign in; enter address and final charges in S5 campaign checkout. Keep separate from ordinary/quote checkout.
3. Review “You pay AED [total] today. If fewer than 25 paid members remain at [deadline], all campaign charges are refunded.” Continue with explicit acceptance of campaign conditions.
4. Payment succeeds → atomic participation, updated count; no count increment for failed/pending payment. If last slot closes during payment, resolve the server allocation and refund any unallocated captured charge.
5. S6 member state: Joined, View receipt, Share campaign, Withdraw before deadline. Share is optional, never required to retain the discount.
6. At deadline: success → fulfillment estimate/order; failure → Failed · Refund pending, then Refunded or Needs attention. Account retains receipt and traceable refund status.

### Gift link redemption

1. Open link → S7 preview: sender, message, gift amount, eligible market, claim conditions; no claim side effects from GET/link preview bots.
2. “Sign in to claim your gift” → sign in/create account → confirm “Claim AED 300 to [account]”. Allow Switch account before claim; intended-recipient restrictions are checked privately.
3. Atomic claim burns link once and associates balance with account; retry by the same owner returns the same claim. Another account sees neutral “This gift has already been claimed” without exposing identity or balance.
4. “Choose your gift” → eligible catalog with persistent gift balance bar; build cart. Prices and restrictions remain visible.
5. Checkout shows gift credit applied, remaining balance, and any excess to pay; recipient supplies address privately. Zero payment remainder → “Place gift order”, no card collection.
6. Receipt shows items and gift-credit usage; unused balance remains in account. Giver sees gift claim status only, not recipient address or selected products unless recipient explicitly shares them.

## 5. Exactly nine screen designs

All nine inherit the design system, state patterns, responsive shell, RTL rules, and WCAG requirements. Each layout below is in document/focus order; desktop placement must preserve a sensible reading sequence.

### S1. Home page

**Purpose:** Help someone find a product quickly, then discover ECO's human shopping services.

**Top to bottom / mobile:**

1. Optional service strip “Shopping in UAE · AED” with Change; no unsupported delivery promises.
2. Compact header ECO/Home, search icon “Search products”, bag count; full-width search below: “Search products, categories and more”. Search offers product/category suggestions, clear query, keyboard selection and View all results.
3. Editorial hero: text “Good finds. Better together.” and “Everyday pieces for your wardrobe, home and thoughtful gifts.” One tactile still-life of tote, cup, tech pouch. Primary **Shop new arrivals**; underlined **Make a bundle**. Mobile copy first, 4:3 photo below; no text baked into photography.
4. Category links Fashion, Accessories, Home, Gifts, Tech in a two/three-column compact image grid; descriptive names visible without hover.
5. “A few good finds” + View all; four to eight product cards, two columns. Each: 4:5 image, name, optional brief variant context, price, truthful availability/deal label. No hover-only quick add; card opens PDP for variant-dependent products.
6. One “Buy Together” feature: product, campaign price, “18 of 25 joined”, close date, **View campaign**. Omit this section if no active campaign.
7. Open editorial service strip “A little help finding the right thing.” with **Shop My Budget** and **Find It for Me**. Each opens a request form drawer: budget/currency + purpose + preferences + needed-by date, or photo/link + description/specification + quantity + budget + needed-by date. Attachment requirements/errors visible. Submission requires account and creates S4 thread.
8. Gift strip “Let them choose something they love.” → **Send a Gift**. Drawer has amount/currency, sender, recipient delivery method, message, restrictions and funding checkout; send link only after funding succeeds.
9. Footer: delivery/returns/help, policies, language/country/currency; bottom navigation.

**Desktop:** hero in a 5/7 split, text at start and image at end; 6 compact categories if taxonomy warrants, otherwise retain five; four-column products; service strip in two columns; footer 3 columns. Header search is central and always visible. Do not turn all feature entrances into a nine-card grid.

**Actions:** primary Shop new arrivals; secondary Make a bundle, search, category/product/service links.

**States:** empty new-arrivals feed → curated category links; empty campaign feed → omit campaign module. Skeleton hero/image and 4 product cards reserve dimensions; static text/navigation remain. Recommendation API error affects only the rail: “We couldn't load these picks” + Retry + Browse shop. No network → retain loaded content with reconnect banner. No search results → query, remove filters, spelling suggestions and Find It for Me; never a blank page.

**Accessibility:** one h1; hero meaningful alt or empty alt if redundant; skip to main; no carousel auto-play; search combobox semantics; product link name includes product, price accessible separately; links have visible focus. Reason: the landing page should feel like a confident storefront, not a feature demo.

### S2. Product detail page

**Purpose:** Support a confident retail purchase while making alternate ways to buy discoverable.

**Top to bottom / mobile:**

1. Compact header with Back to results, ECO, Search, Bag. Breadcrumb is optional visually on mobile but back context is retained.
2. Product gallery: first image 1:1/4:5 with natural crop; swipe, previous/next buttons, “Image 1 of 5”, thumbnail chooser and tap-to-zoom dialog. No forced gesture; reserve dimensions.
3. Category “Accessories / Bags”; h1 **Everyday canvas tote**; short factual description; **AED 180.00** with configured tax treatment. Reviews only when real; no placeholder 4.9 rating.
4. Color fieldset “Color: Olive”: named swatches Olive and Sand with selected check/border and stock annotations; size “One size” or size radio buttons + Size guide dialog. Quantity stepper 1; “In stock” from actual availability. No required size default for multi-size items.
5. Shipping estimator: **Deliver to [emirate/country] · Change**; show “Enter your area for delivery cost and dates” until known; return-policy summary/link and product-specific exceptions.
6. **Wrap & Add a Message** collapsed accordion with “From AED 12 per wrapped unit”. Expanded: No wrap/available design radio tiles with preview photo and fee, wrapped quantity, message textarea 0/200, From optional, Preview dialog, fee subtotal. Gift message is optional, not silently prefilled. Warn before discarding customized content.
7. Primary **Add to cart**, secondary outline **Try Them Together**. Mobile Add to cart sits in sticky action bar with total for selected quantity/wrap; page contains the same decision area without a second simultaneous primary button.
8. Understated alternate purchase section: **Make a Bundle Offer** — “Combine this with another item and suggest a total”; **Negotiate a Deal** — “Ask about price, delivery or extras.” Each a text row with chevron. Negotiation drawer: selected variant, price proposal optional, shipping/pickup preference, required-by date, extras/note; at least one requested change; login at submit → S4.
9. **Buy Together** banner only for an eligible active campaign: “AED 150.00 with 25 buyers · 18 joined · Ends 20 Nov, 18:00 GST” + View campaign. Distinguish campaign price from retail Add to cart price.
10. Accordions Description, Materials/specifications, Dimensions/fit, Care/compatibility, Delivery & returns; actual categories determine fields. “Works well with” product rail; footer.

**Desktop:** 7/5 grid (gallery ~58%, purchase panel ~42%), gap 48px. Gallery uses one large image + thumbnail column; purchase panel sticky if it fits. Retail CTA and Try Them Together side by side only when readable; alternative service rows and campaign appear below. Details below gallery/full grid, not squeezed into a narrow popup.

**States:** no variant chosen → CTA **Choose a size**, activation focuses size group; sold-out combination → named disabled option + “Unavailable in Olive / M”; entire product sold out → disabled purchase and Find It for Me optional, no fake waitlist. One image/no reviews/no campaign → hide unused controls. Wrapping unavailable → clear notice, preserve message draft; pricing fetch loading disables commit only. Add error → inline Retry with selections intact. Price/stock changes → before/after review, no silent increment. Removed product → unavailable with category return path.

**Accessibility:** swatches are radios with names; size guide is keyboard reachable; quantity buttons include product context and announce updates politely; image zoom traps/restores focus; action bar cannot cover focused variants/errors. Use real labels, not placeholder-only fields. Reason: all requested purchase modes exist, but retail buying remains the visual anchor.

### S3. Mix & Match board — “Try Them Together”

**Purpose:** Compare real items, choose variants, and convert a combination into cart or a bundle request. This is a visual planning surface, not an AR/fit simulator.

**Top to bottom / mobile:**

1. Header Back, h1 “Try Them Together”, editable board name “Everyday carry”, save state “Saved on this device” or “Saved to your account”. Guest drafts must not imply cloud storage.
2. Toolbar **Add products**, Undo, Redo, Reset layout (confirm reset), view toggle Board/List. Product picker drawer has search/category, image/name/price, variant selection and Add; max proposed **12 distinct lines** with clear limit.
3. 2D canvas, approximately square, neutral surface and comfortable product cutouts. Start with auto-arranged tiles; allow select, drag, layer order, zoom (50–150%), Fit board. Mobile single-finger scroll outside board; explicit “Move item” mode inside prevents accidental page hijacking.
4. Selected-item inspector below board on mobile: product title/image, color/size selectors, quantity, unit and line price, Remove. No precision resize requirement for purchase; optional visual scale has **“Images are not to scale”** caption.
5. Accessible List view uses the same items/order, per-item variant fields and Move earlier/Move later. Also provide Select item → position controls (up/down/start/end) and layer controls as tap/keyboard alternatives to dragging.
6. Running total area: “3 items · AED 260.00”, wrapping/delivery “Added or confirmed later”; **Add all to cart** primary, **Make a Bundle Offer** secondary. Mobile in sticky bar; offer available at 2+ lines. If any unconfigured line, CTA **Choose missing options** focuses first problem.

**Desktop:** left 280px searchable product drawer/panel; center flexible board; end 320px item inspector and total. Collapse picker when canvas would fall below 400px. List view replaces canvas but preserves inspector/actions. Board visual order is independent of cart quantities and totals.

**States:** empty → “Build a combination” + Add products, no fake zero-price purchase button. Cutout loading → use catalog photo without claiming transparency; picker/price skeletons do not block viewing existing board. Unavailable item stays visible with warning; user removes/replaces before committing. Invalid size/quantity marked inline. Guest login at Make offer/save to account preserves board; guest Add all to cart remains available. Offline saves locally and says so; failed cloud sync offers Retry without overwriting newer account data. Board ownership conflict → Save a copy. Add all is validated atomically; on failure show affected lines, no silent partial cart.

**Accessibility:** canvas is enhancement; a semantic item list supplies full parity. Focus selected inspector heading on explicit item activation; announce variant/total changes without announcing every drag pixel. Pinch has buttons; drag has single-pointer and keyboard alternatives. Reason: side-by-side planning must work without dexterity or a powerful device.

### S4. Offer / negotiation thread and quote versions

**Purpose:** Turn the shop conversation into an auditable, payable agreement.

**Top to bottom / mobile:**

1. Back to Conversations; request type badge “Bundle offer”, ID B-1042, h1 “Your everyday carry bundle”, request status “Your response needed”; support context and last updated timestamp.
2. **Current quote v2** summary at top: Awaiting your acceptance, exact expiry **18 Nov 2026, 18:00 GST (UTC+4)**, 3 items, delivery method, total AED 265. “View full quote” expands item images/titles/variants/qty, unit prices, line totals, discount, shipping, wrapping, tax treatment, delivery expectation and terms.
3. Timeline grouped by date with customer/shop sender names, timestamps, messages, attachments with file type/size and download action; no bubble-only distinction by color. System entries record submission, counter, acceptance, withdrawal, payment.
4. Quote history: v1 collapsed **Superseded**, earlier shop quote AED280; view read-only snapshot and “Replaced by v2”; v2 expanded/current. The buyer's AED250 proposal remains a separate nonpayable timeline event. **Compare changes** lists values before→after in text. No accept action on old versions.
5. Optional staff deal options **A Pickup / B Delivery / C Delivery + extra** as a radio group inside one version. Each option has an entire breakdown and total, not an ambiguous surcharge. Accept locks version + option ID. Switching the preview updates all breakdown rows, with polite total announcement.
6. Composer: label “Message the shop”, textarea, attach photos/documents, Send; sending a message does not accept or counter a quote. **Counter offer** opens amount/currency, fulfillment request, extras and note with full proposed summary. Confirm with “Send counter request”; explain “This declines quote v2. The shop will send a new quote.” It creates a nonpayable customer proposal revision, marks the unaccepted shop quote Rejected, and changes the request to Awaiting shop. Never label an incomplete proposal a payable quote.
7. Mobile sticky action area **Accept v2 & continue** and text Counter offer; desktop sticky end quote panel, thread on start in 7/5 columns. Put complete terms before the commit action in DOM order.

**State-specific quote cards:**

**Shop My Budget variant:** show original budget/purpose and basket total vs budget. Each unaccepted quote item has **Request a swap** → replacement picker with eligible product, required variant/quantity, or “Let the shop suggest an alternative” plus preferences. Show indicative budget impact and “The shop will confirm the new price.” Submit a nonpayable proposal revision awaiting a new staff quote; confirm that the prior unaccepted quote will be declined. Accepted snapshots stay read-only: Request a revision requires explicit cancellation of the unpaid acceptance by the shop before a replacement can become payable. Paid baskets use order support instead. Never mutate agreed items in place.

- **Awaiting shop:** customer proposal summary, no Accept; “The shop will reply here.”
- **Current counteroffer:** current v2, differences, expiry, Accept + Counter; “Acceptance locks this version. Pay at checkout.”
- **Accepted, unpaid:** “Accepted v2 · Payment required”; Continue to payment, actual payment expiry, no edit controls; receipt-like locked item/options list.
- **Paid:** “Paid · Order ECO-1042”; View order; thread remains readable; follow-up messages do not mutate order.
- **Expired:** “Quote v2 expired on …”; Request updated quote; old values read-only, no payment CTA.
- **Rejected/withdrawn:** explicit label, shop reason, optional Send a new request; never styled as an error from the system.

**Other states:** new empty thread → submitted request summary + awaiting reply. Loading older history uses inline skeleton; current quote independent loading disables accept until fresh. Failed send retains text with Retry; attachments show uploading/scanning/failed/remove states. New quote arrives while reviewing → banner and Review v3, disable stale accept immediately; server still verifies. Acceptance race/expired stock → targeted explanation and Refresh quote; do not discard history. Deleted attachment → unavailable label. No response SLA unless real.

**Accessibility:** semantic ordered timeline; headings per quote; readable status text; new messages announced in a polite log without moving focus; show a New messages control when reading history. Version changes are not conveyed only by strikethrough/red/green. Reason: the financial object must be more prominent and precise than the chat around it.

### S5. Cart and checkout

**Purpose:** Review editable retail items, complete account/delivery/payment, and preserve locked transaction types.

**Cart, top to bottom / mobile:**

1. Header Back to shop, ECO, “Your bag (3)”; free of marketing overlays.
2. Item rows: 80×100px photo; title link, chosen color/size, unit/line price, quantity stepper, Remove with brief Undo. Add wrapping opens the same editor as PDP; show package count, chosen design, message preview and editable fee.
3. Optional bundle prompt “Buying these together? Suggest a total.” → Make a Bundle Offer, only at 2+ eligible lines. It does not erase cart.
4. Summary: items, discounts, wrapping, shipping estimate or Not calculated, tax treatment, **Estimated total** until destination known; promo code collapsed, Apply with inline validity/result. No invented free-shipping threshold.
5. Primary **Continue to checkout**; Continue shopping secondary; card/wallet support labels as informational marks, no pre-account payment action.

**Checkout states within S5, top to bottom:**

1. Quiet header ECO, Back to bag/current quote/campaign, Help; three stages **Account → Delivery → Payment**, current step marked with text. Completed steps have Edit; preserve entered values.
2. **Account gate:** “Sign in to check out. Your bag is saved.” email + Continue; offer password-manager-friendly sign in and account creation. Proposed default email code flow: one accessible code field, paste/autofill allowed, resend countdown, change email, clear error/retry. No cognitive puzzle. Successful sign-in reviews cart merge conflicts before proceeding.
3. **Delivery:** saved-address radios or Add new address; country first, then country-sensitive name, phone with country prefix, address lines, city/locality, region/province and postal code only where appropriate. UAE labels Emirate, Area, Building/villa, Apartment optional, Landmark optional; do not require a fake ZIP/00000. Country supports separate shipping eligibility from locale. Manual entry is always available alongside any lookup. Billing same as delivery default, editable. Show named delivery methods, fee and actual date range; pickup only if configured with location/hours. Continue to payment.
4. **Payment:** final order summary before charge; account-bound gift balance if eligible, applied amount and remainder, optional Remove credit. Use Stripe Payment Element for cards and Express Checkout Element for eligible Apple Pay/Google Pay. Show only supported/ready methods and avoid duplicate wallet rows. Preserve official wallet branding. Payment collected only after account and final charges; disable unrelated payment methods unless supported by product policy. Standard final action **Pay AED 287.00** (example retail:260+wrap12+shipping15). Zero gift-credit remainder **Place gift order**, no payment fields. Explain terms/privacy with links; no preselected marketing opt-in.
5. **Review panel:** 3 items expandable, variants and wrap, items total, discounts, delivery, wrapping, taxes as applicable, gift credit, **Total payable now** with currency; delivery address and method; quote/campaign conditions where relevant.
6. **Processing/confirmation:** “Confirming your payment — you can safely check this order again.” On verified paid state receipt + order number, paid amount/method, delivery details, **View order**. Order destination shows separate **Payment: Paid**, **Fulfillment: Sourcing/Packing/Shipped/Delivered**, **Returns: None requested / In progress**, and refund records. Never use one ambiguous “Complete” badge for all three tracks.

**Desktop:** 8/4 content/summary grid; summary sticky below quiet header. Cart rows occupy full start region. Checkout form max 640px; address fields one column except safe pairs (city/postcode where applicable). Mobile summary collapsed early with total; fully expanded before final Pay; payment action sticky only when it cannot obscure Stripe controls or authentication UI. Hide global bottom navigation throughout checkout.

**Transaction variants:** ordinary cart editable; accepted quote read-only tagged **Quote v2 · Locked until …**; group checkout tagged **Campaign participation · Charged today**; gift credit applied after claim. Do not mix quote/group commitments into a mutable retail cart. One checkout has one currency. Currency change before commitment reprices and requires review; locked quote needs revision.

**F09 entry attached to order confirmation/detail destination:** when eligible show **Add to This Order** + server-provided cutoff and status; product picker allows only compatible items; review existing order reference, new item subtotal, shipping adjustment and total due; pay an adjustment separately. On packing lock transition replace with “Packing has started. These items can be ordered separately.” Payment/lock race releases any reservation and resolves captured money with a traceable refund if attachment fails. Never announce an add-on as attached before the server confirms both payment and packing eligibility.

**States:** empty cart → “Your bag is ready for a good find” + Browse shop; pending line load skeletons with stable summary. Invalid promo/undeliverable address/stock change/tax calculation failure shown at affected fields with focusable error summary; preserve all other data. Price changes require review before payment; backend total mismatch cancels the attempt and refreshes review. Card declined → localized inline message, Retry/choose another method; wallet cancellation returns to ready state. Payment timeout/refresh → query existing attempt, show Checking status, never auto-create a second charge. Bank authentication failure keeps order unpaid; no paid receipt. Quote expires mid-pay → server reconciles attempt/reservation and forbids a newly initiated stale charge; show outcome rather than “try again” blindly. Gift balance contention recomputes applied amount and asks review before charging a larger card remainder.

**Accessibility:** associated labels, autocomplete tokens, correct input types, error text linked with `aria-describedby`, first error focus after submit; changes preserve non-sensitive values. Address lookup has keyboard support. Terms reachable without losing checkout. Password/code paste allowed. Stripe region localized and keyboard tested. Reason: reduce uncertainty immediately before money moves.

### S6. Group Buy campaign page

**Purpose:** Make collective pricing understandable without hiding payment and failure risk.

**Top to bottom / mobile:**

1. Back to Buy Together; campaign label, h1 “Everyday tote, better together”; product image gallery, variant availability and product-details link.
2. **AED 150.00 per member**; retail comparison AED180 only if genuine; explain campaign quantity/eligibility. Delivery and optional extras listed separately until address supplied.
3. Participation panel: **18 of 25 paid members**, **7 more needed**, labeled progress 72%, capacity if capped. At >target show “Target reached · Final result at deadline”; use count beyond 25 even if progress bar caps at100%.
4. Deadline **20 Nov 2026, 18:00 GST (UTC+4)**; relative countdown “3 days, 4 hours remaining” supplementary. All dates render in locale, show campaign zone and local equivalent when relevant.
5. Three-step explanation: “Join and pay today”; “We check the paid-member target at the deadline”; “If it succeeds, we dispatch under the stated delivery plan. If it fails, all campaign charges are refunded to your original payment method.” Delivery plan has actual estimated dispatch after success, not today's ordinary PDP estimate.
6. Select eligible variant, explicit campaign quantity, estimated fee information; primary **Join for AED150 + delivery** until final address total; secondary Share campaign. Joining leads to final review in S5, not an immediate hidden charge.
7. Conditions accordion: eligibility, limit/capacity, cancellation deadline, participant count rule, full refund basis/processing, excluded extras, what happens at stock/payment failures. “Questions? Contact the shop” consistent help entry.

**Desktop:** 7/5 product/story and campaign panel; progress and terms grouped, CTA panel sticky if it fits. Never display member names/avatars without a clear reason and consent.

**States:** zero participants is legitimate “Be the first · 25 needed”, not empty catalog. Loading count shows “Checking participation…” and join disabled until verified. Joined → “You're in · Paid AED[total]”, View receipt / Share / Withdraw while eligible. Goal reached still active → explain evaluation at deadline. Closed/succeeded → View order for participants, Shop product for others. Failed → “Target not reached · Refund pending”; refund row amount/method/status/estimate if known; completed → Refunded, failures → shop follow-up case with help. Sold out/full → disabled Join with reason; campaign removed → safe unavailable page. Stale clock/offline → absolute deadline remains; no client-only closing/payment authority. Duplicate join → existing participation, not another charge.

**Accessibility:** progressbar has min/max/value and human label; do not live-announce countdown every second. Announce joined/result changes politely. Do not use urgency flashing, red countdown alone, or auto-share. Reason: trust is built by explaining failure as clearly as the discount.

### S7. Gift link redemption — mobile priority

**Purpose:** Give the recipient a warm reveal, a secure single claim, and freedom to choose privately.

**Top to bottom / mobile:**

1. Quiet ECO header, English/العربية selector, Help; no catalog/bag clutter before reveal. 16px gutters, content max 480px even on desktop.
2. Gift artwork from selected wrapping theme, then h1 **“A gift, just for you.”**, “From Maya” only when sender supplied; message shown as selectable text in a blockquote, directional auto-detection, escaped as text.
3. **AED 300.00 to spend at ECO**; “Choose what you love. Keep any remaining balance for later.” Show exact supported market/currency, any approved expiry/restrictions, and terms link.
4. Signed out → primary **Sign in to claim your gift**, secondary How it works; explanation “An account keeps your gift balance safe.” No claim caused by opening/reloading/previewing link.
5. Signed in/unclaimed → account identity, **Switch account**, primary **Claim AED300**, short single-use explanation. This is the only binding claim action.
6. Claimed by current account → success heading **“It's yours.”**, “AED300 added to your gift balance”; primary **Choose your gift**; balance bar persists in eligible catalog/cart. Gift recipient address is collected only during checkout.
7. Footer Help / gift terms / privacy; after claim normal store shell may resume. No autoplay confetti, share-to-unlock, or forced card entry.

**Desktop:** retain 480px readable reveal, optional 5/7 artwork/content split capped at960px; no artificial oversized mobile bezel.

**States:** link lookup skeleton contains no amount/sender until validated; malformed/revoked/not funded/expired → neutral **“This gift isn't available”**, explanation that does not disclose another person's details + Contact support with nonsecret reference. Already claimed by current owner → balance/activity and Shop gifts; by someone else → “This gift has already been claimed”, no account identity. Wrong intended email → verify eligible account privately, Switch account, support. Claim race → recover canonical result; claim service unavailable → Retry, no premature success. Sender omitted/message empty → omit those sections. Currency-incompatible store → explain supported market and change-market path before claiming. Refund/chargeback freeze → visible balance unavailable state and support, not unexplained zero.

**Accessibility:** amount is real text, meaningful heading, no text embedded only in gift art; success announced once; token never in public share buttons/analytics/error logs. Recipient content `dir=auto`; no automatic claim confirmation focus jump while reading. Reason: gift warmth and balance ownership must coexist.

### S8. Admin incoming offers & requests inbox

**Purpose:** Let a small staff team triage assistance, compose valid quotes, and avoid conflicting customer promises.

**Desktop layout:**

1. 240px sidebar from admin IA, staff identity/role, Switch to store.
2. Main header **Offers & requests**, search by request/order/customer reference; no revenue metrics crowding the inbox. New request only if staff-originated requests are supported.
3. Tabs **Needs reply (8), Waiting for customer, All**; filters Request type, Status, Assignee, Date; Clear filters and active chips. Sort oldest awaiting staff first by default; true overdue badge only if an actual SLA is configured.
4. List pane ~360px: each row request type, customer display name/reference, short subject, budget/proposed amount + currency, last activity, assignee, text status, unread dot with accessible unread label. Selection highlight uses background + indicator, never color alone. Do not show full addresses in list.
5. Detail pane flexible: request title/reference, customer context link, Assign / Resolve menu; submitted specification/photo/link, exact budget/purpose/deadline and requested variants; thread timeline and quote history use same domain presentation as S4. Internal note tab visibly labeled **Internal · Not visible to customer**; outbound reply tab **Reply to customer**.
6. Sticky detail footer **Create quote** (primary) and **Reply** (secondary); in quote-compose mode primary becomes **Review & send quote**. Quote drawer/editor: product/variant picker or sourced item, quantity, unit price, explicit discount with reason, source availability, shipping option/fee/delivery commitment, wrap units/design/fee, extras, tax treatment, currency, expiry/time zone, customer-facing terms. Auto totals are read-only. For F07 add options A/B/C; each has its own complete payable total. F06 basket supports buyer Request a swap through S4, resulting in a new quote. F05 source item has sufficient description/image/specification, lead time and return terms; do not pretend it is in catalog stock.
7. Preview is customer-facing exact snapshot including version and expiry, then **Send quote v3**. Buyer notification channel if configured. Record staff author and timestamp; Cancel returns draft without sending. Rejection requires a customer-facing reason; internal notes never substitute for it.

**Mobile:** navigation drawer → list-only first; selecting row opens full detail with Back preserving filters and scroll. Quote editor full screen, sectioned Items / Delivery & extras / Terms / Review. Primary footer never covers last input; landscape tablet can use split view only if both panes stay usable. Avoid horizontal scrolling tables.

**States:** no requests → “You're all caught up”; no filtered results → Clear filters. List loading skeleton; detail loading separately; list API failure Retry; detail not authorized → neutral access message. Draft quote autosave label includes success/failure and timestamp; unsent draft never looks Sent. Validation blocks negative totals, incompatible currencies, expired expiry, unavailable variants, missing shipping/terms. Another staff member updated request → conflict banner with View latest; compare before resubmitting, no last-write-wins quote overwrite. Duplicate Send protected server-side. Accepted-unpaid quote is read-only with View accepted quote/payment state; paid quote shows View order. Unpaid cancellation requires a logged privileged action and reason; paid cancellations/refunds use the order workflow. Attachment scanning blocks file access until safe; failed upload retains other draft fields. Permission-limited controls omitted with clear access help when route is reached.

**Accessibility:** semantic list or table for inbox, full keyboard operation; status text and counts; labels for amount/currency; financial preview/error summary before sending. Confirm irreversible public sends with complete preview, not a vague “Are you sure?”. Reason: make the next staff action obvious while protecting the exact agreement.

### S9. Arabic product detail — RTL mobile

**Purpose:** Deliver S2's complete functionality in native Arabic layout, not a visually flipped English page.

**Top to bottom at 390px:**

1. `<html lang="ar" dir="rtl">`; Back arrow on the **right**, ECO/Home centered or right-start, Search/Bag on the **left**. Accessible names localized: “رجوع”, “بحث”, “السلة”. No device chrome.
2. Same truthful product gallery, **image itself not mirrored**; gallery initial/page navigation follows RTL reading convention with logical Previous/Next labeling. Badge “الصورة ١ من ٥”.
3. Right-aligned breadcrumb **الإكسسوارات / الحقائب**; h1 **حقيبة قماش للاستخدام اليومي**; localized price **١٨٠٫٠٠ د.إ.**; tax label from market configuration. Let formatted amount wrap as one isolated unit, never manually concatenate punctuation/currency.
4. Fieldset **اللون: زيتوني**; radios **زيتوني / رملي**; size **المقاس** / **مقاس واحد**; **متوفر**. Quantity group aligned at logical start, with plus/minus order consistent with tested RTL component behavior; no mirrored digit shapes created by CSS.
5. Destination **التوصيل إلى دبي · تغيير**; estimator and policy content translated with actual fulfillment data.
6. Accordion **تغليف وإضافة رسالة**; fee **١٢٫٠٠ د.إ. لكل قطعة مغلّفة**; localized wrapping tiles/message counter/preview; Arabic message input `dir=auto` permits English mixed content.
7. Sticky primary **أضف إلى السلة** with selected total; secondary **جرّبها معًا** in body. Alternative rows **قدّم عرضًا لمجموعة** and **تفاوض على صفقة**. Their drawers use S2 semantics and account rule.
8. Campaign banner **اشتروا معًا**; **١٨ مشاركًا من أصل ٢٥**; campaign price **١٥٠٫٠٠ د.إ.**; explicit localized date/time and explanatory terms. A qualified Arabic content reviewer must check plurals, not just translate string fragments.
9. Accordions **تفاصيل المنتج**, **المقاسات والخامات**, **التوصيل والإرجاع**; related products and localized footer. Mobile shell uses the same PDP action-bar replacement as S2.

**Desktop adaptation:** same 7/5 S2 split at logical start/end; gallery at right/start, purchase panel at left/end. Mobile order stays gallery then product selection; do not reverse the DOM to mirror the page.

**Implementation rules:** use `ms/me`, `ps/pe`, `start/end`, `text-start`, logical borders; Radix/shadcn direction provider must match document direction. Do not apply global `scaleX(-1)` or `row-reverse` blindly. Mirror chevrons/back arrows; preserve product photos, brand marks, clocks, payment logos. Use `Intl.NumberFormat('ar-AE', {style:'currency', currency:'AED'})` and locale-aware dates; examples show Arabic-Indic digits, but actual formatter output is canonical. Isolate SKU `ECO-TOTE-OLV`, emails, URLs, phone numbers and mixed product names with `<bdi>` / appropriate `dir="ltr"`; user-authored messages `dir="auto"`. Store a raw value separately from its display. Parse locally entered Arabic/Persian/Latin numerals to the same amount and keep validation Arabic.

**States:** all S2 loading/empty/error/variant/campaign states have Arabic copy; Arabic skeleton layout respects logical alignment. Missing product translation shows a clear label such as **وصف المنتج متاح بالإنجليزية** and marks the fallback fragment `lang=en`, preserving RTL chrome. Never translate only success states; test checkout declines, quote expiry, invalid phone/address, image failure and stock changes. Locale switch preserves selected variant, cart, board and request draft. Unavailable locale does not silently reset destination/currency.

**Accessibility:** Noto Sans Arabic 16/28px, no tracking/kashida tricks, full diacritics unclipped; TalkBack/VoiceOver Arabic labels and reading order tested; directional keyboard behavior verified rather than assumed. Arabic and English functional parity is a launch requirement. Reason: localization includes interaction, bidirectional text and error recovery, not just translation.

## 6. Component inventory and states

These are shared components, not additional screen designs. Prefer shadcn/Radix primitives, but test their configured behavior; the library name does not establish WCAG conformance.

**Primitive mapping:** use shadcn `Button`, `Input`, `Textarea`, `Label`, `Select`, `Checkbox`, `RadioGroup`, `Badge`, `Card`, `Separator`, `Accordion`, `Tabs`, `Dialog`, `Sheet`, `Progress`, `Skeleton`, and `Alert`; use `Popover` + `Command` for a fully labeled searchable picker where suitable. `QuoteCard`, `VersionHistory`, `PriceDisplay`, `WrapEditor`, `BoardCanvas/List`, `CampaignMemberState`, `GiftBalance`, and `CheckoutSummary` are custom compositions of those primitives. Use a real form library/schema for field state; primitive styling alone does not supply validation or transaction logic.

**Attachment default:** accept up to five JPEG/PNG/WebP images, 10 MB each, and one optional PDF up to 10 MB per request. Show supported types, size/count limits and upload status before submission; permit removing/retrying individual files. Provide URL and plain-text specification alternatives. Keep these limits configurable to match the actual service. Camera upload is optional, not a required permission. A failed upload must not clear the user's request text.

- **Button / IconButton:** primary, outline secondary, ghost, link, destructive; default/hover/pressed/focus-visible/loading/disabled. Loading retains width and action label (“Adding…”); disabled reason is adjacent text. Icons decorative when text supplies name. 48px standard height.
- **TextField / Textarea / MoneyInput:** label, optional/required text, hint, validation; pristine/focus/filled/error/read-only/disabled/saving. Money includes currency separately and accepts locale digits. Never placeholder-only; distinguish disabled from locked snapshot.
- **Select / Combobox / RadioGroup / Checkbox:** unchecked/checked/indeterminate/focus/disabled/error. Use country/emirate search combobox, visible radio tiles for a small set of delivery/wrap options; checkbox only for independent choices.
- **VariantSelector:** named swatch, size tile, selected check, available/low stock/unavailable/loading/error; changing selection updates relevant photo/price/stock. Unavailable choice retains a readable explanation.
- **QuantityStepper:** decrement/input/increment, min/max/pending/error; allow direct numeric entry; labels identify product; maximum from inventory/policy, not a universal arbitrary99.
- **PriceDisplay / MoneyBreakdown:** regular, actual former price + sale, campaign comparison, estimated, locked quote, gift credit, unknown cost. Show ISO/currency format, localized separators, explicit discount minus, full total. Do not render unknown delivery as AED0.
- **ProductCard / ProductRow:** image/name/price/variant context, available/sold out/loading/image failure; skeleton has real aspect ratio; price stays readable on narrow widths. Navigation and separate actions are not nested interactive elements.
- **Gallery / ZoomDialog:** loading, loaded, single image, video if real, missing image; thumb/current marker; keyboard previous/next, accessible close, focus return. Generic unavailable-image copy, not broken-image icon alone.
- **WrapEditor / GiftPreview:** no wrap/selected/per-unit quantity/fee updating/preview/invalid length/unavailable; preview matches submitted message and selected design. Preview is illustrative, not a claim of exact print output.
- **QuoteCard / VersionHistory / QuoteOption:** draft, sent/actionable, accepted-unpaid, paid, superseded, expired, rejected, withdrawn; only eligible latest version has commit. Visible version, currency, complete breakdown, expiry and selected option. Compare text has explicit before/after labels.
- **StatusBadge:** text + optional icon; request, quote, campaign, payment, fulfillment, return and refund are independent vocabularies. Example “Refund pending” differs from “Refunded”; do not map both to green Success.
- **Thread / Message / Attachment:** incoming/outgoing/system/internal, sending/sent/failed; author and timestamp; upload progress, scan pending, ready, failed, unavailable; messages escaped and links safely handled. Failed message retry preserves identity to avoid duplicate sends.
- **Countdown / Deadline:** absolute timestamp always; relative coarse display; active/closing/closed/offline; server-authoritative end state. No screen-reader announcement every tick. Let textual dates wrap.
- **Progress / CampaignMemberState:** 0/partial/target reached/over target/full/closed/succeeded/failed/refunding/refunded; visible paid count and target; never imply payment success from button click.
- **GiftBalance / ClaimCard:** unclaimed/claiming/claimed-current/claimed-other/revoked/frozen/expired if applicable, applied/partly used/exhausted; expose only authorized information and real currency.
- **AddressForm / AddressCard:** country-dependent labels/required fields, saved/new/manual lookup, loading/invalid/outside delivery area; preserve common values when country changes but flag incompatible fields; no obligatory UAE postcode.
- **CheckoutSummary / PaymentRegion:** estimated/final/locked/pending/failed/paid/zero-payable. Exact commit amount, method, gift allocation; do not use a generic “Continue” to conceal a charge.
- **BoardCanvas / BoardItem / BoardList:** unselected/selected/moving/unavailable/missing variant/saving/offline/conflict; Undo/Redo state; keyboard/tap parity; visual positions never change prices.
- **Dialog / Sheet / Drawer / Accordion / Tabs:** closed/open/focused/loading/validation; focus trap for modal only, accessible title, escape/close, logical direction, scroll-safe action footer; draft-discard confirmation only when needed.
- **Toast / InlineAlert / ErrorSummary / Skeleton:** status polite vs critical alert; failures needing action persist inline; toasts are supplemental, not sole receipt/error channel; reserve layout while loading and respect reduced motion.
- **InboxRow / FilterBar / Assignee / QuoteComposer:** unread/read/selected/assigned/conflict/forbidden/draft/sending/sent; visible counts reflect filters, totals server-calculated; customer/public and internal editor contexts visually distinct.
- **AddOnEligibility:** eligible/checking/reserved/cutoff closed/paid-attached/failed-refunding; visible server cutoff and attachment outcome. A timer alone never grants eligibility.

## 7. Accessibility and international implementation acceptance

Target **WCAG 2.2 AA**, with final conformance established by implementation testing, not by mockups. WCAG thresholds include 4.5:1 regular text, 3:1 large text, and applicable 3:1 non-text boundaries/states. Use the stronger input token for required field boundaries; decorative dividers may be lighter. Check every actual foreground/background pair, including hover, error, and disabled-context explanations. Source: [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/).

- Every journey works with keyboard only; visible focus is never covered by header/footer/sheets. Every drag action has tap and keyboard equivalents; this addresses WCAG's [Dragging Movements requirement](https://www.w3.org/WAI/WCAG22/understanding/).
- Apply 44px target design preference; WCAG 2.2 AA specifies a [24px minimum with spacing/exceptions](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum). Test actual hitboxes rather than counting icon dimensions.
- Heading hierarchy, landmarks, native forms, skip link and live regions; errors identify field + fix. Announce totals only after deliberate changes; do not steal focus for background messages.
- Support 200% text zoom and 400% browser zoom/reflow; no horizontal page scroll at320CSSpx except an inherently spatial board, with its equivalent list. Test browser text-spacing overrides. No essential content hidden on mobile.
- Auth supports password managers/paste/autofill and alternatives to cognitive puzzles; do not force memorization or block code paste. Reuse entered shipping information where permitted instead of repeated entry.
- Screen readers: VoiceOver/Safari and TalkBack/Chrome mobile; NVDA with a desktop browser. Test Arabic manually with a competent speaker using RTL and mixed text, not just screenshots.
- Set `lang` and `dir` on document; use logical CSS and explicit mixed-text isolation. W3C documents [structural RTL markup](https://www.w3.org/International/questions/qa-html-dir.en.html) and [inline bidirectional isolation](https://www.w3.org/International/articles/inline-bidi-markup/index.en).
- Separate locale, destination, and transaction currency in application state. Currency selection does not imply international delivery. Use formatters with per-currency minor units, locale plural rules, translated whole messages, and localized dates. Store timestamps in UTC; campaign/quote business time zone is explicit.
- Stripe UI shows eligible wallets only in supported environments; merchant setup/domain registration and enabled methods matter. Sources: [Stripe Express Checkout Element](https://docs.stripe.com/elements/express-checkout-element), [Stripe Payment Element](https://docs.stripe.com/payments/payment-element). Configure only card/Apple Pay/Google Pay for this brief; do not enable unrelated methods just because Stripe supports them.

## 8. Practical build order and review checklist

For two developers, build shared primitives and transaction boundaries before feature-specific polish. Developer A can own customer shell, catalog, board and localization; Developer B can own account/checkout, quotes, campaign/gift state and staff workflows. Review the shared money/status/quote/address contracts together.

Suggested sequence: tokens + English/Arabic shell → catalog/PDP/cart → account/address/Stripe checkout → shared quote/thread + staff inbox → wrap/board/assisted request drawers → campaigns/refunds → funded gifts/claim/balance → order add-ons. Every stage includes keyboard/RTL verification, not a final translation sprint.

Before release, demonstrate these concrete scenarios:

1. Guest configures wrapped size/color → sign-in → exact same cart survives; conflicting account cart gets a visible review.
2. v2 is superseded in another tab; old Accept is rejected server-side and v3 is reviewable. Accepted quote amount cannot be edited from the cart.
3. Quote expires during authentication/payment; server returns one reconciled outcome and no stale fresh charge.
4. Duplicate payment click, refresh and interrupted webhook produce one charge/order, with pending UI until authoritative outcome.
5. Group goal reached then withdrawal takes it below target; final close resolves under published rule. Failure refunds all paid campaign charges and shows actual refund status.
6. Two accounts open a gift link; only one authorized claim succeeds. Current owner can recover on reload; other account sees no recipient details. Link-preview bots never claim.
7. Gift value below/above checkout total; zero-remainder checkout asks for no card, excess is explicit, refund allocation matches ledger.
8. Packing closes while add-on is being paid; no untracked charge or silently modified original receipt.
9. English/Arabic at320/390/768/1440px, long names, Arabic/Latin SKU mixtures, missing image, slow network, keyboard-only, 200% text and400% zoom remain usable.
10. Screen-reader user selects variants, wraps a unit, compares quote options, moves board items without drag, and pays with identifiable totals/errors.

Record analytics without gift tokens, payment data, addresses or message text: search→PDP, variant error, add-to-cart, checkout step/error, quote reviewed/accepted by version, campaign join outcome, gift claim outcome, add-on cutoff failure. Judge conversion alongside financial exceptions and support contacts; do not optimize clicks at the expense of clarity.

### Mockup handoff

Five generated frames accompany this document: S1 desktop, S2 desktop, S2 mobile, S4 desktop, S9 Arabic mobile. They are visual references, not production screenshots or proof of accessibility. The exact state logic, copy corrections, responsive rules and token file in this handoff take precedence over image-generation artifacts. Source prompts are saved with the images for reproducibility.

Known raster deviations to correct in implementation: mobile images have natural portrait proportions rather than exact 390×844 exports; use the layout rules rather than scaling the raster. Remove incidental date footers and the S4 leaf decoration beside ECO. Use the same actual product photo across locales, locale formatter output for Arabic amounts, the specified responsive catalog column counts, and shared navigation. Gallery/quantity/delivery controls or below-fold secondary actions absent from a compact raster are still required by S2/S9. The S1 organizer retail sample is AED40, while the S4 illustrative quote uses AED20 as a separately quoted unit price; actual UI must show the real catalog/quote values from their respective snapshots.
