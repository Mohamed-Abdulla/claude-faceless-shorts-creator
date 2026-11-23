import { ShortProject } from './types';

export interface PublishingData {
  titles: { label: string; text: string }[];
  youtubeDescription: string;
  youtubeTags: string[];
  instagramCaption: string;
  instagramTags: string[];
  allHashtags: string[];
}

export function generatePublishingKit(project: ShortProject): PublishingData {
  const name = project.name.toLowerCase();
  const script = project.script || '';

  // 1. Animals / Pets (short-15-animals)
  if (name.includes('animal') || name.includes('dog') || name.includes('cat')) {
    return {
      titles: [
        { label: '🔥 High Curiosity Hook', text: 'What Dogs & Cats ACTUALLY Say to Each Other! 🐾' },
        { label: '⚡ Punchy & Viral', text: 'The Secret Pet Language You Never Knew 🐶🐱' },
        { label: '🔍 Search / SEO Friendly', text: 'Why Dogs & Cats Get Confused (Animal Secrets)' },
      ],
      youtubeDescription: `Have you ever wondered what cats and dogs actually say to each other? 🐾
When a dog wags its tail, it's ready to play. But when a cat twitches its tail, it means back off! They speak opposite body languages, but they still end up best friends.

Which one does your pet do? Drop a comment below! 👇

#Shorts #AnimalFacts #DogLanguage #CatLanguage #CutePets`,
      youtubeTags: ['#Shorts', '#AnimalFacts', '#DogLanguage', '#CatLanguage', '#CutePets'],
      instagramCaption: `Did you know cats and dogs speak completely opposite languages? 🐶🐱

When your dog wags its tail, it means pure excitement and playtime! But when a cat flicks its tail? Back off, personal space required! 😂

A dog's play-bow says "let's run!", while a cat's slow blink says "I trust you". Opposite body language, but somehow still best friends forever! ❤️

Which one does your pet do the most? Tell us in the comments! 🐾
.
.
#reels #doglovers #catlovers #petlife #animalfacts #wholesomepets #cutedogs #cutecats`,
      instagramTags: ['#doglovers', '#catlovers', '#petlife', '#animalfacts', '#cutedogs'],
      allHashtags: [
        '#Shorts',
        '#AnimalFacts',
        '#DogLanguage',
        '#CatLanguage',
        '#CutePets',
        '#DogLovers',
        '#CatLovers',
        '#PetLife',
        '#WholesomePets',
        '#CuteAnimals',
        '#Reels',
        '#ViralReels',
        '#PetParents',
        '#DogBehavior',
        '#CatBehavior',
      ],
    };
  }

  // 2. Chess Tactics (short-1-chess)
  if (name.includes('chess') || script.includes('checkmate') || script.includes('bishop')) {
    return {
      titles: [
        { label: '🔥 High Curiosity Hook', text: 'How to PUNISH the 4-Move Checkmate Trap! ♟️' },
        { label: '⚡ Punchy & Viral', text: "Stop Falling for Scholar's Mate! Do THIS Instead 🚫" },
        { label: '🔍 Search / SEO Friendly', text: '4-Move Checkmate Refutation: The Ultimate Trap Counter' },
      ],
      youtubeDescription: `This trap wins millions of beginner chess games in just four moves. ♟️
Bishop c4 and Queen h5 aim right at f7. But playing pawn to g6 stops the mate and knight to f6 develops with tempo!

Have you ever fallen for this trap? Be honest in the comments! 👇

#Shorts #Chess #ChessTactics #ScholarsMate #ChessTricks`,
      youtubeTags: ['#Shorts', '#Chess', '#ChessTactics', '#ScholarsMate', '#ChessTricks'],
      instagramCaption: `Stop falling for the 4-Move Checkmate! ♟️🚫

Every beginner faces Queen h5 and Bishop c4 aiming straight at f7. If you play natural knight moves, it's game over in seconds!

Here is how to punish it:
1️⃣ Play 3... g6! Hits the queen and shuts down the mate.
2️⃣ When the queen retreats to f3, play 4... Nf6!
3️⃣ Black gains total control with 3 developing moves while White danced around for nothing.

Save this reel before your next blitz match! ♟️🔥
.
.
#chess #chesstactics #chessmoves #chesscom #chesslover #grandmaster #blitzchess`,
      instagramTags: ['#chess', '#chesstactics', '#chessmoves', '#chesscom', '#blitzchess'],
      allHashtags: [
        '#Shorts',
        '#Chess',
        '#ChessTactics',
        '#ScholarsMate',
        '#ChessTricks',
        '#ChessMoves',
        '#ChessCom',
        '#ChessLover',
        '#BlitzChess',
        '#Grandmaster',
        '#ChessStrategy',
        '#OpeningTrap',
      ],
    };
  }

  // 3. Mental Math Trick (short-2-math)
  if (name.includes('math') || script.includes('eleven') || script.includes('calculator')) {
    return {
      titles: [
        { label: '🔥 High Curiosity Hook', text: 'Multiply by 11 in 2 Seconds in Your Head! 🧠⚡' },
        { label: '⚡ Punchy & Viral', text: 'The Math Trick School Never Taught You! 🤯' },
        { label: '🔍 Search / SEO Friendly', text: 'Fast Mental Math: How to Multiply by 11 Instantly' },
      ],
      youtubeDescription: `Multiply any two-digit number by eleven in two seconds without a calculator. 🧠⚡
Split the digits, add them together, and drop the sum in the middle!

Can you solve 63 × 11 in your head? Drop your answer in the comments! 👇

#Shorts #MathTricks #MentalMath #StudyHacks #BrainTeaser`,
      youtubeTags: ['#Shorts', '#MathTricks', '#MentalMath', '#StudyHacks', '#BrainTeaser'],
      instagramCaption: `The math trick school forgot to teach you! 🤯⚡

Want to multiply any two-digit number by 11 in 2 seconds?
Here's the secret formula:
👉 Example: 72 × 11
1. Split the 7 and the 2.
2. Add them: 7 + 2 = 9.
3. Drop the 9 in the middle: 792! Done.

Test yourself: What is 45 × 11? Put your answer in the comments! 💬
Save this for your next test or mental math showdown! 📚
.
.
#mathtricks #mentalmath #studyhacks #brainhacks #quickmath #schoolhacks #studentlife`,
      instagramTags: ['#mathtricks', '#mentalmath', '#studyhacks', '#brainhacks', '#studentlife'],
      allHashtags: [
        '#Shorts',
        '#MathTricks',
        '#MentalMath',
        '#StudyHacks',
        '#BrainTeaser',
        '#QuickMath',
        '#SchoolHacks',
        '#StudentLife',
        '#MathHacks',
        '#GeniusMath',
        '#Reels',
      ],
    };
  }

  // 4. Children Nursery Rhyme (short-14-twinkle)
  if (name.includes('twinkle') || name.includes('rhyme') || name.includes('star')) {
    return {
      titles: [
        { label: '🔥 High Curiosity Hook', text: 'Twinkle Twinkle Little Star | Cute Singing Baby 🌟👶' },
        { label: '⚡ Punchy & Viral', text: 'Calming Lullaby for Sweet Dreams & Bedtime 🌙✨' },
        { label: '🔍 Search / SEO Friendly', text: 'Twinkle Twinkle Little Star Nursery Rhymes & Kids Songs' },
      ],
      youtubeDescription: `Twinkle, twinkle, little star, how I wonder what you are! 🌟
Sing along with our cute baby and the magical glowing star. A calming, soothing bedtime lullaby for sweet dreams.

Subscribe for more magical kids songs and rhymes! 🌙👶

#Shorts #NurseryRhymes #KidsSongs #TwinkleTwinkle #BedtimeLullaby`,
      youtubeTags: ['#Shorts', '#NurseryRhymes', '#KidsSongs', '#TwinkleTwinkle', '#BedtimeLullaby'],
      instagramCaption: `Twinkle, twinkle, little star, how I wonder what you are! 🌟👶

Soothing animated bedtime lullaby to help your little one relax and drift into sweet dreams. Follow along with the friendly singing baby and floating kawaii diamond star! ✨

Tag a parent who needs a relaxing bedtime moment! 🌙💤
.
.
#nurseryrhymes #kidssongs #toddlerlife #parentinglife #bedtimeroutine #lullaby #babyrhymes`,
      instagramTags: ['#nurseryrhymes', '#kidssongs', '#toddlerlife', '#parentinglife', '#lullaby'],
      allHashtags: [
        '#Shorts',
        '#NurseryRhymes',
        '#KidsSongs',
        '#TwinkleTwinkle',
        '#BedtimeLullaby',
        '#ToddlerLife',
        '#ParentingLife',
        '#BabySongs',
        '#KidsAnimation',
        '#CuteBaby',
        '#SweetDreams',
      ],
    };
  }

  // 5. Developer / Tech (short-13-codevideo or generic)
  return {
    titles: [
      { label: '🔥 High Curiosity Hook', text: `Why Everyone Is Talking About ${project.name.replace(/short-\d+-/g, '').toUpperCase()}! 🚀` },
      { label: '⚡ Punchy & Viral', text: `Stop Doing This the Hard Way! (Do This Instead) 💡` },
      { label: '🔍 Search / SEO Friendly', text: `${project.name.replace(/short-\d+-/g, '')} Explained in 30 Seconds` },
    ],
    youtubeDescription: `Quick 30-second breakdown!
${script.slice(0, 180)}...

Drop a like if this helped and subscribe for daily quick shorts! 🚀

#Shorts #DevTips #TechHacks #Coding #QuickTutorial`,
    youtubeTags: ['#Shorts', '#DevTips', '#TechHacks', '#Coding', '#QuickTutorial'],
    instagramCaption: `Save this quick breakdown for later! 💡🚀

${script.slice(0, 150)}...

Did you find this useful? Drop your thoughts below! 👇
.
.
#developer #codinglife #techreels #softwareengineer #webdev #programmer`,
    instagramTags: ['#developer', '#codinglife', '#techreels', '#softwareengineer', '#programmer'],
    allHashtags: [
      '#Shorts',
      '#DevTips',
      '#TechHacks',
      '#Coding',
      '#QuickTutorial',
      '#Developer',
      '#CodingLife',
      '#TechReels',
      '#SoftwareEngineer',
      '#Programmer',
      '#WebDev',
    ],
  };
}
