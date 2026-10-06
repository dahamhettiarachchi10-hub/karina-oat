// Copy this file, replace the sample content, and add its filename to manifest.js.
// Keep section, topic, and question IDs stable after publishing.
registerSection({
  id: "subject-02",
  subject: "Your subject",
  title: "Your section title",
  subtitle: "Chapter or unit",
  addedOn: "2026-10-03",
  source: "Source of the provided material",
  topics: [{
    id: "first-topic", title: "First topic", notes: [
      { type: "text", body: "Replace with source-backed notes. **Bold**, *italic*, `code`, H~2~O, Na^+^." },
      { type: "key", title: "Key idea", body: "Replace with a key idea." },
      { type: "trap", title: "OAT trap", body: "Replace with a common misconception." },
      { type: "compare", headers: ["Concept", "Meaning"], rows: [["Sample", "Replace this row"]] },
      { type: "steps", items: ["First step", "Second step"] },
      { type: "mnemonic", body: "Replace with a helpful memory cue." }
    ]
  }],
  questions: [{
    id: "subject-02-q01", topic: "first-topic", difficulty: "recall", mustGet: true,
    stem: "Replace with a question grounded in the supplied material.",
    options: ["Correct option", "Distractor one", "Distractor two", "Distractor three"],
    answer: 0, explanation: "Explain why the correct option follows from the material."
  }]
});
