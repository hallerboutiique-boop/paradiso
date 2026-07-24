const euro = new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" });
const CART_KEY = "paradiso_cart_v1";
const ORDER_KEY = "paradiso_orders_v1";
const THEME_KEY = "paradiso_theme";

const image = (name) => `assets/images/${name}.jpg`;
const item = (name, price, description, photo) => ({ name, price, description, image: image(photo) });
const cocktail = (name, price, description, photo = "negroni") => item(name, price, description, photo);
const bottle = (name, price, description, photo) => ({
  name,
  price,
  description,
  image: `assets/images/bottles-studio/${photo}.png`,
});

const partyServices = [
  item("Festa bimbi", 8, "Servizio feste per bambini come da listino.", "lunch"),
  item("Festa maxi", 18, "Formula feste maxi come da listino.", "hero"),
  item("Tagliere pizza compleanno", 20, "Tagliere pizza per la festa di compleanno.", "lunch"),
  item("Taglio torta", 1.5, "Servizio di taglio torta.", "breakfast"),
];

const menus = {
  day: {
    title: "Menu del giorno",
    intro: "Colazioni curate e proposte semplici per la pausa pranzo.",
    heroCopy: "Il buongiorno ha il profumo del caffè.",
    heroLabel: "Scopri il menu",
    categories: {
      colazione: {
        label: "Colazione",
        items: [
          item("Espresso", 1.3, "La pausa italiana, intensa e fragrante.", "breakfast"),
          item("Caffè macchiato", 1.5, "Espresso con una nuvola di latte.", "breakfast"),
          item("Cappuccino", 2, "Espresso, latte caldo e schiuma vellutata.", "breakfast"),
          item("Cornetto", 1.5, "Sfoglia fragrante, semplice o farcita.", "breakfast"),
          item("Cappuccino e cornetto", 3.5, "La colazione classica del Paradiso.", "breakfast"),
          item("Spremuta d'arancia", 4, "Arance spremute al momento.", "breakfast"),
        ],
      },
      pranzo: {
        label: "Pranzo",
        items: [
          item("Focaccia Paradiso", 6.5, "Prosciutto crudo, mozzarella e rucola.", "lunch"),
          item("Toast classico", 5, "Prosciutto cotto e formaggio filante.", "lunch"),
          item("Insalatona", 8, "Verdure fresche, mozzarella e ingredienti di stagione.", "lunch"),
          item("Piatto del giorno", 10, "La proposta fresca scelta dalla cucina.", "lunch"),
          item("Pausa pranzo completa", 12, "Piatto del giorno, acqua e caffè.", "lunch"),
        ],
      },
      bibite: {
        label: "Bibite",
        items: [
          item("Acqua", 1, "Naturale o frizzante.", "breakfast"),
          item("Bibita in lattina", 3, "Chiedi le disponibilità del giorno.", "breakfast"),
          item("Succo di frutta", 3, "Diversi gusti disponibili.", "breakfast"),
          item("Tè freddo", 3, "Limone o pesca.", "breakfast"),
        ],
      },
      tessere: {
        label: "Tessere",
        items: [
          item("Tessera caffè", 11, "Formula prepagata per i tuoi caffè al Paradiso.", "breakfast"),
          item("Tessera cappuccino", 15, "Formula prepagata dedicata al cappuccino.", "breakfast"),
          item("Tessera cappuccino e brioche", 30, "Colazione completa in formula prepagata.", "breakfast"),
          item("Tessera spremuta", 40, "Formula prepagata per spremute fresche.", "breakfast"),
          item("Tessera Ginseng o Orzo grande", 15, "Formula prepagata, formato grande.", "breakfast"),
          item("Tessera Ginseng o Orzo piccolo", 13, "Formula prepagata, formato piccolo.", "breakfast"),
        ],
      },
      servizi: {
        label: "Servizi feste",
        items: partyServices,
      },
    },
  },
  night: {
    title: "Menu della sera",
    intro: "Cocktail, gin, birre e distillati per vivere il Paradiso dopo il tramonto.",
    heroCopy: "La sera comincia con il bicchiere giusto.",
    heroLabel: "Scopri la sera",
    categories: {
      cocktail: {
        label: "Cocktail",
        items: [
          cocktail("Boulevardier", 8, "Bourbon, bitter rosso e vermouth: caldo e avvolgente."),
          cocktail("Caipiroska", 8, "Vodka, lime fresco e zucchero di canna.", "mojito"),
          cocktail("Caipiroska alla fragola", 7, "Vodka, lime e fragola: fresca e fruttata.", "mojito"),
          cocktail("Cuba Libre chiaro", 6, "Rum chiaro, cola e lime fresco.", "negroni"),
          cocktail("Cuba Libre scuro", 7, "Rum scuro, cola e lime fresco.", "negroni"),
          cocktail("Cuba Zombie", 8, "Mix di rum e frutta tropicale, deciso e aromatico.", "spritz"),
          cocktail("Daiquiri", 8, "Rum bianco, lime e sciroppo di zucchero.", "mojito"),
          cocktail("Disaronno Red Bull o Coca-Cola", 7, "Disaronno con la tua miscela preferita.", "negroni"),
          cocktail("Disaronno Sour", 7, "Disaronno, limone e una schiuma morbida.", "negroni"),
          cocktail("Disaronno Tè", 7, "Disaronno e tè freddo, morbido e rinfrescante.", "spritz"),
          cocktail("Drink premium", 10, "Distillato premium e miscelazione su misura.", "negroni"),
          cocktail("Gin Lemon Base", 6, "Gin e limonata, semplice e agrumato.", "gin"),
          cocktail("Gin Tonic Base", 6, "Gin, tonica e una nota agrumata.", "gin"),
          cocktail("Hugo", 8, "Sambuco, prosecco, soda, lime e menta.", "spritz"),
          cocktail("Jack Red Bull o Coca-Cola", 6, "Whiskey con Red Bull o Coca-Cola.", "negroni"),
          cocktail("Japanese", 8, "Cognac, orzata e bitter: morbido, agrumato e aromatico.", "espresso-martini"),
          cocktail("Long Island", 8, "Cinque distillati, agrumi e cola.", "negroni"),
          cocktail("Malibu Sambuca", 6, "Cocco e anice in un mix dolce e intenso.", "spritz"),
          cocktail("Margarita", 8, "Tequila, triple sec e lime con bordo salato.", "mojito"),
          cocktail("Martini", 8, "Elegante, essenziale e servito ben freddo.", "espresso-martini"),
          cocktail("Espresso Martini", 8, "Vodka, espresso e liquore al caffè.", "espresso-martini"),
          cocktail("Mojito", 8, "Rum, lime, menta, zucchero e soda.", "mojito"),
          cocktail("Moscow Mule", 8, "Vodka, lime e ginger beer.", "mojito"),
          cocktail("Negroni", 8, "Gin, bitter rosso e vermouth in parti uguali.", "negroni"),
          cocktail("Paloma", 6, "Tequila, pompelmo e lime: fresca e sapida.", "spritz"),
          cocktail("Piña Colada", 8, "Rum, cocco e ananas, cremosa e tropicale.", "spritz"),
          cocktail("Pornstar Martini", 7, "Vodka, vaniglia e frutto della passione.", "espresso-martini"),
          cocktail("Sambuca Vodka", 6, "Vodka e sambuca, diretto e aromatico.", "negroni"),
          cocktail("Sangria", 4, "Vino, frutta fresca e spezie.", "spritz"),
          cocktail("Sbagliato", 8, "Bitter, vermouth e bollicine.", "spritz"),
          cocktail("Sex on the Beach", 7, "Vodka, pesca, arancia e frutti rossi.", "spritz"),
          cocktail("Spritz Aperol", 6, "Aperol, prosecco, soda e arancia.", "spritz"),
          cocktail("Spritz Campari", 6, "Campari, prosecco, soda e arancia.", "spritz"),
          cocktail("Vodka Lemon Base", 6, "Vodka e limonata, fresco e diretto.", "mojito"),
          cocktail("Vodka Premium", 10, "Vodka premium con miscelazione a scelta.", "negroni"),
          cocktail("Vodka Red Bull", 6, "Vodka e Red Bull.", "negroni"),
          cocktail("Vodka Sour", 7, "Vodka, limone e sciroppo di zucchero.", "mojito"),
          cocktail("Vodka Tonic Base", 6, "Vodka, tonica e agrume.", "gin"),
          cocktail("Jäger Red Bull", 6, "Jägermeister e Red Bull.", "negroni"),
        ],
      },
      bottiglie: {
        label: "Bottiglie",
        items: [
          bottle("Clase Azul", 500, "Bottiglia da riservare al tavolo.", "clase-azul"),
          bottle("Shot Clase Azul", 30, "Servizio shot come indicato nel listino.", "clase-azul"),
          bottle("Don Papa Baroko", 180, "Rum premium in bottiglia.", "don-papa"),
          bottle("Jack Daniel's", 150, "Whiskey Tennessee in bottiglia.", "jack-daniels"),
          bottle("Keglevich Fragola", 100, "Vodka aromatizzata in bottiglia.", "keglevich-fragola"),
          bottle("Keglevich Pesca", 100, "Vodka aromatizzata in bottiglia.", "keglevich-pesca"),
          bottle("Alkkemist Gin", 180, "Gin premium in bottiglia.", "alkkemist"),
          bottle("Amuerte Coca Gin", 180, "Gin premium in bottiglia.", "amuerte"),
          bottle("Hendrick's Grand Cabaret", 160, "Gin premium in bottiglia.", "hendricks-cabaret"),
          bottle("Nordés con toniche", 150, "Bottiglia di gin con toniche incluse.", "nordes-bottle"),
          bottle("Bombay Sapphire con toniche", 120, "Bottiglia di gin con toniche incluse.", "bombay-bottle"),
          bottle("Gin Mare con toniche", 140, "Bottiglia di gin con toniche incluse.", "gin-mare-bottle"),
          bottle("Grey Goose", 150, "Vodka premium in bottiglia.", "grey-goose"),
          bottle("Belvedere", 150, "Vodka premium in bottiglia.", "belvedere"),
          bottle("Absolut Vodka", 120, "Vodka in bottiglia.", "absolut"),
          bottle("Veuve Clicquot Brut", 160, "Champagne brut in bottiglia.", "veuve-brut"),
          bottle("Bellavista Alma Gran Cuvée", 100, "Franciacorta brut in bottiglia.", "bellavista"),
          bottle("Berlucchi Cuvée Imperiale", 70, "Franciacorta brut in bottiglia.", "berlucchi"),
          bottle("Valdo Prosecco", 50, "Prosecco extra dry in bottiglia.", "valdo"),
          bottle("Moët N.I.R Rosé", 220, "Champagne rosé in bottiglia.", "moet-nir"),
          bottle("Veuve Clicquot Rosé", 180, "Champagne rosé in bottiglia.", "veuve-rose"),
          bottle("Moët Ice Impérial", 180, "Champagne demi-sec in bottiglia.", "moet-ice"),
          bottle("Moët Impérial Brut", 140, "Champagne brut in bottiglia.", "moet-brut"),
          bottle("Lanson White Label", 120, "Champagne in bottiglia.", "lanson"),
          bottle("Monte Rossa Blanc de Blancs", 100, "Franciacorta in bottiglia.", "monterossa-blanc"),
          bottle("Dom Pérignon 2012", 500, "Prezzo promozionale indicato nel listino.", "dom-perignon-2012"),
          bottle("Cristal Louis Roederer", 450, "Prezzo promozionale indicato nel listino.", "cristal"),
          bottle("Krug Grande Cuvée", 450, "Prezzo promozionale indicato nel listino.", "krug"),
          bottle("Dom Pérignon 2013", 400, "Prezzo promozionale indicato nel listino.", "dom-perignon-2013"),
        ],
      },
      gin: {
        label: "Gin",
        items: [
          ["Amuerte", 13], ["Aviation", 8], ["Ballykeefe", 12], ["Base Gordon's", 6],
          ["Base Mr. Higgins", 6], ["Bombay", 8], ["Brockmans", 10], ["Bulldog", 10],
          ["Dolcevita", 8], ["Engine", 10], ["Fifty Pounds", 10], ["Gin Mare", 10],
          ["Hendrick's", 10], ["Hendrick's Viola", 13], ["Hendrick's Amazonia", 13], ["Lola Vera", 10],
          ["Malfy", 10], ["Monkey", 15], ["Nordés", 10], ["Portofino", 12],
          ["Rena 41", 10], ["Rivo", 10], ["Royal Windsor", 12], ["Santamania", 8],
          ["Santana", 10], ["Tanqueray", 8],
        ].map(([name, price]) => item(name, price, "Servito con tonica e guarnizione selezionata.", "gin")),
      },
      aperitivo: {
        label: "Aperitivo",
        items: [
          item("Bitter pompelmo", 5, "Aperitivo analcolico al pompelmo.", "spritz"),
          item("Buffet drink", 10, "Drink con formula buffet.", "spritz"),
          item("Campari con bianco", 5, "Campari servito con vino bianco.", "spritz"),
          item("Campari Soda", 3.5, "Il classico aperitivo Campari Soda.", "spritz"),
          item("Crodino", 4, "Aperitivo analcolico.", "spritz"),
          item("Offerta Spritz", 3.5, "Spritz in offerta come da listino.", "spritz"),
          item("Tagliere", 4, "Piccolo accompagnamento salato.", "lunch"),
          item("Tagliere base", 10, "Selezione salata da condividere.", "lunch"),
          item("Tagliere premium", 13, "Selezione premium da condividere.", "lunch"),
        ],
      },
      birre: {
        label: "Birre",
        items: [
          ["Birra in bottiglia", 3.5], ["Birra media e trancio", 8], ["Birra spina media", 5],
          ["Birra spina piccola", 3], ["Ceres", 4], ["Corona", 4], ["Guinness", 8],
          ["Heineken", 3.5], ["Ichnusa", 4], ["Ichnusa 50 cl", 4], ["Moretti grande", 4],
          ["Panaché", 5], ["Paulaner", 4.5], ["Tennent's", 4],
        ].map(([name, price]) => item(name, price, "Servita fredda.", "beer")),
      },
      whisky: {
        label: "Whisky e brandy",
        items: [
          ["Ballantine's", 5], ["Chivas 12", 8], ["Cognac", 6], ["Don Papa", 8],
          ["J&B", 5], ["Jack Daniel's", 5], ["Johnnie Walker Red Label", 5], ["Laphroaig", 7],
          ["Revel Stoke Spiced", 5], ["Stravecchio Branca", 5],
        ].map(([name, price]) => item(name, price, "Servito liscio o con ghiaccio.", "gin")),
      },
      amari: {
        label: "Amari",
        items: [
          ["Amaro Cenote", 12], ["Amaro del Capo", 4], ["Amaro Don Julio", 12], ["Amaro Gin", 5],
          ["Amaro Lucano", 4], ["Assenzio", 4], ["Averna", 4], ["Baileys", 4],
          ["Branca Menta", 4], ["Braulio", 4], ["Chupito", 3], ["Chupito Cenote", 4],
          ["Chupito Premium", 6], ["Disaronno", 4], ["Fernet Branca", 4], ["Herbas", 8],
          ["Jägermeister", 4], ["Jameson", 4], ["Jefferson", 5], ["Limoncello", 4],
          ["Monte doppio", 8], ["Montenegro", 4], ["Sambuca", 4], ["Shot", 2],
          ["Vecchia Romagna", 4], ["Vodka", 4],
        ].map(([name, price]) => item(name, price, "Servito liscio o con ghiaccio.", "gin")),
      },
      snack: {
        label: "Snack",
        items: [
          ["Bueno", 2], ["Caramelle singole", 0.2], ["Chupa Chups", 0.5], ["Cicche pacchetto", 2.5],
          ["Cicche singole", 1.2], ["Ciuccio", 2], ["Frisk", 1], ["Goleador", 0.2],
          ["Golia", 2.5], ["Golia Immuno", 5], ["Mentos", 1.8], ["Patatine grandi", 2.5],
          ["Patatine piccole", 1.8], ["Patatine San Carlo", 1.5], ["Pringles", 3], ["Trinketto", 2],
        ].map(([name, price]) => item(name, price, "Disponibile al banco.", "lunch")),
      },
      grappe: {
        label: "Grappe e rum",
        items: [
          ["Castagner Riserva", 4], ["Grappa Amarone", 5], ["Grappa Barri", 5], ["Grappa Barricata", 4],
          ["Grappa Bianca", 3], ["Grappa Gialla", 3], ["Grappino", 3], ["Rum", 4],
        ].map(([name, price]) => item(name, price, "Servito nel calice da degustazione.", "gin")),
      },
      servizi: {
        label: "Servizi feste",
        items: partyServices,
      },
    },
  },
};

