/* Everything the Studios site says about each project lives here.
   Edit this file to change text, prices, links or add a new project. */
window.AZOKI = {
  signupTo: 'hello@azokistudios.com',   // where email sign-ups are sent (through formsubmit.co)
  links: {
    wintervilleBuy: '',   // paste the itch.io address here when the page exists: every Winterville button becomes a buy button
    codeseaBuy: 'https://braydon262.itch.io/code-sea',
    coderealmBuy: 'https://braydon262.itch.io/code-realm',
    reefBuy: 'https://braydon262.itch.io/desktop-reef',
    codedlens: 'https://codedlens.com',
    gremletsPlay: 'https://braydonhartai.com/gremlets/',
    gremletsRepo: 'https://github.com/Braydon2622/gremlets',
    hearthsideDemo: 'https://braydon2622.github.io/hearthside/',
    hearthsideRepo: 'https://github.com/Braydon2622/hearthside',
    market: 'https://azokimarket.com'
  },
  works: [
    {
      id: 'codesea',
      no: '01',
      title: 'Code Sea',
      kind: 'Live wallpaper',
      tagline: 'A living ocean behind your desktop icons, drawn entirely in text.',
      status: 'Released', version: '1.0.0',
      platform: 'Windows 10 & 11 · macOS coming soon',
      price: '$1',
      accent: '#6fe7ff',
      cover: 'assets/codesea-whale-rise-day.jpg',
      lead: 'Code Sea is a live wallpaper of an underwater world where every creature is a 3D model drawn in real time out of text characters. It lives behind your desktop icons, swims around them, and watches your mouse.',
      stats: [
        ['240 × 77', 'characters on a 1080p screen, redrawn every frame'],
        ['6 min', 'for the sea to turn through all five waves'],
        ['25', 'automated tests the sea has to pass'],
        ['$1', 'once, on itch.io']
      ],
      groups: [
        { h: 'The sea comes in waves', items: [
          ['Open water', 'Reef fish, a sea turtle, a manta ray gliding past, a hammerhead cruising by, and now and then a visiting school of yellow tangs, barracuda or blue fusiliers.'],
          ['The school', 'Hundreds of fish pour in and flow in figure-eights, flashing silver as they turn, while a great white hunts through them.'],
          ['Jelly bloom', 'Jellyfish of every size rise out of the deep.'],
          ['The deep', 'The light fades, the plankton glows, a giant squid rises and an anglerfish dangles its lure.'],
          ['The whale', 'A humpback blows a ring of bubbles round the bait ball, then rises from the dark, gulps through it and surges up and away past the glass.']
        ]},
        { h: 'It plays with your mouse', items: [
          ['Feed them', 'Rest the cursor over open water and food drifts down; the fish come to eat.'],
          ['Scatter them', 'Move it through a school and they bolt, then re-form.'],
          ['Get hunted', 'Hold still near the great white and it stalks the cursor and lunges.'],
          ['Get scanned', 'The hammerhead sweeps over a resting cursor, sensing it with little sparks.'],
          ['Hear a song', 'Rest it by the whale\'s eye and it sings, its song spreading through the water in rings.'],
          ['And the rest', 'The turtle circles it, dolphins blow bubble rings at it, the squid flashes its colours, the barracuda stare at it, and the coral spawns.']
        ]},
        { h: 'Made to live on your desktop', items: [
          ['Every monitor', 'Each screen gets its own sea, started from a different seed, so no two are twins.'],
          ['Costs nothing while you work', 'It pauses itself when a window covers the desktop, and slows down on battery.'],
          ['Yours to direct', 'A settings button in the corner of your desktop switches any animal on or off, skips ahead, feeds the fish or jumps to any scene.'],
          ['Readable, always', 'Your icons sit in a gentle current, and nothing ever swims brighter than their labels.'],
          ['On the clock', 'The light follows the real time of day, and the whale comes at the top of every hour.']
        ]}
      ],
      how: 'Nothing is drawn with lines or shapes. Each frame is a grid of characters, uploaded as one small texture and drawn in a single pass through a font atlas. Creatures are 3D models sampled into thousands of points and splatted into cells: outline cells follow the silhouette, inside cells take a letter from a density ramp keyed to the surface, so the letters ride along with the body.',
      motion: [   // [file, caption, width, height]
        ['assets/codesea-whale.gif', 'The whale rises', 640, 360],
        ['assets/codesea-bloom.gif', 'Jelly bloom', 800, 450]
      ],
      gallery: [
        ['assets/codesea-cover-whale.jpg', 'The whale, close'],
        ['assets/codesea-school-shark-day.jpg', 'The great white in the school'],
        ['assets/codesea-bloom-day.jpg', 'Jelly bloom'],
        ['assets/codesea-deep-night.jpg', 'The deep'],
        ['assets/codesea-dolphins-night.jpg', 'Dolphins at night'],
        ['assets/codesea-glow-bloom-night.jpg', 'A glowing bloom'],
        ['assets/codesea-turtle-night.jpg', 'The turtle'],
        ['assets/codesea-dawn.jpg', 'Dawn']
      ],
      notes: [
        'Windows 10 or 11. macOS 11 or later is coming soon.',
        'Code Sea is an independent app without a paid code-signing certificate, so the first time you run it Windows may say "Windows protected your PC". Click More info, then Run anyway.'
      ],
      cta: { label: 'Get Code Sea for $1', link: 'codeseaBuy' }
    },
    {
      id: 'coderealm',
      no: '02',
      title: 'Code Realm',
      kind: 'Live wallpaper',
      tagline: 'A live wallpaper of cinematic paintings, drawn entirely in code.',
      status: 'Released', version: '1.0.0',
      platform: 'Windows 10 & 11',
      price: '$1',
      accent: '#f0b25a',
      cover: 'assets/coderealm-vigil.jpg',
      lead: 'Code Realm turns your desktop into a living painting made of code. Ten cinematic scenes, each one a real painting redrawn in thousands of coloured letters and brought to life behind your desktop icons.',
      stats: [
        ['10', 'scenes, from a knight\'s vigil to a pirate broadside'],
        ['6', 'points of paint each letter is matched against'],
        ['30', 'frames a second'],
        ['$1', 'once, on itch.io']
      ],
      groups: [
        { h: 'Ten scenes', items: [
          ['The Vigil', 'A knight kneeling at his sword in a meadow of wildflowers.'],
          ['The Wanderer', 'A samurai in golden rice under a red maple.'],
          ['The Landfall', 'A Viking chieftain on a headland as longships come up the fjord.'],
          ['The Lantern Road', 'A hooded traveller on a wet medieval street at dusk.'],
          ['The High Pass', 'A mounted knight in a blizzard facing a fire-breathing dragon.'],
          ['The Last Watch', 'An archer on the battlements at dawn.'],
          ['The White Stag', 'A glowing stag by a waterfall in a night forest.'],
          ['The Caravan Road', 'A desert rider above a caravan at sunset.'],
          ['The Last Stand', 'A wounded knight with a torn banner after the battle.'],
          ['The Broadside', 'A pirate captain as his cannons fire on a burning warship.']
        ]},
        { h: 'Made to live on your desktop', items: [
          ['Everything moves', 'Figures breathe, turn and shift their weight. Banners, cloaks and sails ripple. Fires flicker, cannons fire, lightning strikes, waterfalls run, clouds drift, ships ride the swell.'],
          ['It follows your day', 'The light changes with the real clock, from dawn to noon to dusk to night, or you can pick the hour yourself. Now and then a storm rolls in.'],
          ['It stays out of your way', 'It sits behind your icons and never takes your clicks, and it pauses whenever a maximised or full-screen window covers the desktop.'],
          ['Yours to direct', 'A small button on the desktop, or the tray icon: scene, time of day, weather, how much everything moves, letter size, mirror, pause, start with Windows.']
        ]}
      ],
      how: 'Each scene starts as a painting, made with AI assistance for this project. It is drawn into a small picture with six points for every letter on screen, bent on the way by the scene\'s tracing so skies slide, grass leans and cloth ripples. Then each letter cell looks at its six points and picks the character whose own shape matches them best, so an edge through a cell becomes a slash, an underscore or a bar rather than a grey blob.',
      gallery: [
        ['assets/coderealm-vigil.jpg', 'The Vigil'],
        ['assets/coderealm-wanderer.jpg', 'The Wanderer'],
        ['assets/coderealm-landfall.jpg', 'The Landfall'],
        ['assets/coderealm-lantern-road.jpg', 'The Lantern Road'],
        ['assets/coderealm-high-pass.jpg', 'The High Pass'],
        ['assets/coderealm-last-watch.jpg', 'The Last Watch'],
        ['assets/coderealm-white-stag.jpg', 'The White Stag'],
        ['assets/coderealm-caravan-road.jpg', 'The Caravan Road'],
        ['assets/coderealm-last-stand.jpg', 'The Last Stand'],
        ['assets/coderealm-broadside.jpg', 'The Broadside']
      ],
      notes: [
        'Windows 10 or 11. One download, no installer: unzip and double-click.',
        'Code Realm is an independent app without a paid code-signing certificate, so the first time you run it Windows may say "Windows protected your PC". Click More info, then Run anyway.'
      ],
      cta: { label: 'Get Code Realm for $1', link: 'coderealmBuy' }
    },
    {
      id: 'hearthside',
      no: '03',
      title: 'Hearthside',
      kind: 'Live wallpaper',
      tagline: 'A hand-painted village that rearranges itself around your icons.',
      status: 'Browser demo', version: '2',
      platform: 'Windows 10 & 11',
      price: 'Free demo',
      accent: '#ffa24d',
      cover: 'assets/hearthside-sunset.jpg',
      lead: 'A small hand-painted village seen from high above, living behind your desktop icons. Icons get open plazas under them, houses and trees step aside, paths link groups of icons, and villagers, a cat and a dog stroll the lanes. Drag an icon somewhere new and the ground ripples out from where you dropped it.',
      stats: [
        ['28', 'colours in the one palette every sprite is snapped to'],
        ['1,000+', 'bushes, flower drifts, fences and stepping stones placed by code'],
        ['5–9%', 'of one CPU core while animating'],
        ['< 1%', 'while a window covers the desktop']
      ],
      groups: [
        { h: 'How it works', items: [
          ['The land is a field, not a picture', 'Every icon adds a soft hill of open ground; paths and empty slots add theirs. The sum becomes the shape of the village, recomputed only when icons move.'],
          ['One light', 'No sprite carries its own shadow. The engine casts every object\'s blurred silhouette away from one light, so everything sits in the same scene.'],
          ['One palette', 'All painted sprites are snapped to a shared 28-colour palette with a painted edge, so art from different sheets reads as one set.'],
          ['Density from code', 'Bushes, crop fields and fences are drawn from a few code-painted templates and kept quiet near icons so labels stay readable.'],
          ['A full desktop becomes a district', 'Crowd the screen and the village turns into lawn lots and cobbled lanes, with houses and trees in the empty slots.']
        ]}
      ],
      how: 'The painted sprites and ground textures are AI-generated from prompts written for this project, then cut, palette-matched and edge-painted by a script. Everything else, the ground, shadows, filler, lighting and animation, is drawn by code.',
      gallery: [
        ['assets/hearthside-noon.jpg', 'Noon'],
        ['assets/hearthside-sunset.jpg', 'Sunset'],
        ['assets/hearthside-night.jpg', 'Night'],
        ['assets/hearthside-fill-noon.jpg', 'A crowded desktop becomes a district']
      ],
      notes: ['Windows 10 and Windows 11, including 24H2. The demo runs in any modern browser.'],
      cta: { label: 'Try the browser demo', link: 'hearthsideDemo' },
      cta2: { label: 'Source on GitHub', link: 'hearthsideRepo' }
    },
    {
      id: 'desktop-reef',
      no: '04',
      title: 'Desktop Reef',
      kind: 'Live wallpaper',
      tagline: 'A living tropical lagoon that grows around your desktop icons.',
      status: 'Released', version: '1.0.2',
      platform: 'Windows 10 & 11',
      price: '$1',
      accent: '#3fe6cf',
      cover: 'assets/reef-wide.jpg',
      lead: 'The bright one. A shallow tropical lagoon seen from above: your icons sit on islands of sand ringed with palms, and coral gardens grow in the water between them while fish, sharks, turtles and people in boats go about their day.',
      stats: [
        ['1.0.2', 'the current build'],
        ['4%', 'of a mid-range CPU, about'],
        ['Live', 'weather where you are, from open-meteo.com'],
        ['$1', 'once, on itch.io']
      ],
      groups: [
        { h: 'A lagoon built around your desktop', items: [
          ['Islands under your icons', 'Every icon sits on its own island of sand, and the reef grows in the water around them.'],
          ['Your files shape the scene', 'Jetties, a lighthouse and more appear from what is on your desktop.'],
          ['Life in the water', 'Fish, sharks, turtles and people in boats. Click an animal to find out what it is.'],
          ['Real weather', 'The sky over the lagoon follows the weather where you live.'],
          ['The whirlpool', 'Drag a file into it and the file goes to the Recycle Bin.']
        ]}
      ],
      how: '',
      gallery: [
        ['assets/reef-wide.jpg', 'Coral gardens in the shallows'],
        ['assets/reef-tall.jpg', 'A reef wall']
      ],
      notes: [
        'Windows 10 or 11.',
        'Desktop Reef is an independent app without a paid code-signing certificate, so the first time you run it Windows may say "Windows protected your PC". Click More info, then Run anyway.'
      ],
      cta: { label: 'Get Desktop Reef for $1', link: 'reefBuy' }
    },
    {
      id: 'codedlens',
      no: '05',
      title: 'Coded Lens',
      kind: 'Web tool',
      tagline: 'Turn any video into ASCII art.',
      status: 'Live', version: '1',
      platform: 'Any browser, best in Chrome or Edge',
      price: 'Free, with Pro',
      accent: '#6fe7ff',
      embed: 'https://codedlens.com/',   // the page header shows the live tool itself
      cover: '',
      lead: 'Drop in any clip or photo. Every frame gets rebuilt from glowing colored letters, then you can download it as a video for TikTok, Reels or Shorts. It all runs in your browser, so your clips never leave your device.',
      stats: [
        ['10', 'looks, from Code Sea to Matrix Rain and Braille HD'],
        ['3', 'looks free forever: Code Sea, Sea Night and Blocks'],
        ['4K', 'export with Pro'],
        ['0', 'uploads: everything is drawn on your own device']
      ],
      groups: [
        { h: 'How it works', items: [
          ['Upload', 'Pick a video or a photo, or drag one onto the page.'],
          ['Tune', 'Set how many letters cross the frame, which characters paint brightness, the palette, edges, glow and sparkle.'],
          ['Record', 'It plays the clip once in real time and hands you a video to download.']
        ]}
      ],
      how: '',
      gallery: [],
      notes: ['Free looks carry a small codedlens.com mark on exports. Pro unlocks every look, clean exports and 4K.'],
      cta: { label: 'Open Coded Lens', link: 'codedlens' }
    },
    {
      id: 'gremlets',
      no: '06',
      title: 'Gremlets',
      kind: 'Desktop companions',
      tagline: 'Tiny pixel creatures that live on your Mac desktop.',
      status: 'Playable in the browser', version: '1',
      platform: 'macOS, plus a web habitat',
      price: 'Free',
      accent: '#8fe36b',
      cover: 'assets/gremlets-lineup.png', pixel: true,
      lead: 'Sixty eight one-of-a-kind pixel creatures that walk along the Dock line, hop up onto your app windows, ride along when you drag a window, play tag, nap in piles and throw dance parties. They keep you company while you focus and hide when you are on a call.',
      stats: [
        ['68', 'species, each one of a kind'],
        ['228', 'automated tests'],
        ['1', 'bonsai grown for every project you work on']
      ],
      groups: [
        { h: 'What they do', items: [
          ['Live on your windows', 'They build staircases of wooden blocks up to windows out of reach, lay plank bridges across gaps and ride minecarts along the wide ones.'],
          ['Grow with your work', 'Every project grows a bonsai that gets fuller with each Claude Code session, flowers with finished tasks and fruits when tests pass.'],
          ['Go on expeditions', 'A treasure chest turns up somewhere hard to reach and a Gremlet plans a route across your windows to fetch it.'],
          ['Stay out of the way', 'Full screen puts everything away, clicks always go through to your app, and they never move or resize your windows.']
        ]}
      ],
      how: '',
      gallery: [['assets/gremlets-lineup.png', 'The 68 Gremlets']],
      notes: ['The desktop app is for macOS. The web habitat runs in any browser.'],
      cta: { label: 'Play with the Gremlets', link: 'gremletsPlay' },
      cta2: { label: 'Source on GitHub', link: 'gremletsRepo' }
    },
    {
      id: 'winterville',
      no: '07',
      title: 'Winterville',
      kind: 'Desktop game',
      tagline: 'A pixel village that spends the winter on your desktop.',
      status: 'Coming soon', version: 'in time for Christmas',
      platform: 'Windows',
      price: 'To be announced',
      accent: '#ff8a70',
      cover: 'assets/winterville-town.png', pixel: true,
      lead: 'A snowy little town settles along the bottom of your screen while you work. Snow falls on your real windows and piles up; move a window and it tumbles off. Snow folk parachute in, walk along your title bars, ride your cursor and throw snowballs back. Open one door on the calendar each day and the town grows all the way to Christmas.',
      stats: [
        ['30', 'doors on the winter calendar, one a day'],
        ['30', 'more when the snow melts and spring arrives'],
        ['6', 'music box carols to unlock'],
        ['1', 'clock tower counting down to Christmas']
      ],
      groups: [
        { h: 'A town that grows', items: [
          ['The calendar', 'One door a day for thirty days. Doors bring gifts, new styles and new buildings: a toy shop, an ice palace, a giant snow globe, the mail train.'],
          ['Snowflakes', 'The snow you see falling is the town\'s money. Spend it on lamp posts, igloos, a snow fort or a cocoa stand, and on hats, scarves and lights for the folk.'],
          ['Town projects', 'Start a snow castle or a giant Christmas tree and the folk carry snow to the site until it is finished.'],
          ['Christmas Eve', 'Bells in the sky. Santa lands in the town square with a present for everyone.'],
          ['Then spring', 'The snow melts and a second calendar begins: flower boxes, kite day, ducklings on the pond.']
        ]},
        { h: 'It plays with your desktop', items: [
          ['Snow on your windows', 'It piles up on every window, hangs icicles underneath and strings lights between them. Shake a window hard for a blizzard.'],
          ['Pick them up', 'Drag a snow folk onto a window, give one a ride on your cursor, or roll a snowball and start a fight. They throw back.'],
          ['Draw a sled run', 'Hold Alt and drag a line anywhere on screen; the folk will sled down it.'],
          ['Carve the ice', 'Hold Shift and carve the day\'s ice block yourself. The judges score it out of ten.'],
          ['Frost', 'Leave for a while and frost creeps in from the edges of the screen. Wipe it off when you are back.']
        ]},
        { h: 'The folk remember', items: [
          ['Residents', 'Every snow folk has a name and a temper: grumpy, brave, giggly or sleepy. They remember rides, avalanches and exactly how many times you hit them.'],
          ['Gossip', 'They make best friends, fall in love, have babies and tell you all about each other.'],
          ['Visitors', 'Penguins, foxes, seals, owls and reindeer wander through. Feed one its favourite treat and you have a friend.'],
          ['Snowball post', 'Throw a snowball to a real friend with a short code, and one of your folk turns up in their village.']
        ]},
        { h: 'It knows you are working', items: [
          ['Focus clock', 'Start a focus session and the whole town builds a big snowman while you work. Snow counts double.'],
          ['Quiet on calls', 'The town hushes while you are in a meeting and asks how it went afterwards.'],
          ['Small kindnesses', 'A nudge when your battery is low, a yawn when it is really late.'],
          ['Real weather', 'Switch it on and the first real snow where you live sets off a First Snow festival in town.']
        ]}
      ],
      how: 'The game runs as a see-through window that sits on top of your desktop and lets every click pass through unless it lands on something in the town. Many of the small sprites are drawn by code from grids of letters, and the sound effects are generated when the game starts.',
      gallery: [
        ['assets/winterville-town.png', 'The town, along the bottom of the screen'],
        ['assets/winterville-eve.png', 'Christmas Eve: Santa in the square'],
        ['assets/winterville-calendar.png', 'The winter calendar'],
        ['assets/winterville-train.png', 'The Winter Express pulls in'],
        ['assets/winterville-market.png', 'Garlands and the Christmas market'],
        ['assets/winterville-windows.png', 'Lights and icicles on your windows'],
        ['assets/winterville-frost.png', 'Frost creeps in while you are away']
      ],
      notes: [
        'Coming to itch.io this season. Leave your email on the home page and you will hear the day it is out.',
        'Stills are from a test build, taken over a plain backdrop.'
      ],
      cta: { label: 'Get Winterville on itch.io', link: 'wintervilleBuy', soon: 'Tell me when it is out' }
    }
  ]
};
