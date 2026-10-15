export type Insight = {
  slug: string
  category: string
  title: string
  description: string
  readTime: string
  published: string
  servicePath: string
  serviceLabel: string
  sections: Array<{ heading: string; paragraphs: string[]; bullets?: string[] }>
}

export const insights: Insight[] = [
  {
    slug: 'choose-first-workflow-to-automate',
    category: 'AI automation',
    title: 'How to choose the first workflow to automate in your business',
    description: 'A practical way to identify an automation pilot that is useful, measurable, and safe to test.',
    readTime: '5 min read',
    published: 'October 2026',
    servicePath: '/ai-automation',
    serviceLabel: 'Explore AI automation',
    sections: [
      { heading: 'Start with repetition, not novelty', paragraphs: ['The best first automation is usually not the most impressive idea. It is a repeated task that already has a clear input, a repeatable decision, and an output that someone can review.', 'Lead routing, proposal drafting, document extraction, follow-up reminders, and recurring reports are often stronger starting points than a broad “AI transformation” project.'] },
      { heading: 'Use a simple pilot filter', paragraphs: ['Before automating anything, score the workflow honestly. A good pilot is valuable enough to matter but contained enough to learn from quickly.'], bullets: ['It happens often enough to save real time.', 'The inputs are reasonably consistent.', 'A person can review or approve the output.', 'You can name one measure of success: time saved, faster reply, fewer missed leads, or less rework.'] },
      { heading: 'Keep a human in the loop where it matters', paragraphs: ['Automations should not silently make decisions that create financial, legal, customer, or reputational risk. Start with a draft, recommendation, or review queue when the action has consequences.', 'This approach helps the team build trust in the workflow while making the failure points visible early.'] },
      { heading: 'Scale only after the first workflow earns it', paragraphs: ['A useful pilot gives you evidence: what data was missing, which integrations matter, where people need control, and whether the expected benefit is real. Use that evidence to decide the next workflow instead of committing to a large system too early.'] },
    ],
  },
  {
    slug: 'rag-chatbot-vs-standard-chatbot',
    category: 'AI systems',
    title: 'RAG chatbot vs. a standard chatbot: which does your business need?',
    description: 'Understand when a knowledge-grounded RAG assistant is useful and when a simpler chatbot is the better starting point.',
    readTime: '6 min read',
    published: 'October 2026',
    servicePath: '/ai-automation',
    serviceLabel: 'Plan an AI / RAG pilot',
    sections: [
      { heading: 'A standard chatbot follows a defined conversation', paragraphs: ['A standard chatbot works well when the questions, options, and responses are predictable. Think appointment enquiries, lead qualification, order status paths, or collecting the details needed by a sales team.', 'Its strength is consistency. The conversation can be designed, tested, and improved without relying on a large document set.'] },
      { heading: 'RAG is useful when answers need your source material', paragraphs: ['Retrieval-augmented generation (RAG) helps an assistant find relevant information from an approved knowledge base before it answers. It is useful when people ask varied questions about policies, product details, internal documents, or support materials.', 'It is not a replacement for messy or outdated documentation. The quality of the source material still determines the quality of the answer.'] },
      { heading: 'Choose based on the problem, not the label', paragraphs: ['Use a standard chatbot when the journey is structured. Consider a RAG pilot when users need answers drawn from a defined set of changing business knowledge. Use a human handoff when the assistant reaches a confidence limit or a sensitive decision.'] },
      { heading: 'What a good pilot proves', paragraphs: ['A limited pilot should define the questions it covers, the knowledge it may use, the handoff rule, and how quality will be evaluated. That gives you a clear decision about whether to improve, expand, or stop.'] },
    ],
  },
  {
    slug: 'what-high-converting-business-website-needs',
    category: 'Web experiences',
    title: 'What a high-converting business website needs before design starts',
    description: 'The decisions that make a business website clearer, more trustworthy, and easier for visitors to act on.',
    readTime: '5 min read',
    published: 'October 2026',
    servicePath: '/web-experiences',
    serviceLabel: 'Explore web experiences',
    sections: [
      { heading: 'Clarity beats decoration', paragraphs: ['A visitor should understand what you do, who it is for, and the next sensible action without searching for it. Visual design supports this—it should not be asked to carry the entire message.', 'Start with the customer problem, your offer, the proof you can stand behind, and one primary call to action.'] },
      { heading: 'Build trust before asking for the lead', paragraphs: ['People want signals that the business is real and capable: clear service scope, useful examples, transparent starting points, an understandable process, and a way to contact a real person.', 'You do not need to invent big statistics. Specificity about how you work is more valuable than vague claims.'] },
      { heading: 'Design the path, not just the page', paragraphs: ['The most important journey might be from a Google search to a service page, from a case example to a WhatsApp conversation, or from a product page to checkout. Each page should make its role in that journey obvious.', 'Calls to action should match intent. Someone researching needs a useful guide or service explanation; someone ready to talk needs a low-friction contact route.'] },
      { heading: 'Measure the actions that matter', paragraphs: ['Track contact-form completion, WhatsApp clicks, phone clicks, and other meaningful next steps. Traffic without a defined next action is hard to turn into a useful business signal.'] },
    ],
  },
]

export function getInsight(slug: string | undefined): Insight | undefined {
  return insights.find((insight) => insight.slug === slug)
}