const galleryPhoto = (number) =>
  `assets/gallery/photos/IMG-20260721-WA${String(number).padStart(4, "0")}.webp`;
const generatedPhoto = (name) => `assets/images/generated/${name}.webp`;

const photoReferences = {
  day: {
    colazione: [138, 154, 219, 172, 132, 37],
    pranzo: [
      "generated:focaccia-paradiso",
      "generated:toast-classico",
      "generated:insalatona",
      "generated:piatto-del-giorno",
      "generated:pausa-pranzo",
    ],
    bibite: ["generated:acqua", "generated:bibite-lattina", "generated:succhi-frutta", "generated:te-freddo"],
    tessere: [138, 154, 132, 183, 154, 123],
    servizi: [200, 185, "generated:pizza-compleanno", 69],
  },
  night: {
    cocktail: [
      "generated:boulevardier", 158, 49, "generated:cuba-libre", "generated:cuba-libre",
      70, "generated:daiquiri", "generated:energy-mix", "generated:disaronno-sour",
      "generated:disaronno-te", 230, 98, 201, 157,
      "generated:energy-mix", "generated:japanese-cocktail", "generated:cuba-libre", 63,
      "generated:margarita", "generated:martini", "generated:espresso-martini", 158,
      "generated:moscow-mule", "generated:boulevardier", 205, "generated:pina-colada",
      "generated:pornstar-martini", 63, 110, 117, 49, 223, 202, 98, 201,
      "generated:energy-mix", 228, 97, "generated:energy-mix",
    ],
    gin: [
      216, 201, 215, 201, 217, 171, 162, 201, 157, 215, 201, 171, 201,
      217, 216, 162, 89, 201, 171, 215, 98, 162, 201, 171, 157, 98,
    ],
    aperitivo: [202, 119, 117, 202, 14, 223, 119, 120, 226],
    servizi: [200, 185, "generated:pizza-compleanno", 69],
    birre: [
      "assets/images/beer.jpg", "assets/images/beer.jpg", 218, 218, "assets/images/beer.jpg",
      "assets/images/beer.jpg", "assets/images/beer.jpg", "assets/images/beer.jpg",
      "assets/images/beer.jpg", "assets/images/beer.jpg", "assets/images/beer.jpg",
      "assets/images/beer.jpg", "assets/images/beer.jpg", "assets/images/beer.jpg",
    ],
    whisky: ["generated:whisky"],
    amari: ["generated:amaro"],
    snack: [129, 129, 129, 129, 129, 129, 129, 129, 129, 129, 129, 14, 14, 14, 14, 14],
    grappe: ["generated:grappa"],
  },
};

