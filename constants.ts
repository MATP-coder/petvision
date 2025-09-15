
import type { ArtStyle } from './types';

export const ART_STYLES: ArtStyle[] = [
  {
    id: 'superhero',
    title: 'Superhero 🦸‍♂️',
    tagline: 'Make your pet the hero of its own story.',
    image: 'https://picsum.photos/seed/superhero/500/500',
    prompts: [
        'Ultra-dynamic comic book art. A close-up portrait of the pet as a superhero, bursting forward with intense energy. Glowing eyes, a powerful emblem on its chest, and a dramatic cape billowing in the wind against a hyper-detailed, sun-drenched city skyline. Style of a modern graphic novel cover.',
        'Full-body action shot of the pet as a superhero, landing powerfully on a rooftop, cracking the concrete. Dynamic perspective from a low angle, looking up. The background is a rain-slicked, neon-lit city at night. Explosive energy and motion lines. Highly detailed, cinematic.'
    ],
  },
  {
    id: 'royal',
    title: 'Royal Renaissance 👑',
    tagline: 'Majestic, kingly and regal.',
    image: 'https://picsum.photos/seed/royal/500/500',
    prompts: [
        'A majestic, opulent Renaissance oil painting. The pet is portrayed as royalty, seated regally on a lavish, velvet-and-gold throne. It wears an ornate, jewel-encrusted crown and a heavy, fur-trimmed robe. The setting is a grand castle hall with dramatic chiaroscuro lighting from a large fireplace. Extremely detailed, rich textures. Style of Rembrandt.',
        'A noble, full-body portrait of the pet as a monarch, standing proudly beside a large, arched window in a castle. One paw rests on a royal scepter. The view outside shows a sprawling kingdom. The lighting is soft and ethereal, like a classic painting from the High Renaissance. Regal, dignified, and awe-inspiring.'
    ],
  },
  {
    id: 'galactic',
    title: 'Galactic Glow 🌌',
    tagline: 'Your pet in the cosmos, surrounded by stars.',
    image: 'https://picsum.photos/seed/galactic/500/500',
    prompts: [
        "A breathtaking cosmic portrait. The pet's form is made of swirling stardust and nebulae, with glowing, star-like eyes. It floats serenely in deep space, surrounded by vibrant, colorful galaxies, distant planets, and shimmering constellations. Ethereal, mystical, and awe-inspiring digital art.",
        "The pet as a cosmic guardian, standing majestically on a floating, crystalline asteroid. A vibrant aurora borealis and a massive, ringed planet dominate the background. The pet's fur has a subtle, iridescent shimmer, reflecting the light of a million stars. Epic, cinematic, fantasy space art."
    ],
  },
  {
    id: 'floral',
    title: 'Floral Fantasy 🌸',
    tagline: 'Romantic, colorful, framed with blossoms.',
    image: 'https://picsum.photos/seed/floral/500/500',
    prompts: [
        "A romantic, dream-like portrait of the pet's face, beautifully framed by an intricate, lush wreath of hyper-realistic blooming flowers (roses, peonies, lavender). Soft, warm sunlight filters through, creating a gentle glow and a soft bokeh background. Enchanting and beautiful fantasy art style.",
        "The pet sitting peacefully in a magical, enchanted meadow filled with an explosion of colorful, glowing flowers. Butterflies flutter around its head. The style is a mix of realism and fantasy, with a soft, painted texture and magical lighting effects. Serene and captivating."
    ],
  },
  {
    id: 'surreal',
    title: 'Pop-Surreal 🎭',
    tagline: 'Dreamlike surreal artistic worlds.',
    image: 'https://picsum.photos/seed/surreal/500/500',
    prompts: [
        "A vibrant, pop-surrealism masterpiece. The pet stands calmly amidst a bizarre, candy-colored dreamscape. Floating teacups pour waterfalls, clocks are melting over giant mushrooms, and the sky is filled with colorful, fluffy clouds. Highly imaginative, whimsical, and strange, in the style of Mark Ryden.",
        "A surreal portrait where the pet is part of a whimsical circus scene. It's balancing on a checkerboard ball, surrounded by floating balloons and a carousel in the sky. The colors are psychedelic and saturated. A playful, dreamlike, and wonderfully weird illustration."
    ],
  },
  {
    id: 'street',
    title: 'Street Art 🎨',
    tagline: 'Urban graffiti look for cool pets.',
    image: 'https://picsum.photos/seed/street/500/500',
    prompts: [
        "A powerful, close-up street art mural of the pet's face on a gritty, weathered brick wall. Created with explosive spray paint techniques, featuring bold outlines, vibrant splashes of neon color, and abstract graffiti tags in the background. Edgy, urban, and full of raw energy.",
        "A full-body stencil and spray paint artwork of the pet, in the style of Banksy, on a concrete urban wall. The pet is interacting with a single, poignant element, like a red heart-shaped balloon. The surrounding area has textures of peeling paint and graffiti. Thought-provoking, modern, and cool."
    ],
  },
  {
    id: 'mosaic',
    title: 'Stained Glass 🪟',
    tagline: 'Elegant, inspired by stained glass.',
    image: 'https://picsum.photos/seed/mosaic/500/500',
    prompts: [
        "An intricate, divine stained glass window portrait of the pet's face. Composed of richly colored, luminous glass pieces held together by bold, black lead lines. A radiant halo of geometric patterns emanates from behind its head, creating a holy, glowing effect as if lit from behind by the sun.",
        "A full-body representation of the pet in a magnificent, cathedral-style stained glass mosaic. The pet is depicted in a noble, serene pose, surrounded by ornate, flowing patterns and symbols. The colors are deep, vibrant jewels—ruby red, sapphire blue, emerald green—creating a breathtaking, spiritual artwork."
    ],
  },
  {
    id: 'gold',
    title: 'Monochrome & Metallic ✨',
    tagline: 'Minimalist B&W with metallic shine.',
    image: 'https://picsum.photos/seed/gold/500/500',
    prompts: [
        "A dramatic, high-fashion, monochrome portrait of the pet against a pure black background. Striking, elegant lines of liquid gold are artfully painted on its fur, creating a kintsugi-like effect. The lighting is sharp, high-contrast, and cinematic, emphasizing texture and form. Minimalist, luxurious, and powerful.",
        "A minimalist, artistic shot. The pet is depicted in profile, rendered in elegant black and white. Shimmering silver accents trace the contours of its silhouette. The composition is clean and sophisticated, focusing on the interplay of light, shadow, and the metallic shine. Modern and chic."
    ],
  },
  {
    id: 'fantasy',
    title: 'Fantasy-Mythic 🐉',
    tagline: 'Your pet as a mythical fantasy creature.',
    image: 'https://picsum.photos/seed/fantasy/500/500',
    prompts: [
        "Transform the pet into a majestic, mythical creature. It stands proudly, adorned with magnificent, feathered angel wings, in the heart of a sun-dappled, ancient, enchanted forest. Magical light particles float in the air, and sunbeams pierce through the dense canopy. Epic fantasy book cover art.",
        "The pet reimagined as a noble guardian spirit of a misty, mountainous landscape reminiscent of ancient legends. It has small, elegant dragon horns and glowing, ethereal eyes. It stands on a cliff edge overlooking a valley shrouded in mist. The mood is mystical, powerful, and serene. High-fantasy digital painting."
    ],
  },
];