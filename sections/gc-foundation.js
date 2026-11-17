registerSection({
  "id": "gc-foundation",
  "subject": "General Chemistry",
  "title": "Stoichiometry, atoms & bonding",
  "subtitle": "CHEM 1",
  "source": "General Chemistry Equation Sheet",
  "addedOn": "2026-11-17",
  "topics": [
    {
      "id": "stoich",
      "title": "Moles, limiting reagent & yield",
      "notes": [
        {
          "type": "text",
          "body": "Equation sheet p. 1. Match coefficients to moles, then convert to requested units."
        },
        {
          "type": "key",
          "title": "Rule",
          "body": "n = mass/molar mass. Balance the equation before comparing reactants. Divide each available reactant amount in moles by its coefficient; the smaller quotient limits the reaction. Percent yield = actual/theoretical × 100%. Distinguish empirical ratios from the molecular formula."
        },
        {
          "type": "text",
          "title": "Worked example",
          "body": "2H₂ + O₂ → 2H₂O. From 5 mol H₂ and 2 mol O₂, compare 5/2 and 2/1. O₂ limits; 2 mol O₂ makes 4 mol H₂O. A 3.2 mol actual yield is 80%."
        }
      ]
    },
    {
      "id": "atoms",
      "title": "Atomic structure & periodic trends",
      "notes": [
        {
          "type": "text",
          "body": "Equation sheet p. 1 (photon energy); periodic trends, ions and orbital filling supplement the sheet."
        },
        {
          "type": "key",
          "title": "Rule",
          "body": "E = hν = hc/λ. Across a period, increasing effective nuclear charge generally decreases radius and raises ionization energy. For isoelectronic ions, more protons means smaller radius. Remove valence electrons first; for first-row transition metals, 4s electrons are lost before 3d."
        },
        {
          "type": "text",
          "title": "Worked example",
          "body": "Na⁺, Mg²⁺ and F⁻ each have ten electrons. Mg²⁺ has the most protons, so it is smallest in this set."
        }
      ]
    },
    {
      "id": "bonding",
      "title": "Lewis structures, polarity & phases",
      "notes": [
        {
          "type": "text",
          "body": "OAT concepts supplement the equation sheet: molecular shape, intermolecular forces and phase behavior."
        },
        {
          "type": "key",
          "title": "Rule",
          "body": "Count electron domains to identify electron geometry; lone pairs change molecular shape. A molecule’s dipole is the vector sum of bond dipoles. Polar molecules have dipole attractions; all have dispersion forces. Stronger intermolecular attractions generally reduce vapor pressure at fixed temperature."
        },
        {
          "type": "text",
          "title": "Worked example",
          "body": "CO₂ is linear. Its equal, opposite C–O dipoles cancel, even though the bonds are polar. Bent H₂O has a net dipole and can hydrogen bond."
        }
      ]
    },
    {
      "id": "lab",
      "title": "Dilutions, absorbance & measurement",
      "notes": [
        {
          "type": "text",
          "body": "Equation sheet p. 1; distinguish precision from agreement with a reference."
        },
        {
          "type": "key",
          "title": "Rule",
          "body": "For the same solute with no loss, M₁V₁ = M₂V₂. V₂ is final volume, not added solvent. Beer–Lambert A = εℓc in its linear range. Relative error = (measured − reference)/reference; percent error normally uses its magnitude."
        },
        {
          "type": "text",
          "title": "Worked example",
          "body": "To make 250 mL of 0.20 M from 1.0 M stock, use 50 mL stock and dilute to 250 mL total."
        }
      ]
    }
  ],
  "questions": [
    {
      "id": "gc-foundation-stoich-1",
      "topic": "stoich",
      "skill": "Ratios",
      "difficulty": "application",
      "stem": "For 2Al + 3Cl₂ → 2AlCl₃, 4 mol Al and 3 mol Cl₂ react. What is the maximum AlCl₃ yield?",
      "options": [
        "2 mol",
        "3 mol",
        "4 mol",
        "6 mol"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "3/3 is smaller than 4/2, so Cl₂ limits. One reaction unit yields 2 mol AlCl₃."
    },
    {
      "id": "gc-foundation-stoich-2",
      "topic": "stoich",
      "skill": "Ratios",
      "difficulty": "application",
      "stem": "A reaction has a theoretical yield of 15.0 g and an actual yield of 12.0 g. What is its percent yield?",
      "options": [
        "80%",
        "125%",
        "20%",
        "3%"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "Divide actual by theoretical, then multiply by 100. The missing fraction is 20%, not the yield."
    },
    {
      "id": "gc-foundation-stoich-3",
      "topic": "stoich",
      "skill": "Ratios",
      "difficulty": "analysis",
      "stem": "A compound has empirical formula CH₂O and a molar mass near 90 g/mol. What is its molecular formula?",
      "options": [
        "C₃H₆O₃",
        "C₂H₄O₂",
        "CH₂O",
        "C₆H₁₂O₆"
      ],
      "answer": 0,
      "mustGet": true,
      "explanation": "The empirical formula mass is about 30 g/mol. The molar mass is three times as large, so multiply every subscript by 3."
    },
    {
      "id": "gc-foundation-atoms-1",
      "topic": "atoms",
      "skill": "Model selection",
      "difficulty": "application",
      "stem": "Which ion is smallest in the isoelectronic set O²⁻, F⁻, Na⁺, Mg²⁺?",
      "options": [
        "Mg²⁺",
        "O²⁻",
        "F⁻",
        "Na⁺"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "All have ten electrons. Mg²⁺ has the greatest nuclear charge, attracting the same electron count most strongly."
    },
    {
      "id": "gc-foundation-atoms-2",
      "topic": "atoms",
      "skill": "Model selection",
      "difficulty": "application",
      "stem": "A photon’s wavelength is halved. How does its energy change?",
      "options": [
        "It doubles",
        "It halves",
        "It quadruples",
        "It stays fixed"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "E = hc/λ. With h and c fixed, energy is inversely proportional to wavelength."
    },
    {
      "id": "gc-foundation-atoms-3",
      "topic": "atoms",
      "skill": "Model selection",
      "difficulty": "analysis",
      "stem": "Neutral iron is [Ar] 3d⁶4s². What is the usual electron configuration of Fe²⁺?",
      "options": [
        "[Ar] 3d⁶",
        "[Ar] 3d⁴4s²",
        "[Ar] 3d⁵4s¹",
        "[Ar] 3d⁸"
      ],
      "answer": 0,
      "mustGet": true,
      "explanation": "Remove the two 4s electrons first when forming this cation. Removing 3d electrons first would give an incorrect configuration."
    },
    {
      "id": "gc-foundation-bonding-1",
      "topic": "bonding",
      "skill": "Model selection",
      "difficulty": "application",
      "stem": "Which molecule is nonpolar because its two main bond dipoles cancel?",
      "options": [
        "CO₂",
        "SO₂",
        "H₂O",
        "NH₃"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "The linear symmetry of CO₂ cancels its two bond dipoles. SO₂ and water are bent; ammonia is pyramidal."
    },
    {
      "id": "gc-foundation-bonding-2",
      "topic": "bonding",
      "skill": "Model selection",
      "difficulty": "application",
      "stem": "What is the molecular shape of NH₃ around nitrogen?",
      "options": [
        "Trigonal pyramidal",
        "Trigonal planar",
        "Tetrahedral",
        "Bent"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "Nitrogen has three bonds and one lone pair. Four domains are tetrahedral in electron geometry, but the three atoms form a trigonal pyramid."
    },
    {
      "id": "gc-foundation-bonding-3",
      "topic": "bonding",
      "skill": "Model selection",
      "difficulty": "analysis",
      "stem": "At the same temperature, liquid A has stronger intermolecular attractions than comparable liquid B. Which is generally true?",
      "options": [
        "A has lower equilibrium vapor pressure",
        "A has higher equilibrium vapor pressure",
        "Both must have identical vapor pressures",
        "A’s covalent bonds break more readily on evaporation"
      ],
      "answer": 0,
      "mustGet": true,
      "explanation": "Fewer molecules escape the liquid at equilibrium when attractions are stronger. Vaporization overcomes intermolecular attractions, not covalent bonds."
    },
    {
      "id": "gc-foundation-lab-1",
      "topic": "lab",
      "skill": "Unit conversion",
      "difficulty": "application",
      "stem": "How much 2.0 M stock is needed for 100.0 mL of 0.50 M solution?",
      "options": [
        "25.0 mL",
        "50.0 mL",
        "75.0 mL",
        "400 mL"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "V₁ = 0.50 × 100.0/2.0 = 25.0 mL; 75 mL is the nominal amount of solvent to add, not the stock volume."
    },
    {
      "id": "gc-foundation-lab-2",
      "topic": "lab",
      "skill": "Unit conversion",
      "difficulty": "application",
      "stem": "At fixed path length and wavelength, absorbance goes from 0.20 to 0.50 in the linear range. What is c₂/c₁?",
      "options": [
        "2.5",
        "0.4",
        "1.5",
        "0.3"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "The path length and absorptivity cancel. The concentration ratio is 0.50/0.20 = 2.5."
    },
    {
      "id": "gc-foundation-lab-3",
      "topic": "lab",
      "skill": "Unit conversion",
      "difficulty": "analysis",
      "stem": "Measurements of a 10.00 g reference cluster tightly around 10.70 g. What is the best description?",
      "options": [
        "High precision, low accuracy",
        "Low precision, high accuracy",
        "High precision and high accuracy",
        "Low precision and low accuracy"
      ],
      "answer": 0,
      "mustGet": true,
      "explanation": "The close grouping indicates precision; systematic deviation from 10.00 g indicates poor accuracy."
    }
  ]
});