const cocktailFacts = {
  Boulevardier: "È il cugino più caldo del Negroni: il bourbon prende il posto del gin.",
  Caipiroska: "È la variante alla vodka della Caipirinha brasiliana.",
  "Caipiroska alla fragola": "La fragola addolcisce il lime senza togliere freschezza.",
  "Cuba Libre chiaro": "È il lime fresco a distinguerlo davvero da un semplice rum e cola.",
  "Cuba Libre scuro": "Il rum scuro aggiunge note più rotonde di vaniglia e caramello.",
  "Cuba Zombie": "Il gioco di rum e frutta tropicale lo rende intenso: meglio gustarlo lentamente.",
  Daiquiri: "Tre soli ingredienti: quando sono in equilibrio non serve altro.",
  "Disaronno Red Bull o Coca-Cola": "Le note di mandorla del Disaronno diventano più vivaci con una miscela frizzante.",
  "Disaronno Sour": "L'acidità del limone mette in risalto il lato tostato dell'amaretto.",
  "Disaronno Tè": "Il tè alleggerisce la dolcezza e lascia un finale aromatico.",
  "Drink premium": "Distillato, ghiaccio e guarnizione vengono scelti per costruire un servizio su misura.",
  "Gin Lemon Base": "Una scorza di limone espressa sul bicchiere libera gli oli più profumati.",
  "Gin Tonic Base": "Tanto ghiaccio scioglie più lentamente e mantiene il drink brillante.",
  Hugo: "È un aperitivo di ispirazione alpina, floreale e molto fresco.",
  "Jack Red Bull o Coca-Cola": "Le note vanigliate del whiskey si legano bene alla parte caramellata della cola.",
  Japanese: "Nacque nell'Ottocento: il nome è storico, mentre orzata e cognac gli danno un profilo morbido e aromatico.",
  "Long Island": "Non contiene tè: è il colore finale a ricordare un tè freddo.",
  "Malibu Sambuca": "Cocco e anice creano un contrasto insolito, dolce e balsamico.",
  Margarita: "Il bordo salato esalta lime e agave a ogni sorso.",
  Martini: "Più è freddo, più la texture risulta pulita e setosa.",
  "Espresso Martini": "L'espresso appena fatto crea la caratteristica crema in superficie.",
  Mojito: "La menta va accarezzata, non triturata, per evitare note amare.",
  "Moscow Mule": "La tazza in rame aiuta a mantenerlo freddo più a lungo.",
  Negroni: "La ricetta classica gioca sull'equilibrio di tre ingredienti in parti uguali.",
  Paloma: "Il pompelmo regala una freschezza più sapida e asciutta del classico lime.",
  "Piña Colada": "Ananas e cocco funzionano quando la dolcezza resta bilanciata dalla parte fresca.",
  "Pornstar Martini": "Il frutto della passione porta profumo, acidità e un colore inconfondibile.",
  "Sambuca Vodka": "Unisce la pulizia della vodka al carattere deciso dell'anice.",
  Sangria: "Il riposo permette a vino, frutta e spezie di fondersi meglio.",
  Sbagliato: "Nato a Milano da un errore fortunato: le bollicine sostituirono il gin.",
  "Sex on the Beach": "Pesca e frutti rossi lo rendono morbido, mentre l'arancia lo mantiene fresco.",
  "Spritz Aperol": "Le bollicine vanno versate con delicatezza per conservarne la vivacità.",
  "Spritz Campari": "Più amaricante e deciso, con un finale agrumato.",
  "Vodka Lemon Base": "La neutralità della vodka lascia spazio alla parte agrumata.",
  "Vodka Premium": "Una vodka ben fredda acquista una consistenza più morbida e vellutata.",
  "Vodka Red Bull": "Un highball diretto, servito molto freddo per mantenerlo netto.",
  "Vodka Sour": "Il contrasto tra limone e zucchero crea una freschezza pulita.",
  "Vodka Tonic Base": "La tonica asciuga il sorso e una scorza agrumata completa il profumo.",
  "Jäger Red Bull": "Le note erbacee e speziate incontrano una parte più vivace e frizzante.",
};

