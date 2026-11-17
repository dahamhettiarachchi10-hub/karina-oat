registerSection({
  "id": "ph-optics",
  "subject": "Physics",
  "title": "Refraction, lenses & mirrors",
  "subtitle": "PHYS 5",
  "source": "Physics Equation Sheet",
  "addedOn": "2026-11-17",
  "topics": [
    {
      "id": "refraction",
      "title": "Refraction, critical angle & reflection",
      "notes": [
        {
          "type": "text",
          "body": "Physics sheet p. 15. Measure all ray angles from the normal."
        },
        {
          "type": "key",
          "title": "Rule",
          "body": "n = c/v. Snell’s law: n₁ sin θ₁ = n₂ sin θ₂. Toward higher n, the ray bends toward the normal. Total internal reflection requires travel from higher n to lower n and incidence greater than θ_c = arcsin(n₂/n₁)."
        },
        {
          "type": "text",
          "title": "Worked example",
          "body": "A ray inside glass (n = 1.50) toward air (n = 1.00) has sin θ_c = 2/3; θ_c ≈ 42°. At 50° from the normal it undergoes total internal reflection."
        }
      ]
    },
    {
      "id": "lenses",
      "title": "Thin lenses, magnification & lens power",
      "notes": [
        {
          "type": "text",
          "body": "Physics sheet pp. 15–16. This lesson uses positive image distance for a real image from a thin lens."
        },
        {
          "type": "key",
          "title": "Rule",
          "body": "1/f = 1/dₒ + 1/dᵢ; m = −dᵢ/dₒ. Converging f is positive; diverging f is negative. With a real object outside f, a converging lens forms a real inverted image. If the object is inside f, it forms a virtual upright enlarged image. Lens power = 1/f with f in metres, in diopters."
        },
        {
          "type": "text",
          "title": "Worked example",
          "body": "For f = +10 cm, dₒ = 30 cm: 1/dᵢ = 1/10−1/30, so dᵢ = +15 cm and m = −0.5. The real image is inverted and reduced."
        },
        {
          "type": "diagram",
          "src": "diagrams/lens-rays.svg",
          "body": "The ray parallel to the axis bends through the far focal point. It meets the ray through the lens center at the inverted image."
        }
      ]
    },
    {
      "id": "mirrors",
      "title": "Mirror sign rules & image checks",
      "notes": [
        {
          "type": "text",
          "body": "Physics sheet pp. 15–16. A positive real image distance lies in front of a mirror, on the incident-light side."
        },
        {
          "type": "key",
          "title": "Rule",
          "body": "The spherical mirror equation has the same algebra as the thin-lens equation, but the real-image side is in front of the mirror. Concave mirrors converge (f > 0); convex mirrors diverge (f < 0) and give virtual upright reduced images for real objects. A plane mirror gives a same-size virtual image."
        },
        {
          "type": "text",
          "title": "Worked example",
          "body": "A real object at 2f from a concave mirror has dᵢ = 2f and m = −1: real, inverted, same size."
        }
      ]
    }
  ],
  "questions": [
    {
      "id": "ph-optics-refraction-1",
      "topic": "refraction",
      "skill": "Model selection",
      "difficulty": "application",
      "stem": "A light ray enters water from air at oblique incidence. Does it bend toward or away from the normal?",
      "options": [
        "Toward the normal",
        "Away from the normal",
        "It is always totally internally reflected",
        "It must travel along the surface"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "Water’s refractive index is higher, so its refracted angle from the normal is smaller."
    },
    {
      "id": "ph-optics-refraction-2",
      "topic": "refraction",
      "skill": "Model selection",
      "difficulty": "application",
      "stem": "Which direction can permit total internal reflection at an interface?",
      "options": [
        "From larger refractive index to smaller",
        "From smaller refractive index to larger",
        "Both directions at any angle",
        "Neither direction regardless of angle"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "Only larger-to-smaller n can leave no propagating refracted ray at incidence above a critical angle."
    },
    {
      "id": "ph-optics-refraction-3",
      "topic": "refraction",
      "skill": "Model selection",
      "difficulty": "analysis",
      "stem": "Light enters a medium where its speed is one half the original value. Its frequency stays fixed. What happens to wavelength?",
      "options": [
        "It halves",
        "It doubles",
        "It stays fixed",
        "It quadruples"
      ],
      "answer": 0,
      "mustGet": true,
      "explanation": "Frequency stays continuous at the interface; λ = v/f, so halving v halves λ."
    },
    {
      "id": "ph-optics-lenses-1",
      "topic": "lenses",
      "skill": "Unit conversion",
      "difficulty": "application",
      "stem": "A thin converging lens has focal length 25 cm. What is its power?",
      "options": [
        "+4 D",
        "+0.04 D",
        "−4 D",
        "+25 D"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "Convert 25 cm to 0.25 m before taking 1/f. Positive power matches a converging lens."
    },
    {
      "id": "ph-optics-lenses-2",
      "topic": "lenses",
      "skill": "Unit conversion",
      "difficulty": "application",
      "stem": "A real object sits 15 cm from a thin converging lens with f = +10 cm. Where is its image?",
      "options": [
        "30 cm on the opposite side",
        "30 cm on the same side",
        "6 cm on the opposite side",
        "At the focal point"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "1/dᵢ = 1/10 −1/15 = 1/30 cm⁻¹. Positive dᵢ gives a real image on the outgoing side."
    },
    {
      "id": "ph-optics-lenses-3",
      "topic": "lenses",
      "skill": "Unit conversion",
      "difficulty": "analysis",
      "stem": "A magnifying lens is converging and holds a real object inside its focal length. What image does it produce?",
      "options": [
        "Virtual, upright, enlarged",
        "Real, inverted, enlarged",
        "Virtual, inverted, reduced",
        "Real, upright, equal size"
      ],
      "answer": 0,
      "mustGet": true,
      "explanation": "With dₒ < f, dᵢ is negative and m positive with magnitude above one. That means a virtual upright enlarged image."
    },
    {
      "id": "ph-optics-mirrors-1",
      "topic": "mirrors",
      "skill": "Signs and scale",
      "difficulty": "application",
      "stem": "What image does a convex mirror form for a real object?",
      "options": [
        "Virtual, upright, reduced",
        "Real, inverted, reduced",
        "Virtual, upright, enlarged",
        "Real, upright, same size"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "A convex mirror diverges reflected rays; their backward extensions appear behind the mirror and produce an upright reduced image."
    },
    {
      "id": "ph-optics-mirrors-2",
      "topic": "mirrors",
      "skill": "Signs and scale",
      "difficulty": "application",
      "stem": "A plane mirror is 3 m from an object. How far from the mirror does its image appear?",
      "options": [
        "3 m behind it",
        "3 m in front of it",
        "6 m behind it",
        "1.5 m behind it"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "A plane mirror forms a virtual image at the same distance behind the mirror as the object is in front."
    },
    {
      "id": "ph-optics-mirrors-3",
      "topic": "mirrors",
      "skill": "Signs and scale",
      "difficulty": "analysis",
      "stem": "A concave mirror has f = 12 cm and a real object is at 24 cm. What image follows?",
      "options": [
        "Real, inverted, same size",
        "Virtual, upright, same size",
        "Real, upright, enlarged",
        "Virtual, inverted, reduced"
      ],
      "answer": 0,
      "mustGet": true,
      "explanation": "The mirror equation gives dᵢ = 24 cm; m = −24/24 = −1. Positive dᵢ means real for this convention."
    }
  ]
});
