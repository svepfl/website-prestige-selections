function pexels(id: number, w = 1920) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
}

export const IMAGES = {
  hero: {
    main: pexels(26954165),
    secondary: pexels(5397410),
    mobile: pexels(33345481),
  },
  featured: {
    sportscar1: pexels(30453079, 800),
    sportscar2: pexels(29831790, 800),
    sportscar3: pexels(17077313, 800),
    classic1: pexels(4645506, 800),
    classic2: pexels(10373439, 800),
    luxury1: pexels(17632052, 800),
    luxury2: pexels(15097792, 800),
    dark1: pexels(33345481, 800),
    dark2: pexels(33268786, 800),
    dark3: pexels(26954165, 800),
    interior1: pexels(3894066, 800),
    showroom1: pexels(35113538, 800),
  },
  services: {
    kaufen: pexels(17632052),
    werkstatt: pexels(8985462),
    aufbereitung: pexels(14231684),
  },
  promise: pexels(3894066),
  heritage: pexels(4645506),
  contact: pexels(35113538),
  werkstattPage: pexels(8985462),
  werkstattDetail: pexels(14231701),
  about: pexels(15097792),
} as const;

export const VEHICLE_PLACEHOLDERS: Record<string, string> = {
  "ASTON MARTIN": pexels(33345481, 800),
  BENTLEY: pexels(17632052, 800),
  FERRARI: pexels(30453079, 800),
  LAMBORGHINI: pexels(33268786, 800),
  MASERATI: pexels(29831790, 800),
  PORSCHE: pexels(26954165, 800),
  "ROLLS ROYCE": pexels(15097792, 800),
};