const nightDrinkDefaults = {
  bottiglie: {
    fact: "Il servizio bottiglia è pensato per il tavolo: ghiaccio e mixer si scelgono insieme al momento.",
  },
  gin: {
    description: "Ingredienti: gin botanico, acqua tonica, ghiaccio cristallino e guarnizione selezionata.",
    fact: "La guarnizione non è decorativa: viene scelta per far emergere le botaniche del gin.",
  },
  aperitivo: {
    fact: "L'aperitivo rende al meglio ben freddo, con ghiaccio abbondante e una guarnizione fresca.",
  },
  birre: {
    description: "Ingredienti: malto d'orzo, luppolo, acqua e lievito. Servita fredda al punto giusto.",
    fact: "Il bicchiere freddo conserva più a lungo profumo e carbonazione.",
  },
  whisky: {
    description: "Ingredienti: distillato selezionato, servito liscio o con ghiaccio su richiesta.",
    fact: "Un cubo grande di ghiaccio si scioglie lentamente e non copre il carattere del distillato.",
  },
  amari: {
    description: "Ingredienti: infusione di erbe, spezie e agrumi; servito liscio o con ghiaccio.",
    fact: "La temperatura cambia il profilo: freddo per la freschezza, liscio per percepire tutte le note erbacee.",
  },
  grappe: {
    description: "Ingredienti: distillato di vinacce selezionate; servito nel calice da degustazione.",
    fact: "Il calice stretto concentra i profumi e rende il sorso più elegante.",
  },
};

