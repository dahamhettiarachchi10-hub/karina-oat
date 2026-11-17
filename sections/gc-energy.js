registerSection({
  "id": "gc-energy",
  "subject": "General Chemistry",
  "title": "Thermochemistry, redox & nuclear",
  "subtitle": "CHEM 4",
  "source": "General Chemistry Equation Sheet",
  "addedOn": "2026-11-17",
  "topics": [
    {
      "id": "thermo",
      "title": "Heat, Hess’s law & spontaneity",
      "notes": [
        {
          "type": "text",
          "body": "Equation sheet p. 2. Keep units consistent across ΔH and TΔS."
        },
        {
          "type": "key",
          "title": "Rule",
          "body": "Heat transfer q = mcΔT when no phase change occurs. Ideal isolated calorimetry: q_system = −q_surroundings. Reverse a reaction to reverse ΔH; multiply its equation to scale ΔH. At constant T, ΔG = ΔH − TΔS; negative ΔG favors the forward change under the stated conditions."
        },
        {
          "type": "text",
          "title": "Worked example",
          "body": "ΔH = +30 kJ/mol and ΔS = +0.10 kJ/(mol·K). ΔG turns negative above 300 K."
        }
      ]
    },
    {
      "id": "redox",
      "title": "Cell potentials & electron flow",
      "notes": [
        {
          "type": "text",
          "body": "Equation sheet p. 2. Use tabulated reduction potentials consistently."
        },
        {
          "type": "key",
          "title": "Rule",
          "body": "Oxidation at anode; reduction at cathode. E°cell = E°red,cathode − E°red,anode, without multiplying potential by coefficients. ΔG° = −nFE°. In a galvanic cell, anions migrate toward the anode side to compensate generated positive charge."
        },
        {
          "type": "text",
          "title": "Worked example",
          "body": "For E°red(Cu²⁺/Cu) = +0.34 V and E°red(Zn²⁺/Zn) = −0.76 V, E°cell = +1.10 V when copper is reduced."
        }
      ]
    },
    {
      "id": "nuclear",
      "title": "Nuclear notation & decay",
      "notes": [
        {
          "type": "text",
          "body": "Equation sheet pp. 2–4. Balance mass number and atomic number separately."
        },
        {
          "type": "key",
          "title": "Rule",
          "body": "Alpha emission decreases mass number by 4 and atomic number by 2. Beta-minus leaves mass number unchanged and increases atomic number by one; positron emission and electron capture decrease it by one. Gamma emission changes neither. Mass defect corresponds to binding energy through E = Δmc²."
        },
        {
          "type": "text",
          "title": "Worked example",
          "body": "Alpha decay of ²³⁸₉₂U produces a nucleus with mass number 234 and atomic number 90."
        }
      ]
    }
  ],
  "questions": [
    {
      "id": "gc-energy-thermo-1",
      "topic": "thermo",
      "skill": "Signs and scale",
      "difficulty": "application",
      "stem": "Water in an isolated calorimeter warms by 5°C because a sample reacts. Which sign fits q for the reaction?",
      "options": [
        "Negative",
        "Positive",
        "Zero",
        "Indeterminate regardless of water warming"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "Water gained heat. In the isolated two-part model, the reaction lost the same amount of heat."
    },
    {
      "id": "gc-energy-thermo-2",
      "topic": "thermo",
      "skill": "Signs and scale",
      "difficulty": "application",
      "stem": "If A → B has ΔH = −15 kJ, what is ΔH for 2B → 2A?",
      "options": [
        "+30 kJ",
        "−30 kJ",
        "+15 kJ",
        "−7.5 kJ"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "Reverse the sign and multiply by two to match the new reaction stoichiometry."
    },
    {
      "id": "gc-energy-thermo-3",
      "topic": "thermo",
      "skill": "Signs and scale",
      "difficulty": "analysis",
      "stem": "ΔH = −20 kJ/mol and ΔS = −100 J/(mol·K). What is ΔG at 300 K?",
      "options": [
        "+10 kJ/mol",
        "−50 kJ/mol",
        "−20.1 kJ/mol",
        "−29980 kJ/mol"
      ],
      "answer": 0,
      "mustGet": true,
      "explanation": "ΔS = −0.100 kJ/(mol·K); ΔG = −20 −300(−0.100) = +10. Convert joules before combining terms."
    },
    {
      "id": "gc-energy-redox-1",
      "topic": "redox",
      "skill": "Signs and scale",
      "difficulty": "application",
      "stem": "Which species loses electrons in Zn(s) + Cu²⁺ → Zn²⁺ + Cu(s)?",
      "options": [
        "Zn(s)",
        "Cu²⁺",
        "Zn²⁺",
        "Cu(s)"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "Zn rises from oxidation number 0 to +2, so it is oxidized. Cu²⁺ gains electrons."
    },
    {
      "id": "gc-energy-redox-2",
      "topic": "redox",
      "skill": "Signs and scale",
      "difficulty": "application",
      "stem": "For a galvanic reaction with E°cell > 0, which sign must ΔG° have?",
      "options": [
        "Negative",
        "Positive",
        "Zero",
        "It depends on multiplying potentials by coefficients"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "n and F are positive, so ΔG° = −nFE° is negative."
    },
    {
      "id": "gc-energy-redox-3",
      "topic": "redox",
      "skill": "Signs and scale",
      "difficulty": "analysis",
      "stem": "A balanced cell reaction is multiplied by two. What changes for the same standard half-cells?",
      "options": [
        "n doubles; E°cell is unchanged",
        "n and E°cell both double",
        "n is unchanged; E°cell doubles",
        "Both are unchanged"
      ],
      "answer": 0,
      "mustGet": true,
      "explanation": "Transferred electron moles are extensive. Voltage is energy per charge and is not scaled with the balanced equation."
    },
    {
      "id": "gc-energy-nuclear-1",
      "topic": "nuclear",
      "skill": "Model selection",
      "difficulty": "application",
      "stem": "A nucleus starts with mass number 40 and atomic number 19. After beta-minus emission its daughter numbers are which pair?",
      "options": [
        "40, 20",
        "39, 18",
        "36, 17",
        "40, 18"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "Beta-minus converts a neutron into a proton with emission of an electron and antineutrino. Mass number stays 40 and Z rises to 20."
    },
    {
      "id": "gc-energy-nuclear-2",
      "topic": "nuclear",
      "skill": "Model selection",
      "difficulty": "application",
      "stem": "A radioactive sample decreases from 80 mg to 10 mg in 18 hours. What is the half-life?",
      "options": [
        "6 hours",
        "3 hours",
        "9 hours",
        "18 hours"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "80 → 40 → 20 → 10 is three half-lives, so 18/3 = 6 hours."
    },
    {
      "id": "gc-energy-nuclear-3",
      "topic": "nuclear",
      "skill": "Model selection",
      "difficulty": "analysis",
      "stem": "A nucleus emits alpha, then gamma. Relative to the initial nucleus, what are the final changes (ΔA, ΔZ)?",
      "options": [
        "(−4, −2)",
        "(−4, −3)",
        "(−8, −4)",
        "(0, −2)"
      ],
      "answer": 0,
      "mustGet": true,
      "explanation": "Only alpha changes either count. Gamma releases energy without changing nucleon number or charge."
    }
  ]
});
