/* ===========================================================
   data.js
   Static "real" content for SportsBizInsider.
   In a future version, replace these arrays with data fetched
   from Firebase Realtime Database or a live sports API.

   Article "body" entries can be either:
     - a plain string -> rendered as a paragraph
     - { image: "...", caption: "..." } -> rendered as an inline photo
   =========================================================== */

const NEWS_DATA = [
  {
    id: "n1",
    category: "business",
    tag: "Soccer",
    title: "Premier League Tech Innovation (and fan data)",
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&h=400&fit=crop",
    summary: "Premier League clubs are leaning harder into fan-data platforms as sponsorship and streaming deals grow more competitive.",
    body: [
      "Top-flight English clubs are investing heavily in fan-engagement technology, using first-party data to personalize ticketing, merchandise offers, and streaming content for supporters around the world.",
      "The push comes as broadcast and sponsorship revenue increasingly depends on demonstrating audience reach beyond the stadium. Clubs that can show advertisers detailed engagement data are securing stronger commercial terms, particularly in fast-growing markets across Asia and North America where a club's digital footprint can matter as much as its matchday attendance.",
      { image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=600&h=350&fit=crop", caption: "Clubs are using app and ticketing data to build detailed fan profiles." },
      "Several clubs have built dedicated data science teams whose job is purely commercial rather than tactical — modeling which supporters are likely to renew a season ticket, which international fans might convert into merchandise buyers, and which content formats keep app users engaged between matchdays.",
      "Industry analysts say this data-driven approach is becoming a competitive differentiator off the pitch, with some clubs now treating their supporter database as a core commercial asset alongside matchday and broadcast income. A handful of clubs have gone as far as building internal 'fan value' scores, not unlike a credit score, that estimate the lifetime commercial worth of an individual supporter.",
      "The trend also raises new questions for club executives around data privacy and consent, especially as supporter data increasingly crosses borders to feed sponsorship pitches aimed at multinational brands. Expect this to be a recurring theme as the next broadcast rights cycle approaches."
    ],
    source: "Sports Business Desk",
    date: "June 19, 2026"
  },
  {
    id: "n2",
    category: "legal",
    tag: "Tennis",
    title: "Wimbledon Media Rights Deal (and the legal challenges)",
    image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=600&h=400&fit=crop",
    summary: "beIN Sports has renewed its exclusive Wimbledon broadcast agreement in the MENA region, extending media rights through the end of the decade.",
    body: [
      "Pay-TV broadcaster beIN Sports has renewed its exclusive rights agreement for the Wimbledon Championships in the MENA region, locking in coverage through the end of the decade.",
      "Long-term rights renewals like this give tournaments revenue certainty but also raise recurring legal questions around exclusivity clauses, sub-licensing for streaming platforms, and regional blackout restrictions.",
      { image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=600&h=350&fit=crop", caption: "Wimbledon's grass courts remain one of the most fought-over broadcast properties in tennis." },
      "Legal teams on both sides typically spend months negotiating territory definitions and digital rights carve-outs, since linear TV and streaming rights increasingly need to be treated as separate negotiating tracks. A single ambiguous clause about 'digital simulcast' rights, for example, can become the subject of a multi-year dispute if a tournament later wants to launch its own direct-to-consumer app in a licensed territory.",
      "Sports law specialists note that the All England Club has become notably more aggressive in recent renewal cycles about retaining short-clip and highlights rights separately from full-match broadcast rights, allowing it to license social media content independently — a structure other Grand Slam events have started to copy.",
      "With the MENA renewal now locked in, attention turns to upcoming negotiations in other key territories, where rival bidders are reportedly circling as streaming platforms continue to chase marquee live sports content to anchor subscription growth."
    ],
    source: "SportBusiness",
    date: "June 17, 2026"
  },
  {
    id: "n3",
    category: "tech",
    tag: "Basketball",
    keywords: "NBA basketball g-league",
    title: "New NBA G-League Franchise Value (and player pathways)",
    image: "https://images.unsplash.com/photo-1518063319789-7217e6706b04?w=600&h=400&fit=crop",
    summary: "NBA team sponsorship revenue hit a record $1.8B this season as brands concentrated spending into fewer, larger deals.",
    body: [
      "NBA team sponsorship revenue reached a record $1.8 billion in the 2025-26 season, up roughly 11% year-over-year, according to industry tracking data.",
      "The growth was driven less by an increase in deal volume and more by brands concentrating spend into fewer, larger partnerships — a sign that companies want deeper integration rather than simple logo placement.",
      { image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&h=350&fit=crop", caption: "Jersey patch and courtside branding deals have grown into nine-figure agreements for top-market teams." },
      "Development pathways like the G-League are increasingly part of these conversations too, as sponsors look for ways to attach themselves to player stories earlier in their careers, well before a prospect reaches a marquee NBA roster. Several G-League affiliates have begun selling their own standalone jersey patch and arena-naming packages rather than bundling them automatically with the parent NBA franchise.",
      "League executives say this 'farm system' commercial model mirrors what baseball has done for decades with Minor League affiliates, giving regional and emerging brands a lower-cost entry point into basketball sponsorship while still buying into the broader NBA ecosystem.",
      "Looking ahead, league insiders expect continued consolidation, with fewer but larger sponsors dominating marquee inventory, while mid-market brands increasingly chase G-League and international exhibition opportunities instead."
    ],
    source: "Front Office Sports",
    date: "June 4, 2026"
  },
  {
    id: "n4",
    category: "business",
    tag: "Formula 1",
    keywords: "F1 formula1 racing red bull verstappen",
    title: "Red Bull Racing Sponsors",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop",
    summary: "Formula 1 has named Fever as its new official ticketing supplier in a five-year global partnership beginning with the 2027 season.",
    body: [
      "Formula 1 has signed a five-year deal, running from 2027 to 2031, with live-entertainment technology platform Fever to build and operate a brand-new ticketing platform fully integrated into F1.com.",
      "The agreement covers official general admission tickets, local venue hospitality, and the series-wide Paddock Club program, putting all three ticketing tiers under a single technology partner for the first time.",
      { image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&h=350&fit=crop", caption: "F1's new ticketing platform is designed to streamline how fans search for and book race tickets worldwide." },
      "F1's chief commercial officer said the priority behind the switch was making the booking journey feel seamless, noting that searching for, purchasing, and managing tickets has become a more important part of the overall fan experience as global demand for race attendance keeps climbing.",
      "This marks F1's first change of ticketing operator in more than a decade, with Fever replacing longtime partner Platinium Group. Fever already has a foothold in the sport through its work on the Spanish Grand Prix and a separate, longer-running deal to manage ticketing and fan engagement at Madrid's new Madring circuit through 2035.",
      "For team sponsors like Red Bull Racing, a unified, data-rich ticketing platform could open new opportunities to target hospitality and trackside packages directly at fans who have already shown purchase intent — turning what used to be a logistics function into a genuine marketing channel.",
      "The shift also lands at a strong commercial moment for the sport: F1's primary revenue for the first quarter of 2026 came in at $496 million, up sharply from the prior year, as race promotion fees, media rights, and sponsorship income all climbed."
    ],
    source: "SportBusiness",
    date: "June 18, 2026"
  },
  {
    id: "n5",
    category: "tech",
    tag: "Baseball",
    keywords: "MLB baseball world series",
    title: "World Series Tech Integration (and instant replay)",
    image: "https://images.unsplash.com/photo-1508344928928-7165b67de128?w=600&h=400&fit=crop",
    summary: "MLB owners are pushing for a salary cap ahead of the 2026 CBA fight, a debate that's increasingly intertwined with the league's broadcast technology investments.",
    body: [
      "MLB's collective bargaining negotiations are heating up ahead of the current agreement's December 1 expiration, with owners pushing for a hard cap-and-floor salary system.",
      "The MLB Players Association remains firmly opposed to a cap, setting up one of the more consequential labor fights in recent league history, with both sides expected to dig in over the second half of the season.",
      { image: "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?w=600&h=350&fit=crop", caption: "Instant replay and player-tracking technology have become central to how MLB broadcasts are produced." },
      "Separately, the league continues to expand its in-broadcast technology stack — including instant replay review, automated strike-zone tracking trials, and high-speed player-tracking cameras — which front offices and broadcasters alike say has become central to how the modern game is presented to fans.",
      "Some owners argue the cost of this broadcast technology buildout is itself a reason a salary structure overhaul is needed, since it represents a growing fixed cost that competes with payroll for the same revenue pool. Players' representatives have pushed back on that framing, arguing technology spend and player compensation are separate issues being conflated for negotiating leverage.",
      "Whatever the outcome, the technology itself isn't going anywhere — networks have signaled they expect even deeper integration of tracking data and alternate broadcast feeds for the postseason, a trend that began with the World Series and has since spread throughout the regular season schedule."
    ],
    source: "Sports Business Journal",
    date: "June 5, 2026"
  },
  {
    id: "n6",
    category: "business",
    tag: "Multi-sport",
    title: "DAZN Leadership Change Signals Global Strategy Shift",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop",
    summary: "Global streaming service DAZN replaced its Italy CEO as part of a broader leadership shake-up across its European operations.",
    body: [
      "Global sports subscription service DAZN has changed leadership in Italy, with Andrea Faelli replacing Stefano Azzi as CEO of the territory's operations.",
      "The move comes as DAZN continues to expand its global footprint, recently bringing FIFA+ exclusively onto its platform as part of a deepened distribution relationship with FIFA that bundles thousands of live matches, archive replays, and original programming into a single hub.",
      { image: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=600&h=350&fit=crop", caption: "DAZN continues to expand its streaming footprint across Europe as competition for football rights intensifies." },
      "Italy has long been one of DAZN's most important — and most challenging — markets, given the country's complex football broadcast rights landscape and history of high-profile carriage disputes with internet service providers over streaming quality complaints.",
      "Analysts see the leadership change as part of DAZN's broader push to tighten regional execution as competition for football streaming rights intensifies across Europe, with rival platforms continuing to bid aggressively for domestic league packages.",
      "The new Italy CEO inherits a business under pressure to demonstrate profitability after years of rights-driven spending, and industry watchers expect the leadership transition to come with a renewed focus on subscriber retention and bundling strategy rather than further large rights acquisitions in the near term."
    ],
    source: "SportBusiness",
    date: "June 18, 2026"
  }
];

const SCORES_DATA = [
  {
    id: "s1",
    sport: "Cricket",
    league: "Cricket World Cup Final",
    status: "Full Time",
    teamA: { name: "India", flag: "🇮🇳", score: "312/7 (50 ov)" },
    teamB: { name: "Australia", flag: "🇦🇺", score: "285/10 (48.4 ov)" },
    actionLabel: "BETTING ODDS",
    detail: {
      headline: "India win the Cricket World Cup Final by 27 runs",
      summary: "India posted 312/7 batting first and bowled Australia out for 285 in 48.4 overs to lift the trophy in front of a sold-out crowd at the MCG.",
      stats: [
        { label: "Venue", value: "Melbourne Cricket Ground" },
        { label: "Toss", value: "India won, chose to bat" },
        { label: "Player of the Match", value: "V. Kohli — 118 (97)" },
        { label: "Top Bowler", value: "J. Bumrah — 4/41 (10 ov)" },
        { label: "Result", value: "India won by 27 runs" },
        { label: "Attendance", value: "92,463" }
      ],
      timeline: [
        { time: "Innings 1", text: "India win the toss, elect to bat. Kohli anchors the innings with 118 off 97 balls; India post 312/7 from their 50 overs." },
        { time: "Innings 2", text: "Australia's chase stays competitive through the middle overs before Bumrah's spell (4/41) breaks the partnership and triggers a collapse." },
        { time: "Final Result", text: "Australia bowled out for 285 in 48.4 overs. India win the Cricket World Cup Final by 27 runs." }
      ]
    }
  },
  {
    id: "s2",
    sport: "Baseball",
    league: "MLB Regular Season",
    status: "Bottom 8th, 1 Out",
    teamA: { name: "New York Yankees", flag: "⚾", score: "5" },
    teamB: { name: "Boston Red Sox", flag: "⚾", score: "3" },
    actionLabel: "BETTING ODDS",
    detail: {
      headline: "Yankees lead Red Sox 5-3 heading into the bottom of the 8th",
      summary: "New York has used a three-run sixth inning to take control of this AL East matchup at Fenway Park, and now leads with one out in the bottom of the 8th.",
      stats: [
        { label: "Venue", value: "Fenway Park, Boston" },
        { label: "Leading Hitter", value: "A. Judge — 2 HR, 4 RBI" },
        { label: "Pitching", value: "G. Cole (W), 6.1 IP, 2 ER" },
        { label: "Red Sox Reliever", value: "C. Crawford, 1.2 IP, 1 ER" },
        { label: "Attendance", value: "37,021" }
      ],
      timeline: [
        { time: "Top 1st", text: "Yankees strike first — Judge opens the scoring with a solo home run to right field." },
        { time: "Bottom 4th", text: "Red Sox respond with back-to-back doubles, tying the game at 2-2." },
        { time: "Top 6th", text: "Judge adds a second home run, a three-run shot, putting New York ahead 5-2." },
        { time: "Bottom 7th", text: "Red Sox claw one run back on a sacrifice fly, making it 5-3." },
        { time: "Bottom 8th", text: "Yankees bring in a fresh reliever with the tying run on deck. One out recorded so far." }
      ]
    }
  },
  {
    id: "s3",
    sport: "Motorsport",
    league: "F1 Italian Grand Prix — Race",
    status: "Race Finish",
    podium: [
      { pos: 1, driver: "Max Verstappen (Red Bull)", time: "1:21:45.333" },
      { pos: 2, driver: "Sergio Perez (Red Bull)", time: "+12.4s" },
      { pos: 3, driver: "Carlos Sainz (Ferrari)", time: "+15.1s" }
    ],
    actionLabel: "RESULTS",
    detail: {
      headline: "Verstappen takes victory at the Italian Grand Prix",
      summary: "Red Bull locked out the top two positions at Monza, with Verstappen leading home teammate Perez and Ferrari's Sainz completing the podium.",
      stats: [
        { label: "Venue", value: "Autodromo Nazionale Monza" },
        { label: "Pole Position", value: "M. Verstappen — 1:19.876" },
        { label: "Fastest Lap", value: "C. Sainz — 1:23.887" },
        { label: "Laps", value: "53 / 53" },
        { label: "Pit Stops (Winner)", value: "1 stop, lap 28" }
      ],
      timeline: [
        { time: "Lap 1", text: "Verstappen converts pole into the race lead at Turn 1, with Perez following through into second." },
        { time: "Lap 28", text: "Verstappen pits for a single set of hard tires, rejoining still in the lead." },
        { time: "Lap 41", text: "Sainz passes a slowing Perez briefly before a late Red Bull pace surge reclaims the position." },
        { time: "Lap 53", text: "Verstappen takes the chequered flag, completing a Red Bull 1-2 ahead of Sainz in third." }
      ]
    }
  },
  {
    id: "s4",
    sport: "Football",
    league: "NFL Sunday Night Football",
    status: "4th Qtr 0:11",
    teamA: { name: "Kansas City Chiefs", flag: "🏈", score: "27" },
    teamB: { name: "Buffalo Bills", flag: "🦬", score: "24" },
    actionLabel: "BETTING ODDS",
    detail: {
      headline: "Chiefs hold off Bills late, 27-24",
      summary: "Kansas City's defense forced a turnover on downs with 11 seconds remaining to seal a hard-fought divisional-style showdown at Arrowhead.",
      stats: [
        { label: "Venue", value: "Arrowhead Stadium, Kansas City" },
        { label: "Passing Leader", value: "P. Mahomes — 312 yds, 3 TD" },
        { label: "Rushing Leader", value: "J. Cook (Bills) — 94 yds, 1 TD" },
        { label: "Sacks", value: "Chiefs 4, Bills 2" },
        { label: "Attendance", value: "76,416" }
      ],
      timeline: [
        { time: "1st Qtr", text: "Chiefs strike early with a Mahomes touchdown pass, taking a 7-0 lead." },
        { time: "2nd Qtr", text: "Bills answer with a rushing touchdown from Cook, tying the game 14-14 at the half." },
        { time: "3rd Qtr", text: "Mahomes throws his second touchdown of the night, Chiefs lead 21-17 entering the fourth." },
        { time: "4th Qtr", text: "Bills retake the lead briefly at 24-21 before a late Chiefs field goal and a game-sealing defensive stop secure the win." }
      ]
    }
  }
];