const nightDrinkProfiles = {
  bottiglie: {
    "Clase Azul": {
      description: "Ingredienti e stile: tequila da agave blu, morbida e intensa, da condividere al tavolo.",
      fact: "La bottiglia in ceramica è dipinta a mano: ogni pezzo ha piccole differenze che la rendono unica.",
    },
    "Shot Clase Azul": {
      description: "Ingredienti e stile: tequila da agave blu, servita in shot da 30 cl come da listino.",
      fact: "Un piccolo servizio pensato per assaggiare la stessa firma morbida della bottiglia completa.",
    },
    "Don Papa Baroko": {
      description: "Ingredienti e stile: rum filippino da melassa di canna da zucchero, ricco e rotondo.",
      fact: "Nel bicchiere emergono note di vaniglia, agrumi canditi e zucchero di canna.",
    },
    "Jack Daniel's": {
      description: "Ingredienti e stile: Tennessee whiskey di cereali, filtrato al carbone e dal finale vanigliato.",
      fact: "La filtrazione al carbone di acero è il dettaglio che definisce il suo stile Tennessee.",
    },
    "Grey Goose": {
      description: "Ingredienti e stile: vodka francese di grano, pulita e setosa al palato.",
      fact: "Una vodka molto fredda acquista una consistenza più vellutata, perfetta per il servizio al tavolo.",
    },
    Belvedere: {
      description: "Ingredienti e stile: vodka polacca di segale, cremosa e leggermente speziata.",
      fact: "La segale le lascia un profilo più strutturato rispetto a molte vodka di grano.",
    },
    "Veuve Clicquot Brut": {
      description: "Ingredienti e stile: champagne brut da uve Chardonnay, Pinot Noir e Meunier.",
      fact: "La firma della maison è una struttura piena, pensata per restare elegante anche a tavola.",
    },
    "Moët Impérial Brut": {
      description: "Ingredienti e stile: champagne brut da Chardonnay, Pinot Noir e Meunier, fresco e cremoso.",
      fact: "La sua cuvée unisce numerosi cru per mantenere uno stile riconoscibile anno dopo anno.",
    },
  },
  gin: {
    Aviation: { fact: "Le sue botaniche floreali, soprattutto lavanda e salsapariglia, lo rendono morbido e profumato." },
    Bombay: { fact: "Le botaniche vengono vaporizzate nel distillato: un metodo che mantiene il profilo molto nitido." },
    Brockmans: { fact: "Le note di frutti rossi lo rendono un gin tonic più morbido e contemporaneo." },
    "Gin Mare": { fact: "Rosmarino, timo e oliva richiamano il Mediterraneo in ogni sorso." },
    "Hendrick's": { fact: "Cetriolo e rosa sono la sua firma: un abbinamento insolito che lo rende subito riconoscibile." },
    "Hendrick's Viola": { fact: "La nota floreale di viola porta il gin tonic verso un profilo più aromatico e delicato." },
    "Hendrick's Amazonia": { fact: "Un'edizione dal carattere tropicale, pensata per un gin tonic più esotico." },
    Malfy: { fact: "Gli agrumi italiani sono il dettaglio che rende il suo profilo immediato e luminoso." },
    Monkey: { fact: "Monkey 47 usa una ricetta molto ricca di botaniche: per questo merita una tonica poco invasiva." },
    "Nordes": { fact: "Il suo stile atlantico e floreale si sposa bene con una tonica asciutta e una guarnizione delicata." },
    Portofino: { fact: "Le botaniche mediterranee richiamano il profumo della costa ligure." },
    Tanqueray: { fact: "Il ginepro resta protagonista: una scelta classica per chi ama un gin tonic secco e lineare." },
  },
  aperitivo: {
    "Bitter pompelmo": {
      description: "Ingredienti: bitter analcolico, pompelmo e ghiaccio. Fresco, agrumato e piacevolmente amaricante.",
      fact: "Il pompelmo lascia un finale asciutto che prepara bene il palato all'aperitivo.",
    },
    "Campari con bianco": {
      description: "Ingredienti: Campari, vino bianco e ghiaccio; un aperitivo morbido con finale amaricante.",
      fact: "La parte vinosa arrotonda il bitter e cambia il ritmo del classico Campari.",
    },
    "Campari Soda": {
      description: "Ingredienti: bitter Campari, soda e ghiaccio. Essenziale, secco e agrumato.",
      fact: "La sua ricetta è rimasta un'icona dell'aperitivo italiano per oltre un secolo.",
    },
    Crodino: {
      description: "Ingredienti: estratti di agrumi, erbe e spezie, serviti freddi con ghiaccio e arancia.",
      fact: "È l'alternativa analcolica ideale quando vuoi tutto il rito dell'aperitivo senza alcol.",
    },
    "Offerta Spritz": {
      description: "Ingredienti: bitter, prosecco, soda, ghiaccio e fetta d'arancia.",
      fact: "Il segreto e l'equilibrio: abbastanza bollicine per restare leggero, abbastanza bitter per farsi ricordare.",
    },
  },
  whisky: {
    "Chivas 12": { fact: "Un blended Scotch con almeno dodici anni di affinamento: morbido, mielato e rotondo." },
    Cognac: { description: "Ingredienti: distillato di vino affinato in legno, servito liscio o con ghiaccio.", fact: "Il calore della mano apre lentamente i profumi di frutta secca e spezie." },
    "Jack Daniel's": { fact: "Il suo passaggio nel carbone di acero addolcisce il profilo prima dell'affinamento in botte." },
    Laphroaig: { fact: "Le note affumicate e marine sono la sua firma: un whisky da sorseggiare con calma." },
  },
  amari: {
    "Amaro del Capo": { fact: "Servito molto freddo, mette in primo piano le note balsamiche e agrumate." },
    Averna: { fact: "Un amaro siciliano morbido, dove arancia e liquirizia danno un finale avvolgente." },
    Baileys: { description: "Ingredienti: crema di latte e whiskey irlandese, morbido e vellutato.", fact: "È perfetto servito freddo: la parte cremosa risulta più compatta e golosa." },
    "Branca Menta": { fact: "Menta e spezie lo rendono uno dei finali piu freschi della carta." },
    "Fernet Branca": { fact: "La sua complessita erbacea e intensa: un grande classico del dopo cena milanese." },
    Limoncello: { fact: "Le scorze di limone sono il cuore del suo profumo: va gustato ben freddo." },
    Montenegro: { fact: "Dolce, speziato e agrumato: un amaro morbido che resta elegante anche liscio." },
    Sambuca: { fact: "L'anice e protagonista: con tre chicchi di caffe diventa il classico 'mosca'." },
  },
  grappe: {
    "Grappa Amarone": { fact: "Le vinacce dell'Amarone le regalano un profilo piu ricco, vinoso e persistente." },
    "Grappa Barricata": { fact: "Il passaggio in legno aggiunge note calde di vaniglia e spezie dolci." },
    Rum: { description: "Ingredienti: distillato di canna da zucchero, servito liscio o con ghiaccio.", fact: "Il rum cambia moltissimo con l'origine: puo essere secco e vegetale oppure ricco di melassa e spezie." },
  },
};

