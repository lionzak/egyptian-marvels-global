// src/data/artifacts.ts
import type { Language } from '@/i18n/languageContext';

export interface Artifact {
  id: string;
  name: string;
  period: string;
  location: string;
  description: string;
  model: string;
}

const artifactsData: Record<Language, Artifact[]> = {
  en: [
    {
      id: '1',
      name: "Tutankhamun's Golden Mask",
      period: 'XVIII Dynasty',
      location: 'Valley of the Kings',
      description: 'An exquisite funerary mask made from 11 kg of pure gold with inlays of lapis lazuli and other semi-precious stones. It covered the mummy of XVIII Dynasty pharaoh Tutankhamun. Discovered by Howard Carter in 1922, the mask became a symbol of ancient Egyptian craftsmanship and the wealth of the pharaohs.',
      model: '/models/tutankhamun_mask-optimized.glb',
    },
    {
      id: '2',
      name: 'Rosetta Stone',
      period: 'Ptolemaic Period',
      location: 'Memphis',
      description: 'A granodiorite stela with a decree issued in Memphis in 196 BC on behalf of King Ptolemy V Epiphanes. The text is inscribed in three languages: ancient Egyptian hieroglyphs, Demotic script, and ancient Greek. Thanks to these parallel texts, it became possible to decipher hieroglyphs, which Jean-François Champollion accomplished in 1822.',
      model: '/models/rosetta_stone-optimized.glb',
    },
    {
      id: '3',
      name: 'Narmer Palette',
      period: 'Early Dynastic Period',
      location: 'Hierakonpolis (Nekhen)',
      description: 'This ceremonial palette made of green slate is one of the most ancient and significant monuments of Ancient Egypt. It depicts Pharaoh Narmer uniting Upper and Lower Egypt. The symbolism and scenes on the palette tell the story of the birth of a unified state, the establishment of power, and the beginning of the pharaonic era. It was likely used in rituals and demonstrated the divine right of the king to rule.',
      model: '/models/narmer_palette-optimized.glb',
    },
    {
      id: '6',
      name: 'Bust of Nefertiti',
      period: '18th Dynasty',
      location: 'Amarna',
      description: "This exquisite bust of Queen Nefertiti, carved from limestone and covered with plaster and paint, embodies the ideal of female beauty in Ancient Egypt. Found in sculptor Thutmose's workshop in Amarna, the bust captivates with its refined style, elegant crown, and expressive facial features. It's like a frozen moment—a gaze into eternity, reflecting the power, grace, and mystery of the great queen.",
      model: '/models/bust_of_nefertiti-optimized.glb',
    },
    {
      id: '4',
      name: 'Ankh — Key of Life',
      period: 'Early Dynastic Period',
      location: 'Thebes or Memphis',
      description: 'In the hands of gods and pharaohs, the ankh was not just a symbol—it was a promise. It was carried in rituals, carved on temple walls, worn close to the heart. It whispered of eternal life, rebirth, and infinite existence—a sacred key to the visible and invisible world.',
      model: '/models/ankh-optimized.glb',
    },
  ],
  ru: [
    {
      id: '1',
      name: 'Золотая Маска Тутанхамона',
      period: 'XVIII Династия',
      location: 'Долина Царей',
      description: 'Изысканная погребальная маска из 11 кг чистого золота с инкрустациями из лазурита и других полудрагоценных камней. Она покрывала мумию фараона XVIII династии Тутанхамона. Открыта Ховардом Картером в 1922 году, маска стала символом древнеегипетского мастерства и богатства фараонов.',
      model: '/models/tutankhamun_mask-optimized.glb',
    },
    {
      id: '2',
      name: 'Розеттский Камень',
      period: 'Птолемеевский Период',
      location: 'Мемфис',
      description: 'Гранитовая стела с декретом, изданным в Мемфисе в 196 г. до н.э. от имени царя Птолемея V Эпифана. Текст высечен на трех языках: древнеегипетских иероглифах, демотическом письме и древнегреческом. Благодаря этим параллельным текстам стало возможно расшифровать иероглифы, что удалось Жан-Франсуа Шампольону в 1822 году.',
      model: '/models/rosetta_stone-optimized.glb',
    },
    {
      id: '3',
      name: 'Палетка Нармера',
      period: 'Раннединастический Период',
      location: 'Иераконполь (Нехен)',
      description: 'Эта церемониальная палетка из зеленого сланца — один из самых древних и значимых памятников Древнего Египта. На ней изображен фараон Нармер, объединяющий Верхний и Нижний Египет. Символика и сцены на палетке рассказывают историю рождения единого государства, установления власти и начала эпохи фараонов. Вероятно, использовалась в ритуалах и демонстрировала божественное право царя на правление.',
      model: '/models/narmer_palette-optimized.glb',
    },
    {
      id: '6',
      name: 'Бюст Нефертити',
      period: '18-я Династия',
      location: 'Амарна',
      description: 'Этот изысканный бюст царицы Нефертити, вырезанный из известняка и покрытый штукатуркой и краской, воплощает идеал женской красоты в Древнем Египте. Найденный в мастерской скульптора Тутмоса в Амарне, бюст завораживает утонченным стилем, элегантной короной и выразительными чертами лица. Это как замерший момент — взгляд в вечность, отражающий силу, грацию и тайну великой царицы.',
      model: '/models/bust_of_nefertiti-optimized.glb',
    },
    {
      id: '4',
      name: 'Анх — Ключ Жизни',
      period: 'Раннединастический Период',
      location: 'Фивы или Мемфис',
      description: 'В руках богов и фараонов анх был не просто символом — это было обещание. Его носили в ритуалах, высекали на стенах храмов, носили у сердца. Он шептал о вечной жизни, возрождении и бесконечном существовании — священный ключ к видимому и невидимому миру.',
      model: '/models/ankh-optimized.glb',
    },
  ],
  fr: [
    {
      id: '1',
      name: 'Masque Doré de Toutankhamon',
      period: 'XVIIIe Dynastie',
      location: 'Vallée des Rois',
      description: "Un masque funéraire exquis fait de 11 kg d'or pur avec des incrustations de lapis-lazuli et d'autres pierres semi-précieuses. Il couvrait la momie du pharaon de la XVIIIe dynastie Toutankhamon. Découvert par Howard Carter en 1922, le masque est devenu un symbole de l'artisanat égyptien ancien et de la richesse des pharaons.",
      model: '/models/tutankhamun_mask-optimized.glb',
    },
    {
      id: '2',
      name: 'Pierre de Rosette',
      period: 'Période Ptolémaïque',
      location: 'Memphis',
      description: "Une stèle en granodiorite avec un décret émis à Memphis en 196 av. J.-C. au nom du roi Ptolémée V Épiphane. Le texte est inscrit en trois langues : hiéroglyphes égyptiens anciens, écriture démotique et grec ancien. Grâce à ces textes parallèles, il a été possible de déchiffrer les hiéroglyphes, ce que Jean-François Champollion a accompli en 1822.",
      model: '/models/rosetta_stone-optimized.glb',
    },
    {
      id: '3',
      name: 'Palette de Narmer',
      period: 'Période Dynastique Précoce',
      location: 'Hiérakonpolis (Nekhen)',
      description: "Cette palette cérémonielle en schiste vert est l'un des monuments les plus anciens et les plus significatifs de l'Égypte ancienne. Elle représente le pharaon Narmer unifiant la Haute et la Basse Égypte. Le symbolisme et les scènes sur la palette racontent l'histoire de la naissance d'un État unifié, l'établissement du pouvoir et le début de l'ère pharaonique. Elle était probablement utilisée dans des rituels et démontrait le droit divin du roi à régner.",
      model: '/models/narmer_palette-optimized.glb',
    },
    {
      id: '6',
      name: 'Buste de Néfertiti',
      period: '18e Dynastie',
      location: 'Amarna',
      description: "Ce buste exquis de la reine Néfertiti, sculpté dans du calcaire et recouvert de plâtre et de peinture, incarne l'idéal de la beauté féminine dans l'Égypte ancienne. Trouvé dans l'atelier du sculpteur Thoutmôsis à Amarna, le buste captive par son style raffiné, sa couronne élégante et ses traits expressifs. C'est comme un moment figé — un regard dans l'éternité, reflétant le pouvoir, la grâce et le mystère de la grande reine.",
      model: '/models/bust_of_nefertiti-optimized.glb',
    },
    {
      id: '4',
      name: 'Ankh — Clé de la Vie',
      period: 'Période Dynastique Précoce',
      location: 'Thèbes ou Memphis',
      description: "Dans les mains des dieux et des pharaons, l'ankh n'était pas seulement un symbole — c'était une promesse. Il était porté lors de rituels, gravé sur les murs des temples, porté près du cœur. Il murmurait la vie éternelle, la renaissance et l'existence infinie — une clé sacrée vers le monde visible et invisible.",
      model: '/models/ankh-optimized.glb',
    },
  ],
  de: [
    {
      id: '1',
      name: 'Goldene Maske des Tutanchamun',
      period: 'XVIII. Dynastie',
      location: 'Tal der Könige',
      description: 'Eine exquisite Grabmaske aus 11 kg reinem Gold mit Einlagen aus Lapislazuli und anderen Halbedelsteinen. Sie bedeckte die Mumie des Pharaos Tutanchamun der XVIII. Dynastie. Entdeckt von Howard Carter im Jahr 1922, wurde die Maske zum Symbol des alten ägyptischen Handwerks und des Reichtums der Pharaonen.',
      model: '/models/tutankhamun_mask-optimized.glb',
    },
    {
      id: '2',
      name: 'Rosetta-Stein',
      period: 'Ptolemäische Periode',
      location: 'Memphis',
      description: 'Eine Granodiorit-Stele mit einem Dekret, das 196 v. Chr. in Memphis im Namen von König Ptolemaios V. Epiphanes erlassen wurde. Der Text ist in drei Sprachen eingraviert: altägyptischen Hieroglyphen, demotischer Schrift und altgriechisch. Dank dieser parallelen Texte wurde es möglich, Hieroglyphen zu entschlüsseln, was Jean-François Champollion 1822 gelang.',
      model: '/models/rosetta_stone-optimized.glb',
    },
    {
      id: '3',
      name: 'Narmer-Palette',
      period: 'Frühdynastische Periode',
      location: 'Hierakonpolis (Nekhen)',
      description: 'Diese zeremonielle Palette aus grünem Schiefer ist eines der ältesten und bedeutendsten Denkmäler des Alten Ägyptens. Sie zeigt Pharao Narmer, der Ober- und Unterägypten vereint. Die Symbolik und Szenen auf der Palette erzählen die Geschichte der Geburt eines vereinten Staates, der Etablierung der Macht und des Beginns der pharaonischen Ära. Sie wurde wahrscheinlich in Ritualen verwendet und demonstrierte das göttliche Recht des Königs zu regieren.',
      model: '/models/narmer_palette-optimized.glb',
    },
    {
      id: '6',
      name: 'Büste der Nofretete',
      period: '18. Dynastie',
      location: 'Amarna',
      description: 'Diese exquisite Büste der Königin Nofretete, aus Kalkstein geschnitzt und mit Gips und Farbe bedeckt, verkörpert das Ideal weiblicher Schönheit im Alten Ägypten. Gefunden in der Werkstatt des Bildhauers Thutmosis in Amarna, fasziniert die Büste durch ihren raffinierten Stil, die elegante Krone und die ausdrucksstarken Gesichtszüge. Es ist wie ein eingefrorener Moment — ein Blick in die Ewigkeit, der die Macht, Anmut und das Geheimnis der großen Königin widerspiegelt.',
      model: '/models/bust_of_nefertiti-optimized.glb',
    },
    {
      id: '4',
      name: 'Ankh — Schlüssel des Lebens',
      period: 'Frühdynastische Periode',
      location: 'Theben oder Memphis',
      description: 'In den Händen von Göttern und Pharaonen war das Ankh nicht nur ein Symbol — es war ein Versprechen. Es wurde in Ritualen getragen, in Tempelwände gemeißelt, nahe am Herzen getragen. Es flüsterte von ewigem Leben, Wiedergeburt und unendlicher Existenz — ein heiliger Schlüssel zur sichtbaren und unsichtbaren Welt.',
      model: '/models/ankh-optimized.glb',
    },
  ],
};

export const getArtifacts = (lang: Language): Artifact[] => {
  return artifactsData[lang] || artifactsData.en;
};