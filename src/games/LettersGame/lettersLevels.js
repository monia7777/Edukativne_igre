export const lettersLevels = {
  easy: {
    title: "🟢 Niža razina",
    subtitle: "1. razred",

    levels: [
      {
        id: 1,
        letters: ["A", "M"],
        imageCount: 2,
        help: "audio + vizualni hint",
        tasks: [
          {
            pairs: [
              { letter: "A", image: "alladin", format: "jpg" },
              { letter: "M", image: "macak", format: "jpg" },
            ],
            imageOrder: ["macak", "alladin"],
          },
        ],
      },

      {
        id: 2,
        letters: ["S", "P"],
        imageCount: 2,
        help: "audio + hint",
        tasks: [
          {
            pairs: [
              { letter: "S", image: "snjeguljica", format: "jpg" },
              { letter: "P", image: "pipi", format: "png" },
            ],
            imageOrder: ["pipi", "snjeguljica"],
          },
        ],
      },

      {
        id: 3,
        letters: ["O", "V", "K"],
        imageCount: 3,
        help: "audio",
        tasks: [
          {
            pairs: [
              { letter: "O", image: "orasar", format: "jpg" },
              { letter: "V", image: "vuk", format: "png" },
              { letter: "K", image: "kraljzabac", format: "png" },
            ],
            imageOrder: ["kraljzabac", "vuk", "orasar"],
          },
        ],
      },

      {
        id: 4,
        letters: ["T", "L", "N"],
        imageCount: 3,
        help: "manje vizualne pomoći",
        tasks: [
          {
            pairs: [
              { letter: "T", image: "trnoruzica", format: "png" },
              { letter: "L", image: "lisica", format: "jpg" },
              { letter: "N", image: "nemo", format: "jpg" },
            ],
            imageOrder: ["lisica", "trnoruzica", "nemo"],
          },
        ],
      },

      {
        id: 5,
        letters: ["A", "M", "S"],
        imageCount: 3,
        help: "bez demonstracije",
        tasks: [
          {
            pairs: [
              { letter: "A", image: "alisa", format: "jpg" },
              { letter: "M", image: "malasirena", format: "png" },
              { letter: "S", image: "snjeznakraljica", format: "jpg" },
            ],
            imageOrder: ["snjeznakraljica", "alisa", "malasirena"],
          },
        ],
      },
    ],
  },

  medium: {
    title: "🟡 Srednja razina",
    subtitle: "2.–3. razred",

    levels: [
      {
        id: 1,
        letters: ["K", "T", "V", "L"],
        imageCount: 4,
        help: "audio",
        tasks: [
          {
            pairs: [
              { letter: "K", image: "knjigaodzungli", format: "jpg" },
              { letter: "T", image: "triprascica", format: "jpg" },
              { letter: "V", image: "vlak", format: "jpg" },
              { letter: "L", image: "lassie", format: "jpg" },
            ],
            imageOrder: ["lassie", "knjigaodzungli", "vlak", "triprascica"],
          },
        ],
      },

      {
        id: 2,
        letters: ["M", "N", "P", "B"],
        imageCount: 4,
        help: "samo kratki hint",
        tasks: [
          {
            pairs: [
              { letter: "M", image: "matovilka", format: "jpg" },
              { letter: "N", image: "naruto", format: "png" },
              { letter: "P", image: "pinocchio", format: "png" },
              { letter: "B", image: "bambie", format: "jpg" },
            ],
            imageOrder: ["bambie", "pinocchio", "matovilka", "naruto"]
          },
        ],
      },

      {
        id: 3,
        letters: ["G", "D", "R", "S"],
        imageCount: 5,
        help: "bez demonstracije",
        tasks : [
          {
            pairs: [
              { letter: "G", image: "gusenica", format: "jpg" },
              { letter: "D", image: "delfin", format: "jpg" },
              { letter: "R", image: "roza", format: "jpg" },
              { letter: "S", image: "slon", format: "jpg"},
            ],
            imageOrder: ["medo", "pipi", "nemo", "bambi"],

          },
        ],
      },

      {
        id: 4,
        letters: ["J", "Z", "C", "F"],
        imageCount: 5,
        help: "bez hintova",
        tasks: [
          {
            pairs: [
              { letter: "M", image: "medo", format: "jpg" },
              { letter: "M", image: "medo", format: "jpg"},
              { letter: "M", image: "medo", format: "jpg"},
              { letter: "M", image: "medo", format: "jpg"},
            ],
            imageOrder: ["medo", "pipi", "nemo", "bambi"]
          }
        ]
      },

      {
        id: 5,
        letters: [ "K", "P", "B", "R",],
        imageCount: 5,
        help: "samostalno",
        tasks: [
          {
            pairs: [
              { letter: "K", image: "medo", format: "jpg"},
              { letter: "K", image: "medo", format: "jpg"},
              { letter: "K", image: "medo", format: "jpg"},
              { letter: "K", image: "medo", format: "jpg"},
            ],
            imageOrder: ["medo", "pipi", "nemo", "bambi"]
          }
        ]
      },
    ],
  },

  hard: {
    title: "🔴 Teža razina",
    subtitle: "3.–4. razred",

    levels: [
      {
        id: 1,
        letters: ["B", "P", "D"],
        imageCount: 5,
        help: "razlikovanje oblika",
      },

      {
        id: 2,
        letters: ["Č", "Ć", "C"],
        imageCount: 5,
        help: "slični glasovi",
      },

      {
        id: 3,
        letters: ["LJ", "NJ", "J"],
        imageCount: 6,
        help: "složeni glasovi",
      },

      {
        id: 4,
        letters: ["R", "L", "N", "M"],
        imageCount: 6,
        help: "brže prepoznavanje",
      },

      {
        id: 5,
        letters: [
          "A",
          "M",
          "S",
          "P",
          "O",
          "V",
          "K",
          "T",
          "L",
          "N",
          "B",
          "D",
          "Č",
          "Ć",
          "C",
          "LJ",
          "NJ",
          "J",
          "R",
        ],
        imageCount: 6,
        help: "samostalno bez pomoći",
      },
    ],
  },
}