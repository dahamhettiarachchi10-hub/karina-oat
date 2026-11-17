registerSection({
  "id": "ph-energy",
  "subject": "Physics",
  "title": "Energy, momentum & statics",
  "subtitle": "PHYS 2",
  "source": "Physics Equation Sheet",
  "addedOn": "2026-11-17",
  "topics": [
    {
      "id": "work",
      "title": "Work, energy & power",
      "notes": [
        {
          "type": "text",
          "body": "Physics sheet p. 4. Work uses the component along the displacement."
        },
        {
          "type": "key",
          "title": "Rule",
          "body": "W = Fd cos θ for a constant force. Net work equals ΔK; K = ½mv². Near Earth, ΔU_g = mgΔh. Mechanical energy is conserved when relevant nonconservative work is zero. Average power = work/time."
        },
        {
          "type": "text",
          "title": "Worked example",
          "body": "A 3 kg object falls 5 m from rest without drag. With g = 10 m/s² it gains 150 J kinetic energy, so ½(3)v² = 150 and v = 10 m/s."
        }
      ]
    },
    {
      "id": "momentum",
      "title": "Impulse & collisions",
      "notes": [
        {
          "type": "text",
          "body": "Physics sheet pp. 2, 4. Pick a positive direction before adding momentum."
        },
        {
          "type": "key",
          "title": "Rule",
          "body": "p = mv; impulse J = Δp = F_avgΔt. Momentum is conserved in a system with negligible external impulse. Elastic collisions also conserve total kinetic energy. If objects stick, the collision is perfectly inelastic and they share a final velocity."
        },
        {
          "type": "text",
          "title": "Worked example",
          "body": "A 2 kg cart at +3 m/s sticks to a 1 kg stationary cart. Total momentum is +6 kg·m/s, so the combined 3 kg moves at +2 m/s."
        }
      ]
    },
    {
      "id": "statics",
      "title": "Torque, equilibrium & center of mass",
      "notes": [
        {
          "type": "text",
          "body": "Physics sheet pp. 3, 5, 9. Use distance to the line of action."
        },
        {
          "type": "key",
          "title": "Rule",
          "body": "τ = rF sin θ. Choose a pivot that cancels unknown forces when possible. Static equilibrium requires both ΣF = 0 and Στ = 0. Center of mass is the mass-weighted mean position."
        },
        {
          "type": "text",
          "title": "Worked example",
          "body": "A 300 N force at 2 m on one side of a balanced seesaw is matched by 600 N at 1 m on the other side, if other torques cancel."
        }
      ]
    }
  ],
  "questions": [
    {
      "id": "ph-energy-work-1",
      "topic": "work",
      "skill": "Signs and scale",
      "difficulty": "application",
      "stem": "A 20 N force acts perpendicular to a 3 m displacement. What work does it do?",
      "options": [
        "0 J",
        "60 J",
        "−60 J",
        "20 J"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "cos 90° is zero; none of this force acts along the displacement."
    },
    {
      "id": "ph-energy-work-2",
      "topic": "work",
      "skill": "Signs and scale",
      "difficulty": "application",
      "stem": "A machine delivers 900 J of work in 30 s. What is its average power?",
      "options": [
        "30 W",
        "27000 W",
        "900 W",
        "0.033 W"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "Average power is delivered energy divided by time, 900/30 = 30 J/s."
    },
    {
      "id": "ph-energy-work-3",
      "topic": "work",
      "skill": "Signs and scale",
      "difficulty": "analysis",
      "stem": "A 2 kg object moves at 3 m/s. Net work of −5 J acts on it. What is its final kinetic energy?",
      "options": [
        "4 J",
        "14 J",
        "−5 J",
        "1 J"
      ],
      "answer": 0,
      "mustGet": true,
      "explanation": "Initial K = ½×2×9 = 9 J. Net work changes kinetic energy by −5 J, leaving 4 J."
    },
    {
      "id": "ph-energy-momentum-1",
      "topic": "momentum",
      "skill": "Signs and scale",
      "difficulty": "application",
      "stem": "A ball’s momentum changes from +4 to −2 kg·m/s. What signed impulse did it receive?",
      "options": [
        "−6 N·s",
        "+6 N·s",
        "−2 N·s",
        "+2 N·s"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "Final minus initial gives −2−4 = −6 N·s."
    },
    {
      "id": "ph-energy-momentum-2",
      "topic": "momentum",
      "skill": "Signs and scale",
      "difficulty": "application",
      "stem": "Two identical carts move toward each other at the same speed and stick. What is their common final velocity if external impulse is negligible?",
      "options": [
        "Zero",
        "Either cart’s original speed",
        "Twice either original speed",
        "Half either original speed"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "Initial momenta have equal opposite signs. Their total is zero and is conserved."
    },
    {
      "id": "ph-energy-momentum-3",
      "topic": "momentum",
      "skill": "Signs and scale",
      "difficulty": "analysis",
      "stem": "Two isolated objects collide and total kinetic energy falls. Which quantity must still be conserved for the two-object system?",
      "options": [
        "Total momentum",
        "Each object’s speed",
        "Total kinetic energy",
        "Each object’s momentum"
      ],
      "answer": 0,
      "mustGet": true,
      "explanation": "Negligible external impulse preserves total momentum. Internal collision forces change individual momenta, and inelastic collisions transfer kinetic energy to other forms."
    },
    {
      "id": "ph-energy-statics-1",
      "topic": "statics",
      "skill": "Model selection",
      "difficulty": "application",
      "stem": "A perpendicular 15 N force is applied 0.20 m from a hinge. What is the torque magnitude?",
      "options": [
        "3.0 N·m",
        "75 N·m",
        "15 N·m",
        "0.30 N·m"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "Perpendicular force gives τ = rF = 0.20×15 = 3.0 N·m."
    },
    {
      "id": "ph-energy-statics-2",
      "topic": "statics",
      "skill": "Model selection",
      "difficulty": "application",
      "stem": "Masses 2 kg and 6 kg are at x = 0 and x = 4 m. Where is their center of mass?",
      "options": [
        "3 m",
        "2 m",
        "1 m",
        "4 m"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "Use (2×0+6×4)/(2+6) = 3 m. The center is closer to the heavier mass."
    },
    {
      "id": "ph-energy-statics-3",
      "topic": "statics",
      "skill": "Model selection",
      "difficulty": "analysis",
      "stem": "Forces on a rigid beam sum to zero, but their torques about its center do not. Is it in static equilibrium?",
      "options": [
        "No; a nonzero net torque can change its rotation",
        "Yes; zero net force is sufficient",
        "Yes, if its center of mass is at the center",
        "No; zero net force always causes translation"
      ],
      "answer": 0,
      "mustGet": true,
      "explanation": "Zero net force is only the translational condition; net torque must also vanish."
    }
  ]
});
