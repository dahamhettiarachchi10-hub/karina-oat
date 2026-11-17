registerSection({
  "id": "ph-electric",
  "subject": "Physics",
  "title": "Electric fields & circuits",
  "subtitle": "PHYS 4",
  "source": "Physics Equation Sheet",
  "addedOn": "2026-11-17",
  "topics": [
    {
      "id": "electrostatic",
      "title": "Force, field & potential",
      "notes": [
        {
          "type": "text",
          "body": "Physics sheet pp. 2, 14. Potential signs depend on source charge; field direction is for a positive test charge."
        },
        {
          "type": "key",
          "title": "Rule",
          "body": "F = k‖q₁q₂‖/r² in magnitude; like charges repel, unlike attract. For a single source E has magnitude k‖Q‖/r², whereas V = kQ/r relative to infinity. Vector fields add by components; potentials add as signed scalars. A test charge feels F = qE."
        },
        {
          "type": "text",
          "title": "Worked example",
          "body": "At twice the distance from one point charge, field magnitude is one quarter and potential magnitude is one half of the original values."
        }
      ]
    },
    {
      "id": "circuits",
      "title": "DC circuits, resistance & power",
      "notes": [
        {
          "type": "text",
          "body": "Physics sheet p. 12. Trace nodes; the drawing’s shape does not define series or parallel."
        },
        {
          "type": "key",
          "title": "Rule",
          "body": "V = IR and P = IV = I²R = V²/R. Series: same current, resistances add. Parallel: same voltage, reciprocal resistances add. Apply charge conservation at junctions and sum voltage changes around a closed loop."
        },
        {
          "type": "text",
          "title": "Worked example",
          "body": "Two 6 Ω resistors in parallel give 3 Ω. On an ideal 12 V source each branch draws 2 A and total current is 4 A."
        }
      ]
    },
    {
      "id": "capacitors",
      "title": "Capacitance and stored charge",
      "notes": [
        {
          "type": "text",
          "body": "Physics sheet p. 13. Capacitor combination rules are reversed relative to resistor combinations."
        },
        {
          "type": "key",
          "title": "Rule",
          "body": "Q = CV and stored energy U = ½CV². Parallel capacitors share voltage and C values add. Series capacitors carry equal charge magnitudes in the usual initially uncharged arrangement; reciprocals of capacitances add. Disconnecting a charged ideal capacitor isolates its charge."
        },
        {
          "type": "text",
          "title": "Worked example",
          "body": "Two 6 μF capacitors give 12 μF in parallel but 3 μF in series. With the same battery voltage, the parallel arrangement stores more total charge."
        }
      ]
    }
  ],
  "questions": [
    {
      "id": "ph-electric-electrostatic-1",
      "topic": "electrostatic",
      "skill": "Signs and scale",
      "difficulty": "application",
      "stem": "If the distance from a single point charge triples, what happens to the field magnitude?",
      "options": [
        "It becomes one ninth",
        "It becomes one third",
        "It triples",
        "It becomes one twenty-seventh"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "Field is inverse-square. Potential, not field, would scale as one third."
    },
    {
      "id": "ph-electric-electrostatic-2",
      "topic": "electrostatic",
      "skill": "Signs and scale",
      "difficulty": "application",
      "stem": "An electron is in an electric field pointing right. Which way does the electrical force point?",
      "options": [
        "Left",
        "Right",
        "Up",
        "There is no electric force"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "The electron’s charge is negative, so F = qE points opposite E."
    },
    {
      "id": "ph-electric-electrostatic-3",
      "topic": "electrostatic",
      "skill": "Signs and scale",
      "difficulty": "analysis",
      "stem": "At the midpoint between two equal positive point charges, with potential zero at infinity, what is true?",
      "options": [
        "Net electric field is zero and potential is positive",
        "Both field and potential are zero",
        "Field points toward one charge and potential is zero",
        "Net field is zero and potential is negative"
      ],
      "answer": 0,
      "mustGet": true,
      "explanation": "Equal opposite fields cancel, but equal positive scalar potentials add."
    },
    {
      "id": "ph-electric-circuits-1",
      "topic": "circuits",
      "skill": "Model selection",
      "difficulty": "application",
      "stem": "What is the equivalent resistance of 3 Ω and 6 Ω in parallel?",
      "options": [
        "2 Ω",
        "9 Ω",
        "4.5 Ω",
        "18 Ω"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "1/R_eq = 1/3 + 1/6 = 1/2, so R_eq = 2 Ω."
    },
    {
      "id": "ph-electric-circuits-2",
      "topic": "circuits",
      "skill": "Model selection",
      "difficulty": "application",
      "stem": "A 4 Ω resistor has 8 V across it. What power is dissipated?",
      "options": [
        "16 W",
        "2 W",
        "32 W",
        "4 W"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "Current is 8/4 = 2 A, so P = IV = 16 W. Two is the current, not power."
    },
    {
      "id": "ph-electric-circuits-3",
      "topic": "circuits",
      "skill": "Model selection",
      "difficulty": "analysis",
      "stem": "An ideal constant-voltage supply powers a resistor. A second resistor is added in parallel. What happens to the current through the original resistor?",
      "options": [
        "It stays the same",
        "It always halves",
        "It always doubles",
        "It falls to zero"
      ],
      "answer": 0,
      "mustGet": true,
      "explanation": "The original branch voltage remains fixed and its resistance is unchanged. The total current supplied rises, but that branch current does not change."
    },
    {
      "id": "ph-electric-capacitors-1",
      "topic": "capacitors",
      "skill": "Model selection",
      "difficulty": "application",
      "stem": "What is the equivalent capacitance of 2 μF and 4 μF in parallel?",
      "options": [
        "6 μF",
        "1.33 μF",
        "2 μF",
        "8 μF"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "Parallel capacitors see the same voltage and their capacitances add."
    },
    {
      "id": "ph-electric-capacitors-2",
      "topic": "capacitors",
      "skill": "Model selection",
      "difficulty": "application",
      "stem": "A 5 μF capacitor is charged to 4 V. What is the charge magnitude on one plate?",
      "options": [
        "20 μC",
        "1.25 μC",
        "0.8 μC",
        "40 μC"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "Q = CV. Multiplying microfarads by volts gives microcoulombs."
    },
    {
      "id": "ph-electric-capacitors-3",
      "topic": "capacitors",
      "skill": "Model selection",
      "difficulty": "analysis",
      "stem": "A charged ideal capacitor is disconnected. Its capacitance is then reduced while no charge leaks. What happens to its voltage magnitude?",
      "options": [
        "It increases",
        "It decreases",
        "It stays the same",
        "It must go to zero"
      ],
      "answer": 0,
      "mustGet": true,
      "explanation": "Q is fixed after disconnection, so V = Q/C increases as C decreases."
    }
  ]
});
