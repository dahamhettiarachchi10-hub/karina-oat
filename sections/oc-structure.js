registerSection({
  "id": "oc-structure",
  "subject": "Organic Chemistry",
  "title": "Structure, bonding & acidity",
  "subtitle": "ORG 1",
  "source": "Organic Chemistry Lessons",
  "addedOn": "2026-11-17",
  "topics": [
    {
      "id": "bonding",
      "title": "Hybridization & resonance",
      "notes": [
        {
          "type": "text",
          "body": "Lessons ch. 1, PDF pp. 2–4."
        },
        {
          "type": "key",
          "title": "Rule",
          "body": "Two, three and four electron domains at carbon generally correspond to sp, sp² and sp³. A double bond has one σ and one π bond. Resonance changes electron placement while preserving atom connectivity. Contributors are drawings of one structure, not species in equilibrium."
        },
        {
          "type": "text",
          "title": "Worked example",
          "body": "In acetate, moving the lone pair on the single-bonded oxygen toward C while moving the original C=O π pair onto the other oxygen swaps the two contributors. The actual C–O bonds are equivalent."
        }
      ]
    },
    {
      "id": "acidity",
      "title": "Acid strength & proton transfer",
      "notes": [
        {
          "type": "text",
          "body": "Lessons ch. 2, PDF pp. 5–8."
        },
        {
          "type": "key",
          "title": "Rule",
          "body": "Lower pKa means stronger acid. Compare conjugate-base stabilization by atom, resonance, induction and orbital s character. Proton transfer tends to favor the side with the weaker acid, higher pKa, all else being comparable."
        },
        {
          "type": "text",
          "title": "Worked example",
          "body": "A reaction taking H⁺ from an acid of pKa 5 to form one of pKa 10 is favored on the product side by about 10⁵ under the corresponding standard-state convention."
        }
      ]
    },
    {
      "id": "names",
      "title": "Functional groups & naming",
      "notes": [
        {
          "type": "text",
          "body": "Lessons ch. 3, PDF pp. 9–16."
        },
        {
          "type": "key",
          "title": "Rule",
          "body": "Identify the principal functional group first, then choose and number the parent containing it. Distinguish a terminal aldehyde from an internal ketone, and an ester’s C(=O)–O linkage from an ether lacking carbonyl."
        },
        {
          "type": "text",
          "title": "Worked example",
          "body": "CH₃CH(OH)CH₃ is propan-2-ol; CH₃C(=O)OCH₃ is methyl ethanoate. In the ester name, the O-bound methyl group comes first."
        }
      ]
    }
  ],
  "questions": [
    {
      "id": "oc-structure-bonding-1",
      "topic": "bonding",
      "skill": "Model selection",
      "difficulty": "application",
      "stem": "What hybridization describes the central carbon of CO₂?",
      "options": [
        "sp",
        "sp²",
        "sp³",
        "Unhybridized s only"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "Two C=O bonds count as two electron domains. This gives a linear sp arrangement."
    },
    {
      "id": "oc-structure-bonding-2",
      "topic": "bonding",
      "skill": "Model selection",
      "difficulty": "application",
      "stem": "How many σ and π bonds are in the C≡C bond of ethyne?",
      "options": [
        "1 σ and 2 π",
        "2 σ and 1 π",
        "3 σ and 0 π",
        "0 σ and 3 π"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "The first bond is σ along the internuclear axis; the additional two are π."
    },
    {
      "id": "oc-structure-bonding-3",
      "topic": "bonding",
      "skill": "Model selection",
      "difficulty": "analysis",
      "stem": "Which proposed change can create another resonance contributor for acetate?",
      "options": [
        "Shift the C=O π pair and a lone pair on the other O without moving atoms",
        "Move an H from carbon to oxygen",
        "Break the carbon–carbon σ bond",
        "Change the total ionic charge from −1 to 0"
      ],
      "answer": 0,
      "mustGet": true,
      "explanation": "Resonance shifts electrons and preserves σ connectivity, atomic positions and total charge. Moving H changes connectivity."
    },
    {
      "id": "oc-structure-acidity-1",
      "topic": "acidity",
      "skill": "Equilibrium reasoning",
      "difficulty": "application",
      "stem": "Why is acetic acid more acidic than ethanol?",
      "options": [
        "Its conjugate base delocalizes charge over two oxygens",
        "Ethanol’s conjugate base has two equivalent resonance forms",
        "Acetic acid produces a less stable conjugate base",
        "Ethanol has a much lower pKa"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "Acetate has resonance stabilization; ethoxide has a localized negative charge. Lower pKa corresponds to the more stabilized conjugate base here."
    },
    {
      "id": "oc-structure-acidity-2",
      "topic": "acidity",
      "skill": "Equilibrium reasoning",
      "difficulty": "application",
      "stem": "For comparable C–H bonds, which orbital hybrid generally stabilizes a carbanion most?",
      "options": [
        "sp",
        "sp²",
        "sp³",
        "All stabilize it equally"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "Greater s character holds the negative charge closer to the nucleus. sp has 50% s character."
    },
    {
      "id": "oc-structure-acidity-3",
      "topic": "acidity",
      "skill": "Equilibrium reasoning",
      "difficulty": "analysis",
      "stem": "HA has pKa 4 and HB has pKa 9. For HA + B⁻ ⇌ A⁻ + HB, what is the approximate equilibrium constant under the same pKa convention?",
      "options": [
        "10⁵",
        "10⁻⁵",
        "5",
        "1"
      ],
      "answer": 0,
      "mustGet": true,
      "explanation": "The product acid has pKa higher by 5, so K ≈ 10^(9−4) and favors formation of HB."
    },
    {
      "id": "oc-structure-names-1",
      "topic": "names",
      "skill": "Structure recognition",
      "difficulty": "application",
      "stem": "Which name fits CH₃CH₂CHO?",
      "options": [
        "Propanal",
        "Propanone",
        "Propan-1-ol",
        "Ethyl methanoate"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "The molecule has a three-carbon parent and a terminal aldehyde carbonyl."
    },
    {
      "id": "oc-structure-names-2",
      "topic": "names",
      "skill": "Structure recognition",
      "difficulty": "application",
      "stem": "Which functional group is present in R–C(=O)–O–R′?",
      "options": [
        "Ester",
        "Ether",
        "Amide",
        "Ketone"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "An ester has an acyl carbon directly bonded to an O that is bonded to another carbon group."
    },
    {
      "id": "oc-structure-names-3",
      "topic": "names",
      "skill": "Structure recognition",
      "difficulty": "analysis",
      "stem": "What is the preferred basic name for CH₃CH(CH₃)CH₂OH?",
      "options": [
        "2-methylpropan-1-ol",
        "2-methylpropan-3-ol",
        "Propan-2-ol",
        "2-ethylmethanol"
      ],
      "answer": 0,
      "mustGet": true,
      "explanation": "Number the longest OH-containing chain starting at the OH end. The methyl is on carbon 2 and the alcohol is on carbon 1."
    }
  ]
});