function resolvePhoto(reference) {
  if (typeof reference === "number") return galleryPhoto(reference);
  if (reference === "dom-perignon") return "assets/gallery/photos/IMG-20260703-WA0049.webp";
  if (reference.startsWith("generated:")) return generatedPhoto(reference.split(":")[1]);
  return reference;
}

Object.entries(photoReferences).forEach(([theme, categories]) => {
  Object.entries(categories).forEach(([categoryKey, references]) => {
    menus[theme].categories[categoryKey].items.forEach((product, index) => {
      product.image = resolvePhoto(references[index % references.length]);
      delete product.imageFit;
    });
  });
});

menus.night.categories.cocktail.items.forEach((product) => {
  product.fact = cocktailFacts[product.name];
});

function bottleDescription(product) {
  const name = product.name.toLowerCase();
  if (name.includes("gin")) return "Ingredienti e stile: distillato di ginepro e botaniche selezionate, da servire con tonica e ghiaccio.";
  if (name.includes("vodka") || name.includes("goose") || name.includes("belvedere") || name.includes("keglevich")) return "Ingredienti e stile: vodka distillata, pulita e fresca, da accompagnare con il mixer preferito.";
  if (name.includes("champagne") || name.includes("moet") || name.includes("moët") || name.includes("veuve") || name.includes("lanson") || name.includes("krug") || name.includes("cristal") || name.includes("dom perignon")) return "Ingredienti e stile: cuvée di uve a bacca bianca e nera, affinata sui lieviti per una bollicina elegante.";
  if (name.includes("bellavista") || name.includes("berlucchi") || name.includes("monte rossa")) return "Ingredienti e stile: Franciacorta da uve selezionate, affinato sui lieviti e servito ben freddo.";
  if (name.includes("valdo")) return "Ingredienti e stile: prosecco extra dry da uve Glera, fresco e floreale.";
  if (name.includes("don papa")) return "Ingredienti e stile: rum da melassa di canna da zucchero, ricco e rotondo.";
  if (name.includes("jack daniel")) return "Ingredienti e stile: Tennessee whiskey di cereali, filtrato al carbone e dal finale vanigliato.";
  if (name.includes("clase azul")) return "Ingredienti e stile: tequila da agave blu, morbida e intensa, da condividere al tavolo.";
  return `${product.description} Servita al tavolo con ghiaccio e mixer su richiesta.`;
}

Object.entries(nightDrinkDefaults).forEach(([categoryKey, defaults]) => {
  menus.night.categories[categoryKey].items.forEach((product) => {
    const profile = nightDrinkProfiles[categoryKey]?.[product.name] || {};
    const description = profile.description || (categoryKey === "bottiglie" ? bottleDescription(product) : defaults.description);
    product.description = description || product.description;
    product.fact = profile.fact || defaults.fact;
  });
});

let currentTheme = getInitialTheme();
let activeCategory = Object.keys(menus[currentTheme].categories)[0];
let showAll = false;
let cart = readStorage(CART_KEY, []).map((entry) => ({
  ...entry,
  ...findProduct(entry.id),
  quantity: entry.quantity,
}));

const menuGrid = document.querySelector("#menu-grid");
const categoryTabs = document.querySelector("#category-tabs");
const showMoreButton = document.querySelector("#show-more");
const cartDrawer = document.querySelector("#cart-drawer");
const drawerBackdrop = document.querySelector("#drawer-backdrop");
const bookingForm = document.querySelector("#booking-form");
const confirmationDialog = document.querySelector("#confirmation-dialog");
const productDialog = document.querySelector("#product-dialog");

