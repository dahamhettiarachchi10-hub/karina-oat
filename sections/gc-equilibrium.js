registerSection({
  "id": "gc-equilibrium",
  "subject": "General Chemistry",
  "title": "Kinetics, equilibrium & acids",
  "subtitle": "CHEM 3",
  "source": "General Chemistry Equation Sheet",
  "addedOn": "2026-11-17",
  "topics": [
    {
      "id": "kinetics",
      "title": "Rate laws & half-life",
      "notes": [
        {
          "type": "text",
          "body": "Equation sheet pp. 1–2."
        },
        {
          "type": "key",
          "title": "Rule",
          "body": "Use initial-rate data to infer exponents; do not copy stoichiometric coefficients unless the rate law is for an elementary step. A catalyst lowers activation energy without changing K or the overall ΔG. For first-order decay, t½ = ln 2/k."
        },
        {
          "type": "text",
          "title": "Worked example",
          "body": "If doubling [A] at fixed [B] multiplies rate by 4, A is second order. If tripling [B] changes nothing, B is zero order."
        }
      ]
    },
    {
      "id": "equilibrium",
      "title": "Q versus K and solubility",
      "notes": [
        {
          "type": "text",
          "body": "Equation sheet p. 2. Exclude pure solids and liquids from the expression."
        },
        {
          "type": "key",
          "title": "Rule",
          "body": "Build Q from current activities with stoichiometric powers; K has the same expression at equilibrium. Q < K favors products; Q > K favors reactants. Ksp uses dissolved ion concentrations in the simplified dilute model. A common ion usually reduces molar solubility."
        },
        {
          "type": "text",
          "title": "Worked example",
          "body": "AgCl(s) ⇌ Ag⁺ + Cl⁻. In pure water [Ag⁺] = [Cl⁻] = s, so Ksp = s². Added Cl⁻ changes the relation and lowers s."
        }
      ]
    },
    {
      "id": "acids",
      "title": "pH, buffers & titrations",
      "notes": [
        {
          "type": "text",
          "body": "Equation sheet p. 2. Do neutralization stoichiometry before calculating buffer pH."
        },
        {
          "type": "key",
          "title": "Rule",
          "body": "pH = −log[H⁺]. At 25°C in dilute water pH + pOH ≈ 14. For a weak-acid buffer, pH = pKa + log([A⁻]/[HA]). At half-equivalence for weak acid titrated by strong base, pH ≈ pKa. At equivalence identify the remaining salt or excess species."
        },
        {
          "type": "text",
          "title": "Worked example",
          "body": "For [A⁻]/[HA] = 10 and pKa = 4.8, pH = 5.8. Reversing the ratio gives 3.8."
        }
      ]
    }
  ],
  "questions": [
    {
      "id": "gc-equilibrium-kinetics-1",
      "topic": "kinetics",
      "skill": "Ratios",
      "difficulty": "application",
      "stem": "Doubling [A] quadruples rate and doubling [B] doubles rate. What is the overall order?",
      "options": [
        "Third",
        "Second",
        "First",
        "Fourth"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "A contributes order 2; B contributes order 1. Add those exponents to get 3."
    },
    {
      "id": "gc-equilibrium-kinetics-2",
      "topic": "kinetics",
      "skill": "Ratios",
      "difficulty": "application",
      "stem": "After three half-lives of first-order decay, what fraction remains?",
      "options": [
        "1/8",
        "1/3",
        "1/6",
        "3/8"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "Each half-life multiplies the remaining amount by one-half, giving (1/2)³."
    },
    {
      "id": "gc-equilibrium-kinetics-3",
      "topic": "kinetics",
      "skill": "Ratios",
      "difficulty": "analysis",
      "stem": "A catalyst is added to a closed mixture already at equilibrium. What changes at the same temperature?",
      "options": [
        "Forward and reverse rates increase but the equilibrium composition is unchanged",
        "Only the forward rate increases and K rises",
        "Only the reverse rate increases and K falls",
        "Activation energies increase and K remains fixed"
      ],
      "answer": 0,
      "mustGet": true,
      "explanation": "An allowed catalytic pathway accelerates approach from both directions. K and the equilibrium composition are set by thermodynamics."
    },
    {
      "id": "gc-equilibrium-equilibrium-1",
      "topic": "equilibrium",
      "skill": "Model selection",
      "difficulty": "application",
      "stem": "For a reaction with K = 10 and current Q = 0.2, which net direction restores equilibrium?",
      "options": [
        "Toward products",
        "Toward reactants",
        "No net reaction",
        "The sign is unknowable without a catalyst"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "Q must increase toward K, so the forward reaction is favored."
    },
    {
      "id": "gc-equilibrium-equilibrium-2",
      "topic": "equilibrium",
      "skill": "Model selection",
      "difficulty": "application",
      "stem": "Which simplified Ksp expression is correct for CaF₂(s) ⇌ Ca²⁺ + 2F⁻?",
      "options": [
        "[Ca²⁺][F⁻]²",
        "[Ca²⁺]²[F⁻]",
        "2[Ca²⁺][F⁻]",
        "[CaF₂]/([Ca²⁺][F⁻]²)"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "Use the dissolved species and raise each concentration to its coefficient. The pure solid is excluded."
    },
    {
      "id": "gc-equilibrium-equilibrium-3",
      "topic": "equilibrium",
      "skill": "Model selection",
      "difficulty": "analysis",
      "stem": "The initial ion product of mixed solutions is greater than Ksp. What tendency follows?",
      "options": [
        "A precipitate is favored until the ion product decreases",
        "More solid must dissolve",
        "The solubility product increases at fixed temperature",
        "There is no tendency for net change"
      ],
      "answer": 0,
      "mustGet": true,
      "explanation": "The solution is supersaturated. Precipitation lowers dissolved ion concentrations toward equilibrium; Ksp does not change at fixed temperature."
    },
    {
      "id": "gc-equilibrium-acids-1",
      "topic": "acids",
      "skill": "Signs and scale",
      "difficulty": "application",
      "stem": "A dilute strong acid provides [H⁺] = 1.0 × 10⁻³ M. What is pH?",
      "options": [
        "3.0",
        "11.0",
        "−3.0",
        "10.0"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "pH is the negative base-10 log of hydrogen-ion concentration: −(−3) = 3."
    },
    {
      "id": "gc-equilibrium-acids-2",
      "topic": "acids",
      "skill": "Signs and scale",
      "difficulty": "application",
      "stem": "Halfway to equivalence in a weak acid–strong base titration, the acid has pKa 4.75. What is pH approximately?",
      "options": [
        "4.75",
        "7.00",
        "9.25",
        "2.38"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "Half the weak acid has been converted to its conjugate base; their ratio is one, making the log term zero."
    },
    {
      "id": "gc-equilibrium-acids-3",
      "topic": "acids",
      "skill": "Signs and scale",
      "difficulty": "analysis",
      "stem": "A weak monoprotic acid and its conjugate base start with 0.10 mol each. Add 0.02 mol strong base. Ignoring volume change, what is [A⁻]/[HA] afterward?",
      "options": [
        "1.5",
        "0.67",
        "1.2",
        "1.0"
      ],
      "answer": 0,
      "mustGet": true,
      "explanation": "OH⁻ converts 0.02 mol HA into A⁻. Final amounts are 0.12 and 0.08 mol; their ratio is 1.5."
    }
  ]
});
