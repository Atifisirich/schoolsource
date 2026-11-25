// The picture for each category, for ColorTile and the colour-field PageHeader.
// Files are in public/images/cutouts (credited in public/images/photos/PHOTOS.md).
//
// fit: "cutout" a transparent product that stands on the tile's bottom edge
//      "wide"   a wide transparent product that runs edge to edge
//      "frame"  a photo, shown in a rounded frame inside the colour field

export type ArtFit = "cutout" | "wide" | "frame";

export type Art = {
  src: string;
  width: number;
  height: number;
  fit: ArtFit;
  /** Describes the picture, for pages where it is not decorative */
  alt: string;
};

const c = (file: string, width: number, height: number, fit: ArtFit, alt: string): Art => ({
  src: `/images/cutouts/${file}.webp`,
  width,
  height,
  fit,
  alt,
});

export const categoryArt: Record<string, Art> = {
  stationery: c("f-stationery", 900, 600, "frame", "Pots of colour pencils, pens and markers"),
  textbooks: c("book", 1000, 533, "wide", "An open book with its pages fanned out"),
  "printing-id-cards": c("f-exam", 900, 600, "frame", "Printed answer sheets with a pencil"),
  "teaching-aids": c("f-globe", 500, 600, "frame", "A globe on a classroom windowsill"),
  "uniforms-bags": c("skirt", 529, 580, "cutout", "A navy pleated school skirt"),
  housekeeping: c("firstaid", 581, 716, "cutout", "A red first aid kit and a stethoscope"),
  sports: c("football", 334, 335, "cutout", "A football"),
  "gifts-awards": c("trophy", 580, 811, "cutout", "A gold trophy on a black base"),
  music: c("xylophone", 651, 541, "cutout", "A rainbow xylophone"),
  library: c("f-library", 900, 601, "frame", "Library shelves full of books"),
  labs: c("f-microscope", 700, 750, "frame", "A microscope on a lab bench"),
  "computers-tech": c("f-computers", 900, 600, "frame", "A school computer lab"),
  furniture: c("f-desks", 900, 563, "frame", "An empty classroom with desks and a green board"),
  electricals: c("f-fan", 900, 600, "frame", "A ceiling fan"),
  "canteen-kitchen": c("utensils", 768, 243, "wide", "A row of steel kitchen ladles and spoons"),
};

/** Other cut-outs, for kits, labs and page headers */
export const cutouts = {
  pencils: c("pencils", 1800, 752, "wide", "A row of colour pencils standing on end"),
  trophy: categoryArt["gifts-awards"],
  football: categoryArt.sports,
  lunchbox: c("lunchbox", 520, 690, "cutout", "A lunch box with its lid off"),
  bottle: c("bottle", 170, 514, "cutout", "A steel water bottle"),
  robot: c("robot", 1100, 803, "cutout", "A small robot car kit with wheels, sensors and a circuit board"),
  scissors: c("scissors", 900, 480, "cutout", "A pair of scissors"),
  tie: c("tie", 534, 727, "cutout", "A folded school tie"),
  medal: c("medal", 317, 580, "cutout", "A medal on a ribbon"),
  book: categoryArt.textbooks,
  skirt: categoryArt["uniforms-bags"],
  firstaid: categoryArt.housekeeping,
  xylophone: categoryArt.music,
  utensils: categoryArt["canteen-kitchen"],
  warehouse: c("f-warehouse", 900, 599, "frame", "Warehouse racks stacked with cartons"),
  idcard: c("f-idcard", 900, 600, "frame", "An ID card holder on a lanyard"),
  admission: c("f-admission", 900, 600, "frame", "A notebook, pencils, scissors and a geometry set"),
  labkit: c("f-labkit", 900, 613, "frame", "Electronics parts, a multimeter and a robot kit on a table"),
} satisfies Record<string, Art>;
