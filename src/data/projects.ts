export const EXPERIENCE_PROJECTS = [
  'openai',
  'apple',
  'comcast',
  'blackstone',
  'elephant-website',
] as const;

export const CLIENT_PROJECTS = [
  'luupe',
  'thought-catalog',
  'studio-apartment',
  'dojobase',
  'linode',
  'tolli',
  'moni-jar',
  '826chi-2016',
  '826chi-2017',
] as const;

export const PASSION_PROJECTS = [
  'music-practice',
  'sugarstream',
  'fs-shows',
] as const;

export const ALL_PROJECTS = [
  ...EXPERIENCE_PROJECTS,
  ...CLIENT_PROJECTS,
  ...PASSION_PROJECTS,
];
