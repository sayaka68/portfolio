export const projects = [
  {
    id: 1,
    name: "Oha",
    image: "/images/img_oha-min.png",
    langues: ["HTML", "SCSS/CSS", "Javascript"],
    description: {
      fr: "Site statique réalisé pour apprendre les bases du codage, en mettant l’accent sur l’utilisation de SCSS/CSS (comme FlexBox et positionnement des éléments) et de JavaScript pour ajouter des interactions simples, telles que le menu hamburger et un accordéon pour les questions fréquentes.",
      ja: "コーディングの基本を学習するために取り組んだLPサイトです。FlexBoxや要素の配置に関わるSCSS/CSSの基本、また、Javascriptによるハンバーガーメニュー、FQAアコーディオン等、サイトへの動きのつけ方の基本を学びました。",
    },
    tools: ["Swiper", "Figma"],
    url: "https://oha.sayakatsuji.com",
    password: "oha",
  },

  // {
  //   id: 2,
  //   name: "Sobolon",
  //   image: "/images/img_sobolon-min.png",
  //   langues: ["HTML", "SCSS/CSS", "Javascript"],
  //   description:
  //     "Site statique conçu pour pratiquer la mise en page et le développement responsive, sous forme de projet fictif. J’ai également intégré des interactions dynamiques à l’aide de JavaScript, telles que des animations d’apparition progressive au défilement et un carrousel d'images.",
  //   tools: ["Swiper", "Figma"],
  //   url: "https://sobolon.sayakatsuji.com",
  //   password: "sobolon",
  // },
  {
    id: 3,
    name: "Snap Onomichi",
    image: "/images/img_onomichi-min.png",
    langues: ["HTML", "SCSS/CSS", "Javascript"],
    description: {
      fr: "Site statique fictif conçu pour m’exercer à l’adaptation responsive d’images décoratives et à l’intégration d’interactions dynamiques en JavaScript, comprenant deux carrousels d’images et la validation des champs obligatoires du formulaire de contact.",
      ja: "装飾画像のレスポンシブ対応や、ユーザー操作に応じた動的な挙動の実装に取り組んだ架空の静的サイトです。画像カルーセルを2種類実装し、コンタクトフォームの必須項目のバリデーションを行いました。",
    },
    tools: ["Swiper", "Figma"],

    url: "https://onomichi.sayakatsuji.com",
    password: "onomichi",
  },
  {
    id: 4,
    name: "Open Cafe",
    image: "/images/img_open-cafe-min.png",
    langues: ["HTML", "SCSS/CSS", "Javascript", "PHP"],
    description: {
      fr: "Site vitrine dynamique réalisé avec WordPress (projet fictif). Ce projet m’a permis de mettre en pratique la gestion de contenu, l’intégration de plugins et la personnalisation des pages en fonction des besoins du gestionnaire du site.",
      ja: "WordPressを用いて制作した架空のカフェサイトです。コンテンツ管理やプラグインの導入・設定を通して、サイト管理者と訪問者の双方にとって使いやすく、わかりやすい実装を意識しました。",
    },
    tools: ["Wordpress", "Swiper", "Figma"],
    url: "https://opencafe.sayakatsuji.com/",
    password: "opencafe",
  },
  {
    id: 5,
    name: "Shopping Cart",
    image: "/images/img_shopping-cart-min.png",
    langues: ["HTML", "SCSS/CSS", "Javascript"],
    description: {
      fr: "Ceci est ma première réalisation d’un panier simple en Vanilla JS. Cela m’a permis de gérer les informations des produits dans un fichier JavaScript et de les afficher dynamiquement dans le DOM, renforçant ainsi mes compétences en développement front-end.",
      ja: "フロントエンド開発の基礎を学ぶために制作した、シンプルなショッピングカートです。JavaScript を用いたデータ管理から DOM への反映、ユーザー操作に応じた状態更新まで、基本的な流れを学ぶことを目的に制作しました。",
    },
    tools: ["Vite", "Figma"],
    url: "https://sayaka68.github.io/Product-list-with-cart---Frontend-Mentor/",
  },
  {
    id: 999,
    name: "Portfolio",
    image: "/images/img_portfolio-min.png",
    langues: ["HTML", "SCSS/CSS", "Javascript"],
    description: {
      fr: "Portfolio de Sayaka TSUJI est mon site de portfolio où vous êtes actuellement. Il est conçu avec une approche responsive. C’est le premier site dont j’ai entièrement réalisé le design.",
      ja: "今現在見ていらっしゃる、辻明夏のポートフォリオサイトです。",
    },
    tools: ["Vite", "Figma"],
  },
  {
    id: 6,
    name: "DESIGNO",
    image: "/images/img_designo-min.png",
    langues: ["HTML", "SCSS/CSS", "Javascript"],
    description: {
      fr: "Un site multipage intégrant une structure en templates avec EJS, une gestion des données en JSON et un formulaire de contact connecté à Google Apps Script via fetch pour enregistrer les messages dans une feuille de calcul.",
      ja: "学習の一環として制作した複数ページサイトです。更新頻度の低い構成であることから WordPress は使用せず、EJS を用いてページおよび一部セクションをテンプレート化し、JSON による情報管理を行いました。Google Apps Script とスプレッドシートを連携させたコンタクトフォームを実装しています。",
    },
    tools: ["Gulp", "EJS", "Fetch API", "Google Apps Script", "Figma"],
    url: "https://sayaka68.github.io/Designo-multi-page-website--Frontend-Mentor//",
  },
  // {
  //   id: 7,
  //   name: "Global Standard",
  //   image: "/images/img_globalStandard-min.png",
  //   langues: ["HTML", "SCSS/CSS", "Javascript"],
  //   description: "Site statique avec plusieurs animations ",
  //   tools: ["Gulp", "EJS", "Swiper", "Figma"],
  // },
];