function readStorage(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getInitialTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === "day" || stored === "night") return stored;
  const hour = new Date().getHours();
  return hour >= 18 || hour < 6 ? "night" : "day";
}

function itemId(theme, category, name) {
  return `${theme}:${category}:${name}`.toLowerCase().replace(/[^a-z0-9à-ž]+/gi, "-");
}

function setTheme(theme) {
  currentTheme = theme;
  activeCategory = Object.keys(menus[theme].categories)[0];
  showAll = false;
  document.body.dataset.theme = theme;
  localStorage.setItem(THEME_KEY, theme);
  document.querySelector('meta[name="theme-color"]').setAttribute("content", theme === "day" ? "#f5fbff" : "#05070b");

  document.querySelectorAll("[data-set-theme]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.setTheme === theme));
  });

  const menu = menus[theme];
  document.querySelector("#menu-title").textContent = menu.title;
  document.querySelector("#menu-intro").textContent = menu.intro;
  document.querySelector("#hero-copy").textContent = menu.heroCopy;
  document.querySelector("#hero-menu-label").textContent = menu.heroLabel;
  renderTabs();
  renderMenu();
  refreshIcons();
}

function renderTabs() {
  categoryTabs.innerHTML = Object.entries(menus[currentTheme].categories)
    .map(([key, category]) => `
      <button
        class="category-tab"
        type="button"
        role="tab"
        data-category="${key}"
        aria-selected="${key === activeCategory}"
      >${category.label}</button>
    `)
    .join("");
}

function renderMenu() {
  const category = menus[currentTheme].categories[activeCategory];
  const visibleItems = showAll ? category.items : category.items.slice(0, 12);

  menuGrid.innerHTML = visibleItems
    .map((product) => {
      const id = itemId(currentTheme, activeCategory, product.name);
      return `
        <article class="menu-card">
          <button
            class="menu-card-media"
            type="button"
            data-preview-item="${id}"
            aria-label="Ingrandisci ${product.name}"
            title="Ingrandisci"
          >
            <img class="${product.imageFit === "contain" ? "contain" : ""}" src="${product.image}" alt="${product.name}" loading="lazy" />
            <span class="menu-card-zoom"><i data-lucide="maximize-2"></i></span>
          </button>
          <div class="menu-card-content">
            <div class="menu-card-top">
              <h3>${product.name}</h3>
              <span class="menu-price">${euro.format(product.price)}</span>
            </div>
            <p class="menu-description">${product.description}</p>
            <button
              class="add-button"
              type="button"
              data-add-item="${id}"
              aria-label="Aggiungi ${product.name}"
              title="Aggiungi al carrello"
            ><i data-lucide="plus"></i></button>
          </div>
        </article>
      `;
    })
    .join("");

  const hasMore = category.items.length > 12;
  showMoreButton.parentElement.hidden = !hasMore;
  if (hasMore) {
    showMoreButton.querySelector("span").textContent = showAll ? "Mostra meno" : `Mostra tutto (${category.items.length})`;
    showMoreButton.querySelector("i, svg")?.setAttribute("data-lucide", showAll ? "chevrons-up" : "chevrons-down");
  }
  refreshIcons();
}

function findProduct(id) {
  for (const [themeKey, menu] of Object.entries(menus)) {
    for (const [categoryKey, category] of Object.entries(menu.categories)) {
      const product = category.items.find((entry) => itemId(themeKey, categoryKey, entry.name) === id);
      if (product) return { ...product, id, theme: themeKey, category: categoryKey };
    }
  }
  return null;
}

function openProductPreview(id) {
  const product = findProduct(id);
  if (!product) return;

  const category = menus[product.theme].categories[product.category];
  const factBox = productDialog.querySelector("#product-dialog-fact");
  productDialog.querySelector("#product-dialog-image").src = product.image;
  productDialog.querySelector("#product-dialog-image").alt = product.name;
  productDialog.querySelector("#product-dialog-category").textContent = category.label;
  productDialog.querySelector("#product-dialog-title").textContent = product.name;
  productDialog.querySelector("#product-dialog-description").textContent = product.description;
  productDialog.querySelector("#product-dialog-price").textContent = euro.format(product.price);
  productDialog.querySelector("#product-dialog-fact-copy").textContent = product.fact || "";
  factBox.hidden = !product.fact;
  productDialog.querySelector("#product-dialog-add").dataset.addItem = id;
  productDialog.showModal();
  refreshIcons();
}

function addToCart(id) {
  const existing = cart.find((entry) => entry.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    const product = findProduct(id);
    if (!product) return;
    cart.push({ ...product, quantity: 1 });
  }
  persistCart();
  showToast("Aggiunto al carrello");
}

function updateQuantity(id, delta) {
  const entry = cart.find((product) => product.id === id);
  if (!entry) return;
  entry.quantity += delta;
  if (entry.quantity <= 0) cart = cart.filter((product) => product.id !== id);
  persistCart();
}

function removeFromCart(id) {
  cart = cart.filter((product) => product.id !== id);
  persistCart();
}

function persistCart() {
  writeStorage(CART_KEY, cart);
  renderCart();
  renderOrderPreview();
}

function cartTotal() {
  return cart.reduce((total, product) => total + product.price * product.quantity, 0);
}

