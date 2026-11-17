registerSection({
  "id": "oc-analysis",
  "subject": "Organic Chemistry",
  "title": "Stereochemistry, spectra & lab",
  "subtitle": "ORG 2",
  "source": "Organic Chemistry Lessons",
  "addedOn": "2026-11-17",
  "topics": [
    {
      "id": "stereo",
      "title": "Chirality, E/Z & chair conformations",
      "notes": [
        {
          "type": "text",
          "body": "Lessons ch. 1 PDF p. 4 and ch. 4 PDF pp. 17–21."
        },
        {
          "type": "key",
          "title": "Rule",
          "body": "For R/S, rank by atomic number, resolve ties outward and put priority 4 away before reading 1 → 2 → 3. For E/Z compare the highest-priority group at each alkene carbon: together = Z. A chair flip exchanges axial/equatorial positions while maintaining up/down orientation."
        },
        {
          "type": "text",
          "title": "Worked example",
          "body": "If priority 4 points away and 1 → 2 → 3 moves clockwise, the center is R. If priority 4 points toward you, invert the apparent result."
        }
      ]
    },
    {
      "id": "spectra",
      "title": "IR, NMR & unsaturation",
      "notes": [
        {
          "type": "text",
          "body": "Lessons ch. 5, PDF pp. 22–24."
        },
        {
          "type": "key",
          "title": "Rule",
          "body": "Use IR to find functional groups; a strong band near 1700 cm⁻¹ often signals C=O, and a broad alcohol O–H band is often around 3200–3600 cm⁻¹. Proton NMR integrates relative H counts; under simple first-order conditions, n equivalent neighboring hydrogens can give n+1 peaks. Compare signal count to symmetry. DBE = (2C + 2 + N − H − halogens)/2 for typical neutral formulas."
        },
        {
          "type": "text",
          "title": "Worked example",
          "body": "An isolated ethyl fragment with simple first-order coupling gives a methyl triplet (2 adjacent H) and a methylene quartet (3 adjacent H), with integration 3:2."
        }
      ]
    },
    {
      "id": "lab",
      "title": "TLC, extraction & purification",
      "notes": [
        {
          "type": "text",
          "body": "Lessons ch. 6, PDF pp. 25–27."
        },
        {
          "type": "key",
          "title": "Rule",
          "body": "On normal-phase silica under the same conditions, stronger adsorption gives lower Rf = spot distance/solvent-front distance. Distillation exploits volatility; recrystallization exploits temperature-dependent solubility; acid/base extraction switches a suitable compound between neutral and ionic forms."
        },
        {
          "type": "text",
          "title": "Worked example",
          "body": "A spot travels 2.0 cm and the solvent front 5.0 cm. Rf = 0.40. Use the same plate and solvent when comparing spots."
        }
      ]
    }
  ],
  "questions": [
    {
      "id": "oc-analysis-stereo-1",
      "topic": "stereo",
      "skill": "Structure recognition",
      "difficulty": "application",
      "stem": "The lowest-priority group points toward you. The visible path 1 → 2 → 3 is clockwise. What is the configuration?",
      "options": [
        "S",
        "R",
        "E",
        "Z"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "With priority 4 toward you, invert the apparent clockwise result. E and Z label alkene geometry."
    },
    {
      "id": "oc-analysis-stereo-2",
      "topic": "stereo",
      "skill": "Structure recognition",
      "difficulty": "application",
      "stem": "After a chair flip, a substituent initially axial and up becomes what?",
      "options": [
        "Equatorial and up",
        "Equatorial and down",
        "Axial and down",
        "Axial and up"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "A chair flip changes axial/equatorial, not up/down, so cis/trans relationships remain."
    },
    {
      "id": "oc-analysis-stereo-3",
      "topic": "stereo",
      "skill": "Structure recognition",
      "difficulty": "analysis",
      "stem": "Two structures have the same connectivity and exactly two stereocenters; one center is inverted and the other is unchanged. They are distinct, non-mirror-image structures. What is their relationship?",
      "options": [
        "Diastereomers",
        "Enantiomers",
        "Constitutional isomers",
        "Identical molecules"
      ],
      "answer": 0,
      "mustGet": true,
      "explanation": "They are stereoisomers because connectivity is unchanged; distinct non-mirror-image stereoisomers are diastereomers."
    },
    {
      "id": "oc-analysis-spectra-1",
      "topic": "spectra",
      "skill": "Evidence interpretation",
      "difficulty": "application",
      "stem": "What is the degree of unsaturation of C₅H₈O?",
      "options": [
        "2",
        "1",
        "3",
        "4"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "O does not enter the formula. (2×5+2−8)/2 = 2; each ring or double bond contributes one."
    },
    {
      "id": "oc-analysis-spectra-2",
      "topic": "spectra",
      "skill": "Evidence interpretation",
      "difficulty": "application",
      "stem": "A simple proton NMR group couples only to three equivalent neighboring H. What is the expected splitting?",
      "options": [
        "Quartet",
        "Triplet",
        "Doublet",
        "Singlet"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "The first-order n+1 rule gives four peaks for three equivalent neighbors."
    },
    {
      "id": "oc-analysis-spectra-3",
      "topic": "spectra",
      "skill": "Evidence interpretation",
      "difficulty": "analysis",
      "stem": "A sample shows a strong IR band near 1715 cm⁻¹, no broad O–H band, and one proton NMR singlet integrating to six equivalent H. Which candidate fits best?",
      "options": [
        "Acetone",
        "Propanal",
        "Propan-2-ol",
        "Dimethyl ether"
      ],
      "answer": 0,
      "mustGet": true,
      "explanation": "Acetone has a carbonyl and two equivalent methyl groups with no neighboring H across the carbonyl. The others lack the required carbonyl or symmetry."
    },
    {
      "id": "oc-analysis-lab-1",
      "topic": "lab",
      "skill": "Evidence interpretation",
      "difficulty": "application",
      "stem": "In a normal-phase silica TLC run, the front travels 8 cm and the spot 3 cm. What is Rf?",
      "options": [
        "0.375",
        "2.67",
        "0.625",
        "0.250"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "Rf is spot/front = 3/8. The remaining distance is not the numerator."
    },
    {
      "id": "oc-analysis-lab-2",
      "topic": "lab",
      "skill": "Evidence interpretation",
      "difficulty": "application",
      "stem": "Which technique separates two miscible liquids primarily by differences in volatility?",
      "options": [
        "Distillation",
        "Liquid–liquid extraction",
        "Recrystallization",
        "Filtration"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "Distillation separates by vapor–liquid behavior. The alternatives rely on partitioning, solubility, or particle size."
    },
    {
      "id": "oc-analysis-lab-3",
      "topic": "lab",
      "skill": "Evidence interpretation",
      "difficulty": "analysis",
      "stem": "A carboxylic acid in an organic layer becomes water-soluble after deprotonation. What form is enriched in the aqueous layer?",
      "options": [
        "Carboxylate",
        "Neutral carboxylic acid",
        "Alcohol from reduction",
        "Acyl chloride"
      ],
      "answer": 0,
      "mustGet": true,
      "explanation": "Deprotonation forms a charged carboxylate, which typically partitions into the aqueous phase. No reduction or chlorination is implied."
    }
  ]
});
