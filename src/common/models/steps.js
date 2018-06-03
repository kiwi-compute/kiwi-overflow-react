export const Step = {
  Unknowns: 0,
  Knowns: 1,
  Reference: 2,
  Assumptions: 3,
  Build: 4,
  Hypothesis: 5,
  Summary: 6,
};

export const StepInfo = {
  [Step.Unknowns]:     { name: 'Unknowns',          prompt: 'What are some things you don\'t know?' },
  [Step.Knowns]:       { name: 'Knowns',            prompt: 'What are some things you do know?' },
  [Step.Reference]:    { name: 'Reference Points',  prompt: 'What does this question remind you of that you might encounter in your daily life?' },
  [Step.Assumptions]:  { name: 'Assumptions',       prompt: 'Based on your Reference Points, make some decisions about your Unknowns.' },
  [Step.Build]:        { name: 'Build',             prompt: 'Using your answers from Round 1-4, which Knowns and Assumptions will you use to build your answer?' },
  [Step.Hypothesis]:   { name: 'Hypothesis',        prompt: 'What\'s your answer? Briefly explain why.' },
  [Step.Summary]:      { name: 'Summary Statement', prompt: 'Check out the results of your critical thinking process!' },
}

export const SubStep = {
  Answer: 0,
  Vote: 1,
  Review: 2,
};
