registerSection({
  "id": "gc-solutions",
  "subject": "General Chemistry",
  "title": "Gases & solutions",
  "subtitle": "CHEM 2",
  "source": "General Chemistry Equation Sheet",
  "addedOn": "2026-11-17",
  "topics": [
    {
      "id": "gases",
      "title": "Gas laws, partial pressures & effusion",
      "notes": [
        {
          "type": "text",
          "body": "Equation sheet p. 1. Match pressure and volume units to R. Convert temperature to kelvins."
        },
        {
          "type": "key",
          "title": "Rule",
          "body": "PV = nRT. For fixed n and T, P and V are inverse. For fixed P and n, V ∝ T in kelvins. Dalton: Pᵢ = xᵢPtotal. Graham: rate of effusion ∝ 1/√molar mass. A gas collected over water includes water-vapor pressure."
        },
        {
          "type": "text",
          "title": "Worked example",
          "body": "For an ideal gas at fixed V and n, heating from 27°C to 57°C changes pressure by 330/300 ≈ 1.10, not 57/27."
        }
      ]
    },
    {
      "id": "solutions",
      "title": "Concentration, solubility & colligative effects",
      "notes": [
        {
          "type": "text",
          "body": "Equation sheet p. 1. Use kg solvent for molality and L solution for molarity."
        },
        {
          "type": "key",
          "title": "Rule",
          "body": "Molarity = mol solute/L solution; molality = mol solute/kg solvent. Under ideal dilute assumptions ΔT_f = iK_fm, ΔT_b = iK_bm and π = iMRT. Raoult: vapor pressure of a solvent scales with its mole fraction for ideal solutions. Henry: dissolved gas increases with its partial pressure at fixed temperature."
        },
        {
          "type": "text",
          "title": "Worked example",
          "body": "At the same molality, ideal NaCl gives about twice the freezing-point depression of glucose if it dissociates completely into two ions."
        }
      ]
    }
  ],
  "questions": [
    {
      "id": "gc-solutions-gases-1",
      "topic": "gases",
      "skill": "Unit conversion",
      "difficulty": "application",
      "stem": "A dry mixture has 3 mol N₂ and 1 mol O₂ at 800 torr total. What is the O₂ partial pressure?",
      "options": [
        "200 torr",
        "600 torr",
        "400 torr",
        "800 torr"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "The O₂ mole fraction is 1/(3+1) = 0.25. Multiply it by total pressure."
    },
    {
      "id": "gc-solutions-gases-2",
      "topic": "gases",
      "skill": "Unit conversion",
      "difficulty": "application",
      "stem": "Use R = 0.0820 L·atm/(mol·K). Which inputs match R for 500 mL at 1 atm and 27°C?",
      "options": [
        "0.500 L, 1 atm, 300 K",
        "500 L, 1 atm, 300 K",
        "0.500 L, 760 atm, 27 K",
        "0.500 L, 1 atm, 27 K"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "Convert mL to L and °C to K. Pressure is already in atm, so no pressure conversion is needed."
    },
    {
      "id": "gc-solutions-gases-3",
      "topic": "gases",
      "skill": "Unit conversion",
      "difficulty": "analysis",
      "stem": "An ideal gas doubles its kelvin temperature and triples its volume at fixed molar amount. What is P₂/P₁?",
      "options": [
        "2/3",
        "3/2",
        "6",
        "1/6"
      ],
      "answer": 0,
      "mustGet": true,
      "explanation": "At fixed n, P ∝ T/V, so the ratio is 2/3. The volume and temperature do not both increase pressure."
    },
    {
      "id": "gc-solutions-solutions-1",
      "topic": "solutions",
      "skill": "Ratios",
      "difficulty": "application",
      "stem": "A solution uses 0.50 mol solute with 250 g solvent. What is its molality?",
      "options": [
        "2.0 mol/kg",
        "0.125 mol/kg",
        "0.0020 mol/kg",
        "0.50 mol/kg"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "The solvent mass is 0.250 kg, so molality is 0.50/0.250 = 2.0 mol/kg."
    },
    {
      "id": "gc-solutions-solutions-2",
      "topic": "solutions",
      "skill": "Ratios",
      "difficulty": "application",
      "stem": "At equal dilute molalities, which solute gives the largest ideal boiling-point elevation assuming complete dissociation?",
      "options": [
        "CaCl₂",
        "Glucose",
        "NaCl",
        "Sucrose"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "Ideal CaCl₂ provides three particles per formula unit, NaCl two, and the molecular solutes one."
    },
    {
      "id": "gc-solutions-solutions-3",
      "topic": "solutions",
      "skill": "Ratios",
      "difficulty": "analysis",
      "stem": "At fixed temperature, the partial pressure of CO₂ above a dilute solution doubles. What does Henry’s law predict?",
      "options": [
        "Equilibrium dissolved CO₂ approximately doubles",
        "Equilibrium dissolved CO₂ halves",
        "Equilibrium dissolved CO₂ quadruples",
        "It stays fixed because total pressure governs all dissolved gases equally"
      ],
      "answer": 0,
      "mustGet": true,
      "explanation": "Dissolved concentration is proportional to that gas’s partial pressure at fixed temperature, within the law’s range."
    }
  ]
});
