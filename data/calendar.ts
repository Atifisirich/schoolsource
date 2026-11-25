// =====================================================================
// School buying calendar (/kits#calendar)
// =====================================================================
// What schools usually order in each month of the academic year. This is
// general guidance, not a promise of dates: exams and events vary by board
// and school. `categories` and `kits` are slugs from data/catalogue.ts.
// =====================================================================

export type CalendarMonth = {
  short: string;
  name: string;
  title: string;
  text: string;
  categories: string[];
  kits: string[];
};

export const calendar: CalendarMonth[] = [
  {
    short: "Apr",
    name: "April",
    title: "Plan the new year",
    text: "Book lists are final and uniform sizes are being collected. A good month to get the new year quoted, so nothing waits until June.",
    categories: ["textbooks", "uniforms-bags", "printing-id-cards"],
    kits: ["new-admission-student"],
  },
  {
    short: "May",
    name: "May",
    title: "Summer break: install and stock up",
    text: "Empty classrooms make this the window for labs, furniture, smart classrooms and electrical work. Term-start stock arrives before reopening.",
    categories: ["labs", "furniture", "computers-tech", "electricals", "canteen-kitchen"],
    kits: ["term-start-classroom"],
  },
  {
    short: "Jun",
    name: "June",
    title: "School reopens",
    text: "Classrooms need registers, chalk and markers. Students need ID cards, diaries and their book and stationery sets.",
    categories: ["stationery", "textbooks", "printing-id-cards", "teaching-aids"],
    kits: ["term-start-classroom", "new-admission-student"],
  },
  {
    short: "Jul",
    name: "July",
    title: "Settling into the term",
    text: "Games periods start in earnest and the library takes new additions. Housekeeping settles into a monthly order.",
    categories: ["sports", "library", "housekeeping"],
    kits: ["monthly-housekeeping"],
  },
  {
    short: "Aug",
    name: "August",
    title: "Independence Day",
    text: "Banners and backdrops for the assembly, and medals and certificates for competitions.",
    categories: ["printing-id-cards", "gifts-awards", "music"],
    kits: [],
  },
  {
    short: "Sep",
    name: "September",
    title: "Teachers' Day and term exams",
    text: "Gifts for staff on 5 September, then answer booklets and exam stationery for the first term exams.",
    categories: ["gifts-awards", "printing-id-cards", "stationery"],
    kits: ["teachers-day-gift", "exam-season"],
  },
  {
    short: "Oct",
    name: "October",
    title: "Festival break",
    text: "A short break is a chance for maintenance: fans, lights and water coolers checked, washrooms restocked.",
    categories: ["electricals", "housekeeping"],
    kits: ["monthly-housekeeping"],
  },
  {
    short: "Nov",
    name: "November",
    title: "Children's Day and sports meet",
    text: "Return gifts for 14 November. Trophies, medals and track equipment for the sports meet.",
    categories: ["gifts-awards", "sports"],
    kits: [],
  },
  {
    short: "Dec",
    name: "December",
    title: "Annual day season",
    text: "Trophies, mementos, invitations, backdrops and sound for the stage.",
    categories: ["gifts-awards", "printing-id-cards", "computers-tech", "music"],
    kits: ["annual-day"],
  },
  {
    short: "Jan",
    name: "January",
    title: "Republic Day and science fairs",
    text: "Event printing for the assembly, and lab consumables and models for exhibitions.",
    categories: ["printing-id-cards", "labs", "teaching-aids"],
    kits: [],
  },
  {
    short: "Feb",
    name: "February",
    title: "Admissions and board exams",
    text: "Admission forms and printing for the new intake, and exam stationery for board and pre-board exams.",
    categories: ["printing-id-cards", "stationery"],
    kits: ["exam-season", "office-admin"],
  },
  {
    short: "Mar",
    name: "March",
    title: "Final exams and year end",
    text: "Answer booklets, report cards and transfer certificate books. Plan any summer installation now so it can start in May.",
    categories: ["printing-id-cards", "labs", "furniture"],
    kits: ["exam-season"],
  },
];