function renderCart() {
  const count = cart.reduce((total, product) => total + product.quantity, 0);
  document.querySelector(".cart-count").textContent = count;
  document.querySelector("#cart-total").textContent = euro.format(cartTotal());
  document.querySelector("#checkout-button").disabled = cart.length === 0;

  const target = document.querySelector("#cart-items");
  if (!cart.length) {
    target.innerHTML = `
      <div class="empty-cart">
        <i data-lucide="shopping-bag"></i>
        <strong>Il carrello è vuoto</strong>
        <span>Aggiungi qualcosa dal menu.</span>
      </div>
    `;
    refreshIcons();
    return;
  }

  target.innerHTML = cart
    .map((product) => `
      <div class="cart-line">
        <img class="${product.imageFit === "contain" ? "contain" : ""}" src="${product.image}" alt="" />
        <div class="cart-line-copy">
          <strong>${product.name}</strong>
          <span>${euro.format(product.price * product.quantity)}</span>
          <div class="quantity-control">
            <button type="button" data-cart-action="decrease" data-id="${product.id}" aria-label="Riduci quantità">
              <i data-lucide="minus"></i>
            </button>
            <b>${product.quantity}</b>
            <button type="button" data-cart-action="increase" data-id="${product.id}" aria-label="Aumenta quantità">
              <i data-lucide="plus"></i>
            </button>
          </div>
        </div>
        <button class="cart-remove" type="button" data-cart-action="remove" data-id="${product.id}" aria-label="Rimuovi ${product.name}" title="Rimuovi">
          <i data-lucide="trash-2"></i>
        </button>
      </div>
    `)
    .join("");
  refreshIcons();
}

function renderOrderPreview() {
  document.querySelector("#preview-total").textContent = euro.format(cartTotal());
  document.querySelector("#preview-empty").hidden = cart.length > 0;
  document.querySelector("#preview-items").innerHTML = cart
    .map((product) => `<li><span>${product.quantity} × ${product.name}</span><strong>${euro.format(product.price * product.quantity)}</strong></li>`)
    .join("");
}

function openCart() {
  cartDrawer.classList.add("is-open");
  drawerBackdrop.classList.add("is-open");
  cartDrawer.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  cartDrawer.querySelector(".cart-close").focus();
}

function closeCart() {
  cartDrawer.classList.remove("is-open");
  drawerBackdrop.classList.remove("is-open");
  cartDrawer.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function showToast(message) {
  document.querySelector(".toast")?.remove();
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.append(toast);
  requestAnimationFrame(() => toast.classList.add("is-visible"));
  window.setTimeout(() => {
    toast.classList.remove("is-visible");
    window.setTimeout(() => toast.remove(), 250);
  }, 1800);
}

function submitBooking(event) {
  event.preventDefault();
  const data = new FormData(bookingForm);
  const code = `P-${Date.now().toString().slice(-6)}`;
  const order = {
    id: code,
    createdAt: new Date().toISOString(),
    customer: {
      name: data.get("name"),
      phone: data.get("phone"),
      email: data.get("email"),
    },
    reservation: {
      date: data.get("date"),
      time: data.get("time"),
      guests: Number(data.get("guests")),
      notes: data.get("notes"),
    },
    items: cart.map(({ id, name, price, quantity }) => ({ id, name, price, quantity })),
    total: cartTotal(),
    payment: "Contanti o carta al locale",
    status: "Nuovo",
  };

  const orders = readStorage(ORDER_KEY, []);
  orders.unshift(order);
  writeStorage(ORDER_KEY, orders);

  document.querySelector("#confirmation-code").textContent = code;
  document.querySelector("#confirmation-copy").textContent = `${order.customer.name}, il tavolo per ${order.reservation.guests} ${order.reservation.guests === 1 ? "persona" : "persone"} è richiesto per il ${formatDate(order.reservation.date)} alle ${order.reservation.time}.`;
  confirmationDialog.showModal();

  cart = [];
  persistCart();
  bookingForm.reset();
  setMinDate();
}

function formatDate(value) {
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
}

function setMinDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const today = `${year}-${month}-${day}`;
  const field = document.querySelector("#booking-date");
  field.min = today;
  field.value = today;
}

function refreshIcons() {
  window.lucide?.createIcons({ attrs: { "aria-hidden": "true" } });
}

document.querySelectorAll("[data-set-theme]").forEach((button) => {
  button.addEventListener("click", () => setTheme(button.dataset.setTheme));
});

categoryTabs.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  showAll = false;
  renderTabs();
  renderMenu();
});

menuGrid.addEventListener("click", (event) => {
  const addButton = event.target.closest("[data-add-item]");
  if (addButton) {
    addToCart(addButton.dataset.addItem);
    return;
  }

  const previewButton = event.target.closest("[data-preview-item]");
  if (previewButton) openProductPreview(previewButton.dataset.previewItem);
});

showMoreButton.addEventListener("click", () => {
  showAll = !showAll;
  renderMenu();
});

document.querySelector(".cart-trigger").addEventListener("click", openCart);
document.querySelector(".cart-close").addEventListener("click", closeCart);
drawerBackdrop.addEventListener("click", closeCart);

document.querySelector("#cart-items").addEventListener("click", (event) => {
  const button = event.target.closest("[data-cart-action]");
  if (!button) return;
  const actions = {
    increase: () => updateQuantity(button.dataset.id, 1),
    decrease: () => updateQuantity(button.dataset.id, -1),
    remove: () => removeFromCart(button.dataset.id),
  };
  actions[button.dataset.cartAction]?.();
});

document.querySelector("#checkout-button").addEventListener("click", () => {
  closeCart();
  document.querySelector("#prenota").scrollIntoView({ behavior: "smooth" });
  window.setTimeout(() => bookingForm.elements.name.focus(), 500);
});

bookingForm.addEventListener("submit", submitBooking);
document.querySelector(".dialog-close").addEventListener("click", () => confirmationDialog.close());
document.querySelector(".dialog-done").addEventListener("click", () => confirmationDialog.close());
document.querySelector(".product-dialog-close").addEventListener("click", () => productDialog.close());
document.querySelector("#product-dialog-add").addEventListener("click", (event) => {
  addToCart(event.currentTarget.dataset.addItem);
});
productDialog.addEventListener("click", (event) => {
  if (event.target !== productDialog) return;
  const bounds = productDialog.getBoundingClientRect();
  const isInside =
    event.clientX >= bounds.left &&
    event.clientX <= bounds.right &&
    event.clientY >= bounds.top &&
    event.clientY <= bounds.bottom;
  if (!isInside) productDialog.close();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && cartDrawer.classList.contains("is-open")) closeCart();
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
setMinDate();
renderCart();
renderOrderPreview();
setTheme(currentTheme);
window.addEventListener("load", refreshIcons);
